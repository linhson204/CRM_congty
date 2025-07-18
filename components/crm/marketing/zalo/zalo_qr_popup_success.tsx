import styles from "../../marketing/marketing.module.css";
import React from 'react';
import Image from "next/image"
import Timer from "./zalo_qr_timer";
const Popup = ({ onClose }) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h2 className={styles.popupTitle} >Quét mã thành công, vui lòng xác nhận trên điện thoại của bạn</h2>
        <p className={styles.popupTimer} >Còn lại: <Timer/> giây</p>
        <Image height={140} width={140} alt="..." src="/crm/zalo_ava.svg"/>
       <div className={styles.popupName}>
       <p>Vũ Thuỳ Dung</p>
       </div>
       
      </div>
    </div>
  );
};

export default Popup;