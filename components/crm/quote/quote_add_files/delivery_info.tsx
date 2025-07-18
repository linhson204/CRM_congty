import OrderSelectBoxStep from "../quote_steps/select_box_step";
import styles from "./add_file_order.module.css";
import InputText from "./input_text";
import { Input, Tooltip } from "antd";

export default function AddInvoiceInfo() {
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin giao hàng</p>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Người nhận hàng</label>
          <OrderSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        <InputText label="Điện thoại" placeholder="Nhập" />
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Quốc gia</label>
          <OrderSelectBoxStep value="Chọn" placeholder="Chọn quôc gia" />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Tỉnh thành</label>
          <OrderSelectBoxStep value="Chọn" placeholder="Chọn tỉnh thành" />
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Quận huyện</label>
          <OrderSelectBoxStep value="Chọn" placeholder="Chọn quận huyện" />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Phường/Xã</label>
          <OrderSelectBoxStep value="Chọn" placeholder="Chọn Phường/Xã " />
        </div>
      </div>

      <div className={styles.row_input}>
        <InputText
          label="Số nhà, đường phố"
          placeholder="Nhập Số nhà, đường phố"
        />
        <InputText label="Mã vùng" placeholder="Nhập mã vùng" />
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} `}>
          <label className={`${styles["form-label"]}`}>Địa chỉ hóa đơn</label>
          <textarea
            name="address_contact"
            id="address_contact"
            className={styles["form-control"]}
            placeholder="Nhập địa chỉ"
            defaultValue={""}
          />
        </div>
      </div>
    </div>
  );
}
