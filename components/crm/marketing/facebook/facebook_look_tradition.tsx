import { Call, DropRight, Search } from '@/public/img/marketing/facebook'
import React from 'react';
import Image from 'next/image';
import styles from './facebook.module.css'
const TraditionLookFacebook = () => {
  return (
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

export default TraditionLookFacebook