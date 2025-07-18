import axios from "axios";
import { getToken } from "../token";
const COOKIE_KEY = "token_base365";
export const GetDataInfringes = async (
  page: any,
  pageSize: any,
  type: any,
  keyWords: any
) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
    const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.get(
      `${url}api/hr/welfare/listInfinges?page=${page}&pageSize=${pageSize}&type=${type}&keyWords=${keyWords}`,
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response.data;
  } catch (err) {}
};

export const AddInfringes = async (mergedObject) => {
  console.log(mergedObject, 1);
  const {
    created_by,
    infringe_at,
    infringe_name,
    infringe_type,
    list_user,
    list_user_name,
    number_violation,
    price,
    regulatory_basis,
    resion,
  } = mergedObject;

  const url = process.env.NEXT_PUBLIC_BASE_URL;
    const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/hr/welfare/addInfinges`,
      {
        created_by,
        infringe_at,
        infringe_name,
        infringe_type,
        list_user,
        list_user_name,
        number_violation,
        price,
        regulatory_basis,
        resion,
      },
      {
        headers: {
          Authorization: `Bearer ${isToken}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const AddInfringesGroup = async (mergedObject) => {
  const {
    created_by,
    dep_id,
    dep_name,
    infringe_at,
    infringe_name,
    infringe_type,
    number_violation,
    price,
    regulatory_basis,
    resion,
  } = mergedObject;

  const url = process.env.NEXT_PUBLIC_BASE_URL;
    const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.post(
      `${url}api/hr/welfare/addInfingesGroup`,
      {
        created_by,
        dep_id,
        dep_name,
        infringe_at,
        infringe_name,
        infringe_type,
        number_violation,
        price,
        regulatory_basis,
        resion,
      },
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

export const UpdateInfringes = async (id, mergedObject) => {
  const {
    infringe_name,
    regulatory_basis,
    list_user,
    list_user_name,
    created_by,
    infringe_at,
    infringe_type,
    number_violation,
    depId,
    depName
  } = mergedObject;

  const url = process.env.NEXT_PUBLIC_BASE_URL;
    const isToken = getToken(COOKIE_KEY)
  try {
    const response = await axios.put(
      `${url}api/hr/welfare/updateInfinges`,
      {
        id,
        infringe_name,
        regulatory_basis,
        list_user,
        list_user_name,
        created_by,
        infringe_at,
        infringe_type,
        number_violation,
        depId,
        depName
      },
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