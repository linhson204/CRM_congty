import { useState } from "react";
import CancelModal from "../sales_process_steps/cancel_modal";
import styles from "./sales_process.module.css";
import ModalCompleteStep from "../sales_process_steps/complete_modal";

export default function SalesProcessFooter() {
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
          content={
            "Bạn có chắc chắn muốn hủy lưu quy trình bán hàng? Các thao tác bạn vừa nhập sẽ không được lưu lại."
          }
          title={"Xác nhận hủy lưu quy trình bán hàng"}
        />
      }

      <ModalCompleteStep
        modal1Open={modal1Open}
        setModal1Open={setModal1Open}
        title="Cài đặt quy trình bán hàng thành công!"
      />
    </div>
  );
}
