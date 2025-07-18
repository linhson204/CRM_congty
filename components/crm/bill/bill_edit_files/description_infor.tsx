import styles from "./edit_file_bill.module.css";
export default function EditDesriptionAndSystemInfo() {
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

      
    </>
  );
}
