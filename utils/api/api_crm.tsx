import axios from "axios";
import Cookies from "js-cookie";
// const baseURL = "http://localhost:3007/api/crm";
const baseURL = "https://api.timviec365.vn/api/crm";
export const axiosCRM = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    // Authentication: accessToken,
  },
});
axiosCRM.interceptors.request.use((config: any) => {
  let accessToken = Cookies.get("token_base365");
  return { ...config, headers: { Authorization: `Bearer ${accessToken}` } };
});
export const axiosCRMv2 = async (url: string, body: any) => {
  try {
    const formData = new FormData();
    for (let key in body) {
      body[key] && formData.append(`${[key]}`, body[key]);
    }
    const res = await axiosCRM.post(url, formData);
    return res?.data?.data?.data || res?.data?.data || res?.data;
  } catch (error) {
    return error;
  }
};
export const axiosCRMUpfile = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
    // Authentication: accessToken,
  },
});

axiosCRMUpfile.interceptors.request.use((config: any) => {
  let accessToken = Cookies.get("token_base365");
  return { ...config, headers: { Authorization: `Bearer ${accessToken}` } };
});

export const deleteToken = () => {
  Cookies.remove("token_base365");
};
export const checkToken = () => {
  const check = Cookies.get("token_base365");
  if (check) {
    return true;
  }
  return false;
};
