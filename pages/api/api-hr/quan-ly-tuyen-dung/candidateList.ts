import axios from "axios";
import { getToken } from "../token";
const COOKIE_KEY = "token_base365";
const url = process.env.NEXT_PUBLIC_BASE_URL;
const url1 = process.env.NEXT_PUBLIC_BASE_URL2;

/* -------------------------------------- LIST ----------------------------------------------*/

export const CandidateList = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/recruitment/listCandi`,
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

export const ProcessList = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/recruitment/getListProcess`,
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

export const ProcessAdd = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/recruitment/createProcess`,
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

export const CandidateAdd = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/recruitment/createCandidate`,
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

export const AddGetJob = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/recruitment/addCandidateGetJob`,
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

export const AddFailJob = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/recruitment/FailJob`,
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

export const AddCancelJob = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/recruitment/cancelJob`,
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

export const AddContactJob = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/recruitment/contactJob`,
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

export const AddInterview = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/recruitment/scheduleInter`,
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

export const CandidateDelete = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/recruitment/softDeleteCandi`,
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

export const ProcessDelete = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/recruitment/deleteProcess`,
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
/* -------------------------------------- UPDATE ----------------------------------------------*/

export const ProcessUpdate = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/recruitment/updateProcess`,
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

export const CandidateUpdate = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/recruitment/updateCandidate`,
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

/* -------------------------------------- DETAILS ----------------------------------------------*/

export const AllDetails = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/recruitment/detailCandidateV2`,
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


export const GetJobDetails = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/recruitment/detailCandidateGetJob`,
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

export const FailJobDetails = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/recruitment/detailCandidateFailJob`,
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

export const CancelJobDetails = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/recruitment/detailCandidateCancelJob`,
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

export const ContactJobDetails = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/recruitment/detailCandidateContactJob`,
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
