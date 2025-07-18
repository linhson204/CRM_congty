// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import { hasCookie, setCookie } from "cookies-next";
import { getToken } from "../token";
import jwt from "jsonwebtoken";
const COOKIE_KEY = "token_base365";

export const getHomeData = async () => {
  const isToken = getToken(COOKIE_KEY);
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const response = await axios.post(
      `${url}api/hr/home/getListInfo`,
      {},
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
    );

    return response;
  } catch (err) {

  }
};

export const SignIn = async () => {
  const currentCookie = hasCookie(COOKIE_KEY);
  const currentUrl = process.env.NEXT_PUBLIC_BASE_URL2;
  if (!currentCookie) {
    const body = {
      account: "09898773345",
      password: "123123a",
      type: 2,
    };
    try {
      const res = await axios.post(`${currentUrl}api/qlc/employee/login`, body);
      if (res?.status === 200) {
        const userInfo = res?.data?.data?.data;
        setCookie(COOKIE_KEY, userInfo);
      }
    } catch (error) {}
  }
};

export const CheckLogIn = async () => {
  const currentCookie = hasCookie(COOKIE_KEY);
  console.log(currentCookie);
  return currentCookie;
};

export const getDataAuthentication = async () => {
  try {
    const url = process.env.NEXT_PUBLIC_BASE_URL;
    const isToken = getToken(COOKIE_KEY);
    const decodedToken = jwt.decode(isToken);

    const response = await axios.post(
      `${url}api/hr/setting/getListPermisionUserLogin`,
      {},
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response;
  } catch (error) {}
};
