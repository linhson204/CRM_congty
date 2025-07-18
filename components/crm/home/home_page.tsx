"use client";
import style from "./home.module.css";
import HomeItemBox from "./home_item_box";
import HomeOverView from "./overview";
import {
  boxDesPrimaryCustomer,
  boxDesPrimaryMarketing,
  boxDesPrimaryOrder,
  boxDesSucessOrder,
  boxDesWarningCustomer,
  boxDesWarningMarketing,
  boxDesWarningOrder,
} from "../ultis/consntant";
import { useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "../context/resizeContext";
import { useHeader } from "../hooks/useHeader";

export default function HomePage() {
  const homeRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  useEffect(() => {
    setHeaderTitle("TỔNG QUAN CRM");
    setShowBackButton(false);
    setCurrentPath("/");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    if (isOpen) {
      homeRef.current?.classList.add("content_resize");
    } else {
      homeRef.current?.classList.remove("content_resize");
    }
    setScreenWidth(window.innerWidth)
  }, [isOpen]);

  return (
    <div>
      <div ref={homeRef} className={style.main}>
        {screenWidth <= 1024 && <>
          <h1 style={{ color: 'rgb(71, 71, 71)', fontSize: '26px', margin: '15px 0' }}>TỔNG QUAN CRM</h1>
        </>}
        <div className={style.group_box}>
          <HomeItemBox
            boxTitle={"Khách hàng"}
            boxDesPrimary={boxDesPrimaryCustomer}
            boxDesWarning={boxDesWarningCustomer}
            boxDesSucess={undefined}
          />
          <HomeItemBox
            boxTitle={"Đơn hàng"}
            boxDesPrimary={boxDesPrimaryOrder}
            boxDesSucess={boxDesSucessOrder}
            boxDesWarning={boxDesWarningOrder}
          />
          <HomeItemBox
            boxTitle={"Marketing"}
            boxDesPrimary={boxDesPrimaryMarketing}
            boxDesWarning={boxDesWarningMarketing}
            boxDesSucess={undefined}
          />
        </div>

        <HomeOverView />
      </div>
      {/* <ChatBusiness /> */}
    </div>
  );
}
