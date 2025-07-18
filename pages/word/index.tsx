import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";

import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useHeader } from "@/components/crm/hooks/useHeader";
import jwt_decode from "jwt-decode";
import { getToken } from "@/pages/api/api-hr/token";
import axios from "axios";
import { Button, Input } from "antd";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { notifyError, notifySuccess, notifyWarning } from "@/utils/function";
import Link from "next/link";
import { ID_HUNGHA } from "@/constants/home-constants";

export default function PotentialInformation() {
  const router = useRouter();
  const mainRef = useRef(null);
  const [checkReceiver, setCheckReceiver] = useState(false);
  const [listWordSentitive, setListWordSentitive] = useState([]);
  const [formData, setFormData] = useState<any>({ reveicer: 1 });
  const [recall, setRecall] = useState(true);
  const { isOpen }: any = useContext(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any =
    useHeader();
  const [userId, setUserId] = useState(0);
  const userType: any = getToken("role");
  const [listKey, setListKey] = useState<string>("");
  useEffect(() => {
    const fetchDataType = async () => {
      const currentCookie = getToken("token_base365");
      if (currentCookie) {
        const decodedToken: any = await jwt_decode(currentCookie);
        decodedToken?.data.idQLC === ID_HUNGHA && setCheckReceiver(true);
        setUserId(decodedToken?.data.idQLC ?? 0);
        setFormData({ ...formData, creator: decodedToken?.data.idQLC });
      } else {
        const interval = setInterval(async () => {
          clearInterval(interval);
          fetchDataType();
        }, 500);
      };

      axios
        .get(
          "/crm/api/api_sensitive"
        )
        .then((res) => {
          let arrayKey = res.data.data;
          let content = "";
          for (let i = 0; i < arrayKey.length; i++) {
            if (i == 0) {
              content = arrayKey[i];
            }
            else {
              content = content + ", " + arrayKey[i]
            }
          };
          setListKey(content);
        })
        .catch((err) => console.log("checkLISTWORD", err));
    };
    fetchDataType();
  }, []);
  console.log(listKey);
  useEffect(() => {
    if (checkReceiver) {
      setCheckReceiver(true);
      axios
        .post(
          "https://api.timviec365.vn/api/crm/DexuatWordSensitive/GetListWordSensitive"
        )
        .then((res) => {
          setListWordSentitive(res.data.data.listDexuat);
        })
        .catch((err) => console.log("checkLISTWORD", err));
    }
  }, [userId, recall]);
  useEffect(() => {
    setHeaderTitle("Từ khóa nhạy cảm");
    setShowBackButton(false);
    setCurrentPath("");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);
  const handlePost = () => {
    if (!formData.word) {
      notifyWarning("Vui lòng nhập từ khóa!");
      return;
    }
    axios
      .post(
        "https://api.timviec365.vn/api/crm/DexuatWordSensitive/DexuatWordSensitive",
        formData
      )
      .then((res) => {
        setFormData({ ...formData, word: "" });
        notifySuccess("Thành công");
      })
      .catch((err) => notifyError("Vui lòng thử lại"));
  };
  const handleAccept = (id) => {
    axios
      .post(
        "https://api.timviec365.vn/api/crm/DexuatWordSensitive/DuyetDexuatWordSensitive",
        { _id: id }
      )
      .then((res) => {
        notifySuccess("Đã duyệt thành công");
        setRecall(!recall);
      })
      .catch((err) => console.log(err));
  };

  const handleReject = async (id) => {
    try {
      const reject = await axios.post(
        "https://api.timviec365.vn/api/crm/DexuatWordSensitive/TuchoiDexuatWordSensitive",
        { _id: id }
      );
      setRecall(!recall);
    } catch (error) {
      notifyError("Vui lòng thử lại");
    }
  };
  if (userType > 2) {
    router.push("/");
    return;
  }
  return (
    <div className={styleHome.main} ref={mainRef}>
      <div className={styles.main_importfile}>
        <div className={styles.formInfoStep}>
          <div className={styles.info_step}>
            <div className={styles.form_add_potential}>
              <label style={{ marginBottom: "20px", fontWeight: "300", padding:"15px"}}>
                    {" "}
                    Danh sách từ khóa nhạy cảm: {listKey}
              </label>
              {(checkReceiver && userType == 1) ? (
                <div>
                  <label style={{ marginBottom: "20px", fontWeight: "600" }}>
                    {" "}
                    Danh sách đề xuất từ khóa nhạy cảm
         
                  </label>
                  {listWordSentitive?.map((item) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <div>

                        <div style={{ marginBottom: "10px" }}>Từ: {item.word}</div>
                        <div>Link: {<Link target="blank" href={item.link}>{item.link ? item.link : ""}</Link>}</div>
                        {" "}</div>

                      <div style={{ marginLeft: "30px" }}>
                        <Button
                          onClick={() => handleAccept(item._id)}
                          style={{
                            backgroundColor: "#1A73E8",
                            color: "white",
                            margin: "0 20px",
                          }}
                        >
                          Duyệt
                        </Button>{" "}
                        <Button
                          onClick={() => handleReject(item._id)}
                          style={{ backgroundColor: "#E79591" }}
                        >
                          Từ chối
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <label style={{ marginBottom: "20px", fontWeight: "600" }}>
                    {" "}
                    Từ khóa nhạy cảm
                  </label>
                  <Input
                    value={formData.word}
                    style={{ height: "50px" }}
                    placeholder="Nhập từ khóa nhạy cảm"
                    onChange={(e) => setFormData({ ...formData, word: e.target.value })}
                  />
                  <label style={{ margin: "20px 0", fontWeight: "600" }}>
                    {" "}
                    Link
                  </label>
                  <Input
                    value={formData.link}
                    style={{ height: "50px" }}
                    placeholder="Nhập link"
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <Button onClick={handlePost}>Đề Xuất</Button>
                  </div>
                </div>
              )}
              <ToastContainer autoClose={2000} />            {/* <PotentialFooterAddFiles title="Thêm mới tiềm năng tên Tiềm năng thành công" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
