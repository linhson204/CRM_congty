import axios from "axios";

const URL_API = "https://socket.hungha365.com:4000/api";
// const URL_API = "http://192.168.0.116:4000/api";
// const URL_API = "https://socket.hungha365.com:4000/api";
const FormData = require('form-data');
// const fs = require('fs');

export const uploadAnh = async (imageFiles) => {
    const formData = new FormData();
    imageFiles.forEach((file) => {
        formData.append("media", file); // 'image' là key
    });

    try {
        const response = await axios.post(`${URL_API}/media`, formData);

        if (response.status !== 200) {
        throw new Error(response.statusText || "Upload failed");
        }

        return response.data;
    } catch (err) {
        console.error("API Error (uploadImage):", err.message);
        throw err;
    }
    };

export default uploadAnh;
