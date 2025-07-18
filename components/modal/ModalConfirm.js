/** @format */

import React from 'react';
import styles from './Modal.module.scss';
export default function ModalConfirm({setOpenModalConfirm, setOpenModalRegister, setOpenModalLogin}) {
   return (
      <div>
         <div className={styles.modalconfirm}>
            <div className={styles.close} onClick={() => setOpenModalConfirm(false)}>
               <img src='/crm/qlc_close.png' alt='' />
            </div>
            <div className={styles.content}>
               <div className={styles.content_1}>Bạn cần đăng nhập để tiếp tục sử dụng các tiện ích</div>
               <div className={styles.content_2}>Nếu chưa có tài khoản, hãy đăng ký tài khoản mới</div>
               <div className={styles.btn}>
                  <button
                     className={styles.btn_register}
                     onClick={() => {
                        setOpenModalRegister(true);
                        setOpenModalConfirm(false);
                     }}
                  >
                     Đăng ký{' '}
                  </button>
                  <button
                     className={styles.btn_login}
                     onClick={() => {
                        setOpenModalLogin(true);
                        setOpenModalConfirm(false);
                     }}
                  >
                     Đăng nhập
                  </button>
               </div>
            </div>
         </div>
         <div className={styles.dark_overlay}></div>
      </div>
   );
}
