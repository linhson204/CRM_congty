import React from "react";
import styles from "@/components/crm/order/order_detail/order_detail_action_modal/order_detail_action.module.css";
// import OrderDetailAction from "./campaign_action";
import OrderDetailSelectBox from "@/components/crm/order/order_detail/order_detail_action_modal/order_detail_select";
import Link from "next/link";

export default function QuoteDetailBillInputGroups({ isSelectedRow }: any) {
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
            Ngày đề nghị:
          </label>
          <div className={`${styles.input_item_time} flex_between`}>
            <input type="date" name="" id="start_time" /> -
            <input type="date" name="" id="end_time" />
          </div>
        </div>
        <div
          className={`${styles.select_item} flex_align_center_item ${styles.select_item_time}`}
        >
          <label htmlFor="" className="">
            Ngày hóa đơn:
          </label>
          <div className={`${styles.input_item_time} flex_between`}>
            <input type="date" name="" id="start_time" /> -
            <input type="date" name="" id="end_time" />
          </div>
        </div>
      </div>
      <div className={`${styles.main__control_select} flex_align_center`}>
        <OrderDetailSelectBox title="Tình trạng:" value="Tất cả" />
        <OrderDetailSelectBox title="Tình trạng gửi hóa đơn:" value="Tất cả" />
      </div>

      <div className={`${styles.main__control_btn} flex_between`}></div>
    </div>
  );
}
