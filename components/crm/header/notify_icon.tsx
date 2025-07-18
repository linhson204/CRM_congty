"use client";
import style from "./header.module.css";
import Image from "next/image";
import useModal from "../hooks/useModal";
import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import jwtDecode from "jwt-decode";
import { getToken } from "@/pages/api/api-hr/token";
import { useFormData } from "../context/formDataContext";
import { axiosCRM } from "@/utils/api/api_crm";
import { useNotificationReload } from "../context/notificationContext";
const hanldeTypeLink = (type) => {
  const option = {
    1: "/crm/potential/detail/",
    2: "/crm/chance/detail/",
    3: "/crm/campaign/detail/",
    4: "/crm/commodity/detail/",
  };
  if (!option[type]) {
    return null;
  }
  return option[type];
};
export default function NotifyButtonHeader() {
  const [listNotifi, setListNotifi] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, stePageSize] = useState(30);
  const { isOpen, toggleModal } = useModal(style.notice_open, [
    style.notify_icon_1,
    style.notify_icon_2,
  ]);
  const [totalUnread, setTotalUnread] = useState(0);
  const {reloadNotification}=useContext(useNotificationReload)
  useEffect(() => {
    axiosCRM
      .post("/notification/list_notification", { page, pageSize })
      .then((res) => {
        setListNotifi([...listNotifi, ...res.data.data.data]);
        setTotalUnread(res.data.data.countUnread);
      });
  }, [page,reloadNotification]);

  const handleReadNotification = (idNotification, index) => {
    axiosCRM.post("/notification/read_one_notification", {
      idNotification: idNotification,
    });
    const covert = { ...listNotifi[index], read: true };
    listNotifi.splice(index, 1, covert);
    setListNotifi([...listNotifi]);
  };
  const handleReadAllNotification = () => {
    axiosCRM
      .post("/notification/read_all_notification", {})
      .then((res) => {
        setTotalUnread(0);
        setListNotifi([...listNotifi.map((item) => ({ ...item, read: true }))]);
      })
      .catch((err) => window.alert("Vui lòng thử lại sau"));
  };
  return (
    <>
      <div className={style.totalUnreadBox}>
        <Image
          className={style.notify_icon_1}
          width={28}
          height={28}
          alt=".."
          onClick={toggleModal}
          src="/crm/notice.svg"
        />
        {totalUnread != 0 && (
          <div className={style.totalUnread}>
            {totalUnread > 99 ? "99+" : totalUnread}
          </div>
        )}
      </div>
      <div className={style.totalUnreadBox2}>
        <Image
          className={style.notify_icon_2}
          width={28}
          height={28}
          alt=".."
          onClick={toggleModal}
          src="/crm/icon-notice-1024.svg"
        />
        {totalUnread != 0 && (
          <div className={style.totalUnread}>
            {totalUnread > 99 ? "99+" : totalUnread}
          </div>
        )}
      </div>

      {isOpen && (
        <div className={style.notice_open}>
          <div className={style.select_notice}>
            <ul className={style.all_notice}>
              {listNotifi.map((item, index) => (
                <li
                  key={index}
                  onClick={
                    item.read == false
                      ? () => handleReadNotification(item._id, index)
                      : null
                  }
                  className={`${style.notice__item} ${
                    item.read ? "" : style.readed
                  }`}
                >
                  <a
                    href={
                      hanldeTypeLink(item.target) &&
                      `${hanldeTypeLink(item.target)}/${item.link}`
                    }
                    className={style.select__tab}
                  >
                    {item.message}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={style.tab_content}>
            <div className={style.notice_box}></div>
          </div>
          <div className={style.accept_all}>
            <button
              onClick={() => handleReadAllNotification()}
              className={style.accept_button_all}
            >
              Xác nhận tất cả
            </button>
          </div>
        </div>
      )}
    </>
  );
}
