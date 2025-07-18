import Cookies from "js-cookie";
import { base_url } from "../service/function";
import styles from "./chat.module.css";
import { useEffect, useState } from "react";
import { Input } from "antd";

export default function SelectBoxInputNhomKh({
  title = "",
  infoCus,
  listGr
}: any) {

    const [value,setValue] = useState()
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
        defaultValue={infoCus.group_id?.detail?.gr_name}
        onChange={(value:any) => setValue(value)}

      >
        {/* <option value={infoCus.group_id?.info}> {infoCus.group_id?.detail?.gr_name}</option> */}
        {listGr?.map((item: any, index: any) => (
          <option value={item?.gr_id} key={index}>
            {item?.gr_name}
          </option>
        ))}
      </select>
    </div>
  );
}
