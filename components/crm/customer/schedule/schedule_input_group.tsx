import React, { useState } from "react";
import styles from "../../customer/detail/customer_detail.module.css";
import Link from "next/link";
import PotentialSelectBox from "@/components/crm/potential/potential_selectt";
import ScheduleModalAddOrEdit from "./schedule_add_or_edit";
export default function ScheduleDetailInputGroup() {
  const handleClickSelectoption = () => {};
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.main__control}>
      <div className={`${styles.main__control_select} flex_align_center`}>
        <div
          style={{ height: "40px", minWidth: "300px" }}
          className={`${styles.select_item} flex_align_center_item ${styles.select_item_time}`}
        >
          <label htmlFor="" className="">
            Thời gian thực hiện
          </label>
          <div className={`${styles.input_item_time} flex_between`}>
            <input type="date" name="" id="start_time" />
          </div>
        </div>
        <PotentialSelectBox title="Nhân viên thực hiện:" value="Tất cả" />
        <PotentialSelectBox title="Trạng thái:" value="Tất cả" />
      </div>

      <div className={`${styles.main__control_btn} flex_between`}>
        <div className={styles.main__control_search}>
          <form onSubmit={() => false}>
            <input
              style={{ height: "46px" }}
              type="text"
              className={styles.input__search}
              name="search"
              defaultValue=""
              placeholder="Tìm kiếm theo tên lịch hẹn"
            />
            <button className={styles.kinh_lup}>
              <img
                className={styles.img__search}
                src="/crm/search.svg"
                alt=""
              />
            </button>
          </form>
        </div>
        <div className={`${styles.main__control_add} flex_end`}>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className={`${styles.dropbtn_add} flex_align_center`}
          >
            <img src="/crm/add.svg" />
            Thêm mới
          </button>
        </div>
      </div>
      <ScheduleModalAddOrEdit
        isModalCancel={isOpen}
        setIsModalCancel={setIsOpen}
        title={"Thêm lịch hẹn"}
        content="Thêm lịch hẹn thành công!"
      />
    </div>
  );
}
