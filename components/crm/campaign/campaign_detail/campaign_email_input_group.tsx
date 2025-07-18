import React from "react";
import styles from "@/components/crm/campaign/campaign_detail/campaign_detail_action_modal/campaign_detail_action.module.css";
// import OrderDetailAction from "./campaign_action";
import CampaignDetailSelectBox from "@/components/crm/campaign/campaign_detail/campaign_detail_action_modal/campaign_detail_select";
import Link from "next/link";
import Image from "next/image";

export default function CampaignEmailInputGroup({ isSelectedRow }: any) {
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
            Ngày gửi:
          </label>
          <div className={`${styles.input_item_time} flex_between`}>
            <input type="date" name="" id="start_time" /> -
            <input type="date" name="" id="end_time" />
          </div>
        </div>

        <CampaignDetailSelectBox title="Nhà cung cấp:" value="Tất cả" />
      </div>

      <div className={`${styles.main__control_btn} flex_between`}>
        <div className={styles.main__control_search}>
          <form onSubmit={() => false}>
            <input
              type="text"
              className={styles.input__search}
              name="search"
              defaultValue=""
              placeholder="Tìm kiếm theo tiêu đề email"
            />
            <button className={styles.kinh_lup}>
              <Image
                className={styles.img__search}
                src="/crm/search.svg"
                alt="hungha365.com"
                width={15}
                height={15}
              />
            </button>
          </form>
        </div>
        <div className={`${styles.main__control_add} flex_end`}>
          <Link href="/marketing/email/add">
            <button
              type="button"
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <Image
                src="/crm/add.svg"
                alt="hungha365.com"
                width={15}
                height={15}
              />
              Thêm mới
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
