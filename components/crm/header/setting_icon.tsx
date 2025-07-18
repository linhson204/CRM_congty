"use client";
import style from "./header.module.css";
import Image from "next/image";
import useModal from "../hooks/useModal";
import SettingModal from "./modal_header/modal_setting";
import { useEffect, useState } from "react";
import { getToken } from "@/pages/api/api-hr/token";
import {
  EmployeeInfo,
  getDataCompany,
} from "@/pages/api/api-hr/cai-dat/generalSettings";
import jwt_decode from "jwt-decode";

export default function SettingButtonHeader() {
  const { isOpen, toggleModal, closeModal } = useModal(style.setting_open, [
    style.setting_icon_1,
    style.setting_icon_2,
  ]);
  const [dataHeader, setDataHeader] = useState<any>();
  const [tokenType, setTokenType] = useState<any>(null);
  const COOKIE_KEY = "token_base365";

  useEffect(() => {
    const fetchDataType = async () => {
      const currentCookie = getToken(COOKIE_KEY);
      if (currentCookie) {
        const decodedToken: any = jwt_decode(currentCookie);
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
        if (tokenType) {
          if (tokenType === 1 || tokenType === "1") {
            const response = await getDataCompany();
            setDataHeader(response?.data);
          } else {
            const response = await EmployeeInfo();
            setDataHeader(response?.data);
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
      } catch (error) {
        // Xử lý lỗi ở đây
      }
    };
    fetchInfo();
  }, [tokenType]);

  return (
    <>
      <Image
        className={style.setting_icon_1}
        width={28}
        height={28}
        alt=".."
        onClick={toggleModal}
        src="/crm/setter.svg"
      />
      <Image
        className={style.setting_icon_2}
        width={28}
        height={28}
        onClick={toggleModal}
        alt=".."
        src="/crm/icon-setting-1024.svg"
      />

      {isOpen && <SettingModal dataHeader={dataHeader} />}
    </>
  );
}
