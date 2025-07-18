import React, { useEffect, useState } from "react";
import styles from "../potential.module.css";
import PotentialSelectBoxStep from "./select_box_step";

const PotentialStep3 = ({ checkValueCheckBox, setCheckValueCheckBox }: any) => {
  const handleChange = (e: any) => {
    // Truy cập giá trị của input thông qua event.target.value
    setCheckValueCheckBox(e?.target?.value);
  };
  return (
    <div className={styles.info_step}>
      <div className={styles.main__title}>Cập nhật thông tin</div>
      <div className={styles.main__body}>
        <div
          className={`${styles.main__body_item_step2} ${styles.flex_column}`}
        >
          <p className={styles.main__body__type}>Người phụ trách</p>
          <div className={`${styles.div_radio_step2} flex_align_center`}>
            <div className={styles.d_flex}>
              <input
                type="radio"
                defaultValue="Từ danh sách người dùng"
                defaultChecked={true}
                name="form_import"
                onClick={handleChange}
                placeholder="Từ danh sách người dùng"
              />
              Từ danh sách người dùng
            </div>
            <div className={styles.d_flex}>
              <input
                type="radio"
                defaultValue="Từ tệp cột: Người phụ trách"
                name="form_import"
                onClick={handleChange}
                style={{ height: "37px" }}
              />
              Từ tệp cột: Người phụ trách
            </div>
          </div>

          {checkValueCheckBox !== "update_user" ? (
            <div className={styles.div_emty} style={{width:"50%"}}>
              <label className={styles.form_label}>Người phụ trách</label>
              <PotentialSelectBoxStep
                value="Từ tệp cột: Người phụ trách"
                placeholder="Từ tệp cột: Người phụ trách"
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PotentialStep3;
