import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../../marketing/marketing.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import Link from "next/link";
import Popup from "./facebook_qr_popup";
import TableDataFaceBookListAcc from "../../table/table-marketing-facebook-list-acc";
import { Button, Image, Modal } from "antd";
import ModalOtpAccount from "./facebook_modal_otp_acc";
import FacebookPopup from "./facebook_qr_popup";
import { ModalSucess, ModalDel, ModalUpdateInfoAcc } from "./facebook_modal";
import FacebookMess from "./facebook_mess";
const FacebookPersonalTable: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [checkFile, setCheckFile] = useState(false);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [openModalSucess, setOpenModalSucess] = useState(false)
  const [openModalDelSucess, setOpenModalDelSucess] = useState(false)
  const [openModalDel, setOpenModalDel] = useState(false)
  const [openModalUpdate, setOpenModalUpdate] = useState(false)

  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  useEffect(() => {
    setHeaderTitle("Marketing / Facebook / Chi tiết tài khoản");
    setShowBackButton(true);
    setCurrentPath("/marketing/facebook");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  const [hasAccount, setHasAccount] = useState(true)
  const [selectedRow, setSelectedRow] = useState(false)
  const [openModallOtpAcc, setOpenModalOtpAcc] = useState(false)
  const [openAddAccModal,setOpenAddAccModal] = useState(false)
  return (
   <>
   <FacebookMess/>
   </>
  );
};

export default FacebookPersonalTable;
