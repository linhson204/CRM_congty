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
const CancelModalContract: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  content = "",
  title,
  link,
  id,
  // updateData,
}) => {
  const router = useRouter();
  const handleOK = () => {
    router.push(`/customer/contract/list/${id}`);
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

export default CancelModalContract;
