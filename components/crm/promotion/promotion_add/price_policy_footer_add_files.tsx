import { useState } from "react";
import CancelModal from "../promotion_steps/cancel_modal";
import styles from "./add_promotion.module.css";
import ModalCompleteStep from "../promotion_steps/complete_modal";

export default function PromotionFooterAddFiles() {
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  return (
    <div className={styles.main__footer}>
      <button type="button" onClick={() => setIsModalCancel(true)}>
        Hủy
      </button>
      <button className={styles.save} type="submit" onClick={()=>setModal1Open(true)}>
        Lưu
      </button>

      {
        <CancelModal
          isModalCancel={isModalCancel}
          setIsModalCancel={setIsModalCancel}
          content={
            "Bạn có chắc chắn muốn hủy thêm mới Khuyến mãi, mọi thông tin bạn nhập sẽ không được lưu lại?"
          }
          title={"Xác nhận hủy thêm mới Khuyến mãi"}
        />
      }

      <ModalCompleteStep
        modal1Open={modal1Open}
        setModal1Open={setModal1Open}
        title="Thêm mới Khuyến mãi thành công!"
      />
    </div>
  );
}
