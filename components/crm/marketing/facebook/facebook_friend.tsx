import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../../marketing/marketing.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import Link from "next/link";
import Popup from "./facebook_qr_popup";
import TableDataFaceBookListAcc from "../../table/table-marketing-facebook-friend";
import { Button, Image, Input, Modal } from "antd";
import ModalOtpAccount from "./facebook_modal_otp_acc";
import FacebookPopup from "./facebook_qr_popup";
import { ModalSucess, ModalDel, ModalUpdateInfoAcc ,ModalInvite} from "./facebook_modal";
import TableDataFaceFriendReq from "../../table/table-marketing-facebook-friend-req";
import TableDataFaceFriendSent from "../../table/table-marketing-facebook-friend-sent";
import { SearchOutlined } from "@ant-design/icons";

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
  const [openModalInvite, setOpenModalInvite] = useState(false)

  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();

  useEffect(() => {
    setHeaderTitle("Marketing / Facebook / Chi tiết tài khoản / Bạn bè");
    setShowBackButton(true);
    setCurrentPath("/marketing/facebook");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  const [hasAccount, setHasAccount] = useState(true)
  const [selectedRow, setSelectedRow] = useState(false)
  const [openModallOtpAcc, setOpenModalOtpAcc] = useState(false)
  const [openAddAccModal,setOpenAddAccModal] = useState(false)
  const [showFrRq , setShowFrRq] = useState(false)
  const [showFrSt , setShowFrSt] = useState(false)
  const handleShowFrRq = ()=>{
    setShowFrRq(true)
  }
  const handleShowFrSt = ()=>{
    setShowFrSt(true)
  }
  return (
    <>
      { showFrRq ? <>
      <TableDataFaceFriendReq setSelected={function (value: boolean): void {
          throw new Error("Function not implemented.");
        } } setNumberSelected={undefined}/>
      </> :
       showFrSt ? <>
      <TableDataFaceFriendSent
       setSelected={function (value: boolean): void {
          throw new Error("Function not implemented.");
        } } setNumberSelected={undefined}/>
      </> :
        hasAccount ? <>
          <div className={`${styles.main__control_btn} flex_between mb-20 ${styles.search_product_facebook}`} style={{ marginTop: '20px' }}>
            <div className={styles.main__control_search}>
              <input
                type="text"
                className={styles.input__search}
                name="search"
                defaultValue=""
                placeholder="Tìm kiếm theo tên tài khoản"
              />
              <button className={styles.kinh_lup}>
                <Image
                  width={14}
                  height={14}
                  className={styles.img__search}
                  src="/crm/search.svg"
                  alt="hungha365.com"
                />
              </button>
            </div>
            <div className={`${styles.main__control_add} flex_end`}>
              <button
                type="button"
                
                className={`${styles.dropbtn_add_zalo_shop} flex_align_center items-center`}
                onClick={() =>{handleShowFrRq()}}
              >
                
                <div>Lời mời kết bạn</div>
              </button>
              <button
                type="button"
                className={`${styles.dropbtn_add_zalo_shop} flex_align_center items-center`}
                onClick={() => {handleShowFrSt()}}
              >
                
                <div>Lời mời đã gửi</div>
              </button>
            </div>
          </div>
          <div >
              <Input
              style={{marginTop:'20px'}}
                type="text"
               suffix ={<SearchOutlined />} 
                
                defaultValue=""
                placeholder="Tìm kiếm tên"
              />
              
            </div>
          <TableDataFaceBookListAcc
            setSelected={setSelectedRow}
            setNumberSelected={undefined}
            setOpenModalOtpAcc={setOpenModalOtpAcc}
            setOpenModalDel={setOpenModalDel}
            setOpenModalUpdate={setOpenModalUpdate}
            setOpenModalInvite={setOpenModalInvite}
          />
        </> : <>
          <div>
            <div className={styles.main_default}>
              <p className={styles.text_title}>Bạn chưa có bản mẫu nào</p>
              <p className={styles.text_content}>
                Thêm mới các bản mẫu của riêng bạn để quản lý và tiết kiệm thời gian
                ngay nhé!
              </p>
              <p className={styles.img_default}>
                <img width={'100%'} className="img_none" src="/crm/form_email_null.svg" />
              </p>
              <div className="dropdown">
                <div className={`${styles.main__control_add}`}>
                  <button
                    type="button"
                    className={`${styles.dropbtn_add_zalo_shop} flex_align_center`}
                    onClick={() => { setShowPopup(true) }}
                  >
                    <img src="/crm/add.svg" />
                    Thêm tài khoản
                  </button>
                </div>
              </div>
            </div>
          </div></>

      }
      <ModalOtpAccount open={openModallOtpAcc} setOpen={setOpenModalOtpAcc} setOpenModalSuccess={setOpenModalSucess}/>
      <Popup open={showPopup} setOpen={setShowPopup} />
      <ModalSucess openModalSucess={openModalSucess} setOpenModalSucess={setOpenModalSucess} text={'Thành công'}/>
      <ModalDel openModalDel={openModalDel} setOpenModalDel={setOpenModalDel} text={'Bạn chắc chắn muốn xóa bạn bè này?'} textSuccess={'Xóa bạn bè thành công'}/>
      <ModalUpdateInfoAcc openModalUpdate={openModalUpdate} setOpenModalUpdate={setOpenModalUpdate} text={'Cập nhật thông tin thành công'}/>
      <ModalInvite openModalInvite={openModalInvite} setOpenModalInvite={setOpenModalInvite} text={'Cập nhật thông tin thành công'}/>
      <FacebookPopup open={openAddAccModal} setOpen={setOpenAddAccModal}/>
{/* 
      <Modal
        open={openModalSucess}
        onCancel={() => { setOpenModalSucess(false) }}
        footer={[
          <>
            <div className={styles.facebook_modal_footer_success}>
              <Button size="large">
                Đóng
              </Button>
            </div>
          </>
        ]}
      >
        <div className={styles.facebook_modal_success}>
          <div>
            <SuccessIcon />
          </div>
          <p>
            Thêm tài khoản thành công
          </p>
        </div>
      </Modal> */}
    </>

  );
};

export default FacebookPersonalTable;
