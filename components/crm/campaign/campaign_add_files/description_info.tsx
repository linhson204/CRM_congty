import styles from "./add_file_campaign.module.css";
export default function AddDesriptionAndSystemInfo({
  formFields,
  handleChange,
}) {
  return (
    <>
      <div>
        <p className={styles.main__body__type}>Thông tin mô tả</p>

        <div >
          <div className={`${styles.mb_3} `}>
            <label className={`${styles["form-label"]}`}>Mô tả</label>
            <textarea
              name="description"
              id="address_contact"
              className={styles["form-control"]}
              placeholder="Nhập mô tả"
              defaultValue={""}
              value={formFields?.description}
              onChange={handleChange}
              style={{ height: "100px", width: "100%" }}
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
                name="shareAll"
                id="share_all"
                checked={
                  formFields?.shareAll && Number(formFields?.shareAll) === 1
                    ? true
                    : false
                }
                onChange={handleChange}
                value={
                  formFields?.shareAll && Number(formFields?.shareAll) === 1
                    ? 0
                    : 1
                }
              />
              Dùng chung
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
