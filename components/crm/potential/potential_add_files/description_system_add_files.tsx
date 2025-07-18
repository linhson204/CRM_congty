import { MTextArea } from "@/components/commodity/input";
import styles from "./add_file_potential.module.css";
export default function AddDesriptionAndSystemInfo({
  formData,
  setFormData,
}: any) {
  return (
    <>
      <div>
        <p className={styles.main__body__type}>Thông tin mô tả</p>
        <MTextArea
          value={formData.description}
          setFormData={setFormData}
          name="description"
          rows={3}
        />
      </div>
      <div>
        <p className={styles.main__body__type}>Thông tin hệ thống</p>

        <div className={styles.row_input}>
          <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
            <p className={`${styles.info_system}`}>
              <input
                onChange={() =>
                  setFormData({ ...formData, share_all: !formData.share_all })
                }
                type="checkbox"
                checked={formData.share_all}
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
