import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import style from "../../marketing/email/email.module.css";
import styles from "../../marketing/marketing.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Tabs } from "antd";
import Link from "next/link";
import AddReceiver from "./add_receiver";

const EmailPersonalTable: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [checkFile, setCheckFile] = useState(false);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const [isModalAdd, setIsModalAdd] = useState(false);
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  useEffect(() => {
    setHeaderTitle("Marketing/ Email");
    setShowBackButton(true);
    setCurrentPath("/marketing/email");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  return (
    <div className={style.main_default}>
      <p className={style.text_title}>Bạn chưa có danh sách người nhận nào</p>
      <p className={style.text_content}>
        Thêm mới các danh sách người nhận để quản lý và tiết kiệm thời gian ngay
        nhé!
      </p>
      <p className={style.img_default}>
        <img className="img_none" src="/crm/form_email_null.svg" />
      </p>
      <div className="dropdown">
        <div className={`${styles.main__control_add}`}>
          <button
            type="button"
            className={`${styles.dropbtn_add} flex_align_center`}
            onClick={() => setIsModalAdd(true)}
          >
            <img src="/crm/add.svg" /> Thêm mới
          </button>
          {
            <AddReceiver
              isModalCancel={isModalAdd}
              setIsModalCancel={setIsModalAdd}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default EmailPersonalTable;
