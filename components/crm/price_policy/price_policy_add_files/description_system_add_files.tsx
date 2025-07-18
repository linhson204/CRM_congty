import PricePolicySelectBoxStep from "../price_policy_steps/select_box_step";
import styles from "./add_file_price_policy.module.css";
import InputText from "./input_text";
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
    </>
  );
}
