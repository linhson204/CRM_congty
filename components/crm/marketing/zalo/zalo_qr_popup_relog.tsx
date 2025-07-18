import styles from "../../marketing/marketing.module.css";
import React from 'react';
import Image from "next/image"
import Timer from "./zalo_qr_timer";
const Popup = ({ onClose }) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h2 className={styles.popupTitle} >Vui lòng quét mã QR bên dưới  để đăng nhập lại</h2>
        <Image height={140} width={140} alt="..." src="/crm/zalo_ava.svg"/>
        <p className={styles.popupName}>Vũ Thuỳ Dung</p>
        <p className={styles.popupTimer} >Còn lại: <Timer/> giây</p>
        <Image height={320} width={320} alt="..." src="/crm/qr_zalo.png"/>
      </div>
    </div>
  );
};

export default Popup;