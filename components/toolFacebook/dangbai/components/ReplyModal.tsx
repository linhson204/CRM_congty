import React from "react";
import { ShowReplyModal } from "../types";
import styles from "../styles/styles.module.css";

interface ReplyModalProps {
  showReplyModal: ShowReplyModal | null;
  replyContent: string;
  setReplyContent: (content: string) => void;
  setShowReplyModal: (modal: ShowReplyModal | null) => void;
  submitReplyToReply: () => void;
  submitReply: () => void;
  disabled?: boolean; // Disable khi đang crawl
}

export const ReplyModal: React.FC<ReplyModalProps> = ({
  showReplyModal,
  replyContent,
  setReplyContent,
  setShowReplyModal,
  submitReplyToReply,
  submitReply,
  disabled = false,
}) => {
  if (!showReplyModal) return null;

  return (
    <div className={styles.modalOverlay} style={{ zIndex: 1002 }}>
      <div className={`${styles.modalContainer} ${styles.modalSmall}`}>
        {/* Header modal reply */}
        <div className={`${styles.modalHeader} ${styles.modalHeaderSmall}`}>
          <h3 className={`${styles.modalTitle} ${styles.modalTitleSmall}`}>
            💬 Phản hồi{" "}
            {showReplyModal.replyToAuthor
              ? `@${showReplyModal.replyToAuthor}`
              : "bình luận"}
          </h3>
          <button
            onClick={() => setShowReplyModal(null)}
            className={`${styles.modalCloseButton} ${styles.modalCloseButtonSmall}`}
          >
            ×
          </button>
        </div>

        {/* Body modal reply */}
        <div className={styles.modalBodySmall}>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder={
              showReplyModal?.replyToAuthor
                ? `Phản hồi @${showReplyModal.replyToAuthor}...`
                : "Viết phản hồi của bạn..."
            }
            rows={3}
            className={`${styles.textarea} ${styles.textareaSmall}`}
            disabled={disabled}
          />
        </div>

        {/* Footer modal reply */}
        <div className={`${styles.modalFooter} ${styles.modalFooterSmall}`}>
          <button
            onClick={() => setShowReplyModal(null)}
            className={`${styles.button} ${styles.buttonSecondary} ${styles.buttonSmall}`}
          >
            Hủy
          </button>
          <button
            onClick={showReplyModal?.replyId ? submitReplyToReply : submitReply}
            disabled={!replyContent.trim() || disabled}
            className={`${styles.button} ${styles.buttonPrimary} ${
              styles.buttonSmall
            } ${!replyContent.trim() || disabled ? styles.buttonDisabled : ""}`}
          >
            {disabled ? "Đang crawl comment..." : "Phản hồi"}
          </button>
        </div>
      </div>
    </div>
  );
};
