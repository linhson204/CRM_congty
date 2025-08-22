import axios from "axios";

// const URL_API = "https://socket.hungha365.com:4000/api";
// const URL_API = "http://192.168.0.123:5000";
const URL_API = "https://socket.hungha365.com:4000/api/apiThanh";

export const getGroupData = async (group_name, limit, page, user_id) => {
    try {
        const response = await axios.post(`${URL_API}/get_groups_data`, {
            group_name,
            limit,
            page,
            user_id
        }, {
            headers: {
                "X-API-Key": "123456ABCDEF",
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi đăng bài", error);
        throw error;
  }
};

export default getGroupData;