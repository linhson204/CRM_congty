/** @format */

import React, { useEffect, useState } from "react";
import styles from "./Modal.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ModalRegsiter({ setOpenModalRegister }) {
  const router = new useRouter();
  const [getUrl, setUrl] = useState("");
  useEffect(() => {
    const query = router.query;
    if (query.url && query.urlRedeict) {
      const urlGet = "?url=" + query.url + "&urlRedeict=" + query.urlRedeict;
      setUrl(urlGet);
    }
  }, []);
  return (
    <div>
      <div className={styles.modal_login_register}>
        <div
          className={styles.close}
          onClick={() => {
            setOpenModalRegister(false);
          }}
        >
          <img src="/crm/qlc_close.png" alt="" />
        </div>
        <div className={styles.content}>
          <div
            className={styles.text}
          >{`Để tiếp tục đăng ký bạn vui lòng chọn loại tài khoản.`}</div>
          <div className={styles.khoi}>
            <Link href={`https://hungha365.com/dang-ky-cong-ty.html`}>
              <div className={styles.khoi_item}>
                <img src="/crm/Home_fill.png" alt="" />
                <span>Công ty</span>
              </div>
            </Link>
            <Link href={`https://hungha365.com/dang-ky-nhan-vien.html`}>
              <div className={styles.khoi_item}>
                <img src="/crm/User_alt_fill.png" alt="" />
                <span>Nhân viên</span>
              </div>
            </Link>
            <Link href={`https://hungha365.com/dang-ky-ca-nhan.html`}>
              <div className={styles.khoi_item}>
                <img src="/crm/User_circle.png" alt="" />
                <span>Cá nhân</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.dark_overlay}></div>
    </div>
  );
}
