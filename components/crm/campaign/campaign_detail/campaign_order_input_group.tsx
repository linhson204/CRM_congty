import React, { useEffect, useRef } from "react";
import styles from "@/components/crm/campaign/campaign_detail/campaign_detail_action_modal/campaign_detail_action.module.css";
import styleCampaignInput from "../campaign.module.css";
import CampaignDetailSelectBox from "@/components/crm/campaign/campaign_detail/campaign_detail_action_modal/campaign_detail_select";
import Link from "next/link";
import Image from "next/image";
import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.min.js";
import CampaignOrderAction from "@/components/crm/order/order_action";
import { stringToDateNumber } from "../../ultis/convert_date";
import { fetchApi } from "../../ultis/api";
import Cookies from "js-cookie";
import { useTrigger } from "../../context/triggerContext";

export default function CampaignOrderInputGroup({
  body,
  setBody,
  emp,
  selectedRow,
}: any) {
  const inputRef = useRef(null);
  const token = Cookies.get("token_base365");
  const { trigger, setTrigger } = useTrigger();

  const statusList = [
    { value: 0, label: "Trạng thái:  Tất cả " },
    { value: 1, label: "Trạng thái:  Chờ duyệt" },
    { value: 2, label: "Trạng thái:  Đã duyệt" },
    { value: 3, label: "Trạng thái:  Từ chối" },
    { value: 4, label: "Trạng thái:  Đã hủy bỏ" },
  ];

  const bodyAPI = [
    {
      typeAPI: "del",
      campaign_id: 0,
    },
    {
      typeAPI: "deny",
      status: 3,
    },
    {
      typeAPI: "confirm",
      status: 2,
    },
    {
      typeAPI: "cancel",
      status: 4,
    },
    {
      typeAPI: "hand_over",
      status: 0,
    },
  ];

  const fetchAPIEdit = async (id: number, bodyAPIs) => {
    bodyAPIs = {
      ...bodyAPIs,
      id: id,
    };
    const dataApi = await fetchApi(
      "https://api.timviec365.vn/api/crm/order/edit-order",
      token,
      bodyAPIs,
      "POST"
    );
    if (dataApi) {
      setTrigger(true);
    }
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
    <div className={styleCampaignInput.main__control}>
      <div
        className={`${styleCampaignInput.main__control_select} flex_align_center`}
      >
        <div
          style={{
            borderRadius: "4px",
            // height: "40px",
            marginLeft: "10px",
            boxShadow: "none",
            border: "1px solid #aaa",
          }}
          className={`${styleCampaignInput.select_item} flex_align_center_item ${styleCampaignInput.select_item_time}`}
        >
          <label htmlFor="" className="">
            Ngày đặt hàng:
          </label>
          <div className={`${styleCampaignInput.input_item_time} flex_between`}>
            <input
              type="date"
              name=""
              id="start_time"
              onChange={(el) => {
                setBody((prev) => {
                  return {
                    ...prev,
                    fromDate: stringToDateNumber(el.target.value) / 1000,
                  };
                });
              }}
            />{" "}
            -
            <input
              type="date"
              name=""
              id="end_time"
              onChange={(el) => {
                setBody((prev) => {
                  return {
                    ...prev,
                    toDate: stringToDateNumber(el.target.value) / 1000,
                  };
                });
              }}
            />
          </div>
        </div>
        <select
          className="js-example-basic-single"
          name="state"
          placeholder="Trạng thái: Tất cả"
        >
          {statusList?.map((item, i) => (
            <option key={i} value={item.value}>
              {item?.label}
            </option>
          ))}
        </select>
      </div>

      <div
        className={`${styleCampaignInput.main__control_btn} flex_between`}
        style={{ alignItems: "flex-end" }}
      >
        <div className={styleCampaignInput.main__control_search}>
          <form
            style={{ marginRight: "10px" }}
            onSubmit={(e) => {
              e.preventDefault();
              const value = inputRef.current?.value;
              setBody((prev) => {
                return {
                  ...prev,
                  keyword: value,
                };
              });
            }}
          >
            <input
              ref={inputRef}
              type="text"
              style={{
                borderRadius: "4px",
                // height: "40px",
                marginLeft: "10px",
                boxShadow: "none",
                border: "1px solid #aaa",
              }}
              className={styleCampaignInput.input__search}
              name="search"
              defaultValue=""
              placeholder="Tìm kiếm theo số đơn hàng, khách hàng, người thực hiện"
            />
            <button
              style={{ right: "-2px" }}
              type="submit"
              className={styles.kinh_lup}
            >
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
        <div className={`${styleCampaignInput.main__control_add} flex_end`}>
          <Link href="/order/add">
            <button
              type="button"
              className={`${styleCampaignInput.dropbtn_add} flex_align_center`}
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
      <CampaignOrderAction
        isSelectedRow={selectedRow}
        fetchAPIEdit={fetchAPIEdit}
        bodyAPI={bodyAPI}
        link={`/order/edit/${selectedRow[0]?._id}`}
      />
    </div>
  );
}
