import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import style from "../../marketing/email/email.module.css";
import styles from "../../marketing/marketing.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Tabs } from "antd";
import Link from "next/link";

const EmailPersonalTable: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [checkFile, setCheckFile] = useState(false);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
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
      <p className={style.text_title}>Bạn chưa có email nào</p>
      <p className={style.text_content}>Thêm mới các email để gửi ngay nhé!</p>
      <p className={style.img_default}>
        <img className="img_none" src="/crm/form_email_null.svg" />
      </p>
      <div className="dropdown">
        <div className={`${styles.main__control_add}`}>
          <Link href="/marketing/email/add">
            <button
              type="button"
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <img src="/crm/add.svg" />
              Thêm mới
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailPersonalTable;
