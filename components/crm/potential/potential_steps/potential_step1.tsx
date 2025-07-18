import { useRef, useState } from "react";
import styles from "../potential.module.css";

export default function PotentialStep1({ setCheckFile }: any) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [fileUpload, setFileUpload] = useState<any[]>([]);

  const handleClickSelectFileUpdload = () => {
    inputFileRef.current?.click();
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file && file.size <= 20 * 1024 * 1024) {
      //   const files = event.target.files;
      setCheckFile(true);
      setFileUpload((prevFiles: any) => [...prevFiles, file.name]);
    } else {
      alert("Error !");
    }
  };

  return (
    <>
      <div className={styles.info_step}>
        <div className={styles.main__title}>Chọn tệp nguồn</div>
        <div className={styles.main__body}>
          {fileUpload && fileUpload?.length > 0 ? (
            <div className={styles.content_step1_success}>
              <div className={`${styles["drop-zone"]} ${styles.flex_column}`}>
                <img src="/crm/potential/crm/success.svg" />
                <div
                  className={`${styles.step1_success} ${styles.flex_column}`}
                >
                  <p
                    className={`${styles.text} ${styles.text_click}`}
                    style={{ fontWeight: "bold" }}
                  >
                    Tải tệp tin thành công
                  </p>
                  {fileUpload?.map((file, index) => (
                    <p className={`${styles.text} ${styles.gray}`} key={index}>
                      {file}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div
                className={`${styles.main__body_item} ${styles.content_step1}`}
              >
                <div
                  id="drop-zone"
                  className={`${styles["drop-zone"]} ${styles.flex_column}`}
                >
                  <b className={`${styles.text} ${styles.text_click}`}>
                    Kéo và thả tệp vào đây
                  </b>
                  <p className={styles.text}>hoặc</p>
                  <button
                    className={styles.btn_upfile}
                    onClick={handleClickSelectFileUpdload}
                  >
                    Chọn tệp
                  </button>
                  <input
                    type="file"
                    name="upfile"
                    multiple
                    hidden
                    ref={inputFileRef}
                    onChange={handleFileChange}
                    className={`${styles.upfile_click} custom-file-input`}
                  />
                  <p className={styles.text}>Dung lượng tối đa 20M</p>
                </div>
              </div>
              <div
                className={`${styles.main__body_item} ${styles.content_step1}`}
              >
                <div className={`${styles.div_item} ${styles.flex_column}`}>
                  <p
                    className={`${styles.text} ${styles.p_link} ${styles.flex_align_center}`}
                  >
                    <img
                      className={styles.img_link}
                      src="	/crm/download_file.svg"
                    />
                    Tải tệp mẫu
                  </p>
                  <p className={styles.text}>
                    Cho phép nhập tối đa 5.000 dòng dữ liệu, giới hạn dung lượng
                    file 20Mb
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
