import axios from "axios";

// const URL_API = "http://123.24.206.25:4000/api";
const URL_API = "http://localhost:4000/api";
// const URL_API = "https://backend-crm-skmr.onrender.com/api";

export const uploadImage = async (imageFiles) => {
  const formData = new FormData();
  imageFiles.forEach((file) => {
    formData.append("image", file); // 'image' là key
  });

  try {
    const response = await axios.post(`${URL_API}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (response.status !== 200) {
      throw new Error(response.statusText || "Upload failed");
    }

    return response.data;
  } catch (err) {
    console.error("API Error (uploadImage):", err.message);
    throw err;
  }
};

export const getImageByLink = async (link) => {
  try {
    const response = await axios.get(`${URL_API}/image`, {
      params: { link },
    });
    return response.data;
  } catch (err) {
    console.error("API Error (getImageByLink):", err.message);
    throw err;
  }
};

export const deleteImage = async (imageId) => {
  try {
    const response = await axios.delete(`${URL_API}/image/${imageId}`);
    console.log("Xóa thành công");
    return response.data;
  } catch (err) {
    console.error("API Error (deleteImage):", err.message);
    throw err;
  }
};
