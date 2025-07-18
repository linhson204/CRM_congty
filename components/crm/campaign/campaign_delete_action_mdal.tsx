import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useRouter } from "next/router";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  handleDelete?: (value: number) => void;
  id?: number;
}
const DelActionModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  handleDelete,
  id,
}) => {
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
    handleDelete(id);
    // router.push("/list");
  };

  return (
    <>
      <Modal
        title={"Xác nhận xoá chiến dịch"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>Bạn có chắc chắn muốn xoá chiến dịch này không?</div>
      </Modal>
    </>
  );
};

export default DelActionModal;
