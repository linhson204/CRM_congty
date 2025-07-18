import React from "react";
import styles from "./styles_diary.module.css";

const DiaryText = () => {
  return (
    <div className={styles.main__body__item_nhatky}>
      <div className={styles.main__body__item__title_nhatky}>
        10:10 - 10/10/2020
      </div>
      <div className={styles.main__body__item__value_nhatky}>
        Nhóm khách hàng được cập nhật
        <span className={styles.where_cus}> bởi</span>
        <span className={styles.name_cus}> Nguyễn Văn Nam</span>
      </div>
    </div>
  );
};

export default DiaryText;
