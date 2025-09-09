import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import styles from "@/components/crm/potential/potential.module.css";
import { useWebSocket } from "@/components/toolFacebook/dangbai/hooks/useWebSocket";
import joinGroup from "@/pages/api/toolFacebook/danhsachnhom/thamgianhom";
import Filter from "@/pages/toolfacebook/tham-gia-nhom/[accountId]/popup/Filter";
import OutGrFs from "@/pages/toolfacebook/tham-gia-nhom/[accountId]/popup/OutGrFS";
import CancelQueuePopup from "@/pages/toolfacebook/tham-gia-nhom/[accountId]/popup/PrivateGrQues/CancelQueue";
import QuestionPopup from "@/pages/toolfacebook/tham-gia-nhom/[accountId]/popup/PrivateGrQues/QuestionPopup";
import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FaFilter, FaLock, FaUserCircle } from "react-icons/fa";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoMdRefresh } from "react-icons/io";
import { IoEnterOutline, IoExitOutline, IoPerson } from "react-icons/io5";
import { MdClose, MdPublic } from "react-icons/md";
import data from "../../../../public/data/account.json";
import LoadingDialog from "../components/LoadingDialog";
import UserListIndexBar from "../components/UserListIndexBar";
import StatisticBlock from "../components/statisticBlock";
import { Question } from "../popup/PrivateGrQues/types";
import stylepu from "../popup/popup.module.css";
import style from '../styles.module.css';
import stylepo from './dangbainhom/post.module.css';

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

export default function Detail() {
    const mainRef = useRef<HTMLDivElement>(null);
    const { isOpen } = useContext<any>(SidebarContext);
    const { setHeaderTitle, setShowBackButton, setCurrentPath }: any = useHeader();
    const router = useRouter();
    // const itemsPerPage = 10;
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [accountFind, setAccountFind] = useState<Account | null>(null);
    const [showFilter, setshowFilterPopup] = useState(false);
    const [selectedGrOut, setSelectedGrOut] = useState<string>('');
    // Phân trang
    const [search, setSearch] = useState('');
    const [Sent, setSent] = useState(false); //danh dau da gui
    const { accountId } = router.query;
    // Lấy thông tin tài khoản
    const [account, setAccount] = useState<Account[] | null>(data); //data tong dau vao
    const [groups, setGroups] = useState<Group[]>([]);
    //loading ten
    const [uname, setUname] = useState('');

    //tham gia nhóm
    const [pendingGr, setpendingGr] = useState<number | null>(null);
    // id gr rời nhóm
    const [isOutGr, setIsOutGr] = useState<number | null>(null);
    //tham gia nhóm kín
    const [showPrivateGrQues, setShowPrivateGrQues] = useState(false);
    const [privateGrSelected, setPrivateGrSelected] = useState<any | null>(null);
    const [showCancelQueuePopUp, setShowCancelQueuePopUp] = useState(false);
    const [popupHeader, setpopupHeader] = useState<any[]>([]);

    //Popup rời nhóm, huỷ tham gia nhóm
    const [showPopup, setShowPopup] = useState(false);
    const [GrOutSelected, SetGrOutSelected] = useState<number | null>(null);
    // const [groups, setGroups] = useState<Groups[]>([]);

    const [grStateTemp, setGrStateTemp] = useState('all');
    const [joinTemp, setJoinTemp] = useState('all');
    const [grState, setGrState] = useState('all');
    const [joinState, setJoinState] = useState('all');

    const [groupData, setGroupData] = useState<any[]>([]);//data that
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [showLoading, setShowLoading] = useState(false);
    const [Gr, setGr] = useState<any[]>([]); //mock data

    const pageCountSelect = async () => {
        //call API lay so luong nhom tren tung account
    }

    const websocket = useWebSocket();
    // useEffect(() => {
    //     let isMounted = true;
    //     setIsLoading(true);
    //     setFetchError(null);

    //     async function fetchData() {
    //         try {
    //         const [res1, res2, res3] = await Promise.all([
    //             getGroupData("123", "a", "", "", "Đã tham gia"),
    //             getGroupData("123", "", "", "", "Chờ duyệt"),
    //             getGroupData("123", "a", "", "", "Chưa tham gia")
    //         ]);

    //         if (isMounted) {
    //             const res = [...res1.results, ...res2.results, ...res3.results];
    //             setGroupData(res);
    //             console.log("Fetched data:", { res1, res2, res3 });
    //             setIsLoading(false);
    //         }
    //         } catch (error) {
    //         if (isMounted) {
    //             console.error("Error fetching group data:", error);
    //             setFetchError("Không thể tải dữ liệu nhóm. Vui lòng thử lại.");
    //             setIsLoading(false);
    //         }
    //         }
    //     }

    //     fetchData();

    //     return () => {
    //         isMounted = false;
    //     };
    // }, []);

    useEffect(() => {
        fetch('http://localhost:3003/api/getgrdata')
        .then(response => response.json())
        .then(data => {
            // setTest(data);
            setGr(data.data || data); // ✅ Set posts ngay khi có data
            setIsLoading(false);
        })
        .catch(error => console.error('Error:', error));
    }, []); // ✅ Chỉ chạy một lần

    useEffect(() => {
        console.log("Gr thay đổi:", Gr);
    }, [Gr]);

    // getFilteredGroups(123).then(data => {
    //     console.log("Filtered groups:", data);
    // });

    // Danh sách câu hỏi mẫu
    const approvalQuestions: Question[] = [
    {
        id: 1,
        type: 'textarea', // Kiểu nhập text
        question: "Giới thiệu ngắn về bản thân?",
        required: true,
        maxLength: 250
    },
    {
        id: 2,
        type: 'radio', // Chọn 1 lựa chọn
        question: "Bạn có đồng ý với nội quy nhóm?",
        options: ["Có", "Không"],
        required: true
    },
    {
        id: 3,
        type: 'checkbox', // Chọn nhiều lựa chọn
        question: "Bạn quan tâm đến chủ đề nào?",
        options: ["Mua bán", "Kỹ thuật", "Du lịch"],
        required: false
    },
    {
        id: 4,
        type: 'radio', // Chọn nhiều lựa chọn
        question: "Con gà có mấy chân?",
        options: ["2", "4", "6", "8", "10"],
        required: true
    }
    ];
    //
    
    useEffect(() => { //xu li su kien moi khi tim dung account
        const timer = setTimeout(() => {
        const foundAccount = data.find(acc => acc.id === 12);
        setAccountFind(foundAccount);
        setGroups(foundAccount.groups);
        }, 100);
        return () => clearTimeout(timer);
    }, [accountId]);

    useEffect(() => {
        setHeaderTitle("Tool Facebook - Chi Tiết Tài Khoản");
        setShowBackButton(true);
        setCurrentPath(`/toolfacebook/tham-gia-nhom/HomePage`);
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
            setUname(accountFind?.name || '...loading');
        } else {
            setUname('Loading...');
        }
    }, [account]);

    let crmID = Cookies.get("userID");
    if (!crmID) {
        console.warn('CRM userID cookie is missing!');
        crmID = "defaultID"; // fallback value, replace with your logic
    }

    useEffect(() => {
        if(pendingGr) {
            PendingHandleData(pendingGr);
        }
    }, [pendingGr]);

    const filteredGroups = useMemo(() => {
        return Gr.filter(group => {
            // 1. Lọc theo tên (luôn áp dụng)
            const nameMatch = group.Name.toLowerCase().includes(search.toLowerCase());
            if (!nameMatch) return false;

            // 2. Lọc trạng thái
            let statusMatch = true;
            if (grState !== 'all' && grState !== '') {
                if (grState === 'public') statusMatch = group.Status === 'Hoạt động';
                else if (grState === 'private') statusMatch = group.Status !== 'Hoạt động';
            }

            // 3. Lọc tham gia
            let joinMatch = true;
            if (joinState !== 'all' && joinState !== '') {
                if (joinState === 'join') joinMatch = group.user_status === 'Đã tham gia';
                else if (joinState === 'not') joinMatch = group.user_status === 'Chưa tham gia';
                else if (joinState === 'pending') joinMatch = group.user_status === 'Chờ duyệt';
            }

            return nameMatch && statusMatch && joinMatch;
        });
    }, [Gr, grState, joinState, search]);

    // Phân trang
    const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);
    const goToPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
    const goToNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

    const filteredPage = filteredGroups.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const HandleFilter = (grStateTemp: string, joinTemp: string) => {
        setGrState(grStateTemp);
        setJoinState(joinTemp);
        setshowFilterPopup(false);
        console.log(grStateTemp, joinTemp);
    }

    const resetFilter = () => {
        setGrState('all');
        setJoinState('all');
        setSearch('');
        setCurrentPage(1);
        setItemsPerPage(10);
    }

    const PendingHandleData = (GrId: number) => {
        // if (pendingGr.includes(group.id)) {
        //     setpendingGr(pendingGr.filter(id => id !== group.id));
        // } else {
        //     setpendingGr([...pendingGr, group.id]);
        // }
        //call API tra id user id nhom vao day
    }

    const HandlePostGroup = (idgr: number) => {
        router.push(`../${accountId}/dangbainhom/${idgr}`);
    }

    // Tra id user, id nhom -> be tra cho tool -> tool chay -> tra lai state id nhom
    const handleLeavePopup = (id: any) => {
        setShowPopup(false);
        console.log(id, accountId);
        //request rời nhóm
    };

    const handleCancelQueue = (id: any) => {
        setShowCancelQueuePopUp(false);
        console.log(id, accountId);
        //request hủy bỏ tham gia nhóm
    }

    //xu li request hang doi
    const UpdateGrState = async (LinkGr: string) => {
        // Gọi API gửi request đến tool tham gia nhóm
        // API cập nhật trường isJoin
        console.log(accountId, LinkGr);
        if (websocket && websocket.readyState === WebSocket.OPEN) {
            const params = {"group_link": `${LinkGr}`};
            const joinData = {
                type: "join_group",
                user_id: "test1",
                // postId: newPost.id.toString(),
                crm_id: crmID,
                params: params,
                to: "B22623688",
            };
            websocket.send(JSON.stringify(joinData));
        }
        const params = {"group_link": `${LinkGr}`};
        await joinGroup(
            "join_group",
            "test1", //user_id
            params,
            crmID
        );
    }

    const hardReload = () => {
        setShowLoading(true);
        setTimeout(() => window.location.reload(), 1000);
    }

    return (
    <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="robots" content="noindex,nofollow" />
            <title>Tool Facebook - Chi tiết</title>
            <meta name="description" content="Quản lý và đăng bài lên Facebook" />
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </Head>
        <div className={styleHome.main} ref={mainRef}>
            <div className={styles.main_importfile}>
                <div className={styles.formInfoStep}>
                    <div className={styles.info_step}>
                        <div className={styles.main__title}>Tool Facebook - DANH SÁCH TÀI KHOẢN</div>
                        <div style={{padding: '10px'}} className={styles.form_add_potential}>
                            {/* Title + BackButton */}
                            <div style={{marginTop:'10px'}} className={style.BlockRow}>
                                <p style={{fontSize: '30px', float: 'left', width: 'fit-content'}}></p>
                                <div id="UserName" className={style.BlockRow}>
                                    <FaUserCircle style={{width: '30px', height: '30px'}}></FaUserCircle>
                                    <p className={style.nameDetail}>{accountId}</p>
                                </div>
                            </div>
                            {/* Name + GroupIn/NotIn */}
                            <div style={{marginTop: '20px'}} className={style.statBlockContainer}>
                                <StatisticBlock content="Nhóm nhiều bài viết nhất" count={123}/>
                                <StatisticBlock content="abc" count={123}/>
                                <StatisticBlock content="abc" count={123}/>
                                <StatisticBlock content="abc" count={123}/>
                            </div>
                            {/* thanh checkbox + ten */}
                            <div style={{marginTop: '20px', marginBottom: '20px'}} className={style.BlockRow}>
                                <input
                                    style={{marginLeft: '0px'}}
                                    className={style.searchBar}
                                    type="text" placeholder="Tìm kiếm tài khoản theo tên ..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                                <button 
                                    className={stylepo.backButton}
                                    onClick={() => resetFilter()}
                                >
                                    <IoMdRefresh></IoMdRefresh>
                                </button>
                                <div className={`${style.filterBlock} ${style.BlockRow}`}
                                    onClick={() => {
                                        setshowFilterPopup(true)
                                        setJoinTemp('all');
                                        setGrStateTemp('all');
                                    }}>
                                    <FaFilter></FaFilter>
                                    <p>Bộ lọc</p>
                                </div>
                            </div>
                            {/* List Nhóm */}
                            <div>
                                <OutGrFs isOpen={showPopup} onClose={() => setShowPopup(false)} GrOutName={selectedGrOut}>
                                    <button 
                                        onClick={() => {handleLeavePopup(isOutGr)}}
                                        className={stylepu.PopupOutGrConfirmButton}>
                                        Xác nhận
                                    </button>
                                </OutGrFs>
                                <Filter 
                                    isOpen={showFilter}
                                    onClose={() => setshowFilterPopup(false)} 
                                    onApply={HandleFilter}>
                                </Filter>
                                <CancelQueuePopup
                                    isOpen={showCancelQueuePopUp}
                                    onClose={() => setShowCancelQueuePopUp(false)}
                                    GrCancelName={selectedGrOut}
                                >
                                    <button 
                                        onClick={() => {
                                            handleCancelQueue(isOutGr);
                                        }}
                                        className={stylepu.PopupOutGrConfirmButton}>
                                        Xác nhận
                                    </button>
                                </CancelQueuePopup>
                                <QuestionPopup
                                    isOpen={showPrivateGrQues}
                                    onClose={() => {setShowPrivateGrQues(false)}}
                                    questions={approvalQuestions}
                                    onSubmit={(answers) => {
                                        setSent(true);
                                        // Xử lý dữ liệu ở đây
                                        setTimeout(() => UpdateGrState(privateGrSelected), 300);
                                        // validateRequiredFields(approvalQuestions, answers);
                                        if (privateGrSelected) {
                                        console.log(accountId, privateGrSelected, answers);
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
                                <div className={style.GroupListAttribute}>
                                    <input type="checkbox" onChange={(e) => e.target.checked}/>
                                    <div className={style.GroupListContent}>Tên nhóm</div>
                                    <div className={style.GroupListContent}>Trạng thái nhóm</div>
                                    <div className={style.GroupListContent}>Số thành viên</div>
                                    <div className={style.GroupListContent}>Ngành nghề</div>
                                    <div className={style.GroupListContent}>Trạng thái</div>
                                    <div className={style.GroupListContent}>Hành động</div>
                                </div>
                                <div className={`${style.BlockColumn} ${style.GroupListContainer}`}>
                                    {isLoading ? (
                                        // Loading skeleton
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px' }}>
                                            <div style={{ textAlign: 'center', color: '#666' }}>
                                                <div style={{ 
                                                    width: '40px', 
                                                    height: '40px', 
                                                    border: '3px solid #f3f3f3', 
                                                    borderTop: '3px solid #3498db', 
                                                    borderRadius: '50%', 
                                                    animation: 'spin 1s linear infinite',
                                                    margin: '0 auto 10px'
                                                }}></div>
                                                <p>Đang tải dữ liệu nhóm...</p>
                                            </div>
                                            {/* Loading skeleton items */}
                                            {[...Array(5)].map((_, index) => (
                                                <div key={index} className={`${style.GroupBlock} ${style.BlockRow}`} style={{ opacity: 0.6, backgroundColor: '#f5f5f5' }}>
                                                    <div className={style.grlistName} style={{ backgroundColor: '#ddd', height: '20px', borderRadius: '4px' }}></div>
                                                    <div className={style.grState} style={{ backgroundColor: '#ddd', height: '20px', width: '30px', borderRadius: '4px' }}></div>
                                                    <div className={style.grMember} style={{ backgroundColor: '#ddd', height: '20px', width: '50px', borderRadius: '4px' }}></div>
                                                    <div className={style.grCategory} style={{ backgroundColor: '#ddd', height: '20px', borderRadius: '4px' }}></div>
                                                    <div className={style.joinStateBlock} style={{ backgroundColor: '#ddd', height: '30px', width: '80px', borderRadius: '4px' }}></div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : fetchError ? (
                                        // Error state
                                        <div style={{ textAlign: 'center', padding: '40px', color: '#e74c3c' }}>
                                            <div style={{ fontSize: '48px', marginBottom: '10px' }}>⚠️</div>
                                            <h3>Lỗi tải dữ liệu</h3>
                                            <p>{fetchError}</p>
                                            <button 
                                                onClick={() => window.location.reload()} 
                                                style={{ 
                                                    padding: '10px 20px', 
                                                    backgroundColor: '#3498db', 
                                                    color: 'white', 
                                                    border: 'none', 
                                                    borderRadius: '5px', 
                                                    cursor: 'pointer',
                                                    marginTop: '10px'
                                                }}
                                            >
                                                Thử lại
                                            </button>
                                        </div>
                                    ) : filteredPage.length === 0 ? (
                                        // No data state  
                                        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                                            <div style={{ fontSize: '48px', marginBottom: '10px' }}>📭</div>
                                            <h3>Không có nhóm nào</h3>
                                            <p>Không tìm thấy nhóm phù hợp với bộ lọc hiện tại.</p>
                                        </div>
                                    ) : (
                                        // Render groups normally
                                        filteredPage.map(group => (
                                        <div key={group.id} className={`${style.GroupBlock} ${style.BlockRow}`}>
                                            <input type="checkbox"></input>
                                            <div className={style.grlistName}>{group.Name}</div>
                                            <div id="GrState" className={style.grState}>
                                                {group.Status === "Hoạt động" ? (
                                                    <MdPublic className={style.ic} style={{color: 'rgb(0, 0, 0, 0.7)'}}></MdPublic>
                                                ) : (
                                                    <FaLock className={style.ic} style={{color: 'rgb(0, 0, 0, 0.7)'}}></FaLock>
                                                )}
                                            </div>
                                            {/* <h2 style={{marginLeft: 'auto'}}>
                                                {group.isJoin == 1 ? (<p>Đã tham gia</p>) : (<p>Chưa tham gia</p>)}
                                            </h2> */}
                                            <div id="member" className={style.grMember}>
                                                {/* <div style={{paddingTop: '3px'}}><FaUsers className={style.ic}></FaUsers></div> */}
                                                <p>{group.Number_Of_Posts}</p>
                                            </div>
                                            {/*  */}
                                            <div className={style.grCategory}>
                                                <p>{group.Link}</p>
                                            </div>
                                            {/* state */}
                                            <div className={style.grStateQueue}>
                                                {group.user_status === 'Đã tham gia' ? (
                                                    <div className={style.joinedStateBlock}>
                                                        đã tham gia
                                                    </div>
                                                // chưa tham gia
                                                ) : group.user_status === 'Chưa tham gia' ? (
                                                    <div className={`${style.notJoinedStateBlock}`}>
                                                        chưa tham gia
                                                    </div>
                                                // hàng đợi
                                                ) : group.user_status === 'Chờ duyệt' ? (
                                                    <div className={`${style.queueStateBlock}`}>
                                                        đang chờ duyệt
                                                    </div>
                                                ) : (
                                                    <p className={style.errorJoin}>Đã hết hạn</p>
                                                )}
                                            </div>
                                            {/* đã tham gia */}
                                            <div className={`${style.joinStateBlock}`}>
                                                {group.user_status === 'Đã tham gia' ? (
                                                    <div className={style.joinedBlock}>
                                                        <button className={style.buttonPost} 
                                                                onClick={() => {
                                                                    HandlePostGroup(group.Link.replace("groups/", ""));
                                                                }}>
                                                                <HiOutlinePencilSquare size={20}/>
                                                        </button>
                                                        <button className={style.buttonOutGr}
                                                                onClick={() => {
                                                                    setSelectedGrOut(group.Name); 
                                                                    setShowPopup(true);
                                                                    setIsOutGr(group.Link);}
                                                                }>
                                                                <IoExitOutline size={20}/>
                                                        </button> {/* onclick */}
                                                    </div>
                                                // chưa tham gia
                                                ) : group.user_status === 'Chưa tham gia' ? (
                                                    <div className={`${style.BlockRow} ${style.joinGrButton}`}
                                                        onClick={() => {
                                                            {if (group.Status !== "Hoạt động") {
                                                                setPrivateGrSelected(group.id);
                                                                setShowPrivateGrQues(true);
                                                                setpopupHeader([group.Name, group.Status, group.Number_Of_Posts]);
                                                            } else {
                                                                setShowLoading(true);
                                                                UpdateGrState(group.Link);
                                                            }
                                                            }}}>
                                                        <IoEnterOutline size={20}/>
                                                    </div>
                                                // hàng đợi
                                                ) : group.user_status === 'Chờ duyệt' ? (
                                                    <div className={`${style.BlockRow}`}>
                                                        {/* them list danh sách các nhóm trong queue thay phan compare */}
                                                        <div className={style.BlockRow}>
                                                            <button className={style.buttonOutGr} 
                                                                    style={{marginRight: '10px'}}
                                                                    onClick={() => {
                                                                        setShowCancelQueuePopUp(true);
                                                                        setSelectedGrOut(group.Name);
                                                                        setIsOutGr(group.Link);
                                                                    }}>
                                                                <MdClose size={20}/>
                                                            </button>
                                                            {/* <div className={style.BlockRow}>
                                                                <div className={`${style.BlockRow} ${style.onQueue}`}>
                                                                    <HiMiniQueueList style={{marginRight: '7px'}} className={style.ic}/>
                                                                    <p style={{paddingTop: '2px'}}>Chờ duyệt</p>
                                                                </div>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className={style.errorJoin}>Đã hết hạn</p>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                    )}
                                </div>
                                {!isLoading && !fetchError && filteredPage.length > 0 && (
                                // <div id="PageIndexBar" className={style.indexBarContainer}>
                                //     <button onClick={goToPrev} disabled={currentPage === 1} style={{marginRight: '20px'}}>
                                //         <FaArrowLeft className={style.ic}></FaArrowLeft>
                                //     </button>
                                //     <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Trang {currentPage} / {totalPages}</span>
                                //     <button onClick={goToNext} disabled={currentPage === totalPages} style={{marginLeft: '20px'}}>
                                //         <FaArrowRight className={style.ic}></FaArrowRight>
                                //     </button>
                                // </div>
                                <UserListIndexBar
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    goToPrev={goToPrev}
                                    goToNext={goToNext}
                                    setItemsPerPage={(itemsPerPage) => {setItemsPerPage(itemsPerPage); setCurrentPage(1);}}
                                ></UserListIndexBar>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <LoadingDialog show={showLoading} message="Đang gửi yêu cầu..." onClose={() => setShowLoading(false)} />
    </>
    );
}
