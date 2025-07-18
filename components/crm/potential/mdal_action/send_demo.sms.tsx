import React, { useRef, useState } from "react";
import { Input, Modal } from "antd";
import styles from "@/components/crm/quote/quote.module.css";
import PotentialSelectBoxStep from "@/components/crm/quote/quote_steps/select_box_step";
import ModalCompleteStep from "@/components/crm/quote/quote_steps/complete_modal";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  record: any;
}

const SendSMSDemoModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  record,
}) => {
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);

  const handleOK = () => {
    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    setTimeout(() => {
      setIsOpenMdalSuccess(false);
    }, 2000);
  };

  return (
    <>
      <Modal
        title={"Gửi thử sms"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className={styles.row_mdal}>
          <div className={styles.choose_obj}>
            <label className={`${styles.form_label} required`}>
              {"Gửi đến"}
            </label>
            <Input placeholder="Nhập số điện thoại" />
          </div>
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={`Gửi ${record} thành công`}
        link={"/quote/list"}
      />
    </>
  );
};

export default SendSMSDemoModal;
