// components/PostForm.tsx hoặc pages/post.tsx
import axios from "axios";

const URL_API = "http://localhost:4000/api";

export const createComment = async (commentData) => {
  try {
    const response = await axios.post(`${URL_API}/comment`, commentData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi bình luận bài", error);
    throw error;
  }
};

export const getCommentByPostId = async (postId, userId, facebookId) => {
  try {
    const payload = {
      postId: postId,
      userId: userId,
      facebookId: facebookId,
    };

    const response = await axios.post(`${URL_API}/comment/post`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy comment của bài đăng", error);
    throw error;
  }
};

export const createReplyComment = async (
  facebookCommentId,
  replyCommentData
) => {
  try {
    const response = await axios.post(
      `${URL_API}/comment/${facebookCommentId}/feedback`,
      replyCommentData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi phản hồi bình luận bài", error);
    throw error;
  }
};
