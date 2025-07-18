import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import styles from "../../setting/setting.module.css";
import style from "../email/email.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Tabs } from "antd";
import Link from "next/link";

const EmailMarketingTable: React.FC = () => {
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
    setHeaderTitle("Cài đặt/ Email");
    setShowBackButton(true);
    setCurrentPath("/setting/main");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  return (
    <div className={style.main__setting_email}>
      <div className={style.setting_email_body}>
        <p className={style.setting_email_body__title}>
          Thiết lập Email Marketing
        </p>
        <p>Kết nối Email để thực hiện các chiến dịch Email Marketting </p>
        <div className={style.setting_email_body__connect}>
          <div className={style.setting_email_body__connect_item}>
            <img
              width="50.85"
              height="60"
              className={style.connect_img}
              src="/crm/email_zetaMail.svg"
            />
            <p className={style.connect_title}>ZetaMail</p>
            <Link href="/setting/setup_email_marketing">
              <button className={style.connect_button}>Kết nối</button>
            </Link>
          </div>
          <div className={style.setting_email_body__connect_item}>
            <img
              width="50.85"
              height="60"
              className={style.connect_img}
              src="/crm/email_mailChimp.svg"
            />
            <p className={style.connect_title}>MailChimp</p>
            <Link href="/setting/setup_email_marketing">
              <button className={style.connect_button}>Kết nối</button>
            </Link>
          </div>
          <div className={style.setting_email_body__connect_item}>
            <img
              width="50.85"
              height="60"
              className={style.connect_img}
              src="/crm/email_getResponse.svg"
            />
            <p className={style.connect_title}>GetResponse</p>
            <Link href="/setting/setup_email_marketing">
              <button className={style.connect_button}>Kết nối</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailMarketingTable;
