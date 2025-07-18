import styles from "../../potential/potential_add_files/add_file_potential.module.css";
export default function ProductReturnDescription() {
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin mô tả</p>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} `}>
          <label className={`${styles["form-label"]}`}>Mô tả</label>
          <textarea
            name="address_contact"
            id="address_contact"
            className={styles["form-control"]}
            placeholder="Nhập địa chỉ"
            defaultValue={""}
            style={{ height: "82px" }}
          />
        </div>
      </div>
    </div>
  );
}
