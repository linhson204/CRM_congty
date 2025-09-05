import axios from "axios";

// const URL_API = "https://socket.hungha365.com:4000/api";
// const URL_API = "http://192.168.0.123:5000";
const URL_API = "https://socket.hungha365.com:4000/api/groups/";

export const getGroupData = async (user_id, group_name, limit, page, user_status) => {
    try {
        const response = await axios.post(`${URL_API}/get_data_group`, {
            user_id,
            group_name,
            limit,
            page,
            user_status
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi đăng bài", error);
        throw error;
  }
};

export default getGroupData;