import React, { useState } from "react";
import styles from "../potential.module.css";

const PotentialStep4 = ({ typeDocument, personalInCharge }: any) => {
  return (
    <div className={styles.info_step}>
      <div className={styles.main__title}>Xác nhận thông tin</div>
      <div className={styles.main__body}>
        <div
          className={`${styles.main__body_item_step2} ${styles.flex_column}`}
        >
          <div className={`${styles.ct_step4} flex_align_center`}>
            <div className={styles.text}>Hình thức đối với các bản ghi:</div>
            <b className={styles.text}>{typeDocument}</b>
          </div>
          <div className={`${styles.ct_step4} flex_align_center`}>
            <div className={styles.text}>Người phụ trách: </div>
            <b className={styles.text}>{personalInCharge}</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PotentialStep4;
