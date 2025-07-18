import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import styles from "../../marketing/marketing.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Tabs } from "antd";
import SMSHistory from "./sms_history";
import SMSForm from "./sms_form";
import { SizeType } from "antd/es/config-provider/SizeContext";

const EmailTable: React.FC = () => {
  const [size] = useState<SizeType>("small");
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
    setHeaderTitle("Marketing / SMS");
    setShowBackButton(true);
    setCurrentPath("/marketing/sms");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  const tabsItems = [
    {
      label: `Lịch sử sms`,
      key: "1",
      children: <SMSHistory key={1} />,
    },
    {
      label: `Mẫu sms`,
      key: "2",
      children: <SMSForm key={2} />,
    },
  ];

  return (
    <div className={styleHome.main} ref={mainRef}>
      <Tabs type="card" size={size} items={tabsItems} />
    </div>
  );
};

export default EmailTable;
