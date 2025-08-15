import React from "react";
import { Post } from "../types";
import styles from "../styles/styles.module.css";
import { PostfixUnaryExpression } from "typescript";

interface PostItemProps {
  post: Post;
  formatTimestamp: (timestamp: string) => string;
  // handleComment: (postId: number) => void;
  handleComment: (post: Post) => void;
  handleReply: (
    postId: number,
    commentId: number,
    replyToAuthor?: string,
    replyId?: any,
    facebookCommentId?: string,
    facebookReplyId?: string
  ) => void;
  disabled?: boolean; // Disable khi đang crawl
}

export const PostItem: React.FC<PostItemProps> = ({
  post,
  formatTimestamp,
  handleComment,
  handleReply,
  disabled = false,
}) => {
  return (
    <div className={styles.postContainer}>
      <div className={styles.postHeader}>
        <div className={styles.authorInfo}>
          <div className={styles.authorAvatar}>{post.author.charAt(0)}</div>
          <div>
            <div className={styles.authorName}>{post.author}</div>
            <div className={styles.authorId}>ID: {post.authorId}</div>
          </div>
        </div>

        <div className={styles.timestamp}>
          {formatTimestamp(post.timestamp)}
        </div>
      </div>

      <div className={styles.postContent}>{post.content}</div>

      {/* Hiển thị ảnh */}
      {post.images && post.images.length > 0 && (
        <div
          className={`${styles.imageGrid} ${
            post.images.length === 1
              ? styles.imageGridSingle
              : styles.imageGridMultiple
          }`}
        >
          {post.images.map((image, index) => (
            <img
              key={index}
              src={
                typeof image === "string"
                  ? image
                  : `https://socket.hungha365.com:4000${image.url}`
              }
              alt={
                typeof image === "string"
                  ? `Ảnh ${index + 1}`
                  : image.name || `Ảnh ${index + 1}`
              }
              className={`${styles.postImage} ${
                post.images!.length === 1
                  ? styles.postImageSingle
                  : styles.postImageMultiple
              }`}
            />
          ))}
        </div>
      )}

      {/* Actions: Comment */}
      <div className={styles.actionsContainer}>
        <div className={styles.actionButtons}>
          <button
            // onClick={() => handleComment(post.id)}
            onClick={() => handleComment(post)}
            disabled={disabled}
            className={`${styles.actionButton} ${styles.commentButton} ${
              disabled ? styles.buttonDisabled : ""
            }`}
            style={{
              opacity: disabled ? 0.6 : 1,
              cursor: disabled ? "not-allowed" : "pointer",
            }}
          >
            <span>💬</span>
            <span>{post.comments?.length || 0}</span>
            {disabled && (
              <span style={{ marginLeft: "4px", fontSize: "10px" }}>🔄</span>
            )}
          </button>
        </div>
      </div>

      {/* Comments */}
      {post.comments && post.comments.length > 0 && (
        <div className={styles.commentsSection}>
          <h4 className={styles.commentsHeader}>
            Bình luận ({post.comments.length})
          </h4>
          {post.comments.map((comment) => (
            <div key={comment.id} className={styles.commentItem}>
              <div className={styles.commentHeader}>
                <span className={styles.commentAuthor}>{comment.author}</span>
                <span className={styles.commentTimestamp}>
                  {formatTimestamp(comment.timestamp)}
                </span>
              </div>
              <div className={styles.commentContent}>{comment.content}</div>

              {/* Nút phản hồi */}
              <button
                onClick={() => handleReply(post.id, comment.id, comment.author)}
                disabled={disabled}
                className={`${styles.replyButton} ${
                  disabled ? styles.buttonDisabled : ""
                }`}
                style={{
                  opacity: disabled ? 0.6 : 1,
                  cursor: disabled ? "not-allowed" : "pointer",
                }}
              >
                {disabled ? "Đang crawl comment..." : "Phản hồi"}
              </button>

              {/* Hiển thị các phản hồi */}
              {comment.replies && comment.replies.length > 0 && (
                <div className={styles.repliesContainer}>
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className={styles.replyItem}>
                      <div className={styles.replyHeader}>
                        <span className={styles.replyAuthor}>
                          {reply.author}
                        </span>
                        <span className={styles.replyTimestamp}>
                          {formatTimestamp(reply.timestamp)}
                        </span>
                      </div>
                      <div className={styles.replyContent}>
                        {reply.replyToAuthor ? (
                          <>
                            <div className={styles.replyMention}>
                              @{reply.replyToAuthor}
                            </div>
                            <div>{reply.content}</div>
                          </>
                        ) : (
                          <div>{reply.content}</div>
                        )}
                      </div>

                      {/* Nút phản hồi cho reply */}
                      <button
                        onClick={() => {
                          handleReply(
                            post.id,
                            comment.id,
                            reply.author,
                            reply.id,
                            comment.id_facebookComment,
                            reply.id_facebookReply
                          );
                        }}
                        disabled={disabled}
                        className={`${styles.replyToReplyButton} ${
                          disabled ? styles.buttonDisabled : ""
                        }`}
                        style={{
                          opacity: disabled ? 0.6 : 1,
                          cursor: disabled ? "not-allowed" : "pointer",
                        }}
                      >
                        {disabled ? "Đang crawl comment..." : "Phản hồi"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className={styles.statusContainer}>
        <div className={styles.statusTags}>
          <span className={styles.facebookTag}>Facebook</span>
          <span
            className={`${styles.statusTag} ${
              post.isPosted ? styles.statusPosted : styles.statusProcessing
            }`}
          >
            {post.isPosted ? "Đã đăng" : "Đang xử lý..."}
          </span>
        </div>

        {/* Link Facebook nếu có */}
        {post.facebookUrl && (
          <a
            href={post.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.facebookLink}
          >
            <span>🔗</span>
            Xem trên FB
          </a>
        )}
      </div>
    </div>
  );
};
