import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import styles from "../../potential/potential_add_files/add_file_potential.module.css";
import InputText from "@/components/crm/potential/potential_add_files/input_text";
import Link from "next/link";
export default function AddPersonalCustomerInfor() {
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin email</p>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Nhà cung cấp</label>
          <PotentialSelectBoxStep
            value="Nhà cung cấp"
            placeholder="Nhà cung cấp"
          />
        </div>
        <InputText label="Tên hiển thị" placeholder="Email cá nhân" />
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label
            className={`${styles["form-label"]}`}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            Đến danh sách người nhận
            <p className="all_customer">
              <input type="checkbox" className="all_list_receiver" /> Gửi cho
              tất cả liên hệ khách hàng
            </p>
          </label>
          <PotentialSelectBoxStep
            value="Chọn danh sách người nhận"
            placeholder="Chọn danh sách người nhận"
          />
        </div>
        <InputText label="Phản hồi tới" placeholder="Nhập email phản hồi" />
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Chiến dịch</label>
          <PotentialSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Mẫu email</label>
          <PotentialSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
      </div>

      <p className={styles.main__body__type}>Nội dung email</p>

      <div className={styles.row_input}>
        <div className={styles.mb_3}>
          <label className={`${styles["form-label"]}`}>Tiêu đề email</label>
          <textarea
            name="email_title"
            id="email_title"
            className={styles["form-control"]}
            placeholder="Nhập tiêu đề email"
          />
        </div>
      </div>
    </div>
  );
}
