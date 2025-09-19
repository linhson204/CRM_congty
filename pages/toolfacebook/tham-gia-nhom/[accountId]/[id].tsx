import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import styles from "@/components/crm/potential/potential.module.css";
import getGroupData from "@/pages/api/toolFacebook/danhsachnhom/laydatagr";
import joinGroup from "@/pages/api/toolFacebook/danhsachnhom/thamgianhom";
import OutGrFs from "@/pages/toolfacebook/tham-gia-nhom/[accountId]/popup/OutGrFS";
import CancelQueuePopup from "@/pages/toolfacebook/tham-gia-nhom/[accountId]/popup/PrivateGrQues/CancelQueue";
import FetchError from "@/pages/toolfacebook/tham-gia-nhom/components/fetchError";
import GroupFilter from "@/pages/toolfacebook/tham-gia-nhom/components/filter/GroupFilter";
import LoadingDialog from "@/pages/toolfacebook/tham-gia-nhom/components/LoadingDialog";
import LoadingSkeleton from "@/pages/toolfacebook/tham-gia-nhom/components/LoadingSkeleton.jsx";
import SearchBar from "@/pages/toolfacebook/tham-gia-nhom/components/SearchBar";
import StatisticBlock from "@/pages/toolfacebook/tham-gia-nhom/components/statisticBlock";
import StatusActionDialog from "@/pages/toolfacebook/tham-gia-nhom/components/StatusActionDialog";
import UserListIndexBar from "@/pages/toolfacebook/tham-gia-nhom/components/UserListIndexBar";
import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FaLock, FaUserCircle } from "react-icons/fa";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoExitOutline, IoPersonAdd } from "react-icons/io5";
import { MdClose, MdPublic } from "react-icons/md";
import style from "../styles.module.css";
import stylepu from "./popup/popup.module.css";

interface GroupsListProps {
  name?: string;
  link: string;
}

export default function GroupList() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any = useHeader();
  const router = useRouter();
  const { accountId } = router.query;
  // const itemsPerPage = 10;
  // Phân trang
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // Bộ lọc
  const [showFilter, setshowFilterPopup] = useState(false);
  const [selectedGrOut, setSelectedGrOut] = useState<string>("");
  const [search, setSearch] = useState("");
  const [grState, setGrState] = useState("all");
  const [joinState, setJoinState] = useState("all");
  //tham gia nhóm
  const [SuccessMess, setsuccessMess] = useState(''); //danh dau da gui
  // rời nhóm, huỷ tham gia
  const [isOutGr, setIsOutGr] = useState<number | null>(null);
  const [showCancelQueuePopUp, setShowCancelQueuePopUp] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  // const [grStateTemp, setGrStateTemp] = useState("all");
  // const [joinTemp, setJoinTemp] = useState("all");
  // popup trang thai gui command
  const [Sent, setSent] = useState('');
  const [IsSuccess, setisSuccess] = useState(false);
  // Load data, skeleton
  const [groupData, setGroupData] = useState<any[]>([]); //data that
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [showLoading, setShowLoading] = useState(false);
  // checkbox
  const [masterCheck, setMasterCheck] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<Set<string>>(new Set());
  const [groupsSelected, setGroupsSelected] = useState<any>([]);
  // localstorage
  const savedData = JSON.parse(localStorage.getItem("userProfile"));
  // trigger dang nhieu nhom
  const [isMultiJoin, setIsMultiJoin] = useState(false);
  // lay cookie userID
  let crmID = Cookies.get("userID");
  if (!crmID) {
    console.warn("CRM userID cookie is missing!");
    crmID = "defaultID"; // fallback value, replace with your logic
  }

  useEffect(() => {
    setHeaderTitle("TOOL FACEBOOK - Danh sách nhóm");
    setShowBackButton(true);
    setCurrentPath(`/toolfacebook/tham-gia-nhom/HomePage`);
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  // Gọi API lấy danh sách nhóm
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setFetchError(null);

    async function fetchData() {
      try {
        const [res1, res2, res3] = await Promise.all([
          getGroupData(accountId, "a", "", "", "Đã tham gia"),
          getGroupData(accountId, "", "", "", "Chờ duyệt"),
          getGroupData(accountId, "a", "", "", "Chưa tham gia"),
        ]);

        if (isMounted) {
          const res = [...res1.results, ...res2.results, ...res3.results];
          setGroupData(res);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching group data:", error);
          setFetchError("Không thể tải dữ liệu nhóm. Vui lòng thử lại.");
          setIsLoading(false);
        }
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  const filteredGroups = useMemo(() => {
    return groupData.filter((group) => {
      // 1. Lọc theo tên (luôn áp dụng)
      const nameMatch = group.Name.toLowerCase().includes(search.toLowerCase());
      if (!nameMatch) return false;

      // 2. Lọc trạng thái
      let statusMatch = true;
      if (grState !== "all" && grState !== "") {
        if (grState === "public") statusMatch = group.Status === "Hoạt động";
        else if (grState === "private")
          statusMatch = group.Status !== "Hoạt động";
      }

      // 3. Lọc tham gia
      let joinMatch = true;
      if (joinState !== "all" && joinState !== "") {
        if (joinState === "join")
          joinMatch = group.user_status === "Đã tham gia";
        else if (joinState === "not")
          joinMatch = group.user_status === "Chưa tham gia";
        else if (joinState === "pending")
          joinMatch = group.user_status === "Chờ duyệt";
      }

      return nameMatch && statusMatch && joinMatch;
    });
  }, [groupData, grState, joinState, search]);

  // Phân trang
  const totalPages = Math.ceil(filteredGroups.length / itemsPerPage);
  const goToPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goToNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const filteredPage = filteredGroups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Sync master checkbox with visible items
  useEffect(() => {
    if (filteredPage.length > 0) {
      const allVisibleSelected = filteredPage.every(group => selectedGroups.has(group.Link));
      setMasterCheck(allVisibleSelected);
    } else {
      setMasterCheck(false);
    }
  }, [filteredPage, selectedGroups]);

  // Event apply filter
  const HandleFilter = (grStateTemp: string, joinTemp: string) => {
    setGrState(grStateTemp);
    setJoinState(joinTemp);
    setshowFilterPopup(false);
    console.log(grStateTemp, joinTemp);
  };

  // Event reset filter
  const ResetFilter = async () => {
    setIsLoading(true);
    // setFetchError(null);
    setGrState("all");
    setJoinState("all");
    setSearch("");
    setCurrentPage(1);
    setItemsPerPage(10);
    setMasterCheck(false);
    setSelectedGroups(new Set());
    ResetUserList();
  };

  const HandleMultiPostClick = () => {
    router.push(`../${accountId}/dangbainhom/MultiPost`);
    localStorage.setItem("GroupsMultiPost", JSON.stringify(groupsSelected));
    console.log(groupsSelected);
  };

  async function ResetUserList() {
    try {
      // Clear current data to show skeleton immediately
      setGroupData([]);

      // Fetch fresh data from API
      const [res1, res2, res3] = await Promise.all([
        getGroupData(accountId, "a", "", "", "Đã tham gia"),
        getGroupData(accountId, "", "", "", "Chờ duyệt"),
        getGroupData(accountId, "a", "", "", "Chưa tham gia"),
      ]);

      // Combine all results
      const freshData = [...res1.results, ...res2.results, ...res3.results];
      setGroupData(freshData);
    } catch (error) {
      console.error("Error refreshing group data:", error);
      setFetchError("Không thể tải dữ liệu nhóm. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  }

  const HandleMasterCheckbox = (checked: boolean) => {
    setMasterCheck(checked);
    
    if (checked) {
      // Select all visible groups
      const allVisibleGroupLinks = filteredPage.map(group => group.Link);
      const newSelectedGroups = new Set(Array.from(selectedGroups).concat(allVisibleGroupLinks));
      setSelectedGroups(newSelectedGroups);
    } else {
      // Deselect all visible groups
      const visibleGroupLinks = new Set(filteredPage.map(group => group.Link));
      const newSelectedGroups = new Set(Array.from(selectedGroups).filter(link => !visibleGroupLinks.has(link)));
      setSelectedGroups(newSelectedGroups);
    }
  };

  // Router trang đăng bài nhóm
  async function HandlePostGroup(idgr: number, name: string) {
    const groupInfo = await getGroupData(accountId, `${name}`, "", "", "");
    localStorage.setItem("GroupProfile", JSON.stringify(groupInfo));
    console.log(groupInfo);
    router.push(`../${accountId}/dangbainhom/${idgr}`);
  };

  const HandleLeaveGroup = (id: any) => {
    setShowPopup(false);
    console.log(id, accountId);
    //request rời nhóm
  };

  const HandleCancelJoinGroup = (id: any) => {
    setShowCancelQueuePopUp(false);
    console.log(id, accountId);
    //request hủy bỏ tham gia nhóm
  };

  //xu li request hang doi
  const HandleJoinGroup = async (LinkGr: string) => {
    // Gọi API gửi request đến tool tham gia nhóm
    console.log(accountId, LinkGr);
    setShowLoading(true);

    const params = { group_link: `${LinkGr}` };
    await joinGroup(
      "join_group",
      savedData.account.account, //user_id
      params,
      crmID,
      "false"
    )
    .then((response) => {
      setTimeout(() => {
        if (response.message == 'Thêm lệnh thành công') {
          setsuccessMess("Tham gia nhóm thành công");
          setSent("SuccessDialogIcon")
          setisSuccess(true);
          ResetUserList();
        } else {
          setSent("ErrorDialogIcon")
          setisSuccess(true);
          setsuccessMess("Tham gia nhóm thất bại")
        }
      }, 1550)
    })
    .catch(error => {
      console.log(error)
    })
  };

  const BoxChosenCheck = (checked: boolean, id: string, name: string) => {
    //logic check box
    const newSelectedGroups = new Set(selectedGroups);
    
    if (checked && !selectedGroups.has(id)) {
      newSelectedGroups.add(id);
    } else if (!checked && selectedGroups.has(id)) {
      newSelectedGroups.delete(id);
    }
    
    setSelectedGroups(newSelectedGroups);
    setIsMultiJoin(newSelectedGroups.size > 0 ? true : false);
    
    // Update master checkbox state
    const allVisibleSelected = filteredPage.every(group => newSelectedGroups.has(group.Link));
    setMasterCheck(allVisibleSelected && filteredPage.length > 0);
    
    // Create array of objects with name and link pairs
    const selectedGroupObjects = Array.from(newSelectedGroups).map(link => {
      // Find the corresponding group from filtered data to get the name
      const group = filteredPage.find(g => g.Link === link) || groupData.find(g => g.Link === link);
      return {
        name: group?.Name || '',
        link: link
      };
    });
    
    console.log(selectedGroupObjects);
    setGroupsSelected(selectedGroupObjects);
    return selectedGroupObjects;
  };

  const HardReload = () => {
    setShowLoading(true);
    setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Tool Facebook - Danh sách nhóm</title>
        <meta name="description" content="Quản lý và đăng bài lên Facebook" />
        <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.5; }
                    100% { opacity: 1; }
                }
                
                .skeleton-item {
                    animation: pulse 1.5s ease-in-out infinite;
                }
            `}</style>
      </Head>
      <div className={styleHome.main} ref={mainRef}>
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}></div>
              <div
                style={{ padding: "5px", backgroundColor: "#f9f9f9" }}
                className={styles.form_add_potential}
              >
                {/* Name + GroupIn/NotIn */}
                <div className={style.statBlockContainer}>
                  <StatisticBlock
                    content="Nhóm nhiều bài viết nhất"
                    count={123}
                  />
                  <StatisticBlock content="Số nhóm chưa tham gia" count={123} />
                  <StatisticBlock
                    content="Ngành nghề phổ biến nhất"
                    count={123}
                  />
                  <StatisticBlock
                    content="Nhóm nhiều thành viên nhất"
                    count={123}
                  />
                </div>
                {/* thanh checkbox + ten */}
                <div className={style.grouplistHeadbar}>
                  <div className={style.usernameHeader}>
                    <div id="UserName" className={style.BlockRow}>
                      <FaUserCircle
                        style={{ width: "30px", height: "30px" }}
                      ></FaUserCircle>
                      <p className={style.nameDetail}>
                        {savedData.account.name}
                      </p>
                    </div>
                  </div>
                  {isMultiJoin && (
                    <div 
                      className={style.PostMultiGroup}
                      onClick={HandleMultiPostClick}
                    >
                      Đăng nhiều nhóm
                    </div>
                  )}
                  <SearchBar
                    search={search}
                    setSearch={setSearch}
                    resetFilter={ResetFilter}
                    setshowFilterPopup={setshowFilterPopup}
                    // setJoinTemp={setJoinTemp}
                    // setGrStateTemp={setGrStateTemp}
                    setCurrentPage={setCurrentPage}
                    isLoading={isLoading}
                    placeholder={'Tên nhóm hoặc SĐT....'}
                  />
                </div>
                {/* List Nhóm */}
                <div>
                  <OutGrFs
                    isOpen={showPopup}
                    onClose={() => setShowPopup(false)}
                    GrOutName={selectedGrOut}
                  >
                    <button
                      onClick={() => {
                        HandleLeaveGroup(isOutGr);
                      }}
                      className={stylepu.PopupOutGrConfirmButton}
                    >
                      Xác nhận
                    </button>
                  </OutGrFs>
                  <GroupFilter
                    isOpen={showFilter}
                    onClose={() => setshowFilterPopup(false)}
                    onApply={HandleFilter}
                    grState={grState}
                    join={joinState}
                  ></GroupFilter>
                  <CancelQueuePopup
                    isOpen={showCancelQueuePopUp}
                    onClose={() => setShowCancelQueuePopUp(false)}
                    GrCancelName={selectedGrOut}
                  >
                    <button
                      onClick={() => {
                        HandleCancelJoinGroup(isOutGr);
                      }}
                      className={stylepu.PopupOutGrConfirmButton}
                    >
                      Xác nhận
                    </button>
                  </CancelQueuePopup>
                  <StatusActionDialog
                    message={SuccessMess}
                    onClose={() => setisSuccess(false)}
                    show={IsSuccess}
                    status={Sent}
                  />
                  <div className={style.GroupListAttribute}>
                    <div className={style.GroupListContent}>
                      {/* master checkbox */}
                      <input
                        className={style.checkboxList}
                        type="checkbox"
                        checked={masterCheck}
                        onChange={(e) => {
                          HandleMasterCheckbox(e.target.checked)
                        }}
                      />
                    </div>
                    <div className={style.GroupListContent}>Tên nhóm</div>
                    <div className={style.GroupListContent}>
                      Trạng thái nhóm
                    </div>
                    <div className={style.GroupListContent}>Số thành viên</div>
                    <div className={style.GroupListContent}>Link nhóm</div>
                    <div className={style.GroupListContent}>Trạng thái</div>
                    <div className={style.GroupListContent}>Hành động</div>
                  </div>
                  <div
                    className={`${style.BlockColumn} ${style.GroupListContainer}`}
                  >
                    {isLoading ? (
                      <LoadingSkeleton style={style} />
                    ) : fetchError ? (
                      <FetchError fetchError={fetchError} />
                    ) : filteredPage.length === 0 ? (
                      // No data state
                      <div
                        style={{
                          textAlign: "center",
                          padding: "40px",
                          color: "#666",
                        }}
                      >
                        <div style={{ fontSize: "48px", marginBottom: "10px" }}>
                          📭
                        </div>
                        <h3>Không có nhóm nào</h3>
                        <p>Không tìm thấy nhóm phù hợp với bộ lọc hiện tại.</p>
                      </div>
                    ) : (
                      // Map nhóm
                      filteredPage.map((group) => (
                        <div
                          key={group.id}
                          className={`${style.GroupBlock} ${style.BlockRow}`}
                        >
                          <div className="">
                            <input
                              type="checkbox"
                              className={style.checkboxList}
                              checked={selectedGroups.has(group.Link)}
                              onChange={(e) => BoxChosenCheck(e.target.checked, group.Link, group.Name)}
                            />
                          </div>
                          <div className={style.grlistName}>{group.Name}</div>
                          <div id="GrState" className={style.grState}>
                            {group.Status === "Hoạt động" ? (
                              <MdPublic
                                className={style.ic}
                                style={{ color: "rgb(0, 0, 0, 0.7)" }}
                              ></MdPublic>
                            ) : (
                              <FaLock
                                className={style.ic}
                                style={{ color: "rgb(0, 0, 0, 0.7)" }}
                              ></FaLock>
                            )}
                          </div>
                          <div id="member" className={style.grMember}>
                            <p>{group.Number_Of_Posts}</p>
                          </div>
                          <div className={style.grCategory}>
                            <p>{group.Link}</p>
                          </div>
                          <div className={style.grStateQueue}>
                            {group.user_status === "Đã tham gia" ? (
                              <div className={style.joinedStateBlock}>
                                đã tham gia
                              </div>
                            ) : // chưa tham gia
                            group.user_status === "Chưa tham gia" ? (
                              <div className={`${style.notJoinedStateBlock}`}>
                                chưa tham gia
                              </div>
                            ) : // hàng đợi
                            group.user_status === "Chờ duyệt" ? (
                              <div className={`${style.queueStateBlock}`}>
                                đang chờ duyệt
                              </div>
                            ) : (
                              <p className={style.errorJoin}>Đã hết hạn</p>
                            )}
                          </div>
                          {/* đã tham gia */}
                          <div className={`${style.joinStateBlock}`}>
                            {group.user_status === "Đã tham gia" ? (
                              <div className={style.joinedBlock}>
                                <button
                                  className={style.buttonPost}
                                  onClick={() => {
                                    HandlePostGroup(
                                      group.Link.replace("groups/", ""),
                                      group.Name
                                    );
                                  }}
                                >
                                  <HiOutlinePencilSquare size={20} />
                                </button>
                                <button
                                  className={style.buttonOutGr}
                                  onClick={() => {
                                    setSelectedGrOut(group.Name);
                                    setShowPopup(true);
                                    setIsOutGr(group.Link);
                                  }}
                                >
                                  <IoExitOutline size={20} />
                                </button>{" "}
                                {/* onclick */}
                              </div>
                            ) : // chưa tham gia
                            group.user_status === "Chưa tham gia" ? (
                              <div
                                className={`${style.BlockRow} ${style.joinGrButton}`}
                                onClick={() => {
                                  HandleJoinGroup(group.Link);
                                }}
                              >
                                <IoPersonAdd size={20} />
                              </div>
                            ) : // hàng đợi
                            group.user_status === "Chờ duyệt" ? (
                              <div className={`${style.BlockRow}`}>
                                {/* them list danh sách các nhóm trong queue thay phan compare */}
                                <div className={style.BlockRow}>
                                  <button
                                    className={style.buttonOutGr}
                                    style={{ marginRight: "10px" }}
                                    onClick={() => {
                                      setShowCancelQueuePopUp(true);
                                      setSelectedGrOut(group.Name);
                                      setIsOutGr(group.Link);
                                    }}
                                  >
                                    <MdClose size={20} />
                                  </button>
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoadingDialog
        show={showLoading}
        message="Đang gửi yêu cầu..."
        onClose={() => setShowLoading(false)}
      />
    </>
  );
}
