import axios from "axios";
import { getToken } from "./token";
const COOKIE_KEY = "token_base365";
const url = process.env.NEXT_PUBLIC_BASE_URL;
const url1 = process.env.NEXT_PUBLIC_BASE_URL2;

/* -------------------------------------- LIST ----------------------------------------------*/

export const SalaryVolatilityList = async (formData:FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/personalChange/getListSalary`,
      formData,
      {
        headers: {
          authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

export const PlanningAppointmentList = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/personalChange/getListAppoint`,
      formData,
      {
        headers: {
          authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

export const WorkingRotaionList = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/personalChange/getListTranferJob`,
      formData,
      {
        headers: {
          authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

export const PayrollDownList = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/personalChange/getListQuitJob`,
      formData,
      {
        headers: {
          authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

export const ShiftList = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.get(`${url1}api/qlc/shift/list`, {
      headers: {
        authorization: `Bearer ${isToken}`,
      },
      params: formData,
    });
    return response.data;
  } catch (error) {}
};

export const OutJobList = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/personalChange/getListQuitJobNew`,
      formData,
      {
        headers: {
          authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

/* -------------------------------------- ADD ----------------------------------------------*/

export const AddPlanningAppointment = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/personalChange/updateAppoint`,
      formData,
      {
        headers: {
          authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

export const AddWorkingRotation = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/personalChange/updateTranferJob`,
      formData,
      {
        headers: {
          authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

export const AddPayrollDown = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/personalChange/updateQuitJob`,
      formData,
      {
        headers: {
          authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

export const AddOutJob = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/personalChange/updateQuitJobNew`,
      formData,
      {
        headers: {
          authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

/* -------------------------------------- DELETE ----------------------------------------------*/

export const DeletePlanningAppointment = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/personalChange/deleteAppoint`,
      formData,
      {
        headers: {
          authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

export const DeleteWorkingRotation = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/personalChange/deleteTranferJob`,
      formData,
      {
        headers: {
          authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

export const DeletePayrollDown = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/personalChange/deleteQuitJob`,
      formData,
      {
        headers: {
          authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

export const DeleteOutJob = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/personalChange/deleteQuitJobNew`,
      formData,
      {
        headers: {
          authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};
