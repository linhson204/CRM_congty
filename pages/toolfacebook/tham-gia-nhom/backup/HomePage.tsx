import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import styles from "@/components/crm/potential/potential.module.css";
import { getFacebookAccountsByUserID } from "@/components/toolFacebook/dangbai/constants/facebookAccountsMapping";
import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { CiBoxList } from "react-icons/ci";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaSearch } from 'react-icons/fa';
import { FiMessageCircle } from "react-icons/fi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import style from './styles.module.css';

interface Users {
  id: number;
  name: string;
  friend: number;
  GrIn?: number;
  GrOut?: number;
  Post: number;
  Comment: number;
  isJoin: boolean;
  Mess: number;
  groups: Group[];
  Active?: boolean;
}

interface Group {
  id: number;
  GroupName: string;
  GroupState: string;
  Member: number;
  isJoin: number;
}

export default function DangBai() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any = useHeader();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 10;
  const [activeFilter, setActiveFilter] = useState<boolean | null>(null)
  const crmID = Cookies.get("userID");

  //get tk crm dang quan li
  const mapdata = getFacebookAccountsByUserID("22773024"); // crmId
  const data = mapdata.map((item, index) => ({
    ...item,
    Mess: 1,
    STT: index + 1,
    Active: (index % 3 === 1) ? true : false,
  }))

  console.log(data)
  // Lay data
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Cách 1: Nếu file JSON trong public folder
        const response = await fetch('../../data/account.json');
        
        // Cách 2: Nếu import trực tiếp
        // const data = await import('@/data/accountjson.json');
        
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        
        // Kiểm tra cấu trúc dữ liệu
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format: Expected array');
        }
        
        // Cập nhật state với dữ liệu đã kiểm tra
        setUsers(data.map(user => ({
          ...user,
          Active: user.Active !== undefined ? user.Active : false, // Mặc định false
          groups: user.groups || [] // Đảm bảo groups luôn là mảng
        })));
        
      } catch (error) {
        console.error('Error loading user data:', error);
        // Xử lý lỗi (hiển thị thông báo, v.v.)
      }
    };

    fetchUsers();
  }, []);

  // const filteredUser = search.trim() === ''
  // ? users
  // : users.filter((user) => {
  //     const normalizedSearch = search.replace(/\s+/g, '').toLowerCase();
  //     const normalizedName = user.name.replace(/\s+/g, '').toLowerCase();
  //     return normalizedName.includes(normalizedSearch);
  // });

  //Search tai khoan theo ten
  const filteredUser = data.filter((user) => {
    const activeMatch = activeFilter === null || user.Active === activeFilter;

    const nameMatch = search.trim() === '' || 
    user.userNameFb.replace(/\s+/g, '').toLowerCase()
    .includes(search.replace(/\s+/g, '').toLowerCase());
  
    return activeMatch && nameMatch;
  });

  //Phan Lai trang
  const filteredPage = filteredUser.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredUser.length / itemsPerPage);
  const goToPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goToNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  //Trang nhan tin
  const handleUserClick = () => {
    const timeout = 500;
    setTimeout(() => {
      router.push('/toolfacebook/tham-gia-nhom/nhantin');
    }, timeout);
  };

  //handle/router dang bai ca nhan
  const PostClick = () => {
    router.push('/toolfacebook/dang-bai');
  };
    
  //
  useEffect(() => {
    setHeaderTitle("Tool Facebook - Danh Sách Tài Khoản");
    setShowBackButton(false);
    setCurrentPath("/toolfacebook/tham-gia-nhom/HomePage");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);
  // 
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Tool Facebook - HomePage</title>
        <meta name="description" content="Quản lý và đăng bài lên Facebook" />
      </Head>
      
      <div className={styleHome.main} ref={mainRef}>
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}>Tool Facebook - DANH SÁCH TÀI KHOẢN</div>
              <div className={styles.form_add_potential}>
                {/* Header danh sách */}
                <div className={styles.main__body}>
                  <div className={style.headerList}>
                    <h2>Danh Sách Tài Khoản ToolFB đang sử dụng</h2>
                    <span>Tổng số tài khoản: {data.length}</span>
                  </div>
                  {/* list tk */}
                  <div style={{overflowY: 'scroll'}} className={style.BlockColumn}>
                    <div className={style.BlockRow} style={{marginBottom: '15px'}}>
                      <div id="searchContainer" className={`${style.BlockRow} ${style.searchContainer}`}>
                        <FaSearch className={style.searchIcon} />
                        <input type="text" placeholder='Tìm kiếm tên tài khoản' className={style.searchInput}
                          value={search}
                          onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }} />
                      </div>
                      <div className={style.filterContainerHP}>
                        <div className={style.BlockRow} style={{marginLeft: '50px', width: '300px'}}>
                          <label className={style.filterLabel}>Lọc trạng thái:</label>
                          <select
                            className={style.filterSelect}
                            value={activeFilter === null ? 'all' : activeFilter.toString()}
                            onChange={(e) => {
                              const value = e.target.value;
                              setActiveFilter(
                                value === 'all' ? null :
                                value === 'true' ? true : false
                              );
                              setCurrentPage(1);
                            }}
                          >
                            <option value="all">Tất cả</option>
                            <option value="true">Online</option>
                            <option value="false">Offline</option>
                          </select>
                        </div>
                      </div>
                      <p style={{padding: '5px', marginLeft: "auto"}}>
                        Số tài khoản tìm được: {filteredUser.length}/{data.length}
                      </p>
                    </div>
                    {/* goi list danh sach tai khoan */}
                    <div className={style.UserListContainer}>
                      <div className={`${style.UserListAttribute} ${style.BlockRow}`}>
                        <div className={style.AttributeContent}>STT</div>
                        <div className={style.AttributeContent}>Tên tài khoản</div>
                        <div className={style.AttributeContent}>Email/Số điện thoại</div>
                        <div className={style.AttributeContent}>Mật khẩu</div>
                        <div className={style.AttributeContent}>Trạng thái</div>
                        <div className={style.AttributeContent}>Hành động</div>
                      </div>
                      <div className={`${style.UserListContent} ${style.BlockColumn}`}>
                        {filteredPage.map(item => (
                          <div className={`${style.UserListBlock} ${style.BlockRow}`}>
                            {/* Row */}
                              <div style={{paddingLeft: "10px"}}>{item.STT}</div>
                            {/* Name */}
                                <div id="User_Name" className={`${style.UserListName}`}>{item.userNameFb}</div>
                            {/* Email */}
                                <div id="Email">{item.username}</div>
                            {/* Phone */}
                                <div id="Phone">{item.password}</div>
                            {/* State */}
                              <div className={style.UserListBlockState}>
                                {item.Active ? (
                                  <div className={`${style.BlockOnline}`}>
                                    Online
                                  </div>
                                ) : (
                                  <div className={`${style.BlockOffline}`}>
                                    Offline
                                  </div>
                                )}
                              </div>
                            {/* Edit */}
                              <div id="edit" className={`${style.BlockRow} ${style.UserListEditBlock}`}>
                                <div id="haveMessBlock" onClick={handleUserClick} className={style.Message}>
                                  <FiMessageCircle className={style.ic}/>
                                  {item.Mess > 0 ? (<div id="redDot" className={style.dot}></div>) : (<div/>)}
                                </div>
                                <HiOutlinePencilSquare style={{cursor: 'pointer'}} className={style.ic} onClick={PostClick} />
                                <CiBoxList className={style.ic} 
                                          style={{cursor: 'pointer'}}
                                          onClick={() => {
                                            setTimeout(() => {router.push(`./${item.facebookId}/[id]test`)}, 300)
                                          }}>
                                </CiBoxList>
                              </div>
                            </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={`${style.BlockRow} ${style.bottomBarList}`}>
                    <div id="RecordCountBar" className={`${style.BlockRow} ${style.recordCountBar}`}>
                        <p>Hiển thị</p>
                        <select name="" id="" style={{marginLeft: '10px', marginRight: '10px'}}>
                          <option value="1">10</option>
                          <option value="2">20</option>
                          <option value="3">30</option>
                          <option value="4">40</option>
                          <option value="5">50</option>
                        </select>
                        <p>bản ghi trên một trang</p>
                    </div>
                    <div id="PageIndexBar" className={`${style.BlockRow} ${style.indexBar}`}>
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

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}