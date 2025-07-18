import React from "react";
import styles from "@/components/crm/order/order_detail/order_detail_action_modal/order_detail_action.module.css";
// import OrderDetailAction from "./campaign_action";
import OrderDetailSelectBox from "@/components/crm/order/order_detail/order_detail_action_modal/order_detail_select";
import Link from "next/link";

export default function OrderDetailAppointmentInputGroups({
  isSelectedRow,
}: any) {
  const handleClickSelectoption = () => {};

  const datas = [
    {
      STT: "TN001",
      "Tên chiến dịch": "abc",
      "Tình trạng": "John Doe",
      Loại: "Manager",
      "Ngày bắt đầu": "123-456-7890",
      "Ngày kết thúc": "john.doe@example.com",
      "Doanh sô kỳ vọng (VNĐ)": "098-765-4321",
      "Ngân sách (VNĐ)": "john.doe@company.com",
      "Chức năng": "123 Main St",
    },
    // Add more sample data objects here if needed
  ];

  return (
    <div className={styles.main__control}>
      <div className={`${styles.main__control_select} flex_align_center`}>
        <div
          className={`${styles.select_item} flex_align_center_item ${styles.select_item_time}`}
        >
          <label htmlFor="" className="">
            Thời gian thực hiện:
          </label>
          <div className={`${styles.input_item_time} flex_between`}>
            <input type="date" name="" id="start_time" /> -
            <input type="date" name="" id="end_time" />
          </div>
        </div>

        <OrderDetailSelectBox title="Nhân viên:" value="Tất cả nhân viên" />
        <OrderDetailSelectBox title="Trạng thái:" value="Tất cả" />
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
