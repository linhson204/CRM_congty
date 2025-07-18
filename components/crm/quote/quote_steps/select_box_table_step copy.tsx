import { useContext, useEffect, useRef, useState } from "react";
import styles from "../order.module.css";
import OrderDropDownDataStep from "./select_box_dropdown_data copy";
import { QuoteContext } from "../quoteContext";
import useLoading from "../../hooks/useLoading";
import { Spin } from "antd";
export default function OrderSelectBoxStep({
  title = "",
  value = "Tất cả",
  placeholder = "",
  data = [],
  setValue = () => { },
  setKeyword = () => { },
  keyword = '',
}: any) {
  const { setShouldFetchProd, listProductOptions, shouldFetchProd } = useContext(QuoteContext)
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [addHeight, setAddHeight] = useState(0)
  const [defaultHeight, setDefaultHeight] = useState(33)

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

  // Load trước
  useEffect(() => {
    setShouldFetchProd(true);
  }, [])

  useEffect(() => {
    isOpen &&
      // listProductOptions.length == 0 && 
      setShouldFetchProd(true);
  }, [isOpen])

  useEffect(() => {
    if (shouldFetchProd) {
      startLoading();
    } else {
      stopLoading();
    }
  }, [shouldFetchProd])

  return (
    <div
      ref={dropdownRef}
      className={`${styles.select_item_box_step} flex_align_center_item`}
      style={{
        // position: 'absolute'
        // height: `${defaultHeight + addHeight}px`,
        minHeight: isOpen ? `${33 + addHeight}px` : 0,
        // alignContent: 'flex-start'
        alignItems: 'flex-start'
      }}
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
        className={`select2 ${styles.select3_container_step}`}
        dir="ltr"
        data-select2-id={2}
        style={{
          width: "100%",
          // position: 'absolute',
          overflow: 'visible',
        }}
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
        {isOpen &&
          <OrderDropDownDataStep
            data={data}
            value={value}
            setValue={setValue}
            setKeyword={setKeyword}
            keyword={keyword}
            addParentHeight={setAddHeight}
          />}
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
