import { useState } from "react";
import CancelModal from "./cancel_modal";
import styles from "../../potential/potential_add_files/add_file_potential.module.css";
import ModalCompleteStep from "../../potential/potential_steps/complete_modal";

export default function FooterAddEmail({
  link = "/marketing/sms",
  title,
  contentCancel,
  titleCancel,
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
        style={{ background: "#34B632", border: "1px solid #34B632" }}
        type="submit"
        onClick={() => setModal1Open(true)}
      >
        <img
          width="14"
          height="14"
          src="/crm/icon_send.svg"
          alt="hungha365.com"
          style={{ marginRight: "8px", verticalAlign: "middle" }}
        />
        Gửi
      </button>

      {
        <CancelModal
          isModalCancel={isModalCancel}
          setIsModalCancel={setIsModalCancel}
          content={contentCancel}
          title={titleCancel}
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
