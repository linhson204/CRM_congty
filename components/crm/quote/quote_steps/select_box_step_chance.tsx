import { useContext, useEffect, useRef, useState } from "react";
import styles from "@/components/crm/quote/quote.module.css";
import { QuoteContext } from "../quoteContext";
import CustomerDropDownDataStep from "./select_box_dropdown_data_customer";
import ChanceDropDownDataStep from "./select_box_dropdown_data_chance";
import useLoading from "../../hooks/useLoading";
import { Spin } from "antd";
export default function ChanceSelectBoxStep({
  title = "",
  value = "Tất cả",
  placeholder = "",
  data = [],
  setValue = () => { },
  setKeyword = () => { },
  keyword = '',
}: any) {
  const { setShouldFetchChance, listCusOption, shouldFetchChance } = useContext(QuoteContext)
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleClickSelectoption = (e: any) => {
    if (e.target.getAttribute("class") !== styles.select2_search__field) {
      setIsOpen(!isOpen);
    }
  };

  const handleScrollkOutside = (e: any) => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef?.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (shouldFetchChance) {
      startLoading();
    } else {
      stopLoading();
    }
  }, [shouldFetchChance])

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("scroll", handleScrollkOutside);

    return () => {
      document.removeEventListener("scroll", handleScrollkOutside);
    };
  }, []);

  useEffect(() => {
    isOpen &&
      // data.length === 0 && 
      setShouldFetchChance(true);
  }, [isOpen])

  useEffect(() => {
    setShouldFetchChance(true);
  }, [])

  return (
    <div
      ref={dropdownRef}
      className={`${styles.select_item_box_step} flex_align_center_item`}
    >
      <label htmlFor="" className="">
        {title}
      </label>
      <select
        className={`${styles.select2} ${styles.select2_hidden_accessible}`}
        data-select2-id={1}
        tabIndex={-1}
        aria-hidden="true"
      >
        <option value="" data-select2-id={3}>
          {value}
        </option>
      </select>
      <span
        className={`select2 ${styles.select2_container_step}`}
        dir="ltr"
        data-select2-id={2}
        style={{ width: "100%" }}
        onClick={handleClickSelectoption}
      >
        <span className={`${styles.selection}`}>
          <span
            className={`${styles.select2_selection} select2_selection_single`}
            role="combobox"
            aria-haspopup="true"
            aria-expanded="false"
            tabIndex={0}
            aria-labelledby="select2-g0q1-container"
          >
            <span
              className={styles.select2_selection__rendered}
              id="select2-g0q1-container"
              role="textbox"
              aria-readonly="true"
            // title="Chọn người dùng"
            >
              {value}
            </span>
            <span
              className={styles.select2_selection__arrow}
              role="presentation"
            >
              <b role="presentation" />
            </span>
          </span>
        </span>
        {isOpen && <ChanceDropDownDataStep data={data} value={value} setValue={setValue} setKeyword={setKeyword} keyword={keyword} />}
      </span>
      {isLoading && isOpen ? (
        <Spin
          style={{
            margin: "auto",
            // width: "100%",
            display: "block",
            padding: "5px",
            height: "100%",
          }}
        />
      ) : null}
    </div>
  );
}
