import CampaignSelectBoxStep from "../bill_steps/select_box_step";
import styles from "./add_file_bill.module.css";
import InputText from "./input_text";
import { Input, Tooltip } from "antd";

export default function AddAddressInfo() {
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin địa chỉ</p>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Quốc gia</label>
          <CampaignSelectBoxStep
            value="Chọn quốc gia"
            placeholder="Chọn quốc gia"
          />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Tỉnh thành</label>
          <CampaignSelectBoxStep
            value="Chọn tỉnh thành"
            placeholder="Chọn tỉnh thành"
          />
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Quận huyện</label>
          <CampaignSelectBoxStep
            value="Chọn quận huyện"
            placeholder="Chọn quận huyện"
          />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Phường/Xã</label>
          <CampaignSelectBoxStep
            value="Chọn Phường/Xã"
            placeholder="Chọn Phường/Xã"
          />
        </div>
      </div>

      <div className={styles.row_input}>
        <InputText
          label="Số nhà, đường phố"
          placeholder="Nhập số nhà đường phố"
        />
        <InputText label="Mã vùng" placeholder="Nhập mã vùng" />
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
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
