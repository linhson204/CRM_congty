import { ChangeEvent, useContext } from "react";
import styles from "./add_file_order_copy.module.css";
import { QuoteContext } from "../../quote/quoteContext";
export default function AddDesriptionAndSystemInfo() {
  const { newQuote, inputQuote } = useContext(QuoteContext)

  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    inputQuote(name, value);
  }

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    inputQuote(name, checked);
  }

  return (
    <>
      <div>
        <p className={styles.main__body__type}>Thông tin mô tả</p>

        <div className={styles.row_input}>
          <div className={`${styles.mb_3} `}>
            <label className={`${styles["form-label"]}`}>Mô tả</label>
            <textarea
              name="description"
              id="address_contact"
              className={styles["form-control"]}
              placeholder="Nhập mô tả"
              value={newQuote.description}
              style={{ height: "82px", resize: 'none' }}
              onChange={handleInput}
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
                checked={newQuote.use_system_info}
                name="use_system_info"
                id="share_all"
                onChange={handleCheckbox}
              />
              Dùng chung
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
