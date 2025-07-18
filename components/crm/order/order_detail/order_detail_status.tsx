// import OrderSelectBoxStep from "../order_steps/select_box_step";
import styles from "./order_detail.module.css";
// import InputText from "./input_text";
import { Input, Tooltip } from "antd";

export default function AddOrderDetailStatus() {
  return (
    <div>
      <p className={styles.main__body__type}>Tình trạng thực hiện đơn hàng</p>
      <div className={styles.main__content__body}>
        <div className={styles.row}>
          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
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

          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Người duyệt:</b>
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

          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Ngày duyệt:</b>
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
                <b>Chi phí thực hiện đơn hàng:</b>
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

      <p className={styles.main__body__type}>Tình trạng thực hiện hóa đơn</p>
      <div className={styles.main__content__body}>
        <div className={styles.row}>
          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Đã xuất hóa đơn:</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>
                <i className="bi bi-check2-circle"></i>
              </div>
            </div>
          </div>

          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Ngày hóa đơn</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>
                Chưa cập nhật
              </div>
            </div>
          </div>

          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Giá trị đã xuất hóa đơn:</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>
                Chưa cập nhật
              </div>
            </div>
          </div>

          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Giá trị chưa xuất hóa đơn:</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>
                Chưa cập nhật
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className={styles.main__body__type}>Tình trạng giao hàng</p>
      <div className={styles.main__content__body}>
        <div className={styles.row}>
          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Tình trạng giao hàng:</b>
              </div>
              <div
                className={`${styles.main__body__item__value} ${styles.stt_yellow}`}
              >
                Chưa giao hàng
              </div>
            </div>
          </div>

          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Người cập nhật:</b>
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

          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Ngày giao hàng:</b>
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
                <b>Giá trị chưa xuất hóa đơn:</b>
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

      <div className={`${styles.content_ls} ${styles.d_flex}`}>
        <div className={styles.row}>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <p className={styles.main__body__type}>Tình trạng thanh toán</p>
          &nbsp;&nbsp;
          <p className={styles.body__ls}>
            <i className="bi bi-clock"></i>&nbsp;Lịch sử thanh toán
          </p>
        </div>
      </div>

      <div className={styles.main__content__body}>
        <div className={styles.row}>
          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Tình trạng thanh toán:</b>
              </div>
              <div
                className={`${styles.main__body__item__value} ${styles.stt_yellow}`}
              >
                Chưa thanh toán
              </div>
            </div>
          </div>

          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Người cập nhật:</b>
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

          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Ngày thanh toán:</b>
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
                <b>Thực thu:</b>
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
                <b>Còn phải thu:</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>
                10.000.000 VNĐ
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className={styles.main__body__type}>Thông tin viết hóa đơn</p>
      <div className={styles.main__content__body}>
        <div className={styles.row}>
          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
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
                <b>Người mua hàng:</b>
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
                Hoàng Mai
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
                Định Công
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
              <div className={`${styles.main__body__item__value}`}>
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

          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Địa chỉ email nhận hóa đơn (email):</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>
                congytcophanthanhtoanhungha@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>

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
                Hoàng Mai
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
                Định Công
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
              <div className={`${styles.main__body__item__value}`}>
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
              <div className={`${styles.main__body__item__value}`}>
                Chưa cập nhật
              </div>
            </div>
          </div>

          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Địa chỉ đơn hàng:</b>
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
                    <img src="/crm/user_kh.png" alt="hungha365.com" />
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
                <b>Người sửa:</b>
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

          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Dùng chung:</b>
              </div>
              <div
                className={`${styles.main__body__item__value} ${styles.stt_yellow}`}
              >
                <i className="bi bi-check2-circle"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
