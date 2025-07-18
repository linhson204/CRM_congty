import axios from "axios";
import Cookies from "js-cookie";
const baseURL = "https://api.timviec365.vn/api/crm";
export const axiosCRMCall = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    // Authentication: accessToken,
  },
});
axiosCRMCall.interceptors.request.use((config: any) => {
  let accessToken = Cookies.get("token_base365");
  return { ...config, headers: { Authorization: `Bearer ${accessToken}` } };
});
