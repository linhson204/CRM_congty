import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useRouter } from "next/router";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  title: string,
  content: string,
  handleCallAPi: () => void
}
const DelActionModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  title,
  handleCallAPi
}) => {
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
    router.push("/marketing/sms");
  };

  return (
    <>
      <Modal
        title={"Xóa mẫu sms"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>Bạn có chắc chắn muốn xóa mẫu SMS này không ?</div>
      </Modal>
    </>
  );
};

export default DelActionModal;
