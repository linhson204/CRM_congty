import Cookies from "js-cookie";
import { base_url } from "../service/function";
import styles from "./chat.module.css";
import { useEffect, useState } from "react";
import { GetStaticPaths } from "next";
import { Select } from "antd";
import { values } from "lodash";
export async function getStaticPaths() {
  // ... your code here ...
}
export default function SelectBoxInput({
  title = "",
  placeholder = "",
  infoCus,
  settinhtrang,
}: any) {
  const [listStatus, setLisStatus] = useState([]);
  const [valueStt, setvalueStt] = useState<any>(0);
  const getStatus = async () => {
    try {
      const res = await fetch(`${base_url}/api/crm/customerStatus/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({ phone: `${+infoCus?.dien_thoai}` }),
      });
      const data = await res.json();
      setLisStatus(data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getStatus();
  }, []);
  return (
    <div
      className={`${styles.business_assistant_item} ${styles.business_assistant_item_gray}`}
    >
      <label>{title}</label>
      <Select
        id="form_business_assistant_group_parent"
        suffixIcon={
          <i style={{ color: "black" }} className="bi bi-caret-down-fill"></i>
        }
        style={{
          width: "100%",
          border: "1px solid black",
          height: 38.5,
          color: "red",
          // borderRadius: 7,
        }}
        // className={`${styles.select2} ${styles.business_assistant_item_select} ${styles.select2_hidden_accessible}`}
        tabIndex={-1}
        aria-hidden="true"
        placeholder="Tình trạng khách hàng"
        value={valueStt ? valueStt : infoCus?.data2?.status}
        onChange={(value) => (settinhtrang(value), setvalueStt(value))}
        // defaultValue={infoCus?.status?.info}
      >
        {/* <option value="">{infoCus?.status?.detail?.stt_name}</option> */}
        {listStatus?.map((item: any, index: any) => (
          <option value={item?.stt_id} key={index}>
            {item?.stt_name}
          </option>
        ))}
      </Select>
    </div>
  );
}
