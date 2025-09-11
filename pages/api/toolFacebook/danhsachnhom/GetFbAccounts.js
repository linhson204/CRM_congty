import axios from "axios";

const URL_API = "https://socket.hungha365.com:4000/api/userFb";
// const URL_API = "http://192.168.0.116:4000/api/userFb/";
// const URL_API = "https://socket.hungha365.com:4000/api/userFb/";

export const getFbAccountsData = async (crm_id, limit, page, username) => {
    try {
        const response = await axios.post(`${URL_API}/getUserFb`, {
            crm_id,
            limit,
            page,
            username,
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi lấy tk", error);
        throw error;
  }
};

export default getFbAccountsData;