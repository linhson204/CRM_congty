import React, { useRef, useState } from "react";
import { Modal } from "antd";
import styles from "../../potential/potential.module.css";
import ModalCompleteStep from "../../potential/potential_steps/complete_modal";

// import PotentialSelectBoxStep from "../potential_steps/select_box_step";
// import ModalCompleteStep from "../potential_steps/complete_modal";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  handleReplaceValues: any;
  // index: number;
}

const HandeOverModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  handleReplaceValues,
  // index,
}) => {
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [valueInput, setValueInput] = useState("");

  const handleOK = () => {
    if (valueInput) {
      setIsModalCancel(false);
      handleReplaceValues(valueInput);
      setValueInput("");
    } else {
      alert("Bạn chưa nhập tên trường");
    }
  };

  return (
    <>
      <Modal
        title={"Tạo trường thay đổi thông tin"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Tạo"
        cancelText="Huỷ"
      >
        <div className={styles.row_mdal} style={{ minHeight: "fit-content" }}>
          <div className={styles.choose_obj}>
            <label className={`${styles.form_label} required`}>
              Đặt tên trường
            </label>
            <input
              onChange={(e) => setValueInput(e.target.value)}
              type="text"
              value={valueInput}
              className={styles.form_control}
              id="field_name"
              name="field_name"
              placeholder="Nhập tên trường"
              aria-required="true"
              aria-invalid="false"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default HandeOverModal;
