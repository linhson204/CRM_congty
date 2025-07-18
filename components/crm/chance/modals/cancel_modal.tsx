import React, { useState } from "react";
import { Button, Modal } from "antd";
import styles from "../campaign.module.css";
import { useRouter } from "next/router";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  content?: string;
  title?: string;
  link?: string;
  fetchApi?: any;
}
const CancelModalChance: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  content = "Bạn có chắc chắn muốn hủy thêm mới cơ hội, mọi thông tin bạn nhập sẽ không được lưu lại?",
  title = "Xác nhận hủy thêm mới cơ hội",
  link = "/",
  fetchApi = () => {},
}) => {
  const router = useRouter();
  const handleOK = async () => {
    setIsModalCancel(false);
    await fetchApi();
    if (link !== "/") {
      router.push(link);
    }
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

export default CancelModalChance;
