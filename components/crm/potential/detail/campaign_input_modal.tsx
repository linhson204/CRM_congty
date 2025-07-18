import React, { useEffect, useRef, useState } from "react";
import styles from "@/components/crm/campaign/campaign.module.css";
import CampaignAction from "@/components/crm/campaign/campaign_action";
import CampaignSelectBox from "@/components/crm/campaign/campaign_selectt";
import Link from "next/link";
import ShowCampaignPOMD from "../mdal_action/mdal_show_campaignPO";
import { useRouter } from "next/router";
import { axiosCRM } from "@/utils/api/api_crm";
import SelectSingle from "@/components/commodity/select";
export default function CampaignInputGroupsModal({ setFormData }: any) {
  const router = useRouter();
  const [isModalCancelPO, setIsModalCancelPO] = useState(false);
  const [listGroupProduct, setListGroupProduct] = useState([]);
  const inputRef = useRef<HTMLInputElement>();

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setFormData({ keyword: inputRef?.current?.value });
  };
  const onClose = () => {
    setIsModalCancelPO(false);
  };

  return (
    <div className={styles.main__control}>
      <div className={`${styles.main__control_btn} flex_between`}>
        <div className={styles.main__control_search}>
          <form onSubmit={handleSubmitSearch}>
            <input
              ref={inputRef}
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
        </div>
        <div className={`${styles.main__control_add} flex_end`}>
          <Link
            href={"/crm/campaign/add"}
            className={`${styles.dropbtn_add} flex_align_center`}
          >
            <img src="/crm/add.svg" />
            Thêm mới
          </Link>
          <ShowCampaignPOMD
            isModalCancelPO={isModalCancelPO}
            onClose={onClose}
          />
        </div>
      </div>

      <CampaignAction />
    </div>
  );
}
