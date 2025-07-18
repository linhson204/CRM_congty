import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "../../home/home.module.css";
import style from "../../marketing/email/email.module.css";
import styles from "../../marketing/marketing.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Tabs, Button, Input , Avatar , List, Badge, Popover , Form,Row,Col,Select} from "antd";
import Link from "next/link";

import Image from "next/image";

const FacebookMess: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [checkFile, setCheckFile] = useState(false);
  const { isOpen } = useContext<any>(SidebarContext);
  const imgRef = useRef<HTMLInputElement>(null);
  const [showPopup, setShowPopup] = useState(true);
  
 
  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
 

  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath,
  }: any = useHeader();
  
  const { Option } = Select;

  
  const [open, setOpen] = useState(false);

  const handleSelectOpen = () => {
    setOpen(true);
  };

  const handleSelectClose = () => {
    setOpen(false);
  };

  const selectAfter = (
    <><span>|</span><Select
      
      bordered={false}
      defaultValue="Nhắn tin"
      open={open}
      onDropdownVisibleChange={handleSelectOpen}
      onBlur={handleSelectClose}

    > Nhắn tin
      <Option value="Nhắn tin">Nhắn tin</Option>
      <Option value="Bạn bè">Bạn bè</Option>
      <Option value="Nhóm">Nhóm</Option>
    </Select></>
  );
  
  useEffect(() => {
    setHeaderTitle("Marketing/ Zalo");
    setShowBackButton(true);
    setCurrentPath("/marketing/zalo");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  return (
    <><Input placeholder="123456789 - VŨ THỊ THÙY DUNG" suffix={selectAfter} />
    
    <div className={styles.mescontainer}>
      <div className={styles.messidebar}>
        <div className={styles.mesInfo}>
          <div className={styles.accInfo}>
            <div className={styles.acc_img}>
              <div className="ava">
                <Image width={36}
                  height={36}
                  src="/crm/chat_ava.svg"
                  alt="ava" />


                <Image width={12}
                  height={12}
                  style={{ marginLeft: '-10px' }}
                  src=""

                  alt="status" />
              </div>
              <div>
                <div className="accName">Đỗ Nam Trung</div>
                <div className="altName">
                  <Image width={15}
                    height={15}
                    alt="icon"
                    src="/crm/accIcon.svg" />
                  <span> Trung cute</span>
                </div>
              </div>
            </div>

            <button className={styles.switchAcc}>
              <Image width={30}
                height={33}
                alt="icon"
                src="/crm/3dots_2.svg" />
            </button>
          </div>



          <Input className={styles.mesSearchBar} prefix={<Image alt='hungha.com' src={'/crm/search.svg'} width={14} height={14} />}
            placeholder='Người, nhóm và tin nhắn' />



        </div>
        <div className={styles.recentMes}>
          <div>
            <h5>Cuộc trò chuyện gần đây</h5>

          </div>
          <div className={styles.mesCate}>
            <button>Tất cả</button>
            <button>Chưa đọc</button>
          </div>
          <p style={{ color: '#666666', fontWeight: 'bold' }}>Cuộc trò chuyện</p>
          <div>

            <ul>
              <li><div>
                <Image width={36}
                  height={36}
                  src="/crm/chat_ava.svg"
                  alt="ava" />
                <Image width={12}
                  height={12}
                  style={{ marginLeft: '-10px' }}
                  src=""

                  alt="status" />
              </div>
                <div>
                  <p style={{ fontWeight: 'bold' }}>TIMVIEC365.VN</p>
                  <p>Xin chào, đây là tin nhắn, đây là...</p>
                </div>
                <div>


                </div>
              </li>
              <li><div>
                <Image width={36}
                  height={36}
                  src="/crm/chat_ava.svg"
                  alt="ava" />
                <Image width={12}
                  height={12}
                  src=""

                  style={{ marginLeft: '-10px' }}
                  alt="status" />
              </div>
                <div>
                  <p style={{ fontWeight: 'bold' }}>TIMVIEC365.VN</p>
                  <p>Xin chào, đây là tin nhắn, đây là...</p>
                </div>
                <div>


                </div>
              </li>
              <li><div>
                <Image width={36}
                  height={36}
                  src="/crm/chat_ava.svg"
                  alt="ava" />
                <Image width={12}
                  height={12}
                  src=""

                  style={{ marginLeft: '-10px' }}
                  alt="status" />
              </div>
                <div>
                  <p style={{ fontWeight: 'bold' }}>TIMVIEC365.VN</p>
                  <p>Xin chào, đây là tin nhắn, đây là...</p>
                </div>
                <div>


                </div>
              </li>
              <li><div>
                <Image width={36}
                  height={36}
                  src="/crm/chat_ava.svg"
                  alt="ava" />
                <Image width={12}
                  height={12}
                  src=""

                  style={{ marginLeft: '-10px' }}
                  alt="status" />
              </div>
                <div>
                  <p style={{ fontWeight: 'bold' }}>TIMVIEC365.VN</p>
                  <p>Xin chào, đây là tin nhắn, đây là...</p>
                </div>
                <div>


                </div>
              </li>
              <li><div>
                <Image width={36}
                  height={36}
                  src="/crm/chat_ava.svg"
                  alt="ava" />
                <Image width={12}
                  height={12}
                  src=""
                  style={{ marginLeft: '-10px' }}
                  alt="status" />
              </div>
                <div>
                  <p style={{ fontWeight: 'bold' }}>TIMVIEC365.VN</p>
                  <p>Xin chào, đây là tin nhắn, đây là...</p>
                </div>
                <div>


                </div>
              </li>
              <li><div>
                <Image width={36}
                  height={36}
                  src="/crm/chat_ava.svg"
                  alt="ava" />
                <Image width={12}
                  height={12}
                  src=""
                  style={{ marginLeft: '-10px' }}
                  alt="status" />
              </div>
                <div>
                  <p style={{ fontWeight: 'bold' }}>TIMVIEC365.VN</p>
                  <p>Xin chào, đây là tin nhắn, đây là...</p>
                </div>
                <div>


                </div>
              </li>
              <li><div>
                <Image width={36}
                  height={36}
                  src="/crm/chat_ava.svg"
                  alt="ava" />
                <Image width={12}
                  height={12}
                  src=""
                  style={{ marginLeft: '-10px' }}
                  alt="status" />
              </div>
                <div>
                  <p style={{ fontWeight: 'bold' }}>TIMVIEC365.VN</p>
                  <p>Xin chào, đây là tin nhắn, đây là...</p>
                </div>
                <div>


                </div>
              </li>
              <li><div>
                <Image width={36}
                  height={36}
                  src="/crm/chat_ava.svg"
                  alt="ava" />
                <Image width={12}
                  height={12}
                  src=""
                  style={{ marginLeft: '-10px' }}
                  alt="status" />
              </div>
                <div>
                  <p style={{ fontWeight: 'bold' }}>TIMVIEC365.VN</p>
                  <p>Xin chào, đây là tin nhắn, đây là...</p>
                </div>
                <div>


                </div>
              </li>
              <li><div>
                <Image width={36}
                  height={36}
                  src="/crm/chat_ava.svg"
                  alt="ava" />
                <Image width={12}
                  height={12}
                  src=""
                  style={{ marginLeft: '-10px' }}
                  alt="status" />
              </div>
                <div>
                  <p style={{ fontWeight: 'bold' }}>TIMVIEC365.VN</p>
                  <p>Xin chào, đây là tin nhắn, đây là...</p>
                </div>
                <div>


                </div>
              </li>

            </ul>
          </div>
        </div>
      </div>

      <div className={styles.meschatbox} style={{
        zIndex: 2000
      }}>
        <div className={styles.chatheader}>
          <div>
            <Image width={50}
              height={50}
              src="/crm/chat_ava.svg"
              alt="ava" />
            <Image width={13}
              height={13}
              src=""
              style={{ marginLeft: '-12px' }}
              alt="status" />
          </div>
          <div>
            <h1>TIMVIEC365.VN</h1>
            <span>Đang hoạt động</span>
            <span> | </span>
            <button className={styles.chatHeaderText}>
              Thư viện
            </button>
            <span> | </span>
            <button className={styles.chatHeaderText}>
              Tìm kiếm
            </button>
            <span> | </span>

          </div>
        </div>
        <div className={styles.chatarea}>
          <div className={styles.message} style={{ display: 'flex', gap: '8px' }}>

            <img style={{ width: '36px', height: '36px' }} src="/crm/chat_ava.svg" />
            <p>TIMVIEC365.VN, 10:07</p>

          </div>
        </div>
        <div className={styles.sentmess}>


          <Input  placeholder="Nhập tin nhắn" style={{ width: '494px', borderRadius: '50px', flex: '1 0 0', gap: '10px' }} prefix={<Image alt='hungha.com' src={'/crm/emoji.svg'} width={24} height={25} />} />

          <Button shape="circle" style={{ backgroundColor: '#E6E9FD' }}> <Image width={22}
            height={22}
            src="/crm/import-file.svg"
            alt="emo" />  </Button>
          <Button shape="circle" style={{ backgroundColor: '#E6E9FD' }}> <Image width={22}
            height={22}
            src="/crm/contact.svg"
            alt="emo" />  </Button>
          <Button shape="circle" style={{ backgroundColor: '#E6E9FD' }}> <Image width={22}
            height={22}
            src="/crm/microphone1.svg"
            alt="emo" />  </Button>
          <button>
            <Image src="/crm/Group 629325.svg" width={32} height={32} alt="" />
          </button>



        </div>
      </div>

    </div></>
     
  );
};

export default  FacebookMess ;
