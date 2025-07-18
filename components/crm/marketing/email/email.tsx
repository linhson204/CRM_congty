import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import styles from "../../marketing/marketing.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Tabs } from "antd";
import EmailListDetail from "./email_list_detail";
import EmailStatistic from "./email_statistic";
import InboxMail from "./inbox_mail";
import EmailList from "./email_list";
import ReceiverList from "./receiver_list";
import EmailForm from "./email_form";
import { SizeType } from "antd/es/config-provider/SizeContext";

const EmailTable: React.FC = () => {
  const [size] = useState<SizeType>("large");
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

  const tabsItems = [
    {
      label: `Đã gửi`,
      key: "1",
      children: <EmailListDetail key={1} />,
    },
    {
      label: `Thống kê`,
      key: "2",
      children: <EmailStatistic key={2} />,
    },
    // {
    //   label: `Hộp thư đến`,
    //   key: "2",
    //   children: <InboxMail key={2} />,
    // },
    // {
    //   label: `Danh sách email`,
    //   key: "3",
    //   children: <EmailList key={3} />,
    // },
    // {
    //   label: `Danh sách người nhận`,
    //   key: "4",
    //   children: <ReceiverList key={4} />,
    // },
    // {
    //   label: `Mẫu email`,
    //   key: "5",
    //   children: <EmailForm key={5} />,
    // },
  ];

  return (
    <div className={styleHome.main} ref={mainRef} >
      <Tabs type="card" size={"large"} items={tabsItems} />
    </div>
  );
};

export default EmailTable;
