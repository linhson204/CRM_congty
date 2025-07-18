import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import { useRouter } from "next/router";
import { base_url } from "../service/function";
const Cookies = require("js-cookie");

interface MyProps {
  data: any;
  value: any;
  handleChange: any;
  stt?: any;
  cusId: any;
  type:any;
}

const SelectDataInputBox: React.FC<MyProps> = ({
  data,
  value,
  handleChange,
  stt,
  cusId,
  type,
}) => {

  const [name, setName] = useState();
  const handleChangeApi = async (e: any, data: any) => {
    const url = `${base_url}/api/crm/customerdetails/editCustomer`;
    setName(e.target.value);
    const formData = new FormData();
    formData.append("status", e.target.value);
    formData.append("type", type);
    formData.append("cus_id", cusId);

    const headers = {
      Authorization: `Bearer ${Cookies.get("token_base365")}`,
    };

    const config = {
      method: "POST",
      headers: headers,
      body: formData,
    };
    try {
      const response = await fetch(url, config);
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  const dataStatus = [];
  useEffect(() => {
    // fetchDataDetail();
  }, [stt]);
  //dataStatus la thay doi duoc
  return (
    <>
      {dataStatus && (
        <select
          onChange={(e: any) => {
            handleChangeApi(e, data);
          }}
          value={name?name:value}
          // defaultValue={dataStatus?.status?.info}
          // value={dataStatus?.status?.info}
          style={{ border: 0 }}
        >
          {/* <option>
            {data?.filter((e: any) => e?.stt_id === stt)[0]?.stt_name ||
              "Chưa cập nhật"}
          </option> */}
          <option value={0}> Chưa cập nhật</option>

          {data?.map((item: any, index: number) => {
            if (item?.stt_id == value) {
              return (
                <option
                  style={{
                    display: item.status !== 0 ? "block" : "none",
                    background: "rgb(76, 91, 212)",
                    color: "#fff",
                  }}
                  key={index}
                  value={item.stt_id}
                >
                  {item.stt_name}
                </option>
              );
            } else {
              return (
                <option
                  style={{ display: item.status !== 0 ? "block" : "none" }}
                  key={index}
                  value={item.stt_id}
                >
                  {item.stt_name}
                </option>
              );
            }
          })}
        </select>
      )}
    </>
  );
};

export default SelectDataInputBox;
