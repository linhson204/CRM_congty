import React, { useState } from "react";
import { Button, Modal } from "antd";
import Image from "next/image";
import styles from "@/components/crm/quote/quote.module.css";
import { useRouter } from "next/router";
import { showModalWithTimeout } from "@/components/crm/ultis/helper";
import ModalCompleteStep from "@/components/crm/quote/quote_steps/complete_modal";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  record: any;
}
const ResendActionModalEmil: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  record,
}) => {
  const [isModalSuccess, setIsMdalSuccess] = useState(false);

  const handleOK = () => {
    setIsModalCancel(false);
    showModalWithTimeout(setIsMdalSuccess, 2000);
  };

  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      <Modal
        title={"Gửi lại email"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>Bạn có chắc chắn muốn gửi lại email {`${record}`}</div>
      </Modal>

      <ModalCompleteStep
        modal1Open={isModalSuccess}
        setModal1Open={setIsMdalSuccess}
        title={`Gửi lại Email ${record} thành công!`}
        link={"#"}
      />
    </>
  );
};

export default ResendActionModalEmil;
