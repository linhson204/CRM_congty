import React, { useEffect, useRef } from "react";
import styles from "@/components/crm/campaign/campaign_detail/campaign_detail_action_modal/campaign_detail_action.module.css";
import Link from "next/link";
import styleCampaignInput from "../campaign.module.css";
import Image from "next/image";
import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.min.js";
import { stringToDateNumber } from "../../ultis/convert_date";

export default function CampaignChanceInputGroup({ emp, body, setBody }) {
  const inputRef = useRef(null);

  const statusList = [
    { value: 0, label: "Giai đoạn:  Tất cả" },
    { value: 1, label: "Giai đoạn:  Chưa cập nhật" },
    { value: 2, label: "Giai đoạn:  Mở đầu" },
    { value: 3, label: "Giai đoạn:  Khách hàng quan tâm" },
    { value: 4, label: "Giai đoạn:  Demo/Gthieu" },
    { value: 5, label: "Giai đoạn:  Đàm phán/ thương lương" },
  ];

  useEffect(() => {
    $(".js-example-basic-single").select2();
    $(".js-example-basic-single2").select2();

    $(".js-example-basic-single").on("change", (e) => {
      const selectedValue = e.target.value;
      setBody((prev) => {
        return {
          ...prev,
          stages: Number(selectedValue),
        };
      });
    });

    $(".js-example-basic-single2").on("change", (e) => {
      const selectedValue = e.target.value;
      setBody((prev) => {
        return {
          ...prev,
          emp_id: Number(selectedValue),
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
            Thời gian tạo:
          </label>
          <div
            style={{ padding: "10px" }}
            className={`${styleCampaignInput.input_item_time} flex_between`}
          >
            <input
              onChange={(el) => {
                setBody((prev) => {
                  return {
                    ...prev,
                    fromDate: stringToDateNumber(el.target.value) / 1000,
                  };
                });
              }}
              type="date"
              name=""
              id="start_time"
            />{" "}
            -
            <input
              onChange={(el) => {
                setBody((prev) => {
                  return {
                    ...prev,
                    toDate: stringToDateNumber(el.target.value) / 1000,
                  };
                });
              }}
              type="date"
              name=""
              id="end_time"
            />
          </div>
        </div>
        <select
          className="js-example-basic-single"
          name="state"
          placeholder="Giai đoạn:"
          // onChange={handleChange}
          // value={formFields?.status}
          // ref={statusRef}
        >
          {statusList?.map((item, i) => (
            <option key={i} value={item.value}>
              {item?.label}
            </option>
          ))}
        </select>
        <select
          className="js-example-basic-single2"
          name="state"
          // placeholder="Giai đoạn:"
          // onChange={handleChange}
          // value={formFields?.status}
          // ref={statusRef}
        >
          <option value={0}>Người thực hiện: Tất cả </option>
          {emp?.map((item, i) => (
            <option key={i} value={item.ep_id}>
              Người thực hiện: {item?.userName}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{ padding: "0 10px", alignItems: "flex-end" }}
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
              placeholder="Tìm kiếm theo tên cơ hội"
            />
            <button type="submit" className={styles.kinh_lup}>
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
          <Link href="/chance/add">
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
      <link href="path/to/select2.min.css" rel="stylesheet" />
      <script src="path/to/select2.min.js"></script>
    </div>
  );
}
