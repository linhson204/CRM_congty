import { useState } from "react";
import CancelModal from "../price_policy_steps/cancel_modal";
import styles from "./add_file_price_policy.module.css";
import ModalCompleteStep from "../price_policy_steps/complete_modal";

export default function PricePolicyFooterAddFiles() {
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
            "Bạn có chắc chắn muốn hủy thêm mới chính sách giá, mọi thông tin bạn nhập sẽ không được lưu lại?"
          }
          title={"Xác nhận hủy thêm mới chính sách giá"}
        />
      }

      <ModalCompleteStep
        modal1Open={modal1Open}
        setModal1Open={setModal1Open}
        title="Thêm mới Chính sách giá thành công!"
      />
    </div>
  );
}
