import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./sidebar.module.css";
import { SidebarContext } from "../context/resizeContext";
import HeaderBar from "./header_bar";
import SiebarContent from "./sidebar_content";

export default function SideBar() {
  const { isOpen, setIsOpen } = useContext<any>(SidebarContext);
  const [dataHeader, setDataHeader] = useState();
  const sidebarRef = useRef(null);

  const handleResize = () => {
    if (window.innerWidth <= 1024) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      sidebarRef.current?.classList.add("active_resize");
    } else {
      sidebarRef.current?.classList?.remove("active_resize");
    }
  }, [isOpen]);
  return (
    <>
      <div
        ref={sidebarRef}
        className={`${style.sidebar} ${style.sidebar_m}`}
      >
        <div id="box_alert"></div>
        <HeaderBar dataHeader={dataHeader} isOpen={isOpen} />
        <SiebarContent isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
}
