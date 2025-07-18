import React, { useState } from "react";
import { Button, Modal } from "antd";
import styles from "../potential.module.css";
import { useRouter } from "next/router";
const Cookies = require("js-cookie");
interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  id?: any;
  updateData?: any;
}
const CancelModalAdd: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
    router.back()
  };
  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      <Modal
        title={"Xác nhận hủy thêm mới khách hàng"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>Bạn có chắc chắn muốn hủy thêm mới khách hàng?</div>
      </Modal>
    </>
  );
};

export default CancelModalAdd;
