// ContractSelectBoxStep.js
import React, { useEffect, useRef, useState } from "react";
import styles from "../../potential/potential.module.css";
import ContractDropDownDataStep from "./select_box_dropdown_send";

export default function ContractSelectBoxStep({
  title = "",
  value,
  placeholder,
  data,
  setSelectedDepartment,
  setSelectedValue,
  setDataFromSelectDataBox,
}: any) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [valOption, setValOption] = useState<any>();

  const handleClickSelectoption = (e: any) => {
    if (e.target.getAttribute("class") !== styles.select2_search__field) {
      setIsOpen(!isOpen);
    }
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

  useEffect(() => {
    const newData = data?.filter((item) => {
      if (placeholder === "Chọn nhân viên") {
        return value === item?.ep_id;
      }
      if (placeholder === "Chọn phòng ban") {
        return value === item?.dep_id;
      }
      if (placeholder === "Chọn chức vụ") {
        return value === item?._id;
      }
    });
    setValOption(newData?.[0]);
  }, [value]);

  const handleChangeDepartment = (selectedDepartment: string) => {
    const newData = data.find(
      (item: any) => item.department === selectedDepartment
    );
    setSelectedData(newData);
    setSelectedDepartment(selectedDepartment);
  };

  return (
    <div
      ref={dropdownRef}
      className={`${styles.select_item_box_step} flex_align_center_item`}
    >
      <label htmlFor="" className="">
        {title}
      </label>

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
          >
            <span
              className={styles.select2_selection__rendered}
              id="select2-g0q1-container"
              role="textbox"
              aria-readonly="true"
            >
              {valOption ? (
                <>
                  {placeholder === "Chọn chức vụ"
                    ? valOption?.name
                    : placeholder === "Chọn nhân viên"
                    ? valOption?.ep_name
                    : placeholder === "Chọn phòng ban"
                    ? valOption?.dep_name
                    : null}
                </>
              ) : (
                placeholder
              )}
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
          <ContractDropDownDataStep
            setSelectedDepartment={setSelectedDepartment}
            data={data}
            value={value}
            // selectedData={selectedData}
            placeholder={placeholder}
            setSelectedValue={setSelectedValue}
            setDataFromSelectDataBox={setDataFromSelectDataBox}
          />
        )}
      </span>
    </div>
  );
}
