import Cookies from "js-cookie";
import { base_url } from "../service/function";
import styles from "./chat.module.css";
import { useEffect, useState } from "react";

export default function SelectBoxInputNhomKhcon({ title = "", infoCus,list_gr_child }: any) {
  const [value, setValue] = useState();
  return (
    <div
      className={`${styles.business_assistant_item} ${styles.business_assistant_item_gray}`}
    >
      <label className={styles.lbl_title}>{title}</label>
      <select
        id="form_business_assistant_group_parent"
        className={`${styles.select2} ${styles.business_assistant_item_select} ${styles.select2_hidden_accessible}`}
        // tabIndex={-1}
        aria-hidden="true"
        defaultValue={infoCus.group_id}
        value={value}
        onChange={(value: any) => setValue(value)}
      >
        {list_gr_child?.map((item: any, index: any) => (
          <option value={item?.gr_id} key={index}>
            {item?.gr_name}
          </option>
        ))}
      </select>
    </div>
  );
}
