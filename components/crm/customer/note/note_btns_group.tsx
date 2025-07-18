import React, { useState } from "react";
import styles from "./customer_note.module.css";
import PotentialSelectBox from "@/components/crm/potential/potential_selectt";
import NoteModalAddOrEdit from "./note_mdal_add";
export default function NoteDetailBtnsGroup() {
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
          -
          <div className={`${styles.input_item_time} flex_between`}>
            <input type="date" name="" id="start_time" />
          </div>
        </div>
        <PotentialSelectBox title="Nhân viên thực hiện:" value="Tất cả" />
      </div>

      <div className={`${styles.main__control_btn} flex_between`}>
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
      <NoteModalAddOrEdit
        isModalCancel={isOpen}
        setIsModalCancel={setIsOpen}
        title={"Thêm ghi chú"}
        content={"Thêm mới ghi chú thành công"}
      />
    </div>
  );
}
