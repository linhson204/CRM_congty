"use client";

import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import HeaderBar from "./header_bar";
import SiebarContent from "./sidebar_content";
import style from "./sidebar.module.css";
import { SidebarContext } from "../context/resizeContext";
import { useContext, useRef } from "react";
import { AccessContext } from "../context/accessContext";
import { getToken } from "@/pages/api/api-hr/token";
import jwt_decode from "jwt-decode";
import {
  EmployeeInfo,
  getDataCompany,
} from "@/pages/api/api-hr/cai-dat/generalSettings";
import Cookies from "js-cookie";
import { base_url } from "../service/function";
import { useFormData } from "../context/formDataContext";
import { useNotificationReload } from "../context/notificationContext";

export default function SideBar({ isOpened }) {
  const { isOpen, setIsOpen, setDataHeaderSidebar } =
    useContext(SidebarContext);
  const sidebarRef = useRef(null);
  const [dataHeader, setDataHeader] = useState();
  const COOKIE_KEY = "token_base365";
  const [tokenType, setTokenType] = useState(null);
  const { accessAcountRole, setAccessAcountRole } = useContext(AccessContext);
  const { hanldeReload } = useContext(useNotificationReload);
  const handleResize = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 1024) {
        sidebarRef.current?.classList.remove("active_resize");
      }
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

  useEffect(() => {
    const fetchDataType = async () => {
      const currentCookie = getToken(COOKIE_KEY);
      if (currentCookie) {
        const decodedToken = jwt_decode(currentCookie);
        setTokenType(decodedToken?.data?.type);
      } else {
        const interval = setInterval(async () => {
          clearInterval(interval);
          fetchDataType();
        }, 500);
      }
    };
    fetchDataType();
  }, []);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        let dataToStore;
        if (tokenType) {
          if (tokenType === 1 || tokenType === "1") {
            const response = await getDataCompany();
            dataToStore = response?.data;
            setDataHeader(response?.data);
          } else {
            const response = await EmployeeInfo();
            dataToStore = response?.data;
            setDataHeader(response?.data);
            setDataHeaderSidebar(response?.data);
          }
        } else {
          const interval = setInterval(async () => {
            const updatedToken = tokenType;
            if (updatedToken === 1 || updatedToken === "1") {
              clearInterval(interval);
              fetchInfo();
            }
          }, 1000);
        }
        sessionStorage.setItem("dataHeader", JSON.stringify(dataToStore));
      } catch (error) {
        // Xử lý lỗi ở đây
      }
    };
    fetchInfo();
  }, [tokenType]);

  //socket
  useEffect(() => {
    // Tạo kết nối đến máy chủ Socket.IO
    const socket = io.connect("https://socket.timviec365.vn", {
      secure: true,
      enabledTransports: ["https"],
      transports: ["websocket", "polling"],
    });
    // Đoạn mã xử lý sự kiện và giao tiếp với máy chủ Socket.IO
    socket.on("connect", () => {
      // Thêm xử lý sự kiện hoặc truyền tải dữ liệu ở đây
    });
    const role2 = Cookies.get("role");
    const userId = Cookies.get("userID");

    document.addEventListener("click", function () {
      var alertElements = document.querySelectorAll(".alert__call__now");

      alertElements.forEach(function (element) {
        element.addEventListener("click", function () {
          call__now(this);
        });
      });
    });

    function callAjax(url, data, method = "post") {
      var xhr = new XMLHttpRequest();
      xhr.open(method, url, false);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(data));

      if (xhr.status === 200) {
        return JSON.parse(xhr.responseText);
      } else {
        // Xử lý lỗi tại đây
        console.error("Ajax request failed with status:", xhr.status);
        return null;
      }
    }

    const call__now = async (e) => {
      var elm = e;
      var id = elm.getAttribute("data-id");
      if (id !== undefined) {
        var url = `${base_url}/api/crm/cutomerCare/Call`;
        var data = {
          phone: id,
        };
        // var responseObject = callAjax(url, data);

        var responseObject = await fetch(
          `${base_url}/api/crm/cutomerCare/Call`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token_base365")}`,
            },
            body: JSON.stringify({ phone: parseInt(id) }),
          }
        );
        const data = await responseObject.json();
      }
    };

    if (role2 == 2) {
      document.addEventListener("click", (event) => {
        const clickedElement = event.target;
        if (clickedElement.closest(".alert__item__header")) {
          const alertItem = clickedElement.closest(".alert__item");
          if (alertItem) {
            alertItem.remove();
          }
        }
      });
      socket.emit("CRMJoin", userId);
      socket.on(
        "CRMNotification",
        (content, customerName, customerId, groupName, link, type, phone) => {
          var alert = "";
          if (type == 1) {
            var contentAlert =
              'Bạn có khách hàng <span class="alert__item__customer__name">' +
              customerName +
              "</span> vừa được thêm";
            if (groupName != "crm365NULL") {
              contentAlert +=
                ' vào nhóm khách hàng <i class="alert__item__group__name">' +
                groupName +
                "</i>";
            }
          }
          if (type == 2) {
            var contentAlert =
              'Khách hàng <span class="alert__item__customer__name">' +
              customerName +
              "</span> vừa cập nhật thông tin";
          }
          if (contentAlert != undefined) {
            alert =
              `<div class="alert__item">
              <div class="alert__item__header"><div class="fix_close_btn"></div> <button type="button">X</button></div>     
                       <div class="alert__item__content">
                ` +
              contentAlert +
              `
              </div>
              <div class="alert__item__footer">
              <button type="button" class="alert__call__now" data-id="` +
              customerId +
              `">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.65504 3.67583C10.3084 3.80331 10.9089 4.12286 11.3797 4.59359C11.8504 5.06432 12.1699 5.66481 12.2974 6.3182M9.65504 1C11.0125 1.15081 12.2784 1.75871 13.2448 2.72391C14.2112 3.6891 14.8207 4.95421 14.9732 6.31151M14.3043 11.6498V13.6567C14.305 13.843 14.2669 14.0274 14.1922 14.1981C14.1176 14.3688 14.0081 14.522 13.8709 14.648C13.7336 14.7739 13.5715 14.8698 13.395 14.9295C13.2185 14.9892 13.0315 15.0113 12.846 14.9946C10.7875 14.7709 8.81014 14.0675 7.07286 12.9409C5.45655 11.9138 4.0862 10.5434 3.05913 8.92713C1.92858 7.18196 1.22501 5.19502 1.00543 3.12728C0.988713 2.94229 1.0107 2.75585 1.06998 2.57982C1.12927 2.4038 1.22456 2.24204 1.34979 2.10486C1.47501 1.96768 1.62743 1.85808 1.79733 1.78303C1.96724 1.70798 2.15091 1.66913 2.33665 1.66896H4.34352C4.66817 1.66576 4.98291 1.78072 5.22906 1.99242C5.47522 2.20411 5.636 2.49809 5.68144 2.81956C5.76614 3.4618 5.92323 4.0924 6.14971 4.69933C6.23971 4.93876 6.25919 5.19898 6.20583 5.44915C6.15248 5.69932 6.02853 5.92895 5.84867 6.11083L4.9991 6.9604C5.9514 8.63517 7.33808 10.0218 9.01284 10.9741L9.86241 10.1246C10.0443 9.94471 10.2739 9.82076 10.5241 9.76741C10.7743 9.71405 11.0345 9.73353 11.2739 9.82354C11.8808 10.05 12.5114 10.2071 13.1537 10.2918C13.4786 10.3376 13.7754 10.5013 13.9876 10.7517C14.1997 11.0021 14.3124 11.3217 14.3043 11.6498Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                  Gọi ngay
                </button>
              </div>
            </div>`;
            const boxAlertElement = document.getElementById("box_alert");
            if (boxAlertElement) {
              boxAlertElement.insertAdjacentHTML("afterbegin", alert);
            }
          }
          // hanldeReload();
        }
      );
    }

    // Thoát khỏi kết nối khi component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={sidebarRef}
        // style={{ width: isOpen ? "70px" : "302px" }}
        className={`${style.sidebar} ${!isOpened ? `${style.mSideBar}` : null}`}
      >
        <div id="box_alert"></div>

        <HeaderBar dataHeader={dataHeader} isOpen={isOpen} />
        <SiebarContent isOpen={isOpen} toggleModal={setIsOpen} />
      </div>
    </>
  );
}
