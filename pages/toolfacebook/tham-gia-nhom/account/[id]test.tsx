import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import styles from "@/components/crm/potential/potential.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaLock, FaUserCircle, FaUsers } from "react-icons/fa";
import { MdGroupAdd, MdPublic } from "react-icons/md";
import { PiWarningCircleLight } from "react-icons/pi";
import data from '../../../../public/data/account.json';
import OutGrFs from "../popup/OutGrFS";
import style from '../styles.module.css';

interface Group {
    id: number;
    GroupName: string;
    GroupState: string;
    Member: number;
    isJoin: boolean;
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
    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [filterPublic, setFilterPublic] = useState(false);
    const [filterPrivate, setFilterPrivate] = useState(false);
    const [filterJoined, setFilterJoined] = useState(false);
    const [filterNotJoin, setFilterNotJoin] = useState(false);
    const [Sent, setSent] = useState(true);
    const { id } = router.query;
    const [account, setAccount] = useState<Account | null>(null); //data tong dau vao
    const [groups, setGroups] = useState<Group[]>([]);
    //loading ten
    const [uname, setUname] = useState('');

    //tham gia nhóm
    const [pendingGr, setpendingGr] = useState<number | null>(null);

    //Popup rời nhóm
    const [showPopup, setShowPopup] = useState(false);
    const [GrOutSelected, SetGrOutSelected] = useState<number | null>(null);
    // const [groups, setGroups] = useState<Groups[]>([]);
    // console.log(groups)

    // useEffect(() => {
    //     if (!id) return;
    //     const fetchData = async () => {
    //         const response = await fetch(`../../../pages/api/account/${id}`);
    //         const data: Account = await response.json();
    //         setAccount(data); // Set data cho 1 account
    //     };
    //     fetchData();
    // }, [id]);
    // const [groups, setGroups] = useState<Groups[]>([]);
    // useEffect(() => {
    //     fetch('../../api/UserDataTest')
    //     .then(res => res.json())
    //     .then(data => setGroups(data));
    // }, []);
    //

    useEffect(() => { //xu li su kien moi khi tim dung account
        if (!id) return;
        const timer = setTimeout(() => {
        const foundAccount = data.find(acc => acc.id === Number(id));
        setAccount(foundAccount || null);
        setGroups(foundAccount.groups);
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

    // useEffect(() => {
    //     const isReload =
    //     performance.navigation?.type === 1 || // type 1 = reload (legacy API)
    //     (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming)?.type === "reload";

    //     const cameFromOutside =
    //     !document.referrer.includes(window.location.origin); // Không phải điều hướng nội bộ

    //     // Chỉ redirect nếu reload và đến từ cùng origin (nghĩa là user bấm F5)
    //     if (isReload && !cameFromOutside) {
    //     router.replace("/toolfacebook/tham-gia-nhom/HomePage");
    //     }
    // }, []);

    useEffect(() => {
        if(pendingGr) {
            PendingHandleData(pendingGr);
        }
    }, [pendingGr]);

    const filteredGroups = useMemo(() => {
        return groups.filter(group => {
        // 1. Lọc theo tên (luôn áp dụng)
        const nameMatch = group.GroupName.toLowerCase().includes(search.toLowerCase());
        if (!nameMatch) return false;

        // 2. Lọc trạng thái (nếu có chọn)
        const statusMatch = 
        (!filterPublic && !filterPrivate) || // Không chọn trạng thái nào
        (filterPublic && group.GroupState === 'Public') || 
        (filterPrivate && group.GroupState === 'Private');

        // 3. Lọc tham gia (nếu có chọn)
        const joinMatch = 
        (!filterJoined && !filterNotJoin) || // Không chọn trạng thái tham gia nào
        (filterJoined && group.isJoin === true) ||
        (filterNotJoin && group.isJoin === false);
        
        const result = nameMatch && statusMatch && joinMatch;
        // Phải thỏa mãn cả 3 điều kiện
        return result;
    });
    }, [groups, filterPublic, filterPrivate, filterJoined, filterNotJoin, search]);

    const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);
    const goToPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
    const goToNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

    const filteredPage = filteredGroups.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )
    // DANG BAI - SET BUTTON BACK
    const PostClick = () => {
        router.push('/toolfacebook/dang-bai');
    };

    const BackPageClick = () => {
        router.push('/toolfacebook/tham-gia-nhom/HomePage');
    };

    const PendingHandle = (id: number) => {
        setpendingGr(id);
    };

    const PendingHandleData = (GrId: number) => {
        // if (pendingGr.includes(group.id)) {
        //     setpendingGr(pendingGr.filter(id => id !== group.id));
        // } else {
        //     setpendingGr([...pendingGr, group.id]);
        // }
        //call API tra id user id nhom vao day
        console.log(id, GrId);
    }

    // Tra id user, id nhom -> be tra cho tool -> tool chay -> tra lai state id nhom
    const handleLeavePopup = () => { 
        setShowPopup(false);
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
                            {/* Title + BackButton */}
                            <div style={{marginTop:'10px'}} className={style.BlockRow}>
                                <p style={{fontSize: '30px', float: 'left', width: 'fit-content'}}>CHI TIẾT TÀI KHOẢN</p>
                                {/* <button className={style.buttonBack} onClick={BackPageClick}>
                                    Quay lại
                                </button> */}
                            </div>
                            {/* Name + GroupIn/NotIn */}
                            <div style={{marginTop: '20px'}} className={style.BlockRow}>
                                <div id="UserName" className={style.BlockRow}>
                                    <FaUserCircle style={{width: '30px', height: '30px'}}></FaUserCircle>
                                    <p className={style.nameDetail}>{uname}</p>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'column', marginLeft: 'auto'}}>
                                    <div>Số nhóm đã tham gia: {groups.filter(group => group.isJoin === true).length} </div>
                                    <div>Số nhóm chưa tham gia: {groups.filter(group => group.isJoin === false).length}</div>
                                </div>
                            </div>

                            {/* thanh checkbox + ten */}
                            <div style={{marginTop: '20px', marginBottom: '20px'}} className={style.BlockRow}>
                                <input
                                    style={{marginLeft: '0px'}}
                                    className={style.searchBar}
                                    type="text" placeholder="TimKiem"
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
                            {/* List Nhóm */}
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
                                                onClick={() => {handleLeavePopup()}}
                                                className={style.PopupOutGrConfirmButton}>
                                                Xác nhận
                                            </button>
                                        </div>
                                </OutGrFs>
                                <div className={`${style.BlockColumn} ${style.BlockDetail}`}>
                                    {filteredPage.map(group => (
                                        <div key={group.id} className={`${style.Block} ${style.BlockColumn}`}>
                                            <div id="TopRow" className={style.BlockRow}>
                                                <h3 style={{fontSize: '30px'}}>{group.GroupName}</h3>
                                                <h2 style={{marginLeft: 'auto'}}>
                                                    {group.isJoin ? (
                                                        <p>Đã tham gia</p>
                                                    ) : (
                                                        <p>Chưa tham gia</p>
                                                    )}
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
                                                {group.isJoin ? (
                                                    <div className={style.BlockRow} style={{marginLeft: 'auto'}}>
                                                        <button className={style.buttonBack} onClick={PostClick}>Đăng bài</button>
                                                        <button className={style.buttonOutGr} onClick={() => {SetGrOutSelected(group.id); setShowPopup(true);}}>Rời nhóm</button> {/* onclick */}
                                                    </div>
                                                ) : (
                                                    <button className={`${style.buttonBack} ${style.BlockRow}`}
                                                            onClick={() => {
                                                                (group.GroupState == "Private") ? 
                                                                (console.log('popupprivate')) : (console.log('confirmpublic'));
                                                                }}>
                                                            <MdGroupAdd className={style.ic}></MdGroupAdd>
                                                            <p>tham gia nhóm</p>
                                                            {/* {() ? style.onQueue : style.buttonBack} */}
                                                    </button>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}
