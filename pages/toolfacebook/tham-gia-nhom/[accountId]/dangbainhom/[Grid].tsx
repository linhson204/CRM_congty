import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import styles from "@/components/crm/potential/potential.module.css";
import { useWebSocket } from "@/components/toolFacebook/dangbai/hooks/useWebSocket";
import { uploadImage } from "@/pages/api/toolFacebook/dang-bai/upload";
import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from 'react';
import { BiLike, BiShare } from "react-icons/bi";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaLock, FaRegComment, FaUserCircle, FaUserTag } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdRefresh } from "react-icons/io";
import { IoImages } from "react-icons/io5";
import { TfiFaceSmile } from "react-icons/tfi";
import data from '../../../../../public/data/account.json';
import createPostGroup from "../../../../api/toolFacebook/dang-bai-nhom/dangbainhom";
import style from '../../styles.module.css';

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
    userName: string;
    time: string;
    content: string;
    imageUrls?: string[];
    likes: number;
    comments: number;
    shares: number;
}

interface Comment {
    id: number;
    userName: string;
    time: string;
    content: string;
    likes: number;
}
export default function Detail() {
    const mainRef = useRef<HTMLDivElement>(null);
    const { isOpen } = useContext<any>(SidebarContext);
    const { setHeaderTitle, setShowBackButton, setCurrentPath }: any = useHeader();
    const router = useRouter();
    const itemsPerPage = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [filterPublic, setFilterPublic] = useState(false);
    const [filterPrivate, setFilterPrivate] = useState(false);
    const [filterJoined, setFilterJoined] = useState(false);
    const [filterNotJoin, setFilterNotJoin] = useState(false);
    const { accountId, Grid } = router.query;
    const [account, setAccount] = useState<Account | null>(null);
    const [groups, setGroups] = useState<Group>();
    const [uname, setUname] = useState('');
    
    // State mới cho bài đăng
    const [viewMode, setViewMode] = useState<'groups' | 'posts'>('groups');
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostImages, setNewPostImages] = useState<any[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const websocket = useWebSocket();
    // lay data cho page
    useEffect(() => {
        if (!accountId) return;
        const timer = setTimeout(() => {
            //test voi data mock, neu server kha nang user va group se tach rieng
            const foundAccount = data.find(acc => acc.id === Number(accountId));
            setAccount(foundAccount || null);
            setGroups(foundAccount.groups.find(gr => gr.id === Number(Grid)))
        }, 100);
        return () => clearTimeout(timer);
    }, [Grid, accountId]);

    useEffect(() => {
        setHeaderTitle("Tool Facebook - Đăng bài nhóm");
        setShowBackButton(true);
        setCurrentPath(`/toolfacebook/tham-gia-nhom/[accountId]/${accountId}`);
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

    // const filteredGroups = useMemo(() => {
    //     return groups.filter(group => {
    //         const nameMatch = group.GroupName.toLowerCase().includes(search.toLowerCase());
    //         if (!nameMatch) return false;

    //         const statusMatch = 
    //             (!filterPublic && !filterPrivate) ||
    //             (filterPublic && group.GroupState === 'Public') || 
    //             (filterPrivate && group.GroupState === 'Private');

    //         const joinMatch = 
    //             (!filterJoined && !filterNotJoin) ||
    //             (filterJoined && group.isJoin === 1) ||
    //             (filterNotJoin && group.isJoin === 2);
            
    //         return nameMatch && statusMatch && joinMatch;
    //     });
    // }, [groups, filterPublic, filterPrivate, filterJoined, filterNotJoin, search]);

    // phan trang
    const totalPages = Math.ceil(posts.length / itemsPerPage);
    const goToPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
    const goToNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

    const filteredPage = posts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleViewPosts = () => {
        // Mock data cho bài đăng
        setPosts([
            {
                id: 1,
                userName: 'Nguyễn Văn A',
                time: '2 giờ trước',
                content: 'Đây là bài đăng mẫu trong nhóm.',
                likes: 10,
                comments: 2,
                shares: 1
            },
            {
                id: 2,
                userName: 'Trần Thị B',
                time: '5 giờ trước',
                content: 'Chào mừng mọi người đến với nhóm!',
                likes: 25,
                comments: 5,
                shares: 3
            }
        ]);
    };

    const handlePostSubmit = async () => {
        if (!newPostContent.trim() && newPostImages.length === 0) return;
        const newPost: Post = {
            id: 123,
            userId: "gianvu17607@gmail.com",
            userName: uname,
            groupId: groups?.id,
            time: `Vừa xong`,
            content: newPostContent,
            imageUrls: newPostImages.length > 0 ? newPostImages : undefined,
            likes: 0,
            comments: 0,
            shares: 0
        };

        setPosts([newPost, ...posts]);
        setNewPostContent('');
        setNewPostImages([]);
        const crmID = Cookies.get("userID");
        const ui = "gianvu17607@gmail.com"

        const image = uploadImage(newPostImages);
        console.log("Cookie value:", crmID, newPostImages, image);
        // if (websocket && websocket.readyState === WebSocket.OPEN) {
        // const postData = {
        //     type: "post_to_group",
        //     postId: newPost.id.toString(),
        //     content: newPostContent,
        //     //   authorName: userName,
        //     //   authorId: userID,
        //     to: "B22623688",
        //     attachments: [], // Đưa images vào attachments thay vì images
        // };

        // websocket.send(JSON.stringify(postData));
        // }
        const params = `{"group_link": "groups/1569887551087354", "content": "${newPostContent}", "files": ${image}}`;
        await createPostGroup(
        "post_to_group",
        "gianvu17607@gmail.com",
        params,
        crmID
        );
    };

    const handleImageIconClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            // const readers: Promise<string>[] = [];
            // for (let i = 0; i < files.length; i++) {
            //     const file = files[i];
            //     readers.push(new Promise((resolve) => {
            //         const reader = new FileReader();
            //         reader.onloadend = () => {
            //             resolve(reader.result as string);
            //         };
            //         reader.readAsDataURL(file);
            //     }));
            // }
            // Promise.all(readers).then((images) => {
            //     setNewPostImages(images);
            // });
            for (let i = 0; i < files.length; i++) {
                const myArray: any[] = [];
                myArray.push(files[i]);
            }
        }
    };


    const hardReload = () => {
        showLoadingDialog();
        setTimeout(() => window.location.reload(), 1000);
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
                                <div className={style.postsContainer}>
                                    <div className={style.postsHeader}>
                                        <h2 className={style.groupTitle}>
                                            Đăng bài trong nhóm {groups?.GroupName || 'Chưa có data'}
                                        </h2>
                                    </div>
                                    <div className={style.createPostContainer}>
                                        <div className={`${style.postInputContainer} ${style.BlockColumn}`}>
                                            <div className={`${style.BlockRow}`}>
                                                <div><FaUserCircle className={style.userAvatar} /></div>
                                                <div className={`${style.BlockColumn}`}>
                                                    <div className={style.postGrName}>{account?.name || 'Chưa có data'}</div>
                                                    <div className={`${style.BlockRow} ${style.postGrState}`}>
                                                        <div className={style.postGrStateIc}><FaLock style={{color: 'rgb(0, 0, 0, 0.6)'}}></FaLock></div>
                                                        <p>{groups?.GroupState || 'Chưa có data'}</p>
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
                                                accept="image/*"
                                                multiple
                                                style={{ display: 'none' }}
                                                ref={fileInputRef}
                                                onChange={handleImageChange}
                                            />
                                            {newPostImages.length > 0 && (
                                                <div style={{marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px'}} className={style.postImagePreview}>
                                                    {newPostImages.map((img, idx) => (
                                                        <img key={idx} src={img} alt={`Preview ${idx+1}`} style={{maxWidth: '100px', maxHeight: '100px', borderRadius: '8px'}} />
                                                    ))}
                                                    <button className={style.cancelImage}>aa</button>
                                                </div>
                                            )}
                                            <div id="fileInput" className={`${style.BlockRow} ${style.postFileInput}`}> 
                                                <p>Thêm vào bài viết của bạn</p>
                                                <div className={`${style.BlockRow} ${style.postInputIcContainer}`}> 
                                                    <IoImages style={{color: 'green'}} className={style.postInputIc} onClick={handleImageIconClick} />
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
                                                disabled={!newPostContent.trim() && newPostImages.length === 0}
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
                                        {filteredPage.map((post) => (
                                            <div key={post.id} className={style.postItem}>
                                                <div className={style.postHeader}>
                                                    <FaUserCircle className={style.postAvatar} />
                                                    <div>
                                                        <div className={style.postUserName}>{post.userName}</div>
                                                        <div className={style.postTime}>{post.time}</div>
                                                    </div>
                                                </div>
                                                <div className={style.postContent}>{post.content}</div>
                                                {post.imageUrls && post.imageUrls.length > 0 && (
                                                    <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                                                        {post.imageUrls.map((img, idx) => (
                                                            <img key={idx} src={img} alt={`Post ${idx+1}`} className={style.postImage} style={{maxWidth: '100px', maxHeight: '100px', borderRadius: '8px'}} />
                                                        ))}
                                                    </div>
                                                )}
                                                
                                                <div className={style.postStats}>
                                                    <span>{post.likes} tương tác</span>
                                                    <span>{post.comments} bình luận</span>
                                                    <span>{post.shares} chia sẻ</span>
                                                </div>
                                                
                                                <div className={style.postActions}>
                                                    <button className={style.postActionButton}>
                                                        <BiLike style={{marginRight: '5px'}}></BiLike>
                                                        Thích
                                                    </button>
                                                    <button className={style.postActionButton}>
                                                        <FaRegComment style={{marginRight: '5px'}}></FaRegComment>
                                                        Bình luận
                                                    </button>
                                                    <button className={style.postActionButton}>
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