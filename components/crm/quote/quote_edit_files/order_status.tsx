import OrderSelectBoxStep from "../quote_steps/select_box_step";
import styles from "./edit_file_order.module.css";
import InputText from "./input_text";
import { Input, Tooltip } from 'antd';

export default function AddOrderStatusInfo() {
  return (
    <div>
      <p className={styles.main__body__type}>Tình trạng thực hiện đơn hàng</p>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Tình trạng*</label>
          <OrderSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Tình trạng giao hàng</label>
          <OrderSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
            <label className={`${styles["form-label"]}`}>Thực thu</label>
            <Input placeholder="Nhập"  suffix="VNĐ"/>
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
            <label className={`${styles["form-label"]}`}>Chi phí thực hiện đơn hàng</label>
            <Input placeholder="Nhập"  suffix="VNĐ"/>
        </div>
      </div>

      <div className={styles.row_input}>
        <label className={`${styles["form-label"]} ${styles.info_system}`}>Đã xuất hóa đơn 
            <input
                    type="checkbox"
                    defaultValue={1}
                    name="share_all"
                    id="share_all"
                />
        </label>     
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Tình trạng thanh toán</label>
          <OrderSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
      </div>
    </div>
  );
}
