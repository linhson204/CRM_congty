import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useRouter } from "next/router";
import { Close } from '@/public/img/marketing/facebook'

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  content: string;
  title: string;
  next: (choose: string) => void
}
const CancelModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  content,
  title,
  next
}) => {
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
    next('next')
  };

  return (
    <>
      
      <Modal
        title={<div style={{
          position: 'relative',
          width: '100%',
        }}>
          <p>{title}</p>
          <div
          onClick={() => setIsModalCancel(false)}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            cursor: 'pointer'
          }}>
            <Close className={``}/>
          </div>
        </div>}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel"}
        okText="Có"
        cancelText="Không"
      >
        <div>{content}</div>
      </Modal>
    </>
  );
};

export default CancelModal;
