import axios from "axios";

const URL_API = "https://socket.hungha365.com:4000/api";
// const URL_API = "http://192.168.0.116:4000/api/userFb/";
// const URL_API = "https://socket.hungha365.com:4000/api/userFb/";

export const getFbAccountsData = async (crm_id, limit, page) => {
    try {
        const response = await axios.post(`${URL_API}/device/accounts/all`, {
            crm_id,
            limit,
            page,
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi lấy tk", error);
        throw error;
  }
};

export default getFbAccountsData;