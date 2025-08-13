// components/PostForm.tsx hoặc pages/post.tsx
import { useState } from "react";
import axios from "axios";

const URL_API = "http://123.24.206.25:4000/api";
// const URL_API = "http://localhost:4000/api";
// const URL_API = "https://backend-crm-skmr.onrender.com/api";

export const createPost = async (postData) => {
  try {
    const response = await axios.post(`${URL_API}/post`, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi đăng bài", error);
    throw error;
  }
};

export const getPostbyUserId = async (userId, facebookId) => {
  try {
    let URI = `${URL_API}/post?userId=${userId}&facebookId=${facebookId}`;
    const response = await axios.get(URI, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy đăng bài", error);
    throw error;
  }
};
