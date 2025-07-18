import { useEffect, useRef, useState } from "react";
import styles from "./order_detail_action.module.css";
import AppointEmpDetailDropDown from "./appointment_emp_detail_dropdown";
export default function AppointEmpDetailSelectBox({ title = "", value = "Tất cả", setValue = (value) => { }, num = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [valueSelect, setValueSelect] = useState(value)
  const handleClickSelectoption = (e: any) => {
    if (e.target.getAttribute("class") !== styles.select2_search__field) {
      setIsOpen(!isOpen);
    }
  };

  // Cần đưa vào 1 hàm dùng chung cho nhiều nơi
  useEffect(() => {
    if (valueSelect === "Tất cả") {
      setValue(0)
    } else {
      const match = valueSelect.match(/^(\d+) -/);
      setValue(match ? Number(match[1]) : 0);
    }
  }, [valueSelect])

  const handleScrollkOutside = (e: any) => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef?.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside)
    document.addEventListener("scroll", handleScrollkOutside);

    return () => {
      document.removeEventListener("scroll", handleScrollkOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`${styles.select_item} flex_align_center_item`}
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
        {isOpen && <AppointEmpDetailDropDown valueSelect={valueSelect} setValueSelect={setValueSelect} />}
      </span>
    </div>
  );
}
