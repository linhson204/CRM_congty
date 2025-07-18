import React, { useState } from "react";
import { Button, Modal } from "antd";
import styles from "../supplier.module.css";
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
  content = "Bạn có đồng ý hủy. Mọi dữ liệu bạn vừa nhập sẽ bị xóa?",
  title = "Hủy thêm nhà cung cấp",
}) => {
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
    router.push("/supplier/list");
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
