import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import styles from "../../setting/setting.module.css";
import style from "../email/email.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Tabs } from "antd";
import Link from "next/link";

const SwitchBoardTable: React.FC = () => {
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
    setHeaderTitle("Cài đặt/ Tổng đài");
    setShowBackButton(true);
    setCurrentPath("/setting/main");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  return (
    <div className={styleHome.main} ref={mainRef}>
      <div className={style.main__setting_email}>
        <div className={style.setting_email_body}>
          <p className={style.setting_email_body__title}>Thiết lập tổng đài</p>

          <p>Kết nối tổng đài điện thoại để bán hàng tốt hơn.</p>
          <div className={style.setting_email_body__connect}>
            <div className={style.setting_email_body__connect_item}>
              <img
                width="140"
                height="46"
                className={style.connect_img}
                src="/crm/fpt.svg"
              />
              <p className={style.connect_title}>FPT</p>
              <Link href="/setting/switch_fpt">
                <button className={style.connect_button}>Kết nối</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwitchBoardTable;
