import React from 'react';
import styles from '../styles/styles.module.css';

interface CommentModalProps {
  showCommentModal: number | null;
  commentContent: string;
  setCommentContent: (content: string) => void;
  setShowCommentModal: (id: number | null) => void;
  submitComment: () => void;
}

export const CommentModal: React.FC<CommentModalProps> = ({
  showCommentModal,
  commentContent,
  setCommentContent,
  setShowCommentModal,
  submitComment
}) => {
  if (!showCommentModal) return null;

  return (
    <div className={styles.modalOverlay} style={{ zIndex: 1001 }}>
      <div className={`${styles.modalContainer} ${styles.modalMedium}`}>
        
        {/* Header modal comment */}
        <div className={styles.modalHeader}>
          <h3 className={`${styles.modalTitle} ${styles.modalTitleMedium}`}>
            Viết bình luận
          </h3>
          <button 
            onClick={() => setShowCommentModal(null)}
            className={styles.modalCloseButton}
          >
            ×
          </button>
        </div>
        
        {/* Body modal comment */}
        <div className={styles.modalBody}>
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Viết bình luận của bạn..."
            rows={4}
            className={styles.textarea}
            style={{ minHeight: 'auto' }}
          />
        </div>
        
        {/* Footer modal comment */}
        <div className={styles.modalFooter}>
          <button 
            onClick={() => setShowCommentModal(null)}
            className={`${styles.button} ${styles.buttonSecondary}`}
          >
            Hủy
          </button>
          <button 
            onClick={submitComment}
            disabled={!commentContent.trim()}
            className={`${styles.button} ${styles.buttonPrimary} ${!commentContent.trim() ? styles.buttonDisabled : ''}`}
          >
            Bình luận
          </button>
        </div>
      </div>
    </div>
  );
};
