import styles from "./chat.module.css";
import { use, useEffect, useState } from "react";
export default function InputEmailCustomer({ infoCus, refMail, setMail }: any) {


  return (
    <div
      className={`${styles.business_assistant_item} ${styles.business_assistant_item_gray}`}
    >
      <label className={`${styles.lbl_title}`}>Email khách hàng</label>
      <input
        // disabled
        onChange={(e) => setMail(e.target.value)}
        ref={refMail}
        defaultValue={infoCus?.email?.detail || infoCus?.data2?.email || ""}
        name=""
        type=" text"
        placeholder="Nhập email khách hàng"
      />
    </div>
  );
}
