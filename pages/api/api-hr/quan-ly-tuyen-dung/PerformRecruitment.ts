import axios from "axios";
import { getToken } from "../token";
const COOKIE_KEY = "token_base365";
export const GetDataListNewActive = async (page: number, pageSize: number) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
    const isToken = getToken(COOKIE_KEY)

  try {
    const response = await axios.post(
      `${url}api/hr/recruitment/listNewActive?page` +
        page +
        `pageSize = ${pageSize}`,
      { page, pageSize },
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response;
  } catch (err: any) {
    return err.response
  }
};

export const GetTotalCandi = async () => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
    const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/hr/recruitment/totalCandi`,
      {},
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response;
  } catch (err: any) {
    return err.response
  }
};

export const GetListSchedule = async (page: number, pageSize: number) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
    const isToken = getToken(COOKIE_KEY)

  try {
    const response = await axios.post(
      `${url}api/hr/recruitment/listSchedule?page` +
        page +
        `pageSize = ${pageSize}`,
      { page, pageSize },
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response;
  } catch (err: any) {
    return err.response
  }
};

export const GetListNews = async (
  page: number,
  pageSize: number,
  title: string,
  formDate,
  toDate
) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
    const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/hr/recruitment/listNews?page` +
        page +
        `pageSize = ${pageSize}`,
      { page, pageSize, title, formDate, toDate },
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response;
  } catch (err: any) {
    return err.response
  }
};
export const SoftDeleteNews = async (newsId: number) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
    const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/hr/recruitment/softDeleteNews`,
      { newsId },
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response;
  } catch (err: any) {
    return err.response
  }
};

export const DetailNews = async (recruitmentNewsId: any) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
    const isToken = getToken(COOKIE_KEY)
  try {
    const response: any = await axios.post(
      `${url}api/hr/recruitment/detailNews`,
      { recruitmentNewsId },
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response.data;
  } catch (err: any) {
    return err.response
  }
};

export const setAsTemplate = async (newsId: any) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
    const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/hr/recruitment/createSampleNews`,
      { newsId },
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response;
  } catch (err: any) {
    return err.response
  }
};

export const getDataAddress = async () => {
  const url = process.env.NEXT_PUBLIC_BASE_URL_DATA;
    const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/getData/city`,
      {},
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response;
  } catch (err: any) {
    return err.response
  }
};

export const getDataUser = async () => {
  const url = process.env.NEXT_PUBLIC_BASE_URL2;
    const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/qlc/managerUser/listAll`,
      {},
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response;
  } catch (err: any) {
    return err.response
  }
};

export const GetDataCategory = async () => {
  const url = process.env.NEXT_PUBLIC_BASE_URL_DATA;
    const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/getData/timviec/category`,
      {},
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response;
  } catch (err: any) {
    return err.response
  }
};

export const CreateNewsRecruitment = async (content, selectedOption) => {
  const {
    title,
    address,
    number,
    timeStart,
    timeEnd,
    jobDetail,
    probationaryTime,
    moneyTip,
    jobDes,
    interest,
    jobRequire,
  } = content;
  const {
    posApply,
    cityId,
    cateId,
    salaryId,
    wokingForm,
    recruitmentId,
    jobExp,
    degree,
    gender,
    memberFollow,
    hrName,
  } = selectedOption;
  const url = process.env.NEXT_PUBLIC_BASE_URL;
    const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/hr/recruitment/createNews`,
      {
        title, posApply, cityId, address, cateId, salaryId, number, timeStart, timeEnd,
        jobDetail, wokingForm, probationaryTime, moneyTip, jobDes, interest,
        recruitmentId, jobExp, degree, gender, jobRequire, memberFollow, hrName,
      },
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
      
    );
    return response;
  } catch (err: any) {
    return err.response
  }
};

export const EditNewsRecruitment = async(recruitmentNewsId,content, selectedOption) => {
  const {
    title,
    address,
    number,
    timeStart,
    timeEnd,
    jobDetail,
    probationaryTime,
    moneyTip,
    jobDes,
    interest,
    jobRequire,
  } = content;
  const {
    posApply,
    cityId,
    cateId,
    salaryId,
    wokingForm,
    recruitmentId,
    jobExp,
    degree,
    gender,
    memberFollow,
    hrName,
  } = selectedOption;
  
  const url = process.env.NEXT_PUBLIC_BASE_URL;
    const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/hr/recruitment/updateNews`,
      {
        title, posApply, cityId, address, cateId, salaryId, number, timeStart, timeEnd,
        jobDetail, wokingForm, probationaryTime, moneyTip, jobDes, interest,
        recruitmentId, jobExp, degree, gender, jobRequire, memberFollow, hrName, recruitmentNewsId
      },
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
      
    );
    return response;
  } catch (err: any) {
    return err.response
  }
}
