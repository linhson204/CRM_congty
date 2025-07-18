import styles from "../product_return.module.css";
export default function ProductReturnInfoTableData() {
  return (
    <>
      <div className={styles.total}>
        Tổng số: <b>100</b> Hàng hóa
      </div>
      <div className={styles.row}>
        <div className={`${styles.mb3} ${styles["col-lg-3"]}`}>
          <label className={styles["form-label"]}>Chiết khấu đơn hàng</label>
          <input
            type="text"
            className={`${styles["form-control"]} ${styles.padding_percent}`}
            name=""
            placeholder="0"
          />
          <span className={styles.don_vi}>%</span>
        </div>
        <div className={`${styles.mb3} ${styles["col-lg-3"]}`}>
          <input
            type="text"
            className={`${styles["form-control"]} ${styles.padding_vnd}`}
            name=""
            placeholder="0"
          />
          <span className={`${styles.don_vi} ${styles.don__vi}`}>VNĐ</span>
        </div>
        <div className={`${styles.mb3} ${styles["col-lg-6"]}`}>
          <label className={styles["form-label"]}>Giá trị đơn hàng</label>
          <input
            style={{ background: "#e9ecef", color: "white" }}
            type="text"
            className={`${styles["form-control"]} ${styles.padding_vnd}`}
            name=""
            placeholder="0"
            readOnly
          />
          <span className={styles.don_vi}>VNĐ</span>
        </div>
      </div>
    </>
  );
}
