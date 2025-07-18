import React from "react";
import styles from "../../campaign/campaign.module.css";
import stylesPotential from "../../potential/potential.module.css";
import Link from "next/link";
import CampaignSelectBox from "@/components/crm/campaign/campaign_selectt";
import CampaignAction from "@/components/crm/campaign/campaign_action";
export default function OrderDetailsInputGroups({ isSelectedRow }: any) {
  const handleClickSelectoption = () => {};

  return (
    <div style={{ marginTop: "-22px" }} className={styles.main__control}>
      <div
        className={`${stylesPotential.main__control_select} flex_align_center`}
      >
        <div
          className={`${stylesPotential.main__control_select} flex_align_center`}
        >
          <div
            style={{ height: "40px", minWidth: "300px" }}
            className={`${stylesPotential.select_item} flex_align_center_item ${stylesPotential.select_item_time}`}
          >
            <label htmlFor="" className="">
              Ngày đặt:
            </label>
            <div className={`${stylesPotential.input_item_time} flex_between`}>
              <input type="date" name="" id="start_time" />
            </div>
          </div>
          <CampaignSelectBox title="Tình trạng:" value="Tất cả" />
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
              placeholder="Tìm kiếm theo số đơn hàng, người thực hiện"
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
          <Link href="/campaign/add">
            <button
              type="button"
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <img src="/crm/add.svg" />
              Thêm mới
            </button>
          </Link>
        </div>
      </div>

      <CampaignAction />
    </div>
  );
}
