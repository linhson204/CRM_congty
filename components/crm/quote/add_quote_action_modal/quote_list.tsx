import React, { useState } from "react";
import { Button, Modal } from "antd";
import styles from "../order.module.css";
import { useRouter } from "next/router";
import TabComponent from './tab_quote_list';

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  // content: string;
  title: string;
}
const CancelModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  // content = "Bạn có chắc chắn muốn hủy thêm mới đơn hàng thông tin bạn nhập sẽ không được lưu lại?",
  title = "Danh sách báo giá",
}) => {
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
    // router.push("/order/list");
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
        className={"mdal_cancel campign_mdal"}
        okText="Lưu"
        cancelText="Huỷ"
      >
        <TabComponent />
        
      </Modal>
    </>
  );
};

export default CancelModal;
