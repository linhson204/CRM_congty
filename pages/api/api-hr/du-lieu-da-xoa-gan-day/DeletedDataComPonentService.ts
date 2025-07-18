import axios from "axios";
import { getToken } from "../token";
const COOKIE_KEY = "token_base365";

export const getDataDeleteComponent = async(keyword) => {
    const isToken = getToken(COOKIE_KEY)
    const url = process.env.NEXT_PUBLIC_BASE_URL;
    try {
        const response = await axios.post(
          `${url}api/hr/forceDelete/listDetailDelete`,
          {keyword},
          {
            headers: {
              Authorization: `Bearer ${isToken}`,
            },
          }
        );

        return response?.data;
      } catch (err: any) {
        return err.response
      }
}

export const forceDelete = async(handleData) => {
  const isToken = getToken(COOKIE_KEY)
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  try{
    const response = await axios.post(
      `${url}api/hr/forceDelete/delete`,
        handleData,
          {
            headers: {
              Authorization: `Bearer ${isToken}`,
            },
          }
    )
    return response
  }
  catch (error: any){
    return error.response
  }
}

export const restoreDelete = async(handleData) => {
  const isToken = getToken(COOKIE_KEY)
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  try{
    const response = await axios.post(
      `${url}api/hr/forceDelete/restoreDelete`,
        handleData,
          {
            headers: {
              Authorization: `Bearer ${isToken}`,
            },
          }
    )
    return response
  }
  catch (error: any){
    return error.response
  }
}