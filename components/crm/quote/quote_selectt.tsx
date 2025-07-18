import { useContext, useEffect, useRef, useState } from "react";
import styles from "@/components/crm/quote/quote.module.css";
import OrderDropDown from "./quote_dropdown";
import { QuoteContext } from "./quoteContext";
import sessionStorage from "redux-persist/es/storage/session";
export default function QuoteSelectBox({ title = "", value = "Tất cả" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef(null)
  const [valueSelect, setValueSelect] = useState(value);
  const {setShouldFetchData, statusStrToNum, statusNumToStr} = useContext(QuoteContext)
  const handleClickSelectoption = (e: any) => {
    if (e.target.getAttribute("class") !== styles.select2_search__field) {
      setIsOpen(!isOpen);
    }
  };

  const handleScrollkOutside = (e: any) => {
    // setIsOpen(false);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef?.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("scroll", handleScrollkOutside);

    return () => {
      document.removeEventListener("scroll", handleScrollkOutside);
    };
  }, []);

  const { status, setStatus } = useContext(QuoteContext)

  useEffect(() => {
    // setStatusFromValue(valueSelect)
    setStatus(statusStrToNum(valueSelect))
    setShouldFetchData(true)
  }, [valueSelect])

  useEffect(() => {
    // setValueFromStatus(status)
    setValueSelect(statusNumToStr(status))
  }, [status])

  return (
    <div
      ref={dropdownRef}
      className={`${styles.select_item} flex_align_center_item`}
    >
      <label htmlFor="" className="" ref={labelRef}>
        {title}
      </label>
      <select
        className={`${styles.select2} ${styles.select2_hidden_accessible}`}
        data-select2-id={1}
        tabIndex={-1}
        aria-hidden="true"
      >
        <option value="" data-select2-id={3}>
          {valueSelect}
        </option>
      </select>
      <span
        className={`select2 ${styles.select2_container}`}
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
              title="Tất cả"
            >
              {valueSelect}
            </span>
            <span
              className={styles.select2_selection__arrow}
              role="presentation"
            >
              <b role="presentation" />
            </span>
          </span>
        </span>
        {isOpen && (
          <OrderDropDown
            valueSelect={valueSelect}
            setValueSelect={setValueSelect}
            width={dropdownRef.current ? dropdownRef.current.offsetWidth : ''}
            left={labelRef.current ? labelRef.current.offsetWidth : ''}
          />
        )}
      </span>
    </div>
  );
}
