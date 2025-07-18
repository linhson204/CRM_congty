import axios from "axios";
import { axiosApiCall } from "./apiCall";
const Cookies = require("js-cookie");


export const getServiceStatus = async () => {
  try {
    let res = await axios.post("https://skvideocall.timviec365.vn/api/getServiceStatus");
    if (!res.hasError) {
      return res.data.sfuAvailable;
    } else {
      return false;
    }
  } catch (error) {
    console.log("ERR", error);
    return false;
  }
}

export const getIdChatFromPhoneNum = async (phoneNumber) => {
  try {
    let res = await axios({
      method: "post",
      url: "https://api.timviec365.vn/api/qlc/company/getIdQlcByPhone",
      data: {
        phone: phoneNumber.toString()
      },
      headers: { "Content-Type": "application/json" }
    });
    if (!res.hasError) {
      console.log("IDCHAT", res.data.data.data._id)
      return res.data.data.data._id;
    } else {
      return -1;
    }
  } catch (error) {
    console.log("ERR", error);
    return -1;
  }
}

export const getConversationId = async (userId, contactId) => {
  try {
    console.log("axiosApiCall", axiosApiCall);
    console.log("userId:", userId, "contactId:", contactId);
    const res = await axiosApiCall.post(
      "/conversations/CreateNewConversation",
      {
        userId: Number(userId),
        contactId: Number(contactId),
      }
    );
    if (res.data.data && res.data.data.conversationId) {
      return res.data.data.conversationId;
    }
    return -1;
  } catch (error) {
    console.log("ERR", error);
    return -1;
  }
}

export const getInfoQR = async (idUser) => {
  try {
    // const data = await axios({
    //   method: "post",
    //   url: "http://210.245.108.202:9000/api/users/GetInfoUser",
    //   data: {
    //     ID: idUser
    //   },
    // });
    const data = await axiosApiCall.post("/users/GetInfoUser", {
      ID: idUser
    });

    if (!data.hasError) {
      return data?.data?.data?.user_info;
    } else {
      console.log("ERR?", data.hasError);
    }
  } catch (e) {
    console.log("E", e);
  }
}

export const storeCall = async (line_kd, cus_phone, startDate, endDate, duration, ep_id) => {
  try {
    const data = await axios({
      method: "post",
      url: "https://voip.timviec365.vn/api/statical_call",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      },
      data: {
        line_number: line_kd,
        cus_phone: cus_phone,
        start: startDate,
        end: endDate,
        duration: duration,
        ep_id: ep_id,
        from: "appchat365"
      }
    })
  } catch (error) {
    console.log("ERR", error);
  }
}
