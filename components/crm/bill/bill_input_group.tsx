import React from "react";
import styles from "./bill.module.css";
import BillAction from "@/components/crm/bill/bill_action";
import OrderSelectBox from "@/components/crm/bill/bill_selectt";
import Link from "next/link";
import Image from "next/image";

export default function BillInputGroups({ isSelectedRow }: any) {
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
            Ngày đề nghị:
          </label>
          <div className={`${styles.input_item_time} flex_between`}>
            <input type="date" name="" id="start_time" /> -
            <input type="date" name="" id="end_time" />
          </div>
        </div>
      </div>

      <div className={`${styles.main__control_select} flex_align_center`}>
        <OrderSelectBox title="Tình trạng:" value="Tất cả" />
        <OrderSelectBox title="Tình trạng gửi hóa đơn:" value="Tất cả" />
      </div>

      <div className={`${styles.main__control_btn} flex_between`}>
        <div className={styles.main__control_search}>
          <form onSubmit={() => false}>
            <input
              type="text"
              className={styles.input__search}
              name="search"
              defaultValue=""
              placeholder="Tìm kiếm theo số đề nghị, khách hàng"
            />
            <button className={styles.kinh_lup}>
              <Image
                width={20}
                height={20}
                className={styles.img__search}
                src="/crm/search.svg"
                alt=".."
              />
            </button>
          </form>
        </div>
        <div className={`${styles.main__control_add} flex_end`}>
          <Link href="/bill/add">
            <button
              type="button"
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <Image alt="themoi" width={13} height={13} src="/crm/add.svg" />
              Thêm mới
            </button>
          </Link>
        </div>
      </div>

      <BillAction />
    </div>
  );
}
