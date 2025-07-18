import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../../marketing/marketing.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import Link from "next/link";
import { SearchOutlined } from '@ant-design/icons';
import Popup from "./facebook_qr_popup";
import TableDataFaceBookListAcc from "../../table/table-marketing-facebook-group";
import TableDataFaceBookListPost from "../../table/table-marketing-facebook-post-list";
import TableDataFaceBookGroupInvite from "../../table/table-marketing-facebook-group-invite";

import { Button, Image, Input, Modal } from "antd";
import ModalOtpAccount from "./facebook_modal_otp_acc";
import FacebookPopup from "./facebook_qr_popup";
import { ModalSucess, ModalDel, ModalUpdateInfoAcc,ModalAddToGroup ,ModalAddFriendInGroup,ModalPost,ModalLeave} from "./facebook_modal";

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
  const [showPostList , setShowPostList] = useState(false)
  const [showGroupInvite , setShowGroupInvite] = useState(false)
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();
  const handleShowPostList = ()=>{
    setShowPostList(true)
  }
  const handleShowGroupInvite = ()=>{
    setShowGroupInvite(true)
  }
  useEffect(() => {
    setHeaderTitle("Marketing / Facebook / Chi tiết tài khoản");
    setShowBackButton(true);
    setCurrentPath("/marketing/facebook");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  const [hasAccount, setHasAccount] = useState(true)
  const [selectedRow, setSelectedRow] = useState(false)
  const [openModalAddToGroup, setOpenModalAddToGroup] = useState(false)
  const [openAddAccModal,setOpenAddAccModal] = useState(false)
  const [openModalAddFriendInGroup,setOpenModalAddFriendInGroup] = useState(false)
  const [openModalPost,setOpenModalPost] = useState(false)
  const [openModalLeave,setOpenModalLeave] = useState(false)
  return (
    <>
      { showPostList ? <>
      <TableDataFaceBookListPost setSelected={function (value: boolean): void {
          throw new Error("Function not implemented.");
        } } setNumberSelected={undefined}/>
      </> : showGroupInvite ? <>
      <TableDataFaceBookGroupInvite setSelected={function (value: boolean): void {
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
                onClick={() =>{handleShowPostList()}}
              >
                
                <div>Danh sách bài viết đã đăng</div>
              </button>
              <button
                type="button"
                className={`${styles.dropbtn_add_zalo_shop} flex_align_center items-center`}
                onClick={() => {handleShowGroupInvite()}}
              >
                
                <div>Lời mời tham gia nhóm</div>
              </button>
            </div>
          </div>
          <div >
              <Input
              style={{marginTop:'20px'}}
                type="text"
               suffix ={<SearchOutlined />} 
                
                defaultValue=""
                placeholder="Tìm kiếm tên nhóm"
              />
              
            </div>
          <TableDataFaceBookListAcc
            setSelected={setSelectedRow}
            setNumberSelected={undefined}
            setOpenModalAddToGroup={setOpenModalAddToGroup}
            setOpenModalLeave={setOpenModalLeave}
            setOpenModalUpdate={setOpenModalUpdate}
            setOpenModalAddFriendInGroup={setOpenModalAddFriendInGroup}
            setOpenModalPost={setOpenModalPost}
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
      <ModalAddToGroup openModalAddToGroup={openModalAddToGroup} setOpenModalAddToGroup={setOpenModalAddToGroup} text={'Thành công'} />
      <ModalAddFriendInGroup openModalAddFriendInGroup={openModalAddFriendInGroup} setOpenModalAddFriendInGroup={setOpenModalAddFriendInGroup} text={'Thành công'} />
      <Popup open={showPopup} setOpen={setShowPopup} />
      <ModalSucess openModalSucess={openModalSucess} setOpenModalSucess={setOpenModalSucess} text={'Thành công'}/>
      <ModalDel openModalDel={openModalDel} setOpenModalDel={setOpenModalDel} text={'Bạn chắc chắn muốn xóa tài khoản này?'} textSuccess={'Đã xóa tài khoản thành công'}/>
      <ModalLeave openModalLeave={openModalLeave} setOpenModalLeave={setOpenModalLeave} text={'Bạn chắc chắn muốn rời nhóm này?'} textSuccess={'Rời nhóm thành công'}/>
      <ModalUpdateInfoAcc openModalUpdate={openModalUpdate} setOpenModalUpdate={setOpenModalUpdate} text={'Cập nhật thông tin thành công'}/>
      <FacebookPopup open={openAddAccModal} setOpen={setOpenAddAccModal}/>
      <ModalPost openModalPost={openModalPost} setOpenModalPost={setOpenModalPost}  text={'Thành công'} />
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
