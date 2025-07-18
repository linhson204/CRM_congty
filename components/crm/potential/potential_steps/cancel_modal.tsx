import React, { useState } from "react";
import { Button, Modal } from "antd";
import styles from "../potential.module.css";
import { useRouter } from "next/router";
import { base_url } from "../../service/function";
const Cookies = require("js-cookie");
interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  content?: string;
  title?: string;
  link?: string;
  id?: any;
  updateData?: any;
}
const CancelModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  content = "Bạn có chắc chắn muốn hủy nhập tiềm năng từ file, mọi thông tin bạn nhập sẽ không được lưu lại?",
  title = "Xác nhận hủy nhập tiềm năng từ file",
  link = "/potential/list",
  id,
  updateData,
}) => {
  const router = useRouter();
  const handleOK = async () => {
    setIsModalCancel(false);
    await fetch(`${base_url}/api/crm/customerStatus/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      },
      body: JSON.stringify({ stt_id: id }),
    });
    router.push("/tinh-trang-khach-hang");
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
