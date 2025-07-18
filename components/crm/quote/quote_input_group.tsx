import React, { useContext, useEffect } from "react";
import styles from "@/components/crm/quote/quote.module.css";
import Link from "next/link";
import QuoteSelectBox from "./quote_selectt";
import QuoteAction from "./quote_action";
import { QuoteContext } from "./quoteContext";
import dayjs from "dayjs";
import { MInputTextV2 } from "../input_select/input";
export default function QuoteInputGroups({ isSelectedRow }: any) {
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

  const {
    dateQuote,
    setDateQuote,
    dateQuoteEnd,
    setDateQuoteEnd,
    quoteCode,
    setQuoteCode,
    setShouldFetchData,
    recordId,
    listRecordId,
  } = useContext(QuoteContext);
  const handleDateQuote = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateQuote(event.target.valueAsDate);
    setShouldFetchData(true);
  };
  const handleDateQuoteEnd = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateQuoteEnd(event.target.valueAsDate);
    setShouldFetchData(true);
  };
  const handleQuoteCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuoteCode(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShouldFetchData(true);
  };

  return (
    <div className={styles.main__control}>
      <div className={`${styles.main__control_select} flex_align_center`}>
        <div
          className={`${styles.select_item} flex_align_center_item ${styles.select_item_time}`}
          style={{ height: 35 }}
        >
          <label htmlFor="" className="">
            Ngày báo giá:
          </label>
          <div className={`${styles.input_item_time} flex_between`}>
            <input
              type="date"
              name=""
              id="start_time"
              value={dateQuote ? dayjs(dateQuote).format("YYYY-MM-DD") : ""}
              onChange={handleDateQuote}
            />
          </div>
        </div>
        <div
          className={`${styles.select_item} flex_align_center_item ${styles.select_item_time}`}
          style={{ height: 35 }}
        >
          <label htmlFor="" className="">
            Hiệu lực đến ngày:
          </label>
          <div className={`${styles.input_item_time} flex_between`}>
            <input
              type="date"
              name=""
              id="start_time"
              value={
                dateQuoteEnd ? dayjs(dateQuoteEnd).format("YYYY-MM-DD") : ""
              }
              onChange={handleDateQuoteEnd}
            />
          </div>
        </div>
        <QuoteSelectBox title="Tình trạng:" value="Tất cả" />
      </div>

      <div className={`${styles.main__control_btn} flex_between`}>
        <div className={styles.main__control_search}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className={styles.input__search}
              name="searchQuote"
              placeholder="Tìm kiếm theo số báo giá"
              style={{ fontSize: 18 }}
              value={quoteCode}
              onChange={handleQuoteCode}
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
          <Link href="/quote/add">
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

      <QuoteAction />
    </div>
  );
}
