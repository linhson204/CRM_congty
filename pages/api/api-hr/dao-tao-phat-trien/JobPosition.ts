import axios from "axios";
import { getToken } from "../token";
const COOKIE_KEY = "token_base365";
export const getDataJobPosition = async (page: number, pageSize: number) => {
  const isToken = getToken(COOKIE_KEY);
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const response = await axios.post(
      `${url}api/hr/training/listJob?page` + page + `pageSize` + pageSize,
      { page, pageSize },
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
    );

    return response?.data;
  } catch (err) {
   
  }
};

export const addDataJobPosition = async (formData: FormData) => {
  const isToken = getToken(COOKIE_KEY);
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const response = await axios.post(
      `${url}api/hr/training/createJob`,
      formData,
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

export const deleteDataJobPosition = async (jobId: number) => {
  const isToken = getToken(COOKIE_KEY);
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const response = await axios.post(
      `${url}api/hr/training/jobSoftDelete`,
      { jobId },
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