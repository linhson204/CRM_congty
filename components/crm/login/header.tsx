import React, { useEffect, useState } from "react";
import styles from "../login/header.module.css";
import Link from "next/link";
import Image from "next/image";
import ModalRegsiter from "@/components/modal/ModalRegsiter";
import ModalLogin from "@/components/modal/ModalLogin";
import Cookies from "js-cookie";
import { getServerSideProps } from "@/utils/function";
export { getServerSideProps };

interface HeaderHomePageProps {
  openSideBar: boolean;
  setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderHomePage: React.FC<HeaderHomePageProps> = ({ openSideBar, setOpenSideBar }) => {
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [hasTokens, setHasTokens] = useState(false);
  const [userRole1, setUserRole1] = useState(0);

  useEffect(() => {
    const accToken = Cookies.get("token_base365");
    const rfToken = Cookies.get("rf_token");
    const userRole = Cookies.get("role");

    if (accToken && rfToken && userRole) {
      setHasTokens(true);
      setUserRole1(+userRole);
    }
  }, []);

  const handleOpenRegisterModal = () => {
    setOpenModalRegister(true);
  };
  const handleOpenLoginModal = () => {
    setOpenModalLogin(true);
  };

  console.log(openSideBar)
  console.log(setOpenSideBar)

  return (
    <>
      <div className={`${styles.tasbar}`}>
        <div className={styles.display_icon}>
          <a className={styles.logo} href="https://hungha365.com/" target="_blank" rel="noopener noreferrer">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              className={styles.img_icon}
              src={"/crm/hunghalogo.png"}
              alt="hungha365.com"
            />
          </a>
        </div>
        <div className={styles.display_custom}>
          <div className={`${styles["menu"]}`} >
            <div className={styles.menu_item}>
              <Link href="https://hungha365.com/tin-tuc">
                Tin Tức
              </Link>
            </div>

            <div className={`${styles["login_create"]}`}>
              <button
                className={`${styles["dn"]} ${styles.button_login}`}
                onClick={handleOpenLoginModal}
              >
                Đăng Nhập
              </button>
              <button
                className={`${styles["dk"]} ${styles.button_register}`}
                onClick={handleOpenRegisterModal}
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
        <div className={styles.icon_menu} onClick={() => { setOpenSideBar(!openSideBar) }}>
          <img src="https://hungha365.com/storageimage/GV/barwhite.svg" alt="icon" />
        </div>
      </div>

      {openModalRegister && (
        <ModalRegsiter setOpenModalRegister={setOpenModalRegister} />
      )}
      {openModalLogin && <ModalLogin setOpenModalLogin={setOpenModalLogin} />}
    </>
  );
};

export default HeaderHomePage;
