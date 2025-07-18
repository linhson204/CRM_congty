import React, { useState, useRef, useEffect } from "react";
import styles from "../../marketing/marketing.module.css";
import Link from "next/link";
import Image from "next/image";
import Popup from "./zalo_qr_popup"
import { Modal } from "antd";
export default function EmailFormInputGroup({ isSelectedRow }: any) {
  const handleClickSelectoption = () => { };
  const [showPopup, setShowPopup] = useState(true);
  const [type, setType] = useState('')
  const [openCategModal, setOpenCategModal] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);
  return (
    <>
      <div className={styles.main__control}>

      </div><div className={`${styles.main__control_btn} flex_between`}>
        <div className={styles.main__control_search}>
          <form>

            <input
              type="text"
              className={styles.input__search}
              name="search"
              // defaultValue="Tìm kiếm theo tên tài khoản"
              placeholder="Tìm kiếm theo tên tài khoản" />
            <button className={styles.kinh_lup}>
              <Image
                width={18.5}
                height={18.5}
                className={styles.img__search}
                src="/crm/search.svg"
                alt="hungha365.com" />
            </button>
          </form>
        </div>
        <div className={`${styles.main__control_add} flex_end`}>
          <button
            type="button"
            className={`${styles.dropbtn_add} flex_align_center`}
            onClick={togglePopup}
          >
            <Image height={12} width={12} alt="..." src="/crm/add.svg" />
            <span>Thêm tài khoảnn</span>
          </button>
          {isOpen && (<Popup />)}

          <Link href="">
            <button
              type="button"
              className={`${styles.dropbtn_del} flex_align_center`}
            >
              <Image height={16} width={16} alt="..." src="/crm/del_white.svg" />
              <span>Xoá</span>
            </button>
          </Link>
        </div>

      </div>
      <Modal
        open={openCategModal}
        onCancel={() => { setOpenCategModal(false) }}
        maskClosable={true}
      >
        <Popup />
      </Modal>
    </>

  );
}
