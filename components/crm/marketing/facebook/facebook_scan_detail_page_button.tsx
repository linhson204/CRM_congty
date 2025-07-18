import React, { useEffect, useState } from "react";
import styles from "./facebook.module.css";
import { Spin } from "antd";

import { Loading } from "@/public/img/marketing/facebook";
import SuccessModal from "./success_modal";
import CancelModal from "./cancel_modal";
import { ScanModalIdPage } from "./facebook_scan_content_modal_uid_page";


export interface DetailButtonScanProps {
  currentDetialNumber: number,
  loading: boolean
}

const DetailButtonScanFacebook:React.FC<DetailButtonScanProps> = ({ currentDetialNumber, loading }) => {
  const [isLoading, setIsLoading] = useState(true);
  const titleBtns = ["Xuất file", "Danh sách tệp đã quét", "Xóa"];
  const titleLoading = ['Lưu vào danh sách quét', 'Dừng quét']
  const [currentListBtn, setCurrentListBtn] = useState(titleBtns);
  const [openCancel, setOpenCancel ] = useState<boolean>(false);
  const [openSuccess, setOpenSuccess ] = useState<boolean>(false);
  const [isModalSend, setIsModalSend] = useState<boolean>(false);
  const [openInputModal, setOpenInputModal ] = useState<boolean>(false);
  const [hasAccount, setHasAccount] = useState(true);
  const [openModalDel, setOpenModalDel] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);
  const [openModallOtpAcc, setOpenModalOtpAcc] = useState(false);
  const [openAddAccModal, setOpenAddAccModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  
  useEffect(() => {
    if(loading) {
      setCurrentListBtn(titleLoading)
    }
  }, [loading])
  return (
    <div>

        <div className={styles.scan__detail_btn_infor}>
           
            {
              false ?  
        <div className={styles.scan__detail_infor}>
              <div className={styles.scan_loading}>
              <Loading />
              </div> <p className={styles.scan_title}>
              {" "}
              Quét được tổng số:<span> 100/100 </span>UID
              </p>
        </div>
              : <span className={styles.no_loading_text}>Lịch sử quét</span> 
            }
            
        {/* action btns */}
        <div className={styles.scan__detail_btns}>
            <ul>
            {currentListBtn.map((title, index) => (
              title === 'Xóa' ? (<li onClick={() => {
                setOpenCancel(true)
            }} className={`${loading && index == 1  ? styles.padding_btn : ''} `}>{title}</li>) 
              : (<li className={`${loading && index == 1  ? styles.padding_btn : ''} `}>{title}</li>)
            )
            )}
            </ul>
        </div>
        </div>
        <SuccessModal className={"scan_modal"} isModalCancel={openSuccess} setIsModalCancel={() => setOpenSuccess(false)} content={"Xóa lịch sử thành công"} title={""}/>
                        <CancelModal  isModalCancel={openCancel} setIsModalCancel={() => {
                              setOpenCancel(false)
                          } } content={"Bạn chắc chắn muốn xóa?"} title={"Xóa lịch sử"} next={(e) => {
                            if(e === 'next') {
                                setOpenCancel(false),
                                setOpenSuccess(true);
                            }
                          }}/>

                          {/* <Resender
        isModalCancel={isModalSend}
        setIsModalCancel={setIsModalSend}
        isHidden={numberPage == 1 ? true : false}
        content={<>
         <ScanModalIdPage data={undefined} handle={function (e: any): void {
            throw new Error("Function not implemented.");
          } }/></>}
        title={"Quét ID tương tác bài viết"}
        tittleBtn = {contentModal[1].tittleBtn}
      /> */}
        <p className={styles.scan__account}>Danh sách UID quét được từ tài khoản <span>123456789 - Vũ Thị Thùy Dung</span></p>
    </div>
  );
};

export default DetailButtonScanFacebook;
