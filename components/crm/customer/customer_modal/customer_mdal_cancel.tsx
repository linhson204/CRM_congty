import React, { useState } from "react";
import { Button, Modal } from "antd";
import styles from "../potential.module.css";
import { useRouter } from "next/router";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  content: string;
  title: string;
  handleCloseMdal: any;
  link: string;
}
const CancelModalCustomApi: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  content = "Bạn có chắc chắn muốn hủy nhập tiềm năng từ file, mọi thông tin bạn nhập sẽ không được lưu lại?",
  title = "Xác nhận hủy nhập tiềm năng từ file",
  handleCloseMdal,
  link,
}) => {
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
    handleCloseMdal();
    router.push(link);
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

export default CancelModalCustomApi;
