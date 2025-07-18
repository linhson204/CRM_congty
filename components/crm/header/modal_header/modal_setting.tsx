import style from "../header.module.css";
import LogoutCRM from "../../logout/index";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";

export default function SettingModal({ dataHeader }) {
  const [showLogout, setShowLogout] = useState(false);

  const show = () => {
    setShowLogout(true);
  };

  const no = () => {
    setShowLogout(false);
  };


  const typeUser = Cookies.get('role')

  const yes = () => {
    document.cookie =
      "token_base365" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "rf_token" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "role" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  };
  return (
    <div className={style.setting_open}>
      <div className={style.avatar_staff}>
        <Image
          width={300}
          height={200}
          className={style.img_icon}
          src={
            dataHeader?.data?.avatarUser === null 
              ? dataHeader?.data?.avatarUser
              : "https://hungha365.com/img/icon_avt.png"
          }
          alt="hungha365.com"
        />
        {/* <img
          src={
            dataHeader?.data?.avatarUser
              ? dataHeader?.data?.avatarUser
              : "/logo_com (2).png"
          }
          alt="hungha365.com"
        /> */}
        {/* <img
          src="https://chamcong.24hpay.vn/upload/employee/ep931547/app_1688728219772.jpg"
          alt="hungha365.com"
        /> */}
        <div className={style.name_staff}>
          {dataHeader?.data?.userName || ""}
        </div>
        {/* <p className={style.name_staff}>Tran Quang Duc Dung</p> */}
        {/* <p className={style.chuc_vu}>NHÂN VIÊN THỬ VIỆC </p> */}
      </div>

      {/* <a className={style.selecter}>
        <div className={style.selecter_left}>
          <img src="/crm/icon-help.svg" alt="hungha365.com" />
          <p className={style.text_selecter}>Hướng dẫn sử dụng</p>
        </div>
        <img src="/crm/icon-arrow-right.svg" alt="hungha365.com" />
      </a> */}

      <Link
        className={style.selecter}
        href={typeUser == '2' ? 'https://hungha365.com/quan-ly-thong-tin-tai-khoan-nhan-vien.html' : 'https://hungha365.com/quan-ly-thong-tin-tai-khoan-cong-ty.html'}
      >
        <div className={style.selecter_left}>
          <img src="/crm/icon-infor.svg" alt="hungha365.com" />
          <p className={style.text_selecter}>Thông tin cá nhân</p>
        </div>
        <img src="/crm/icon-arrow-right.svg" alt="hungha365.com" />
      </Link>

      <div className={style.selecter} onClick={show} style={{ width: "100%" }}>
        <div
          style={{ justifyContent: "space-between" }}
          className={style.selecter_left}
        >
          <img src="/crm/icon-logout.svg" alt="hungha365.com" />
          <div id={style.logout_acc} className={style.text_selecter}>
            Đăng xuất
          </div>
        </div>
        <img src="/crm/icon-arrow-right.svg" alt="hungha365.com" />
      </div>

      {showLogout && (
        <LogoutCRM showLogout={showLogout} setShowLogout={setShowLogout} />
      )}
    </div>
  );
}
