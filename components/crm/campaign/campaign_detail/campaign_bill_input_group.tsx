import React, { useEffect, useRef } from "react";
import styles from "@/components/crm/campaign/campaign_detail/campaign_detail_action_modal/campaign_detail_action.module.css";
// import OrderDetailAction from "./campaign_action";
import CampaignDetailSelectBox from "@/components/crm/campaign/campaign_detail/campaign_detail_action_modal/campaign_detail_select";
import Link from "next/link";
import styleCampaignInput from "../campaign.module.css";
import CampaignBillAction from "@/components/crm/order/order_action";
import Image from "next/image";
import Cookies from "js-cookie";
import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.min.js";
import { useTrigger } from "../../context/triggerContext";
import { fetchApi } from "../../ultis/api";
import { stringToDateNumber } from "../../ultis/convert_date";

export default function CampaignBillInputGroup({
  body,
  setBody,
  emp,
  selectedRow,
}) {
  const inputRef = useRef(null);
  const token = Cookies.get("token_base365");
  const { trigger, setTrigger } = useTrigger();

  const statusList = [
    { value: 0, label: "Tình trạng:  Tất cả " },
    { value: 1, label: "Tình trạng:  Đề nghị xuất " },
    { value: 2, label: "Tình trạng:   Duyệt đề nghị" },
    { value: 3, label: "Tình trạng:  Huỷ bỏ" },
    { value: 5, label: "Tình trạng:  Từ chối" },
    { value: 4, label: "Tình trạng:  Đã xuất" },
  ];

  const statuSendList = [
    { value: 0, label: "Tình trạng gửi hóa đơn:  Tất cả " },
    { value: 1, label: "Tình trạng gửi hóa đơn:  Đề nghị xuất " },
  ];

  const bodyAPI = [
    {
      typeAPI: "del",
      campaign_id: 0,
    },
    {
      typeAPI: "deny",
      status: 5,
    },
    {
      typeAPI: "confirm",
      status: 2,
    },
    {
      typeAPI: "cancel",
      status: 3,
    },
    {
      typeAPI: "hand_over",
      status: 0,
    },
    {
      typeAPI: "share",
      status: 0,
    },
  ];

  const fetchAPIEdit = async (id: number, bodyAPIs) => {
    bodyAPIs = {
      ...bodyAPIs,
      id: id,
    };
    const dataApi = await fetchApi(
      "https://api.timviec365.vn/api/crm/bill/edit-bill",
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
    $(".js-example-basic-single1").select2();

    $(".js-example-basic-single").on("change", (e) => {
      const selectedValue = e.target.value;
      setBody((prev) => {
        return {
          ...prev,
          status: Number(selectedValue),
        };
      });
    });

    $(".js-example-basic-single1").on("change", (e) => {
      const selectedValue = e.target.value;
      setBody((prev) => {
        return {
          ...prev,
          status_send: Number(selectedValue),
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
          className={`${styleCampaignInput.select_item} flex_align_center_item ${styleCampaignInput.select_item_time}`}
        >
          <label htmlFor="" className="">
            Ngày đề nghị:
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
        <div
          className={`${styleCampaignInput.select_item} flex_align_center_item ${styleCampaignInput.select_item_time}`}
        >
          <label htmlFor="" className="">
            Ngày hóa đơn:
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
                    fromCreateAt: stringToDateNumber(el.target.value),
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
                    toCreateAt: stringToDateNumber(el.target.value),
                  };
                });
              }}
            />
          </div>
        </div>
      </div>
      <div
        className={`${styleCampaignInput.main__control_select} flex_align_center`}
      >
        <select
          className="js-example-basic-single"
          name="state"
          placeholder="Tình trạng: Tất cả"
        >
          {statusList?.map((item, i) => (
            <option key={i} value={item.value}>
              {item?.label}
            </option>
          ))}
        </select>

        {/*  */}
        <select
          className="js-example-basic-single1"
          name="state"
          placeholder="Tình trạng gửi hóa đơn: Tất cả"
        >
          {statuSendList?.map((item, i) => (
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
              className={styleCampaignInput.input__search}
              name="search"
              defaultValue=""
              placeholder="Tìm kiếm theo số đề nghị, khách hàng"
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
        <div
          style={{ alignItems: "left" }}
          className={`${styles.main__control_add}`}
        >
          <Link href="/bill/add">
            <button type="button" className={`${styles.dropbtn_add}`}>
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
      <CampaignBillAction
        isSelectedRow={selectedRow}
        fetchAPIEdit={fetchAPIEdit}
        bodyAPI={bodyAPI}
        link={`/bill/edit/${selectedRow[0]?._id}`}
      />
    </div>
  );
}
