import React from "react";
import styles from "./check_merge.module.css";

interface CheckMergeContentProps {
  numberSelected: number;
}
const CheckMergeContent: React.FC<CheckMergeContentProps> = ({
  numberSelected,
}) => {
  return (
    <div className={styles.content_table_search}>
      <div className={styles.button_top}>
        <div className={styles.title_table}>Bản ghi trùng</div>
      </div>
      <div className={styles.div__thaotac}>
        <div >
          <span>Đã chọn:</span>
          <b className={styles.checked_count}>{numberSelected}</b>
        </div>
      </div>
    </div>
  );
};

export default CheckMergeContent;
