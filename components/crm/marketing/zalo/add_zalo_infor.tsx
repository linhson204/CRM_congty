import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import styles from "../../potential/potential_add_files/add_file_potential.module.css";
import { Input } from 'antd';
import Link from "next/link";
export default function AddPersonalCustomerInfor() {
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin zalo</p>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Số điện thoại gửi</label>
          <Input placeholder="Basic usage" />;
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Mẫu sms</label>
          <PotentialSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
      </div>
    </div>
  );
}
