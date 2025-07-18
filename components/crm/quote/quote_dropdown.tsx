import { useContext, useState } from "react";
import styles from "@/components/crm/quote/quote.module.css";
import { QuoteContext } from "./quoteContext";

export default function OrderDropDown({ valueSelect, setValueSelect, width, left }: any) {
  // const data: any[] = ["Tất cả", "Bản thảo", "Đàm phán", "Đã gửi", "Chờ xác nhận", "Đồng ý", "Từ chối"];
  const { allStatusString } = useContext(QuoteContext)
  const data: any[] = allStatusString();
  const [hoverItem, setHoverItem] = useState(null)

  // const [valueSelect, setValueSelect] = useState("")
  return (
    <span
      className={`${styles.select2_container_open} ${styles.select2_container} ${styles.select2_container_default} `}
      style={{
        position: "absolute",
        top: 35,
        left: left !== '' ? `-${left + 10}px` : '0', 
        // left: 0,
        zIndex: 10,
        // width: '140%'
        width: width !== '' ? `${width}px` : '100%'
      }}
    >
      <span
        className={`${styles.select2_dropdown} ${styles.select2_dropdown_below}`}
        dir="ltr"
        style={{
          width: "100%",
          display: "block",
          // borderRadius: '10px'
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px'
        }}
      >
        {/* <span
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
        </span> */}
        <span
          className={styles.select2_results}
          style={{
            borderRadius: '10px'
          }}
        >
          <ul
            className={styles.select2_results__options}
            role="tree"
            aria-expanded="true"
            aria-hidden="false"
            style={{
              borderRadius: '10px'
            }}
          >
            {/* <li
              className={`${styles.select2_results__option} ${styles.select2_results__option_highlighted}`}
              style={{
                borderRadius: '10px'
              }}
            >
              {valueSelect}
            </li> */}
            {data?.map((item, i) => (
              <li
                style={{
                  paddingLeft: "18px",
                  paddingBottom: '3px',
                  paddingTop: '3px',
                  borderRadius: '10px'
                }}
                key={i}
                className={`${styles.select2_results__option} ${hoverItem === i ? styles.select2_results__option_highlighted : ''}`}
                onClick={() => { setValueSelect(item) }}
                onMouseEnter={(e) => setHoverItem(i)}
                onMouseLeave={(e) => setHoverItem(null)}
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
