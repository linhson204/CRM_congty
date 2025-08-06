import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import styles from "@/components/crm/potential/potential.module.css";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { BsFileEarmarkPost } from "react-icons/bs";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaCommentAlt } from 'react-icons/fa';
import { FaComments, FaUserGroup } from 'react-icons/fa6';
import { IoPerson } from "react-icons/io5";
import { MdGroupOff } from "react-icons/md";
import data from '../../api/account.json';
import style from './styles.module.css';


interface Users {
  id: number;
  name: string;
  friend: number;
  GrIn: number;
  GrOut: number;
  Post: number;
  Comment: number;
  isJoin: boolean;
  Mess: number;
}

export default function DangBai() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any = useHeader();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 3;

  // Lay data
  const [users, setUsers] = useState(data);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('../../pages/api/account.json');
  //     const result = await response.json();
  //     setUsers(result);
  //   }
  //   fetchData();
  // }, []);

  // const filteredUser = useMemo(() => {
  //   return users.filter((user) =>
  //     user.name.toLowerCase().includes(search.toLowerCase())
  //   );
  // }, [search]);

  // compare, not search -> '' -> all users
  const filteredUser = search.trim() === ''
  ? users
  : users.filter((user) => {
      // Object.values(user).some((value) =>
      //   value.toString().toLowerCase().includes(search.toLowerCase())
      // )
      const normalizedSearch = search.replace(/\s+/g, '').toLowerCase();
      const normalizedName = user.name.replace(/\s+/g, '').toLowerCase();
      return normalizedName.includes(normalizedSearch);
  });
  //Phan Lai trang
  const filteredPage = filteredUser.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredUser.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  // const currentItems = users.slice(startIndex, startIndex + itemsPerPage);
  const goToPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goToNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  // const goToPrevPage = () => {
  // if (currentPage > 1) {
  //   setCurrentPage(prev => prev - 1);
  //   }
  // };

  // const goToNextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(prev => prev + 1);
  //   }
  // };
  // const [showModal, setShowModal] = useState(false);
  // const [postContent, setPostContent] = useState('');
  // const [selectedImages, setSelectedImages] = useState<string[]>([]);
  // const [showCommentModal, setShowCommentModal] = useState<number | null>(null);
  // const [commentContent, setCommentContent] = useState('');
  // const [showReplyModal, setShowReplyModal] = useState<{postId: number, commentId: number, replyToAuthor?: string, replyId?: number, facebookCommentId?: string, facebookReplyId?: string} | null>(null);
  // const [replyContent, setReplyContent] = useState('');
  // const [websocket, setWebsocket] = useState<WebSocket | null>(null);

  const handleUserClick = () => {
    router.push('/toolfacebook/tham-gia-nhom/Detail');
  };

  const PostClick = () => {
      router.push('/toolfacebook/dang-bai');
  };
  
  useEffect(() => {
    setHeaderTitle("Tool Facebook - Danh Sách Tài Khoản");
    setShowBackButton(false);
    setCurrentPath("/toolfacebook/tham-gia-nhom");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  useEffect(() => {
  return () => {
    // Reset các state quan trọng khi rời khỏi trang
      setCurrentPage(1);
      setSearch('');
  };
  }, []);

  // // Khởi tạo WebSocket connection
  // useEffect(() => {
  //   const ws = new WebSocket('ws://localhost:3001');
    
  //   ws.onopen = () => {
  //     console.log('WebSocket connected');
  //     // Đăng ký role A
  //     ws.send(JSON.stringify({
  //       type: 'register',
  //       role: 'A'
  //     }));
  //   };

  //   ws.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     console.log('WebSocket message received:', data);
      
  //     if (data.type === 'post_sent') {
  //       console.log('Post sent successfully with ID:', data.postId);
  //     } else if (data.type === 'URL_post') {
  //       console.log('Received Facebook URL from B:', data);
  //       console.log('Message data fields:', {
  //         type: data.type,
  //         URL: data.URL,
  //         postId: data.postId,
  //         authorName: data.authorName,
  //         timestamp: data.timestamp
  //       });
        
  //       console.log('📝 Updating post with ID:', data.postId, 'with URL:', data.URL);
        
  //       // Cập nhật bài đăng với URL Facebook dựa trên postId
  //       setPosts(prev => {
  //         const updatedPosts = prev.map(post => {
  //           if (post.id.toString() === data.postId) {
  //             console.log('✅ Found and updating post:', post.id, '→', data.URL);
  //             return {
  //               ...post,
  //               facebookUrl: data.URL,
  //               isPosted: true
  //             };
  //           }
  //           return post;
  //         });
          
  //         // Kiểm tra xem có post nào được cập nhật không
  //         const foundPost = prev.find(post => post.id.toString() === data.postId);
  //         if (!foundPost) {
  //           console.error('❌ No post found with ID:', data.postId);
  //           console.log('Available post IDs:', prev.map(p => p.id.toString()));
  //         }
          
  //         return updatedPosts;
  //       });
  //     } else if (data.type === 'comment_result') {
  //       console.log('Received Facebook comment response from B:', data);
  //       console.log('Comment data fields:', {
  //         type: data.type,
  //         content: data.content,
  //         comment_id: data.comment_id,
  //         URL: data.URL, // URL của comment
  //         postId: data.postId,
  //         timestamp: data.timestamp
  //       });
        
  //       if (!data.comment_id || !data.postId) {
  //         console.error('❌ Missing comment_id or postId in comment response');
  //         return;
  //       }
        
  //       console.log('💬 Updating comment with Facebook ID:', data.comment_id, 'and URL:', data.URL);
        
  //       // Cập nhật comment với Facebook comment ID và URL
  //       setPosts(prev => {
  //         const updatedPosts = prev.map(post => {
  //           if (post.id.toString() === data.postId) {
  //             const updatedComments = post.comments?.map(comment => {
  //               // Tìm comment dựa trên content và timestamp gần nhất
  //               if (comment.content === data.content && 
  //                   !comment.id_facebookComment) {
  //                 console.log('✅ Found and updating comment:', comment.id, '→', data.comment_id, 'URL:', data.URL);
  //                 return {
  //                   ...comment,
  //                   id_facebookComment: data.comment_id,
  //                   facebookCommentUrl: data.URL ? (data.URL + '?comment_id=' + data.comment_id) : ''
  //                 };
  //               }
  //               return comment;
  //             }) || [];
              
  //             return {
  //               ...post,
  //               comments: updatedComments
  //             };
  //           }
  //           return post;
  //         });
          
  //         return updatedPosts;
  //       });
  //     } else if (data.type === 'reply_comment_result') {
  //       console.log('Received Facebook reply_comment_result from B:', data);
  //       console.log('Reply data fields:', {
  //         type: data.type,
  //         replyId: data.replyId,
  //         URL: data.URL,
  //         postId: data.postId,
  //         commentId: data.commentId,
  //         timestamp: data.timestamp
  //       });
        
  //       if (!data.replyId || !data.postId || !data.commentId) {
  //         console.error('❌ Missing replyId, postId or commentId in reply_comment_result');
  //         return;
  //       }
        
  //       console.log('💭 Updating reply with Facebook ID:', data.replyId, 'and URL:', data.URL);
        
  //       // Cập nhật reply với Facebook reply ID và URL
  //       setPosts(prev => {
  //         return prev.map(post => {
  //           if (post.id.toString() === data.postId) {
  //             return {
  //               ...post,
  //               comments: post.comments?.map(comment => {

  //                 if (comment.id_facebookComment.toString() === data.commentId) {
  //                   return {
  //                     ...comment,
  //                     replies: comment.replies?.map(reply => {
  //                       // Chỉ cập nhật reply chưa có id_facebookReply
  //                       console.log(reply.id_facebookReply);
  //                       if (!reply.id_facebookReply) {
  //                         console.log('✅ Found and updating reply:', reply.id, '→', data.replyId, 'URL:', data.URL);
  //                         return {
  //                           ...reply,
  //                           id_facebookReply: data.replyId,
  //                           facebookReplyUrl: data.URL || ''
  //                         };
  //                       }
  //                       return reply;
  //                     }) || []
  //                   };
  //                 }
  //                 return comment;
  //               }) || []
  //             };
  //           }
  //           return post;
  //         });
  //       });
  //     } else if (data.type === 'reply_reply_comment_result') {
  //       console.log('Received Facebook reply_reply_comment_result from B:', data);
  //       console.log('Reply data fields:', {
  //         type: data.type,
  //         replyId: data.replyId,
  //         URL: data.URL,
  //         postId: data.postId,
  //         commentId: data.commentId,
  //         timestamp: data.timestamp
  //       });
        
  //       if (!data.replyId || !data.postId || !data.commentId) {
  //         console.error('❌ Missing replyId, postId or commentId in reply_comment_result');
  //         return;
  //       }
        
  //       console.log('💭 Updating reply with Facebook ID:', data.replyId, 'and URL:', data.URL);
        
  //       // Cập nhật reply với Facebook reply ID và URL
  //       setPosts(prev => {
  //         return prev.map(post => {
  //           if (post.id.toString() === data.postId) {
  //             return {
  //               ...post,
  //               comments: post.comments?.map(comment => {

  //                 if (comment.id_facebookComment.toString() === data.commentId) {
  //                   return {
  //                     ...comment,
  //                     replies: comment.replies?.map(reply => {
  //                       // Chỉ cập nhật reply chưa có id_facebookReply
  //                       console.log(reply.id_facebookReply);
  //                       if (!reply.id_facebookReply) {
  //                         console.log('✅ Found and updating reply:', reply.id, '→', data.replyId, 'URL:', data.URL);
  //                         return {
  //                           ...reply,
  //                           id_facebookReply: data.replyId,
  //                           facebookReplyUrl: data.URL || ''
  //                         };
  //                       }
  //                       return reply;
  //                     }) || []
  //                   };
  //                 }
  //                 return comment;
  //               }) || []
  //             };
  //           }
  //           return post;
  //         });
  //       });
  //     }
  //   };

  //   ws.onclose = () => {
  //     console.log('WebSocket disconnected');
  //   };

  //   ws.onerror = (error) => {
  //     console.error('WebSocket error:', error);
  //   };

  //   setWebsocket(ws);

  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  // const handleOpenModal = () => {
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  //   setPostContent('');
  //   setSelectedImages([]);
  // };

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;
  //   if (files) {
  //     const imageUrls: string[] = [];
  //     for (let i = 0; i < Math.min(files.length, 4); i++) {
  //       const file = files[i];
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         if (e.target?.result) {
  //           imageUrls.push(e.target.result as string);
  //           if (imageUrls.length === Math.min(files.length, 4)) {
  //             setSelectedImages(prev => [...prev, ...imageUrls].slice(0, 4));
  //           }
  //         }
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   }
  // };

  // const removeImage = (index: number) => {
  //   setSelectedImages(prev => prev.filter((_, i) => i !== index));
  // };

  // const handleLike = (postId: number) => {
  //   setPosts(prev => prev.map(post => 
  //     post.id === postId 
  //       ? { ...post, likes: (post.likes || 0) + 1 }
  //       : post
  //   ));
  // };

  // const handleComment = (postId: number) => {
  //   setShowCommentModal(postId);
  //   setCommentContent('');
  // };

  // const handleReply = (postId: number, commentId: number, replyToAuthor?: string, replyId?: any , facebookCommentId?: string, facebookReplyId?: string) => {
  //   setShowReplyModal({postId, commentId, replyToAuthor, replyId,facebookCommentId,facebookReplyId});
  //   console.log(postId),
  //   console.log(facebookCommentId),
  //   console.log(replyToAuthor),
  //   console.log(facebookReplyId),
  //   setReplyContent('');
  // };

  // const submitComment = () => {
  //   if (commentContent.trim() && showCommentModal) {
  //     const userName = Cookies.get('userName') || 'Người dùng';
  //     const userID = Cookies.get('userId') || 'anonymous';
  //     const newComment: Comment = {
  //       id: Date.now(),
  //       content: commentContent,
  //       author: userName,
  //       authorId: userID,
  //       timestamp: new Date().toLocaleString('vi-VN'),
  //       replies: []
  //     };
  //     setPosts(prev => prev.map(post => 
  //       post.id === showCommentModal
  //         ? { 
  //             ...post, 
  //             comments: [...(post.comments || []), newComment]
  //           }
  //         : post
  //     ));

  //     // Gửi comment qua websocket nếu đã kết nối
  //     if (websocket && websocket.readyState === WebSocket.OPEN) {
  //       // Tìm bài đăng tương ứng để lấy URL
  //       // Lấy URL comment Facebook nếu có
  //       let commentUrl = '';
  //       const currentPost = posts.find(post => post.id === showCommentModal);
  //       commentUrl = currentPost.facebookUrl;
       
  //       const commentData = {
  //         type: 'comment',
  //         content: commentContent,
  //         postId: showCommentModal.toString(),
  //         URL: commentUrl,
  //         authorName: userName,
  //         authorId: userID,
  //         attachments: [],
  //         metadata: {
  //           category: 'comment',
  //           source: 'crm_tool',
  //           platform: 'facebook',
  //           action: 'create_comment',
  //           timestamp: new Date().toISOString()
  //         }
  //       };
  //       websocket.send(JSON.stringify(commentData));
  //       console.log('Đã gửi comment qua WebSocket:', commentData);
  //     }

  //     setShowCommentModal(null);
  //     setCommentContent('');
  //   }
  // };

  // const submitReply = () => {
  //   if (replyContent.trim() && showReplyModal) {
  //     const userName = Cookies.get('userName') || 'Người dùng';
  //     const userID = Cookies.get('userId') || 'anonymous';
      
  //     const newReply: Reply = {
  //       id: Date.now(),
  //       content: replyContent, // Chỉ lưu content thuần, không ghép @tên
  //       author: userName,
  //       authorId: userID,
  //       timestamp: new Date().toLocaleString('vi-VN'),
  //       replyToAuthor: showReplyModal.replyToAuthor, // Lưu thông tin người được reply riêng
  //     };

  //     setPosts(prev => prev.map(post => 
  //       post.id === showReplyModal.postId
  //         ? { 
  //             ...post, 
  //             comments: post.comments?.map(comment =>
  //               comment.id === showReplyModal.commentId
  //                 ? { 
  //                     ...comment,
  //                     replies: [...(comment.replies || []), newReply]
  //                   }
  //                 : comment
  //             )
  //           }
  //         : post
  //     ));

  //     // Gửi reply qua websocket nếu đã kết nối
  //     if (websocket && websocket.readyState === WebSocket.OPEN) {
  //       // Tìm comment cha để lấy facebookCommentUrl nếu có
  //       let commentUrl = '';
  //       const currentPost = posts.find(post => post.id === showReplyModal.postId);
  //       if (currentPost && currentPost.comments && currentPost.comments.length > 0) {
  //         const parentComment = currentPost.comments.find(comment => comment.id === showReplyModal.commentId);
  //         if (parentComment && parentComment.facebookCommentUrl) {
  //           commentUrl = parentComment.facebookCommentUrl;
  //         }
  //       }
  //       // Lấy id_facebookComment để gửi qua WebSocket
  //       let facebookCommentId = '';
  //       if (currentPost && currentPost.comments && currentPost.comments.length > 0) {
  //         const parentComment = currentPost.comments.find(comment => comment.id === showReplyModal.commentId);
  //         if (parentComment && parentComment.id_facebookComment) {
  //           facebookCommentId = parentComment.id_facebookComment;
  //         }
  //       }
        
  //       const replyCommentData = {
  //         type: 'reply_comment',
  //         content: replyContent, // Gửi qua WebSocket với @tên
  //         postId: showReplyModal.postId.toString(),
  //         commentId: facebookCommentId, // Sử dụng id_facebookComment thay vì local commentId
  //         URL: commentUrl,
  //         authorName: userName,
  //         authorId: userID,
  //         attachments: [],
  //         metadata: {
  //           category: 'reply',
  //           source: 'crm_tool',
  //           platform: 'facebook',
  //           action: 'create_reply',
  //           timestamp: new Date().toISOString()
  //         }
  //       };
  //       websocket.send(JSON.stringify(replyCommentData));
  //       console.log('Đã gửi reply qua WebSocket:', replyCommentData);
  //     }

  //     setShowReplyModal(null);
  //     setReplyContent('');
  //   }
  // };

  // // Function mới cho reply to reply
  // const submitReplyToReply = () => {
  //   if (replyContent.trim() && showReplyModal) {
  //     const userName = Cookies.get('userName') || 'Người dùng';
  //     const userID = Cookies.get('userId') || 'anonymous';
      
  //     const newReply: Reply = {
  //       id: Date.now(),
  //       content: replyContent,
  //       author: userName,
  //       authorId: userID,
  //       timestamp: new Date().toLocaleString('vi-VN'),
  //       replyToAuthor: showReplyModal.replyToAuthor,
  //     };

  //     setPosts(prev => prev.map(post => 
  //       post.id === showReplyModal.postId
  //         ? { 
  //             ...post, 
  //             comments: post.comments?.map(comment =>
  //               comment.id === showReplyModal.commentId
  //                 ? { 
  //                     ...comment,
  //                     replies: [...(comment.replies || []), newReply]
  //                   }
  //                 : comment
  //             )
  //           }
  //         : post
  //     ));

  //     // Gửi reply to reply qua websocket với replyId
  //     if (websocket && websocket.readyState === WebSocket.OPEN) {
  //       // Tìm reply cha để lấy id_facebookReply
  //       let facebookReplyId = '';
  //       let facebookCommentId = '';
  //       let facebookReplyURL = ''
  //       const currentPost = posts.find(post => post.id === showReplyModal.postId);
  //       if (currentPost && currentPost.comments) {
  //         // Tìm comment cha theo id (có thể là number hoặc string)
  //         const parentComment = currentPost.comments.find(comment => {
  //           return comment.id_facebookComment === showReplyModal.facebookCommentId;
  //         });
  //         facebookReplyURL = parentComment.facebookCommentUrl + "&reply_comment_id=" + showReplyModal.facebookReplyId.toString();
  //         if (parentComment && parentComment.id_facebookComment) {
  //           facebookCommentId = parentComment.id_facebookComment;
  //         }
  //         if (parentComment && parentComment.replies) {
  //           facebookReplyId = showReplyModal.facebookReplyId.toString();
  //         }
  //       }
        
  //       const replyToReplyData = {
  //         type: 'reply_reply_comment',
  //         content: replyContent,
  //         postId: showReplyModal.postId.toString(),
  //         commentId: facebookCommentId, // Có thể để trống vì có replyId rồi
  //         replyId: facebookReplyId, // ID của reply được phản hồi
  //         URL: facebookReplyURL,
  //         authorName: userName,
  //         authorId: userID,
  //         attachments: [],
  //         metadata: {
  //           category: 'reply_to_reply',
  //           source: 'crm_tool',
  //           platform: 'facebook',
  //           action: 'create_reply_to_reply',
  //           timestamp: new Date().toISOString()
  //         }
  //       };
  //       websocket.send(JSON.stringify(replyToReplyData));
  //       console.log('Đã gửi reply to reply qua WebSocket:', replyToReplyData);
  //     }

  //     setShowReplyModal(null);
  //     setReplyContent('');
  //   }
  // };

  // const handleSubmit = () => {
  //   if (postContent.trim()) {
  //     const userID = Cookies.get('userId') || 'anonymous';
  //     const userName = Cookies.get('userName') || 'Người dùng';
      
  //     console.log('Nội dung bài đăng:', postContent);
  //     console.log('User ID:', userID);

  //     // Tạo bài đăng mới
  //     const newPost: Post = {
  //       id: Date.now(),
  //       content: postContent,
  //       author: userName,
  //       authorId: userID,
  //       timestamp: new Date().toLocaleString('vi-VN'),
  //       images: selectedImages,
  //       comments: [],
  //       likes: 0,
  //       facebookUrl: undefined,
  //       isPosted: false
  //     };

  //     // Thêm bài đăng vào danh sách
  //     setPosts(prevPosts => [newPost, ...prevPosts]);

  //     // Gửi dữ liệu qua WebSocket nếu đã kết nối
  //     if (websocket && websocket.readyState === WebSocket.OPEN) {
  //       const postData = {
  //         type: 'post',
  //         postId: newPost.id.toString(),
  //         content: postContent,
  //         authorName: userName,
  //         authorId: userID,
  //         // attachments: selectedImages.map((image, index) => ({
  //         //   name: `image_${index + 1}.jpg`,
  //         //   type: "image/jpeg",
  //         //   size: 123456,
  //         //   url: image
  //         // })),
  //         attachments: [],
  //         metadata: {
  //           category: 'job_posting',
  //           source: 'crm_tool',
  //           platform: 'facebook',
  //           action: 'create_post',
  //           timestamp: new Date().toISOString()
  //         }
  //       };

  //       websocket.send(JSON.stringify(postData));
  //       console.log('Đã gửi post qua WebSocket:', postData);
  //     }

  //     handleCloseModal();
  //   }
  // };

  // const formatTimestamp = (timestamp: string) => {
  //   return new Date(timestamp).toLocaleString('vi-VN');
  // };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Tool Facebook - HomePage</title>
        <meta name="description" content="Quản lý và đăng bài lên Facebook" />
      </Head>
      
      <div className={styleHome.main} ref={mainRef}>
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}>Tool Facebook - DANH SÁCH TÀI KHOẢN</div>
              <div className={styles.form_add_potential}>
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
                    </h2>
                    <span style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '15px',
                      fontWeight: '500'
                    }}>
                      Tổng số tài khoản: {users.length}
                    </span>
                  </div>
                  {/* list tk */}
                  <div style={{overflowY: 'scroll'}} className={style.BlockColumn}>
                    <div className={style.BlockRow}>
                      <p style={{padding: '5px'}}>Số tài khoản tìm được: {filteredUser.length}</p>
                      <input type="text" placeholder="timkiem"
                            value={search} className={style.searchBar}
                            onChange={(e) => {
                              setSearch(e.target.value);
                              setCurrentPage(1);
                            }} />
                    </div>
                    {/* goi list danh sach tai khoan */}
                    {filteredPage.map(item => (
                      <div key={item.id} className={style.Block}>
                        <div id="User_Info" style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                          <div id="TopRow" className={style.BlockRow}>
                            <p id="User_Name" style={{fontSize: '30px', fontStyle: 'bold'}} className={style.user_name}>{item.name}</p>
                            {item.Mess > 0 ? (
                                <div id="haveMessBlock" onClick={handleUserClick} className={style.Message}>
                                  <div><FaComments style={{width: '40px', height: '40px'}}></FaComments></div>
                                  <div id="redDot" className={style.dot}>{item.Mess}</div>
                                </div>
                              ) : (
                                <div onClick={handleUserClick} className={style.Message}><FaComments style={{width: '40px', height: '40px'}}></FaComments></div>
                              )}
                          </div>
                          <div id="SecondRow" className={`${style.BlockRow}`}>
                            <div id="User_Friend" className={`${style.Block_Content} ${style.BlockRow}`}>
                              <div><IoPerson className={style.ic}></IoPerson></div>
                              <p className={style.user_text}>{item.friend}</p>
                            </div>
                            <div id="Post" className={style.BlockRow} style={{marginLeft: '40px'}}>
                              <div><BsFileEarmarkPost className={style.ic}></BsFileEarmarkPost></div>
                              <p className={style.user_text}>{item.Post}</p>
                            </div>
                          </div>
                          <div id="ThirdRow" className={`${style.BlockRow}`}>
                            <div id="User_GrIn" className={`${style.Block_Content} ${style.BlockRow}`}>
                              <div><FaUserGroup className={style.ic}></FaUserGroup></div>
                              <p className={style.user_text}>{item.GrIn}</p>
                            </div>
                            <div id="Comment" className={style.BlockRow} style={{marginLeft: '40px'}}>
                              <div style={{paddingTop: '2px'}}><FaCommentAlt style={{width: '17px', height: '17px'}}></FaCommentAlt></div>
                              <p className={style.user_text}>{item.Comment}</p>
                            </div>
                          </div>
                          <div id="BottomRow" className={`${style.BlockRow}`}>
                            <div id="User_GrOut" className={`${style.Block_Content} ${style.BlockRow}`}>
                              <div><MdGroupOff className={style.ic}></MdGroupOff></div>
                              <p className={style.user_text}>{item.GrOut}</p>
                            </div>
                            <div className={`${style.button} ${style.actbut}`} onClick={PostClick}>Đăng Bài Cá Nhân</div>
                            <div className={`${style.button} ${style.actbut}`} style={{marginLeft: '20px'}} onClick={() => router.push(`./account/${item.id}`)}>Xem chi tiết</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div id="PageIndexBar" className={style.BlockRow} style={{marginLeft: 'auto', marginRight: '20px', marginTop: '10px'}}>
                    <button onClick={goToPrev} disabled={currentPage === 1} style={{marginRight: '20px'}}>
                      <FaArrowAltCircleLeft className={style.ic}></FaArrowAltCircleLeft>
                    </button>
                    <span>Trang {currentPage} / {totalPages}</span>
                    <button onClick={goToNext} disabled={currentPage === totalPages} style={{marginLeft: '20px'}}>
                      <FaArrowAltCircleRight className={style.ic}></FaArrowAltCircleRight>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
