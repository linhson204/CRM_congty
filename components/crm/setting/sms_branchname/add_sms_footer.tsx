import { useState } from "react";
import CancelModal from "../email_step/cancel_modal";
import styles from "../setting.module.css";
import ModalCompleteStep from "../email_step/complete_modal";

export default function SetupEmailSystemFooter() {
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
        onClick={() => setModal1Open(true)}
      >
        Lưu
      </button>

      {
        <CancelModal
          isModalCancel={isModalCancel}
          setIsModalCancel={setIsModalCancel}
          content={
            "Bạn có chắc chắn muốn hủy lưu kết nối SMS? Các thao tác bạn vừa nhập sẽ không được lưu lại."
          }
          title={"Xác nhận hủy lưu kết nối sms"}
          routerback={"/setting/sms"}
        />
      }

      <ModalCompleteStep
        modal1Open={modal1Open}
        setModal1Open={setModal1Open}
        title="Kết nối SMS thành công!"
        routerback={"/setting/sms"}
      />
    </div>
  );
}
