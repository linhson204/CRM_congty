import { useState } from "react";
import CancelModal from "../supplier_steps/cancel_modal";
import styles from "./add_file_supplier.module.css";
import ModalCompleteStep from "../supplier_steps/complete_modal";

export default function SupplierFooterAddFiles({
  link = "/supplier/list",
  title,
  contentCancel,
  titleCancel,
}: any) {
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  return (
    <div>
      <div className={styles.main__footer}>
        <button type="button" onClick={() => setIsModalCancel(true)}>
          Hủy
        </button>
        <button
          className={styles.save}
          type="submit"
          onClick={() => setModal1Open(true)}
        >
          Lưu
        </button>
      </div>
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
