import { useState, useCallback } from "react";
import { Post, Comment, Reply, FacebookAccount } from "../types";
import { getPostbyUserId } from "../../../../pages/api/toolFacebook/dang-bai/dang-bai";
import { getCommentByPostId } from "../../../../pages/api/toolFacebook/dang-bai/comment";
import Cookies from "js-cookie";

export const usePostManagement = (
  selectedFacebookAccount: FacebookAccount | null
) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

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

  // Function để load comments cho tất cả posts
  const loadCommentsForAllPosts = useCallback(
    async (postsToLoad: Post[]) => {
      try {
        for (const post of postsToLoad) {
          if (post.isPosted) {
            await loadCommentsForPost(post);
          }
        }
      } catch (error) {
        console.error("Error loading comments for posts:", error);
      }
    },
    [loadCommentsForPost]
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

  // Function để fetch posts từ API
  const fetchUserPosts = useCallback(
    async (userId: string) => {
      if (!selectedFacebookAccount) {
        console.warn("No selected Facebook account, cannot fetch posts");
        return;
      }

      setIsLoadingPosts(true);
      setPosts([]);

      try {
        const response = await getPostbyUserId(
          userId,
          selectedFacebookAccount.facebookId
        );
        setTimeout(async () => {}, 2000);
        if (response && response.results) {
          const convertedPosts = response.results.map(
            convertApiPostToComponentPost
          );
          setPosts(convertedPosts);

          setTimeout(async () => {
            await loadCommentsForAllPosts(convertedPosts);
          }, 500);
        } else {
          console.warn("No posts found or invalid response");
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoadingPosts(false);
      }
    },
    [
      selectedFacebookAccount?.facebookId,
      convertApiPostToComponentPost,
      loadCommentsForAllPosts,
    ]
  );

  return {
    posts,
    setPosts,
    isLoadingPosts,
    fetchUserPosts,
    refreshCommentsForPost,
    loadCommentsForPost,
  };
};
