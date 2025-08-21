import axios from "axios";

// const URL_API = "https://socket.hungha365.com:4000/api";
// const URL_API = "http://192.168.0.123:5000";
const URL_API = "http://localhost:4000/api/apiThanh";

export const createPostGroup = async (type, user_id, params, crm_id) => {
  try {
    const formData = new FormData();
    formData.append("type", type);
    if (user_id) formData.append("user_id", user_id);
    if (params) formData.append("params", params);
    if (crm_id) formData.append("crm_id", crm_id);
    const response = await axios.post(`${URL_API}/send_command`, formData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi đăng bài", error);
    throw error;
  }
};

// export const getPostbyUserId = async (userId, facebookId, page = 1) => {
//   try {
//     let URI = `${URL_API}/post?userId=${userId}&facebookId=${facebookId}&page=${page}`;
//     const response = await axios.get(URI, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Lỗi khi lấy đăng bài", error);
//     throw error;
//   }
// };
