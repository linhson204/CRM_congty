import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import styles from "../../setting/setting.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Tabs } from "antd";
import SMSCaNhan from "./sms_canhan";
import SMSHeThong from "./sms_hethong";

const SMSTable: React.FC = () => {
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

  const tabsItems = [
    {
      label: `Sms cá nhân`,
      key: "1",
      children: <SMSCaNhan key={1} />,
    },
    {
      label: `Sms hệ thống`,
      key: "2",
      children: <SMSHeThong key={2} />,
    },
  ];

  return (
    <div className={styleHome.main} ref={mainRef}>
      <Tabs items={tabsItems} />
    </div>
  );
};

export default SMSTable;
