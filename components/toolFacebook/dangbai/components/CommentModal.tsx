import React from "react";
import { Post } from "../types";
import styles from "../styles/styles.module.css";

interface CommentModalProps {
  showCommentModal: number | null;
  commentContent: string;
  setCommentContent: (content: string) => void;
  setShowCommentModal: () => void; // Chỉ là function để đóng modal
  submitComment: (post: Post) => void;
  post?: Post; // Thông tin bài đăng hiện tại
}

export const CommentModal: React.FC<CommentModalProps> = ({
  showCommentModal,
  commentContent,
  setCommentContent,
  setShowCommentModal,
  submitComment,
  post,
}) => {
  if (!showCommentModal || !post) return null;

  return (
    <div className={styles.modalOverlay} style={{ zIndex: 1001 }}>
      <div className={`${styles.modalContainer} ${styles.modalMedium}`}>
        {/* Header modal comment */}
        <div className={styles.modalHeader}>
          <h3 className={`${styles.modalTitle} ${styles.modalTitleMedium}`}>
            Viết bình luận cho bài đăng của {post.author}
          </h3>
          <button
            onClick={setShowCommentModal}
            className={styles.modalCloseButton}
          >
            ×
          </button>
        </div>

        {/* Body modal comment */}
        <div className={styles.modalBody}>
          {/* Hiển thị một phần nội dung bài đăng */}
          <div
            style={{
              marginBottom: "12px",
              padding: "8px",
              backgroundColor: "#f8f9fa",
              borderRadius: "4px",
              fontSize: "14px",
              color: "#666",
            }}
          >
            <strong>Bài đăng:</strong>{" "}
            {post.content.length > 100
              ? post.content.substring(0, 100) + "..."
              : post.content}
          </div>

          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Viết bình luận của bạn..."
            rows={4}
            className={styles.textarea}
            style={{ minHeight: "auto" }}
          />
        </div>

        {/* Footer modal comment */}
        <div className={styles.modalFooter}>
          <button
            onClick={setShowCommentModal}
            className={`${styles.button} ${styles.buttonSecondary}`}
          >
            Hủy
          </button>
          <button
            onClick={() => submitComment(post)}
            disabled={!commentContent.trim()}
            className={`${styles.button} ${styles.buttonPrimary} ${
              !commentContent.trim() ? styles.buttonDisabled : ""
            }`}
          >
            Bình luận
          </button>
        </div>
      </div>
    </div>
  );
};
