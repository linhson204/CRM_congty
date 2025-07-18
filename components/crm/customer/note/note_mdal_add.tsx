import React, { useState } from "react";
import { Modal, Select } from "antd";
import { useRouter } from "next/router";
import styles from "../../product_return/product_return.module.css";
import { showModalWithTimeout } from "@/components/crm/ultis/helper";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  title: string;
  content: string;
}
const NoteModalAddOrEdit: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  title,
  content,
}) => {
  const [isMdalSucces, setIsMdalSuccess] = useState(false);
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
    showModalWithTimeout(setIsMdalSuccess, 2000);
  };

  function handleChange() {}

  return (
    <>
      <Modal
        title={title}
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div style={{ textAlign: "left" }}>
          <label className="required" style={{ marginBottom: 0 }}>
            Nội dung ghi chú
          </label>
          <textarea
            style={{ maxWidth: "509px" }}
            placeholder="Nhập lý do"
            className={styles.form_control}
          />
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isMdalSucces}
        setModal1Open={setIsMdalSuccess}
        title={content}
        link={"#"}
      />
    </>
  );
};

export default NoteModalAddOrEdit;
