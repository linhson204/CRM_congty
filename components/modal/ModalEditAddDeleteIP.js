/** @format */

import React from 'react';
import styles from './Modal.module.scss';
import {Col, Row, Tabs} from 'antd';
export default function ModalEditAddDeleteIP() {
   return (
      <div>
         <div className={styles.modalalleditdelete}>
            <div className={styles.header}>
               <div className={styles.left}>Danh sách IP Công ty Cổ Phần Thanh Toán Hưng Hà</div>
               <div className={styles.right} style={{cursor: 'pointer'}}>
                  <img src='../img/tabler_plus.png' alt='' />
               </div>
            </div>
            <div className={styles.content}>
               <Row gutter={[22, 22]}>
                  <Col xxl={24} sm={24} md={24} xl={24} xs={24} lg={24}>
                     <div className={styles.form_input}>
                        <div className={styles.title}>IP 1</div>
                        <div className={styles.input}>
                           <input type='text' placeholder='104.28.254.74' readOnly />
                           <div className={styles.delete}>
                              <img src='../img/qlc_delete.png' alt='' />
                           </div>
                        </div>
                     </div>
                  </Col>
                  <Col xxl={24} sm={24} md={24} xl={24} xs={24} lg={24}>
                     <div className={styles.form_input}>
                        <div className={styles.title}>IP 2</div>
                        <div className={styles.input}>
                           <input type='text' placeholder='104.28.254.74' readOnly />
                           <div className={styles.delete}>
                              <img src='../img/qlc_delete.png' alt='' />
                           </div>
                        </div>
                     </div>
                  </Col>
                  <Col xxl={24} sm={24} md={24} xl={24} xs={24} lg={24}>
                     <div className={styles.form_input}>
                        <div className={styles.title}>IP 3</div>
                        <div className={styles.input}>
                           <input type='text' placeholder='Nhập' />
                        </div>
                     </div>
                  </Col>
               </Row>
               <div className={styles.btn_addIP_wrap}>
                  <div className={styles.btn_addIP}>
                     <span>
                        <img src='../img/plus.png' alt='' />
                     </span>
                     <span>Thêm IP mới</span>
                  </div>
               </div>
               <div className={styles.btn_wrap}>
                  <button className={styles.btn_cacel}>Hủy</button>
                  <button className={styles.btn_add}>Thêm</button>
               </div>
            </div>
         </div>
         <div className={styles.dark_overlay}></div>
      </div>
   );
}
