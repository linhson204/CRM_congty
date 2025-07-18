import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../home/home.module.css";
import styles from "../../setting/setting.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Tabs } from "antd";
import Status0 from "../promotion/promotion_body/status0";
import Status1 from "../promotion/promotion_body/status1";
import Status2 from "../promotion/promotion_body/status2";
import Status3 from "../promotion/promotion_body/status3";

const PromotionTable: React.FC = () => {
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
    setHeaderTitle("Quản lý khuyến mại");
    setShowBackButton(true);
    setCurrentPath("/promotion");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  const tabsItems = [
    {
      label: `Đang chạy (0)`,
      key: "0",
      children: <Status0 key={0} />,
    },
    {
      label: `Sắp tới (0)`,
      key: "1",
      children: <Status1 key={1} />,
    },
    {
      label: `Chưa chạy (0)`,
      key: "2",
      children: <Status2 key={2} />,
    },
    {
      label: `Dừng kích hoạt (0)`,
      key: "3",
      children: <Status3 key={3} />,
    },
  ];

  return (
    <div className={styleHome.main} ref={mainRef}>
      <Tabs items={tabsItems} />
    </div>
  );
};

export default PromotionTable;
