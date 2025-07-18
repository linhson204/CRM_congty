import {
  sidebar_button_group,
  sidebar_before_login,
} from "../ultis/consntant";
import style from "./sidebar.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AccessContext } from "../context/accessContext";
import React from "react";
import ModalLogin from "@/components/modal/ModalLogin";
import Cookies from "js-cookie";
import router from "next/router";

export default function SiebarContent({ isOpen, toggleModal }: any) {
  const btnResize = useRef<HTMLDivElement>(null);
  const [accessRoleOpen, setAccessRoleOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [isCustomCareOpen, setIsCustomCareOpen] = useState(false);
  const [isMKTOpen, setIsMKTOpen] = useState(false);
  const [isManageCostOpen, setIsManageCostOpen] = useState(false);
  const [providerOpen, setProviderOpen] = useState(false);
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCommodity, setIsCommodity] = useState(false);
  const [isCustomerInfor, setIsCustomerInfor] = useState(false);

  const { accessAcountRole, setAccessAcountRole }: any =
    useContext(AccessContext);

  const handleResize = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 1024) {
        btnResize.current?.classList.remove("active_resize");
        btnResize.current?.querySelector("img")?.classList.remove("rotateBtn");
        document?.querySelectorAll(".none")?.forEach((node) => {
          node.classList.remove("none");
        });
      }
    }
  };

  const handleResizeSIdeBar = () => {
    toggleModal(isOpen);
    setAccessRoleOpen(false);
    setIsCustomCareOpen(false);
    setIsCustomOpen(false);
    setIsMKTOpen(false);
    setIsManageCostOpen(false);
    setProviderOpen(false);
  };

  const handleOpenChild = (label: string) => {
    if (isOpen) {
      toggleModal(false);
    }
    if (label === "Phân quyền") {
      setAccessRoleOpen(!accessRoleOpen);
    }
    if (label === "Thông tin khách hàng") {
      setIsCustomerInfor(!isCustomerInfor);
    }
    if (label === "Vật tư hàng hóa") {
      setIsCommodity(!isCommodity);
    }
    if (label === "Khách hàng") {
      setIsCustomOpen(!isCustomOpen);
    }
    if (label === "Chăm sóc khách hàng") {
      setIsCustomCareOpen(!isCustomCareOpen);
    }
    if (label === "Marketing") {
      setIsMKTOpen(!isMKTOpen);
    }
    if (label === "Quản lý thu chi") {
      setIsManageCostOpen(!isManageCostOpen);
    }

    if (label === "Nhà cung cấp") {
      setProviderOpen(!providerOpen);
    }
  };

  const isOpenChild = (label: string) => {
    if (label === "Phân quyền") {
      return accessRoleOpen;
    }
    if (label === "Vật tư hàng hóa") {
      return isCommodity;
    }
    if (label === "Thông tin khách hàng") {
      return isCustomerInfor;
    }
    if (label === "Khách hàng") {
      return isCustomOpen;
    }
    if (label === "Chăm sóc khách hàng") {
      return isCustomCareOpen;
    }
    if (label === "Marketing") {
      return isMKTOpen;
    }
    if (label === "Quản lý thu chi") {
      return isManageCostOpen;
    }
    if (label === "Nhà cung cấp") {
      return providerOpen;
    }
  };

  useEffect(() => {
    if (!isOpen) {
      btnResize.current?.classList.remove("active_resize");
      btnResize.current?.querySelector("img")?.classList.remove("rotateBtn");
    } else {
      btnResize.current?.classList.add("active_resize");
      btnResize.current?.querySelector("img")?.classList.add("rotateBtn");
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOpenLoginModal = () => {
    if (!isLoggedIn) {
      setOpenModalLogin(true);
    }
  };

  const handleCheckLogin = (link, content) => {
    const acc_token = Cookies.get("token_base365");
    const rf_token = Cookies.get("rf_token");
    const role = Cookies.get("role");
    if (content === "Chuyển đổi số") {
      router.push(link);
    } else if (!acc_token || !rf_token || !role) {
      setOpenModalLogin(true);
    } else {
      router.push(link);
    }
  };
  return (
    <>
      {openModalLogin && <ModalLogin setOpenModalLogin={setOpenModalLogin} />}
      <div className={style.sidebar_content}>
        {(accessAcountRole.role === "company"
          ? sidebar_before_login
          : sidebar_button_group
        )?.map((items, i) => (
          <li className={style.item_parent} key={i}>
            {items && items.children && items.children.length > 0 ? (
              <>
                <div
                  onClick={() => handleOpenChild(items.content)}
                  className={style.item_link}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={items.img_link}
                    alt="hungha365.com"
                    className={style.img_link}
                  />
                  <div className={`${style.title} ${!isOpen ? null : "none"}`}>
                    {items.content}
                  </div>
                </div>
                {isOpenChild(items.content) && (
                  <ul className={style.navbar_treeview}>
                    {items.children.length > 0 &&
                      items?.children.map((child, index) => (
                        <li key={index}>
                          <div
                            className={style.item_link}
                            onClick={() =>
                              handleCheckLogin(items.link, items.content)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {child.label}
                          </div>
                        </li>
                      ))}
                  </ul>
                )}
              </>
            ) : (
              <div
                className={style.item_link}
                onClick={() => handleCheckLogin(items.link, items.content)}
                style={{ cursor: "pointer" }}
              >
                <img
                  alt="hungha365.com"
                  src={items.img_link}
                  className={style.img_link}
                />
                <div className={`${style.title} ${!isOpen ? null : "none"}`}>
                  {items.content}
                </div>
              </div>
            )}
          </li>
        ))}
      </div>
    </>
  );
}
