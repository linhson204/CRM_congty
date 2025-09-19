import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import styles from "@/components/crm/potential/potential.module.css";
import getFbAccountsData from "@/pages/api/toolFacebook/danhsachnhom/GetFbAccounts.js";
import Cookies from "js-cookie";
import { upperCase } from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { CiBoxList } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { LiaFacebookMessenger } from "react-icons/lia";
import UserFilter from "./components/filter/UserFilter";
import SearchBar from "./components/SearchBar";
import UserListIndexBar from "./components/UserListIndexBar";
import style from "./styles.module.css";

export default function HomePage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any = useHeader();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [devices, setDevices] = useState<string[]>([])

  // Danh sách ID được phép truy cập trang Tool Facebook
  const ALLOWED_USER_IDS = [
    "22614471",
    "22773024",
    "22858640",
    "22865598",
    "22615833",
    "22616467",
    "22636101",
    "22789191",
    "22814414",
    "22833463",
    "22889226",
    "22894754",
    "22889521",
    "22814414",
    // Thêm các ID được phép vào đây
  ];
  // States cho kiểm tra quyền
  const [hasPermission, setHasPermission] = useState(false);
  const [isCheckingPermission, setIsCheckingPermission] = useState(true);
  const [currentUserID, setCurrentUserID] = useState<string | null>(null);

  // const itemsPerPage = 10;
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeFilter, setActiveFilter] = useState<string | null>('all');
  const [deviceFilter, setDeviceFilter] = useState<string | null>('all');
  const crmID = Cookies.get("userID");

  const [accounts, setAccounts] = useState<any[]>([]);

  // Kiểm tra quyền truy cập và fetch posts
  useEffect(() => {
    const checkPermission = async () => {
      try {
        const token_base365 = Cookies.get("token_base365");

        if (!token_base365 || !crmID) {
          window.alert("Bạn chưa đăng nhập!");
          router.push("/");
          return;
        }

        // Kiểm tra userID có trong danh sách được phép không
        if (!ALLOWED_USER_IDS.includes(crmID)) {
          window.alert("Bạn không có quyền truy cập trang Tool Facebook!");
          router.push("/");
          return;
        }

        setHasPermission(true);
        setCurrentUserID(crmID); // Set userID để trigger fetch Facebook accounts

        // Posts sẽ được fetch sau khi có Facebook accounts
      } catch (error) {
        console.error("Lỗi kiểm tra quyền:", error);
        window.alert("Có lỗi xảy ra khi kiểm tra quyền!");
        router.push("/");
      } finally {
        setIsCheckingPermission(false);
      }
    };

    checkPermission();
  }, [router]);

  // lay data
  useEffect(() => {
    const test = async () => {
      const a = await getFbAccountsData(crmID, "", "");
      const data1 = a.results.map((item, index) => ({
        ...item,
        Mess: 1,
        STT: index + 1,
      }));
      setAccounts(data1);
      setDevices(Array.from(new Set(a.results.map(user => user.device_name))));
    };
    test();
  }, []);

  //Search tai khoan theo ten
  const filteredUser = accounts.filter((user) => {
    const activeMatch = activeFilter == 'all' || user.status === activeFilter;
    const deviceMatch = deviceFilter == 'all' || user.device_name === deviceFilter;
    const nameMatch =
      search.trim() === "" ||
      user.name
        .replace(/\s+/g, "")
        .toLowerCase()
        .includes(search.replace(/\s+/g, "").toLowerCase()) ||
      user.account.includes(search);

    return activeMatch && nameMatch && deviceMatch;
  });

  //Phan Lai trang
  const filteredPage = filteredUser.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUser.length / itemsPerPage);
  const goToPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goToNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const ResetFilter = () => {
    setActiveFilter('all');
    setDeviceFilter('all');
    setSearch("");
    setCurrentPage(1);
  };
  //Trang nhan tin
  const GotoMessPage = () => {
    const timeout = 500;
    setTimeout(() => {
      router.push("/toolfacebook/tham-gia-nhom/nhantin");
    }, timeout);
  };

  //handle/router dang bai ca nhan
  const PersonalPostClick = (username: string) => {
    try {
      const selectedData = {
        account: accounts.find((e) => e.account == username),
      };
      // Hoặc local storage (tồn tại lâu hơn)
      localStorage.setItem("userProfile", JSON.stringify(selectedData));
      router.push(`/toolfacebook/tham-gia-nhom/dbtrangcanhan/${username}`);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const GoToGroupDetail = (username: string) => {
    const selectedData = {
      account: accounts.find((e) => e.account == username),
    };
    // Hoặc local storage (tồn tại lâu hơn)
    localStorage.setItem("userProfile", JSON.stringify(selectedData));
    router.push(`./${username}/123`);
  };
  //
  useEffect(() => {
    setHeaderTitle(upperCase("Tool Facebook"));
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

  // Hiển thị loading khi đang kiểm tra quyền hoặc load Facebook accounts
  if (isCheckingPermission) {
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="noindex,nofollow" />
          <title>Tool Facebook - Các tài khoản</title>
        </Head>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            fontSize: "16px",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div>
            {isCheckingPermission
              ? "Đang kiểm tra quyền truy cập..."
              : "Đang tải danh sách Facebook accounts..."}
          </div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            Tool Facebook - Các tài khoản
          </div>
        </div>
      </>
    );
  }

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
              <div className={styles.main__title}>
                <div className={style.HomePageTitleBlock}>
                  <FaFacebook size={30} />
                  <p>HOMEPAGE</p>
                </div>
              </div>
              <div className={styles.form_add_potential}>
                {/* Header danh sách */}
                <div className={styles.main__body}>
                  <div className={style.headerList}>
                    <h2>Tổng số tài khoản FB: {accounts.length} tài khoản</h2>
                  </div>
                  {/* list tk */}
                  <div className={style.BlockColumn}>
                    <div
                      className={style.BlockRow}
                      style={{ marginBottom: "15px" }}
                    >
                      <p style={{ padding: "5px", marginLeft: "auto" }}>
                        Số tài khoản tìm được: {filteredUser.length}/{accounts.length}
                      </p>
                      <SearchBar
                        search={search}
                        setSearch={setSearch}
                        setshowFilterPopup={setShowFilter}
                        setCurrentPage={setCurrentPage}
                        placeholder={'Tên TK hoặc SĐT...'}
                        resetFilter={ResetFilter}
                      />
                      <UserFilter
                        isOpen={showFilter}
                        onClose={() => {setShowFilter(false)}}
                        onApply={(UserState, device) => {
                          setActiveFilter(UserState);
                          setDeviceFilter(device);
                          setCurrentPage(1);
                          setShowFilter(false);
                        }}
                        devices={devices}
                      />
                    </div>
                    {/* goi list danh sach tai khoan */}
                    <div className={style.UserListContainer}>
                      <div
                        className={`${style.UserListAttribute} ${style.BlockRow}`}
                      >
                        <div className={style.AttributeContent}>STT</div>
                        <div className={style.AttributeContent}>
                          Tên tài khoản
                        </div>
                        <div className={style.AttributeContent}>
                          Email/Số điện thoại
                        </div>
                        <div className={style.AttributeContent}>Mật khẩu</div>
                        <div className={style.AttributeContent}>Trạng thái</div>
                        <div className={style.AttributeContent}>Hành động</div>
                        <div className={style.AttributeContent}>Thiết bị quản lí</div>
                      </div>
                      <div
                        className={`${style.UserListContent} ${style.BlockColumn}`}
                      >
                        {filteredPage.map((item) => (
                          <div
                            className={`${style.UserListBlock} ${style.BlockRow}`}
                          >
                            <div style={{ paddingLeft: "10px" }}>
                              {item.STT}
                            </div>
                            <div
                              id="User_Name"
                              className={`${style.UserListName}`}
                            >
                              {item.name}
                            </div>
                            <div id="Email">{item.account}</div>
                            <div id="Phone">{item.password}</div>
                            <div className={style.UserListBlockState}>
                              {item.status == 'Online' ? (
                                <div className={`${style.BlockOnline}`}>
                                  Online
                                </div>
                              ) : item.status == 'Offline' ? (
                                <div className={`${style.BlockOffline}`}>
                                  Offline
                                </div>
                              ) : item.status == 'Not available' ? (
                                <div style={{color: 'gray'}}>
                                  Not available
                                </div>
                              ) : (<div>error</div>)}
                            </div>
                            <div
                              id="edit"
                              className={`${style.BlockRow} ${style.UserListEditBlock}`}
                            >
                              <div
                                id="haveMessBlock"
                                onClick={GotoMessPage}
                                className={style.Message}
                              >
                                <LiaFacebookMessenger size={27} />
                                {item.Mess > 0 ? (
                                  <div id="redDot" className={style.dot}></div>
                                ) : (
                                  <div />
                                )}
                              </div>
                              <HiOutlinePencilSquare
                                style={{ cursor: "pointer" }}
                                className={style.ic}
                                onClick={() => PersonalPostClick(item.account)}
                              />
                              <CiBoxList
                                className={style.ic}
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setTimeout(() => {
                                    GoToGroupDetail(item.account);
                                  }, 300);
                                }}
                              ></CiBoxList>
                            </div>
                            <div>{item.device_name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <UserListIndexBar
                    currentPage={currentPage}
                    totalPages={totalPages}
                    goToPrev={goToPrev}
                    goToNext={goToNext}
                    setItemsPerPage={(itemsPerPage) => {
                      setItemsPerPage(itemsPerPage);
                      setCurrentPage(1);
                    }}
                    goToPage={goToPage}
                  ></UserListIndexBar>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
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
