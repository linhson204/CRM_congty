import React, { useState } from "react";
import styles from "./schedule.module.css";
import Image from "next/image";
import ScheduleModalComplete from "../schedule_modal_complete";
import ScheduleModalCancel from "../schedule_modal_cancel";
import ScheduleModalAddOrEdit from "../schedule_add_or_edit";
import CancelModal from "@/components/crm/potential/potential_steps/cancel_modal";
export default function ScheduleBtnsDetails({ id }: any) {
  const [isOpenModalCheck, setIsOpenModalCheck] = useState(false);
  const [isOpenModalCancel, setIsOpenModalCancel] = useState(false);
  const [isOpenModalUpdateStatus, setIsOpenModalUpdateStatus] = useState(false);
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);
  return (
    <>
      <div className={styles.main__control}>
        <div
          className={`${styles.main__control_btn}`}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "5px",
            gap: "15px",
          }}
        >
          <div className={`${styles.main__control_add} flex_end`}>
            <button
              type="button"
              style={{ background: "#34B632" }}
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <Image alt="+" width={16} height={16} src="/crm/call_white.svg" />
              Gọi ngay
            </button>
          </div>

          <div className={`${styles.main__control_add} flex_end`}>
            <button
              type="button"
              style={{ background: "#2A38A2" }}
              onClick={() => setIsOpenModalCheck(true)}
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <Image
                alt="+"
                width={16}
                height={16}
                src="/crm/complete_white.svg"
              />
              Hoàn thành
            </button>
          </div>

          <div className={`${styles.main__control_add} flex_end`}>
            <button
              type="button"
              style={{ background: "#FFA800" }}
              onClick={() => setIsOpenModalCancel(true)}
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <Image
                alt="+"
                width={16}
                height={16}
                src="/crm/pause_white.svg"
              />
              Hủy lịch hẹn
            </button>
          </div>

          <div className={`${styles.main__control_add} flex_end`}>
            <button
              type="button"
              style={{ background: "#4C5BD4" }}
              onClick={() => setIsOpenModalUpdateStatus(true)}
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <Image alt="+" width={16} height={16} src="	/crm/edit_kh.svg" />
              Chỉnh sửa
            </button>
          </div>

          <div className={`${styles.main__control_add} flex_end`}>
            <button
              type="button"
              style={{ background: "#FFF" }}
              onClick={() => setIsOpenModalDel(true)}
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <Image alt="+" width={16} height={16} src="/crm/delete_kh.svg" />
              Xóa
            </button>
          </div>
        </div>
      </div>

      <ScheduleModalComplete
        isModalCancel={isOpenModalCheck}
        setIsModalCancel={setIsOpenModalCheck}
      />

      <ScheduleModalCancel
        isModalCancel={isOpenModalCancel}
        setIsModalCancel={setIsOpenModalCancel}
      />

      <ScheduleModalAddOrEdit
        isModalCancel={isOpenModalUpdateStatus}
        setIsModalCancel={setIsOpenModalUpdateStatus}
        title={"Chỉnh sửa lịch hẹn"}
        content={"Cập nhật lịch hẹn thành công"}
      />

      <CancelModal
        isModalCancel={isOpenModalDel}
        setIsModalCancel={setIsOpenModalDel}
        content={"Bạn có chắc chắn muốn xoá lịch hẹn này không?"}
        title={"Xác nhận xoá lịch hẹn"}
        link={`#`}
      />
    </>
  );
}
