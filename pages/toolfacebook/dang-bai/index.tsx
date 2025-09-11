import { SidebarContext } from "@/components/crm/context/resizeContext";
import stylesContract from "@/components/crm/contract/contract_action.module.css";
import styleHome from "@/components/crm/home/home.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import styles from "@/components/crm/potential/potential.module.css";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import Head from "next/head";
import { useRouter } from "next/router";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// Import types and components
import {
  Comment,
  FacebookAccount,
  Post,
  Reply,
} from "@/components/toolFacebook/dangbai/types";

// Import Facebook accounts mapping
import {
  getFacebookAccountsByUserID
} from "@/components/toolFacebook/dangbai/constants/facebookAccountsMapping";

// Import custom hooks
import { useImageManagement } from "@/components/toolFacebook/dangbai/hooks/useImageManagement";
import { useModalManagement } from "@/components/toolFacebook/dangbai/hooks/useModalManagement";
import { usePostManagement } from "@/components/toolFacebook/dangbai/hooks/usePostManagement";
import { useWebSocket } from "@/components/toolFacebook/dangbai/hooks/useWebSocket";

// Import components
import { ActionButtons } from "@/components/toolFacebook/dangbai/components/ActionButtons";
import { CommentModal } from "@/components/toolFacebook/dangbai/components/CommentModal";
import { FacebookAccountSelector } from "@/components/toolFacebook/dangbai/components/FacebookAccountSelector";
import { PostItem } from "@/components/toolFacebook/dangbai/components/PostItem";
import { PostModal } from "@/components/toolFacebook/dangbai/components/PostModal";
import { PostsHeader } from "@/components/toolFacebook/dangbai/components/PostsHeader";
import { ReplyModal } from "@/components/toolFacebook/dangbai/components/ReplyModal";

function DangBaiPost() {
  const router = useRouter();
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  // States cho kiểm tra quyền
  const [hasPermission, setHasPermission] = useState(false);
  const [isCheckingPermission, setIsCheckingPermission] = useState(true);
  const [currentUserID, setCurrentUserID] = useState<string | null>(null);

  // Danh sách ID được phép truy cập trang Tool Facebook
  const ALLOWED_USER_IDS = [
    "22614471",
    "22773024",
    "22858640",
    // Thêm các ID được phép vào đây
  ];

  // State cho Facebook accounts với static data
  const [facebookAccounts, setFacebookAccounts] = useState<FacebookAccount[]>(
    []
  );
  const [isLoadingAccounts, setIsLoadingAccounts] = useState<boolean>(false);

  const [selectedFacebookAccount, setSelectedFacebookAccount] =
    useState<FacebookAccount | null>(null);

  // State để track crawling status cho từng Facebook account
  const [crawlingStatus, setCrawlingStatus] = useState<{
    [facebookId: string]: {
      isActive: boolean;
      message: string;
      timestamp?: string;
    };
  }>({});

  // State để track thời gian đăng bài cuối cùng cho từng Facebook account
  const [lastPostTime, setLastPostTime] = useState<{
    [facebookId: string]: number;
  }>({});

  // State để track online/offline status cho từng Facebook account
  const [onlineStatus, setOnlineStatus] = useState<{
    [facebookId: string]: {
      isOnline: boolean;
      lastSeen?: string;
    };
  }>({});

  // Use custom hooks
  const postManagement = usePostManagement(selectedFacebookAccount);
  const modalManagement = useModalManagement();
  const imageManagement = useImageManagement(
    modalManagement.uploadedImages,
    modalManagement.setUploadedImages,
    modalManagement.selectedImages,
    modalManagement.setSelectedImages,
    modalManagement.setIsUploadingImages,
    modalManagement.setIsDeletingImage
  );

  // Check xem Facebook account hiện tại có đang crawl không
  const isCurrentAccountCrawling = useCallback(() => {
    if (!selectedFacebookAccount) return false;
    const currentStatus =
      crawlingStatus[selectedFacebookAccount.facebookId]?.isActive || false;
    return currentStatus;
  }, [crawlingStatus, selectedFacebookAccount]);

  // Get crawling message cho account hiện tại
  const getCurrentCrawlingMessage = useCallback(() => {
    if (!selectedFacebookAccount) return "";
    const status = crawlingStatus[selectedFacebookAccount.facebookId];
    return status?.message || "";
  }, [crawlingStatus, selectedFacebookAccount]);

  // Check xem có thể đăng bài không (kiểm tra thời gian 30 phút)
  const canPost = useCallback(() => {
    if (!selectedFacebookAccount) return false;

    const lastTime = lastPostTime[selectedFacebookAccount.facebookId];
    if (!lastTime) return true; // Chưa đăng bài lần nào

    const currentTime = Date.now();
    const timeDiff = currentTime - lastTime;
    const thirtyMinutes = 0 * 60 * 1000; // 30 phút = 30 * 60 * 1000 milliseconds

    return timeDiff >= thirtyMinutes;
  }, [selectedFacebookAccount, lastPostTime]);

  // Get thời gian còn lại để có thể đăng bài tiếp theo
  const getTimeUntilNextPost = useCallback(() => {
    if (!selectedFacebookAccount) return 0;

    const lastTime = lastPostTime[selectedFacebookAccount.facebookId];
    if (!lastTime) return 0;

    const currentTime = Date.now();
    const timeDiff = currentTime - lastTime;
    const thirtyMinutes = 30 * 60 * 1000;

    if (timeDiff >= thirtyMinutes) return 0;

    return thirtyMinutes - timeDiff;
  }, [selectedFacebookAccount, lastPostTime]);

  // Format thời gian còn lại thành string dễ đọc
  const formatTimeRemaining = useCallback((milliseconds: number) => {
    if (milliseconds <= 0) return "";

    const minutes = Math.floor(milliseconds / (60 * 1000));
    const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  // Use WebSocket hook
  const websocket = useWebSocket(
    postManagement.posts,
    postManagement.setPosts,
    postManagement.refreshCommentsForPost,
    setCrawlingStatus,
    setOnlineStatus
  );

  // Kiểm tra quyền truy cập và fetch posts
  useEffect(() => {
    const checkPermission = async () => {
      try {
        const token_base365 = Cookies.get("token_base365");
        const userID = Cookies.get("userID");

        if (!token_base365 || !userID) {
          window.alert("Bạn chưa đăng nhập!");
          router.push("/");
          return;
        }

        // Kiểm tra userID có trong danh sách được phép không
        if (!ALLOWED_USER_IDS.includes(userID)) {
          window.alert("Bạn không có quyền truy cập trang Tool Facebook!");
          router.push("/");
          return;
        }

        // Nếu muốn kiểm tra thêm thông tin từ token
        const decodedToken: any = await jwt_decode(token_base365);
        console.log("User có quyền truy cập Tool Facebook:", {
          userID: userID,
          tokenData: decodedToken?.data,
          hasPermission: true,
        });

        setHasPermission(true);
        setCurrentUserID(userID); // Set userID để trigger fetch Facebook accounts

        // Posts sẽ được fetch sau khi có Facebook accounts
      } catch (error) {
        console.error("Lỗi kiểm tra quyền:", error);
        window.alert("Có lỗi xảy ra khi kiểm tra quyền!");
        router.push("/");
      } finally {
        setIsCheckingPermission(false);
      }
    };

    checkPermission();
  }, [router]);

  // Effect để load Facebook accounts từ static data mapping khi userID thay đổi
  useEffect(() => {
    if (currentUserID) {
      console.log(`🔍 Loading Facebook accounts for userID: ${currentUserID}`);
      setIsLoadingAccounts(true);

      try {
        const userAccounts = getFacebookAccountsByUserID(currentUserID);
        setFacebookAccounts(userAccounts);
        console.log(
          `✅ Loaded ${userAccounts.length} Facebook accounts for userID: ${currentUserID}`
        );
      } catch (error) {
        console.error(
          `❌ Error loading Facebook accounts for userID ${currentUserID}:`,
          error
        );
        setFacebookAccounts([]); // Set empty array nếu có lỗi
      } finally {
        setIsLoadingAccounts(false);
      }
    } else {
      console.log(`🔍 No userID, clearing Facebook accounts`);
      setFacebookAccounts([]);
      setSelectedFacebookAccount(null);
    }
  }, [currentUserID]);

  // Effect để set Facebook account đầu tiên khi accounts được load
  useEffect(() => {
    if (facebookAccounts.length > 0 && !selectedFacebookAccount) {
      console.log(
        ` Setting default Facebook account: ${facebookAccounts[0].userNameFb}`
      );
      setSelectedFacebookAccount(facebookAccounts[0]);
    }
  }, [facebookAccounts, selectedFacebookAccount]);

  // Effect để fetch posts khi có cả Facebook account và userID
  useEffect(() => {
    if (hasPermission && selectedFacebookAccount && currentUserID) {
      console.log(
        ` Fetching posts for account: ${selectedFacebookAccount.userNameFb}`
      );
      // Reset pagination và fetch page 1
      postManagement.resetPagination();
      postManagement.fetchUserPosts(currentUserID, 1);
    }
  }, [
    hasPermission,
    selectedFacebookAccount,
    currentUserID,
    postManagement.fetchUserPosts,
    postManagement.resetPagination,
  ]);

  useEffect(() => {
    if (hasPermission) {
      setHeaderTitle("Tool Facebook - Đăng bài");
      setShowBackButton(false);
      setCurrentPath("/toolfacebook/dang-bai");
    }
  }, [setHeaderTitle, setShowBackButton, setCurrentPath, hasPermission]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  // Effect để cập nhật UI đếm ngược mỗi giây
  useEffect(() => {
    const interval = setInterval(() => {
      // Force re-render để cập nhật thời gian còn lại
      if (selectedFacebookAccount && !canPost()) {
        // Trigger re-render bằng cách cập nhật một dummy state
        setLastPostTime((prev) => ({ ...prev }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedFacebookAccount, canPost]);

  // Hiển thị loading khi đang kiểm tra quyền hoặc load Facebook accounts
  if (isCheckingPermission || (hasPermission && isLoadingAccounts)) {
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="noindex,nofollow" />
          <title>Tool Facebook - Đăng bài</title>
        </Head>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            fontSize: "16px",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div>
            {isCheckingPermission
              ? "Đang kiểm tra quyền truy cập..."
              : "Đang tải danh sách Facebook accounts..."}
          </div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            Tool Facebook - Đăng bài
          </div>
        </div>
      </>
    );
  }

  // Không hiển thị gì nếu không có quyền hoặc chưa có Facebook account
  if (!hasPermission || !selectedFacebookAccount) {
    return null;
  }

  const submitComment = (post: Post) => {
    if (
      modalManagement.commentContent.trim() &&
      modalManagement.showCommentModal &&
      modalManagement.currentPostForComment &&
      !isCurrentAccountCrawling()
    ) {
      const userName = Cookies.get("userName") || "Người dùng";
      const userID = Cookies.get("userID") || "anonymous";
      const newComment: Comment = {
        id: Date.now(),
        to: selectedFacebookAccount.facebookId,
        userLinkFb: selectedFacebookAccount.userLinkFb,
        postId: post.id,
        content: modalManagement.commentContent,
        author: userName,
        authorId: userID,
        timestamp: new Date().toISOString(),
        replies: [],
      };

      postManagement.setPosts((prev) =>
        (prev || []).map((p) =>
          p.id === post.id
            ? {
                ...p,
                comments: [...(p.comments || []), newComment],
              }
            : p
        )
      );

      // Gửi comment qua websocket nếu đã kết nối
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        const commentData = {
          type: "comment",
          content: modalManagement.commentContent,
          postId: post.id.toString(),
          URL: post.facebookUrl || "",
          to: selectedFacebookAccount.facebookId,
          authorName: userName,
          commentId: Date.now().toString(),
          authorId: userID,
        };
        websocket.send(JSON.stringify(commentData));
      }

      modalManagement.handleCloseCommentModal();
    }
  };

  const submitReply = () => {
    if (
      modalManagement.replyContent.trim() &&
      modalManagement.showReplyModal &&
      !isCurrentAccountCrawling()
    ) {
      const userName = Cookies.get("userName") || "Người dùng";
      const userID = Cookies.get("userID") || "anonymous";

      const newReply: Reply = {
        id: Date.now(),
        content: modalManagement.replyContent,
        to: selectedFacebookAccount.facebookId,
        userLinkFb: selectedFacebookAccount.userLinkFb,
        author: userName,
        authorId: userID,
        timestamp: new Date().toISOString(),
        replyToAuthor: modalManagement.showReplyModal.replyToAuthor,
      };

      postManagement.setPosts((prev) =>
        (prev || []).map((post) =>
          post.id === modalManagement.showReplyModal!.postId
            ? {
                ...post,
                comments: post.comments?.map((comment) =>
                  comment.id === modalManagement.showReplyModal!.commentId
                    ? {
                        ...comment,
                        replies: [...(comment.replies || []), newReply],
                      }
                    : comment
                ),
              }
            : post
        )
      );

      // Gửi reply qua websocket nếu đã kết nối
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        let commentUrl = "";
        const currentPost = (postManagement.posts || []).find(
          (post) => post.id === modalManagement.showReplyModal!.postId
        );
        if (
          currentPost &&
          currentPost.comments &&
          currentPost.comments.length > 0
        ) {
          const parentComment = currentPost.comments.find(
            (comment) =>
              comment.id === modalManagement.showReplyModal!.commentId
          );
          if (parentComment && parentComment.facebookCommentUrl) {
            commentUrl = parentComment.facebookCommentUrl;
          }
        }

        let facebookCommentId = "";
        if (
          currentPost &&
          currentPost.comments &&
          currentPost.comments.length > 0
        ) {
          const parentComment = currentPost.comments.find(
            (comment) =>
              comment.id === modalManagement.showReplyModal!.commentId
          );
          if (parentComment && parentComment.id_facebookComment) {
            facebookCommentId = parentComment.id_facebookComment;
          }
        }

        const replyCommentData = {
          type: "reply_comment",
          content: modalManagement.replyContent,
          postId: modalManagement.showReplyModal!.postId.toString(),
          commentId: facebookCommentId,
          URL: commentUrl,
          authorName: userName,
          authorId: userID,
          to: selectedFacebookAccount.facebookId,
        };
        websocket.send(JSON.stringify(replyCommentData));
      }

      modalManagement.setShowReplyModal(null);
      modalManagement.setReplyContent("");
    }
  };

  // Function mới cho reply to reply
  const submitReplyToReply = () => {
    if (
      modalManagement.replyContent.trim() &&
      modalManagement.showReplyModal &&
      !isCurrentAccountCrawling()
    ) {
      const userName = Cookies.get("userName") || "Người dùng";
      const userID = Cookies.get("userID") || "anonymous";

      const newReply: Reply = {
        id: Date.now(),
        content: modalManagement.replyContent,
        userLinkFb: selectedFacebookAccount.userLinkFb,
        to: selectedFacebookAccount.facebookId,
        author: userName,
        authorId: userID,
        timestamp: new Date().toISOString(),
        replyToAuthor: modalManagement.showReplyModal.replyToAuthor,
      };

      postManagement.setPosts((prev) =>
        (prev || []).map((post) =>
          post.id === modalManagement.showReplyModal!.postId
            ? {
                ...post,
                comments: post.comments?.map((comment) =>
                  comment.id === modalManagement.showReplyModal!.commentId
                    ? {
                        ...comment,
                        replies: [...(comment.replies || []), newReply],
                      }
                    : comment
                ),
              }
            : post
        )
      );

      // Gửi reply to reply qua websocket với replyId
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        // Tìm reply cha để lấy id_facebookReply
        let facebookReplyId = "";
        let facebookCommentId = "";
        let facebookReplyURL = "";
        const currentPost = postManagement.posts.find(
          (post) => post.id === modalManagement.showReplyModal!.postId
        );
        if (currentPost && currentPost.comments) {
          // Tìm comment cha theo id (có thể là string hoặc string)
          const parentComment = currentPost.comments.find((comment) => {
            return (
              comment.id_facebookComment ===
              modalManagement.showReplyModal!.facebookCommentId
            );
          });
          if (parentComment) {
            facebookReplyURL =
              parentComment.facebookCommentUrl +
              "&reply_comment_id=" +
              modalManagement.showReplyModal!.facebookReplyId.toString();
            if (parentComment.id_facebookComment) {
              facebookCommentId = parentComment.id_facebookComment;
            }
            if (parentComment.replies) {
              facebookReplyId =
                modalManagement.showReplyModal!.facebookReplyId.toString();
            }
          }
        }

        const replyToReplyData = {
          type: "reply_reply_comment",
          to: selectedFacebookAccount.facebookId,
          content: modalManagement.replyContent,
          postId: modalManagement.showReplyModal!.postId.toString(),
          commentId: facebookCommentId, // Có thể để trống vì có replyId rồi
          replyId: facebookReplyId, // ID của reply được phản hồi
          URL: facebookReplyURL,
          replyToAuthor: modalManagement.showReplyModal.replyToAuthor,
          authorName: userName,
          authorId: userID,
        };
        websocket.send(JSON.stringify(replyToReplyData));
      }

      modalManagement.setShowReplyModal(null);
      modalManagement.setReplyContent("");
    }
  };

  const handleSubmit = async () => {
    // Kiểm tra trạng thái online của Facebook account
    // if (
    //   !onlineStatus[selectedFacebookAccount.facebookId] ||
    //   !onlineStatus[selectedFacebookAccount.facebookId].isOnline
    // ) {
    //   alert("Facebook này hiện không online nên không thể đăng bài!");
    //   return;
    // }

    if (
      modalManagement.postContent.trim() &&
      !isCurrentAccountCrawling() &&
      canPost()
    ) {
      const userID = Cookies.get("userID") || "anonymous";
      const userName = Cookies.get("userName") || "Người dùng";

      // Tạo bài đăng mới cho UI
      const newPost: Post = {
        id: Date.now(),
        to: selectedFacebookAccount.facebookId,
        content: modalManagement.postContent,
        author: userName,
        authorId: userID,
        timestamp: new Date().toISOString(),
        images: modalManagement.uploadedImages.map((img) => ({
          name: img.name || img.filename || "image",
          url: img.link || img.url,
        })), // Sử dụng format {name, url}
        comments: [],
        facebookUrl: undefined,
        isPosted: false,
      };

      // Thêm bài đăng vào đầu danh sách
      postManagement.setPosts((prevPosts) => [newPost, ...(prevPosts || [])]);

      // Cập nhật thời gian đăng bài cuối cùng
      setLastPostTime((prev) => ({
        ...prev,
        [selectedFacebookAccount.facebookId]: Date.now(),
      }));

      // Gửi dữ liệu qua WebSocket nếu đã kết nối
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        // const postData = {
        //   type: "new_post",
        //   postId: newPost.id.toString(),
        //   content: modalManagement.postContent,
        //   authorName: userName,
        //   authorId: userID,
        //   // to: selectedFacebookAccount.facebookId,
        //   to: ["654321"],
        //   attachments: modalManagement.uploadedImages.map((img, index) => ({
        //     name: img.name || img.filename || `image${index}`,
        //     url: img.link || img.url,
        //     type: "image",
        //   })), // Đưa images vào attachments thay vì images
        // };

        const postData = {
          type: "new_post",
          device_id: "TSPNH6GYZLPJBY6X",
          content: modalManagement.postContent,
          to: ["1498"],
        };

        websocket.send(JSON.stringify(postData));
      }

      modalManagement.handleCloseModal();
    } else if (!canPost()) {
      const timeRemaining = getTimeUntilNextPost();
      const formattedTime = formatTimeRemaining(timeRemaining);
      alert(`Bạn cần chờ ${formattedTime} nữa mới có thể đăng bài tiếp theo!`);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("vi-VN");
  };

  // Handler để thay đổi Facebook account
  const handleFacebookAccountChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedFacebookId = event.target.value;
    const selectedAccount = facebookAccounts.find(
      (account) => account.facebookId === selectedFacebookId
    );

    if (selectedAccount) {
      console.log(
        ` Switching to Facebook account: ${selectedAccount.userNameFb}`
      );
      setSelectedFacebookAccount(selectedAccount);

      // Fetch lại posts với Facebook account mới
      if (currentUserID) {
        await postManagement.fetchUserPosts(currentUserID);
      }
    }
  };

  // Handler để bắt đầu cào comment
  const handleCrawlComments = () => {
    if (isCurrentAccountCrawling() || !postManagement.posts.length) {
      return;
    }

    // Gửi yêu cầu cào comment qua WebSocket
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      const userID = Cookies.get("userID") || "anonymous";

      const crawlData = {
        type: "crawl_comment_by_CRM",
        facebookId: selectedFacebookAccount.facebookId,
        authorId: userID,
        to: selectedFacebookAccount.facebookId,
      };

      console.log("Gửi yêu cầu cào comment:", crawlData);
      websocket.send(JSON.stringify(crawlData));

      // Hiển thị thông báo cho user
    } else {
      alert("Kết nối WebSocket không khả dụng. Vui lòng thử lại!");
    }
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Tool Facebook - Đăng bài</title>
        <meta name="description" content="Quản lý và đăng bài lên Facebook" />
        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </Head>

      <div className={styleHome.main} ref={mainRef}>
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}>Tool Facebook - Đăng bài</div>

              {/* Facebook Account Selector */}
              <FacebookAccountSelector
                selectedFacebookAccount={selectedFacebookAccount}
                facebookAccounts={facebookAccounts}
                crawlingStatus={crawlingStatus}
                onlineStatus={onlineStatus}
                isCurrentAccountCrawling={isCurrentAccountCrawling}
                getCurrentCrawlingMessage={getCurrentCrawlingMessage}
                onAccountChange={handleFacebookAccountChange}
              />

              <div className={styles.form_add_potential}>
                {/* Action Buttons */}
                <div
                  className={styles.main__body}
                  style={{ marginBottom: "20px" }}
                >
                  <ActionButtons
                    isCurrentAccountCrawling={isCurrentAccountCrawling}
                    postsLength={postManagement.posts.length}
                    onOpenModal={modalManagement.handleOpenModal}
                    onCrawlComments={handleCrawlComments}
                    stylesContract={stylesContract}
                    canPost={canPost}
                    getTimeUntilNextPost={getTimeUntilNextPost}
                    formatTimeRemaining={formatTimeRemaining}
                  />
                </div>

                {/* Posts List */}
                <div className={styles.main__body}>
                  <PostsHeader
                    postsLength={postManagement.posts.length}
                    isLoadingPosts={postManagement.isLoadingPosts}
                    onRefreshPosts={() => {
                      if (currentUserID) {
                        postManagement.resetPagination();
                        postManagement.fetchUserPosts(currentUserID, 1);
                      }
                    }}
                  />

                  {/* Render posts using PostItem component */}
                  <div>
                    {postManagement.isLoadingPosts ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "40px",
                          color: "#666",
                          fontSize: "14px",
                        }}
                      >
                        Đang tải danh sách bài đăng...
                      </div>
                    ) : postManagement.posts &&
                      postManagement.posts.length > 0 ? (
                      postManagement.posts.map((post) => (
                        <PostItem
                          key={post.id}
                          post={post}
                          formatTimestamp={formatTimestamp}
                          handleComment={modalManagement.handleComment}
                          handleReply={modalManagement.handleReply}
                          disabled={isCurrentAccountCrawling()}
                        />
                      ))
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "40px",
                          color: "#666",
                          fontSize: "14px",
                        }}
                      >
                        Chưa có bài đăng nào. Hãy tạo bài đăng đầu tiên!
                      </div>
                    )}
                  </div>

                  {/* Pagination Controls */}
                  {postManagement.totalPages > 1 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "20px",
                        gap: "10px",
                        borderTop: "1px solid #eee",
                        marginTop: "20px",
                      }}
                    >
                      {/* First Page Button */}
                      <button
                        onClick={() => {
                          if (currentUserID) {
                            postManagement.goToFirstPage(currentUserID);
                          }
                        }}
                        disabled={
                          !postManagement.hasPrevPage ||
                          postManagement.isLoadingPosts
                        }
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          backgroundColor: !postManagement.hasPrevPage
                            ? "#f5f5f5"
                            : "#fff",
                          cursor: !postManagement.hasPrevPage
                            ? "not-allowed"
                            : "pointer",
                          fontSize: "14px",
                        }}
                      >
                        ««
                      </button>

                      {/* Previous Page Button */}
                      <button
                        onClick={() => {
                          if (currentUserID) {
                            postManagement.goToPreviousPage(currentUserID);
                          }
                        }}
                        disabled={
                          !postManagement.hasPrevPage ||
                          postManagement.isLoadingPosts
                        }
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          backgroundColor: !postManagement.hasPrevPage
                            ? "#f5f5f5"
                            : "#fff",
                          cursor: !postManagement.hasPrevPage
                            ? "not-allowed"
                            : "pointer",
                          fontSize: "14px",
                        }}
                      >
                        « Trước
                      </button>

                      {/* Page Info */}
                      <span
                        style={{
                          margin: "0 15px",
                          fontSize: "14px",
                          color: "#666",
                        }}
                      >
                        Trang {postManagement.currentPage} /{" "}
                        {postManagement.totalPages}({postManagement.totalPosts}{" "}
                        bài)
                      </span>

                      {/* Next Page Button */}
                      <button
                        onClick={() => {
                          if (currentUserID) {
                            postManagement.goToNextPage(currentUserID);
                          }
                        }}
                        disabled={
                          !postManagement.hasNextPage ||
                          postManagement.isLoadingPosts
                        }
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          backgroundColor: !postManagement.hasNextPage
                            ? "#f5f5f5"
                            : "#fff",
                          cursor: !postManagement.hasNextPage
                            ? "not-allowed"
                            : "pointer",
                          fontSize: "14px",
                        }}
                      >
                        Sau »
                      </button>

                      {/* Last Page Button */}
                      <button
                        onClick={() => {
                          if (currentUserID) {
                            postManagement.goToLastPage(currentUserID);
                          }
                        }}
                        disabled={
                          !postManagement.hasNextPage ||
                          postManagement.isLoadingPosts
                        }
                        style={{
                          padding: "8px 12px",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          backgroundColor: !postManagement.hasNextPage
                            ? "#f5f5f5"
                            : "#fff",
                          cursor: !postManagement.hasNextPage
                            ? "not-allowed"
                            : "pointer",
                          fontSize: "14px",
                        }}
                      >
                        »»
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Post Modal */}
      <PostModal
        showModal={modalManagement.showModal}
        postContent={modalManagement.postContent}
        setPostContent={modalManagement.setPostContent}
        selectedImages={modalManagement.selectedImages}
        setSelectedImages={modalManagement.setSelectedImages}
        handleCloseModal={modalManagement.handleCloseModal}
        handleSubmit={handleSubmit}
        handleImageUpload={imageManagement.handleImageUpload}
        removeImage={imageManagement.removeImage}
        isUploadingImages={modalManagement.isUploadingImages}
        isDeletingImage={modalManagement.isDeletingImage}
      />

      {/* Comment Modal */}
      <CommentModal
        showCommentModal={modalManagement.showCommentModal}
        commentContent={modalManagement.commentContent}
        setCommentContent={modalManagement.setCommentContent}
        setShowCommentModal={modalManagement.handleCloseCommentModal}
        submitComment={submitComment}
        post={modalManagement.currentPostForComment}
      />

      {/* Reply Modal */}
      <ReplyModal
        showReplyModal={modalManagement.showReplyModal}
        replyContent={modalManagement.replyContent}
        setReplyContent={modalManagement.setReplyContent}
        setShowReplyModal={modalManagement.setShowReplyModal}
        submitReplyToReply={submitReplyToReply}
        submitReply={submitReply}
        disabled={isCurrentAccountCrawling()}
      />
    </>
  );
}

export default DangBaiPost;
