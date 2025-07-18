/** @format */

import React, { useEffect, useState } from "react";
import styles from "./Modal.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import ModalSignInHome from "./ModalLoginConfig";

export default function ModalLogin({ setOpenModalLogin }) {
    const router = new useRouter();

    useEffect(() => {
        const query = router.query;
        if (query.url && query.urlRedeict) {
            const urlGet =
                "?url=" + query.url + "&urlRedeict=" + query.urlRedeict;
            setUrl(urlGet);
        }
    }, []);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState();
    return (
        <div>
            <div className={styles.modal_login_register}>
                <div
                    className={styles.close}
                    onClick={() => {
                        setOpenModalLogin(false);
                    }}
                >
                    <img src="./qlc_close.png" alt="hungha365.com" />
                </div>
                <div className={styles.content}>
                    <div
                        className={styles.text}
                    >{`Để tiếp tục đăng nhập bạn vui lòng chọn loại tài khoản.`}</div>
                    <div className={styles.khoi}>
                        <div
                            onClick={() => {
                                setOpen(true);
                                setType(1);
                            }}
                            className={styles.khoi_item}
                        >
                            <img src="./Home_fill.png" alt="hungha365.com" />
                            <span>Công ty</span>
                        </div>

                        <div
                            onClick={() => {
                                setType(2);
                                setOpen(true);
                            }}
                            className={styles.khoi_item}
                        >
                            <img
                                src="./User_alt_fill.png"
                                alt="hungha365.com"
                            />
                            <span>Nhân viên</span>
                        </div>

                        <div
                            onClick={() => {
                                setType(0);
                                setOpen(true);
                            }}
                            className={styles.khoi_item}
                        >
                            <img src="./User_circle.png" alt="hungha365.com" />
                            <span>Cá nhân</span>
                        </div>
                    </div>
                </div>
                <ModalSignInHome open={open} setOpen={setOpen} type={type} />
            </div>
            <div className={styles.dark_overlay}></div>
        </div>
    );
}
