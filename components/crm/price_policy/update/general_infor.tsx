import PricePolicySelectBoxStep from "../price_policy_steps/select_box_step";
import styles from "./update_file_price_policy.module.css";
import InputText from "./input_text";
export default function AddGeneralInfo() {
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin chung</p>

      <div className={styles.row_input}>
        <InputText
          label="Tên chính sách giá"
          placeholder="Nhập tên chính sách giá"
        />
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Đối tượng</label>
          <PricePolicySelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
      </div>

      <div className={styles.row_input}>
      <InputText label="Từ ngày" type="date"/>
      <InputText label="Đến ngày" type="date"/>
      </div>
    </div>
    
  );
}
