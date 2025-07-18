import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useRouter } from "next/router";
import { Close, Success } from "@/public/img/marketing/facebook";
import { style } from "d3";
import styles from './facebook.module.css'

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  content: string;
  title: string;
  className: string;
}
const SuccessModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  content,
  title,
  className
}) => {
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
    // router.push("/marketing/sms");
  };

  return (
    <>
      <Modal
        title={""}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={`mdal_cancel custom_modal ${className}`}
        cancelText="Đóng"
      >
        <div
          style={{
            display: "block",
            paddingTop: '2.6rem'
          }}
        >
          <div style={{
            marginBottom: '1.62rem',
           
          }}>
            <Success />
          </div >
          <div style={{
            marginBottom: '1.62rem'}}>
            {content}

          </div>
        </div>
      </Modal>
    </>
  );
};

export default SuccessModal;
