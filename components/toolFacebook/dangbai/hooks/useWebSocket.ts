import { useState, useEffect } from "react";
import { Post, Comment, Reply, WebSocketData } from "../types";
import Cookies from "js-cookie";
import { createPost } from "../../../../pages/api/toolFacebook/dang-bai/dang-bai";
import {
  createComment,
  createReplyComment,
} from "../../../../pages/api/toolFacebook/dang-bai/comment";

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

  useEffect(() => {
    // const ws = new WebSocket("ws://localhost:4000");
    const ws = new WebSocket("wss://backend-crm-skmr.onrender.com");
    const userID = Cookies.get("userID");

    ws.onopen = () => {
      console.log("WebSocket connected");
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
          "📝 Updating post with ID:",
          data.postId,
          "with URL:",
          data.URL
        );

        setPosts((prev) => {
          const updatedPosts = prev.map((post) => {
            if (post.id.toString() === data.postId) {
              console.log(
                "✅ Found and updating post:",
                post.id,
                "→",
                data.URL
              );
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

          const foundPost = prev.find(
            (post) => post.id.toString() === data.postId
          );

          if (!foundPost) {
            console.error("❌ No post found with ID:", data.postId);
          } else {
            const payloadPost = {
              facebookId: foundPost.to || "B22858640",
              userId: userID,
              userNameFacebook: data.authorName || "Người dùng",
              content: foundPost.content,
              facebookPostId: foundPost.id.toString(),
              facebookPostUrl: data.URL,
              createdAt: Math.floor(Date.now() / 1000),
              updatedAt: Math.floor(Date.now() / 1000),
              attachments:
                foundPost.images?.map((imageUrl, index) => ({
                  name: imageUrl.name,
                  type: "image",
                  url: imageUrl.url,
                })) || [],
              metadata: {
                category: "job_posting",
                source: "crm_tool",
                platform: "facebook",
                action: "create_post",
                timestamp: new Date().toISOString(),
              },
            };

            console.log("PayloadPost được tạo:", payloadPost);

            // Gọi API không đồng bộ sau khi đã update state
            createPost(payloadPost)
              .then((response) => {
                console.log(
                  "✅ PayloadPost đã được gửi lên API thành công",
                  response
                );

                // Kiểm tra response structure - có thể _id nằm trong response.data
                const mongoId = response._id || response.data?._id;

                // Lưu MongoDB ID vào post sau khi tạo thành công
                if (mongoId) {
                  console.log("💾 Saving MongoDB ID to post:", mongoId);

                  setPosts((prevPosts) => {
                    const updatedPosts = prevPosts.map((post) => {
                      if (post.id.toString() === data.postId) {
                        return {
                          ...post,
                          idMongodb: mongoId,
                        };
                      }
                      return post;
                    });

                    console.log(
                      "✅ MongoDB ID đã được lưu vào post:",
                      data.postId
                    );
                    return updatedPosts;
                  });
                } else {
                  console.warn("⚠️ Response không chứa MongoDB ID:", {
                    response,
                    checkedFields: ["_id", "data._id", "id"],
                  });
                }
              })
              .catch((error) => {
                console.error("❌ Lỗi khi gửi PayloadPost lên API:", error);
                console.error("❌ Error details:", {
                  message: error.message,
                  response: error.response?.data,
                  status: error.response?.status,
                });
              });
          }

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
              console.log("✅ Adding new comment from B to post:", post.id);
              const updatedPost = {
                ...post,
                comments: [...(post.comments || []), newCommentFromB],
              };

              const payloadComment = {
                post_id: post.idMongodb,
                facebookId: data.to || "B22858640",
                userId: userID,
                userNameFacebook: data.authorName || "Người dùng",
                content: data.content,
                postId: data.postId,
                userLinkFb: data.linkUserComment,
                facebookCommentUrl: data.URL,
                facebookCommentId: data.commentFbId,
                createdAt: Math.floor(Date.now() / 1000),
                updatedAt: Math.floor(Date.now() / 1000),
              };

              console.log("payloadComment được tạo:", payloadComment);

              // Gọi API không đồng bộ sau khi đã update state
              createComment(payloadComment)
                .then((response) => {
                  console.log(
                    "✅ payloadComment đã được gửi lên API thành công",
                    response
                  );

                  // Kiểm tra response structure - có thể _id nằm trong response.data
                  const mongoId = response._id || response.data?._id;

                  // Lưu MongoDB ID vào comment sau khi tạo thành công
                  if (mongoId) {
                    console.log("💾 Saving MongoDB ID to comment:", mongoId);

                    setPosts((prevPosts) => {
                      const updatedPosts = prevPosts.map((post) => {
                        if (post.id.toString() === data.postId) {
                          return {
                            ...post,
                            comments:
                              post.comments?.map((comment) => {
                                if (
                                  comment.content === data.content &&
                                  comment.id_facebookComment ===
                                    data.commentFbId
                                ) {
                                  return {
                                    ...comment,
                                    idMongodb: mongoId,
                                  };
                                }
                                return comment;
                              }) || [],
                          };
                        }
                        return post;
                      });

                      console.log(
                        "✅ MongoDB ID đã được lưu vào comment:",
                        data.comment_id
                      );
                      return updatedPosts;
                    });
                  } else {
                    console.warn("⚠️ Response không chứa MongoDB ID:", {
                      response,
                      checkedFields: ["_id", "data._id", "id"],
                    });
                  }
                })
                .catch((error) => {
                  console.error("❌ Lỗi khi gửi PayloadPost lên API:", error);
                  console.error("❌ Error details:", {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status,
                  });
                });
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
                        "✅ Adding new reply from B to comment:",
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
                      const payloadReplyComment = {
                        userId: userID,
                        userNameFacebook: data.authorName || "Người dùng",
                        content: data.content,
                        userLinkFb: data.linkUserReply,
                        facebookReplyUrl: data.URL,
                        replyToAuthor: comment.author,
                        id_facebookReply: data.replyId,
                        createdAt: Math.floor(Date.now() / 1000),
                        updatedAt: Math.floor(Date.now() / 1000),
                      };

                      console.log(
                        "payloadReplyComment được tạo:",
                        payloadReplyComment
                      );

                      // Gọi API không đồng bộ sau khi đã update state
                      createReplyComment(
                        comment.id_facebookComment,
                        payloadReplyComment
                      )
                        .then((response) => {
                          console.log(
                            "✅ payloadReplyComment đã được gửi lên API thành công",
                            response
                          );
                        })
                        .catch((error) => {
                          console.error(
                            "❌ Lỗi khi gửi payloadReplyComment lên API:",
                            error
                          );
                          console.error("❌ Error details:", {
                            message: error.message,
                            response: error.response?.data,
                            status: error.response?.status,
                          });
                        });
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
                      "✅ Found and updating comment:",
                      comment.id,
                      "→",
                      data.comment_id
                    );

                    const payloadComment = {
                      post_id: post.idMongodb,
                      facebookId: comment.to || "B22858640",
                      userId: userID,
                      userNameFacebook: data.authorName || "Người dùng",
                      content: comment.content,
                      postId: comment.postId,
                      userLinkFb: comment.userLinkFb,
                      facebookCommentUrl: data.URL,
                      facebookCommentId: data.comment_id,
                      createdAt: Math.floor(Date.now() / 1000),
                      updatedAt: Math.floor(Date.now() / 1000),
                    };

                    console.log("payloadComment được tạo:", payloadComment);

                    // Gọi API không đồng bộ sau khi đã update state
                    createComment(payloadComment)
                      .then((response) => {
                        console.log(
                          "✅ payloadComment đã được gửi lên API thành công",
                          response
                        );

                        // Kiểm tra response structure - có thể _id nằm trong response.data
                        const mongoId = response._id || response.data?._id;

                        // Lưu MongoDB ID vào comment sau khi tạo thành công
                        if (mongoId) {
                          console.log(
                            "💾 Saving MongoDB ID to comment:",
                            mongoId
                          );

                          setPosts((prevPosts) => {
                            const updatedPosts = prevPosts.map((post) => {
                              if (post.id.toString() === data.postId) {
                                return {
                                  ...post,
                                  comments:
                                    post.comments?.map((comment) => {
                                      if (
                                        comment.content === data.content &&
                                        comment.id_facebookComment ===
                                          data.comment_id
                                      ) {
                                        return {
                                          ...comment,
                                          idMongodb: mongoId,
                                        };
                                      }
                                      return comment;
                                    }) || [],
                                };
                              }
                              return post;
                            });

                            console.log(
                              "✅ MongoDB ID đã được lưu vào comment:",
                              data.comment_id
                            );
                            return updatedPosts;
                          });
                        } else {
                          console.warn("⚠️ Response không chứa MongoDB ID:", {
                            response,
                            checkedFields: ["_id", "data._id", "id"],
                          });
                        }
                      })
                      .catch((error) => {
                        console.error(
                          "❌ Lỗi khi gửi PayloadPost lên API:",
                          error
                        );
                        console.error("❌ Error details:", {
                          message: error.message,
                          response: error.response?.data,
                          status: error.response?.status,
                        });
                      });

                    return {
                      ...comment,
                      id_facebookComment: data.comment_id,
                      // facebookCommentUrl: data.URL ? (data.URL + '?comment_id=' + data.comment_id) : ''
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
                                "✅ Found and updating reply:",
                                reply.id,
                                "→",
                                data.replyId
                              );

                              const payloadReplyComment = {
                                userId: userID,
                                userNameFacebook:
                                  data.authorName || "Người dùng",
                                content: reply.content,
                                userLinkFb: reply.userLinkFb,
                                facebookReplyUrl: data.URL,
                                replyToAuthor: comment.author,
                                id_facebookReply: data.replyId,
                                createdAt: Math.floor(Date.now() / 1000),
                                updatedAt: Math.floor(Date.now() / 1000),
                              };

                              console.log(
                                "payloadReplyComment được tạo:",
                                payloadReplyComment
                              );

                              // Gọi API không đồng bộ sau khi đã update state
                              createReplyComment(
                                comment.id_facebookComment,
                                payloadReplyComment
                              )
                                .then((response) => {
                                  console.log(
                                    "✅ payloadReplyComment đã được gửi lên API thành công",
                                    response
                                  );
                                })
                                .catch((error) => {
                                  console.error(
                                    "❌ Lỗi khi gửi payloadReplyComment lên API:",
                                    error
                                  );
                                  console.error("❌ Error details:", {
                                    message: error.message,
                                    response: error.response?.data,
                                    status: error.response?.status,
                                  });
                                });
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
                                "✅ Found and updating reply:",
                                reply.id,
                                "→",
                                data.replyId
                              );

                              const payloadReplyComment = {
                                userId: userID,
                                userNameFacebook:
                                  data.authorName || "Người dùng",
                                content: reply.content,
                                userLinkFb: reply.userLinkFb,
                                facebookReplyUrl: data.URL,
                                replyToAuthor: comment.author,
                                id_facebookReply: data.replyId,
                                createdAt: Math.floor(Date.now() / 1000),
                                updatedAt: Math.floor(Date.now() / 1000),
                              };

                              console.log(
                                "payloadReplyComment được tạo:",
                                payloadReplyComment
                              );

                              // Gọi API không đồng bộ sau khi đã update state
                              createReplyComment(
                                comment.id_facebookComment,
                                payloadReplyComment
                              )
                                .then((response) => {
                                  console.log(
                                    "✅ payloadReplyComment đã được gửi lên API thành công",
                                    response
                                  );
                                })
                                .catch((error) => {
                                  console.error(
                                    "❌ Lỗi khi gửi payloadReplyComment lên API:",
                                    error
                                  );
                                  console.error("❌ Error details:", {
                                    message: error.message,
                                    response: error.response?.data,
                                    status: error.response?.status,
                                  });
                                });

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

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setWebsocket(ws);

    return () => {
      ws.close();
    };
  }, [setPosts]);

  return websocket;
};
