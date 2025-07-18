import { Key, useEffect } from "react";
import styles from "../potential/potential.module.css";

export default function CustomerGroupSelectDropdownDataComponent({
  data = [],
  value = " Chọn người dùng",
  setValueOption,
  setValueGroupCustomer,
  placeholder,
}: any) {
  const handleClcikOptions = (item: any) => {
    setValueOption(item?.gr_name);
    setValueGroupCustomer((pre: any) => {
      return {
        ...pre,
        group_cus_parent: item?.gr_id,
        groupParents: item?.gr_id
      };
    });
  };


  useEffect(() => {
    setValueOption(placeholder?.gr_name);
    setValueGroupCustomer((pre: any) => {
      return {
        ...pre,
        group_cus_parent: placeholder?.gr_id,
        groupParents: placeholder?.gr_id
      };
    });
  }, []);

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
            className={styles.select2_results__options}
            role="tree"
            aria-expanded="true"
            aria-hidden="false"
            style={{ textAlign: "left", overflow: "scroll" }}
          >
            <li
              className={`${styles.select2_results__option} ${styles.select2_results__option_highlighted}`}
              onClick={() =>
                handleClcikOptions({
                  gr_id: 0,
                  gr_name: "Chọn nhóm khách hàng",
                })
              }
            >
              {data?.filter((item: any) => item.gr_id === value)[0]?.gr_name
                ? data?.filter((item: any) => item.gr_id === value)[0]?.gr_name
                : "Chọn nhóm khách hàng"}
            </li>
            {data?.map((item: any, i: Key | null | undefined) => (
              <li
                key={i}
                className={`${styles.select2_results__option}}`}
                style={{
                  marginTop: "10px",
                  padding: "5px 0",
                  paddingLeft: "18px",
                }}
                onClick={() => handleClcikOptions(item)}
              >
                {item?.gr_name}
              </li>
            ))}
          </ul>
        </span>
      </span>
    </span>
  );
}
