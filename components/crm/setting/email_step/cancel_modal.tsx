import React, { useState } from "react";
import { Button, Modal } from "antd";
import styles from "../setting.module.css";
import { useRouter } from "next/router";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  content: string;
  title: string;
  routerback: string;
}
const CancelModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  content = "",
  title = "",
  routerback = "",
}) => {
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
    router.push(routerback);
  };

  return (
    <>
      <Modal
        title={title}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>
         {content}
        </div>
      </Modal>
    </>
  );
};

export default CancelModal;
