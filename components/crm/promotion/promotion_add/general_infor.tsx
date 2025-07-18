import React, { useState } from "react";
import { Space, TimePicker } from "antd";
import type { Dayjs } from "dayjs";
import PromotionSelectBoxStep from "../promotion_steps/select_box_step";
import styles from "./add_promotion.module.css";
import InputText from "./input_text";

export default function AddGeneralInfo() {
  const onChange = (time: Dayjs, timeString: string) => {};

  return (
    <div>
      <p className={styles.main__body__type}>Thông tin chung</p>

      <div className={styles.row_input}>
        <InputText
          label="Tên chương trình khuyến mại"
          placeholder="Nhập tên chương trình khuyến mại"
        />

        <InputText label="Mã khuyến mại" placeholder="Nhập khuyến mại" />
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Loại khuyến mại</label>
          <PromotionSelectBoxStep
            value="Chọn loại khuyến mại"
            placeholder="Chọn loại khuyến mại"
          />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Khách hàng</label>
          <PromotionSelectBoxStep
            value="Chọn khách hàng"
            placeholder="Chọn khách hàng"
          />
        </div>
      </div>

      <div className={styles.row_input}>
        <div
          className={`${styles.mb_3} ${styles["col-lg-6"]}`}
          style={{ display: "inline-flex" }}
        >
          <InputText label="Thời gian bắt đầu" type="date" />
          <Space wrap>
            <TimePicker
              use12Hours
              format="h:mm a"
              className={styles.time_picker}
            />
          </Space>
        </div>
        <div
          className={`${styles.mb_3} ${styles["col-lg-6"]}`}
          style={{ display: "inline-flex" }}
        >
          <InputText label="Thời gian kết thúc" type="date" />
          <Space wrap>
            <TimePicker
              use12Hours
              format="h:mm a"
              className={styles.time_picker}
            />
          </Space>
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>
            Chỉ áp dụng các tháng
          </label>
          <PromotionSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>
            Chỉ áp dụng các ngày trong tuần
          </label>
          <PromotionSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>
            Chỉ áp dụng các ngày
          </label>
          <PromotionSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>
            Không áp dụng các ngày
          </label>
          <PromotionSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
      </div>

      <div className="mb-3 col-lg-12">
        <div className="row">
          <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
            <label className={styles.form_label}>Áp dụng vào khung giờ</label>
            <div className="main_add_time"></div>
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col-lg-6">
            <button type="button" className={styles.btn_add_time}>
              + Thêm khung giờ áp dụng
            </button>
          </div>
        </div>
      </div>

      <div className="mb-3 col-lg-12">
        <p className={styles.checkbox_quote}>
          <input type="checkbox" className="active_promotion" />
          Kích hoạt chương trình khuyến mại
        </p>

        <p className={styles.checkbox_quote}>
          <input type="checkbox" className="apply_with_other_program" />
          Áp dụng cùng các chương trình khuyến mại khác
        </p>
      </div>

      <div className="mb-3 col-lg-12">
        <div className={styles.main__body__type}>Danh sách khuyến mại</div>
        <div className="scroll_table">
          <table className="table_normal">
            <thead></thead>
            <tbody id="sortable" className="ui-sortable"></tbody>
          </table>
        </div>
        <button type="button" className={styles.add_product}>
          <img src="/crm/add_blue.svg" alt="hungha365.com" />
          Thêm hàng hoá
        </button>
      </div>
    </div>
  );
}
