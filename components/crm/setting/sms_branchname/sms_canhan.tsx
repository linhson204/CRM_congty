import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import styles from "../../setting/setting.module.css";
import style from "../sms_branchname/sms.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Tabs } from "antd";
import Link from "next/link";

const SMSCaNhanTable: React.FC = () => {
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
    setHeaderTitle("Cài đặt/ SMS Brandname");
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
            <img className={style.connect_img} src="/crm/vht.svg" />
            <p className={style.connect_title}>VHT</p>
            <Link href="sms/add_vht">
              <button className={style.connect_button}>Kết nối</button>
            </Link>
          </div>
          <div className={style.setting_email_body__connect_item}>
            <img className={style.connect_img} src="/crm/telecom.svg" />
            <p className={style.connect_title}>SouthTelecom</p>
            <Link href="sms/add_tele">
              <button className={style.connect_button}>Kết nối</button>
            </Link>
          </div>
          <div className={style.setting_email_body__connect_item}>
            <img className={style.connect_img} src="/crm/cmc.svg" />
            <p className={style.connect_title}>CMC</p>
            <Link href="sms/add_cmc">
              <button className={style.connect_button}>Kết nối</button>
            </Link>
          </div>
          <div className={style.setting_email_body__connect_item}>
            <img
              style={{ height: "60px", width: "70%" }}
              className={style.connect_img}
              src="/crm/viettel.svg"
            />
            <p className={style.connect_title}>Viettel</p>
            <Link href="sms/add_viettel">
              <button className={style.connect_button}>Kết nối</button>
            </Link>
          </div>
          <div className={style.setting_email_body__connect_item}>
            <img
              style={{ height: "60px", width: "70%" }}
              className={style.connect_img}
              src="/crm/fpt.svg"
            />
            <p className={style.connect_title}>FPT</p>
            <Link href="sms/add_fpt">
              <button className={style.connect_button}>Kết nối</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMSCaNhanTable;
