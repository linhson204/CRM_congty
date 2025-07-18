import { useState } from "react";
import CancelModal from "../potential_steps/cancel_modal";
import styles from "./add_file_potential.module.css";
import ModalCompleteStep from "../potential_steps/complete_modal";

export default function PotentialFooterAddFiles({
  link = "/potential/list",
  title,
  contentCancel,
  titleCancel,
  handleSave = ()=>{},
}: any) {
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  return (
    <div className={styles.main__footer}>
      <button type="button" onClick={() => setIsModalCancel(true)}>
        Hủy
      </button>
      <button
        className={styles.save}
        type="submit"
        onClick={() => {
          handleSave()
          setModal1Open(true)
        }}
      >
        Lưu
      </button>

      {
        <CancelModal
          isModalCancel={isModalCancel}
          setIsModalCancel={setIsModalCancel}
          content={contentCancel}
          title={titleCancel}
          link = {link}
        />
      }

      <ModalCompleteStep
        modal1Open={modal1Open}
        setModal1Open={setModal1Open}
        title={title}
        link={link}
      />
    </div>
  );
}