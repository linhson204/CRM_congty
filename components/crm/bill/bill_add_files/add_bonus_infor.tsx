import CampaignSelectBoxStep from "../bill_steps/select_box_step";
import styles from "./add_file_bill.module.css";
import InputText from "./input_text";
import { Input, Tooltip } from 'antd';

export default function AddBonusInfo() {
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin bổ sung</p>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Loại hóa đơn</label>
          <CampaignSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Hình thức thanh toán</label>
          <CampaignSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Tình trạng</label>
          <CampaignSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        <InputText label="Ngày đề nghị" placeholder="Nhập mã số thuế" type="date"/>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Số đơn hàng</label>
          <CampaignSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Chiến dịch</label>
          <CampaignSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Người duyệt</label>
          <CampaignSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
            <p><input type="checkbox" defaultValue={1} name="share_all" id="share_all"/>&nbsp;Chuyển hóa đơn giấy</p>
            
            
        </div>
        
      </div>

      

      

      
    </div>
  );
}
