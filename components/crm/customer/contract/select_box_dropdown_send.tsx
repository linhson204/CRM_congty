import { Key, useState } from "react";
import styles from "../../potential/potential.module.css";

export default function ContractDropDownDataStep({
  data,
  setSelectedDepartment,
  placeholder,
  setSelectedValue,
  setDataFromSelectDataBox,
}: any) {
  const handleOptionSelect = (selectedItem: any, dataTable: any) => {
    if (placeholder === "Chọn nhân viên") {
      setSelectedValue((prev)=>{
        if(prev){
          return [...prev, selectedItem?.ep_id]
        }
        return [selectedItem?.ep_id]
      });
      setSelectedDepartment(selectedItem?.ep_id);
    }
    if (placeholder === "Chọn phòng ban") {
      setSelectedDepartment(selectedItem?.dep_id);
    }
    if (placeholder === "Chọn chức vụ") {
      setSelectedDepartment(selectedItem?._id);
    }
  };


  return (
    <span
      className={`${styles.select2_container_open} ${styles.select2_container} ${styles.select2_container_default} `}
      style={{ position: "absolute", top: 35, left: 0, zIndex: 10 }}
    >
      <span
        className={`${styles.select2_dropdown} ${styles.select2_dropdown_below}`}
        dir="ltr"
        style={{ width: "100%", display: "block" }}
      >
        <span
          className={`${styles.select2_search} ${styles.select2_search__dropdown}`}
        >
          <input
            className={styles.select2_search__field}
            type="search"
            tabIndex={0}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
            role="textbox"
            style={{ height: "34px" }}
          />
        </span>
        <span className={styles.select2_results}>
          <ul
            style={{ height: data?.length>0 ? "100px" : "auto", overflow: "scroll" }}
            className={styles.select2_results__options}
            role="tree"
            aria-expanded="true"
            aria-hidden="false"
          >
            <li
              className={`${styles.select2_results__option} ${styles.select2_results__option_highlighted}`}
              onClick={() => setSelectedDepartment(placeholder)}
            >
              {placeholder}
            </li>
            {data?.map((item: any, i: Key | null | undefined) => (
              <li
                key={i}
                className={styles.select2_results__option}
                style={{
                  marginTop: "10px",
                  padding: "5px 0",
                  paddingLeft: "18px",
                }}
                onClick={() => handleOptionSelect(item, data)}
              >
                {placeholder === "Chọn chức vụ"
                  ? item?.name
                  : placeholder === "Chọn nhân viên"
                  ? item?.ep_name
                  : placeholder === "Chọn phòng ban"
                  ? item?.dep_name
                  : null}
              </li>
            ))}
          </ul>
        </span>
      </span>
    </span>
  );
}
