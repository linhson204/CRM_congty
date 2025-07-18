import { useState } from "react";
import CancelModal from "../potential_steps/cancel_modal";
import styles from "./add_file_potential.module.css";
import ModalCompleteStep from "../potential_steps/complete_modal";
import ModalCompleteStepGr from "../potential_steps/complete_mdal_gr";
import CancelModalGroupCustomer from "../potential_steps/cancel_mdal_gr";
import React from "react";

export default function GrFooterAddFiles({
  link = "/potential/list",
  title,
  contentCancel,
  titleCancel,
  handleSave = () => {
    return false;
  },
  setModal1Open,
  modal1Open
}: any) {
  const [isModalCancel, setIsModalCancel] = useState(false);
  return (
    <div className={styles.main__footer}>
      <button type="button" onClick={() => setIsModalCancel(true)}>
        Hủy
      </button>
      <button
        className={styles.save}
        type="submit"
        onClick={async () => {
          await handleSave();
        }}
      >
        Lưu
      </button>

      {
        <CancelModalGroupCustomer
          isModalCancel={isModalCancel}
          setIsModalCancel={setIsModalCancel}
          content={contentCancel}
          title={titleCancel}
          link={link}
        />
      }

      <ModalCompleteStepGr
        modal1Open={modal1Open}
        setModal1Open={setModal1Open}
        title={title}
        link={link}
      />
    </div>
  );
}
