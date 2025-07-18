import styles from "../campaign_add_files/add_file_campaign.module.css";
import InputText from "./input_text";
import { Input } from "antd";
import $ from "jquery";
import { useEffect } from "react";
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.min.js";
import InputTextDotRed from "../campaign_add_files/input_text_dot_red";

export default function AddGeneralInfo() {
  useEffect(() => {
    $(".js-example-basic-single").select2();
  }, []);

  return (
    <div>
      <p className={styles.main__body__type}>Thông tin chung</p>

      <div className={styles.row_custom}>
        <InputTextDotRed
          label="Tên chiến dịch"
          placeholder="Nhập tên chiến dịch"
        />
        <div
          className={`${styles.mb_3} ${styles["col-lg-6"]} ${styles.custom_select2}`}
        >
          <label className={`${styles["form-label"]}`}>Loại</label>
          <select className="js-example-basic-single" name="state">
            <option value="AL">Alabama</option>
            ...
            <option value="WY">Wyoming</option>
          </select>
        </div>
      </div>

      <div className={styles.row_custom}>
        <div
          className={`${styles.mb_3} ${styles["col-lg-6"]} ${styles.custom_select2}`}
        >
          <label className={`${styles["form-label"]}`}>Tình trạng</label>
          <select className="js-example-basic-single" name="state">
            <option value="AL">Alabama</option>
            ...
            <option value="WY">Wyoming</option>
          </select>
        </div>
        <div className={styles.row_input_custom}>
          <div className={`${styles.width1} ${styles["col-lg-6"]}`}>
            <InputText label="Ngày bắt đầu" placeholder="" type="date" />
          </div>
          <div className={`${styles.width4} ${styles["col-lg-6"]}`}>
            <InputText label="Ngày kết thúc" placeholder="" type="date" />
          </div>
        </div>
      </div>

      <div className={styles.row_custom}>
        <div className={styles.row_input_custom}>
          <div className={`${styles.width2} ${styles["col-lg-6"]}`}>
            <label className={`${styles["form-label"]}`}>Ngân sách</label>
            <Input placeholder="Nhập" suffix="VNĐ" />
          </div>
          <div className={`${styles.width3} ${styles["col-lg-6"]}`}>
            <label className={`${styles["form-label"]}`}>
              Doanh số kỳ vọng
            </label>
            <Input placeholder="Nhập" suffix="VNĐ" />
          </div>
        </div>
        <div
          className={`${styles.mb_3} ${styles["col-lg-6"]} ${styles.custom_select2}`}
        >
          <label className={`${styles["form-label"]} `}>
            Kênh truyền thông
          </label>
          <select className="js-example-basic-single" name="state">
            <option value="AL">Alabama</option>
            ...
            <option value="WY">Wyoming</option>
          </select>
        </div>
      </div>

      <div className={styles.row_custom}>
        <InputText label="Số đã chi" placeholder="Nhập" />
        <div
          className={`${styles.mb_3} ${styles["col-lg-6"]} ${styles.custom_select2}`}
        >
          <label className={`${styles["form-label"]}`}>
            Nhân viên phụ trách
          </label>
          <select className={`js-example-basic-single`} name="state">
            <option value="AL">Alabama</option>
            ...
            <option value="WY">Wyoming</option>
          </select>
        </div>
      </div>
      <link href="path/to/select2.min.css" rel="stylesheet" />
      <script src="path/to/select2.min.js"></script>
    </div>
  );
}
