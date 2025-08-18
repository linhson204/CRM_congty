import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import styles from "@/components/crm/potential/potential.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaLock, FaUserCircle, FaUsers } from "react-icons/fa";
import { HiMiniQueueList } from "react-icons/hi2";
import { IoPerson } from "react-icons/io5";
import { MdGroupAdd, MdPublic } from "react-icons/md";
import { PiWarningCircleLight } from "react-icons/pi";
import data from '../../../public/data/account.json';
import OutGrFs from "./popup/OutGrFS";
import CancelQueuePopup from "./popup/PrivateGrQues/CancelQueue";
import QuestionPopup from "./popup/PrivateGrQues/QuestionPopup";
import { Question } from "./popup/PrivateGrQues/types";
import style from './styles.module.css';

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
    friend: number;
    GrIn: number;
    GrOut: number;
    Post: number;
    Comment: number;
    Mess?: number;
    groups: Group[];
}

interface Post {
  id: number;
  userName: string;
  time: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  shares: number;
}

export default function Detail() {
    const mainRef = useRef<HTMLDivElement>(null);
    const { isOpen } = useContext<any>(SidebarContext);
    const { setHeaderTitle, setShowBackButton, setCurrentPath }: any = useHeader();
    const router = useRouter();
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [filterPublic, setFilterPublic] = useState(false);
    const [filterPrivate, setFilterPrivate] = useState(false);
    const [filterJoined, setFilterJoined] = useState(false);
    const [filterNotJoin, setFilterNotJoin] = useState(false);
    const [Sent, setSent] = useState(false);
    const { id } = router.query;
    const [account, setAccount] = useState<Account | null>(null);
    const [groups, setGroups] = useState<Group[]>([]);
    const [uname, setUname] = useState('');
    const [pendingGr, setpendingGr] = useState<number | null>(null);
    const [isOutGr, setIsOutGr] = useState<number | null>(null);
    const [showPrivateGrQues, setShowPrivateGrQues] = useState(false);
    const [privateGrSelected, setPrivateGrSelected] = useState<number | null>(null);
    const [showCancelQueuePopUp, setShowCancelQueuePopUp] = useState(false);
    const [popupHeader, setpopupHeader] = useState<any[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [GrOutSelected, SetGrOutSelected] = useState<number | null>(null);
    
    // State mới cho bài đăng
    const [viewMode, setViewMode] = useState<'groups' | 'posts'>('groups');
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPostContent, setNewPostContent] = useState('');

    const approvalQuestions: Question[] = [
        {
            id: 1,
            type: 'textarea',
            question: "Giới thiệu ngắn về bản thân?",
            required: true,
            maxLength: 250
        },
        {
            id: 2,
            type: 'radio',
            question: "Bạn có đồng ý với nội quy nhóm?",
            options: ["Có", "Không"],
            required: true
        },
        {
            id: 3,
            type: 'checkbox',
            question: "Bạn quan tâm đến chủ đề nào?",
            options: ["Mua bán", "Kỹ thuật", "Du lịch"],
            required: false
        },
        {
            id: 4,
            type: 'radio',
            question: "Con gà có mấy chân?",
            options: ["2", "4", "6", "8", "10"],
            required: true
        }
    ];

    useEffect(() => {
        if (!id) return;
        const timer = setTimeout(() => {
            const foundAccount = data.find(acc => acc.id === Number(id));
            setAccount(foundAccount || null);
            setGroups(foundAccount?.groups || []);
        }, 100);
        return () => clearTimeout(timer);
    }, [id]);

    useEffect(() => {
        setHeaderTitle("Tool Facebook - Chi Tiết Tài Khoản");
        setShowBackButton(true);
        setCurrentPath("/toolfacebook/tham-gia-nhom/HomePage");
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

    useEffect(() => {
        if(pendingGr) {
            PendingHandleData(pendingGr);
        }
    }, [pendingGr]);

    const filteredGroups = useMemo(() => {
        return groups.filter(group => {
            const nameMatch = group.GroupName.toLowerCase().includes(search.toLowerCase());
            if (!nameMatch) return false;

            const statusMatch = 
                (!filterPublic && !filterPrivate) ||
                (filterPublic && group.GroupState === 'Public') || 
                (filterPrivate && group.GroupState === 'Private');

            const joinMatch = 
                (!filterJoined && !filterNotJoin) ||
                (filterJoined && group.isJoin === 1) ||
                (filterNotJoin && group.isJoin === 2);
            
            return nameMatch && statusMatch && joinMatch;
        });
    }, [groups, filterPublic, filterPrivate, filterJoined, filterNotJoin, search]);

    const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);
    const goToPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
    const goToNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

    const filteredPage = filteredGroups.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleViewPosts = (group: Group) => {
        setSelectedGroup(group);
        setViewMode('posts');
        
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
                imageUrl: 'https://via.placeholder.com/500x300',
                likes: 25,
                comments: 5,
                shares: 3
            }
        ]);
    };

    const handlePostSubmit = () => {
        if (!newPostContent.trim()) return;
        
        const newPost: Post = {
            id: posts.length + 1,
            userName: uname,
            time: 'Vừa xong',
            content: newPostContent,
            likes: 0,
            comments: 0,
            shares: 0
        };
        
        setPosts([newPost, ...posts]);
        setNewPostContent('');
    };

    const PostClick = () => {
        router.push('/toolfacebook/dang-bai');
    };

    const PendingHandle = (id: number) => {
        setpendingGr(id);
    };

    const PendingHandleData = (GrId: number) => {
        // Xử lý tham gia nhóm
    }

    const handleLeavePopup = (id) => { 
        setShowPopup(false);
        // Xử lý rời nhóm
    };

    const UpdateGrState = (idGr: number) => {
        // Xử lý cập nhật trạng thái nhóm
        hardReload();
    }

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

    const validateRequiredFields = (questions: Question[], answers: Record<number, any>): 
                                { isValid: boolean; errors: Record<number, string> } => {
        const errors: Record<number, string> = {};
        let isValid = true;

        questions.forEach((question) => {
            if (question.required) {
                const answer = answers[question.id];
                
                if (question.type === 'textarea' || question.type === 'radio') {
                    if (!answer || answer.toString().trim() === '') {
                        errors[question.id] = 'Vui lòng điền trường này';
                        isValid = false;
                    }
                } 
                else if (question.type === 'checkbox') {
                    if (!answer || answer.length === 0) {
                        errors[question.id] = 'Vui lòng chọn ít nhất một lựa chọn';
                        isValid = false;
                    }
                }
            }
        });
        return { isValid, errors };
    };

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="robots" content="noindex,nofollow" />
                <title>Tool Facebook - Chi tiết</title>
                <meta name="description" content="Quản lý và đăng bài lên Facebook" />
            </Head>
            <div className={styleHome.main} ref={mainRef}>
                <div className={styles.main_importfile}>
                    <div className={styles.formInfoStep}>
                        <div className={styles.info_step}>
                            <div className={styles.main__title}>Tool Facebook - DANH SÁCH TÀI KHOẢN</div>
                            <div style={{padding: '10px'}} className={styles.form_add_potential}>
                                <div style={{marginTop:'10px'}} className={style.BlockRow}>
                                    <p style={{fontSize: '30px', float: 'left', width: 'fit-content'}}>CHI TIẾT TÀI KHOẢN</p>
                                </div>
                                
                                <div style={{marginTop: '20px'}} className={style.BlockRow}>
                                    <div id="UserName" className={style.BlockRow}>
                                        <FaUserCircle style={{width: '30px', height: '30px'}}></FaUserCircle>
                                        <p className={style.nameDetail}>{uname}</p>
                                    </div>
                                    <div style={{display: 'flex', flexDirection: 'column', marginLeft: 'auto'}}>
                                        <div>Số nhóm đã tham gia: {groups.filter(group => group.isJoin === 1).length} </div>
                                        <div>Số nhóm chưa tham gia: {groups.filter(group => group.isJoin === 2 || group.isJoin === 3).length}</div>
                                    </div>
                                </div>

                                {viewMode === 'groups' ? (
                                    <>
                                        <div style={{marginTop: '20px', marginBottom: '20px'}} className={style.BlockRow}>
                                            <input
                                                style={{marginLeft: '0px'}}
                                                className={style.searchBar}
                                                type="text" 
                                                placeholder="Tìm kiếm"
                                                value={search}
                                                onChange={(e) => {
                                                    setSearch(e.target.value);
                                                    setCurrentPage(1);
                                                }}
                                            />
                                            <div className={style.BlockRow} style={{marginLeft: 'auto', paddingTop: '10px'}}>
                                                <input 
                                                    type="checkbox"
                                                    className={style.checkbox}
                                                    checked={filterPublic}
                                                    onChange={(e) => {
                                                        setCurrentPage(1);
                                                        setFilterPublic(e.target.checked)
                                                    }}
                                                />
                                                <p style={{width: 'fit-content'}}>Nhóm công khai</p>
                                            </div>
                                            <div className={style.BlockRow} style={{marginLeft: '30px', paddingTop: '10px'}}>
                                                <input 
                                                    type="checkbox" 
                                                    className={style.checkbox}
                                                    checked={filterPrivate}
                                                    onChange={(e) => {
                                                        setCurrentPage(1);
                                                        setFilterPrivate(e.target.checked)
                                                    }}
                                                />
                                                <p style={{width: 'fit-content'}}>Nhóm riêng tư</p>
                                            </div>
                                            <div className={style.BlockRow} style={{marginLeft: '30px', paddingTop: '10px'}}>
                                                <input 
                                                    type="checkbox" 
                                                    className={style.checkbox}
                                                    checked={filterJoined}
                                                    onChange={(e) => {
                                                        setCurrentPage(1);
                                                        setFilterJoined(e.target.checked)
                                                    }}
                                                />
                                                <p style={{width: 'fit-content'}}>Đã tham gia</p>
                                            </div>
                                            <div className={style.BlockRow} style={{marginLeft: '30px', paddingTop: '10px'}}>
                                                <input 
                                                    type="checkbox" 
                                                    className={style.checkbox}
                                                    checked={filterNotJoin}
                                                    onChange={(e) => {
                                                        setCurrentPage(1);
                                                        setFilterNotJoin(e.target.checked)
                                                    }}
                                                />
                                                <p style={{width: 'fit-content'}}>Chưa tham gia</p>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <OutGrFs isOpen={showPopup} onClose={() => setShowPopup(false)}>
                                                <div className={style.PopupOutGrICWrapper}><PiWarningCircleLight className={style.PopupOutGrIC}/></div>
                                                <h2 className={style.PopupOutGrHeader}> 
                                                    Bạn chắc chắn muốn rời nhóm <strong>{groups.find(item => item.id === GrOutSelected)?.GroupName}</strong> không?
                                                </h2>
                                                <p className={style.PopupOutGrContent}>
                                                    Hành động này sẽ không thể hoàn tác.
                                                </p>
                                                <div className={`${style.BlockRow} ${style.PopupOutGrButtonWrapper}`}>
                                                    <button onClick={() => setShowPopup(false)} className={style.PopupOutGrCancelButton}>
                                                        Hủy
                                                    </button>
                                                    <button 
                                                        onClick={() => {handleLeavePopup(isOutGr)}}
                                                        className={style.PopupOutGrConfirmButton}>
                                                        Xác nhận
                                                    </button>
                                                </div>
                                            </OutGrFs>
                                            
                                            <CancelQueuePopup isOpen={showCancelQueuePopUp} onClose={() => setShowCancelQueuePopUp(false)}>
                                                <div className={style.PopupOutGrICWrapper}><PiWarningCircleLight className={style.PopupOutGrIC}/></div>
                                                <h2 className={style.PopupOutGrHeader}> 
                                                    Bạn chắc chắn huỷ yêu cầu tham gia nhóm <strong>{groups.find(item => item.id === GrOutSelected)?.GroupName}</strong> không?
                                                </h2>
                                                <p className={style.PopupOutGrContent}>
                                                    Bạn sẽ phải trả lời lại câu hỏi nếu đây là nhóm kín
                                                </p>
                                                <div className={`${style.BlockRow} ${style.PopupOutGrButtonWrapper}`}>
                                                    <button onClick={() => setShowCancelQueuePopUp(false)} className={style.PopupOutGrCancelButton}>
                                                        Hủy
                                                    </button>
                                                    <button 
                                                        onClick={() => {handleLeavePopup(isOutGr)}}
                                                        className={style.PopupOutGrConfirmButton}>
                                                        Xác nhận
                                                    </button>
                                                </div>
                                            </CancelQueuePopup>
                                            
                                            <QuestionPopup
                                                isOpen={showPrivateGrQues}
                                                onClose={() => {setShowPrivateGrQues(false)}}
                                                questions={approvalQuestions}
                                                onSubmit={(answers) => {
                                                    setSent(true);
                                                    setTimeout(() => UpdateGrState(privateGrSelected), 300);
                                                    if (privateGrSelected) {
                                                        console.log(id, privateGrSelected, answers);
                                                    }
                                                }}>
                                                    <div className={`${style.BlockColumn} ${style.PopupQuesHeader}`}>
                                                        <div className={style.PQHGrName}>{popupHeader[0]}</div>
                                                        <div className={style.BlockRow}>
                                                            <div className={style.BlockRow}>
                                                                <div><FaLock className={style.ic}></FaLock></div>
                                                                <p style={{textAlign: 'center', marginRight: '10px', marginLeft: '5px'}}>{popupHeader[1]}</p>
                                                            </div>
                                                            <div className={style.BlockRow}>
                                                                <div><IoPerson className={style.ic}></IoPerson></div>
                                                                <p style={{textAlign: 'center', marginRight: '10px', marginLeft: '5px'}}>{popupHeader[2]} Thành viên</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                            </QuestionPopup>
                                            
                                            <div className={`${style.BlockColumn} ${style.BlockDetail}`}>
                                                {filteredPage.map(group => (
                                                    <div key={group.id} style={{height: '125px'}} className={`${style.Block} ${style.BlockColumn}`}>
                                                        <div id="TopRow" className={style.BlockRow}>
                                                            <h3 style={{fontSize: '30px'}}>{group.GroupName}</h3>
                                                            <h2 style={{marginLeft: 'auto'}}>
                                                                {group.isJoin == 1 ? (<p>Đã tham gia</p>) : (<p>Chưa tham gia</p>)}
                                                            </h2>
                                                        </div>
                                                        <div id="BottomRow" className={style.BlockRow} style={{marginTop: 'auto'}}>
                                                            <div id="GrState" className={style.BlockRow}>
                                                                {group.GroupState == "Public" ? (
                                                                    <div style={{paddingTop: '3px'}}><MdPublic className={style.ic}></MdPublic></div>
                                                                ) : (
                                                                    <div style={{paddingTop: '3px'}}><FaLock className={style.ic}></FaLock></div>
                                                                )}
                                                                <h2 style={{marginLeft: '10px', fontSize: '22px'}}>{group.GroupState}</h2>
                                                            </div>
                                                            <div id="member" style={{marginLeft: '20px'}} className={style.BlockRow}>
                                                                <div style={{paddingTop: '3px'}}><FaUsers className={style.ic}></FaUsers></div>
                                                                <h2 style={{marginLeft: '10px', fontSize: '22px'}}>{group.Member}</h2>
                                                            </div>
                                                            {group.isJoin == 1 ? (
                                                                <div className={style.BlockRow} style={{marginLeft: 'auto'}}>
                                                                    <button 
                                                                        className={style.buttonBack} 
                                                                        onClick={() => handleViewPosts(group)}
                                                                    >
                                                                        Vào nhóm
                                                                    </button>
                                                                    <button className={style.buttonOutGr}
                                                                            onClick={() => {
                                                                                SetGrOutSelected(group.id); 
                                                                                setShowPopup(true);}
                                                                            }>
                                                                            Rời nhóm
                                                                    </button>
                                                                </div>
                                                            ) : group.isJoin == 2 ? (
                                                                <div className={`${style.BlockRow} ${style.buttonBack}`}
                                                                    onClick={() => {
                                                                        {if (group.GroupState === "Private") {
                                                                            setPrivateGrSelected(group.id);
                                                                            setShowPrivateGrQues(true);
                                                                            setpopupHeader([group.GroupName, group.GroupState, group.Member]);
                                                                        } else {UpdateGrState(group.id)}
                                                                        }}}>
                                                                    <MdGroupAdd style={{marginRight: '7px'}} className={style.ic}/>
                                                                    <p style={{paddingTop: '2px'}}>tham gia nhóm</p>
                                                                </div>
                                                            ) : group.isJoin == 3 ? (
                                                                <div className={`${style.BlockRow}`} style={{marginLeft: 'auto'}}>
                                                                    <div className={style.BlockRow}>
                                                                        <button className={style.buttonOutGr} 
                                                                                style={{marginRight: '10px'}}
                                                                                onClick={() => {setShowCancelQueuePopUp(true); SetGrOutSelected(group.id)}}>
                                                                                    Huỷ bỏ
                                                                        </button>
                                                                        <div className={style.BlockRow}>
                                                                            <div className={`${style.BlockRow} ${style.onQueue}`}>
                                                                                <HiMiniQueueList style={{marginRight: '7px'}} className={style.ic}/>
                                                                                <p style={{paddingTop: '2px'}}>Đang chờ duyệt</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <p>Đã hết hạn</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                                <div id="PageIndexBar" className={style.BlockRow} style={{marginLeft: 'auto', marginRight: '20px', marginTop: '10px'}}>
                                                    <button onClick={goToPrev} disabled={currentPage === 1} style={{marginRight: '20px'}}>
                                                        <FaArrowAltCircleLeft className={style.ic}></FaArrowAltCircleLeft>
                                                    </button>
                                                    <span>Trang {currentPage} / {totalPages}</span>
                                                    <button onClick={goToNext} disabled={currentPage === totalPages} style={{marginLeft: '20px'}}>
                                                        <FaArrowAltCircleRight className={style.ic}></FaArrowAltCircleRight>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className={style.postsContainer}>
                                        <div className={style.postsHeader}>
                                            <button 
                                                className={style.backButton}
                                                onClick={() => setViewMode('groups')}
                                            >
                                                <FaArrowAltCircleLeft className={style.backIcon} />
                                                Quay lại
                                            </button>
                                            <h2 className={style.groupTitle}>
                                                Bài đăng trong nhóm: {selectedGroup?.GroupName}
                                            </h2>
                                        </div>
                                        
                                        <div className={style.createPostContainer}>
                                            <div className={style.postInputContainer}>
                                                <FaUserCircle className={style.userAvatar} />
                                                <textarea
                                                    className={style.postInput}
                                                    placeholder="Bạn đang nghĩ gì?"
                                                    value={newPostContent}
                                                    onChange={(e) => setNewPostContent(e.target.value)}
                                                />
                                            </div>
                                            <div className={style.postActions}>
                                                <button 
                                                    className={style.postButton}
                                                    onClick={handlePostSubmit}
                                                    disabled={!newPostContent.trim()}
                                                >
                                                    Đăng bài
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className={style.postsList}>
                                            {posts.map((post) => (
                                                <div key={post.id} className={style.postItem}>
                                                    <div className={style.postHeader}>
                                                        <FaUserCircle className={style.postAvatar} />
                                                        <div>
                                                            <div className={style.postUserName}>{post.userName}</div>
                                                            <div className={style.postTime}>{post.time}</div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className={style.postContent}>{post.content}</div>
                                                    
                                                    {post.imageUrl && (
                                                        <img 
                                                            src={post.imageUrl} 
                                                            alt="Post" 
                                                            className={style.postImage}
                                                        />
                                                    )}
                                                    
                                                    <div className={style.postStats}>
                                                        <span>{post.likes} lượt thích</span>
                                                        <span>{post.comments} bình luận</span>
                                                        <span>{post.shares} chia sẻ</span>
                                                    </div>
                                                    
                                                    <div className={style.postActions}>
                                                        <button className={style.postActionButton}>
                                                            Thích
                                                        </button>
                                                        <button className={style.postActionButton}>
                                                            Bình luận
                                                        </button>
                                                        <button className={style.postActionButton}>
                                                            Chia sẻ
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}