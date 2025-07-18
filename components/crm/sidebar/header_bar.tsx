import style from "./sidebar.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { base_url } from "../service/function";
import Cookies from "js-cookie";
import { Link } from "react-scroll";

export default function HeaderBar({ dataHeader, isOpen }: any) {
  return (
    <div
      onClick={() => window.open("https://hungha365.com/", "_self")}
      className={style.header_bar}
      style={{cursor:"pointer"}}
    >
      <div className={`${style.header_icon} ${!isOpen ? null : "none"}`}>
        <Image
          width={120}
          height={60}
          className={style.img_icon}
          src="/crm/no-avartar-user.png"
          data-src={
            dataHeader?.data?.avatarUser
              ? dataHeader?.data?.avatarUser
              : "/crm/no-avartar-user.png"
          }
          alt="icon"
        />
      </div>
      <div className={`${style.header_info} ${!isOpen ? null : "none"}`}>
        <div className={style.name_staff}>
          {dataHeader?.data?.userName || dataHeader?.data?.com_name || ""}
        </div>
        {/* <p className={style.sub_text}>NHÂN VIÊN THỬ VIỆC</p> */}
      </div>
    </div>
  );
}
