import styles from "../../marketing/marketing.module.css";
import React  from 'react';
import Image from "next/image"
import { useEffect, useState } from "react";
import Timer from "./zalo_qr_timer";
const Popup = () => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h2 className={styles.popupTitle} >Vui lòng quét mã QR phía dướii</h2>
        <p className={styles.popupTimer} >Còn lại: <Timer/> giây</p>
        <Image height={320} width={320} alt="..." src="https://hungha365.com/crm/zalo_qr.png"/>
       <div className={styles.popupRef} >
       <a>Đăng nhập tài khoản Zalo</a>
       </div>
       
      </div>
    </div>
  );
};

export default Popup;
