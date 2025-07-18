import React, { useState } from "react";
import styles from "../../marketing/marketing.module.css";
import Link from "next/link";
import Image from "next/image";
import Popup from "./zalo_qr_popup"
import ZaloAddMessPlan from "./zalo_add_mess_plan"
export default function EmailFormInputGroup({ isSelectedRow }: any) {
  const handleClickSelectoption = () => {};
  const [showPopup, setShowPopup] = useState(false);
  const [addMessPlan,SetAddMessPlan] = useState(false);
  const handleButtonClick = (record) => {
    SetAddMessPlan(true);
  };
  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
   <>
  <div className={styles.main__control}>
  <div
    className={`${styles.select_item} flex_align_center_item ${styles.select_item_time}`}
  >
    <label htmlFor="" className="">
      Ngày gửi:
    </label>
    <div className={`${styles.input_item_time} flex_between`}>
      <input
        type="date"
        name=""
        id="start_time"
        style={{ margin: "0px 10px" }}
      />
      -
      <input
        type="date"
        name=""
        id="end_time"
        style={{ margin: "0px 10px" }}
      />
    </div>
  </div>
  <div className={`${styles.main__control_btn} flex_between`}>
    <div className={styles.main__control_search}>
      <form onSubmit={() => false}>
        <input
          type="text"
          className={styles.input__search}
          name="search"
          // defaultValue="Tìm kiếm theo tên tài khoản"
          placeholder="Tìm kiếm theo tên tài khoản"
        />
        <button className={styles.kinh_lup}>
          <Image
            width={14}
            height={14}
            className={styles.img__search}
            src="/crm/search.svg"
            alt="hungha365.com"
          />
        </button>
      </form>
    </div>
    <div className={`${styles.main__control_add} flex_end`}>
      <Link href={"/marketing/zalo/add_mess_plan"}>
        <button
          type="button"
          className={`${styles.dropbtn_add} flex_align_center`}
        >
          <Image height={14} width={14} alt="..." src="/crm/add.svg" />
          Thêm mới
        </button>
        </Link>
    </div>
  </div>
</div>
</> 
   
  
  );
}
