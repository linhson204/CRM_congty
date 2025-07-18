import styles from "./Footer.module.scss";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div>
        <div className={styles.footer_main}>
          <div className={styles.footer_content}>
            <div className={styles.ft_bottom}>
              <div className={styles.left}>
                <div className={styles.left_top}>
                  <span>Đơn vị chủ quản:</span>
                  <p style={{ color: '#fff', fontSize: '20px', }}>Công ty Cổ phần Thanh toán Hưng Hà</p>
                  <span>
                    Địa chỉ: Thôn Thanh Miếu, Xã Việt Hưng,
                    Huyện Văn Lâm, Tỉnh Hưng Yên{" "}
                  </span>

                  <span>Hotline: 0982.079.209</span>
                  <span>
                    Email hỗ trợ: hungha365@gmail.com
                  </span>
                </div>
                <div className={styles.left_bottom}>
                  <div className={styles.left_bottom_left}>
                    <div
                      className={
                        styles.left_bottom_left_item
                      }
                    >
                      <img
                        src="/arrow_right_fill.png"
                        alt="icon"
                      />
                      <Link href="https://hungha365.com/tin-tuc/gioi-thieu-chung-ve-hungha365-24">
                        <span>Giới thiệu chung</span>
                      </Link>
                    </div>
                    <div
                      className={
                        styles.left_bottom_left_item
                      }
                    >
                      <img
                        src="/arrow_right_fill.png"
                        alt="icon"
                      />
                      <Link href="https://hungha365.com/tin-tuc/thong-tin-can-viet-ve-hungha365-18">
                        <span>Thông tin cần biết</span>
                      </Link>
                    </div>

                    <div
                      className={
                        styles.left_bottom_left_item
                      }
                    >
                      <img
                        src="/arrow_right_fill.png"
                        alt="icon"
                      />
                      <Link href="https://hungha365.com/tin-tuc/thoa-thuan-su-dung-website-hungha365-19">
                        <span>Thỏa thuận sử dụng</span>
                      </Link>
                    </div>
                    <div
                      className={
                        styles.left_bottom_left_item
                      }
                    >
                      <img
                        src="/arrow_right_fill.png"
                        alt="icon"
                      />
                      <Link href="https://hungha365.com/so-do-website">
                        <span>Sơ đồ website</span>
                      </Link>
                    </div>
                  </div>
                  <div className={styles.left_bottom_right}>
                    <div
                      className={
                        styles.left_bottom_right_item
                      }
                    >
                      <img
                        src="/arrow_right_fill.png"
                        alt="icon"
                      />
                      <Link href="https://hungha365.com/tin-tuc/tam-nhin-va-su-menh-cua-hungha365-22">
                        <span>Tầm nhìn và sứ mệnh</span>
                      </Link>
                    </div>
                    <div
                      className={
                        styles.left_bottom_right_item
                      }
                    >
                      <img
                        src="/arrow_right_fill.png"
                        alt="icon"
                      />
                      <Link href="https://hungha365.com/tin-tuc/quy-dinh-bao-mat-khi-su-dung-hungha365-20">
                        <span>Quy định bảo mật</span>
                      </Link>
                    </div>
                    <div
                      className={
                        styles.left_bottom_right_item
                      }
                    >
                      <img
                        src="/arrow_right_fill.png"
                        alt="icon"
                      />
                      <Link href="https://hungha365.com/quy-trinh-giai-quyet-tranh-chap">
                        <span>
                          Quy trình giải quyết tranh chấp
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.right}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <img src="/arrow_right_fill.png" alt="icon" style={{ width: '10px', height: '10px', marginTop: '5px' }} />
                  <p
                    style={{
                      marginBottom: "4px",
                      color: "#fff",
                    }}
                  >
                    Tải App Chat 365 PC
                  </p>
                  {/* <div>
                    <Link href="https://app.timviec365.vn/Download/QuanLyChung365/Install/QuanLyChung365.exe">
                      <div
                        style={{
                          color: "#fff",
                          marginBottom: "4px",

                        }}
                      >
                        Tải app QLC365 winform {" "}
                      </div>
                      <span
                        style={{
                          color: "#fff",
                          textDecoration: 'underline'
                        }}
                      >
                        Tại đây
                      </span>
                    </Link>
                  </div> */}
                </div>
                <Link href="https://app.timviec365.vn/Download/Chat365/InstallAndUpdate/Chat365.msi">
                  <p
                    style={{
                      color: "#fff",
                      textDecoration: 'underline',
                      textAlign: 'center',
                      marginBottom: '20px'
                    }}
                  >
                    Tại đây
                  </p>
                </Link>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <img src="/arrow_right_fill.png" alt="icon" style={{ width: '10px', height: '10px', marginTop: '5px' }} />
                  <span>Tải App Chat 365 mobile</span>
                </div>
                <p style={{ textAlign: 'center', color: 'white', marginBottom: '10px' }}>Tại đây</p>
                <img src="/qr_footer.png" alt="icon" />
              </div>
            </div>
            <div className={styles.app_mb}>
              <span>Tải App Chat 365 tại đây</span>
              <div className={styles.icon_app}>
                <img src="/app_store.png" alt="icon" />
                <img src="/gg_play.png" alt="icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
