import React, { useState } from "react";
import styles from "./facebook.module.css";
import Resender from "./scan_modal";
import { ScanModalIdWrite } from "./facebook_scan_content_modal_uid_write";
import { ScanModalIdPage } from "./facebook_scan_content_modal_uid_page";
import DetailButtonScanFacebook from "./facebook_scan_detail_page_button";
import { ScanModalSaveTable } from "./scan_input";
import ScanModal from "./modal_no_close_btn";

const ButtonsScanFacebook = () => {
  const [isModalSend, setIsModalSend] = useState<boolean>(false);
  const [openInputModal, setOpenInputModal ] = useState<boolean>(false);
  const [hasAccount, setHasAccount] = useState(true);
  const [openModalDel, setOpenModalDel] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);
  const [openModallOtpAcc, setOpenModalOtpAcc] = useState(false);
  const [openAddAccModal, setOpenAddAccModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [numberPage, setNumberPage] = useState<number>(1);
  const detailPage = [
    "UID Tương tác bài viết",
    "UID inbox của Page",
    "UID từ các Group",
    "Quét về Zalo"
  ];
  const contentModal = [
    {
      'title': 'Quét ID inbox của Page',
      'tittleBtn': ['Theo react', 'Theo comment']
    },
    {
      'title': 'Quét ID inbox của Page',
      'tittleBtn': ['Quét']
    },
    {
      'title': '',
      'tittleBtn': ['Lưu']
    }
  ]
  return (
    <>
      <ul className={styles.scan__facebook_btns}>
        {detailPage.map((page, index) => (
          <li
            onClick={() => {setNumberPage(index) , setIsModalSend(true)}}
            className={`${styles.scan_btn} ${
              index === numberPage ? styles.scan_btn_active : ""
            }`}
            key={index}
          >
            {page}
          </li>
        ))}
      </ul>
      <ScanModal
        isModalCancel={isModalSend}
        setIsModalCancel={() => setIsModalSend(false)}
        isHidden={numberPage == 1 ? true : false}
        content={<>
         <ScanModalSaveTable data={undefined} handle={function (e: any): void {
            throw new Error("Function not implemented.");
          } }/></>}
        title={""}
        tittleBtn = {contentModal[2].tittleBtn}
      />
      <DetailButtonScanFacebook currentDetialNumber={numberPage} loading={true}/>
      
    </>
  );
};

export default ButtonsScanFacebook;
