import React, { useRef, useState } from "react";
import { Call, DropRight, Pen, Search } from "@/public/img/marketing/facebook";
import styles from "./facebook.module.css";
import Image from "next/image";
import FacebookIcons from "./facebook_list_icon";
import FacebookAddBox from "./facebook_add_box_content_user";
import LookBeforFacebook from "./facebook_look_before";
import FacebookExampleAuto from "./facebook_example_auto";
import FacebookAddBoxContentAutoScreen from "./facebook_add_box_content_auto";

const FacebookTemplace = () => {
  const [page, setPage] = useState("mau-tin-nhan-tu-dong");

  const chooseFileRef = useRef(null);
  return (
    <section className={styles.templace}>
      <p className={styles.suggets}>Tin nhắn truyền thống</p>
      <div className={styles.templace_title}>
        <p className={styles.templace_title_text}>
          Mẫu tin nhắn truyền thống 1
        </p>
        <div className={styles.templace_icon}>
          <Pen />
        </div>
      </div>
      <div className={styles.templace__content}>
        {/* left */}
        {page !== "xem-truoc-kich-ban" && (
          <div className={styles.content_left}>
            <div>
              <p className={styles.content_title}>Ghi chú về khách hàng</p>
              <input
                className={styles.content_input}
                placeholder="Tất cả khách hàng thân quen"
              ></input>
            </div>
            <div>
              <p className={styles.content_title}>Tiêu đề</p>
              <input
                className={styles.content_input}
                placeholder="Nhập tiêu đề "
              ></input>
            </div>
            <div>
              <p className={styles.content_title}>Đính kèm ảnh</p>
              <label
                onClick={() => chooseFileRef.current.click()}
                className={styles.content_input}
              >
                Upload
              </label>
              <input
                ref={chooseFileRef}
                className={`${styles.content_input} ${styles.hidden_input}`}
                placeholder=""
                type="file"
              ></input>
              <p className={styles.content_note}>
                Định dạng jpg và png (Tối đa 1MB) Kích thước ảnh tối ưu: 100px *
                100px
              </p>
            </div>
            <div className={styles.content_primary}>
              <p className={styles.content_title}>Nội dung chính</p>
              <textarea
                className={styles.content_enter}
                rows={5}
                placeholder="Nhập nội dung chính"
              />
            </div>
            <p className={styles.customer_note}>
              Lưu ý: Sử dụng từ khóa [TEN_KHACH_HANG] để gắn tên khách hàng
            </p>
            {page !== "xem-truoc-kich-ban" && (
              <>
                <FacebookIcons />
                { 
                  page !== 'mau-tin-nhan-tu-dong' ? (

                    <FacebookAddBox />
                  ) : ( <FacebookAddBoxContentAutoScreen/>)
                }
              </>
            )}
          </div>
        )}
        {page === "xem-truoc-kich-ban" && <LookBeforFacebook />}

        {/* right */}
        {
          page === 'mau-tin-nhan-tu-dong' ? (
            <>
            <FacebookExampleAuto/>
            </>
          ) : (
        <div className={styles.content_right}>
          <p className={styles.content_title}>Xem trước mẫu tin</p>
          <div className={styles.box_templace}>
            <p className={styles.box_header_title}>Tin truyền thống</p>
            <Image
              className={styles.image}
              width={100}
              height={10}
              src="https://top10tphcm.com/wp-content/uploads/2023/06/anh-anime-nu-cute-chat-luong-cao-e1687250768371.jpg"
              alt="image"
            />
            <div className={styles.box_content}>
              <h3 className={styles.box_content_title}>
                Tham gia nhóm để cập nhật nhưng tin tức mới nhất!!!
              </h3>
              <p className={styles.des}>
                Thân gửi [TEN_KHACH_HANG], CV xin việc là yếu tố quan trọng để
                nhà tuyển dụng xem xét và đánh giá từng ứng viên.
              </p>
              <p className={styles.des_for}>
                Áp dụng cho khách hàng nhận được tin nhắn
              </p>
            </div>
            {/* detail */}
            <div className={styles.btns_detail}>
              <div className={styles.btn_detail_search}>
                <div className={styles.detail_left}>
                  <div className={styles.detail_icon}>
                    <Search />
                  </div>
                  <p className={styles.detail_text}>Xem chi tiết</p>
                </div>
                <DropRight />
              </div>
              <div className={styles.btn_detail_call}>
                <div className={styles.detail_left}>
                  <div className={styles.detail_icon}>
                    <Call />
                  </div>
                  <p className={styles.detail_text}>Liên hệ ngay</p>
                </div>
                <DropRight />
              </div>
            </div>
          </div>
        </div>
          )

        }
      </div>
    </section>
  );
};

export default FacebookTemplace;
