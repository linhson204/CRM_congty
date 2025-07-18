import React from "react";
import styles from "./facebook.module.css";
import Image from "next/image";
import {
  Call,
  DropRight,
  Row,
  Search,
  Smile,
  Unhappy
} from "@/public/img/marketing/facebook";

const FacebookExampleAuto = () => {
  return (
    <div className={`${styles.content_right} ${styles.config_sms_face__auto} `}>
      <p className={styles.content_title}>Xem trước mẫu tin</p>
      <div className={styles.box_right}>
        <div className={styles.box_templace}>
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
              Thân gửi [TEN_KHACH_HANG], CV xin việc là yếu tố quan trọng để nhà
              tuyển dụng xem xét và đánh giá từng ứng viên.
            </p>
          </div>
          {/* detail */}
          <div className={styles.btns_detail}>
            {/* btn happy */}
            <div className={styles.btn_content}>
              <div className={styles.icon}>
                <Smile />
              </div>
              <span className={styles.text}>Tham gia ngay</span>
            </div>
            <div className={styles.btn_content}>
              <div className={styles.icon}>
                <Unhappy />
              </div>
              <span className={styles.text}>Không hứng thú</span>
            </div>
          </div>
        </div>
        {/* right of right */}
        <div className={styles.btn_right_of_right}>
          <button className={styles.btn__part_in}>
            Tham gia ngay
            <div className={styles.btn_row}>
              <Row />
            </div>
          </button>
        </div>
      </div>
      <div className={styles.box_right}>
        <div className={styles.box_templace}>
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
              Thân gửi [TEN_KHACH_HANG], CV xin việc là yếu tố quan trọng để nhà
              tuyển dụng xem xét và đánh giá từng ứng viên.
            </p>
          </div>
          {/* detail */}
          <div className={styles.btns_detail}>
            {/* btn happy */}
            <div className={styles.btn_content}>
              <div className={styles.icon}>
                <Smile />
              </div>
              <span>Tham gia ngay</span>
            </div>
            <div className={styles.btn_content}>
              <div className={styles.icon}>
                <Unhappy />
              </div>
              <span>Không hứng thú</span>
            </div>
          </div>
        </div>
        {/* right of right */}
        <div className={styles.btn_right_of_right}>
          <button className={styles.btn__part_in}>
            Tham gia ngay
            <div className={styles.btn_row}>
              <Row />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacebookExampleAuto;
