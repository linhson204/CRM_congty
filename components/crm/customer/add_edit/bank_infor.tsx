import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import styles from "../../potential/potential_add_files/add_file_potential.module.css";
import InputText from "@/components/crm/potential/potential_add_files/input_text";
export default function AddCustomerBankInfo(editData) {
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin bổ sung</p>

      <div className={styles.row_input}>
        <InputText
          label="Tài khoản ngân hàng"
          placeholder="Nhập tài khoản ngân hàng"
        />
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Mở tại ngân hàng</label>
          <PotentialSelectBoxStep
            value="Chọn ngân hàng"
            placeholder="Chọn ngân hàng"
          />
        </div>
      </div>

      <div className={styles.row_input}>
        <InputText label="Ngày thành lập" placeholder="" type="date" />
        <InputText label="Là khách hàng từ" placeholder="" type="date" />
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Doanh thu</label>
          <PotentialSelectBoxStep
            value="Chọn doanh thu"
            placeholder="Chọn doanh thu"
          />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Quy mô nhân sự</label>
          <PotentialSelectBoxStep
            value="Chọn quy mô nhân sự"
            placeholder="Chọn quy mô nhân sự"
          />
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>
            Xếp hạng khách hàng
          </label>
          <PotentialSelectBoxStep
            value="Chọn xếp hạng khách hàng"
            placeholder="Chọn xếp hạng khách hàng"
          />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <InputText label="Website" placeholder="Nhập Website" />
        </div>
      </div>

      <div className={styles.row_input}>
        <InputText label="Hạn mức nợ" placeholder="Nhập Hạn mức nợ" />
        <InputText label="Số ngày được nợ" placeholder="Nhập Số ngày được nợ" />
      </div>
    </div>
  );
}
