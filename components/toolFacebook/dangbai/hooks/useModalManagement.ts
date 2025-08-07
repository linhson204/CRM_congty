import { useState } from "react";
import { Post, ShowReplyModal } from "../types";

export const useModalManagement = () => {
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState<number | null>(null);
  const [showReplyModal, setShowReplyModal] = useState<ShowReplyModal | null>(
    null
  );

  // Content states
  const [postContent, setPostContent] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [replyContent, setReplyContent] = useState("");

  // Current post for comment
  const [currentPostForComment, setCurrentPostForComment] =
    useState<Post | null>(null);

  // Image states
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [isDeletingImage, setIsDeletingImage] = useState<number | null>(null);

  // Modal handlers
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPostContent("");
    setSelectedImages([]);
    setUploadedImages([]);
    setIsUploadingImages(false);
    setIsDeletingImage(null);
  };

  const handleComment = (post: Post) => {
    setShowCommentModal(post.id);
    setCurrentPostForComment(post);
    setCommentContent("");
  };

  const handleCloseCommentModal = () => {
    setShowCommentModal(null);
    setCurrentPostForComment(null);
    setCommentContent("");
  };

  const handleReply = (
    postId: number,
    commentId: number,
    replyToAuthor?: string,
    replyId?: any,
    facebookCommentId?: string,
    facebookReplyId?: string
  ) => {
    setShowReplyModal({
      postId,
      commentId,
      replyToAuthor,
      replyId,
      facebookCommentId,
      facebookReplyId,
    });
    setReplyContent("");
  };

  return {
    // Modal states
    showModal,
    showCommentModal,
    showReplyModal,

    // Content states
    postContent,
    setPostContent,
    commentContent,
    setCommentContent,
    replyContent,
    setReplyContent,

    // Current post
    currentPostForComment,

    // Image states
    selectedImages,
    setSelectedImages,
    uploadedImages,
    setUploadedImages,
    isUploadingImages,
    setIsUploadingImages,
    isDeletingImage,
    setIsDeletingImage,

    // Handlers
    handleOpenModal,
    handleCloseModal,
    handleComment,
    handleCloseCommentModal,
    handleReply,
    setShowReplyModal,
  };
};
