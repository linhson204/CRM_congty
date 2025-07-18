/** @format */

import React, {useState} from 'react';
import styles from './Modal.module.scss';
import {Col, Row, Tabs} from 'antd';
import {Select, Space} from 'antd';
export default function ModalAddIPNew({setOpenModalAddIPNew}) {
   const ctyData = ['Chọn', 'Hưng Hà', 'Hưng H'];
   const [data, setData] = useState(ctyData[0]);
   const handleOnChange = (value) => {
      setData(ctyData[value]);
   };
   return (
      <div>
         <div className={styles.modaladdnewip}>
            <div className={styles.header}>
               <div className={styles.left}>Thêm IP mới</div>
               <div className={styles.right} style={{cursor: 'pointer'}} onClick={() => setOpenModalAddIPNew(false)}>
                  <img src='../img/tabler_plus.png' alt='' />
               </div>
            </div>
            <div className={styles.content}>
               <Row gutter={[22, 22]}>
                  <Col xxl={24} sm={24} md={24} xl={24} xs={24} lg={24}>
                     <div className={styles.form_input}>
                        <div className={styles.title}>
                           Họ và tên <span style={{color: 'red'}}> *</span>
                        </div>
                        <div className={styles.input}>
                           <input type='text' placeholder='Nhập' />
                        </div>
                     </div>
                  </Col>
                  <Col xxl={24} sm={24} md={24} xl={24} xs={24} lg={24}>
                     <div className={styles.select_wrap}>
                        <div className={styles.title}>
                           Công ty con<span style={{color: 'red'}}> *</span>
                        </div>
                        <Select
                           defaultValue={ctyData[0]}
                           onChange={handleOnChange}
                           className={styles.select}
                           options={ctyData.map((item) => ({
                              label: item,
                              value: item,
                           }))}
                        />
                     </div>
                  </Col>
                  <Col xxl={24} sm={24} md={24} xl={24} xs={24} lg={24}>
                     <div className={styles.select_wrap}>
                        <div className={styles.title}>
                           Phòng/ban<span style={{color: 'red'}}> *</span>
                        </div>
                        <Select
                           defaultValue={ctyData[0]}
                           onChange={handleOnChange}
                           className={styles.select}
                           options={ctyData.map((item) => ({
                              label: item,
                              value: item,
                           }))}
                        />
                     </div>
                  </Col>{' '}
                  <Col xxl={24} sm={24} md={24} xl={24} xs={24} lg={24}>
                     <div className={styles.select_wrap}>
                        <div className={styles.title}>Nhóm</div>
                        <Select
                           defaultValue={ctyData[0]}
                           onChange={handleOnChange}
                           className={styles.select}
                           options={ctyData.map((item) => ({
                              label: item,
                              value: item,
                           }))}
                        />
                     </div>
                  </Col>{' '}
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
