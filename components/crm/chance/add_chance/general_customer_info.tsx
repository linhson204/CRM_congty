import { useContext } from "react";
import styles from "../../potential/potential_add_files/add_file_potential.module.css";
import { useFormData } from "../../context/formDataContext";
export default function GeneralCustomerInfor() {
  const { formData, setFormData } = useContext(useFormData);
  return (
    <div>
      <div className={styles.main__body__type}>Thông tin hệ thống</div>
      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <p className={`${styles.info_system}`}>
            <input
              type="checkbox"
              value={formData?.share_all}
              checked={formData?.share_all}
              onChange={(e) =>
                setFormData({ ...formData, share_all: e.target.checked })
              }
              name="share_all"
              id="share_all"
            />
            Dùng chung
          </p>
        </div>
      </div>
    </div>
  );
}
