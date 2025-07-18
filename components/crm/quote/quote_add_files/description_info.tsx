import styles from "./add_file_order.module.css";
export default function AddDesriptionAndSystemInfo() {
  return (
    <>
      <div>
        <p className={styles.main__body__type}>Thông tin mô tả</p>

        <div className={styles.row_input}>
          <div className={`${styles.mb_3} `}>
            <label className={`${styles["form-label"]}`}>Mô tả</label>
            <textarea
              name="address_contact"
              id="address_contact"
              className={styles["form-control"]}
              placeholder="Nhập mô tả"
              defaultValue={""}
              style={{ height: "82px" }}
            />
          </div>
        </div>
      </div>

      <div>
        <p className={styles.main__body__type}>Thông tin hệ thống</p>

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
    </>
  );
}
