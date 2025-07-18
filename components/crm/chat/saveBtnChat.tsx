import axios from "axios";
import styles from "./chat.module.css";
import Cookies from "js-cookie";
import { useContext } from "react";
import { UpdateTLKD } from "../context/updateTlkd";
import { useRouter } from "next/router";
import queryString from 'query-string';

export default function SaveBtnChat({
  tinhtrang,
  phone,
  nguon,
  nhomcha,
  nhomCon,
  name,
  content_call,
  email,
  desCription,
  refName,
  handleOpenChatBody,
  add = 0,
  hisContent,
  cusId
}: any) {
  const { updateTLKD, setUpdateTLKD } = useContext<any>(UpdateTLKD);
  const router = useRouter();
  const save_his = async (data, cusId) => {
    try {
      for (let i = 0; i < data.length; i++) {
        await axios.post(`https://api.timviec365.vn/api/crm/customerdetails/addHistoryCall`, {
          content_call: data[i].content_call,
          cus_id: cusId,
          total_call: data[i].total_call,
        }, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
        });
      }
    } catch (error) {
      console.log("error", error)
    }

  }

  const postData = async (body) => {
    const token = Cookies.get("token_base365");
    const url = "https://api.timviec365.vn/api/crm/customer/addCustomer/";
    const res = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res?.data?.data?.saveCS
  };

  const updateData = async (body) => {
    const token = Cookies.get("token_base365");
    const url = "https://api.timviec365.vn/api/crm/customerdetails/editCustomer";
    await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const handleSave = async () => {
    try {

      const formData = new FormData();
      email && formData.append("email", email);
      formData.append("name", name || "Chưa cập nhật");
      phone && formData.append("phone_number", phone);
      content_call && formData.append("content_call", content_call);
      nhomcha && formData.append("group_id", nhomCon || nhomcha);
      desCription && formData.append("description", desCription);
      nguon && formData.append("resoure", nguon);
      tinhtrang && formData.append("status", tinhtrang);
      if (add == 0) {
        if (cusId) {
          formData.append("cus_id", cusId);
          await updateData(formData)
          // window.alert("Cập nhật thành công")
          // handleOpenChatBody()
          const queryParams = {
            ...router.query
          }
          delete queryParams.id
          delete queryParams.name
          delete queryParams.abc
          const queryStringParams = queryString.stringify(queryParams);
          window.location.href = `/crm/customer/list?${queryStringParams}`
        }

      } else {
        const dataCS = await postData(formData)
        // if (add == 1 && dataCS?.cus_id && hisContent?.length) {
        //   save_his(hisContent, dataCS?.cus_id)
        // }
        window.alert("Thêm thành công")
        handleOpenChatBody()
      }


      setUpdateTLKD(!updateTLKD);



    } catch (error) {
      console.log("error", error)
      window.alert("Có lỗi xảy ra")
    }
  };
  return (
    <div
      className={`${styles.business_assistant_item} ${styles.business_assistant_save}`}
    >
      <button onClick={handleSave} id={`${styles.business_assistant_save}`}>
        Lưu
      </button>
    </div>
  );
}
