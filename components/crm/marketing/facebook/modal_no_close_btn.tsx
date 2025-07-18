import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useRouter } from "next/router";
import styles from './facebook.module.css'

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  content: any;
  title: string;
  tittleBtn: any,
  isHidden: boolean
}
const ScanModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  content,
  title,
  tittleBtn,
  isHidden
}) => {
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
    router.push("/marketing/sms");
  };

  return (
    <>
      <Modal
        title={""}
        style={{ left: 0, width: '100%', }}
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={`mdal_cancel scan_modal ${isHidden ? 'is_hidden' : ''} input_modal_change_name`}
        okText={tittleBtn[0]}
        cancelText={tittleBtn[1]}
        footer={
            <div 
            onClick={() => setIsModalCancel(false)}
            style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                alignItems: 'center',
            }}>
                <Button>
                    Lưu
                </Button>
            </div>
         }
      >
              {content}
      </Modal>
    </>
  );
};

export default ScanModal;
