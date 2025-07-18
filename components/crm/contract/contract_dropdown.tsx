import styles from "./contract.module.css";

export default function ContractDropDown() {
  const data: any[] = [];
  return (
    <span
      className={`${styles.select2_container_open} ${styles.select2_container} ${styles.select2_container_default} `}
      style={{ position: "absolute", top: 35, left: 0 , zIndex:10}}
    >
      <span
        className={`${styles.select2_dropdown} ${styles.select2_dropdown_below}`}
        dir="ltr"
        style={{ width: "266.703px", display:"block" }}
      >
        <span className={`${styles.select2_search} ${styles.select2_search__dropdown}`}>
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
              Tất cả
            </li>
            {data?.map((item, i)=>(
                <li key={i} className={`${styles.select2_results__option} ${styles.select2_results__option_highlighted}`}>
                    {item}
                </li>
            ))}
          </ul>
        </span>
      </span>
    </span>
  );
}
