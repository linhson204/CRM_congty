import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import styles from "../../marketing/marketing.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Tabs } from "antd";
import ZaloAccount from "./zalo_account";
import ZaloPlan from "./zalo_add_mess_plan";
import ZaloForm from "./zalo_mess_form";
import ZaloList from "./zalo_shop"
import ZaloDomain from "./zalo_domain";
import { SizeType } from "antd/es/config-provider/SizeContext";

const ZaloTable: React.FC = () => {
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
    setHeaderTitle("Marketing / Zalo");
    setShowBackButton(true);
    setCurrentPath("/marketing/zalo");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  const tabsItems = [
    {
      label: `Tài khoản zalo`,
      key: "1",
      children: <ZaloAccount key={1} />,
    },
    {
      label: `Kịch bản tin`,
      key: "2",
      children: <ZaloForm key={2} />,
    },
    {
      label: `Lịch đăng bài`,
      key: "3",
      children: <ZaloPlan key={3} />,
    },
    {
      label: `Shop`,
      key: "4",
      children: <ZaloList key={4} />,
    },
    {
      label: `Tên miền`,
      key: "5",
      children: <ZaloDomain key={5} />,
    },
  ];

  return (
    <div className={styleHome.main} ref={mainRef}>
      <Tabs type="card" size={size} items={tabsItems} />
    </div>
  );
};

export default ZaloTable;
