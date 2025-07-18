import React, { useState } from "react";
import { Modal } from "antd";
import styles from "../../potential/potential.module.css";
import { showModalWithTimeout } from "@/components/crm/ultis/helper";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  id: any;
}

const DelActionModalContactCustomer: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  id,
}) => {
  const [isModalSuccess, setIsMdalSuccess] = useState(false);

  const handleOK = () => {
    setIsModalCancel(false);
    showModalWithTimeout(setIsMdalSuccess, 2000);
  };

  return (
    <>
      <Modal
        title={"Xác nhận xóa liên hệ khách hàng"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>Bạn có chắc chắn muốn xóa liên hệ khách hàng qwerq không ?</div>
      </Modal>

      <ModalCompleteStep
        modal1Open={isModalSuccess}
        setModal1Open={setIsMdalSuccess}
        title={"Xóa đề nghị trả hàng liên hệ khách hàng thành công!"}
        link={`customer/contact/list/${id}`}
      />
    </>
  );
};

export default DelActionModalContactCustomer;
