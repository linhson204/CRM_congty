import InputText from "@/components/crm/potential/potential_add_files/input_text";
import styles from "../../potential/potential_add_files/add_file_potential.module.css";
import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
export default function AddGeneralInfoChance() {
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin chung</p>

      <div className={styles.row_input}>
        <InputText label="Khách hàng" placeholder="" bonus="disabled" />
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Liên hệ</label>
          <PotentialSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
      </div>

      <div className={styles.row_input}>
        <InputText
          require={true}
          label="Tên cơ hộ"
          placeholder="Nhập tên cơ hội"
        />
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Loại cơ hội</label>
          <PotentialSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Nhóm hàng hóa</label>
          <PotentialSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        <InputText label="Số tiền" placeholder="Chọn" />
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Giai đoạn</label>
          <PotentialSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        <InputText
          label="Tỷ lệ thành công"
          placeholder="Nhập tỉ lệ thành công"
          bonus="disabled"
        />
      </div>

      <div className={styles.row_input}>
        <InputText
          label="Doanh số kỳ vọng"
          placeholder="Nhập doanh số kỳ vọng"
        />
        <InputText
          type="date"
          require={true}
          label="Ngày kỳ vọng/kết thúc"
          placeholder="Ngày kỳ vọng/kết thúc"
        />
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Chiến dịchg</label>
          <PotentialSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Nguồn gốc</label>
          <PotentialSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>
            Nhân viên phụ trách
          </label>
          <PotentialSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
      </div>
    </div>
  );
}
