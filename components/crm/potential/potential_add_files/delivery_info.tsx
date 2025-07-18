import PotentialSelectBoxStep from "../potential_steps/select_box_step";
import styles from "./add_file_potential.module.css";
import InputText from "./input_text";
export default function AddDeliveryInfo({ title = "Thông tin giao hàng" }: any) {
  return (
    <div>
      <div className={`${styles.d_flex } ${styles.justify_space_between}`}>
        <p className={styles.main__body__type}>{title}</p>
        <button type="button" className={`${styles.d_flex } ${styles.button_copy}`}><i className="bi bi-front"></i>Sao chép</button>
      </div>
      

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Quốc gia</label>
          <PotentialSelectBoxStep
            value="Chọn ngân hàng"
            placeholder="Chọn quốc gia"
          />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Tỉnh thành</label>
          <PotentialSelectBoxStep
            value="Chọn tỉnh thành"
            placeholder="Chọn tỉnh thành"
          />
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Quận huyện</label>
          <PotentialSelectBoxStep
            value="Chọn quận huyện"
            placeholder="Chọn quận huyện"
          />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Phường xã</label>
          <PotentialSelectBoxStep
            value="Chọn phường xã"
            placeholder="Chọn phường xã"
          />
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Số nhà, đường phố</label>
          <PotentialSelectBoxStep
            value="Chọn Số nhà, đường phố"
            placeholder="Chọn Số nhà, đường phố"
          />
        </div>
        <InputText label="Mã vùng" placeholder="Nhập mã vùng" />
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Địa chỉ giao hàng</label>
          <textarea
            name="address_contact"
            id="address_contact"
            className={styles["form-control"]}
            placeholder="Nhập địa chỉ"
            defaultValue={""}
          />
        </div>
      </div>
    </div>
  );
}
