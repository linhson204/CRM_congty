import axios from "axios";
import Cookies from "js-cookie";
const baseURL = "https://api.timviec365.vn/api/qlc";
export const axiosQLCSite = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosQLCSite.interceptors.request.use((config: any) => {
  let accessToken = Cookies.get("token_base365");
  return { ...config, headers: { Authorization: `Bearer ${accessToken}` } };
});
