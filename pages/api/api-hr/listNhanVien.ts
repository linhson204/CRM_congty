import axios from 'axios';
import { getToken } from "./token";
const COOKIE_KEY = "token_base365";
const url = process.env.NEXT_PUBLIC_BASE_URL2

/* -------------------------------------- LIST ----------------------------------------------*/

export const EmployeeList = async (formData:FormData) => {
    try {
    const isToken = getToken(COOKIE_KEY);
        const response = await axios.post(`${url}api/qlc/managerUser/listAll`,
        formData,
            {
                headers: {
                    authorization: `Bearer ${isToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
    }
};
