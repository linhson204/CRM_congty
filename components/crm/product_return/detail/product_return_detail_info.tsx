import styles from "./product_return_details.module.css";

export default function ProductHeaderInfo() {
  return (
    <div className={styles.main_importfile}>
      <div className={styles.formInfoStep}>
        <div className={styles.info_step}>
          <div className={styles.main__title}>
            Chi tiết đè nghị trả lại hàng bán
          </div>
          <div className={styles.main__body}>
            <div className={styles.main__content__body}>
              <div className={styles.row}>
                <div className={`${styles["col-lg-6"]}`}>
                  <div
                    className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
                  >
                    <div className={`${styles.main__body__item__title}`}>
                      <b>Số đơn hàng:</b>
                    </div>
                    <div className={`${styles.main__body__item__value}`}>
                      ĐH-0000
                    </div>
                  </div>
                </div>
                <div className={`${styles["col-lg-6"]}`}>
                  <div
                    className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
                  >
                    <div className={`${styles.main__body__item__title}`}>
                      <b>Ngày đặt hàng:</b>
                    </div>
                    <div className={`${styles.main__body__item__value}`}>
                      10/10/2020
                    </div>
                  </div>
                </div>

                <div className={`${styles["col-lg-6"]}`}>
                  <div
                    className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
                  >
                    <div className={`${styles.main__body__item__title}`}>
                      <b>Giá trị đơn hàng:</b>
                    </div>
                    <div className={`${styles.main__body__item__value}`}>
                      10.000.000 VNĐ
                    </div>
                  </div>
                </div>
                <div className={`${styles["col-lg-6"]}`}>
                  <div
                    className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
                  >
                    <div className={`${styles.main__body__item__title}`}>
                      <b>Tình trạng:</b>
                    </div>
                    <div
                      className={`${styles.main__body__item__value} ${styles.stt_yellow}`}
                    >
                      Chờ duyệt
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
