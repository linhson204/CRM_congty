import React from "react";
import styles from "../../marketing/marketing.module.css";
import Link from "next/link";
import Image from "next/image";

export default function EmailFormInputGroup({ isSelectedRow }: any) {
  const handleClickSelectoption = () => {};
  return (
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
              defaultValue=""
              placeholder="Tìm kiếm theo đối tượng gửi"
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
          <Link href="/marketing/sms/add">
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
  );
}
