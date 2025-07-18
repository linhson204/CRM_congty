import axios from "axios";
import Cookies from "js-cookie";

export const axiosApiCall = axios.create({
  baseURL: "https://api.timviec365.vn:9015/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosApiCall.interceptors.request.use(
  (config) => {
    let accessToken = Cookies.get("token_base365");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
