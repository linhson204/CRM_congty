// import OrderSelectBoxStep from "../order_steps/select_box_step";
import styles from "./order_detail.module.css";
// import InputText from "./input_text";
import { Input, Tooltip } from "antd";

export default function AddOrderDetailInfo() {
  return (
    <div>
      <p style={{ marginLeft: "15px" }} className={styles.main__body__type}>
        Thông tin chi tiết
      </p>
      <div className={styles.main__content__body}>
        <div className={styles.row}>
          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Số đơn hàng:</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>ĐH-0000</div>
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
                <b>Khách hàng:</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>
                Nguyễn Trần Kim Phượng
              </div>
            </div>
          </div>

          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Liên hệ:</b>
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
                <b>Báo giá:</b>
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
                <b>Cơ hội:</b>
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
                <b>Chiến dịch:</b>
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
                <b>Diễn giải:</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>
                Đơn hàng bán cho Nguyễn Trần Kim Phượng
              </div>
            </div>
          </div>

          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Loại đơn hàng:</b>
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
                <b>Số ngày được nợ:</b>
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
                <b>Hẹn giao hàng:</b>
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
                <b>Hạn thanh toán:</b>
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
                <b>Nhân viên phụ trách:</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div>
                    <img src="/crm/user_kh.png" alt="hungha365.com" />
                  </div>
                  &nbsp;Nguyễn Văn Nam
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
