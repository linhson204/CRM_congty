import React, { useState } from "react";
import { Button, Modal } from "antd";
import styles from "@/components/crm/quote/quote.module.css";
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
  content = "Bạn có chắc chắn muốn hủy thao tác thông tin bạn nhập sẽ không được lưu lại?",
  title = "Xác nhận hủy thao tác",
}) => {
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
    router.push("/quote/list");
  };

  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
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
