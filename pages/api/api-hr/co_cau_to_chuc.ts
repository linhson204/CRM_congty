import axios from "axios";

import { getToken } from "./token";
const COOKIE_KEY = "token_base365";
const url = process.env.NEXT_PUBLIC_BASE_URL;

/* -------------------------------------- LIST ----------------------------------------------*/

export const OrganizationalStructureData = async () => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/organizationalStructure/detailInfoCompany`,
      {},
      {
        headers: {
          authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

export const ChildCompanyData = async () => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/qlc/company/child/list`,
      {},
      {
        headers: {
          authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};


export const PostionCharData = async () => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/organizationalStructure/listPosition`,
      {},
      {
        headers: {
          authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

export const SealAndSignatureData = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/organizationalStructure/listEmpUseSignature`,
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

export const SignatureList = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/organizationalStructure/listSignatureLeader`,
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

export const LeaderBiographyList = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/organizationalStructure/listInfoLeader`,
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

/* -------------------------------------- DETAIL ----------------------------------------------*/

export const OrganizationalStructureDetail = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/organizationalStructure/description`,
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

export const PostionCharDetail = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/organizationalStructure/missionDetail`,
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

export const LeaderBiographyDetail = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/organizationalStructure/leaderDetail`,
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

export const EmpStatusDetail = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/organizationalStructure/listEmUntimed`,
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

export const OrganizationalStructureUpdate = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/organizationalStructure/updateDescription`,
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

export const PostionCharUpdate = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/organizationalStructure/updateMission`,
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

export const LeaderBiograpphyUpdate = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/organizationalStructure/updateLeaderDetail`,
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

export const SealAndSignatureDelete = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/organizationalStructure/deleteEmpUseSignature`,
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

export const DeleteSignature = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/organizationalStructure/deleteSignature`,
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


export const HidePosition = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/organizationalStructure/updatePosition`,
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

/* -------------------------------------- UPLOAD ----------------------------------------------*/

export const UploadSignature = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/organizationalStructure/uploadSignature`,
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

export const AddUserSignature = async (formData: FormData) => {
  try {
    const isToken = getToken(COOKIE_KEY);
    const response = await axios.post(
      `${url}api/hr/organizationalStructure/updateEmpUseSignature`,
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
