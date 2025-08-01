import React, { useState } from "react";
import { Button, Modal } from "antd";
import Image from "next/image";
import styles from "@/components/crm/quote/quote.module.css";
import { useRouter } from "next/router";
import { showModalWithTimeout } from "@/components/crm/ultis/helper";
import ModalCompleteStep from "../quote_steps/complete_modal";

interface MyComponentProps {
  isModalCancel?: boolean;
  setIsModalCancel?: (value: boolean) => void;
  record?: any;
  handleDelete?: any;
}
const DelLichHenModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  record,
  handleDelete,
}) => {
  const [isModalSuccess, setIsMdalSuccess] = useState(false);

  const handleOK = () => {
    handleDelete();
    setIsModalCancel(false);
    showModalWithTimeout(setIsMdalSuccess, 2000);
  };

  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      <Modal
        title={"Xóa lịch hẹn"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>Bạn có chắc chắn muốn xóa lịch hẹn {`${record}`}</div>
      </Modal>

      <ModalCompleteStep
        modal1Open={isModalSuccess}
        setModal1Open={setIsMdalSuccess}
        title={`Xóa lịch hẹn thành công!`}
        link={"#"}
      />
    </>
  );
};

export default DelLichHenModal;
