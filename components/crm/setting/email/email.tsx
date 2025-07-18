import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import styles from "../../setting/setting.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Tabs } from "antd";
import EmailCaNhan from "./email_personal";
import EmailMarketing from "./email_marketing";
import EmailHeThong from "./email_system";

const EmailTable: React.FC = () => {
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

  const tabsItems = [
    {
      label: `Email cá nhân`,
      key: "1",
      children: <EmailCaNhan key={1} />,
    },
    {
      label: `Email Marketing`,
      key: "2",
      children: <EmailMarketing key={2} />,
    },
    {
      label: `Email hệ thống`,
      key: "3",
      children: <EmailHeThong key={3} />,
    },
  ];

  return (
    <div className={styleHome.main} ref={mainRef}>
      <Tabs items={tabsItems} />
    </div>
  );
};

export default EmailTable;
