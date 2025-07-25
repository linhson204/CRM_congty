import React, { useState, useEffect, useContext, useRef } from 'react';
import Cookies from 'js-cookie';
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import stylesContract from "@/components/crm/contract/contract_action.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import Head from "next/head";

interface Post {
  id: number;
  content: string;
  author: string;
  authorId: string;
  timestamp: string;
  images?: string[];
  comments?: Comment[];
  likes?: number;
  facebookUrl?: string; // URL bài đăng Facebook từ B
  isPosted?: boolean; // Trạng thái đã đăng lên Facebook
}

interface Comment {
  id: number;
  content: string;
  author: string;
  authorId: string;
  timestamp: string;
  replies?: Reply[];
  id_facebookComment?: string; // ID comment trên Facebook
  facebookCommentUrl?: string; // URL comment trên Facebook
}

interface Reply {
  id: number;
  content: string;
  author: string;
  authorId: string;
  timestamp: string;
  replyToAuthor?: string; // Tên người được reply
  id_facebookReply?: string; // ID reply trên Facebook
  facebookReplyUrl?: string; // URL reply trên Facebook
}

export default function DangBai() {
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
  const [showReplyModal, setShowReplyModal] = useState<{postId: number, commentId: number, replyToAuthor?: string, replyId?: number, facebookCommentId?: string, facebookReplyId?: string} | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);

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

  // Khởi tạo WebSocket connection
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');
    
    ws.onopen = () => {
      console.log('WebSocket connected');
      // Đăng ký role A
      ws.send(JSON.stringify({
        type: 'register',
        role: 'A'
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('WebSocket message received:', data);
      
      if (data.type === 'post_sent') {
        console.log('Post sent successfully with ID:', data.postId);
      } else if (data.type === 'URL_post') {
        console.log('Received Facebook URL from B:', data);
        console.log('Message data fields:', {
          type: data.type,
          URL: data.URL,
          postId: data.postId,
          authorName: data.authorName,
          timestamp: data.timestamp
        });
        
        console.log('📝 Updating post with ID:', data.postId, 'with URL:', data.URL);
        
        // Cập nhật bài đăng với URL Facebook dựa trên postId
        setPosts(prev => {
          const updatedPosts = prev.map(post => {
            if (post.id.toString() === data.postId) {
              console.log('✅ Found and updating post:', post.id, '→', data.URL);
              return {
                ...post,
                facebookUrl: data.URL,
                isPosted: true
              };
            }
            return post;
          });
          
          // Kiểm tra xem có post nào được cập nhật không
          const foundPost = prev.find(post => post.id.toString() === data.postId);
          if (!foundPost) {
            console.error('❌ No post found with ID:', data.postId);
            console.log('Available post IDs:', prev.map(p => p.id.toString()));
          }
          
          return updatedPosts;
        });
      } else if (data.type === 'comment_result') {
        console.log('Received Facebook comment response from B:', data);
        console.log('Comment data fields:', {
          type: data.type,
          content: data.content,
          comment_id: data.comment_id,
          URL: data.URL, // URL của comment
          postId: data.postId,
          timestamp: data.timestamp
        });
        
        if (!data.comment_id || !data.postId) {
          console.error('❌ Missing comment_id or postId in comment response');
          return;
        }
        
        console.log('💬 Updating comment with Facebook ID:', data.comment_id, 'and URL:', data.URL);
        
        // Cập nhật comment với Facebook comment ID và URL
        setPosts(prev => {
          const updatedPosts = prev.map(post => {
            if (post.id.toString() === data.postId) {
              const updatedComments = post.comments?.map(comment => {
                // Tìm comment dựa trên content và timestamp gần nhất
                if (comment.content === data.content && 
                    !comment.id_facebookComment) {
                  console.log('✅ Found and updating comment:', comment.id, '→', data.comment_id, 'URL:', data.URL);
                  return {
                    ...comment,
                    id_facebookComment: data.comment_id,
                    facebookCommentUrl: data.URL ? (data.URL + '?comment_id=' + data.comment_id) : ''
                  };
                }
                return comment;
              }) || [];
              
              return {
                ...post,
                comments: updatedComments
              };
            }
            return post;
          });
          
          return updatedPosts;
        });
      } else if (data.type === 'reply_comment_result') {
        console.log('Received Facebook reply_comment_result from B:', data);
        console.log('Reply data fields:', {
          type: data.type,
          replyId: data.replyId,
          URL: data.URL,
          postId: data.postId,
          commentId: data.commentId,
          timestamp: data.timestamp
        });
        
        if (!data.replyId || !data.postId || !data.commentId) {
          console.error('❌ Missing replyId, postId or commentId in reply_comment_result');
          return;
        }
        
        console.log('💭 Updating reply with Facebook ID:', data.replyId, 'and URL:', data.URL);
        
        // Cập nhật reply với Facebook reply ID và URL
        setPosts(prev => {
          return prev.map(post => {
            if (post.id.toString() === data.postId) {
              return {
                ...post,
                comments: post.comments?.map(comment => {

                  if (comment.id_facebookComment.toString() === data.commentId) {
                    return {
                      ...comment,
                      replies: comment.replies?.map(reply => {
                        // Chỉ cập nhật reply chưa có id_facebookReply
                        console.log(reply.id_facebookReply);
                        if (!reply.id_facebookReply) {
                          console.log('✅ Found and updating reply:', reply.id, '→', data.replyId, 'URL:', data.URL);
                          return {
                            ...reply,
                            id_facebookReply: data.replyId,
                            facebookReplyUrl: data.URL || ''
                          };
                        }
                        return reply;
                      }) || []
                    };
                  }
                  return comment;
                }) || []
              };
            }
            return post;
          });
        });
      } else if (data.type === 'reply_reply_comment_result') {
        console.log('Received Facebook reply_reply_comment_result from B:', data);
        console.log('Reply data fields:', {
          type: data.type,
          replyId: data.replyId,
          URL: data.URL,
          postId: data.postId,
          commentId: data.commentId,
          timestamp: data.timestamp
        });
        
        if (!data.replyId || !data.postId || !data.commentId) {
          console.error('❌ Missing replyId, postId or commentId in reply_comment_result');
          return;
        }
        
        console.log('💭 Updating reply with Facebook ID:', data.replyId, 'and URL:', data.URL);
        
        // Cập nhật reply với Facebook reply ID và URL
        setPosts(prev => {
          return prev.map(post => {
            if (post.id.toString() === data.postId) {
              return {
                ...post,
                comments: post.comments?.map(comment => {

                  if (comment.id_facebookComment.toString() === data.commentId) {
                    return {
                      ...comment,
                      replies: comment.replies?.map(reply => {
                        // Chỉ cập nhật reply chưa có id_facebookReply
                        console.log(reply.id_facebookReply);
                        if (!reply.id_facebookReply) {
                          console.log('✅ Found and updating reply:', reply.id, '→', data.replyId, 'URL:', data.URL);
                          return {
                            ...reply,
                            id_facebookReply: data.replyId,
                            facebookReplyUrl: data.URL || ''
                          };
                        }
                        return reply;
                      }) || []
                    };
                  }
                  return comment;
                }) || []
              };
            }
            return post;
          });
        });
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setWebsocket(ws);

    return () => {
      ws.close();
    };
  }, []);

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
        let commentUrl = '';
        const currentPost = posts.find(post => post.id === showCommentModal);
        commentUrl = currentPost.facebookUrl;
       
        const commentData = {
          type: 'comment',
          content: commentContent,
          postId: showCommentModal.toString(),
          URL: commentUrl,
          authorName: userName,
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
          attachments: [],
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

                  {/* Danh sách bài đăng */}
                  <div>
                    {posts.map((post) => (
                      <div key={post.id} style={{
                        background: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        padding: '20px',
                        marginBottom: '16px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}>
                        
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '12px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontWeight: 'bold',
                              fontSize: '16px'
                            }}>
                              {post.author.charAt(0)}
                            </div>
                            <div>
                              <div style={{ 
                                fontWeight: '600', 
                                fontSize: '14px',
                                color: '#1f2937',
                                marginBottom: '2px'
                              }}>
                                {post.author}
                              </div>
                              <div style={{ 
                                fontSize: '12px', 
                                color: '#6b7280' 
                              }}>
                                ID: {post.authorId}
                              </div>
                            </div>
                          </div>
                          
                          <div style={{
                            fontSize: '12px',
                            color: '#9ca3af',
                            backgroundColor: '#f3f4f6',
                            padding: '4px 8px',
                            borderRadius: '6px'
                          }}>
                            {formatTimestamp(post.timestamp)}
                          </div>
                        </div>
                        
                        <div style={{ 
                          lineHeight: '1.6', 
                          color: '#374151',
                          fontSize: '14px',
                          backgroundColor: '#f9fafb',
                          padding: '12px',
                          borderRadius: '8px',
                          borderLeft: '4px solid #3b82f6',
                          marginBottom: '12px'
                        }}>
                          {post.content}
                        </div>

                        {/* Hiển thị ảnh */}
                        {post.images && post.images.length > 0 && (
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: post.images.length === 1 ? '1fr' : 'repeat(2, 1fr)',
                            gap: '8px',
                            marginBottom: '12px'
                          }}>
                            {post.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`Ảnh ${index + 1}`}
                                style={{
                                  width: '100%',
                                  height: post.images!.length === 1 ? '300px' : '150px',
                                  objectFit: 'cover',
                                  borderRadius: '8px',
                                  cursor: 'pointer'
                                }}
                              />
                            ))}
                          </div>
                        )}

                        {/* Actions: Like, Comment */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 0',
                          borderTop: '1px solid #e5e7eb',
                          marginBottom: '12px'
                        }}>
                          <div style={{ display: 'flex', gap: '16px' }}>
                            <button
                              onClick={() => handleLike(post.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                color: '#6b7280',
                                fontSize: '14px',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f3f4f6';
                                e.currentTarget.style.color = '#059669';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#6b7280';
                              }}
                            >
                              <span>👍</span>
                              <span>{post.likes || 0}</span>
                            </button>
                            
                            <button
                              onClick={() => handleComment(post.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                color: '#6b7280',
                                fontSize: '14px',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#f3f4f6';
                                e.currentTarget.style.color = '#2563eb';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = '#6b7280';
                              }}
                            >
                              <span>💬</span>
                              <span>{post.comments?.length || 0}</span>
                            </button>
                          </div>
                        </div>

                        {/* Comments */}
                        {post.comments && post.comments.length > 0 && (
                          <div style={{
                            backgroundColor: '#f8fafc',
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '8px'
                          }}>
                            <h4 style={{
                              margin: '0 0 8px 0',
                              fontSize: '13px',
                              color: '#6b7280',
                              fontWeight: '600'
                            }}>
                              Bình luận ({post.comments.length})
                            </h4>
                            {post.comments.map((comment) => (
                              <div key={comment.id} style={{
                                backgroundColor: 'white',
                                padding: '12px',
                                borderRadius: '8px',
                                marginBottom: '8px',
                                border: '1px solid #e5e7eb'
                              }}>
                                <div style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'flex-start',
                                  marginBottom: '6px'
                                }}>
                                  <span style={{
                                    fontWeight: '600',
                                    fontSize: '12px',
                                    color: '#1f2937'
                                  }}>
                                    {comment.author}
                                  </span>
                                  <span style={{
                                    fontSize: '11px',
                                    color: '#9ca3af'
                                  }}>
                                    {formatTimestamp(comment.timestamp)}
                                  </span>
                                </div>
                                <div style={{
                                  fontSize: '13px',
                                  color: '#374151',
                                  lineHeight: '1.4',
                                  marginBottom: '8px'
                                }}>
                                  {comment.content}
                                </div>
                                
                                {/* Nút phản hồi */}
                                <button
                                  onClick={() => handleReply(post.id, comment.id, comment.author)}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#6b7280',
                                    fontSize: '11px',
                                    cursor: 'pointer',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    transition: 'all 0.2s ease',
                                    fontWeight: '500'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                                    e.currentTarget.style.color = '#2563eb';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = '#6b7280';
                                  }}
                                >
                                  Phản hồi
                                </button>

                                {/* Hiển thị các phản hồi */}
                                {comment.replies && comment.replies.length > 0 && (
                                  <div style={{
                                    marginTop: '8px',
                                    marginLeft: '16px',
                                    paddingLeft: '12px',
                                    borderLeft: '2px solid #e5e7eb'
                                  }}>
                                    {comment.replies.map((reply) => (
                                      <div key={reply.id} style={{
                                        backgroundColor: '#f8fafc',
                                        padding: '8px 10px',
                                        borderRadius: '6px',
                                        marginBottom: '4px',
                                        border: '1px solid #e2e8f0'
                                      }}>
                                        <div style={{
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          alignItems: 'flex-start',
                                          marginBottom: '4px'
                                        }}>
                                          <span style={{
                                            fontWeight: '600',
                                            fontSize: '11px',
                                            color: '#1f2937'
                                          }}>
                                            {reply.author}
                                          </span>
                                          <span style={{
                                            fontSize: '10px',
                                            color: '#9ca3af'
                                          }}>
                                            {formatTimestamp(reply.timestamp)}
                                          </span>
                                        </div>
                                        <div style={{
                                          fontSize: '12px',
                                          color: '#374151',
                                          lineHeight: '1.3'
                                        }}>
                                          {reply.replyToAuthor ? (
                                            <>
                                              <div style={{
                                                color: '#2563eb',
                                                fontWeight: 'bold',
                                                marginBottom: '2px'
                                              }}>
                                                @{reply.replyToAuthor}
                                              </div>
                                              <div>
                                                {reply.content}
                                              </div>
                                            </>
                                          ) : (
                                            <div>{reply.content}</div>
                                          )}
                                        </div>
                                        
                                        {/* Nút phản hồi cho reply */}
                                        <button
                                          onClick={() => { handleReply(post.id, comment.id, reply.author, reply.id, comment.id_facebookComment, reply.id_facebookReply); }}
                                          style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#6b7280',
                                            fontSize: '10px',
                                            cursor: 'pointer',
                                            padding: '2px 4px',
                                            borderRadius: '4px',
                                            transition: 'all 0.2s ease',
                                            fontWeight: '500',
                                            marginTop: '4px'
                                          }}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#f3f4f6';
                                            e.currentTarget.style.color = '#2563eb';
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.color = '#6b7280';
                                          }}
                                        >
                                          Phản hồi
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div style={{
                          marginTop: '12px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <span style={{
                              backgroundColor: '#ecfdf5',
                              color: '#059669',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '11px',
                              fontWeight: '500'
                            }}>
                              Facebook
                            </span>
                            <span style={{
                              backgroundColor: post.isPosted ? '#eff6ff' : '#fef3c7',
                              color: post.isPosted ? '#2563eb' : '#d97706',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '11px',
                              fontWeight: '500'
                            }}>
                              {post.isPosted ? 'Đã đăng' : 'Đang xử lý...'}
                            </span>
                          </div>
                          
                          {/* Link Facebook nếu có */}
                          {post.facebookUrl && (
                            <a
                              href={post.facebookUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                backgroundColor: '#1877f2',
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                fontSize: '11px',
                                fontWeight: '500',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#166fe5';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#1877f2';
                              }}
                            >
                              <span>🔗</span>
                              Xem trên FB
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal đăng bài */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            width: '800px',
            maxWidth: '95vw',
            maxHeight: '85vh',
            overflow: 'hidden',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            animation: 'slideUp 0.3s ease',
            display: 'flex',
            flexDirection: 'column'
          }}>
            
            {/* Header modal */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '24px 24px 0 24px',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div>
                <h3 style={{ 
                  margin: 0, 
                  fontSize: '20px', 
                  fontWeight: '700',
                  color: '#1f2937'
                }}>
                  Tạo bài đăng mới
                </h3>
                <p style={{
                  margin: '4px 0 0 0',
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  Chia sẻ thông tin tuyển dụng với cộng đồng
                </p>
              </div>
              <button 
                onClick={handleCloseModal}
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#6b7280',
                  fontSize: '18px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                  e.currentTarget.style.color = '#374151';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.color = '#6b7280';
                }}
              >
                ×
              </button>
            </div>
            
            {/* Body modal */}
            <div style={{ 
              padding: '24px',
              maxHeight: 'calc(85vh - 180px)', // Trừ đi header và footer
              overflowY: 'auto'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#374151',
                  fontSize: '14px'
                }}>
                  Nội dung bài đăng
                </label>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Chia sẻ cơ hội việc làm, thông tin tuyển dụng hoặc tin tức về công ty..."
                  rows={10}
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    minHeight: '200px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    lineHeight: '1.5'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                <div style={{
                  textAlign: 'right',
                  marginTop: '8px',
                  fontSize: '12px',
                  color: '#6b7280'
                }}>
                  {postContent.length}/1000 ký tự
                </div>
              </div>

              {/* Upload ảnh */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#374151',
                  fontSize: '14px'
                }}>
                  Thêm ảnh (tối đa 4 ảnh)
                </label>
                
                <div style={{
                  border: '2px dashed #d1d5db',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: '#f9fafb'
                }}
                onClick={() => document.getElementById('imageUpload')?.click()}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.backgroundColor = '#eff6ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#d1d5db';
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                }}>
                  <input
                    id="imageUpload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <div style={{
                    fontSize: '48px',
                    marginBottom: '8px'
                  }}>
                    📷
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    marginBottom: '4px'
                  }}>
                    Click để chọn ảnh hoặc kéo thả ảnh vào đây
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#9ca3af'
                  }}>
                    Hỗ trợ: JPG, PNG, GIF (tối đa 4 ảnh)
                  </div>
                </div>

                {/* Preview ảnh đã chọn */}
                {selectedImages.length > 0 && (
                  <div style={{
                    marginTop: '16px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: '12px'
                  }}>
                    {selectedImages.map((image, index) => (
                      <div key={index} style={{
                        position: 'relative',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '2px solid #e5e7eb'
                      }}>
                        <img
                          src={image}
                          alt={`Preview ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '120px',
                            objectFit: 'cover'
                          }}
                        />
                        <button
                          onClick={() => removeImage(index)}
                          style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            background: 'rgba(239, 68, 68, 0.9)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Footer modal */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              padding: '20px 24px 24px 24px',
              borderTop: '1px solid #e5e7eb',
              backgroundColor: '#f9fafb',
              position: 'sticky',
              bottom: 0,
              zIndex: 10
            }}>
              <button 
                onClick={handleCloseModal}
                className={stylesContract.sub1}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  minWidth: '80px'
                }}
              >
                Hủy
              </button>
              <button 
                onClick={handleSubmit}
                disabled={!postContent.trim()}
                className={stylesContract.sub2}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  minWidth: '100px',
                  opacity: postContent.trim() ? 1 : 0.5,
                  cursor: postContent.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <span>📤</span>
                Đăng bài
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal phản hồi */}
      {showReplyModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1002,
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            width: '480px',
            maxWidth: '90vw',
            maxHeight: '60vh',
            overflow: 'hidden',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            animation: 'slideUp 0.3s ease'
          }}>
            
            {/* Header modal reply */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '18px 20px',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <h3 style={{ 
                margin: 0, 
                fontSize: '16px', 
                fontWeight: '600',
                color: '#1f2937'
              }}>
                💬 Phản hồi {showReplyModal.replyToAuthor ? `@${showReplyModal.replyToAuthor}` : 'bình luận'}
              </h3>
              <button 
                onClick={() => setShowReplyModal(null)}
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#6b7280',
                  fontSize: '14px'
                }}
              >
                ×
              </button>
            </div>
            
            {/* Body modal reply */}
            <div style={{ padding: '16px 20px' }}>
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder={showReplyModal?.replyToAuthor ? `Phản hồi @${showReplyModal.replyToAuthor}...` : "Viết phản hồi của bạn..."}
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#3b82f6';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              />
            </div>
            
            {/* Footer modal reply */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
              padding: '0 20px 16px 20px',
              borderTop: '1px solid #e5e7eb',
              paddingTop: '12px'
            }}>
              <button 
                onClick={() => setShowReplyModal(null)}
                style={{
                  padding: '6px 14px',
                  border: '1px solid #d1d5db',
                  background: 'white',
                  color: '#6b7280',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px'
                }}
              >
                Hủy
              </button>
              <button 
                onClick={showReplyModal?.replyId ? submitReplyToReply : submitReply}
                disabled={!replyContent.trim()}
                style={{
                  padding: '6px 14px',
                  border: 'none',
                  background: replyContent.trim() ? '#3b82f6' : '#9ca3af',
                  color: 'white',
                  borderRadius: '6px',
                  cursor: replyContent.trim() ? 'pointer' : 'not-allowed',
                  fontSize: '13px',
                  fontWeight: '500'
                }}
              >
                Phản hồi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal bình luận */}
      {showCommentModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1001,
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            width: '500px',
            maxWidth: '90vw',
            maxHeight: '70vh',
            overflow: 'hidden',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            animation: 'slideUp 0.3s ease'
          }}>
            
            {/* Header modal comment */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 24px',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <h3 style={{ 
                margin: 0, 
                fontSize: '18px', 
                fontWeight: '600',
                color: '#1f2937'
              }}>
                Viết bình luận
              </h3>
              <button 
                onClick={() => setShowCommentModal(null)}
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#6b7280',
                  fontSize: '16px'
                }}
              >
                ×
              </button>
            </div>
            
            {/* Body modal comment */}
            <div style={{ padding: '20px 24px' }}>
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Viết bình luận của bạn..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#3b82f6';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              />
            </div>
            
            {/* Footer modal comment */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              padding: '0 24px 20px 24px',
              borderTop: '1px solid #e5e7eb',
              paddingTop: '16px'
            }}>
              <button 
                onClick={() => setShowCommentModal(null)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  background: 'white',
                  color: '#6b7280',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Hủy
              </button>
              <button 
                onClick={submitComment}
                disabled={!commentContent.trim()}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  background: commentContent.trim() ? '#3b82f6' : '#9ca3af',
                  color: 'white',
                  borderRadius: '6px',
                  cursor: commentContent.trim() ? 'pointer' : 'not-allowed',
                  fontSize: '14px'
                }}
              >
                Bình luận
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
