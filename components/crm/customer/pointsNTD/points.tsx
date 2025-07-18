import React, {  useEffect, useRef } from "react";
import styleHome from "../../home/home.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Tabs } from "antd";
import PointMove from "./PointMove";
import PointReserveOut from "./PointReserveOut";
const PointsNTD: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const {
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  useEffect(() => {
    setHeaderTitle("Điểm Nhà tuyển dụng");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  const tabsItems = [
    {
      label: `Bảo lưu/ Rút điểm`,
      key: "1",
      children: <PointReserveOut key={1} />,
    },
    {
      label: `Chuyển điểm`,
      key: "2",
      children: <PointMove key={2} />,
    },
  ];

  return (
    <div className={styleHome.main} ref={mainRef} >
      <Tabs type="card" size={"large"} items={tabsItems} />
    </div>
  );
};

export default PointsNTD;
