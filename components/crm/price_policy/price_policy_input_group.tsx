import React from "react";
import styles from "./price_policy.module.css";
import PricePolicyAction from "./price_policy_action";
import PricePolicySelectBox from "./price_policy_selectt";
import Link from "next/link";
import exportToExcel from "../ultis/export_xlxs";
// import { data } from "../table/table-potential";
export default function PotentialInputGroup({ isSelectedRow }: any) {
  const handleClickSelectoption = () => {};

  const datas = [
    {
      "Mã chính sách giá": "123456",
      "Tên chính sách giá": "Chính sách giá tháng 4 cho dịch vụ sửa chữa",
      "Đối tượng": "Theo khách hàng cụ thể",
      "Từ ngày": "10/10/2020",
      "Đến ngày": "10/10/2020",
      "Người tạo": "Nguyễn Văn Hùng",
      "Ngày tạo": "10:10 - 22/03/2022",
    },
    // Add more sample data objects here if needed
  ];
  const handleExportToExcel = () => {
    const filename = "Danh sách chính sách giá.xlsx";
    const sheetName = "Danh sách chính sách giá";
    const columnHeaders = [
      "Mã chính sách giá",
      "Tên chính sách giá",
      "Đối tượng",
      "Từ ngày",
      "Đến ngày",
      "Người tạo",
      "Ngày tạo",
    ];
    exportToExcel(datas, filename, sheetName, columnHeaders);
  };
  return (
    <div className={styles.main__control}>
      <div className={`${styles.main__control_select} flex_align_center`}>
        <div
          className={`${styles.select_item} flex_align_center_item ${styles.select_item_time}`}
        >
          <label htmlFor="" className="">
            Thời gian tạo:
          </label>
          <div className={`${styles.input_item_time} flex_between`}>
            <input type="date" name="" id="start_time" /> -
            <input type="date" name="" id="end_time" />
          </div>
        </div>
        <PricePolicySelectBox title="Đối tượng:" value="Tất cả" />
        <PricePolicySelectBox title="Người tạo:" value="Tất cả" />
      </div>

      <div className={`${styles.main__control_btn} flex_between`}>
        <div className={styles.main__control_search}>
          <form onSubmit={() => false}>
            <input
              type="text"
              className={styles.input__search}
              name="search"
              defaultValue=""
              placeholder="Tìm kiếm theo tên chính sách giá"
            />
            <button className={styles.kinh_lup}>
              <img
                className={styles.img__search}
                src="/crm/search.svg"
                alt="hungha365.com"
              />
            </button>
          </form>
        </div>
        <div className={`${styles.main__control_add} flex_end`}>
          <Link href="/price_policy/add_file">
            <button
              type="button"
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <img src="/crm/add.svg" />
              Thêm mới
            </button>
          </Link>
          <button
            type="button"
            onClick={handleExportToExcel}
            className={`${styles.dropbtn_add} flex_align_center ${styles.btn_excel}`}
          >
            <img src="/crm/icon_excel.svg" />
            Xuất excel
          </button>
        </div>
      </div>

      <PricePolicyAction isSelectedRow={isSelectedRow} />
    </div>
  );
}
