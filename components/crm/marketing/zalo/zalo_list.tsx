import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import style from "../../marketing/email/email.module.css";
import styles from "../../marketing/marketing.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Tabs } from "antd";
import Link from "next/link";
import Popup from "./zalo_qr_popup";
import ZaloAccount from "./zalo_account"
const ZaloList: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [checkFile, setCheckFile] = useState(false);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const [showPopup, setShowPopup] = useState(true);
  const [showZaloAccount, setShowZaloAccount] = useState(true);
  const handleOpenPopup = () => {
    setShowPopup(true);
  };
  const handleButtonClick = () => {
    setShowZaloAccount(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  useEffect(() => {
    setHeaderTitle("Marketing/ Zalo");
    setShowBackButton(true);
    setCurrentPath("/marketing/zalo");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  return (

    <div className={style.main_default}>
      {showZaloAccount ?
        <ZaloAccount />
        :
        <>
          <p className={style.text_title}>Bạn chưa có tài khoản nào</p>
          <p className={style.text_content}>Thêm mới các bản mẫu của riêng bạn để quản lý và tiết kiệm thời gian ngay nhé!</p>
          <p className={style.img_default}>
            <img className="img_none" src="/crm/form_email_null.svg" />
          </p>
          <div className="dropdown">
            <button ></button>
            {/* {showPopup && <Popup onClose={handleClosePopup} />} */}
            <div className={`${styles.main__control_add}`}>

              <button
                onClick={handleButtonClick}
                type="button"
                className={`${styles.dropbtn_add} flex_align_center`}
              >
                <img src="/crm/add.svg" />
                Thêm tài khoản
              </button>

            </div>
          </div>
        </>
      }
    </div>
  );

};

export default ZaloList;
