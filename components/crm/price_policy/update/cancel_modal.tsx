import React, { useState } from "react";
import { Button, Modal } from "antd";
import styles from "../price_policy.module.css";
import { useRouter } from "next/router";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  content: string;
  title: string;
}
const CancelModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  content = "Bạn có chắc chắn muốn hủy cập nhật chính sách giá, mọi thông tin bạn nhập sẽ không được lưu lại?",
  title = "Xác nhận hủy cập nhật chính sách giá",
}) => {
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
    router.push("/price_policy/list");
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
