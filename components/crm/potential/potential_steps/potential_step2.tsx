import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "../potential.module.css";

const PotentialStep2 = ({ checkValueCheckBox, setCheckValueCheckBox }: any) => {
  const handleChange = (e: any) => {
    // Truy cập giá trị của input thông qua event.target.value
    setCheckValueCheckBox(e?.target?.value);
  };
  return (
    <div className={styles.info_step}>
      <div className={styles.main__title}>Ghép dữ liệu</div>
      <div className={styles.main__body}>
        <div
          className={`${styles.main__body_item_step2} ${styles.flex_column}`}
        >
          <p className={styles.main__body__type}>
            Chọn hình thức đối với các bản ghi
          </p>
          <div className={`${styles.div_radio_step2} flex_align_center`}>
            <label className={styles.d_flex}>
              <input
                type="radio"
                defaultValue="Thêm mới"
                defaultChecked={true}
                name="form_import"
                onClick={handleChange}
              />
              Thêm mới
            </label>
            <label className={styles.d_flex}>
              <input
                type="radio"
                defaultValue="Cập nhật"
                name="form_import"
                onClick={handleChange}
              />
              Cập nhật
            </label>
            <label className={styles.d_flex}>
              <input
                type="radio"
                defaultValue="Cả hai"
                name="form_import"
                onClick={handleChange}
              />
              Cả hai
            </label>
          </div>
          {checkValueCheckBox !== "create" ? (
            <div className={`${styles.div_checkbox_step2} flex_align_center`}>
              <input type="checkbox" />
              <p className={styles.text}>
                Không cập nhật dữ liệu trống vào các trường thông tin đang có
                giá trị.
              </p>
              <img src="/crm/icon_warn.svg" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PotentialStep2;
