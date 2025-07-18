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
    router.push("/price_policy/list");
  };

  return (
    <>
      <Modal
        title={"Xác nhận xóa chính sách giá"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>Bạn chắc chắn muốn xoá những Chính sách giá này không ?</div>
      </Modal>
    </>
  );
};

export default DelActionModal;
