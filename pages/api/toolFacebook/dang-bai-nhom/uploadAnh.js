import axios from "axios";

// const URL_API = "https://socket.hungha365.com:4000/api";
// const URL_API = "http://192.168.0.123:5000";
const URL_API = "https://socket.hungha365.com:4000/api/apiThanh";

export const uploadImage = async (user_id, file_name) => {
    try {
        const formData = new FormData();
        // formData.append("type", type);
        if (user_id) formData.append("user_id", user_id);
        if (file_name) formData.append(file_name);
        const response = await axios.post(`${URL_API}/upload_file`, formData);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi đăng bài", error);
        throw error;
  }
};

export default uploadImage;