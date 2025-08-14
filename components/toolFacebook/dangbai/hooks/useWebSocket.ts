import { useState, useEffect } from "react";
import { Post, Comment, Reply, WebSocketData } from "../types";
import Cookies from "js-cookie";

export const useWebSocket = (
  posts: Post[],
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
  refreshCommentsForPost?: (postId: string | number) => Promise<void>,
  setCrawlingStatus?: React.Dispatch<
    React.SetStateAction<{
      [facebookId: string]: {
        isActive: boolean;
        message: string;
        timestamp?: string;
      };
    }>
  >
) => {
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);

  const connectWebSocket = () => {
    // const ws = new WebSocket("ws://123.24.206.25:4000");
    // const ws = new WebSocket("wss://socket.hungha365.com:4000");
    const ws = new WebSocket("ws://localhost:4000");
    // const ws = new WebSocket("wss://backend-crm-skmr.onrender.com");
    const userID = Cookies.get("userID");

    ws.onopen = () => {
      console.log(" WebSocket connected successfully");
      ws.send(
        JSON.stringify({
          type: "register",
          clientId: userID,
        })
      );
    };

    ws.onmessage = (event) => {
      const data: WebSocketData = JSON.parse(event.data);

      if (data.type === "post_sent") {
        console.log("Post sent successfully with ID:", data.postId);
      } else if (data.type === "URL_post") {
        console.log(
          " Updating post with ID:",
          data.postId,
          "with URL:",
          data.URL
        );

        setPosts((prev) => {
          const updatedPosts = prev.map((post) => {
            if (post.id.toString() === data.postId) {
              console.log(" Found and updating post:", post.id, "→", data.URL);
              return {
                ...post,
                facebookUrl: data.URL,
                isPosted: true,
                // Cập nhật tên tác giả nếu có thông tin từ B
                ...(data.authorName && { author: data.authorName }),
              };
            }
            return post;
          });

          return updatedPosts;
        });
      } else if (data.type === "comment_byB") {
        // Xử lý comment mới từ B
        console.log("📨 Received new comment from B:", data);
        console.log("Comment details:", {
          postId: data.postId,
          content: data.content,
          commentFbId: data.commentFbId,
          authorName: data.authorName,
          timestamp: data.timestamp,
        });

        if (!data.postId || !data.content || !data.commentFbId) {
          console.error("❌ Missing required fields in comment from B");
          return;
        }

        // Tạo comment mới từ dữ liệu nhận được từ B
        const newCommentFromB: Comment = {
          id: Date.now(), // Tạo ID tạm thời cho UI
          content: data.content,
          author: data.authorName || "Facebook User",
          authorId: data.authorId || "facebook_user",
          timestamp: data.timestamp
            ? new Date(data.timestamp).toLocaleString("vi-VN")
            : new Date().toLocaleString("vi-VN"),
          replies: [],
          userLinkFb: data.linkUserComment,
          id_facebookComment: data.commentFbId,
          facebookCommentUrl: data.URL || "",
          to: data.to,
          postId: parseInt(data.postId),
        };

        console.log("💭 Created comment object:", newCommentFromB);

        setPosts((prev) => {
          const targetPost = prev.find(
            (post) => post.id.toString() === data.postId.toString()
          );
          console.log(targetPost);
          if (!targetPost) {
            console.error("❌ No post found with ID:", data.postId);
            console.log(
              "Available post IDs:",
              prev.map((p) => p.id.toString())
            );
            return prev;
          }

          return prev.map((post) => {
            if (post.id.toString() === data.postId.toString()) {
              console.log(" Adding new comment from B to post:", post.id);
              const updatedPost = {
                ...post,
                comments: [...(post.comments || []), newCommentFromB],
              };

              console.log(
                "Updated post comments count:",
                updatedPost.comments.length
              );
              return updatedPost;
            }
            return post;
          });
        });
      } else if (data.type === "reply_comment_byB") {
        // Xử lý reply comment mới từ B
        console.log("📨 Received new reply comment from B:", data);
        console.log("Reply details:", {
          postId: data.postId,
          commentId: data.commentId,
          content: data.content,
          replyId: data.replyId,
          authorName: data.authorName,
          timestamp: data.timestamp,
        });

        if (!data.postId || !data.commentId || !data.content) {
          console.error("❌ Missing required fields in reply comment from B");
          return;
        }

        // Tạo reply mới từ dữ liệu nhận được từ B
        const newReplyFromB: Reply = {
          id: Date.now(), // Tạo ID tạm thời cho UI
          content: data.content,
          author: data.authorName || "Facebook User",
          authorId: data.authorId || "facebook_user",
          timestamp: data.timestamp
            ? new Date(data.timestamp).toLocaleString("vi-VN")
            : new Date().toLocaleString("vi-VN"),
          id_facebookReply: data.replyId?.toString(),
          facebookReplyUrl: data.URL,
          to: data.to,
          userLinkFb: data.linkUserReply,
        };

        console.log("💭 Created reply object:", newReplyFromB);

        setPosts((prev) => {
          const targetPost = prev.find(
            (post) => post.id.toString() === data.postId?.toString()
          );
          if (!targetPost) {
            console.error("❌ No post found with ID:", data.postId);
            console.log(
              "Available post IDs:",
              prev.map((p) => p.id.toString())
            );
            return prev;
          }

          return prev.map((post) => {
            if (post.id.toString() === data.postId?.toString()) {
              return {
                ...post,
                comments:
                  post.comments?.map((comment) => {
                    // Tìm comment dựa trên Facebook comment ID
                    if (
                      comment.id_facebookComment === data.commentId?.toString()
                    ) {
                      console.log(
                        " Adding new reply from B to comment:",
                        comment.id
                      );
                      const updatedComment = {
                        ...comment,
                        replies: [...(comment.replies || []), newReplyFromB],
                      };
                      console.log(
                        "Updated comment replies count:",
                        updatedComment.replies.length
                      );
                      return updatedComment;
                    }
                    return comment;
                  }) || [],
              };
            }
            return post;
          });
        });
      } else if (data.type === "comment_result") {
        console.log(
          "💬 Updating comment with Facebook ID:",
          data.comment_id,
          "and URL:",
          data.URL
        );

        if (!data.comment_id || !data.postId) {
          console.error("❌ Missing comment_id or postId in comment response");
          return;
        }

        setPosts((prev) => {
          const updatedPosts = prev.map((post) => {
            if (post.id.toString() === data.postId.toString()) {
              const updatedComments =
                post.comments?.map((comment) => {
                  if (
                    comment.content === data.content &&
                    !comment.id_facebookComment
                  ) {
                    console.log(
                      " Found and updating comment:",
                      comment.id,
                      "→",
                      data.comment_id
                    );

                    return {
                      ...comment,
                      id_facebookComment: data.comment_id,
                      facebookCommentUrl: data.URL,
                      // Cập nhật tên tác giả nếu có thông tin từ B
                      ...(data.authorName && { author: data.authorName }),
                    };
                  }
                  return comment;
                }) || [];

              return {
                ...post,
                comments: updatedComments,
              };
            }
            return post;
          });

          return updatedPosts;
        });
      } else if (data.type === "reply_comment_result") {
        console.log(
          "💭 Updating reply with Facebook ID:",
          data.replyId,
          "and URL:",
          data.URL
        );

        if (!data.replyId || !data.postId || !data.commentId) {
          console.error(
            "❌ Missing replyId, postId or commentId in reply_comment_result"
          );
          return;
        }

        setPosts((prev) => {
          return prev.map((post) => {
            if (post.id.toString() === data.postId.toString()) {
              return {
                ...post,
                comments:
                  post.comments?.map((comment) => {
                    if (
                      comment.id_facebookComment?.toString() === data.commentId
                    ) {
                      return {
                        ...comment,
                        replies:
                          comment.replies?.map((reply) => {
                            if (!reply.id_facebookReply) {
                              console.log(
                                " Found and updating reply:",
                                reply.id,
                                "→",
                                data.replyId
                              );

                              return {
                                ...reply,
                                id_facebookReply: data.replyId?.toString(),
                                facebookReplyUrl: data.URL || "",
                                // Cập nhật tên tác giả nếu có thông tin từ B
                                ...(data.authorName && {
                                  author: data.authorName,
                                }),
                              };
                            }
                            return reply;
                          }) || [],
                      };
                    }
                    return comment;
                  }) || [],
              };
            }
            return post;
          });
        });
      } else if (data.type === "reply_reply_comment_result") {
        console.log(
          "💭 Updating reply to reply with Facebook ID:",
          data.replyId,
          "and URL:",
          data.URL
        );

        if (!data.replyId || !data.postId || !data.commentId) {
          console.error(
            "❌ Missing replyId, postId or commentId in reply_reply_comment_result"
          );
          return;
        }

        setPosts((prev) => {
          return prev.map((post) => {
            if (post.id.toString() === data.postId.toString()) {
              return {
                ...post,
                comments:
                  post.comments?.map((comment) => {
                    if (
                      comment.id_facebookComment?.toString() === data.commentId
                    ) {
                      return {
                        ...comment,
                        replies:
                          comment.replies?.map((reply) => {
                            if (!reply.id_facebookReply) {
                              console.log(
                                " Found and updating reply:",
                                reply.id,
                                "→",
                                data.replyId
                              );

                              return {
                                ...reply,
                                id_facebookReply: data.replyId?.toString(),
                                facebookReplyUrl: data.URL || "",
                                // Cập nhật tên tác giả nếu có thông tin từ B
                                ...(data.authorName && {
                                  author: data.authorName,
                                }),
                              };
                            }
                            return reply;
                          }) || [],
                      };
                    }
                    return comment;
                  }) || [],
              };
            }
            return post;
          });
        });
      } else if (data.type === "crawl_comment") {
        // Xử lý message crawl_comment
        console.log("🔄 Crawl comment status update:", data);

        if (setCrawlingStatus && data.facebookId) {
          console.log("🔧 Before setCrawlingStatus:", {
            facebookId: data.facebookId,
            status: data.status,
            message: data.message,
            isActive: data.status === "started" || data.status === "progress",
          });

          setCrawlingStatus((prev) => {
            const newStatus = {
              ...prev,
              [data.facebookId!]: {
                isActive:
                  data.status === "started" || data.status === "progress",
                message: data.message || "",
                timestamp: data.timestamp,
              },
            };

            console.log("🔧 After setCrawlingStatus:", {
              previousStatus: prev,
              newStatus: newStatus,
              updatedAccount: data.facebookId,
            });

            return newStatus;
          });

          console.log(`📊 Crawling status for ${data.facebookId}:`, {
            status: data.status,
            message: data.message,
            isActive: data.status === "started" || data.status === "progress",
          });
        } else {
          console.warn("⚠️ setCrawlingStatus or facebookId missing:", {
            setCrawlingStatus: !!setCrawlingStatus,
            facebookId: data.facebookId,
          });
        }
      }
    };

    ws.onclose = (event) => {
      console.log("❌ WebSocket disconnected:", event.code, event.reason);
      setWebsocket(null);

      setTimeout(() => {
        console.log("🔄 Attempting to reconnect WebSocket...");
        connectWebSocket();
      }, 500);
    };

    ws.onerror = (error) => {
      console.error("❌ WebSocket error:", error);
    };

    setWebsocket(ws);
    return ws;
  };

  useEffect(() => {
    const ws = connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [setPosts]);

  return websocket;
};
