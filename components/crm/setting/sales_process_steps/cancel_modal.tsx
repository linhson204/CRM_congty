import React, { useState } from "react";
import { Button, Modal } from "antd";
import styles from "../setting.module.css";
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
  content = "Bạn có chắc chắn muốn hủy thêm mới chính sách giá, mọi thông tin bạn nhập sẽ không được lưu lại?",
  title = "Xác nhận hủy thêm mới chính sách giá",
}) => {
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
    router.push("/sales_process");
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
        <div>{content}</div>
      </Modal>
    </>
  );
};

export default CancelModal;
