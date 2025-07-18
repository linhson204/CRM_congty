import React, { useRef, useState } from "react";
import { Input, Modal } from "antd";
import styles from "@/components/crm/quote/quote.module.css";
import PotentialSelectBoxStep from "../quote_steps/select_box_step";
import ModalCompleteStep from "../quote_steps/complete_modal";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  record: any;
  allkey: any;
}

const CallModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  record,
  allkey,
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
        title={"Hoàn thành thực hiện lịch hẹn"}
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
              {"Trạng thái"}
            </label>
            <PotentialSelectBoxStep value="Hoàn thành" placeholder="Chọn" />
          </div>
          <div className={styles.choose_obj}>
            <label className={`${styles.form_label} required`}>
              {"Nội dung cuộc gọi"}
            </label>
            <textarea
              style={{ width: "100%", padding: 10 }}
              placeholder="Nhập nội dung cuộc gọi"
            ></textarea>
          </div>
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={`Cập nhật tình trạng ${record} thành công`}
        link={"#"}
      />
    </>
  );
};

export default CallModal;
