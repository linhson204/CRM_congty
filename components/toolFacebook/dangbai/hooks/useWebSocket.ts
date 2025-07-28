import { useState, useEffect } from 'react';
import { Post, Comment, Reply, WebSocketData } from '../types';

export const useWebSocket = (posts: Post[], setPosts: React.Dispatch<React.SetStateAction<Post[]>>) => {
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');
    
    ws.onopen = () => {
      console.log('WebSocket connected');
      ws.send(JSON.stringify({
        type: 'register',
        role: 'A'
      }));
    };

    ws.onmessage = (event) => {
      const data: WebSocketData = JSON.parse(event.data);
      console.log('WebSocket message received:', data);
      
      if (data.type === 'post_sent') {
        console.log('Post sent successfully with ID:', data.postId);
      } else if (data.type === 'URL_post') {
        console.log('📝 Updating post with ID:', data.postId, 'with URL:', data.URL);
        
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
          
          const foundPost = prev.find(post => post.id.toString() === data.postId);
          if (!foundPost) {
            console.error('❌ No post found with ID:', data.postId);
          }
          
          return updatedPosts;
        });
      } else if (data.type === 'comment_byB') {
        // Xử lý comment mới từ B
        console.log('📨 Received new comment from B:', data);
        console.log('Comment details:', {
          postId: data.postId,
          content: data.content,
          commentFbId: data.commentFbId,
          authorName: data.authorName,
          timestamp: data.timestamp
        });
        
        if (!data.postId || !data.content || !data.commentFbId) {
          console.error('❌ Missing required fields in comment from B');
          return;
        }

        // Tạo comment mới từ dữ liệu nhận được từ B
        const newCommentFromB: Comment = {
          id: Date.now(), // Tạo ID tạm thời cho UI
          content: data.content,
          author: data.authorName || 'Facebook User',
          authorId: data.authorId || 'facebook_user',
          timestamp: data.timestamp ? new Date(data.timestamp).toLocaleString('vi-VN') : new Date().toLocaleString('vi-VN'),
          replies: [],
          id_facebookComment: data.commentFbId,
          facebookCommentUrl: data.URL || ''
        };

        console.log('💭 Created comment object:', newCommentFromB);

        setPosts(prev => {
          const targetPost = prev.find(post => post.id.toString() === data.postId.toString());
          console.log(targetPost);
          if (!targetPost) {
            console.error('❌ No post found with ID:', data.postId);
            console.log('Available post IDs:', prev.map(p => p.id.toString()));
            return prev;
          }

          return prev.map(post => {
            if (post.id.toString() === data.postId.toString()) {
              console.log('✅ Adding new comment from B to post:', post.id);
              const updatedPost = {
                ...post,
                comments: [...(post.comments || []), newCommentFromB]
              };
              console.log('Updated post comments count:', updatedPost.comments.length);
              return updatedPost;
            }
            return post;
          });
        });
      } else if (data.type === 'reply_comment_byB') {
        // Xử lý reply comment mới từ B
        console.log('📨 Received new reply comment from B:', data);
        console.log('Reply details:', { 
          postId: data.postId,
          commentId: data.commentId,
          content: data.content,
          replyId: data.replyId,
          authorName: data.authorName,
          timestamp: data.timestamp
        });
        
        if (!data.postId || !data.commentId || !data.content) {
          console.error('❌ Missing required fields in reply comment from B');
          return;
        }

        // Tạo reply mới từ dữ liệu nhận được từ B
        const newReplyFromB: Reply = {
          id: Date.now(), // Tạo ID tạm thời cho UI
          content: data.content,
          author: data.authorName || 'Facebook User',
          authorId: data.authorId || 'facebook_user',
          timestamp: data.timestamp ? new Date(data.timestamp).toLocaleString('vi-VN') : new Date().toLocaleString('vi-VN'),
          id_facebookReply: data.replyId?.toString(),
          facebookReplyUrl: ''
        };

        console.log('💭 Created reply object:', newReplyFromB);

        setPosts(prev => {
          const targetPost = prev.find(post => post.id.toString() === data.postId?.toString());
          if (!targetPost) {
            console.error('❌ No post found with ID:', data.postId);
            console.log('Available post IDs:', prev.map(p => p.id.toString()));
            return prev;
          }

          return prev.map(post => {
            console.log("1")
            if (post.id.toString() === data.postId?.toString()) {
              console.log("2")
              return {
    
                ...post,
                comments: post.comments?.map(comment => {
                  console.log("3")
                  // Tìm comment dựa trên Facebook comment ID
                  // comment.id_facebookComment === data.commentId?.toString()
                  if (true) {
                    console.log('✅ Adding new reply from B to comment:', comment.id);
                    const updatedComment = {
                      ...comment,
                      replies: [...(comment.replies || []), newReplyFromB]
                    };
                    console.log('Updated comment replies count:', updatedComment.replies.length);
                    return updatedComment;
                  }
                  return comment;
                }) || []
              };
            }
            return post;
          });
        });
      } else if (data.type === 'comment_result') {
        console.log('💬 Updating comment with Facebook ID:', data.comment_id, 'and URL:', data.URL);
        
        if (!data.comment_id || !data.postId) {
          console.error('❌ Missing comment_id or postId in comment response');
          return;
        }
        
        setPosts(prev => {
          const updatedPosts = prev.map(post => {
            if (post.id.toString() === data.postId.toString()) {
              const updatedComments = post.comments?.map(comment => {
                if (comment.content === data.content && !comment.id_facebookComment) {
                  console.log('✅ Found and updating comment:', comment.id, '→', data.comment_id);
                  return {
                    ...comment,
                    id_facebookComment: data.comment_id,
                    // facebookCommentUrl: data.URL ? (data.URL + '?comment_id=' + data.comment_id) : ''
                    facebookCommentUrl: data.URL,
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
        console.log('💭 Updating reply with Facebook ID:', data.replyId, 'and URL:', data.URL);
        
        if (!data.replyId || !data.postId || !data.commentId) {
          console.error('❌ Missing replyId, postId or commentId in reply_comment_result');
          return;
        }
        
        setPosts(prev => {
          return prev.map(post => {
            if (post.id.toString() === data.postId.toString()) {
              return {
                ...post,
                comments: post.comments?.map(comment => {
                  if (comment.id_facebookComment?.toString() === data.commentId) {
                    return {
                      ...comment,
                      replies: comment.replies?.map(reply => {
                        if (!reply.id_facebookReply) {
                          console.log('✅ Found and updating reply:', reply.id, '→', data.replyId);
                          return {
                            ...reply,
                            id_facebookReply: data.replyId?.toString(),
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
        console.log('💭 Updating reply to reply with Facebook ID:', data.replyId, 'and URL:', data.URL);
        
        if (!data.replyId || !data.postId || !data.commentId) {
          console.error('❌ Missing replyId, postId or commentId in reply_reply_comment_result');
          return;
        }
        
        setPosts(prev => {
          return prev.map(post => {
            if (post.id.toString() === data.postId.toString()) {
              return {
                ...post,
                comments: post.comments?.map(comment => {
                  if (comment.id_facebookComment?.toString() === data.commentId) {
                    return {
                      ...comment,
                      replies: comment.replies?.map(reply => {
                        if (!reply.id_facebookReply) {
                          console.log('✅ Found and updating reply:', reply.id, '→', data.replyId);
                          return {
                            ...reply,
                            id_facebookReply: data.replyId?.toString(),
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
  }, [setPosts]);

  return websocket;
};
