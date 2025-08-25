import axios from "axios";

// const URL_API = "https://socket.hungha365.com:4000/api";
// const URL_API = "http://192.168.0.123:5000";
const URL_API = "https://socket.hungha365.com:4000/api/apiThanh";

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

export const uploadFile = async (user_id, images) => {
    const form = new FormData();
    form.append('file', fs.createReadStream(images)); // đường dẫn tới file local
    if (user_id) formData.append("user_id", user_id);
    try {
        const res = await axios.post(`${URL_API}/upload_file`, form, {
        headers: form.getHeaders()
        });
        console.log(res.data);
    } catch (err) {
        console.error(err);
    }
}

export default uploadFile;
