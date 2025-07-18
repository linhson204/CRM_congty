import { useState } from "react";
import styles from "./chat.module.css";
export default function InputNameCustomer({
  infoCus,
  refName,
  setChange,
  name,
}: any) {
  console.log("thông tin khách hàng", infoCus);
  console.log("infoCus?.data2?.ten_khach_hang", infoCus?.data2?.ten_khach_hang)
  return (
    <div
      className={`${styles.business_assistant_item} ${styles.business_assistant_item_gray}`}
    >
      <label className={`${styles.lbl_title} required`}>Tên khách hàng</label>
      <input
        ref={refName}
        defaultValue={infoCus?.name || infoCus?.data2?.ten_khach_hang}
        value={ name || infoCus?.name}
        // || infoCus?.data2?.ten_khach_hang
        name=""
        // disabled
        type=" text"
        placeholder="Nhập tên khách hàng"
        onChange={(e) => setChange(e.target.value)}
      />
    </div>
  );
}
