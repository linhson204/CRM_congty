import Cookies from "js-cookie";
import { base_url } from "../service/function";
import styles from "./chat.module.css";
import { useEffect, useState } from "react";
import { Select } from "antd";

export default function SelectBoxInputNguon({
  dataOption = {},
  title = "",
  placeholder = "",
  infoCus,
  setnguon,
}: any) {
  const [valueNguonKK, setvalueNguonKK] = useState<any>(0);

  const ArrNguonKK: any = [
    { name: "Chưa cập nhật", id: 0 },
    { name: "Facebook", id: 1 },
    { name: "Website", id: 3 },
    { name: "Zalo", id: 2 },
    { name: "Dữ liệu bên thứ 3", id: 4 },
    { name: "Khách hàng giới thiệu", id: 5 },
    { name: "Giới thiệu", id: 6 },
    { name: "Chăm sóc khach hàng", id: 7 },
    { name: "Email", id: 8 },
    { name: "Chợt tốt", id: 9 },
  ];
  return (
    <div
      className={`${styles.business_assistant_item} ${styles.business_assistant_item_gray}`}
    >
      <label>{title}</label>
      <Select
        suffixIcon={
          <i style={{ color: "black" }} className="bi bi-caret-down-fill"></i>
        }
        style={{
          width: "100%",
          border: "1px solid black",
          height: 39,
          // borderRadius: 7,
        }}
        id="form_business_assistant_group_parent"
        tabIndex={-1}
        aria-hidden="true"
        value={valueNguonKK || infoCus?.data2?.resoure}
        onChange={(value) => (setnguon(value), setvalueNguonKK(value))}
      >
        {ArrNguonKK?.map((item: any, index: any) => (
          <option value={item?.id} key={index}>
            {item?.name}
          </option>
        ))}
      </Select>
    </div>
  );
}
