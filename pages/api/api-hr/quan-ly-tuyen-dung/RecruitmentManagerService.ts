import axios from "axios";
import { getToken } from "../token";
const COOKIE_KEY = "token_base365";
export const GetDataRecruitment = async (
  page: number,
  pageSize: number,
  name: string
) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/hr/recruitment/getRecruitment?page` +
        page +
        `pageSize = ${pageSize}`,
      { page, pageSize, name },
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

export const AddDataRecruitment = async (formData: any) => {
  const { nameProcess, applyFor,  listStage} = formData
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const isToken = getToken(COOKIE_KEY)

   try {
      const response = await axios.post(
        `${url}api/hr/recruitment/createRecruitment`,
        {nameProcess, applyFor, listStage},
        {
          headers: {
            Authorization: `Bearer ${isToken}`,
          },
        }
      )
      return response
   } catch (error: any) {
    return error.response
   }
}

export const DeleteDataRecruitment = async (recruitmentId: number) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const isToken = getToken(COOKIE_KEY)

  try {
    const response = await axios.post(
      `${url}api/hr/recruitment/softDelete`,
      { recruitmentId },
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response;
  } catch (error: any) {
    return error.response
  }
};

export const UpdateDataRecruitment = async (
  recruitId: number,
  formData: any
) => {
  const { nameProcess, applyFor } = formData;
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/hr/recruitment/updateRecruitment`,
      { recruitId, nameProcess, applyFor },
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

export const DataRecruitmentStage = async (recruitmentId: number) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/hr/recruitment/getStage`,
      { recruitmentId },
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response;
  } catch (error: any) {
    return error.response
  }
};

export const AddDataRecruitmentStage = async (
  recruitmentId: number,
  formData: any
) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const { nameStage, posAssum, target, time, des } = formData;

 const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/hr/recruitment/createStage`,
      { recruitmentId, nameStage, posAssum, target, time, des },
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

export const DeleteDataRecruitmentStage = async (
  stageRecruitmentId: number
) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
 const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/hr/recruitment/softDeleteStage`,
      { stageRecruitmentId },
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

export const EditDataRecruitmentStage = async (
  stageRecruitmentId,
  formData
) => {
  const { nameStage, posAssum, target, time, des } = formData
 
  const url = process.env.NEXT_PUBLIC_BASE_URL;
 const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/hr/recruitment/updateStage`,
      {stageRecruitmentId, nameStage, posAssum, target, time, des},
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
