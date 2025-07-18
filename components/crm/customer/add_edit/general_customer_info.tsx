import styles from "../../potential/potential_add_files/add_file_potential.module.css";
export default function GeneralCustomerInfor() {
  return (
    <div>
      <div className={styles.main__body__type}>Thông tin hệ thống</div>
      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <p className={`${styles.info_system}`}>
            <input
              type="checkbox"
              defaultValue={1}
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
