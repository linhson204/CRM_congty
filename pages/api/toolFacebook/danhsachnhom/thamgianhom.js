import axios from "axios";

// const URL_API = "https://socket.hungha365.com:4000/api";
// const URL_API = "http://192.168.0.123:5000";
const URL_API = "https://socket.hungha365.com:4000/api/common_api";

export const joinGroup = async (type, user_id, params, crm_id) => {
    try {
        const response = await axios.post(`${URL_API}/send_command`, {
            type,
            user_id,
            params,
            crm_id
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tham gia nhóm", error);
        throw error;
  }
};

export default joinGroup;