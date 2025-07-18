import CampaignSelectBoxStep from "../bill_steps/select_box_step";
import styles from "./edit_file_bill.module.css";
import InputText from "./input_text";
import { Input, Tooltip } from 'antd';

export default function EditGeneralInfo() {
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin chung</p>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Khách hàng*</label>
          <CampaignSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        <InputText label="Địa chỉ" placeholder="Nhập địa chỉ khách hàng" />
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Tài khoản ngân hàng</label>
          <CampaignSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Mở tại ngân hàng</label>
          <CampaignSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
      </div>

      <div className={styles.row_input}>
        <InputText label="Mã số thuế" placeholder="Nhập mã số thuế" />
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Người mua hàng</label>
          <CampaignSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Người nhận hóa đơn</label>
          <CampaignSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        <InputText label="Email người nhận hóa đơn" placeholder="Nhập email nhận hóa đơn" />
      </div>

      <div className={styles.row_input}>
        <InputText label="Điện thoại người nhận hóa đơn" placeholder="Nhập số điện thoại" />
      </div>

      
    </div>
  );
}
