import React, { useState, useContext, useEffect, useRef } from "react";
import styleHome from "../../home/home.module.css";
import style from "../email/email.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import CancelModal from "../email_step/cancel_modal";
import stylex from "../setting.module.css";
import ModalCompleteStep from "../email_step/complete_modal";
import { CallContext } from "@/components/crm/context/tongdaiContext";
import { useDispatch, useSelector } from "react-redux";
import {
  dataSaveTD,
  doDisConnect,
} from "@/components/crm/redux/user/userSlice";
import { notification } from "antd";
import { useRouter } from "next/router";
const SwitchFPTTable: React.FC = () => {
  const [connectionData, setConnectionData] = useState<
    { name: string; password: string; domain: string }[]
  >([]);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  const [inputData, setInputData] = useState({
    name: "",
    password: "",
    domain: "",
  });
  const oldData = useSelector((state: any) => state?.auth?.account);

  useEffect(() => {
    setHeaderTitle("Cài đặt/ Tổng đài/ FPT");
    setShowBackButton(true);

    setCurrentPath("/setting/switch_board");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);
  const { isConnected, setIsConnected } = useContext<any>(CallContext);
  const [isVerify, setisVerify] = useState(false);
  const show = useSelector((state: any) => state?.auth?.account);
  const dispatch = useDispatch();

  const handleConnect = async () => {
    const data = await Verify();
    dispatch(dataSaveTD(data.access_token));

    if (data && data.access_token) {
      const newConnection = { ...inputData };
      setConnectionData((prevData) => [...prevData, newConnection]);
      setIsConnected(true);
      setModal1Open(true);
    } else {
      notification.error({ message: `${data.msg}` });
    }
  };

  //  name: "HNCX00693",
  // password: "v2ohO6B1Nf4F"
  const handleUpdate = async () => {
    const newConnection = { ...inputData };
    setConnectionData((prevData) => [...prevData, newConnection]);
    const data = await Verify();
    if (data && data.access_token) {
      dispatch(dataSaveTD(data.access_token));
      const newConnection = { ...inputData };
      setConnectionData((prevData) => [...prevData, newConnection]);
      setIsConnected(true);
      setModal1Open(true);
    } else {
      dispatch(doDisConnect(""));
      setIsConnected(false);
      notification.error({ message: `${data.msg}` });
    }
  };
  const Verify = async () => {
    const response = await fetch(
      "https://s02.oncall.vn:8900/api/account/credentials/verify",
      {
        method: "POST",
        body: JSON.stringify(inputData),
      }
    );
    const data = await response.json();
    return data;
  };

  //Khong de het access_token tong dai sau 600s
  if (show) {
    setTimeout(async () => {
      setIsConnected(true);
      setInputData({
        name: "HNCX00693",
        password: "v2ohO6B1Nf4F",
        domain: "hncx00693.oncall",
      });
      await fetch("https://s02.oncall.vn:8900/api/account/credentials/verify", {
        method: "POST",
        body: JSON.stringify({
          name: "HNCX00693",
          password: "v2ohO6B1Nf4F",
          domain: "hncx00693.oncall",
        }),
      });
    }, 590000);
  }
  useEffect(() => {
    if (show) {
      setisVerify(true);
    }
    const handleget = async () => {
      // if (oldData) {
      setIsConnected(true);
      setisVerify(true);
      setInputData({
        name: "HNCX00693",
        password: "v2ohO6B1Nf4F",
        domain: "hncx00693.oncall",
      });
      const res = await fetch(
        "https://s02.oncall.vn:8900/api/account/credentials/verify",
        {
          method: "POST",
          body: JSON.stringify({
            name: "HNCX00693",
            password: "v2ohO6B1Nf4F",
            domain: "hncx00693.oncall",
          }),
        }
      );
      const data = await res.json();
      dispatch(dataSaveTD(data.access_token));
      // }
    };
    handleget();
  }, []);
  return (
    <>
      <div className={styleHome.main} ref={mainRef}>
        <div className="main_form">
          <div className={style.main__title}>FPT</div>
          <div className={style.main__body}>
            <div className="main__body_item">
              <p className={style.main__body__type}>Cấu hình kết nối</p>
              <div className={style.body__connect_system_row}>
                <div style={{ marginBottom: "1rem" }}>
                  <label className={style.form_label}>Account</label>
                  <br />
                  <input
                    type="text"
                    className={style.form_control}
                    name="server_mail"
                    id="server_mail"
                    placeholder="Nhập tên máy chủ mail"
                    value={inputData?.name || []}
                    onChange={(e) =>
                      setInputData((prevData) => ({
                        ...prevData,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label className={style.form_label}>Password</label>
                  <input
                    type="password"
                    className={style.form_control}
                    name="port_number"
                    id="port_number"
                    placeholder="Nhập"
                    value={inputData?.password || []}
                    onChange={(e) =>
                      setInputData((prevData) => ({
                        ...prevData,
                        password: e.target.value,
                      }))
                    }
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label className={style.form_label}>Domain</label>
                  <input
                    type="text"
                    className={style.form_control}
                    name="address_send_mail"
                    id="address_send_mail"
                    placeholder="Nhập địa chỉ email gửi"
                    value={inputData?.domain || []}
                    onChange={(e) =>
                      setInputData((prevData) => ({
                        ...prevData,
                        domain: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={stylex.main__footer}>
            <button
              className={stylex.update}
              type="button"
              onClick={() => handleUpdate()}
            >
              Cập nhật
            </button>
            {isVerify ? (
              <button
                style={{ color: "red", border: "1px solid" }}
                type="button"
                onClick={() => (
                  setisVerify(false),
                  dispatch(doDisConnect("")),
                  alert("Hủy kết nối thành công")
                )}
              >
                Huỷ kết nối
              </button>
            ) : (
              <button type="button" onClick={handleConnect}>
                Kết nối
              </button>
            )}
          </div>
          {
            <CancelModal
              isModalCancel={isModalCancel}
              setIsModalCancel={setIsModalCancel}
              content={"Cập nhật thành công"}
              title={"Cập nhật"}
              routerback={"#"}
            />
          }
          <ModalCompleteStep
            modal1Open={modal1Open}
            setModal1Open={setModal1Open}
            title={
              isConnected
                ? "Kết nối tổng đài thành công!"
                : "Ngắt kết nối tổng đài thành công!"
            }
            routerback={"#"}
          />
        </div>
      </div>
    </>
  );
};

export default SwitchFPTTable;
