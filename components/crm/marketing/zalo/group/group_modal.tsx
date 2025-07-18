import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import styles from './group.module.css'


export interface ModalProps {
    onClick: () => void;
    isOpen: boolean
}

const GroupModal: React.FC<ModalProps> = ({onClick, isOpen}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);


  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  

  return (
    <>
      {/* <Button type="primary" onClick={() => onClick()}>
        Open Modal with customized footer
      </Button> */}
      <Modal
        open={isOpen}
        title={
            <div className={styles.bg_modal} onClick={() => onClick()}>
                <p>Nhãn phân loại</p>
                <button className={styles.close_modal}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M15 1L1 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M1 1L15 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg></button>
            </div>
        }
        onOk={handleOk}
        onCancel={() => onClick()}
        
        footer={
            <div className={styles.btn_modal}>

            <Button className={styles.btn_modal_action} key="back" onClick={() => onClick()}>
                Hủy
            </Button>
            <Button className={styles.btn_modal_action} key="submit" type="primary" loading={loading} onClick={handleOk}>
            Tạo mới
            </Button>
            </div>
          
        }
      >
        <div className={styles.input_modal}>
            <input placeholder='Vui lòng nhập tên nhãn phân loại' type='text'/>
        </div>
      </Modal>
    </>
  );
};

export default GroupModal;