import React, { useState } from "react";
import { Button, Modal } from "antd";
import Image from "next/image";
import styles from "../price_policy.module.css";
import { useRouter } from "next/router";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}
const DelActionModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
    router.push("/marketing/email");
  };

  return (
    <>
      <Modal
        title={"Xóa mẫu email"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>Bạn có chắc chắn muốn xóa mẫu email này không ?</div>
      </Modal>
    </>
  );
};

export default DelActionModal;
