import { useState } from "react";
import styles from "./bill_detail_action.module.css";

export default function BillDetailDropDown({
  valueSelect,
  setValueSelect,
}: any) {
  const data: any[] = ["Hello", "Test", "Hi"];

  // const [valueSelect, setValueSelect] = useState("")
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
          />
        </span>
        <span className={styles.select2_results}>
          <ul
            className={styles.select2_results__options}
            role="tree"
            aria-expanded="true"
            aria-hidden="false"
          >
            <li
              className={`${styles.select2_results__option} ${styles.select2_results__option_highlighted}`}
            >
              {valueSelect}
            </li>
            {data?.map((item, i) => (
              <li
                style={{ paddingLeft: "18px" }}
                key={i}
                className={`${styles.select2_results__option} `}
                onClick={() => setValueSelect(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </span>
      </span>
    </span>
  );
}
