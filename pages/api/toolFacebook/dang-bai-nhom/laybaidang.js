import axios from "axios";

// const URL_API = "https://socket.hungha365.com:4000/api";
// const URL_API = "http://192.168.0.123:5000";
const URL_API = "https://socket.hungha365.com:4000/api/postGroup";

export const getPostGroup = async (group_link, crm_id, user_id) => {
    try {
        const response = await axios.post(`${URL_API}/getPost`, {
            group_link,
            crm_id,
            user_id
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy bài đăng", error);
        throw error;
  }
};

export default getPostGroup;