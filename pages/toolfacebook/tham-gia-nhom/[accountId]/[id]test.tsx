import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import styles from "@/components/crm/potential/potential.module.css";

import joinGroup from "@/pages/api/toolFacebook/danhsachnhom/thamgianhom";
import Filter from "@/pages/toolfacebook/tham-gia-nhom/[accountId]/popup/Filter";
import OutGrFs from "@/pages/toolfacebook/tham-gia-nhom/[accountId]/popup/OutGrFS";
import CancelQueuePopup from "@/pages/toolfacebook/tham-gia-nhom/[accountId]/popup/PrivateGrQues/CancelQueue";
import QuestionPopup from "@/pages/toolfacebook/tham-gia-nhom/[accountId]/popup/PrivateGrQues/QuestionPopup";
import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FaLock, FaUserCircle } from "react-icons/fa";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoExitOutline, IoPerson, IoPersonAdd } from "react-icons/io5";
import { MdClose, MdPublic } from "react-icons/md";
import LoadingDialog from "../components/LoadingDialog";
import SearchBar from "../components/SearchBar";
import UserListIndexBar from "../components/UserListIndexBar";
import StatisticBlock from "../components/statisticBlock";
import stylepu from "../popup/popup.module.css";
import style from "../styles.module.css";
import { Question } from "./popup/PrivateGrQues/types";

export default function GroupList() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const router = useRouter();
  // const itemsPerPage = 10;
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setshowFilterPopup] = useState(false);
  const [selectedGrOut, setSelectedGrOut] = useState<string>("");
  // Phân trang
  const [search, setSearch] = useState("");
  const [Sent, setSent] = useState(false); //danh dau da gui
  const { accountId } = router.query;

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
  // const [groups, setGroups] = useState<Groups[]>([]);

  const [grStateTemp, setGrStateTemp] = useState("all");
  const [joinTemp, setJoinTemp] = useState("all");
  const [grState, setGrState] = useState("all");
  const [joinState, setJoinState] = useState("all");

  const [groupData, setGroupData] = useState<any[]>([]); //data that
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [showLoading, setShowLoading] = useState(false);
  const [Gr, setGr] = useState<any[]>([]); //mock data
  const savedData = JSON.parse(localStorage.getItem("userProfile"));

  const pageCountSelect = async () => {
    //call API lay so luong nhom tren tung account
  };

  useEffect(() => {
    fetch("http://localhost:3003/api/getgrdata")
      .then((response) => response.json())
      .then((data) => {
        // setTest(data);
        setGr(data.data || data); // ✅ Set posts ngay khi có data
        setIsLoading(false);
      })
      .catch((error) => console.error("Error:", error));
  }, []); // ✅ Chỉ chạy một lần

  useEffect(() => {
    console.log("Gr thay đổi:", Gr);
  }, [Gr]);

  // Danh sách câu hỏi mẫu
  const approvalQuestions: Question[] = [
    {
      id: 1,
      type: "textarea", // Kiểu nhập text
      question: "Giới thiệu ngắn về bản thân?",
      required: true,
      maxLength: 250,
    },
    {
      id: 2,
      type: "radio", // Chọn 1 lựa chọn
      question: "Bạn có đồng ý với nội quy nhóm?",
      options: ["Có", "Không"],
      required: true,
    },
    {
      id: 3,
      type: "checkbox", // Chọn nhiều lựa chọn
      question: "Bạn quan tâm đến chủ đề nào?",
      options: ["Mua bán", "Kỹ thuật", "Du lịch"],
      required: false,
    },
    {
      id: 4,
      type: "radio", // Chọn nhiều lựa chọn
      question: "Con gà có mấy chân?",
      options: ["2", "4", "6", "8", "10"],
      required: true,
    },
  ];
  //

  useEffect(() => {
    setHeaderTitle("Tool Facebook - Danh sách nhóm");
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

  let crmID = Cookies.get("userID");
  if (!crmID) {
    console.warn("CRM userID cookie is missing!");
    crmID = "defaultID"; // fallback value, replace with your logic
  }

  useEffect(() => {
    if (pendingGr) {
      PendingHandleData(pendingGr);
    }
  }, [pendingGr]);

  const filteredGroups = useMemo(() => {
    return Gr.filter((group) => {
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
  }, [Gr, grState, joinState, search]);

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

  const HandleFilter = (grStateTemp: string, joinTemp: string) => {
    setGrState(grStateTemp);
    setJoinState(joinTemp);
    setshowFilterPopup(false);
    console.log(grStateTemp, joinTemp);
  };

  const resetFilter = () => {
    setGrState("all");
    setJoinState("all");
    setSearch("");
    setCurrentPage(1);
    setItemsPerPage(10);
  };

  const PendingHandleData = (GrId: number) => {
    // if (pendingGr.includes(group.id)) {
    //     setpendingGr(pendingGr.filter(id => id !== group.id));
    // } else {
    //     setpendingGr([...pendingGr, group.id]);
    // }
    //call API tra id user id nhom vao day
  };

  const HandlePostGroup = (idgr: number) => {
    router.push(`../${accountId}/dangbainhom/${idgr}`);
  };

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
  };

  //xu li request hang doi
  const UpdateGrState = async (LinkGr: string) => {
    // Gọi API gửi request đến tool tham gia nhóm
    // API cập nhật trường isJoin
    console.log(accountId, LinkGr);
    const params = { group_link: `${LinkGr}` };
    await joinGroup(
      "join_group",
      "test1", //user_id
      params,
      crmID
    );
  };

  const hardReload = () => {
    setShowLoading(true);
    setTimeout(() => window.location.reload(), 1000);
  };

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
              <div className={styles.main__title}>
                Tool Facebook - DANH SÁCH NHÓM
              </div>
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
                        {savedData.account.nameFb}
                      </p>
                    </div>
                  </div>
                  <SearchBar
                    search={search}
                    setSearch={setSearch}
                    resetFilter={resetFilter}
                    setshowFilterPopup={setshowFilterPopup}
                    setJoinTemp={setJoinTemp}
                    setGrStateTemp={setGrStateTemp}
                    setCurrentPage={setCurrentPage}
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
                        handleLeavePopup(isOutGr);
                      }}
                      className={stylepu.PopupOutGrConfirmButton}
                    >
                      Xác nhận
                    </button>
                  </OutGrFs>
                  <Filter
                    isOpen={showFilter}
                    onClose={() => setshowFilterPopup(false)}
                    onApply={HandleFilter}
                  ></Filter>
                  <CancelQueuePopup
                    isOpen={showCancelQueuePopUp}
                    onClose={() => setShowCancelQueuePopUp(false)}
                    GrCancelName={selectedGrOut}
                  >
                    <button
                      onClick={() => {
                        handleCancelQueue(isOutGr);
                      }}
                      className={stylepu.PopupOutGrConfirmButton}
                    >
                      Xác nhận
                    </button>
                  </CancelQueuePopup>
                  <QuestionPopup
                    isOpen={showPrivateGrQues}
                    onClose={() => {
                      setShowPrivateGrQues(false);
                    }}
                    questions={approvalQuestions}
                    onSubmit={(answers) => {
                      setSent(true);
                      // Xử lý dữ liệu ở đây
                      setTimeout(() => UpdateGrState(privateGrSelected), 300);
                      // validateRequiredFields(approvalQuestions, answers);
                      if (privateGrSelected) {
                        console.log(accountId, privateGrSelected, answers);
                      }
                    }}
                  >
                    <div
                      className={`${style.BlockColumn} ${style.PopupQuesHeader}`}
                    >
                      <div className={style.PQHGrName}>{popupHeader[0]}</div>
                      <div className={style.BlockRow}>
                        <div className={style.BlockRow}>
                          <div>
                            <FaLock className={style.ic}></FaLock>
                          </div>
                          <p
                            style={{
                              textAlign: "center",
                              marginRight: "10px",
                              marginLeft: "5px",
                            }}
                          >
                            {popupHeader[1] === "Không hoạt động"
                              ? "Riêng tư"
                              : "Công khai"}
                          </p>
                        </div>
                        <div className={style.BlockRow}>
                          <div>
                            <IoPerson className={style.ic}></IoPerson>
                          </div>
                          <p
                            style={{
                              textAlign: "center",
                              marginRight: "10px",
                              marginLeft: "5px",
                            }}
                          >
                            {popupHeader[2]} Thành viên
                          </p>
                        </div>
                      </div>
                    </div>
                  </QuestionPopup>
                  <div className={style.GroupListAttribute}>
                    <div className={style.GroupListContent}>
                      <input
                        className={style.checkboxList}
                        type="checkbox"
                        onChange={(e) => e.target.checked}
                      />
                    </div>
                    <div className={style.GroupListContent}>Tên nhóm</div>
                    <div className={style.GroupListContent}>
                      Trạng thái nhóm
                    </div>
                    <div className={style.GroupListContent}>Số thành viên</div>
                    <div className={style.GroupListContent}>Ngành nghề</div>
                    <div className={style.GroupListContent}>Trạng thái</div>
                    <div className={style.GroupListContent}>Hành động</div>
                  </div>
                  <div
                    className={`${style.BlockColumn} ${style.GroupListContainer}`}
                  >
                    {isLoading ? (
                      // Loading skeleton
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          padding: "20px",
                        }}
                      >
                        <div style={{ textAlign: "center", color: "#666" }}>
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              border: "3px solid #f3f3f3",
                              borderTop: "3px solid #3498db",
                              borderRadius: "50%",
                              animation: "spin 1s linear infinite",
                              margin: "0 auto 10px",
                            }}
                          ></div>
                          <p>Đang tải dữ liệu nhóm...</p>
                        </div>
                        {/* Loading skeleton items */}
                        {[...Array(5)].map((_, index) => (
                          <div
                            key={index}
                            className={`${style.GroupBlock} ${style.BlockRow}`}
                            style={{ opacity: 0.6, backgroundColor: "#f5f5f5" }}
                          >
                            <div
                              className={style.grlistName}
                              style={{
                                backgroundColor: "#ddd",
                                height: "20px",
                                borderRadius: "4px",
                              }}
                            ></div>
                            <div
                              className={style.grState}
                              style={{
                                backgroundColor: "#ddd",
                                height: "20px",
                                width: "30px",
                                borderRadius: "4px",
                              }}
                            ></div>
                            <div
                              className={style.grMember}
                              style={{
                                backgroundColor: "#ddd",
                                height: "20px",
                                width: "50px",
                                borderRadius: "4px",
                              }}
                            ></div>
                            <div
                              className={style.grCategory}
                              style={{
                                backgroundColor: "#ddd",
                                height: "20px",
                                borderRadius: "4px",
                              }}
                            ></div>
                            <div
                              className={style.joinStateBlock}
                              style={{
                                backgroundColor: "#ddd",
                                height: "30px",
                                width: "80px",
                                borderRadius: "4px",
                              }}
                            ></div>
                          </div>
                        ))}
                      </div>
                    ) : fetchError ? (
                      // Error state
                      <div
                        style={{
                          textAlign: "center",
                          padding: "40px",
                          color: "#e74c3c",
                        }}
                      >
                        <div style={{ fontSize: "48px", marginBottom: "10px" }}>
                          ⚠️
                        </div>
                        <h3>Lỗi tải dữ liệu</h3>
                        <p>{fetchError}</p>
                        <button
                          onClick={() => window.location.reload()}
                          style={{
                            padding: "10px 20px",
                            backgroundColor: "#3498db",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            marginTop: "10px",
                          }}
                        >
                          Thử lại
                        </button>
                      </div>
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
                            ></input>
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
                                      group.Link.replace("groups/", "")
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
                                  // {if (group.Status !== "Hoạt động") {
                                  //     setPrivateGrSelected(group.id);
                                  //     setShowPrivateGrQues(true);
                                  //     setpopupHeader([group.Name, group.Status, group.Number_Of_Posts]);
                                  // } else {
                                  //     setShowLoading(true);
                                  //     UpdateGrState(group.Link);
                                  // }
                                  // }
                                  setShowLoading(true);
                                  UpdateGrState(group.Link);
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
