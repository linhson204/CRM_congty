import React, { useEffect, useState } from "react";
import ButtonsScanFacebook from "./facebook_scan_detail_buttons";
import styles from "./facebook.module.css";
import DetailButtonScanFacebook from "./facebook_scan_detail_page_button";
import TableDataFacebookScan from "../../table/table_marketing_facebook_scan";
import { useHeader } from "../../hooks/useHeader";
import styleEmpty from "../../marketing/marketing.module.css";
import TableDataFacebookScanWrite from "../../table/table_facebook_scan_uid_write";
import TableDataFacebookScanPage from "../../table/table_facebook_scan_inbox_page";
import TableDataFacebookScanUIDGroup from "../../table/table_facebook_scan_uid_group";
import TableDataFacebookScanZaloPhone from "../../table/table_facebook_scan_zalo_phone";
import TableDataFacebookScanLinkZaloPhone from "../../table/table_marketing_facebook_link_zalo";


const ScanFacebook = () => {
  const [hasAccount, setHasAccount] = useState(true);
  const [openModalDel, setOpenModalDel] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);
  const [openModallOtpAcc, setOpenModalOtpAcc] = useState(false);
  const [openAddAccModal, setOpenAddAccModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath
  }: any = useHeader();

  useEffect(() => {
    setHeaderTitle("Marketing/ Facebook/ Công cụ quét");
    setShowBackButton(true);
    setCurrentPath("/marketing/facebook/scan");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);
  return (
    <>
    {
      hasAccount ?  (<div
        id={`scan-facebook`}
        className={`${styles.scan__facebook_all} scan-facebook`}
      >
          <ButtonsScanFacebook />
          <TableDataFacebookScan
            setSelected={setSelectedRow}
            setNumberSelected={undefined}
            setOpenModalOtpAcc={setOpenModalOtpAcc}
            setOpenModalDel={setOpenModalDel}
            setOpenModalUpdate={setOpenModalUpdate}
          />
          {/* <TableDataFacebookScanWrite
          setSelected={setSelectedRow}
          setNumberSelected={undefined}
          setOpenModalOtpAcc={setOpenModalOtpAcc}
          setOpenModalDel={setOpenModalDel}
          setOpenModalUpdate={setOpenModalUpdate}/> */}
           {/* <TableDataFacebookScanPage
          setSelected={setSelectedRow}
          setNumberSelected={undefined}
          setOpenModalOtpAcc={setOpenModalOtpAcc}
          setOpenModalDel={setOpenModalDel}
          setOpenModalUpdate={setOpenModalUpdate}/> */}
            {/* <TableDataFacebookScanUIDGroup
          setSelected={setSelectedRow}
          setNumberSelected={undefined}
          setOpenModalOtpAcc={setOpenModalOtpAcc}
          setOpenModalDel={setOpenModalDel}
          setOpenModalUpdate={setOpenModalUpdate}/> */}
          {/* <TableDataFacebookScanZaloPhone
          setSelected={setSelectedRow}
          setNumberSelected={undefined}
          setOpenModalOtpAcc={setOpenModalOtpAcc}
          setOpenModalDel={setOpenModalDel}
          setOpenModalUpdate={setOpenModalUpdate}/> */}
          {/* <TableDataFacebookScanLinkZaloPhone
          setSelected={setSelectedRow}
          setNumberSelected={undefined}
          setOpenModalOtpAcc={setOpenModalOtpAcc}
          setOpenModalDel={setOpenModalDel}
          setOpenModalUpdate={setOpenModalUpdate}/> */}

          
      </div>) : (
         <div>
         <div className={styleEmpty.main_default}>
           <p className={styleEmpty.text_title}>Bạn chưa có bản mẫu nào</p>
           <p className={styleEmpty.text_content}>
             Thêm mới các bản mẫu của riêng bạn để quản lý và tiết kiệm thời gian
             ngay nhé!
           </p>
           <p className={styleEmpty.img_default}>
             <img width={'100%'} className="img_none" src="/crm/form_email_null.svg" />
           </p>
           <div className="dropdown">
             <div className={`${styleEmpty.main__control_add}`}>
               <button
                 type="button"
                 className={`${styleEmpty.dropbtn_add_zalo_shop} flex_align_center`}
                 onClick={() => { setShowPopup(true) }}
               >
                 <img src="/crm/add.svg" />
                 Thêm tài khoản
               </button>
             </div>
           </div>
         </div>
       </div>
      )
    }
    </>
  );
};

export default ScanFacebook;
