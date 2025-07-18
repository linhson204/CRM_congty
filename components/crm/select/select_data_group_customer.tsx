import { useEffect, useRef, useState } from "react";
import styles from "../potential/potential.module.css";
import CustomerGroupSelectDropdownData from "./dropdown_data_group_customer";
import { useApi } from "../hooks/useApi";
const Cookies = require("js-cookie");
export default function CustomerGroupSelect({
  title = "",
  value = "Tất cả",
  placeholder,
  data,
  setValueGroupCustomer,
  cusId,
  type,
  showTop
}: any) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [valueOption, setValueOption] = useState();
  const [valueFilter, setValueFilter] = useState("");

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
    document.addEventListener("click", handleClickOutside);
    // document.addEventListener("scroll", handleScrollkOutside);

    return () => {
      // document.removeEventListener("scroll", handleScrollkOutside);
    };
  }, []);
  let lists_child = [];
  data?.map((item) => {
    if (item?.lists_child) {
      item?.lists_child?.map((item) => {
        lists_child?.push(item);
      });
    }
  });
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
        value={valueOption}
      >
        <option value="" data-select2-id={3}>
          {/* {value} */}
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
              className={`${styles.select2_selection__rendered} value_options`}
              id="select2-g0q1-container"
              // title="Chọn người dùng"
            >
              {valueOption ||
                data?.filter((item: any) => item.gr_id === placeholder)[0]
                  ?.gr_name ||
                lists_child?.filter(
                  (item: any) => item.gr_id === placeholder
                )[0]?.gr_name ||
                "Chưa cập nhật"}
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
          <CustomerGroupSelectDropdownData
            cus_id={cusId}
            data={data}
            value={value}
            setValueOption={setValueOption}
            setValueGroupCustomer={setValueGroupCustomer}
            type={type}
            setValueFilter={setValueFilter}
            valueFilter={valueFilter}
            showTop={showTop}
            setIsOpen={setIsOpen}
          />
        )}
      </span>
    </div>
  );
}
