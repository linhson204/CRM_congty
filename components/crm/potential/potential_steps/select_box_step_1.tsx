import { useEffect, useRef, useState } from "react";
import styles from "../potential_steps/potential_main.module.css";
import PotentialDropDownDataStep1 from "./select_box_dropdown1_data";

export default function PotentialSelectBoxStep1({
  title = "",
  value = "Chọn điều kiện",
  placeholder = "",
  data = [],
  handleSelectChange,
}: any) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedValue, setSelectedValue] = useState('Chọn điều kiện');

  const handleChange = (value) => {
    setSelectedValue(value);
    handleSelectChange(value);
  }
  const handleClickSelectoption = (selectedItem: string) => {
    handleSelectChange(selectedItem);
    setIsOpen(false);
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
    document.addEventListener("scroll", handleScrollkOutside);

    return () => {
      document.removeEventListener("scroll", handleScrollkOutside);
    };
  }, []);

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
        onChange={(e) => handleChange(e.target.value)}
        value={selectedValue}
      >
        <option>Chọn điều kiện</option>
        {data.map((item, index) => (

          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <span
        className={`select2 ${styles.select2_container_step}`}
        dir="ltr"
        data-select2-id={2}
        style={{ width: "100%" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`${styles.selection}`}>
          <span
            className={`${styles.select2_selection} select2_selection_single`}
            role="combobox"
            aria-haspopup="true"
            aria-expanded={isOpen ? "true" : "false"}
            tabIndex={0}
            aria-labelledby="select2-g0q1-container"
          >
            <span
              className={styles.select2_selection__rendered}
              id="select2-g0q1-container"
              role="textbox"
              aria-readonly="true"
            >
              {value}
            </span>
            <span className={styles.select2_selection__arrow} role="presentation">
              <b role="presentation" />
            </span>
          </span>
        </span>
        {isOpen && (
          <PotentialDropDownDataStep1
            data={["Chọn điều kiện", ...data]}
            value={value}
            selectedValue={value}
            handleSelectChange={handleClickSelectoption}
          />
        )}
      </span>
    </div>
  );
}
