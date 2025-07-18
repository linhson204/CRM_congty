import { useEffect, useState } from "react";
import styles from "./order_detail_action.module.css";
import { axiosQLC } from "@/utils/api/api_qlc";

export default function AppointEmpDetailDropDown({
  valueSelect,
  setValueSelect,
}: any) {
  // 20/12/2023 - Thiết kế trên figma không rõ ràng 
  // Có thể phải chỉnh sửa
  // const data: any[] = ["Tất cả", "Chờ duyệt", "Đã duyệt", "Hủy bỏ"];
  const [data, setData] = useState([])

  useEffect(() => {
    axiosQLC
    .post('/managerUser/listUser')
    .then(res => {
      res?.data?.data.hasOwnProperty('data') &&
      setData(["Tất cả", ...res.data.data.data.map(item => (
        `${item.ep_id} - ${item.userName}`
      ))])
    })
    .catch(err => console.log(err))
    return () => { };
  }, [])

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
