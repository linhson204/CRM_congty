import Image from "next/image";
import styles from "./bill_detail.module.css";

export default function AddBillDeliverylInfo() {
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin giao hàng</p>
      <div className={styles.main__content__body}>
        <div className={styles.row}>
          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Quốc gia:</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>
                Việt Nam
              </div>
            </div>
          </div>

          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Tỉnh/Thành phố:</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>Hà Nội</div>
            </div>
          </div>

          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Quận/Huyện:</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>
                Hoàng mai
              </div>
            </div>
          </div>

          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Phường/Xã:</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>
                Định công
              </div>
            </div>
          </div>

          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Số nhà, đường phố:</b>
              </div>
              <div
                className={`${styles.main__body__item__value} ${styles.not_update}`}
              >
                1 Trần Nguyên Đán
              </div>
            </div>
          </div>

          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Mã vùng:</b>
              </div>
              <div
                className={`${styles.main__body__item__value} ${styles.not_update}`}
              >
                Chưa cập nhật
              </div>
            </div>
          </div>

          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Địa chỉ hóa đơn:</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>
                1 Trần Nguyên Đán, Định Công,Hoàng Mai, Hà Nội.1 Trần Nguyên
                Đán, Định Công,Hoàng Mai, Hà Nội
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className={styles.main__body__type}>Thông tin mô tả</p>
      <div className={styles.main__content__body}>
        <div className={styles.row}>
          <div className={`${styles["col-lg-6"]}`}>
            <div className={`${styles.main__body__item_des} ${styles.d_flex} `}>
              <div className={`${styles.main__body__item__title}`}>
                <b>Mô tả:</b>
              </div>
              <div
                className={`${styles.main__body__item__value} ${styles.not_update}`}
              >
                Chưa cập nhật
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className={styles.main__body__type}>Thông tin hệ thống</p>
      <div className={styles.main__content__body}>
        <div className={styles.row}>
          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Người tạo:</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div>
                    <Image
                      width={26}
                      height={26}
                      src="/crm/user_kh.png"
                      alt="hungha365.com"
                    />
                  </div>
                  &nbsp;Nguyễn Văn Nam
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Ngày tạo:</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>
                10:10 - 10/10/2022
              </div>
            </div>
          </div>

          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Người sửa::</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div>
                    <Image
                      width={26}
                      height={26}
                      src="/crm/user_kh.png"
                      alt="hungha365.com"
                    />
                  </div>
                  &nbsp;Nguyễn Văn Nam
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Ngày sửa:</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>
                10:10 - 10/10/2022
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
