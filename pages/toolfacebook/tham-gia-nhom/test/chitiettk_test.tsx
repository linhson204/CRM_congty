import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import styles from "@/components/crm/potential/potential.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaLock, FaUserCircle, FaUsers } from "react-icons/fa";
import { MdPublic } from "react-icons/md";
import style from './styles.module.css';


interface Groups {
    id: number;
    GroupName: string;
    GroupState: string;
    Member: number;
    State: string;
    GrIn: number;
    GrNotIn: number;
    isJoin: boolean;
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

    const [groups, setGroups] = useState<Groups[]>([
        { 
            id: 1, GroupName: 'ViecHay3656', GrIn: 300, 
            GrNotIn: 10, GroupState: 'Public', Member: 300, 
            State: 'Chưa tham gia', isJoin: false
        },
        { 
            id: 2, GroupName: 'Timviec6s', GrIn: 100, 
            GrNotIn: 15, GroupState: 'Private', Member: 20, 
            State: 'Đã tham gia', isJoin: true
        },
        { 
            id: 3, GroupName: 'Jobgovn', GrIn: 122, 
            GrNotIn: 22, GroupState: 'Private', Member: 25, 
            State: 'Chưa tham gia', isJoin: false
        },
        { 
            id: 4, GroupName: 'Timviec3s', GrIn: 322, 
            GrNotIn: 11, GroupState: 'Public', Member: 30, 
            State: 'Đã tham gia', isJoin: true
        },
        { 
            id: 5, GroupName: 'Topcv365', GrIn: 322, 
            GrNotIn: 11, GroupState: 'Private', Member: 30, 
            State: 'Chưa tham gia', isJoin: false
        },
        { 
            id: 6, GroupName: 'Viecnhanh3s', GrIn: 322, 
            GrNotIn: 11, GroupState: 'Public', Member: 30, 
            State: 'Đã tham gia', isJoin: true
        },
        { 
            id: 7, GroupName: 'CVnhanh247', GrIn: 322, 
            GrNotIn: 11, GroupState: 'Public', Member: 30, 
            State: 'Chưa tham gia', isJoin: false
        },
        { 
            id: 8, GroupName: 'Vieccham246', GrIn: 322, 
            GrNotIn: 11, GroupState: 'Private', Member: 30, 
            State: 'Đã tham gia', isJoin: true
        },
        { 
            id: 9, GroupName: 'Viecsieunhanh249', GrIn: 322, 
            GrNotIn: 11, GroupState: 'Private', Member: 30, 
            State: 'Đã tham gia', isJoin: true
        },
    ]);


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

        // Phải thỏa mãn cả 3 điều kiện
        return nameMatch && statusMatch && joinMatch;
    });
    }, [groups, filterPublic, filterPrivate, filterJoined, filterNotJoin, search]);

    console.log({filteredGroups});

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

    const BackPageClick = () => {
        router.push('/toolfacebook/tham-gia-nhom/HomePage');
    };
    // const [groups, setGroups] = useState<Groups[]>([]);
    // useEffect(() => {
    //     fetch('../../api/UserDataTest')
    //     .then(res => res.json())
    //     .then(data => setGroups(data));
    // }, []);
    //
    
    
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
                                        <p className={style.nameDetail}>Ten tai khoan</p>
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
                                <div style={{overflowY: 'scroll', border: '1px solid black', padding: '20px'}} className={style.BlockColumn}>
                                    {filteredPage.map(group => (
                                        <div key={group.id} className={`${style.Block} ${style.BlockColumn}`}>
                                                <div id="TopRow" className={style.BlockRow}>
                                                    <h3 style={{fontSize: '30px'}}>{group.GroupName}</h3>
                                                    <h2 style={{marginLeft: 'auto'}}>{group.State}</h2>
                                                </div>
                                                <div id="BottomRow" className={style.BlockRow} style={{marginTop: 'auto'}}>
                                                    <div id="GrState" className={style.BlockRow}>
                                                        {group.GroupState == "Public" ? (
                                                            <div style={{paddingTop: '3px'}}><MdPublic className={style.ic}></MdPublic></div>
                                                        ) : (
                                                            <div style={{paddingTop: '3px'}}><FaLock className={style.ic}></FaLock></div>
                                                        )}
                                                        <h2 style={{marginLeft: '10px'}}>{group.GroupState}</h2>
                                                    </div>
                                                    <div id="member" style={{marginLeft: '20px'}} className={style.BlockRow}>
                                                        <div style={{paddingTop: '3px'}}><FaUsers className={style.ic}></FaUsers></div>
                                                        <h2 style={{marginLeft: '10px'}}>{group.Member}</h2>
                                                    </div>
                                                    {group.isJoin ? (
                                                        <div className={style.BlockRow} style={{marginLeft: 'auto'}}>
                                                            <button className={style.buttonBack} onClick={PostClick}>Đăng bài</button>
                                                            <button className={style.buttonOutGr}>Rời nhóm</button> {/* onclick */}
                                                        </div>
                                                    ) : (
                                                        <button className={style.buttonBack} onClick={() => setSent(!Sent)}>
                                                            {Sent ? 'Tham gia nhóm' : 'Đang chờ duyệt'}
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
    </>
    );
}
