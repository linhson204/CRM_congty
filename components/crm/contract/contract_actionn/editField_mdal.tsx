import React, { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import styles from "../../potential/potential.module.css";
import ModalCompleteStep from "../../potential/potential_steps/complete_modal";
// import PotentialSelectBoxStep from "../potential_steps/select_box_step";
// import ModalCompleteStep from "../potential_steps/complete_modal";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  handleReplaceValues: any;
  value: string;
  index: any;
  checkDefaultVal: any;
}

const EditFieldModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  handleReplaceValues,
  value,
  index,
  checkDefaultVal,
}) => {
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [valueInput, setValueInput] = useState(value);

  const handleOK = () => {
    if (valueInput) {
      setIsModalCancel(false);
      if (checkDefaultVal && checkDefaultVal > 0) {
        handleReplaceValues(valueInput, index, checkDefaultVal);
      } else {
        handleReplaceValues(valueInput, index);
      }
      setValueInput("");
    } else {
      alert("Bạn chưa nhập tên trường");
    }
  };

  useEffect(() => {
    setValueInput(value);
    inputRef?.current?.focus();
  }, [value]);

  return (
    <>
      <Modal
        title={"Chỉnh sửa trường thay đổi thông tin"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Sửa"
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
              ref={inputRef}
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

export default EditFieldModal;
