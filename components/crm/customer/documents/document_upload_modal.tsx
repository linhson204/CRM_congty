import React, { useState } from "react";
import { Button, Modal } from "antd";
import styles from "../potential.module.css";
import { useRouter } from "next/router";
import UploadDocument from "./upload_document";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}
const UploadDocumentModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
  };

  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      <Modal
        title={"Thêm tệp đính kèm"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>
          <UploadDocument />
        </div>
      </Modal>
    </>
  );
};

export default UploadDocumentModal;
