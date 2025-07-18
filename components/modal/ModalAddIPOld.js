/** @format */

import React from 'react';
import styles from './Modal.module.scss';
import {Col, Row, Tabs} from 'antd';
import {Select, Space} from 'antd';
export default function ModalAddIPOld() {
   return (
      <div>
         <div className={styles.modaladdnewip}>
            <div className={styles.header}>
               <div className={styles.left}>Thêm IP mới Công ty Cổ Phần Thanh Toán Hưng Hà</div>
               <div className={styles.right} style={{cursor: 'pointer'}}>
                  <img src='../img/tabler_plus.png' alt='' />
               </div>
            </div>
            <div className={styles.content}>
               <Row gutter={[22, 22]}>
                  <Col xxl={24} sm={24} md={24} xl={24} xs={24} lg={24}>
                     <div className={styles.form_input}>
                        <div className={styles.title}>IP</div>
                        <div className={styles.input}>
                           <input type='text' placeholder='Nhập' />
                        </div>
                     </div>
                  </Col>
                  <Col xxl={24} sm={24} md={24} xl={24} xs={24} lg={24}>
                     <div className={styles.btn_wrap}>
                        <button className={styles.btn_cacel}>Hủy</button>
                        <button className={styles.btn_add}>Thêm</button>
                     </div>
                  </Col>
               </Row>
            </div>
         </div>
         <div className={styles.dark_overlay}></div>
      </div>
   );
}
