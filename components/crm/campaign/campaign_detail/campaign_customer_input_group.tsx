import React, { useEffect, useRef, useState } from "react";
import styles from "@/components/crm/campaign/campaign_detail/campaign_detail_action_modal/campaign_detail_action.module.css";
import CampaignDetailSelectBox from "@/components/crm/campaign/campaign_detail/campaign_detail_action_modal/campaign_detail_select";
import CustomerSelectModal from "@/components/crm/campaign/campaign_detail/campaign_detail_action_modal/customer_select_action_mdal";
import CampaignCustomerAction from "@/components/crm/campaign/campaign_detail/campaign_customer_action";
import Image from "next/image";
import Cookies from "js-cookie";
import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.min.js";
import styleCampaignInput from "../campaign.module.css";
import { useTrigger } from "../../context/triggerContext";
import { fetchApi } from "../../ultis/api";
import { useRouter } from "next/router";
export default function CampaignCustomerInputGroup({
  body,
  setBody,
  emp,
  selectedRow,
}) {
  const [isModalCancel, setIsModalCancel] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();
  const token = Cookies.get("token_base365");
  // const [statusList, setStatusList] = useState([]);
  const { trigger, setTrigger } = useTrigger();

  const bodyAPI = [
    {
      typeAPI: "add_calendar",
      campaign_id: 0,
    },
    {
      typeAPI: "add_care",
      status: 3,
    },
    {
      typeAPI: "del",
    },
    {
      typeAPI: "call",
      status: 4,
    },
    {
      typeAPI: "hand_over",
      status: 0,
    },
    {
      typeAPI: "status",
      status: 0,
    },
  ];

  const statusList = [
    { value: 1, label: "Chưa liên hệ" },
    { value: 2, label: "Chưa gửi thư mời" },
    { value: 3, label: "Đã liên hệ" },
    { value: 4, label: "Đã gửi thư mời" },
    { value: 5, label: "Đã nhận" },
    { value: 6, label: "Đã mở" },
    { value: 7, label: "Xác nhận tham gia" },
    { value: 8, label: "Không liên hệ được" },
    { value: 9, label: "Đã tham gia" },
    { value: 10, label: "Chưa quan tâm" },
  ];

  const fetchAPIEdit = async (id: number, bodyAPIs) => {
    bodyAPIs = {
      ...bodyAPIs,
      customer_ids: [id],
      cam_id: router.query.id,
    };
    const dataApi = await fetchApi(
      "https://api.timviec365.vn/api/crm/campaign/delete-campaign-cus",
      token,
      bodyAPIs,
      "POST"
    );
    if (dataApi) {
      setTrigger(true);
    }
  };

  const fetchApiCustomer = async (arrCustomerId) => {
    await fetch(
      `https://api.timviec365.vn/api/crm/customerdetails/add-campaign-customer`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          arr_campaign_id: [Number(router.query.id)],
          arr_cus_id: arrCustomerId,
        }),
      }
    );
  };

  useEffect(() => {
    $(".js-example-basic-single").select2();

    $(".js-example-basic-single").on("change", (e) => {
      const selectedValue = e.target.value;
      setBody((prev) => {
        return {
          ...prev,
          status: Number(selectedValue),
        };
      });
    });
  }, []);

  return (
    <div>
      <div className={styles.main__control}>
        <div className={`${styles.main__control_select} flex_align_center`}>
          <div className={`${styles.main__control_select} flex_align_center`}>
            <select
              className="js-example-basic-single"
              name="state"
              placeholder="Tình trạng: Tất cả"
            >
              <option value={0}>Tình trạng: Tất cả</option>
              {statusList?.map((item, i) => (
                <option key={i} value={item.value}>
                  {item?.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          style={{ marginLeft: "7px" }}
          className={`${styleCampaignInput.main__control_btn} flex_between`}
        >
          <div className={styleCampaignInput.main__control_search}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const value = inputRef.current?.value;
                setBody((prev) => {
                  return {
                    ...prev,
                    name: value,
                  };
                });
              }}
            >
              <input
                ref={inputRef}
                type="text"
                className={styleCampaignInput.input__search}
                name="search"
                defaultValue=""
                placeholder="Tìm kiếm theo tên khách hàng"
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
            <div>
              <button
                type="button"
                onClick={() => {
                  setIsModalCancel(true);
                }}
                className={`${styles.dropbtn_add} flex_align_center`}
              >
                <i className="bi bi-check2-square"></i>
                Chọn vào
              </button>
            </div>
          </div>
        </div>
        <CampaignCustomerAction
          isSelectedRow={selectedRow}
          bodyAPI={bodyAPI}
          fetchAPIEdit={fetchAPIEdit}
          link={`/customer/edit/${selectedRow[0]?.cus_id}`}
        />
      </div>
      <CustomerSelectModal
        isModalCancel={isModalCancel}
        setIsModalCancel={setIsModalCancel}
        title="Chọn khách hàng"
        fetchApi={fetchApiCustomer}
        // content="Hello"
      />
    </div>
  );
}
