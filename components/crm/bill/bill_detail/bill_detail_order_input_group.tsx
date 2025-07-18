import React from "react";
import styles from "@/components/crm/bill/bill_detail/bill_detail_action_modal/bill_detail_action.module.css";
import BillDetailSelectBox from "@/components/crm/bill/bill_detail/bill_detail_action_modal/bill_detail_select";

export default function BillDetailOrderInputGroups() {
  return (
    <div className={styles.main__control}>
      <div className={`${styles.main__control_select} flex_align_center`}>
        <div
          className={`${styles.select_item} flex_align_center_item ${styles.select_item_time}`}
        >
          <label htmlFor="" className="">
            Ngày đặt:
          </label>
          <div className={`${styles.input_item_time} flex_between`}>
            <input type="date" name="" id="start_time" /> -
            <input type="date" name="" id="end_time" />
          </div>
        </div>

        <BillDetailSelectBox title="Tình trạng:" value="Tất cả" />
      </div>

      <div className={`${styles.main__control_btn} flex_between`}>
        {/* <div className={styles.main__control_search}>
          <form onSubmit={() => false}>
            <input
              type="text"
              className={styles.input__search}
              name="search"
              defaultValue=""
              placeholder="Tìm kiếm theo tên chiến dịch"
            />
            <button className={styles.kinh_lup}>
              <img
                className={styles.img__search}
                src="/crm/search.svg"
                alt="hungha365.com"
              />
            </button>
          </form>
        </div> */}
        {/* <div className={`${styles.main__control_add} flex_end`}>
          <Link href="/campaign/add">
            <button
              type="button"
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <img src="/crm/add.svg" />
              Thêm mới
            </button>
          </Link>
          
        </div> */}
      </div>
    </div>
  );
}
