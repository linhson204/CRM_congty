import axios from "axios";
import Cookies from "js-cookie";
// const baseURL = "http://localhost:3002/api/qlc";
const baseURL = "https://api.timviec365.vn/api/qlc";

export const axiosQLC = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosQLC.interceptors.request.use((config: any) => {
  let accessToken = Cookies.get("token_base365");
  return { ...config, headers: { Authorization: `Bearer ${accessToken}` } };
});

export const axiosQLCv2 = async (url: string, body: any) => {
  try {
    const formData = new FormData();
    for (const key in body) {
      formData.append(`${key}`, body[key]);
    }
    const res = await axiosQLC.post(url, formData);
    return res.data?.data || res.data;
  } catch (error) {
    console.log("axiosTV", error);
  }
};
