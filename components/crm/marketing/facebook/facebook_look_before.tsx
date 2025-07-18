import React, { useRef } from "react";
import styles from "./facebook.module.css";
import { Pen } from "@/public/img/marketing/facebook";

const LookBeforFacebook = () => {
  const chooseFileRef = useRef(null);

  return (
          <div className={styles.content_left}>
            <div>
              <p className={styles.content_title}>Thời gian tạo</p>
              <input
                className={styles.content_input}
                placeholder="00:00 - 01/01/2023"
              ></input>
            </div>
            <div>
              <p className={styles.content_title}>Ghi chú về khách hàng</p>
              <input
                className={styles.content_input}
                placeholder="Tất cả bạn bè"
              ></input>
            </div>
            <div>
              <p className={styles.content_title}>Tiêu đề</p>
              <input
                className={styles.content_input}
                placeholder="Tham gia nhóm để cập nhật thông tin mới nhất"
              ></input>
            </div>
            
            <div className={styles.content_primary}>
              <p className={styles.content_title}>Nội dung chính</p>
              <textarea
                className={styles.content_enter}
                rows={5}
                placeholder="Thân gửi [TEN_KHACH_HANG], CV xin việc là yếu tố quan trọng để nhà
                tuyển dụng xem xét và đánh giá từng ứng viên."
              />
            </div>
          </div>
  );
};

export default LookBeforFacebook;
