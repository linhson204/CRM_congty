import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import styles from "@/components/crm/potential/potential.module.css";
import { useWebSocket } from "@/components/toolFacebook/dangbai/hooks/useWebSocket";
import createPostGroup from "@/pages/api/toolFacebook/dang-bai-nhom/dangbainhom";
import uploadAnh from '@/pages/api/toolFacebook/dang-bai-nhom/uploadAnh';
// import getGroupData from "@/pages/api/toolFacebook/danhsachnhom/laydatagr";
import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from 'react';
import { BiLike, BiShare } from "react-icons/bi";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaComment, FaLock, FaRegComment, FaUserCircle, FaUserTag, FaVideo } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoIosShareAlt, IoMdRefresh } from "react-icons/io";
import { IoImages } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { TfiFaceSmile } from "react-icons/tfi";
import CommentPostPopup from "../popup/CommentPost";
import style from './post.module.css';

interface Group {
    id: number;
    GroupName: string;
    GroupState: string;
    Member: number;
    isJoin: number;
}

interface Account {
    id: number;
    name: string;
    groups: Group[];
}

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
export default function Detail() {
    const handleCancelVideo = (index: number) => {
        setVideoPreviews((prev) => prev.filter((_, idx) => idx !== index));
        setVideoFiles((prev) => prev.filter((_, idx) => idx !== index));
    }
    const mainRef = useRef<HTMLDivElement>(null);
    const { isOpen } = useContext<any>(SidebarContext);
    const { setHeaderTitle, setShowBackButton, setCurrentPath }: any = useHeader();
    const router = useRouter();
    const itemsPerPage = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const { accountId, Grid } = router.query;
    const [account, setAccount] = useState<Account | null>(null);
    const [groups, setGroups] = useState<Group>();
    const [uname, setUname] = useState('');
    
    // State mới cho bài đăng
    const [viewMode, setViewMode] = useState<'groups' | 'posts'>('groups');
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [test, setTest] = useState<any>([]);
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostImages, setNewPostImages] = useState<any[]>([]);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);
    const ui = "gianvu17607@gmail.com";
    const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
    const [videoFiles, setVideoFiles] = useState<File[]>([]);
    const [idCmtBox, setIdCmtBox] = useState<number | null>(null);

    const websocket = useWebSocket();
    const [groupData, setGroupData] = useState<any[]>([]);
    const [Sendposts, setSendPosts] = useState<Post[]>([]);
    const [uploadImg, setUploadImg] = useState<any[]>([]);
    // popup comment
    const [showComment, setShowComment] = useState(false);

    let crmID = Cookies.get("userID");
    if (!crmID) {
        console.warn('CRM userID cookie is missing!');
        crmID = "defaultID"; // fallback value, replace with your logic
    }
    // useEffect(() => {
    // async function fetchData() {
    //     const res = await getGroupData("", "15", "", "123");
    //     setGroupData(res); // lưu vào state
    // }
    // fetchData();
    // }, []);

    useEffect(() => {
        setHeaderTitle("Tool Facebook - Đăng bài nhóm");
        setShowBackButton(true);
        setCurrentPath(`/toolfacebook/tham-gia-nhom/${accountId}/[id]test`);
    }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

    useEffect(() => {
        if (isOpen) {
            mainRef.current?.classList.add("content_resize");
        } else {
            mainRef.current?.classList.remove("content_resize");
        }
    }, [isOpen]);

    useEffect(() => {
        if (account) {
            setUname(account.name);
        } else {
            setUname('Loading...');
        }
    }, [account]);

    // phan trang
    const totalPages = Math.ceil(posts?.length / itemsPerPage);
    const goToPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
    const goToNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

    const filteredPage = posts?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Gọi API lấy danh sách bài đăng cũ
    useEffect(() => {
        fetch('http://localhost:3003/api/posts')
        .then(response => response.json())
        .then(data => {
            setTest(data);
            setPosts(data.data || data); // ✅ Set posts ngay khi có data
        })
        .catch(error => console.error('Error:', error));
    }, []); // ✅ Chỉ chạy một lần

    // useEffect để theo dõi thay đổi của test
    useEffect(() => {
        if (test && test.data) {
        setPosts(test.data);
        }
    }, [test]); // ✅ Chạy khi test thay đổi

    const handleViewPosts = () => {
    };

    const handlePostSubmit = async () => {
        if (!newPostContent.trim() && newPostImages.length === 0) return;
        
        // Save current values before clearing
        const currentContent = newPostContent;
        const currentImages = [...newPostImages];
        const currentVideos = [...videoPreviews];
        const currentUploadImg = [...uploadImg];
        const currentVideoFiles = [...videoFiles];
        
        // Clear UI immediately
        setNewPostContent('');
        setNewPostImages([]);
        setVideoPreviews([]);
        setUploadImg([]);
        setVideoFiles([]);
        if (imageInputRef.current) imageInputRef.current.value = '';
        if (videoInputRef.current) videoInputRef.current.value = '';
        
        const newPost: Post = {
            id: 123,
            userId: "gianvu17607@gmail.com",
            userName: uname,
            groupId: groups?.id,
            time: `Vừa xong`,
            content: currentContent,
            imageUrls: currentImages.length > 0 ? currentImages : undefined,
            likes: 0,
            // comments: 0,
            shares: 0
        };

        // api upload anh
        const testUpload = await uploadAnh(currentUploadImg);
        const fileMap = testUpload.map(img => img.savedName)

        // send
        if (websocket && websocket.readyState === WebSocket.OPEN) {
            const params = {"group_link": `groups/${Grid}`, "content": `${currentContent}`, "files": fileMap};
            const postData = {
                type: "post_to_group",
                user_id: "test1",
                postId: newPost.id.toString(),
                crm_id: crmID,
                params: params,
                to: "B22623688",
                attachments: fileMap, // Đưa images vào attachments thay vì images
            };
            websocket.send(JSON.stringify(postData));
        }

        const params = {"group_link": `groups/${Grid}`, "content": `${currentContent}`, "files": fileMap};
        await createPostGroup(
            "post_to_group",
            "test1",
            params,
            crmID
        );
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
            if (file.type.startsWith('image/')) {
                previews.push({ type: 'image', url: objectUrl });
            } else if (file.type.startsWith('video/')) {
                previews.push({ type: 'video', url: objectUrl });
            } else if (file.type === 'application/pdf') {
                previews.push({ type: 'pdf', url: objectUrl });
            } else if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
                previews.push({ type: 'doc', name: file.name, url: objectUrl });
            }
        }
        setNewPostImages((prevImgs) => [...prevImgs, ...previews]);
    };

    const [videoPreview, setVideoPreview] = useState<string | null>(null);

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
        showLoadingDialog();
        setTimeout(() => window.location.reload(), 1000);
    }

    const handleCancelUpload = (index: number) => {
        setNewPostImages((prev) => prev.filter((_, idx) => idx !== index));
        setUploadImg((prev) => prev.filter((_, idx) => idx !== index));
    }

    const showLoadingDialog = () => {
        const loadingHTML = `
            <div id="loading-overlay" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
            ">
                <div style="
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    text-align: center;
                ">
                    <div style="
                        border: 4px solid #f3f3f3;
                        border-top: 4px solid #3498db;
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 20px;
                    "></div>
                    <p>Đang gửi yêu cầu...</p>
                </div>
            </div>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
        document.body.insertAdjacentHTML('beforeend', loadingHTML);
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
                            <div style={{paddingTop: '15px'}} className={styles.form_add_potential}>
                                <CommentPostPopup isOpen={showComment} onClose={() => setShowComment(false)} idCmtBox={idCmtBox}>
                                </CommentPostPopup>
                                <div className={style.postsContainer}>
                                    <div className={style.postsHeader}>
                                        <h2 className={style.groupTitle}>
                                            Đăng bài trong nhóm {Grid}
                                        </h2>
                                    </div>
                                    <div className={style.createPostContainer}>
                                        <div className={`${style.postInputContainer} ${style.BlockColumn}`}>
                                            <div className={`${style.BlockRow}`}>
                                                <div><FaUserCircle className={style.userAvatar} /></div>
                                                <div className={`${style.BlockColumn}`}>
                                                    <div className={style.postGrName}>{account?.name || 'NGUYEN VAN A'}</div>
                                                    <div className={`${style.BlockRow} ${style.postGrState}`}>
                                                        <div className={style.postGrStateIc}><FaLock style={{color: 'rgb(0, 0, 0, 0.6)'}}></FaLock></div>
                                                        <p>{groups?.GroupState || 'Riêng tư'}</p>
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
                                                style={{ display: 'none' }}
                                                ref={videoInputRef}
                                                onChange={handleVideoChange}
                                            />
                                            {videoPreviews.length > 0 && (
                                            <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                                                {videoPreviews.map((vid, idx) => (
                                                    <div key={idx} style={{position: 'relative', display: 'inline-block'}}>
                                                        <MdCancel style={{position: 'absolute', top: 8, right: 8, color: '#f00', cursor: 'pointer', zIndex: 2}} onClick={() => handleCancelVideo(idx)} />
                                                        <video src={vid} controls width={400} style={{borderRadius: '8px'}} />
                                                    </div>
                                                ))}
                                            </div>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*,application/pdf,.doc,.docx"
                                                multiple
                                                style={{ display: 'none' }}
                                                ref={imageInputRef}
                                                onChange={handleImageChange}
                                            />
                                            {newPostImages.length > 0 && (
                                                <div className={style.postImagePreview}>
                                                    {newPostImages.map((file, idx) => (
                                                        <div key={idx} style={{
                                                            position: 'relative',
                                                            display: 'inline-block',
                                                            background: '#f5f6fa',
                                                            borderRadius: 10,
                                                            boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
                                                            padding: '14px 16px 14px 54px',
                                                            margin: '0 10px 10px 0',
                                                            minWidth: 260,
                                                            maxWidth: 350
                                                        }}>
                                                            <MdCancel className={style.cancelImage}
                                                                style={{position: 'absolute', top: 10, right: 10, color: '#f00', cursor: 'pointer', zIndex: 2}}
                                                                onClick={() => handleCancelUpload(idx)} />
                                                            {file.type === 'image' && (
                                                                <img src={file.url} alt={`Preview ${idx+1}`}
                                                                    style={{maxWidth: '270px', maxHeight: '270px', borderRadius: '8px'}} />
                                                            )}
                                                            {file.type === 'video' && (
                                                                <video src={file.url} controls width={270} style={{borderRadius: '8px'}} />
                                                            )}
                                                            {file.type === 'pdf' && (
                                                                <div style={{display: 'flex', alignItems: 'center'}}>
                                                                    <span style={{position: 'absolute', left: 16}}>
                                                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="#e74c3c"><path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm7 7V3.5L18.5 9H13z"/></svg>
                                                                    </span>
                                                                    <div style={{flex: 1}}>
                                                                        <div style={{fontWeight: 500, fontSize: 15, color: '#222'}}>{file.name}</div>
                                                                        <div style={{fontSize: 12, color: '#888'}}>PDF Document</div>
                                                                        <a href={file.url} target="_blank" rel="noopener noreferrer" style={{fontSize: 12, color: '#1877f2', textDecoration: 'underline'}}>Xem trước</a>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {(file.type === 'doc' || file.type === 'docx') && (
                                                                <div style={{display: 'flex', alignItems: 'center'}}>
                                                                    <span style={{position: 'absolute', left: 16}}>
                                                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="#2a5caa"><path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm7 7V3.5L18.5 9H13z"/></svg>
                                                                    </span>
                                                                    <div style={{flex: 1}}>
                                                                        <div style={{fontWeight: 500, fontSize: 15, color: '#222'}}>{file.name}</div>
                                                                        <div style={{fontSize: 12, color: '#888'}}>Word Document</div>
                                                                        <a href={file.url} target="_blank" rel="noopener noreferrer" style={{fontSize: 12, color: '#1877f2', textDecoration: 'underline'}}>Tải xuống</a>
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
                                            <div id="fileInput" className={`${style.BlockRow} ${style.postFileInput}`}> 
                                                <p>Thêm vào bài viết của bạn</p>
                                                <div className={`${style.BlockRow} ${style.postInputIcContainer}`}> 
                                                    <IoImages style={{color: 'green'}} className={style.postInputIc} onClick={handleImageIconClick} />
                                                    <FaVideo style={{color: 'orange'}} className={style.postInputIc} onClick={handleVideoIconClick}/>
                                                    <FaUserTag style={{color: 'blue'}} className={style.postInputIc}></FaUserTag>
                                                    <FaLocationDot style={{color: 'red'}} className={style.postInputIc}></FaLocationDot>
                                                    <TfiFaceSmile style={{color: 'yellow'}} className={style.postInputIc}></TfiFaceSmile>
                                                    <HiDotsHorizontal style={{color: 'rgb(0, 0, 0, 0.3)'}} className={style.postInputIc} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.postActions}>
                                            <button 
                                                className={style.postButton}
                                                onClick={handlePostSubmit}
                                                disabled={!newPostContent.trim() && newPostImages.length === 0 && videoPreviews.length === 0}
                                            >
                                                Đăng
                                            </button>
                                        </div>
                                    </div>
                                    <div className={`${style.postsHeader} ${style.BlockRow}`}>
                                        <h2 className={style.groupTitle}>
                                            DANH SÁCH CÁC BÀI ĐÃ ĐĂNG:
                                        </h2>
                                        <button 
                                            className={style.backButton}
                                            onClick={() => handleViewPosts()}
                                        >
                                            <IoMdRefresh></IoMdRefresh>
                                        </button>
                                    </div>
                                    <div className={style.postsList}>
                                        {filteredPage?.map((post) => (
                                            <div key={post.id} className={style.postItem}>
                                                <div className={style.postHeader}>
                                                    <FaUserCircle className={style.postAvatar} />
                                                    <div>
                                                        <div className={style.postUserName}>Nguyen Van A</div>
                                                        <div className={style.postTime}>{post.time}</div>
                                                    </div>
                                                </div>
                                                <div className={style.postContent}>{post.content}</div>
                                                {post.imageUrls && post.imageUrls.length > 0 && (
                                                    <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                                                        {/* {post.imageUrls.map((img, idx) => (
                                                            <img key={idx} src={img} alt={`Post ${idx+1}`} 
                                                                className={style.postImage} 
                                                                style={{maxWidth: '100px', maxHeight: '100px', borderRadius: '8px'}} />
                                                        ))} */}
                                                    </div>
                                                )}
                                                <div className={style.postStats}>
                                                    <div style={{position: 'relative'}} className={style.BlockRow}>
                                                        <div id="like" className={style.likeIcon}></div>
                                                        <div id="like" className={style.favorIcon}></div>
                                                        <span>{post.likes}</span>
                                                    </div>
                                                    <div className={style.BlockRow}>
                                                        <p>{post.comments.length}</p>
                                                        <FaComment size={20}></FaComment>
                                                    </div>
                                                    <div className={style.BlockRow} style={{marginLeft: '10px'}}>
                                                        <p>100</p>
                                                        <IoIosShareAlt size={20}></IoIosShareAlt>
                                                    </div>
                                                </div>
                                                <div>
                                                </div>
                                                <div>
                                                    {/* {post.imageUrls && post.imageUrls.length > 0 && (
                                                        <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                                                            {post.imageUrls.map((img, idx) => (
                                                            <img key={idx} src={img} alt={`Post ${idx+1}`} 
                                                                className={style.postImage} 
                                                                style={{maxWidth: '100px', maxHeight: '100px', borderRadius: '8px'}} />
                                                            ))}
                                                        </div>
                                                    )} */}
                                                </div>
                                                <div className={style.postActions}>
                                                    <button className={style.postActionButton}>
                                                        <BiLike size={25} style={{marginRight: '5px'}}></BiLike>
                                                        Thích
                                                    </button>
                                                    <button className={style.postActionButton} 
                                                            onClick={() => {
                                                                setShowComment(true)
                                                                setIdCmtBox(post.id)
                                                            }}>
                                                        <FaRegComment size={25} style={{marginRight: '5px'}}></FaRegComment>
                                                        Bình luận
                                                    </button>
                                                    <button className={style.postActionButton} style={{display: 'none'}}>
                                                        <BiShare style={{marginRight: '5px'}}></BiShare>
                                                        Chia sẻ
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={`${style.BlockRow} ${style.postlistPageIndex}`}>
                                        <button onClick={goToPrev} disabled={currentPage === 1} style={{marginLeft: 'auto', marginRight: '20px'}}>
                                            <FaArrowAltCircleLeft className={style.ic}></FaArrowAltCircleLeft>
                                        </button>
                                        <span>Trang {currentPage} / {totalPages}</span>
                                        <button onClick={goToNext} disabled={currentPage === totalPages} style={{marginLeft: '20px'}}>
                                            <FaArrowAltCircleRight className={style.ic}></FaArrowAltCircleRight>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}