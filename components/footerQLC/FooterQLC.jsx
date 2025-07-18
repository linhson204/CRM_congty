/** @format */

import React, { useEffect, useRef, useState } from "react";
import styles from "./FooterQLC.module.scss";

export default function Footer() {
  const elementRefs = useRef([]);
  const seeNvAllClickHandlerRef = useRef(null);
  const [getCheck, setCheck] = useState(false);

  const handleClick = (index) => {
    const hiddenElement = elementRefs.current[index].nextElementSibling;
    if (hiddenElement) {
      hiddenElement.style.display =
        hiddenElement.style.display === "none" ? "block" : "none";
    }
  };

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth < 1024) {
        seeNvAllClickHandlerRef.current = (event, index) => {
          event.stopPropagation();
          handleClick(index);
        };
        setCheck(true);
      }
    };

    // Thêm sự kiện resize khi component được mount
    window.addEventListener("resize", handleWindowResize);

    // Kiểm tra kích thước màn hình khi component được mount
    handleWindowResize();

    const detlNvCtyClickHandler = (event) => {
      event.stopPropagation();
    };

    document.addEventListener("click", detlNvCtyClickHandler);

    return () => {
      // Xóa sự kiện resize khi component bị unmount
      window.removeEventListener("resize", handleWindowResize);
      document.removeEventListener("click", detlNvCtyClickHandler);
    };
  }, []);
  return (
    <>
      <div>
        <div className={styles.footer_main}>
          <div className={styles.footer_content} style={{ marginTop: "50px" }}>
            <div className={styles.footer_block2}>
              <div className={styles.about_365}>
                <div
                  className={`${styles.wrap_arr} ${styles.open_content}`}
                  onClick={
                    getCheck
                      ? (event) => seeNvAllClickHandlerRef.current(event, 0)
                      : null
                  }
                  ref={(el) => (elementRefs.current[0] = el)}
                >
                  <p className={styles.footer_block2_header}>Về Timviec365</p>
                  <div className={`${styles.arr_respon} ${styles.hidden}`}>
                    <img
                      src="https://timviec365.vn/images/arr_up.svg"
                      className={styles.hidden}
                      alt="arrow_up"
                    />
                    <img
                      src="https://timviec365.vn/images/arr_down.svg"
                      alt="arrow_down"
                    />
                  </div>
                </div>
                <div
                  className={`${styles.list_about_365} ${styles.content_show}`}
                >
                  <div className={styles.timviec_item}>
                    <div className={styles.content_item}>
                      <a
                        rel="nofollow"
                        href="https://dev.timviec365.vn/gioi-thieu-chung.html"
                      >
                        Giới thiệu
                      </a>
                      <a
                        rel="nofollow"
                        href="https://dev.timviec365.vn/thong-tin-can-biet.html"
                      >
                        Thông tin
                      </a>
                      <a
                        rel="nofollow"
                        href="https://dev.timviec365.vn/blog/hoi-va-dap-ve-timviec365vn-chat365-va-cac-ung-dung-chuyen-doi-so-new16648.html"
                      >
                        Hỏi đáp
                      </a>
                      <a rel="nofollow" href="https://dev.timviec365.vn/blog">
                        Cẩm nang
                      </a>
                      <a
                        rel="nofollow"
                        href="https://dev.timviec365.vn/thoa-thuan-su-dung.html"
                      >
                        Thỏa thuận
                      </a>
                      <a
                        rel="nofollow"
                        href="https://dev.timviec365.vn/quy-dinh-bao-mat.html"
                      >
                        Bảo mật
                      </a>
                    </div>
                    <div className={styles.content_item}>
                      <a
                        rel="nofollow"
                        href="https://dev.timviec365.vn/giai-quyet-tranh-chap.html"
                      >
                        Giải quyết tranh chấp
                      </a>
                      <a
                        rel="nofollow"
                        href="https://dev.timviec365.vn/so-do-trang-web.html"
                      >
                        Sơ đồ Website
                      </a>
                      <a
                        rel="nofollow"
                        target="_blank"
                        href="https://www.youtube.com/watch?v=UssNzo6m1p8"
                      >
                        Video
                      </a>
                      <a
                        rel="nofollow"
                        href="https://dev.timviec365.vn/blog/ung-dung-cua-trinh-sat-ai365-new16655.html"
                      >
                        AI365
                      </a>
                      <a
                        rel="nofollow"
                        href="https://dev.timviec365.vn/blog/huy-hieu-tia-set-new16722.html"
                      >
                        Huy hiệu tia sét
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.footer_block2_right}>
                <div className={styles.for_uv}>
                  <div
                    className={`${styles.wrap_arr} ${styles.open_content}`}
                    onClick={
                      getCheck
                        ? (event) => seeNvAllClickHandlerRef.current(event, 1)
                        : null
                    }
                    ref={(el) => (elementRefs.current[1] = el)}
                  >
                    <p className={styles.footer_block2_header}>
                      Dành cho ứng viên
                    </p>
                    <div className={`${styles.arr_respon} ${styles.hidden}`}>
                      <img
                        src="https://timviec365.vn/images/arr_up.svg"
                        className={`${styles.arr_up} ${styles.hidden}`}
                        alt="arrow_up"
                      />
                      <img
                        src="https://timviec365.vn/images/arr_down.svg"
                        className={styles.arr_down}
                        alt="arrow_down"
                      />
                    </div>
                  </div>
                  <div
                    className={`${styles.list_for_uv} ${styles.content_show}`}
                  >
                    <div className={styles.timviec_item}>
                      <div className={styles.content_item}>
                        <a href="https://dev.timviec365.vn/cv-xin-viec">
                          Mẫu CV xin việc
                        </a>
                        <a href="https://dev.timviec365.vn/cv365/mau-cover-letter-thu-xin-viec">
                          Thư xin việc
                        </a>
                        <a href="https://dev.timviec365.vn/cv365/mau-don-xin-viec">
                          Hồ sơ xin việc
                        </a>
                      </div>
                      <div className={styles.content_item}>
                        <a href="https://dev.timviec365.vn/blog/c24/bi-quyet-viet-cv">
                          Bí quyết viết CV
                        </a>
                        <a
                          rel="nofollow"
                          href="https://dev.timviec365.vn/trang-vang-doanh-nghiep.html"
                        >
                          Trang vàng
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.for_ntd}>
                  <div
                    className={`${styles.wrap_arr} ${styles.open_content}`}
                    onClick={
                      getCheck
                        ? (event) => seeNvAllClickHandlerRef.current(event, 2)
                        : null
                    }
                    ref={(el) => (elementRefs.current[2] = el)}
                  >
                    <p className={styles.footer_block2_header}>
                      Dành cho nhà tuyển dụng
                    </p>
                    <div className={`${styles.arr_respon} ${styles.hidden}`}>
                      <img
                        src="https://timviec365.vn/images/arr_up.svg"
                        className="arr_up hidden"
                        alt="arrow_up"
                      />
                      <img
                        src="https://timviec365.vn/images/arr_down.svg"
                        className="arr_down"
                        alt="arrow_down"
                      />
                    </div>
                  </div>
                  <div
                    className={`${styles.list_for_ntd} ${styles.content_show}`}
                  >
                    <div className={styles.timviec_item}>
                      <div className={styles.content_item}>
                        <a href="https://dev.timviec365.vn/dang-tin-tuyen-dung-mien-phi.html">
                          Đăng tuyển dụng
                        </a>
                        <a href="https://dev.timviec365.vn/blog">
                          Cẩm nang tuyển dụng
                        </a>
                        <a href="https://dev.timviec365.vn/nguoi-tim-viec.html">
                          Tìm hồ sơ
                        </a>
                      </div>
                      <div className={styles.content_item}>
                        <a
                          rel="nofollow"
                          href="https://quanlychung.timviec365.vn/"
                        >
                          Ứng dụng chuyển đổi số
                        </a>
                        <a href="https://dev.timviec365.vn/bieu-mau">
                          Biểu mẫu
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.tien_ich}>
                  <div
                    className={`${styles.wrap_arr} ${styles.open_content}`}
                    onClick={
                      getCheck
                        ? (event) => seeNvAllClickHandlerRef.current(event, 3)
                        : null
                    }
                    ref={(el) => (elementRefs.current[3] = el)}
                  >
                    <p className={styles.footer_block2_header}>Tiện ích</p>
                    <div className={`${styles.arr_respon} ${styles.hidden}`}>
                      <img
                        src="https://timviec365.vn/images/arr_up.svg"
                        className="arr_up hidden"
                        alt="arrow_up"
                      />
                      <img
                        src="https://timviec365.vn/images/arr_down.svg"
                        className="arr_down"
                        alt="arrow_down"
                      />
                    </div>
                  </div>
                  <div
                    className={`${styles.list_tien_ich} ${styles.content_show}`}
                  >
                    <div className={styles.timviec_item}>
                      <div className={styles.content_item}>
                        <a
                          rel="nofollow"
                          href="https://dev.timviec365.vn/ssl/so-sanh-luong.html"
                        >
                          Tra cứu lương
                        </a>
                        <a href="https://dev.timviec365.vn/tinh-luong-gross-net.html">
                          Lương Gross - Net
                        </a>
                        <a
                          rel="nofollow"
                          href="https://dev.timviec365.vn/mail365/"
                        >
                          Email365
                        </a>
                      </div>
                      <div className={styles.content_item}>
                        <a href="https://dev.timviec365.vn/gioi-thieu-app-tim-viec.html">
                          Tải app
                        </a>
                        <a
                          href="https://dev.timviec365.vn/tinh-bao-hiem-that-nghiep"
                          rel="nofollow"
                        >
                          Tính bảo hiểm thất nghiệp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.work_area}>
                  <div
                    className={`${styles.wrap_arr} ${styles.open_content}`}
                    onClick={
                      getCheck
                        ? (event) => seeNvAllClickHandlerRef.current(event, 4)
                        : null
                    }
                    ref={(el) => (elementRefs.current[4] = el)}
                  >
                    <p className={styles.footer_block2_header}>
                      Việc làm theo khu vực
                    </p>
                    <div className={`${styles.arr_respon} ${styles.hidden}`}>
                      <img
                        src="https://timviec365.vn/images/arr_up.svg"
                        className="arr_up hidden"
                        alt="arrow_up"
                      />
                      <img
                        src="https://timviec365.vn/images/arr_down.svg"
                        className=" arr_down"
                        alt="arrow_down"
                      />
                    </div>
                  </div>
                  <div
                    className={`${styles.list_work_area} ${styles.content_show}`}
                  >
                    <div className={styles.timviec_item}>
                      <div className={styles.content_item}>
                        <a href="https://dev.timviec365.vn/tim-viec-lam-tai-ha-noi.html">
                          Việc làm tại Hà Nội
                        </a>
                        <a href="https://dev.timviec365.vn/viec-lam-tai-ho-chi-minh-c0v45">
                          Việc làm tại Hồ Chí Minh
                        </a>
                        <a href="https://dev.timviec365.vn/viec-lam-tai-da-nang-c0v26">
                          Việc làm tại Đà Nẵng
                        </a>
                        <a href="https://dev.timviec365.vn/viec-lam-tai-hai-phong-c0v2">
                          Việc làm tại Hải Phòng
                        </a>
                      </div>
                      <div className={styles.content_item}>
                        <a href="https://dev.timviec365.vn/viec-lam-tai-binh-duong-c0v46">
                          Việc làm tại Bình Dương
                        </a>
                        <a href="https://dev.timviec365.vn/viec-lam-tai-can-tho-c0v48">
                          Việc làm tại Cần Thơ
                        </a>
                        <a href="https://dev.timviec365.vn/viec-lam-tai-dong-nai-c0v55">
                          Việc làm tại Đồng Nai
                        </a>
                        <a href="https://dev.timviec365.vn/viec-lam-tai-bac-ninh-c0v5">
                          Việc làm tại Bắc Ninh
                        </a>
                      </div>
                    </div>
                    <a
                      rel="nofollow"
                      href="https://dev.timviec365.vn/viec-lam-tai-tinh-thanh"
                      className="seen_all"
                    >
                      Xem tất cả
                      <img
                        src="https://timviec365.vn/images/2arr_right.svg"
                        alt="see_all"
                      />
                    </a>
                  </div>
                </div>
                <div className={styles.work_job}>
                  <div
                    className={`${styles.wrap_arr} ${styles.open_content}`}
                    onClick={
                      getCheck
                        ? (event) => seeNvAllClickHandlerRef.current(event, 5)
                        : null
                    }
                    ref={(el) => (elementRefs.current[5] = el)}
                  >
                    <p className={styles.footer_block2_header}>
                      Việc làm theo ngành nghề
                    </p>
                    <div className={`${styles.arr_respon} ${styles.hidden}`}>
                      <img
                        src="https://timviec365.vn/images/arr_up.svg"
                        className={`${styles.arr_up} ${styles.hidden}`}
                        alt="arrow_up"
                      />
                      <img
                        src="https://timviec365.vn/images/arr_down.svg"
                        className={styles.arr_down}
                        alt="arrow_down"
                      />
                    </div>
                  </div>
                  <div
                    className={`${styles.list_work_job} ${styles.content_show}`}
                  >
                    <div className={styles.timviec_item}>
                      <div className={styles.content_item}>
                        <a href="https://dev.timviec365.vn/viec-lam-nhan-vien-kinh-doanh-c9v0">
                          Việc làm kinh doanh
                        </a>
                        <a href="https://dev.timviec365.vn/viec-lam-kd-bat-dong-san-c33v0">
                          Việc làm bất động sản
                        </a>
                        <a href="https://dev.timviec365.vn/viec-lam-bao-hiem-c66v0">
                          Việc làm bảo hiểm
                        </a>
                        <a href="https://dev.timviec365.vn/viec-lam-it-phan-mem-c13v0">
                          Việc làm IT
                        </a>
                      </div>
                      <div className={styles.content_item}>
                        <a href="https://dev.timviec365.vn/viec-lam-nhan-su-c27v0">
                          Việc làm nhân sự
                        </a>
                        <a href="https://dev.timviec365.vn/viec-lam-ban-hang-c10v0">
                          Việc làm bán hàng
                        </a>
                        <a href="https://dev.timviec365.vn/viec-lam-luong-cao.html">
                          Việc làm lương cao
                        </a>
                        <a href="https://dev.timviec365.vn/viec-lam-ke-toan-kiem-toan-c1v0">
                          Việc làm kế toán
                        </a>
                      </div>
                    </div>
                    <a
                      rel="nofollow"
                      href="https://dev.timviec365.vn/danh-sach-nganh-nghe"
                      className="seen_all"
                    >
                      Xem tất cả
                      <img
                        src="https://timviec365.vn/images/2arr_right.svg"
                        alt="see_all"
                      />
                    </a>
                  </div>
                </div>
                <div className={styles.work_tag}>
                  <div
                    className={`${styles.wrap_arr} ${styles.open_content}`}
                    onClick={
                      getCheck
                        ? (event) => seeNvAllClickHandlerRef.current(event, 6)
                        : null
                    }
                    ref={(el) => (elementRefs.current[6] = el)}
                  >
                    <p className={styles.footer_block2_header}>
                      Việc làm theo tag
                    </p>
                    <div className={`${styles.arr_respon} ${styles.hidden}`}>
                      <img
                        src="https://timviec365.vn/images/arr_up.svg"
                        className={`${styles.arr_up} ${styles.hidden}`}
                        alt="arrow_up"
                      />
                      <img
                        src="https://timviec365.vn/images/arr_down.svg"
                        className={styles.arr_down}
                        alt="arrow_down"
                      />
                    </div>
                  </div>
                  <div
                    className={`${styles.list_work_tag} ${styles.content_show}`}
                  >
                    <div className={styles.timviec_item}>
                      <div className={styles.content_item}>
                        <a href="https://dev.timviec365.vn/tim-viec-lam-php-t11394.html">
                          Việc làm PHP
                        </a>
                        <a href="https://dev.timviec365.vn/tag7/DS-viec-lam-tuyen-dung-ke-toan-noi-bo-866">
                          Việc làm Kế toán nội bộ
                        </a>
                        <a href="https://dev.timviec365.vn/tag7/DS-viec-lam-tuyen-dung-digital-marketing-521">
                          Việc làm Digital Marketing
                        </a>
                        <a href="https://dev.timviec365.vn/tag7/DS-viec-lam-tuyen-dung-chuyen-vien-seo-2070">
                          Việc làm chuyên viên seo
                        </a>
                      </div>
                      <div className={styles.content_item}>
                        <a href="https://dev.timviec365.vn/tag7/DS-viec-lam-tuyen-dung-tu-van-bat-dong-san-2737">
                          Việc làm bất động sản
                        </a>
                        <a href="https://dev.timviec365.vn/tag7/DS-viec-lam-tuyen-dung-thuc-tap-sinh-1265">
                          Việc làm thực tập sinh
                        </a>
                        <a href="https://dev.timviec365.vn/tag7/DS-viec-lam-tuyen-dung-nhan-vien-bao-hiem-900">
                          Việc làm nhân viên bảo hiểm
                        </a>
                        <a href="https://dev.timviec365.vn/tag7/DS-viec-lam-tuyen-dung-content-526">
                          Việc làm Content
                        </a>
                      </div>
                    </div>
                    <a
                      rel="nofollow"
                      href="https://dev.timviec365.vn/danh-sach-viec-lam-theo-tags"
                      className="seen_all"
                    >
                      Xem tất cả
                      <img
                        src="https://timviec365.vn/images/2arr_right.svg"
                        alt="see_all"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.gach_ngang}></div>
            <div className={styles.ft_bottom}>
              <div className={styles.left}>
                <div className={styles.left_top}>
                  <span>Đơn vị chủ quản:</span>
                  <h2>Công ty Cổ phần Thanh toán Hưng Hà</h2>
                  <a href="https://www.google.com/maps/place/T%C3%ACm+vi%E1%BB%87c+365:+T%E1%BA%A1o+cv+xin+vi%E1%BB%87c+-+T%C3%ACm+vi%E1%BB%87c+l%C3%A0m+nhanh+ch%C3%B3ng/@20.9894774,105.8313886,17z/data=!3m1!4b1!4m6!3m5!1s0x3135ac61ae54bc9f:0x79b00399a56a34e!8m2!3d20.9894774!4d105.8313886!16s%2Fg%2F11f2ckwvcq?entry=ttu">
                    <span className={styles.custom_span}>
                      VP1: Tầng 4, B50, Lô 6, KĐT Định Công, Hoàng Mai, Hà Nội
                    </span>
                  </a>
                  <a href="#">
                    <span className={styles.custom_span}>
                      VP2: Thôn Thanh Miếu, Xã Việt Hưng, Huyện Văn Lâm, Tỉnh
                      Hưng Yên
                    </span>
                  </a>
                  <a href="#">
                    <span className={styles.custom_span}>
                      VP3: Tầng 2, Số 1 Đường Trần Nguyên Đán, KĐT Định Công,
                      Hoàng Mai, Hà Nội
                    </span>
                  </a>
                  <span>Hotline: 0982.079.209</span>
                  <span>Email hỗ trợ: hungha365123@gmail.com</span>
                </div>
                <div className={styles.left_bottom}>
                  <div className={styles.left_bottom_left}>
                    <div className={styles.left_bottom_left_item}>
                      <a href="https://dev.timviec365.vn/gioi-thieu-chung.html">
                        <img src="./arrow_right_fill.png" alt="" />
                        <span className={styles.custom_span}>
                          Giới thiệu chung
                        </span>
                      </a>
                    </div>
                    <div className={styles.left_bottom_left_item}>
                      <a href="https://dev.timviec365.vn/thong-tin-can-biet.html">
                        <img src="./arrow_right_fill.png" alt="" />
                        <span className={styles.custom_span}>
                          Thông tin cần biết
                        </span>
                      </a>
                    </div>
                    <div className={styles.left_bottom_left_item}>
                      <a href="https://dev.timviec365.vn/thoa-thuan-su-dung.html">
                        <img src="./arrow_right_fill.png" alt="" />
                        <span className={styles.custom_span}>
                          Thỏa thuận sử dụng
                        </span>
                      </a>
                    </div>
                    <div className={styles.left_bottom_left_item}>
                      <a href="https://dev.timviec365.vn/so-do-trang-web.html">
                        <img src="./arrow_right_fill.png" alt="" />
                        <span className={styles.custom_span}>
                          Sơ đồ website
                        </span>
                      </a>
                    </div>
                  </div>

                  <div className={styles.left_bottom_right}>
                    <div className={styles.left_bottom_right_item}>
                      <a href="https://dev.timviec365.vn/quy-dinh-bao-mat.html">
                        <img src="./arrow_right_fill.png" alt="" />
                        <span className={styles.custom_span}>
                          Quy định bảo mật
                        </span>
                      </a>
                    </div>
                    <div className={styles.left_bottom_right_item}>
                      <a href="https://dev.timviec365.vn/giai-quyet-tranh-chap.html">
                        <img src="./arrow_right_fill.png" alt="" />
                        <span className={styles.custom_span}>
                          Quy trình giải quyết tranh chấp
                        </span>
                      </a>
                    </div>
                    <div className={styles.icon}>
                      <a href="http://online.gov.vn/Home/WebDetails/35979?AspxAutoDetectCookieSupport=1">
                        <img
                          src="./icon_bct.png"
                          alt=""
                          className={styles.icon_left}
                        />
                      </a>
                      <a href="https://www.dmca.com/Protection/Status.aspx?ID=5b1070f1-e6fb-4ba4-8283-84c7da8f8398&cdnrdr=1&refurl=https://www.hungha365.com/">
                        <img
                          src="./icon_protected.png"
                          alt=""
                          className={styles.icon_right}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.right}>
                <span>Tải APP Chat 365 tại đây</span>
                <img src="./qr_footer.png" alt="" />
              </div>
            </div>
            <div className={styles.app_mb}>
              <span>Tải APP Chat 365 tại đây</span>
              <div className={styles.icon_app}>
                <img src="./app_store.png" alt="" />
                <img src="./gg_play.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
