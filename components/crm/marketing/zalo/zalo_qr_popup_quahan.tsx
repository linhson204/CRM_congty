import styles from "../../marketing/marketing.module.css";
import React from 'react';
import Image from "next/image"
const Popup = ({ onClose }) => {
  return (
    <div className={styles.popupOverlay_2}>
      <div className={styles.popupContent_2}>
      <Image height={90} width={90} alt="..." src="/crm/x.svg"/>
        <h2 className={styles.popupTitle_2} >Đăng nhập thất bại</h2>
        <p>Số tài khoản zalo trong hệ thống của bạn đã vượt hạn mức (5 tài khoản)</p>
      
       
      </div>
      <div className={styles.popupClose} >
       <a>Đóng</a>
       </div>
    </div>
  );
};

export default Popup