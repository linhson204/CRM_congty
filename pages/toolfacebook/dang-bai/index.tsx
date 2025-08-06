import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import stylesContract from "@/components/crm/contract/contract_action.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import {
  getPostbyUserId,
  createPost,
} from "../../api/toolFacebook/dang-bai/dang-bai";
import {
  uploadImage,
  deleteImage,
} from "../../api/toolFacebook/dang-bai/upload";
import { getCommentByPostId } from "../../api/toolFacebook/dang-bai/comment";

// Import types and components
import {
  Post,
  Comment,
  Reply,
  ShowReplyModal,
  FacebookAccount,
} from "@/components/toolFacebook/dangbai/types";
import { useWebSocket } from "@/components/toolFacebook/dangbai/hooks/useWebSocket";
import { PostModal } from "@/components/toolFacebook/dangbai/components/PostModal";
import { CommentModal } from "@/components/toolFacebook/dangbai/components/CommentModal";
import { ReplyModal } from "@/components/toolFacebook/dangbai/components/ReplyModal";
import { PostItem } from "@/components/toolFacebook/dangbai/components/PostItem";
import customStyles from "@/components/toolFacebook/dangbai/styles/styles.module.css";

function DangBaiPost() {
  const router = useRouter();
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();

  // States cho kiểm tra quyền
  const [hasPermission, setHasPermission] = useState(false);
  const [isCheckingPermission, setIsCheckingPermission] = useState(true);

  // Danh sách ID được phép truy cập trang Tool Facebook
  const ALLOWED_USER_IDS = [
    "22858640",
    // Thêm các ID được phép vào đây
  ];

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  // States cho Facebook accounts
  const [facebookAccounts, setFacebookAccounts] = useState<FacebookAccount[]>([
    {
      userNameFb: "Giản Vũ",
      userLinkFb: "https://www.facebook.com/gian.vu.792551",
      facebookId: "B22858640",
      username: "gianvu17607@gmail.com",
      password: "lvqh1234",
    },
    {
      userNameFb: "Test (Chưa có)",
      userLinkFb: "https://facebook.com/recruitment",
      facebookId: "B33445566",
      username: "recruitment@email.com",
      password: "password456",
    },
  ]);

  const [selectedFacebookAccount, setSelectedFacebookAccount] =
    useState<FacebookAccount>(
      facebookAccounts[0] // Chọn account đầu tiên làm mặc định
    );

  // State để track crawling status cho từng Facebook account
  const [crawlingStatus, setCrawlingStatus] = useState<{
    [facebookId: string]: {
      isActive: boolean;
      message: string;
      timestamp?: string;
    };
  }>({});

  // Function để convert dữ liệu từ API sang format của component
  const convertApiPostToComponentPost = (apiPost: any): Post => {
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
      id: parseInt(apiPost.facebookPostId) || Date.now(), // Sử dụng facebookPostId làm id
      to: apiPost.facebookId || selectedFacebookAccount.facebookId,
      content: apiPost.content,
      author: apiPost.userNameFacebook || "Người dùng",
      authorId: apiPost.userId,
      timestamp: apiPost.createdAt
        ? new Date(apiPost.createdAt * 1000).toLocaleString("vi-VN")
        : new Date().toLocaleString("vi-VN"),
      images: convertedImages,
      comments: [], // Sẽ được load sau nếu cần
      facebookUrl: apiPost.facebookPostUrl,
      isPosted: !!apiPost.facebookPostUrl, // Nếu có URL thì đã post thành công
    };
  };

  // Function để convert reply từ API sang format của component
  const convertApiReplyToComponentReply = (apiReply: any): Reply => {
    return {
      id: parseInt(apiReply.id_facebookReply) || Date.now(),
      to: selectedFacebookAccount.facebookId,
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
  };

  // Function để convert comment từ API sang format của component
  const convertApiCommentToComponentComment = (apiComment: any): Comment => {
    // Convert replies nếu có
    const replies: Reply[] = Array.isArray(apiComment.listFeedback)
      ? apiComment.listFeedback.map(convertApiReplyToComponentReply)
      : [];

    return {
      idMongodb: apiComment._id,
      id: parseInt(apiComment.facebookCommentId) || Date.now(),
      to: apiComment.facebookId || selectedFacebookAccount.facebookId,
      postId: parseInt(apiComment.postId),
      content: apiComment.content,
      userLinkFb: apiComment.userLinkFb || "",
      author: apiComment.userNameFacebook || "Facebook User",
      authorId: apiComment.userId || "facebook_user",
      timestamp: apiComment.createdAt
        ? new Date(apiComment.createdAt * 1000).toLocaleString("vi-VN")
        : new Date().toLocaleString("vi-VN"),
      replies: replies, // Sử dụng replies đã convert
      id_facebookComment: apiComment.facebookCommentId,
      facebookCommentUrl: apiComment.facebookCommentUrl || "",
    };
  };

  // Function để load comments cho từng post
  const loadCommentsForPost = async (post: Post) => {
    try {
      const userID = Cookies.get("userID") || "anonymous";
      const facebookId = selectedFacebookAccount.facebookId; // Sử dụng selectedFacebookAccount

      const response = await getCommentByPostId(
        post.id.toString(),
        userID,
        facebookId
      );

      if (response.results) {
        const comments = response.results.map(
          convertApiCommentToComponentComment
        );

        // Update post với comments
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
          `❌ No comments found for post ${post.id}. Response:`,
          response
        );
      }
    } catch (error) {
      console.error(`Error loading comments for post ${post.id}:`, error);
    }
  };

  // Function để load comments cho tất cả posts
  const loadCommentsForAllPosts = async (postsToLoad: Post[]) => {
    try {
      // Load comments cho từng post tuần tự để tránh quá tải
      for (const post of postsToLoad) {
        if (post.isPosted) {
          // Chỉ load comments cho posts đã được post thành công
          await loadCommentsForPost(post);
        }
      }
    } catch (error) {
      console.error("Error loading comments for posts:", error);
    }
  };

  // Function để refresh comments cho một post cụ thể (dùng từ WebSocket)
  const refreshCommentsForPost = async (postId: string | number) => {
    try {
      const post = posts.find((p) => p.id.toString() === postId.toString());
      if (post && post.isPosted) {
        await loadCommentsForPost(post);
      }
    } catch (error) {
      console.error(`Error refreshing comments for post ${postId}:`, error);
    }
  };

  // Function để fetch posts từ API
  const fetchUserPosts = async (userId: string) => {
    setIsLoadingPosts(true);
    try {
      const response = await getPostbyUserId(
        userId,
        selectedFacebookAccount.facebookId
      );

      if (response && response.results) {
        const convertedPosts = response.results.map(
          convertApiPostToComponentPost
        );
        setPosts(convertedPosts);

        // Load comments cho tất cả posts sau khi load xong posts
        setTimeout(async () => {
          await loadCommentsForAllPosts(convertedPosts);
        }, 500); // Delay nhỏ để UI render trước
      } else {
        console.warn("⚠️ No posts found or invalid response");
        setPosts([]);
      }
    } catch (error) {
      console.error("❌ Error fetching posts:", error);
      // Giữ posts hiện tại nếu có lỗi
    } finally {
      setIsLoadingPosts(false);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]); // Lưu thông tin ảnh đã upload
  const [isUploadingImages, setIsUploadingImages] = useState(false); // Loading state cho upload
  const [isDeletingImage, setIsDeletingImage] = useState<number | null>(null); // Loading state cho delete
  const [showCommentModal, setShowCommentModal] = useState<number | null>(null);
  const [currentPostForComment, setCurrentPostForComment] =
    useState<Post | null>(null);
  const [commentContent, setCommentContent] = useState("");
  const [showReplyModal, setShowReplyModal] = useState<ShowReplyModal | null>(
    null
  );
  const [replyContent, setReplyContent] = useState("");

  // Check xem Facebook account hiện tại có đang crawl không
  const isCurrentAccountCrawling = useCallback(() => {
    const currentStatus =
      crawlingStatus[selectedFacebookAccount.facebookId]?.isActive || false;
    return currentStatus;
  }, [crawlingStatus, selectedFacebookAccount.facebookId]);

  // Get crawling message cho account hiện tại
  const getCurrentCrawlingMessage = useCallback(() => {
    const status = crawlingStatus[selectedFacebookAccount.facebookId];
    return status?.message || "";
  }, [crawlingStatus, selectedFacebookAccount.facebookId]);

  // Use WebSocket hook
  const websocket = useWebSocket(
    posts,
    setPosts,
    refreshCommentsForPost,
    setCrawlingStatus
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

        // Fetch posts sau khi verify permission thành công
        await fetchUserPosts(userID);
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

  useEffect(() => {
    if (hasPermission) {
      setHeaderTitle("Tool Facebook - Đăng bài");
      setShowBackButton(false);
      setCurrentPath("/toolfacebook/dang-bai");
    }
  }, [setHeaderTitle, setShowBackButton, setCurrentPath, hasPermission]);

  // Effect để fetch posts khi selectedFacebookAccount thay đổi
  useEffect(() => {
    if (hasPermission && selectedFacebookAccount) {
      const userID = Cookies.get("userID");
      if (userID) {
        fetchUserPosts(userID);
      }
    }
  }, [hasPermission, selectedFacebookAccount]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  // Hiển thị loading khi đang kiểm tra quyền
  if (isCheckingPermission) {
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
          <div>Đang kiểm tra quyền truy cập...</div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            Tool Facebook - Đăng bài
          </div>
        </div>
      </>
    );
  }

  // Không hiển thị gì nếu không có quyền (đã chuyển hướng)
  if (!hasPermission) {
    return null;
  }

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPostContent("");
    setSelectedImages([]);
    setUploadedImages([]); // Reset uploaded images
    setIsUploadingImages(false); // Reset upload state
    setIsDeletingImage(null); // Reset delete state
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setIsUploadingImages(true);

      try {
        // Giới hạn tối đa 4 ảnh
        const maxFiles = Math.min(files.length, 4 - uploadedImages.length);
        const filesToUpload = Array.from(files).slice(0, maxFiles);

        // Upload ảnh lên BE
        const uploadResponse = await uploadImage(filesToUpload);

        if (uploadResponse && Array.isArray(uploadResponse)) {
          // Lưu thông tin ảnh đã upload
          setUploadedImages((prev) => [...prev, ...uploadResponse]);

          // Cập nhật preview images (dùng URL từ BE)
          const newImageUrls = uploadResponse.map((img) => img.link || img.url);
          setSelectedImages((prev) => [...prev, ...newImageUrls]);
        } else {
          console.error("❌ Invalid upload response:", uploadResponse);
          alert("Lỗi khi upload ảnh. Vui lòng thử lại!");
        }
      } catch (error) {
        console.error("❌ Error uploading images:", error);
        alert("Lỗi khi upload ảnh. Vui lòng thử lại!");
      } finally {
        setIsUploadingImages(false);
      }
    }
  };

  const removeImage = async (index: number) => {
    try {
      setIsDeletingImage(index); // Set loading state cho ảnh này

      // Lấy thông tin ảnh cần xóa
      const imageToDelete = uploadedImages[index];

      if (imageToDelete && imageToDelete.id) {
        // Gọi API xóa ảnh trên BE
        await deleteImage(imageToDelete.id);
      }

      // Xóa khỏi state
      setSelectedImages((prev) => prev.filter((_, i) => i !== index));
      setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(`❌ Error deleting image at index ${index}:`, error);

      // Vẫn xóa khỏi UI ngay cả khi API fails
      setSelectedImages((prev) => prev.filter((_, i) => i !== index));
      setUploadedImages((prev) => prev.filter((_, i) => i !== index));

      // Hiển thị thông báo lỗi cho user
      alert(
        "Có lỗi khi xóa ảnh trên server, nhưng ảnh đã được xóa khỏi danh sách."
      );
    } finally {
      setIsDeletingImage(null); // Reset loading state
    }
  };

  const handleComment = (post: Post) => {
    setShowCommentModal(post.id);
    setCurrentPostForComment(post); // Lưu thông tin post hiện tại
    setCommentContent("");
  };

  const handleCloseCommentModal = () => {
    setShowCommentModal(null);
    setCurrentPostForComment(null);
    setCommentContent("");
  };

  const handleReply = (
    postId: number,
    commentId: number,
    replyToAuthor?: string,
    replyId?: any,
    facebookCommentId?: string,
    facebookReplyId?: string
  ) => {
    setShowReplyModal({
      postId,
      commentId,
      replyToAuthor,
      replyId,
      facebookCommentId,
      facebookReplyId,
    });
    setReplyContent("");
  };

  const submitComment = (post: Post) => {
    if (
      commentContent.trim() &&
      showCommentModal &&
      currentPostForComment &&
      !isCurrentAccountCrawling()
    ) {
      const userName = Cookies.get("userName") || "Người dùng";
      const userID = Cookies.get("userID") || "anonymous";
      const newComment: Comment = {
        id: Date.now(),
        to: selectedFacebookAccount.facebookId,
        userLinkFb: "sadnfjdsf",
        postId: post.id,
        content: commentContent,
        author: userName,
        authorId: userID,
        timestamp: new Date().toLocaleString("vi-VN"),
        replies: [],
      };

      setPosts((prev) =>
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
          content: commentContent,
          postId: post.id.toString(),
          URL: post.facebookUrl || "",
          to: selectedFacebookAccount.facebookId,
          authorName: userName,
          commentId: Date.now().toString(), // id tạm thời theo thời gian gửi sau xóa đi
          authorId: userID,
          attachments: [],
          metadata: {
            category: "comment",
            source: "crm_tool",
            platform: "facebook",
            action: "create_comment",
            timestamp: new Date().toISOString(),
          },
        };
        websocket.send(JSON.stringify(commentData));
      }

      setShowCommentModal(null);
      setCurrentPostForComment(null);
      setCommentContent("");
    }
  };

  const submitReply = () => {
    if (replyContent.trim() && showReplyModal && !isCurrentAccountCrawling()) {
      const userName = Cookies.get("userName") || "Người dùng";
      const userID = Cookies.get("userID") || "anonymous";

      const newReply: Reply = {
        id: Date.now(),
        content: replyContent, // Chỉ lưu content thuần, không ghép @tên
        to: selectedFacebookAccount.facebookId,
        userLinkFb: selectedFacebookAccount.userLinkFb,
        author: userName,
        authorId: userID,
        timestamp: new Date().toLocaleString("vi-VN"),
        replyToAuthor: showReplyModal.replyToAuthor, // Lưu thông tin người được reply riêng
      };

      setPosts((prev) =>
        (prev || []).map((post) =>
          post.id === showReplyModal.postId
            ? {
                ...post,
                comments: post.comments?.map((comment) =>
                  comment.id === showReplyModal.commentId
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
        // Tìm comment cha để lấy facebookCommentUrl nếu có
        let commentUrl = "";
        const currentPost = (posts || []).find(
          (post) => post.id === showReplyModal.postId
        );
        if (
          currentPost &&
          currentPost.comments &&
          currentPost.comments.length > 0
        ) {
          const parentComment = currentPost.comments.find(
            (comment) => comment.id === showReplyModal.commentId
          );
          if (parentComment && parentComment.facebookCommentUrl) {
            commentUrl = parentComment.facebookCommentUrl;
          }
        }
        // Lấy id_facebookComment để gửi qua WebSocket
        let facebookCommentId = "";
        if (
          currentPost &&
          currentPost.comments &&
          currentPost.comments.length > 0
        ) {
          const parentComment = currentPost.comments.find(
            (comment) => comment.id === showReplyModal.commentId
          );
          if (parentComment && parentComment.id_facebookComment) {
            facebookCommentId = parentComment.id_facebookComment;
          }
        }

        const replyCommentData = {
          type: "reply_comment",
          content: replyContent, // Gửi qua WebSocket với @tên
          postId: showReplyModal.postId.toString(),
          commentId: facebookCommentId, // Sử dụng id_facebookComment thay vì local commentId
          URL: commentUrl,
          authorName: userName,
          authorId: userID,
          to: selectedFacebookAccount.facebookId,
          attachments: [],
          metadata: {
            category: "reply",
            source: "crm_tool",
            platform: "facebook",
            action: "create_reply",
            timestamp: new Date().toISOString(),
          },
        };
        websocket.send(JSON.stringify(replyCommentData));
      }

      setShowReplyModal(null);
      setReplyContent("");
    }
  };

  // Function mới cho reply to reply
  const submitReplyToReply = () => {
    if (replyContent.trim() && showReplyModal && !isCurrentAccountCrawling()) {
      const userName = Cookies.get("userName") || "Người dùng";
      const userID = Cookies.get("userID") || "anonymous";

      const newReply: Reply = {
        id: Date.now(),
        content: replyContent,
        userLinkFb: selectedFacebookAccount.userLinkFb,
        to: selectedFacebookAccount.facebookId,
        author: userName,
        authorId: userID,
        timestamp: new Date().toLocaleString("vi-VN"),
        replyToAuthor: showReplyModal.replyToAuthor,
      };

      setPosts((prev) =>
        (prev || []).map((post) =>
          post.id === showReplyModal.postId
            ? {
                ...post,
                comments: post.comments?.map((comment) =>
                  comment.id === showReplyModal.commentId
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
        const currentPost = (posts || []).find(
          (post) => post.id === showReplyModal.postId
        );
        if (currentPost && currentPost.comments) {
          // Tìm comment cha theo id (có thể là string hoặc string)
          const parentComment = currentPost.comments.find((comment) => {
            return (
              comment.id_facebookComment === showReplyModal.facebookCommentId
            );
          });
          facebookReplyURL =
            parentComment.facebookCommentUrl +
            "&reply_comment_id=" +
            showReplyModal.facebookReplyId.toString();
          if (parentComment && parentComment.id_facebookComment) {
            facebookCommentId = parentComment.id_facebookComment;
          }
          if (parentComment && parentComment.replies) {
            facebookReplyId = showReplyModal.facebookReplyId.toString();
          }
        }

        const replyToReplyData = {
          type: "reply_reply_comment",
          to: selectedFacebookAccount.facebookId,
          content: replyContent,
          postId: showReplyModal.postId.toString(),
          commentId: facebookCommentId, // Có thể để trống vì có replyId rồi
          replyId: facebookReplyId, // ID của reply được phản hồi
          URL: facebookReplyURL,
          authorName: userName,
          authorId: userID,
          attachments: [],
          metadata: {
            category: "reply_to_reply",
            source: "crm_tool",
            platform: "facebook",
            action: "create_reply_to_reply",
            timestamp: new Date().toISOString(),
          },
        };
        websocket.send(JSON.stringify(replyToReplyData));
      }

      setShowReplyModal(null);
      setReplyContent("");
    }
  };

  const handleSubmit = async () => {
    if (postContent.trim() && !isCurrentAccountCrawling()) {
      const userID = Cookies.get("userID") || "anonymous";
      const userName = Cookies.get("userName") || "Người dùng";

      // Tạo bài đăng mới cho UI
      const newPost: Post = {
        id: Date.now(),
        to: selectedFacebookAccount.facebookId,
        content: postContent,
        author: userName,
        authorId: userID,
        timestamp: new Date().toLocaleString("vi-VN"),
        images: uploadedImages.map((img) => ({
          name: img.name || img.filename || "image",
          url: img.link || img.url,
        })), // Sử dụng format {name, url}
        comments: [],
        facebookUrl: undefined,
        isPosted: false,
      };

      // Thêm bài đăng vào đầu danh sách
      setPosts((prevPosts) => [newPost, ...(prevPosts || [])]);

      // Gửi dữ liệu qua WebSocket nếu đã kết nối
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        const postData = {
          type: "new_post",
          postId: newPost.id.toString(),
          content: postContent,
          authorName: userName,
          authorId: userID,
          to: selectedFacebookAccount.facebookId,
          attachments: uploadedImages.map((img) => ({
            name: img.name || img.filename || "image",
            url: img.link || img.url,
            type: "image",
          })), // Đưa images vào attachments thay vì images
          metadata: {
            category: "job_posting",
            source: "crm_tool",
            platform: "facebook",
            action: "create_post",
            timestamp: new Date().toISOString(),
          },
        };

        websocket.send(JSON.stringify(postData));
      }

      handleCloseModal();
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
      setSelectedFacebookAccount(selectedAccount);

      // Fetch lại posts với Facebook account mới
      const userID = Cookies.get("userID");
      if (userID) {
        await fetchUserPosts(userID);
      }
    }
  };

  // Handler để bắt đầu cào comment
  const handleCrawlComments = () => {
    if (isCurrentAccountCrawling() || !posts.length) {
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

      console.log("🚀 Gửi yêu cầu cào comment:", crawlData);
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

              {/* Dropdown chọn Facebook Account */}
              <div
                style={{
                  marginBottom: "20px",
                  padding: "16px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                }}
              >
                <div
                  style={{
                    marginBottom: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#333",
                  }}
                >
                  Chọn tài khoản Facebook:
                </div>
                <select
                  value={selectedFacebookAccount.facebookId}
                  onChange={handleFacebookAccountChange}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "14px",
                    backgroundColor: "white",
                    cursor: "pointer",
                  }}
                >
                  {facebookAccounts.map((account) => (
                    <option key={account.facebookId} value={account.facebookId}>
                      {account.userNameFb} ({account.facebookId})
                      {crawlingStatus[account.facebookId]?.isActive
                        ? " - 🔄 Đang cào..."
                        : ""}
                    </option>
                  ))}
                </select>

                {/* Hiển thị crawling status */}
                {isCurrentAccountCrawling() && (
                  <div
                    style={{
                      marginTop: "8px",
                      padding: "8px 12px",
                      backgroundColor: "#fff3cd",
                      border: "1px solid #ffeaa7",
                      borderRadius: "4px",
                      fontSize: "12px",
                      color: "#856404",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span style={{ animation: "spin 1s linear infinite" }}>
                      🔄
                    </span>
                    <span>
                      <strong>Đang cào comment:</strong>{" "}
                      {getCurrentCrawlingMessage()}
                    </span>
                  </div>
                )}

                {/* Hiển thị thông tin account được chọn */}
                <div
                  style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}
                >
                  <div>
                    <strong>Trang:</strong> {selectedFacebookAccount.userNameFb}
                  </div>
                  <div>
                    <strong>Link:</strong>{" "}
                    <a
                      href={selectedFacebookAccount.userLinkFb}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#007bff" }}
                    >
                      {selectedFacebookAccount.userLinkFb}
                    </a>
                  </div>
                  <div>
                    <strong>ID:</strong> {selectedFacebookAccount.facebookId}
                  </div>
                </div>
              </div>

              <div className={styles.form_add_potential}>
                {/* Nút đăng bài mới */}
                <div
                  className={styles.main__body}
                  style={{ marginBottom: "20px" }}
                >
                  <div style={{ display: "flex", gap: "12px" }}>
                    <button
                      onClick={handleOpenModal}
                      disabled={isCurrentAccountCrawling()}
                      className={stylesContract.sub2}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "12px 24px",
                        fontSize: "14px",
                        justifyContent: "center",
                        opacity: isCurrentAccountCrawling() ? 0.6 : 1,
                        cursor: isCurrentAccountCrawling()
                          ? "not-allowed"
                          : "pointer",
                        minWidth: "160px",
                      }}
                    >
                      <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                        {isCurrentAccountCrawling() ? "🔄" : "+"}
                      </span>
                      {isCurrentAccountCrawling()
                        ? "Đang cào comment..."
                        : "Đăng bài mới"}
                    </button>

                    <button
                      onClick={handleCrawlComments}
                      disabled={isCurrentAccountCrawling() || !posts.length}
                      className={stylesContract.sub2}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "12px 24px",
                        fontSize: "14px",
                        justifyContent: "center",
                        opacity:
                          isCurrentAccountCrawling() || !posts.length ? 0.6 : 1,
                        cursor:
                          isCurrentAccountCrawling() || !posts.length
                            ? "not-allowed"
                            : "pointer",
                        backgroundColor: "#28a745",
                        borderColor: "#28a745",
                        minWidth: "160px",
                      }}
                    >
                      <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                        {isCurrentAccountCrawling() ? "🔄" : "🔍"}
                      </span>
                      {isCurrentAccountCrawling()
                        ? "Đang cào..."
                        : "Cào comment"}
                    </button>
                  </div>
                </div>

                {/* Header danh sách */}
                <div className={styles.main__body}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "16px",
                      paddingBottom: "12px",
                      borderBottom: "2px solid #e0e0e0",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        margin: 0,
                        color: "#333",
                      }}
                    >
                      Danh sách bài đăng
                    </h2>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <button
                        onClick={() => {
                          const userID = Cookies.get("userID");
                          if (userID) {
                            fetchUserPosts(userID);
                          }
                        }}
                        style={{
                          background: "none",
                          border: "1px solid #007bff",
                          color: "#007bff",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                        disabled={isLoadingPosts}
                      >
                        ↻ Làm mới
                      </button>
                      {isLoadingPosts && (
                        <span style={{ fontSize: "12px", color: "#666" }}>
                          Đang tải...
                        </span>
                      )}
                      <span
                        style={{
                          backgroundColor: "#007bff",
                          color: "white",
                          padding: "4px 12px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: "500",
                        }}
                      >
                        {posts?.length || 0} bài
                      </span>
                    </div>
                  </div>

                  {/* Render posts using PostItem component */}
                  <div>
                    {isLoadingPosts ? (
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
                    ) : posts && posts.length > 0 ? (
                      posts.map((post) => (
                        <PostItem
                          key={post.id}
                          post={post}
                          formatTimestamp={formatTimestamp}
                          handleComment={handleComment}
                          handleReply={handleReply}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Post Modal */}
      <PostModal
        showModal={showModal}
        postContent={postContent}
        setPostContent={setPostContent}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
        handleImageUpload={handleImageUpload}
        removeImage={removeImage}
        isUploadingImages={isUploadingImages}
        isDeletingImage={isDeletingImage}
      />

      {/* Comment Modal */}
      <CommentModal
        showCommentModal={showCommentModal}
        commentContent={commentContent}
        setCommentContent={setCommentContent}
        setShowCommentModal={handleCloseCommentModal}
        submitComment={submitComment}
        post={currentPostForComment}
      />

      {/* Reply Modal */}
      <ReplyModal
        showReplyModal={showReplyModal}
        replyContent={replyContent}
        setReplyContent={setReplyContent}
        setShowReplyModal={setShowReplyModal}
        submitReplyToReply={submitReplyToReply}
        submitReply={submitReply}
        disabled={isCurrentAccountCrawling()}
      />
    </>
  );
}

export default DangBaiPost;
