import React, { useState } from "react";
import { Button, Modal } from "antd";
import Image from "next/image";
import styles from "../order.module.css";
import { useRouter } from "next/router";
import ModalCompleteStep from "@/components/crm/supplier/supplier_steps/complete_modal";

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
  };

  return (
    <>
      <Modal
        width={400}
        open={isModalCancel}
        title={
          <div
            style={{
              background: "#4c5bd4",
              width: "109%",
              margin: "-12px -30px",
            }}
          >
            <div
              style={{
                color: "white",
                fontSize: 18,
                textAlign: "center",
                marginTop: "7px",
              }}
            >
              Xách nhận xóa
            </div>
          </div>
        }
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div style={{ fontSize: "17px" }}>
          Bạn có đồng ý xóa nhóm nhà cung cấp!
        </div>
      </Modal>
    </>
  );
};

export default DelActionModal;
