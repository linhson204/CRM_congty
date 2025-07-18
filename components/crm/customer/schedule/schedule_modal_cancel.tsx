import React, { useState } from "react";
import { Modal } from "antd";
import { useRouter } from "next/router";
import styles from "../../product_return/product_return.module.css";
import { showModalWithTimeout } from "@/components/crm/ultis/helper";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}
const ScheduleModalCancel: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const [isMdalSucces, setIsMdalSuccess] = useState(false);
  const router = useRouter();
  const handleOK = () => {
    setIsModalCancel(false);
    showModalWithTimeout(setIsMdalSuccess, 2000);
  };

  return (
    <>
      <Modal
        title={"Hủy lịch hẹn"}
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
        modal1Open={isMdalSucces}
        setModal1Open={setIsMdalSuccess}
        title={"Hủy lịch hẹn ĐH-0000 thành công!"}
        link={"#"}
      />
    </>
  );
};

export default ScheduleModalCancel;
