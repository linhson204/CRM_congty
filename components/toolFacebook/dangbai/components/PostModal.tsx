import React from 'react';
import stylesContract from "@/components/crm/contract/contract_action.module.css";
import styles from '../styles/styles.module.css';

interface PostModalProps {
  showModal: boolean;
  postContent: string;
  setPostContent: (content: string) => void;
  selectedImages: string[];
  setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>;
  handleCloseModal: () => void;
  handleSubmit: () => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
}

export const PostModal: React.FC<PostModalProps> = ({
  showModal,
  postContent,
  setPostContent,
  selectedImages,
  setSelectedImages,
  handleCloseModal,
  handleSubmit,
  handleImageUpload,
  removeImage
}) => {
  if (!showModal) return null;

  return (
    <div className={styles.modalOverlay} style={{ zIndex: 1000 }}>
      <div className={`${styles.modalContainer} ${styles.modalLarge}`}>
        
        {/* Header modal */}
        <div className={styles.modalHeader}>
          <div>
            <h3 className={styles.modalTitle}>
              Tạo bài đăng mới
            </h3>
            <p className={styles.modalSubtitle}>
              Chia sẻ thông tin tuyển dụng với cộng đồng
            </p>
          </div>
          <button 
            onClick={handleCloseModal}
            className={styles.modalCloseButton}
          >
            ×
          </button>
        </div>
        
        {/* Body modal */}
        <div className={styles.modalBody}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Nội dung bài đăng
            </label>
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Chia sẻ cơ hội việc làm, thông tin tuyển dụng hoặc tin tức về công ty..."
              rows={10}
              className={styles.textarea}
            />
            <div className={styles.charCount}>
              {postContent.length}/1000 ký tự
            </div>
          </div>

          {/* Upload ảnh */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Thêm ảnh (tối đa 4 ảnh)
            </label>
            
            <div 
              className={styles.uploadArea}
              onClick={() => document.getElementById('imageUpload')?.click()}
            >
              <input
                id="imageUpload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <div className={styles.uploadIcon}>
                📷
              </div>
              <div className={styles.uploadText}>
                Click để chọn ảnh hoặc kéo thả ảnh vào đây
              </div>
              <div className={styles.uploadSubtext}>
                Hỗ trợ: JPG, PNG, GIF (tối đa 4 ảnh)
              </div>
            </div>

            {/* Preview ảnh đã chọn */}
            {selectedImages.length > 0 && (
              <div className={styles.imagePreviewGrid}>
                {selectedImages.map((image, index) => (
                  <div key={index} className={styles.imagePreviewItem}>
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className={styles.imagePreview}
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className={styles.imageRemoveButton}
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
        <div className={styles.modalFooter}>
          <button 
            onClick={handleCloseModal}
            className={`${styles.button} ${styles.buttonSecondary} ${stylesContract.sub1}`}
          >
            Hủy
          </button>
          <button 
            onClick={handleSubmit}
            disabled={!postContent.trim()}
            className={`${styles.button} ${styles.buttonPrimary} ${stylesContract.sub2} ${!postContent.trim() ? styles.buttonDisabled : ''}`}
          >
            <span>📤</span>
            Đăng bài
          </button>
        </div>
      </div>
    </div>
  );
};
