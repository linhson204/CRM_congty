"use client";
import React, {
  RefCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import MessageButtonHeader from "./message";
import WarningBtnHeader from "./warning";
import NotifyButtonHeader from "./notify_icon";
import SettingButtonHeader from "./setting_icon";
import style from "./header.module.css";
import { SidebarContext } from "../context/resizeContext";
import { useHeader } from "../hooks/useHeader";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header({ toggleModal }: any) {
  const { isOpen } = useContext<any>(SidebarContext);
  const headerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const {
    headerTitle,
    // setHeaderTitle,
    showBackButton,
    // setShowBackButton,
    currentPath,
  }: // setCurrentPath,
    any = useHeader();

  const [screenWidth2, setScreenWidth2] = useState(0)

  useEffect(() => {
    if (isOpen) {
      headerRef.current?.classList.add("content_resize");
    } else {
      headerRef.current?.classList.remove("content_resize");
    }
    setScreenWidth2(window.innerWidth)
  }, [isOpen]);

  return (
    <>
      <div ref={headerRef} className={style.header}>
        <div className={style.main}>
          <div className="mMenu__header">
            <img
              onClick={toggleModal}
              className="icon_menu_nav"
              src="/crm/sel.png"
              alt="icon-menu-nav"
            />
          </div>
          {/* Desktop */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {showBackButton && (
              <Link
                href={currentPath}
                style={{ marginRight: "11px", height: "17px", width: "10px" }}
              >
                <img
                  className={style.dekstop_view_img}
                  src="/crm/angle_left.svg"
                  alt="back"
                />
              </Link>
            )}
            {screenWidth2 > 1024 && <>
              <h1 style={{ color: "#474747" }}>{headerTitle}</h1>
            </>}
          </div>
          <div className={style.header_btn}>
            <div
              className={`${style.header_btn_items} ${style.message_btn} btn`}
            >
              <MessageButtonHeader />
            </div>
            <div
              className={`${style.header_btn_items} ${style.message_btn} btn`}
            >
              <WarningBtnHeader />
            </div>
            <div
              className={`${style.header_btn_items} ${style.message_btn} btn`}
            >
              <NotifyButtonHeader />
            </div>
            <div
              className={`${style.header_btn_items} ${style.message_btn} btn`}
            >
              <SettingButtonHeader />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
