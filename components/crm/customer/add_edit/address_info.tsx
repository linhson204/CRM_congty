import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import styles from "@/components/crm/potential/potential_add_files/add_file_potential.module.css";
import InputText from "@/components/crm/potential/detail/text_info";
export default function AddAddressInfoCustomer({
  formData,
  setFormData,
  title = "Thông tin địa chỉ",
}: any) {
  return (
    <div>
      <p className={styles.main__body__type}>{title}</p>

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
          <label className={`${styles["form-label"]}`}>Địa chỉ</label>
          <textarea
            name="address_contact"
            id="address_contact"
            className={styles["form-control"]}
            placeholder="Nhập địa chỉ"
            defaultValue={""}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            value={formData?.address}
          />
        </div>
      </div>
    </div>
  );
}
