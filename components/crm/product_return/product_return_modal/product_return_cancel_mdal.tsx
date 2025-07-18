import React, { useState } from "react";
import { Modal } from "antd";
import styles from "../product_return.module.css";
import { showModalWithTimeout } from "@/components/crm/ultis/helper";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}
const ProductReturnCancelModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const [isModalSuccess, setIsMdalSuccess] = useState(false);
  const handleOK = () => {
    setIsModalCancel(false);
    showModalWithTimeout(setIsMdalSuccess, 2000);
  };

  return (
    <>
      <Modal
        title={"Hủy bỏ đề nghị trả hàng"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div style={{ textAlign: "left" }}>
          <label
            style={{ marginBottom: 0 }}
            className={`${styles.label} required`}
          >
            Lý do
          </label>
          <textarea placeholder="Nhập lý do" className={styles.form_control} />
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isModalSuccess}
        setModal1Open={setIsMdalSuccess}
        title={"Hủy bỏ đề nghị trả hàng Số đề nghị thành công!"}
        link={"/product_return/list"}
      />
    </>
  );
};

export default ProductReturnCancelModal;
