import OrderSelectBoxStep from "../quote_steps/select_box_step";
import styles from "./edit_file_order.module.css";
import InputText from "./input_text";
import { Input, Tooltip } from 'antd';

export default function AddDetailInfo() {
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin chi tiết</p>

      <div className={styles.row_input}>
        <InputText label="Ngày đặt hàng*" placeholder="" type="date"/>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Khách hàng</label>
          <OrderSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Liên hệ</label>
          <OrderSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Báo giá</label>
          <OrderSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Cơ hội</label>
          <OrderSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Chiến dịch</label>
          <OrderSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
      </div>

      <div className={styles.row_input}>
        <InputText label="Diễn giải" placeholder="Đơn hàng bán cho + tên khách hàng"/>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Loại đơn hàng</label>
          <OrderSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        
      </div>

      <div className={styles.row_input}>
        <InputText label="Số ngày được nợ" placeholder="Nhập" />
        <InputText label="Hạn giao hàng" placeholder="" type="date"/>
      </div>

      <div className={styles.row_input}>
        <InputText label="Hạn thanh toán*" placeholder="Nhập" type="date"/>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Nhân viên phụ trách</label>
          <OrderSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
      </div>
    </div>
  );
}
