import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from "./logout.module.css";
import Cookies from "js-cookie";

export default function LogoutCrm({ setShowLogout, showLogout }) {
  const modalRef = useRef(null);

  const show = () => {
    setShowLogout(true);
  };

  const handleNo = () => {
    setShowLogout(false);
  };
  const yes = () => {
    Cookies.remove("token_base365");
    Cookies.remove("rf_token");
    Cookies.remove("refresh_token");
    Cookies.remove("role");
    Cookies.remove("phone");
    window.location.href = "/";
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // onCancel()
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
        <div className={styles.modal__logout} style={{ display: "block" }}>
          <img
            src="/crm/icon-log-out.svg"
            alt=""
            className={styles.img__logout}
          />
          <p className={styles.title__logout}>Đăng xuất</p>
          <p className={styles.text__logout}>Bạn chắc chắn muốn đăng xuất ?</p>
          <div className={styles.button__logout}>
            <button
              type="button"
              onClick={handleNo}
              className={`${styles.cancel__logout} ${styles.button__select}`}
            >
              Hủy
            </button>

            <button
              type="button"
              onClick={yes}
              className={`${styles.accept__logout} ${styles.button__select}`}
            >
              Đăng xuất
            </button>
          </div>
        </div>
    </>
  );
}
