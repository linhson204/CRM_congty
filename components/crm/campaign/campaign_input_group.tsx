import React, { useRef } from "react";
import styles from "./campaign.module.css";
import CampaignAction from "./campaign_action";
import CampaignSelectBox from "./campaign_selectt";
import Link from "next/link";
import Image from "next/image";
import { Select } from "antd";
import { stringToDateNumber } from "../../crm/ultis/convert_date";

export default function CampaignInputGroups({ empList, body, setBody }: any) {
  const searchRef = useRef<HTMLInputElement>(null);
  const dataEmp =
    empList?.map((item) => {
      return {
        label: item?.userName,
        value: item?.ep_id,
      };
    }) || [];

  const dataStatus = [
    { label: "Chưa cập nhật", value: 1 },
    { label: "Chưa diễn ra", value: 2 },
    { label: "Đã kết thúc", value: 3 },
    { label: "Đang tạm dừng", value: 4 },
    { label: "Đang diễn ra", value: 5 },
  ];
  return (
    <div className={styles.main__control}>
      <div className={`${styles.main__control_select} flex_align_center`}>
        <Select
          showSearch
          optionFilterProp="children"
          className={styles.selectAntd}
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          style={{ width: "calc(100% / 3 - 15px)", height: "40px" }}
          placeholder="Tình trạng: Tất cả"
          value={body?.status ? body?.status : null}
          onChange={(value) => {
            setBody((prev) => {
              return {
                ...prev,
                status: value,
              };
            });
          }}
          options={[
            { label: "Tình trạng:  Tất cả", value: null },
            ...dataStatus,
          ]}
        />
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "0px",
            boxShadow: "none",
          }}
          className={`${styles.select_item} flex_align_center_item ${styles.select_item_time}`}
        >
          <label htmlFor="" className="">
            Thời gian tạo:
          </label>
          <div className={`${styles.input_item_time} flex_between`}>
            <input
              type="date"
              name=""
              id="start_time"
              onChange={(el) => {
                setBody((prev) => {
                  return {
                    ...prev,
                    fromDate: stringToDateNumber(el.target.value),
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
                    toDate: stringToDateNumber(el.target.value),
                  };
                });
              }}
            />
          </div>
        </div>
        <Select
          showSearch
          optionFilterProp="children"
          className={styles.selectAntd}
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          value={body?.empID || null}
          style={{ width: "calc(100% / 3 - 15px)", height: "40px" }}
          placeholder="Người phụ trách:"
          onChange={(value) => {
            setBody((prev) => {
              return {
                ...prev,
                empID: value,
              };
            });
          }}
          options={[
            { label: "Người phụ trách: Tất cả", value: null },
            ...dataEmp,
          ]}
        />
      </div>

      <div className={`${styles.main__control_btn} flex_between`}>
        <div className={`${styles.main__control_search} ${styles.selectAntd}`}>
          <form
            onSubmit={(el) => {
              el.preventDefault();
              setBody((prev) => {
                return {
                  ...prev,
                  keyword: searchRef.current?.value,
                };
              });
            }}
          >
            <input
              ref={searchRef}
              type="text"
              className={`${styles.input__search} `}
              name="search"
              defaultValue=""
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "6px",
                boxShadow: "none",
              }}
              placeholder="Tìm kiếm theo tên chiến dịch"
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
          <Link href="/campaign/add">
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

      <CampaignAction />
    </div>
  );
}
