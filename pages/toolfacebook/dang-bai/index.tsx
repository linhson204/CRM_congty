import React, { useState, useEffect, useContext, useRef } from 'react';
import Cookies from 'js-cookie';
import Head from "next/head";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import stylesContract from "@/components/crm/contract/contract_action.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";

// Import types and components
import { Post, Comment, Reply, ShowReplyModal } from '@/components/toolFacebook/dangbai/types';
import { useWebSocket } from '@/components/toolFacebook/dangbai/hooks/useWebSocket';
import { PostModal } from '@/components/toolFacebook/dangbai/components/PostModal';
import { CommentModal } from '@/components/toolFacebook/dangbai/components/CommentModal';
import { ReplyModal } from '@/components/toolFacebook/dangbai/components/ReplyModal';
import { PostItem } from '@/components/toolFacebook/dangbai/components/PostItem';
import customStyles from '@/components/toolFacebook/dangbai/styles/styles.module.css';

function DangBaiPost() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any = useHeader();

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      content: "Đây là bài đăng mẫu đầu tiên về việc làm tại công ty.",
      author: "Nguyễn Văn A",
      authorId: "user123",
      timestamp: "2024-01-20 10:30:00",
      images: [],
      comments: [
        {
          id: 1,
          id_facebookComment: "1",
          content: "Bài viết rất hay!",
          author: "Trần Văn B",
          authorId: "user789",
          timestamp: "2024-01-20 11:00:00",
          replies: [
            {
              id: 1,
              content: "Cảm ơn bạn!",
              author: "Nguyễn Văn A",
              authorId: "user123",
              timestamp: "2024-01-20 11:15:00"
            }
          ]
        }
      ],
      likes: 5,
      facebookUrl: "https://www.facebook.com/sample/posts/123456789",
      isPosted: true
    },
    {
      id: 2,
      content: "Chúng tôi đang tuyển dụng các vị trí lập trình viên với mức lương hấp dẫn.",
      author: "Trần Thị B",
      authorId: "user456",
      timestamp: "2024-01-19 15:45:00",
      images: [],
      comments: [
        {
          id: 2,
          id_facebookComment: "2",
          content: "Công ty có cần thực tập sinh không ạ?",
          author: "Lê Thị C",
          authorId: "user999",
          timestamp: "2024-01-19 16:00:00",
          replies: [
            {
              id: 2,
              content: "Có bạn ơi, bạn có thể nộp hồ sơ qua email HR@company.com",
              author: "Trần Thị B",
              authorId: "user456",
              timestamp: "2024-01-19 16:30:00"
            },
            {
              id: 3,
              content: "Cảm ơn chị ạ!",
              author: "Lê Thị C",
              authorId: "user999",
              timestamp: "2024-01-19 16:45:00"
            }
          ]
        }
      ],
      likes: 12,
      facebookUrl: "https://www.facebook.com/sample/posts/987654321",
      isPosted: true
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [showCommentModal, setShowCommentModal] = useState<number | null>(null);
  const [commentContent, setCommentContent] = useState('');
  const [showReplyModal, setShowReplyModal] = useState<ShowReplyModal | null>(null);
  const [replyContent, setReplyContent] = useState('');

  // Use WebSocket hook
  const websocket = useWebSocket(posts, setPosts);

  useEffect(() => {
    setHeaderTitle("Tool Facebook - Đăng bài");
    setShowBackButton(false);
    setCurrentPath("/toolfacebook/dang-bai");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPostContent('');
    setSelectedImages([]);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageUrls: string[] = [];
      for (let i = 0; i < Math.min(files.length, 4); i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            imageUrls.push(e.target.result as string);
            if (imageUrls.length === Math.min(files.length, 4)) {
              setSelectedImages(prev => [...prev, ...imageUrls].slice(0, 4));
            }
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleLike = (postId: number) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: (post.likes || 0) + 1 }
        : post
    ));
  };

  const handleComment = (postId: number) => {
    setShowCommentModal(postId);
    setCommentContent('');
  };

  const handleReply = (postId: number, commentId: number, replyToAuthor?: string, replyId?: any , facebookCommentId?: string, facebookReplyId?: string) => {
    setShowReplyModal({postId, commentId, replyToAuthor, replyId,facebookCommentId,facebookReplyId});
    console.log(postId),
    console.log(facebookCommentId),
    console.log(replyToAuthor),
    console.log(facebookReplyId),
    setReplyContent('');
  };

  const submitComment = () => {
    if (commentContent.trim() && showCommentModal) {
      const userName = Cookies.get('userName') || 'Người dùng';
      const userID = Cookies.get('userId') || 'anonymous';
      const newComment: Comment = {
        id: Date.now(),
        content: commentContent,
        author: userName,
        authorId: userID,
        timestamp: new Date().toLocaleString('vi-VN'),
        replies: []
      };
      setPosts(prev => prev.map(post => 
        post.id === showCommentModal
          ? { 
              ...post, 
              comments: [...(post.comments || []), newComment]
            }
          : post
      ));

      // Gửi comment qua websocket nếu đã kết nối
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        // Tìm bài đăng tương ứng để lấy URL
        // Lấy URL comment Facebook nếu có
        let postUrl = '';
        const currentPost = posts.find(post => post.id === showCommentModal);
        postUrl = currentPost.facebookUrl ;
       
        const commentData = {
          type: 'comment',
          content: commentContent,
          postId: showCommentModal.toString(),
          URL: postUrl,
          authorName: userName,
          commentId: Date.now().toString(), // id tạm thời theo thời gian gửi sau xóa đi
          authorId: userID,
          attachments: [],
          metadata: {
            category: 'comment',
            source: 'crm_tool',
            platform: 'facebook',
            action: 'create_comment',
            timestamp: new Date().toISOString()
          }
        };
        websocket.send(JSON.stringify(commentData));
        console.log('Đã gửi comment qua WebSocket:', commentData);
      }

      setShowCommentModal(null);
      setCommentContent('');
    }
  };

  const submitReply = () => {
    if (replyContent.trim() && showReplyModal) {
      const userName = Cookies.get('userName') || 'Người dùng';
      const userID = Cookies.get('userId') || 'anonymous';
      
      const newReply: Reply = {
        id: Date.now(),
        content: replyContent, // Chỉ lưu content thuần, không ghép @tên
        author: userName,
        authorId: userID,
        timestamp: new Date().toLocaleString('vi-VN'),
        replyToAuthor: showReplyModal.replyToAuthor, // Lưu thông tin người được reply riêng
      };

      setPosts(prev => prev.map(post => 
        post.id === showReplyModal.postId
          ? { 
              ...post, 
              comments: post.comments?.map(comment =>
                comment.id === showReplyModal.commentId
                  ? { 
                      ...comment,
                      replies: [...(comment.replies || []), newReply]
                    }
                  : comment
              )
            }
          : post
      ));

      // Gửi reply qua websocket nếu đã kết nối
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        // Tìm comment cha để lấy facebookCommentUrl nếu có
        let commentUrl = '';
        const currentPost = posts.find(post => post.id === showReplyModal.postId);
        if (currentPost && currentPost.comments && currentPost.comments.length > 0) {
          const parentComment = currentPost.comments.find(comment => comment.id === showReplyModal.commentId);
          if (parentComment && parentComment.facebookCommentUrl) {
            commentUrl = parentComment.facebookCommentUrl;
          }
        }
        // Lấy id_facebookComment để gửi qua WebSocket
        let facebookCommentId = '';
        if (currentPost && currentPost.comments && currentPost.comments.length > 0) {
          const parentComment = currentPost.comments.find(comment => comment.id === showReplyModal.commentId);
          if (parentComment && parentComment.id_facebookComment) {
            facebookCommentId = parentComment.id_facebookComment;
          }
        }
        
        const replyCommentData = {
          type: 'reply_comment',
          content: replyContent, // Gửi qua WebSocket với @tên
          postId: showReplyModal.postId.toString(),
          commentId: facebookCommentId, // Sử dụng id_facebookComment thay vì local commentId
          URL: commentUrl,
          authorName: userName,
          authorId: userID,
          attachments: [],
          metadata: {
            category: 'reply',
            source: 'crm_tool',
            platform: 'facebook',
            action: 'create_reply',
            timestamp: new Date().toISOString()
          }
        };
        websocket.send(JSON.stringify(replyCommentData));
        console.log('Đã gửi reply qua WebSocket:', replyCommentData);
      }

      setShowReplyModal(null);
      setReplyContent('');
    }
  };

  // Function mới cho reply to reply
  const submitReplyToReply = () => {
    if (replyContent.trim() && showReplyModal) {
      const userName = Cookies.get('userName') || 'Người dùng';
      const userID = Cookies.get('userId') || 'anonymous';
      
      const newReply: Reply = {
        id: Date.now(),
        content: replyContent,
        author: userName,
        authorId: userID,
        timestamp: new Date().toLocaleString('vi-VN'),
        replyToAuthor: showReplyModal.replyToAuthor,
      };

      setPosts(prev => prev.map(post => 
        post.id === showReplyModal.postId
          ? { 
              ...post, 
              comments: post.comments?.map(comment =>
                comment.id === showReplyModal.commentId
                  ? { 
                      ...comment,
                      replies: [...(comment.replies || []), newReply]
                    }
                  : comment
              )
            }
          : post
      ));

      // Gửi reply to reply qua websocket với replyId
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        // Tìm reply cha để lấy id_facebookReply
        let facebookReplyId = '';
        let facebookCommentId = '';
        let facebookReplyURL = ''
        const currentPost = posts.find(post => post.id === showReplyModal.postId);
        if (currentPost && currentPost.comments) {
          // Tìm comment cha theo id (có thể là number hoặc string)
          const parentComment = currentPost.comments.find(comment => {
            return comment.id_facebookComment === showReplyModal.facebookCommentId;
          });
          facebookReplyURL = parentComment.facebookCommentUrl + "&reply_comment_id=" + showReplyModal.facebookReplyId.toString();
          if (parentComment && parentComment.id_facebookComment) {
            facebookCommentId = parentComment.id_facebookComment;
          }
          if (parentComment && parentComment.replies) {
            facebookReplyId = showReplyModal.facebookReplyId.toString();
          }
        }
        
        const replyToReplyData = {
          type: 'reply_reply_comment',
          content: replyContent,
          postId: showReplyModal.postId.toString(),
          commentId: facebookCommentId, // Có thể để trống vì có replyId rồi
          replyId: facebookReplyId, // ID của reply được phản hồi
          URL: facebookReplyURL,
          authorName: userName,
          authorId: userID,
          attachments: [],
          metadata: {
            category: 'reply_to_reply',
            source: 'crm_tool',
            platform: 'facebook',
            action: 'create_reply_to_reply',
            timestamp: new Date().toISOString()
          }
        };
        websocket.send(JSON.stringify(replyToReplyData));
        console.log('Đã gửi reply to reply qua WebSocket:', replyToReplyData);
      }

      setShowReplyModal(null);
      setReplyContent('');
    }
  };

  const handleSubmit = () => {
    if (postContent.trim()) {
      const userID = Cookies.get('userId') || 'anonymous';
      const userName = Cookies.get('userName') || 'Người dùng';
      
      console.log('Nội dung bài đăng:', postContent);
      console.log('User ID:', userID);

      // Tạo bài đăng mới
      const newPost: Post = {
        id: Date.now(),
        content: postContent,
        author: userName,
        authorId: userID,
        timestamp: new Date().toLocaleString('vi-VN'),
        images: selectedImages,
        comments: [],
        likes: 0,
        facebookUrl: undefined,
        isPosted: false
      };

      // Thêm bài đăng vào danh sách
      setPosts(prevPosts => [newPost, ...prevPosts]);

      // Gửi dữ liệu qua WebSocket nếu đã kết nối
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        const postData = {
          type: 'post',
          postId: newPost.id.toString(),
          content: postContent,
          authorName: userName,
          authorId: userID,
          // attachments: selectedImages.map((image, index) => ({
          //   name: `image_${index + 1}.jpg`,
          //   type: "image/jpeg",
          //   size: 123456,
          //   url: image
          // })),
          // attachments: [
          //   {
          //     name: 'image_1.jpg',
          //     type: 'image/jpeg',
          //     size: 123456, // dung lượng file (byte)
          //     url: 'https://cdn-media.sforum.vn/storage/app/media/anh-dep-16.jpg' // hoặc link ảnh thực tế
          //   },
          // ],
          attachments:[],
          metadata: {
            category: 'job_posting',
            source: 'crm_tool',
            platform: 'facebook',
            action: 'create_post',
            timestamp: new Date().toISOString()
          }
        };

        websocket.send(JSON.stringify(postData));
        console.log('Đã gửi post qua WebSocket:', postData);
      }

      handleCloseModal();
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('vi-VN');
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Tool Facebook - Đăng bài</title>
        <meta name="description" content="Quản lý và đăng bài lên Facebook" />
      </Head>
      
      <div className={styleHome.main} ref={mainRef}>
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}>Tool Facebook - Đăng bài</div>
              <div className={styles.form_add_potential}>
                
                {/* Nút đăng bài mới */}
                <div className={styles.main__body} style={{ marginBottom: '20px' }}>
                  <button 
                    onClick={handleOpenModal}
                    className={stylesContract.sub2}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 24px',
                      fontSize: '14px',
                      justifyContent: 'center'
                    }}
                  >
                    <span style={{ fontSize: '16px', fontWeight: 'bold' }}>+</span>
                    Đăng bài mới
                  </button>
                </div>

                {/* Header danh sách */}
                <div className={styles.main__body}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '16px',
                    paddingBottom: '12px',
                    borderBottom: '2px solid #e0e0e0'
                  }}>
                    <h2 style={{ 
                      fontSize: '18px', 
                      fontWeight: '600', 
                      margin: 0,
                      color: '#333'
                    }}>
                      Danh sách bài đăng
                    </h2>
                    <span style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {posts.length} bài
                    </span>
                  </div>

                  {/* Render posts using PostItem component */}
                  <div>
                    {posts.map((post) => (
                      <PostItem 
                        key={post.id}
                        post={post}
                        formatTimestamp={formatTimestamp}
                        handleLike={handleLike}
                        handleComment={handleComment}
                        handleReply={handleReply}
                      />
                    ))}
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
      />

      {/* Comment Modal */}
      <CommentModal
        showCommentModal={showCommentModal}
        commentContent={commentContent}
        setCommentContent={setCommentContent}
        setShowCommentModal={setShowCommentModal}
        submitComment={submitComment}
      />

      {/* Reply Modal */}
      <ReplyModal
        showReplyModal={showReplyModal}
        replyContent={replyContent}
        setReplyContent={setReplyContent}
        setShowReplyModal={setShowReplyModal}
        submitReplyToReply={submitReplyToReply}
        submitReply={submitReply}
      />
    </>
  );
}

export default DangBaiPost;
