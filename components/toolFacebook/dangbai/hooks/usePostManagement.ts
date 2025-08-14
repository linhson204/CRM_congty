import { useState, useCallback, useRef } from "react";
import { Post, Comment, Reply, FacebookAccount } from "../types";
import { getPostbyUserId } from "../../../../pages/api/toolFacebook/dang-bai/dang-bai";
import { getCommentByPostId } from "../../../../pages/api/toolFacebook/dang-bai/comment";
import Cookies from "js-cookie";

export const usePostManagement = (
  selectedFacebookAccount: FacebookAccount | null
) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  // Ref để track request hiện tại và cancel request cũ
  const currentRequestRef = useRef<{
    controller: AbortController | null;
    facebookId: string | null;
    userId: string | null;
    page: number | null;
  }>({
    controller: null,
    facebookId: null,
    userId: null,
    page: null,
  });

  // Function để convert dữ liệu từ API sang format của component
  const convertApiPostToComponentPost = useCallback(
    (apiPost: any): Post => {
      // Convert images từ API response
      let convertedImages: { name: string; url: string }[] = [];

      if (apiPost.media && Array.isArray(apiPost.media)) {
        convertedImages = apiPost.media.map((media: any) => ({
          name: media.name || media.filename || "image",
          url: media.url || media.link,
        }));
      } else if (apiPost.attachments && Array.isArray(apiPost.attachments)) {
        convertedImages = apiPost.attachments.map((att: any) => ({
          name: att.name || att.filename || "image",
          url: att.url || att.link,
        }));
      } else if (apiPost.images && Array.isArray(apiPost.images)) {
        convertedImages = apiPost.images.map((img: any) => {
          if (typeof img === "string") {
            return { name: "image", url: img };
          } else {
            return {
              name: img.name || img.filename || "image",
              url: img.url || img.link || img,
            };
          }
        });
      }

      return {
        idMongodb: apiPost._id,
        id: parseInt(apiPost.facebookPostId) || Date.now(),
        to: apiPost.facebookId || selectedFacebookAccount?.facebookId || "",
        content: apiPost.content,
        author: apiPost.userNameFacebook || "Người dùng",
        authorId: apiPost.userId,
        timestamp: apiPost.createdAt
          ? new Date(apiPost.createdAt * 1000).toLocaleString("vi-VN")
          : new Date().toLocaleString("vi-VN"),
        images: convertedImages,
        comments: [],
        facebookUrl: apiPost.facebookPostUrl,
        isPosted: !!apiPost.facebookPostUrl,
      };
    },
    [selectedFacebookAccount?.facebookId]
  );

  // Function để convert reply từ API sang format của component
  const convertApiReplyToComponentReply = useCallback(
    (apiReply: any): Reply => {
      return {
        id: parseInt(apiReply.id_facebookReply) || Date.now(),
        to: selectedFacebookAccount?.facebookId || "",
        content: apiReply.content,
        userLinkFb: apiReply.userLinkFb || "",
        author: apiReply.userNameFacebook || "Facebook User",
        authorId: apiReply.userId || "facebook_user",
        timestamp: apiReply.createdAt
          ? new Date(apiReply.createdAt).toLocaleString("vi-VN")
          : new Date().toLocaleString("vi-VN"),
        id_facebookReply: apiReply.id_facebookReply,
        facebookReplyUrl: apiReply.facebookReplyUrl || "",
        replyToAuthor: apiReply.replyToAuthor || "",
      };
    },
    [selectedFacebookAccount?.facebookId]
  );

  // Function để convert comment từ API sang format của component
  const convertApiCommentToComponentComment = useCallback(
    (apiComment: any): Comment => {
      const replies: Reply[] = Array.isArray(apiComment.listFeedback)
        ? apiComment.listFeedback.map(convertApiReplyToComponentReply)
        : [];

      return {
        idMongodb: apiComment._id,
        id: parseInt(apiComment.facebookCommentId) || Date.now(),
        to: apiComment.facebookId || selectedFacebookAccount?.facebookId || "",
        postId: parseInt(apiComment.postId),
        content: apiComment.content,
        userLinkFb: apiComment.userLinkFb || "",
        author: apiComment.userNameFacebook || "Facebook User",
        authorId: apiComment.userId || "facebook_user",
        timestamp: apiComment.createdAt
          ? new Date(apiComment.createdAt * 1000).toLocaleString("vi-VN")
          : new Date().toLocaleString("vi-VN"),
        replies: replies,
        id_facebookComment: apiComment.facebookCommentId,
        facebookCommentUrl: apiComment.facebookCommentUrl || "",
      };
    },
    [selectedFacebookAccount?.facebookId, convertApiReplyToComponentReply]
  );

  // Function để load comments cho từng post
  const loadCommentsForPost = useCallback(
    async (post: Post) => {
      if (!selectedFacebookAccount) {
        console.warn("No selected Facebook account, cannot load comments");
        return;
      }

      try {
        const userID = Cookies.get("userID") || "anonymous";
        const facebookId = selectedFacebookAccount.facebookId;

        const response = await getCommentByPostId(
          post.id.toString(),
          userID,
          facebookId
        );

        if (response.results) {
          const comments = response.results.map(
            convertApiCommentToComponentComment
          );

          setPosts((prevPosts) => {
            const updatedPosts = prevPosts.map((p) => {
              if (p.id === post.id) {
                return { ...p, comments };
              }
              return p;
            });
            return updatedPosts;
          });
        } else {
          console.log(
            `No comments found for post ${post.id}. Response:`,
            response
          );
        }
      } catch (error) {
        console.error(`Error loading comments for post ${post.id}:`, error);
      }
    },
    [selectedFacebookAccount?.facebookId, convertApiCommentToComponentComment]
  );

  // Function để load comments cho tất cả posts với check cancel
  const loadCommentsForAllPosts = useCallback(
    async (postsToLoad: Post[]) => {
      try {
        const currentFacebookId = selectedFacebookAccount?.facebookId;

        for (const post of postsToLoad) {
          // Kiểm tra trước mỗi request xem có bị cancel không
          if (currentRequestRef.current.facebookId !== currentFacebookId) {
            console.log(
              "🚫 [COMMENTS] Stopping comment loading, Facebook account changed"
            );
            break;
          }

          if (post.isPosted) {
            await loadCommentsForPost(post);
          }
        }
      } catch (error) {
        console.error("Error loading comments for posts:", error);
      }
    },
    [loadCommentsForPost, selectedFacebookAccount?.facebookId]
  );

  // Function để refresh comments cho một post cụ thể
  const refreshCommentsForPost = useCallback(
    async (postId: string | number) => {
      try {
        const post = posts.find((p) => p.id.toString() === postId.toString());
        if (post && post.isPosted) {
          await loadCommentsForPost(post);
        }
      } catch (error) {
        console.error(`Error refreshing comments for post ${postId}:`, error);
      }
    },
    [posts, loadCommentsForPost]
  );

  // Function để fetch posts từ API với abort controller và pagination
  const fetchUserPosts = useCallback(
    async (userId: string, page: number = 1) => {
      if (!selectedFacebookAccount) {
        console.warn("No selected Facebook account, cannot fetch posts");
        return;
      }

      // Cancel request cũ nếu có
      if (currentRequestRef.current.controller) {
        console.log("🚫 [FETCH] Canceling previous request for:", {
          previousFacebookId: currentRequestRef.current.facebookId,
          previousUserId: currentRequestRef.current.userId,
          previousPage: currentRequestRef.current.page,
        });
        currentRequestRef.current.controller.abort();
      }

      // Tạo AbortController mới cho request này
      const controller = new AbortController();
      currentRequestRef.current = {
        controller,
        facebookId: selectedFacebookAccount.facebookId,
        userId,
        page,
      };

      setIsLoadingPosts(true);

      // Chỉ clear posts khi chuyển page 1 hoặc chuyển account
      if (page === 1) {
        setPosts([]);
      }

      try {
        console.log("🔍 [FETCH] Starting new request for:", {
          userId,
          facebookId: selectedFacebookAccount.facebookId,
          page,
          selectedAccount: selectedFacebookAccount,
        });

        const response = await getPostbyUserId(
          userId,
          selectedFacebookAccount.facebookId,
          page
        );

        // Kiểm tra xem request này có bị cancel không
        if (controller.signal.aborted) {
          console.log("🚫 [FETCH] Request was aborted, ignoring response");
          return;
        }

        // Kiểm tra xem có phải request hiện tại không (double check)
        if (
          currentRequestRef.current.facebookId !==
            selectedFacebookAccount.facebookId ||
          currentRequestRef.current.userId !== userId ||
          currentRequestRef.current.page !== page
        ) {
          console.log("🚫 [FETCH] Request outdated, ignoring response:", {
            currentFacebookId: currentRequestRef.current.facebookId,
            responseFacebookId: selectedFacebookAccount.facebookId,
            currentUserId: currentRequestRef.current.userId,
            responseUserId: userId,
            currentPage: currentRequestRef.current.page,
            responsePage: page,
          });
          return;
        }

        console.log("📦 [FETCH] API Response:", {
          currentPage: response?.page || page,
          totalPages: response?.totalPages || 1,
          totalPosts: response?.totalResults || 0,
          postsInThisPage: response?.results?.length || 0,
          limit: response?.limit || 10,
          response: response,
        });

        if (response && response.results) {
          // Update pagination info theo cấu trúc API response
          setCurrentPage(response.page || page);
          setTotalPages(response.totalPages || 1);
          setTotalPosts(response.totalResults || 0);

          // Tính hasNextPage và hasPrevPage từ current page và total pages
          const currentPageNum = response.page || page;
          const totalPagesNum = response.totalPages || 1;
          setHasNextPage(currentPageNum < totalPagesNum);
          setHasPrevPage(currentPageNum > 1);

          const convertedPosts = response.results.map(
            convertApiPostToComponentPost
          );

          // Final check trước khi set posts
          if (
            !controller.signal.aborted &&
            currentRequestRef.current.facebookId ===
              selectedFacebookAccount.facebookId &&
            currentRequestRef.current.page === page
          ) {
            setPosts(convertedPosts);

            // Load comments sau một delay ngắn
            setTimeout(async () => {
              // Kiểm tra lần nữa trước khi load comments
              if (
                !controller.signal.aborted &&
                currentRequestRef.current.facebookId ===
                  selectedFacebookAccount.facebookId &&
                currentRequestRef.current.page === page
              ) {
                await loadCommentsForAllPosts(convertedPosts);
              }
            }, 500);
          } else {
            console.log("🚫 [FETCH] Skipping setPosts due to request change");
          }
        } else {
          console.warn("No posts found or invalid response");
          if (!controller.signal.aborted) {
            setPosts([]);
            setCurrentPage(1);
            setTotalPages(1);
            setTotalPosts(0);
            setHasNextPage(false);
            setHasPrevPage(false);
          }
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("🚫 [FETCH] Request was aborted");
        } else {
          console.error("Error fetching posts:", error);
          // Chỉ set empty posts nếu request chưa bị cancel
          if (!controller.signal.aborted) {
            setPosts([]);
            setCurrentPage(1);
            setTotalPages(1);
            setTotalPosts(0);
            setHasNextPage(false);
            setHasPrevPage(false);
          }
        }
      } finally {
        // Chỉ set loading = false nếu đây là request hiện tại
        if (
          !controller.signal.aborted &&
          currentRequestRef.current.controller === controller
        ) {
          setIsLoadingPosts(false);
          currentRequestRef.current.controller = null;
        }
      }
    },
    [
      selectedFacebookAccount?.facebookId,
      convertApiPostToComponentPost,
      loadCommentsForAllPosts,
    ]
  );

  // Cleanup function để cancel requests khi component unmount
  const cleanup = useCallback(() => {
    if (currentRequestRef.current.controller) {
      console.log("🧹 [CLEANUP] Canceling ongoing request");
      currentRequestRef.current.controller.abort();
      currentRequestRef.current = {
        controller: null,
        facebookId: null,
        userId: null,
        page: null,
      };
    }
  }, []);

  // Pagination navigation functions
  const goToPage = useCallback(
    (page: number, userId: string) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        console.log(`📄 [PAGINATION] Going to page ${page}`);
        fetchUserPosts(userId, page);
      }
    },
    [totalPages, currentPage, fetchUserPosts]
  );

  const goToNextPage = useCallback(
    (userId: string) => {
      if (hasNextPage) {
        goToPage(currentPage + 1, userId);
      }
    },
    [hasNextPage, currentPage, goToPage]
  );

  const goToPreviousPage = useCallback(
    (userId: string) => {
      if (hasPrevPage) {
        goToPage(currentPage - 1, userId);
      }
    },
    [hasPrevPage, currentPage, goToPage]
  );

  const goToFirstPage = useCallback(
    (userId: string) => {
      if (currentPage !== 1) {
        goToPage(1, userId);
      }
    },
    [currentPage, goToPage]
  );

  const goToLastPage = useCallback(
    (userId: string) => {
      if (currentPage !== totalPages) {
        goToPage(totalPages, userId);
      }
    },
    [currentPage, totalPages, goToPage]
  );

  // Reset pagination khi chuyển Facebook account
  const resetPagination = useCallback(() => {
    setCurrentPage(1);
    setTotalPages(1);
    setTotalPosts(0);
    setHasNextPage(false);
    setHasPrevPage(false);
  }, []);

  return {
    posts,
    setPosts,
    isLoadingPosts,
    fetchUserPosts,
    refreshCommentsForPost,
    loadCommentsForPost,
    cleanup,
    // Pagination state
    currentPage,
    totalPages,
    totalPosts,
    hasNextPage,
    hasPrevPage,
    // Pagination functions
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    resetPagination,
  };
};
