import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import styles from "@/components/crm/potential/potential.module.css";
import createPostGroup from "@/pages/api/toolFacebook/dang-bai-nhom/dangbainhom";
import uploadAnh from "@/pages/api/toolFacebook/dang-bai-nhom/uploadAnh";
// import getGroupData from "@/pages/api/toolFacebook/danhsachnhom/laydatagr";
import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import {
  FaLock,
  FaUserCircle,
  FaUserTag,
  FaVideo
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoImages } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { TfiFaceSmile } from "react-icons/tfi";
import LoadingDialog from "../../components/LoadingDialog";
import UserListIndexBar from "../../components/UserListIndexBar";
import CommentPostPopup from "../popup/CommentPost";
import style from "./post.module.css";

interface Post {
  id: number;
  userId?: string;
  groupId?: number;
  userName?: string;
  time?: string;
  content?: string;
  imageUrls?: string[];
  likes?: number;
  favorites?: number;
  comments?: Comment[];
  shares: number;
}

interface Comment {
  id: number;
  user: string;
  time?: string;
  content: string;
  likes?: number;
}
export default function PostInGroup() {
  const handleCancelVideo = (index: number) => {
    setVideoPreviews((prev) => prev.filter((_, idx) => idx !== index));
    setVideoFiles((prev) => prev.filter((_, idx) => idx !== index));
  };
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const router = useRouter();
  // const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const { accountId, Grid } = router.query;

  // State mới cho bài đăng
  const [posts, setPosts] = useState<Post[]>([]);
  const [groupsLink, setGroupsLink] = useState<string[]>([])
  const [test, setTest] = useState<any>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImages, setNewPostImages] = useState<any[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [idCmtBox, setIdCmtBox] = useState<number | null>(null);
  // Like states
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [likeAnimations, setLikeAnimations] = useState<Set<number>>(new Set());
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const [groupData, setGroupData] = useState<any[]>([]);
  const [uploadImg, setUploadImg] = useState<any[]>([]);
  // popup comment
  const [showComment, setShowComment] = useState(false);
  const savedData = JSON.parse(localStorage.getItem("userProfile"));
  const savedGroupData = JSON.parse(localStorage.getItem("GroupsMultiPost"));
  const [showLoading, setShowLoading] = useState(false);

  let crmID = Cookies.get("userID");
  if (!crmID) {
    console.warn("CRM userID cookie is missing!");
    crmID = "defaultID"; // fallback value, replace with your logic
  }

  useEffect(() => {
    setGroupsLink(savedGroupData.map(group => group.link))
  }, []);

  useEffect(() => {
    setHeaderTitle("TOOL FACEBOOK - Đăng bài nhóm");
    setShowBackButton(true);
    setCurrentPath(`/toolfacebook/tham-gia-nhom/${accountId}/123`);
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  // phan trang
  const totalPages = Math.ceil(groupData?.length / itemsPerPage);
  const goToPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goToNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const HandlePostSubmit = async () => {
    if (!newPostContent.trim() && newPostImages.length === 0) return;

    // Lưu biến tạm các data để reset UI
    const currentContent = newPostContent;
    const currentImages = [...newPostImages];
    const currentVideos = [...videoPreviews];
    const currentUploadImg = [...uploadImg];
    const currentVideoFiles = [...videoFiles];

    // Reset UI
    setNewPostContent("");
    setNewPostImages([]);
    setVideoPreviews([]);
    setUploadImg([]);
    setVideoFiles([]);
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (videoInputRef.current) videoInputRef.current.value = "";

    // Gọi API chuyển dạng file
    let MediaUpload = [];
    if (currentUploadImg.length > 0 || currentVideoFiles.length > 0) {
      MediaUpload = await uploadAnh(currentUploadImg);
    }
    const fileMap = MediaUpload.map((img) => img.savedName);

    // Set params, grouplink test
    const params = {
      group_link: groupsLink,
      // group_link: `groups/1569887551087354`,
      content: `${currentContent}`,
      files: fileMap,
    };

    await createPostGroup("post_to_group", accountId, params, crmID, "true");
  };

  const handleImageIconClick = () => {
    imageInputRef.current?.click();
  };

  const handleVideoIconClick = () => {
    videoInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files);
    setUploadImg((prev) => [...prev, ...files]);
    const previews: any[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const objectUrl = URL.createObjectURL(file);
      if (file.type.startsWith("image/")) {
        previews.push({ type: "image", url: objectUrl });
      } else if (file.type.startsWith("video/")) {
        previews.push({ type: "video", url: objectUrl });
      } else if (file.type === "application/pdf") {
        previews.push({ type: "pdf", url: objectUrl });
      } else if (file.name.endsWith(".doc") || file.name.endsWith(".docx")) {
        previews.push({ type: "doc", name: file.name, url: objectUrl });
      }
    }
    setNewPostImages((prevImgs) => [...prevImgs, ...previews]);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const previews: string[] = [];
      const fileArr: File[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        fileArr.push(file);
        previews.push(URL.createObjectURL(file));
      }
      setVideoFiles(fileArr);
      setVideoPreviews(previews);
    }
  };


  const hardReload = () => {
    setShowLoading(true);
    setTimeout(() => window.location.reload(), 1000);
  };

  const HandleCancelUpload = (index: number) => {
    setNewPostImages((prev) => prev.filter((_, idx) => idx !== index));
    setUploadImg((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Tool Facebook</title>
        <meta name="description" content="Quản lý và đăng bài lên Facebook" />
      </Head>
      <div className={styleHome.main} ref={mainRef}>
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}></div>
              <div
                className={`${styles.form_add_potential} ${style.PostWrapper}`}
              >
                <CommentPostPopup
                  isOpen={showComment}
                  onClose={() => setShowComment(false)}
                  idCmtBox={idCmtBox}
                ></CommentPostPopup>
                <div className={style.postsContainer}>
                  <div className={style.postsHeader}>
                    <h2 className={style.groupTitle}>
                      Đăng bài nhiều nhóm
                    </h2>
                  </div>
                  <div className={style.createPostContainer}>
                    <div
                      className={`${style.postInputContainer} ${style.BlockColumn}`}
                    >
                      <div className={`${style.BlockRow}`}>
                        <div>
                          <FaUserCircle className={style.userAvatar} />
                        </div>
                        <div className={`${style.BlockColumn}`}>
                          <div className={style.postGrName}>
                            {savedData.account.name}
                          </div>
                          <div
                            className={`${style.BlockRow} ${style.postGrState}`}
                          >
                            <div className={style.postGrStateIc}>
                              <FaLock
                                style={{ color: "rgb(0, 0, 0, 0.6)" }}
                              ></FaLock>
                            </div>
                            <p>{"Riêng tư"}</p>
                          </div>
                        </div>
                      </div>
                      <textarea
                        className={style.postInput}
                        placeholder="Bạn viết gì đi..."
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                      />
                      <input
                        type="file"
                        accept="video/*"
                        multiple
                        style={{ display: "none" }}
                        ref={videoInputRef}
                        onChange={handleVideoChange}
                      />
                      {videoPreviews.length > 0 && (
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap",
                          }}
                        >
                          {videoPreviews.map((vid, idx) => (
                            <div
                              key={idx}
                              style={{
                                position: "relative",
                                display: "inline-block",
                              }}
                            >
                              <MdCancel
                                style={{
                                  position: "absolute",
                                  top: 8,
                                  right: 8,
                                  color: "#f00",
                                  cursor: "pointer",
                                  zIndex: 2,
                                }}
                                onClick={() => handleCancelVideo(idx)}
                              />
                              <video
                                src={vid}
                                controls
                                width={400}
                                style={{ borderRadius: "8px" }}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*,application/pdf,.doc,.docx"
                        multiple
                        style={{ display: "none" }}
                        ref={imageInputRef}
                        onChange={handleImageChange}
                      />
                      {newPostImages.length > 0 && (
                        <div className={style.postImagePreview}>
                          {newPostImages.map((file, idx) => (
                            <div
                              key={idx}
                              style={{
                                position: "relative",
                                display: "inline-block",
                                background: "#f5f6fa",
                                borderRadius: 10,
                                boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
                                padding: "14px 16px 14px 54px",
                                margin: "0 10px 10px 0",
                                minWidth: 260,
                                maxWidth: 350,
                              }}
                            >
                              <MdCancel
                                className={style.cancelImage}
                                style={{
                                  position: "absolute",
                                  top: 10,
                                  right: 10,
                                  color: "#f00",
                                  cursor: "pointer",
                                  zIndex: 2,
                                }}
                                onClick={() => HandleCancelUpload(idx)}
                              />
                              {file.type === "image" && (
                                <img
                                  src={file.url}
                                  alt={`Preview ${idx + 1}`}
                                  style={{
                                    maxWidth: "270px",
                                    maxHeight: "270px",
                                    borderRadius: "8px",
                                  }}
                                />
                              )}
                              {file.type === "video" && (
                                <video
                                  src={file.url}
                                  controls
                                  width={270}
                                  style={{ borderRadius: "8px" }}
                                />
                              )}
                              {file.type === "pdf" && (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <span
                                    style={{ position: "absolute", left: 16 }}
                                  >
                                    <svg
                                      width="32"
                                      height="32"
                                      viewBox="0 0 24 24"
                                      fill="#e74c3c"
                                    >
                                      <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm7 7V3.5L18.5 9H13z" />
                                    </svg>
                                  </span>
                                  <div style={{ flex: 1 }}>
                                    <div
                                      style={{
                                        fontWeight: 500,
                                        fontSize: 15,
                                        color: "#222",
                                      }}
                                    >
                                      {file.name}
                                    </div>
                                    <div
                                      style={{ fontSize: 12, color: "#888" }}
                                    >
                                      PDF Document
                                    </div>
                                    <a
                                      href={file.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        fontSize: 12,
                                        color: "#1877f2",
                                        textDecoration: "underline",
                                      }}
                                    >
                                      Xem trước
                                    </a>
                                  </div>
                                </div>
                              )}
                              {(file.type === "doc" ||
                                file.type === "docx") && (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <span
                                    style={{ position: "absolute", left: 16 }}
                                  >
                                    <svg
                                      width="32"
                                      height="32"
                                      viewBox="0 0 24 24"
                                      fill="#2a5caa"
                                    >
                                      <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm7 7V3.5L18.5 9H13z" />
                                    </svg>
                                  </span>
                                  <div style={{ flex: 1 }}>
                                    <div
                                      style={{
                                        fontWeight: 500,
                                        fontSize: 15,
                                        color: "#222",
                                      }}
                                    >
                                      {file.name}
                                    </div>
                                    <div
                                      style={{ fontSize: 12, color: "#888" }}
                                    >
                                      Word Document
                                    </div>
                                    <a
                                      href={file.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        fontSize: 12,
                                        color: "#1877f2",
                                        textDecoration: "underline",
                                      }}
                                    >
                                      Tải xuống
                                    </a>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      {videoPreview && (
                        <video src={videoPreview} controls width={400}></video>
                      )}
                      <div
                        id="fileInput"
                        className={`${style.BlockRow} ${style.postFileInput}`}
                      >
                        <p>Thêm vào bài viết của bạn</p>
                        <div
                          className={`${style.BlockRow} ${style.postInputIcContainer}`}
                        >
                          <IoImages
                            style={{ color: "green" }}
                            className={style.postInputIc}
                            onClick={handleImageIconClick}
                          />
                          <FaVideo
                            style={{ color: "orange" }}
                            className={style.postInputIc}
                            onClick={handleVideoIconClick}
                          />
                          <FaUserTag
                            style={{ color: "blue" }}
                            className={style.postInputIc}
                          ></FaUserTag>
                          <FaLocationDot
                            style={{ color: "red" }}
                            className={style.postInputIc}
                          ></FaLocationDot>
                          <TfiFaceSmile
                            style={{ color: "yellow" }}
                            className={style.postInputIc}
                          ></TfiFaceSmile>
                          <HiDotsHorizontal
                            style={{ color: "rgb(0, 0, 0, 0.3)" }}
                            className={style.postInputIc}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={style.postActions}>
                      <button
                        className={style.postButton}
                        onClick={() => {
                          HandlePostSubmit();
                          setShowLoading(true);
                        }}
                        disabled={
                          !newPostContent.trim() &&
                          newPostImages.length === 0 &&
                          videoPreviews.length === 0
                        }
                      >
                        Đăng
                      </button>
                    </div>
                  </div>
                  <div className={`${style.postsHeader} ${style.BlockRow}`}>
                    <h2 className={style.groupTitle}>
                      DANH SÁCH NHÓM SẼ ĐĂNG BÀI:
                    </h2>
                  </div>
                  <div className={style.postsList}>
                    {savedGroupData.map((group) => (
                      <div className={style.GroupsPostedContainer}>
                        {group.name}
                      </div>
                    ))}
                  </div>
                  <UserListIndexBar
                    currentPage={currentPage}
                    totalPages={totalPages}
                    goToPrev={goToPrev}
                    goToNext={goToNext}
                    goToPage={goToPage}
                    setItemsPerPage={(itemsPerPage) => {
                      setItemsPerPage(itemsPerPage);
                      setCurrentPage(1);
                    }}
                  ></UserListIndexBar>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoadingDialog
        show={showLoading}
        message="Đang đăng bài..."
        onClose={() => setShowLoading(false)}
      />
    </>
  );
}