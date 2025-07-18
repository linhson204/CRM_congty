/** @format */

import React from 'react';
import styles from './Modal.module.scss';
import {Col, Row, Tabs} from 'antd';
export default function ModalAddDepNew({setOpenModalAddDepNew}) {
   return (
      <div>
         <div className={styles.modalalleditdelete}>
            <div className={styles.header}>
               <div className={styles.left}>Thêm phòng ban mới</div>
               <div className={styles.right} style={{cursor: 'pointer'}} onClick={() => setOpenModalAddDepNew(false)}>
                  <img src='../img/tabler_plus.png' alt='' />
               </div>
            </div>
            <div className={styles.content}>
               <Row gutter={[22, 22]}>
                  <Col xxl={24} sm={24} md={24} xl={24} xs={24} lg={24}>
                     <div className={styles.form_input}>
                        <div className={styles.title}>
                           <span>Phòng/ban</span>
                        </div>
                        <div className={styles.input}>
                           <input type='text' placeholder='Nhập' />
                        </div>
                     </div>
                  </Col>
                  <Col xxl={24} sm={24} md={24} xl={24} xs={24} lg={24}>
                     <div className={styles.form_input}>
                        <div className={styles.title}>
                           <span>Nhóm 1</span>
                        </div>
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
                     <span>Thêm nhóm</span>
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
