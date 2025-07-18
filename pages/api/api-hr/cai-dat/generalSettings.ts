import axios from "axios";
import { getToken } from "../token";
const COOKIE_KEY = "token_base365";

export const getDataCompany = async () => {
  const isToken = getToken(COOKIE_KEY);
  const url = process.env.NEXT_PUBLIC_BASE_URL2;
  try {
    const response = await axios.post(
      `${url}api/qlc/company/info`,
      {},
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response?.data;
  } catch (err: any) {
    return err.response;
  }
};

export const updateInfoCompany = async (inputValue) => {
  const isToken = getToken(COOKIE_KEY);
  const url = process.env.NEXT_PUBLIC_BASE_URL2;
  try {
    const response = await axios.post(
      `${url}api/qlc/Company/updateInfoCompany`,
      inputValue,
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
};

export const SettingPermission = async (dataRes) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const isToken = getToken(COOKIE_KEY);
  try {
    const response = await axios.post(
      `${url}api/hr/setting/permision`,
      dataRes,
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response;
  } catch (err: any) {
    return err.response;
  }
};

export const EmployeeInfo = async () => {
  const url = process.env.NEXT_PUBLIC_BASE_URL2;
  const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/qlc/employee/info`,
      {},
      {headers:{Authorization:`Bearer ${isToken}`}}
    )
    return response?.data
  } catch (error) {
    
  }
}

export const UpdateInfoEmployee = async(content, birthday) => {
  const {address, gender, married, phoneTK} = content
  const url = process.env.NEXT_PUBLIC_BASE_URL2;
  const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/qlc/employee/updateInfoEmployee`,
      {address, gender, married, phoneTK, birthday},
      {headers:{Authorization:`Bearer ${isToken}`}}
    )
    return response?.data
  } catch (error) {
    
  }
}

export const GetListPermision = async(formData:FormData) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL2;
  const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/hr/setting/listPermision`,
      formData,
      {headers:{Authorization:`Bearer ${isToken}`}}
    )
    return response?.data
  } catch (error) {
    
  }
}
