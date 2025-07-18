import React, { useRef, useState } from "react";
import { Modal } from "antd";
import styles from "../bill.module.css";
import BillSelectBoxStep from "../bill_steps/select_box_step";
import ModalCompleteStep from "../bill_steps/complete_modal";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}

const HandeOverModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);

  const handleOK = () => {
    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    setTimeout(() => {
      setIsOpenMdalSuccess(false);
    }, 2000);
  };

  return (
    <>
      <Modal
        title={"Bàn giao công việc"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className={styles.row_mdal}>
          <div className={styles.choose_obj}>
            <label className={`${styles.form_label} required`}>
              {"Chọn người nhận công việc"}
            </label>
            <BillSelectBoxStep
              value="Chọn người nhận công việc"
              placeholder="Chọn người nhận công việc"
            />
          </div>
          <div
            style={{ marginTop: "10px" }}
            className={`${styles.mb_3} ${styles["col-lg-12"]}`}
          >
            <input type="checkbox" id="" name="share_all" defaultValue={1} />
            <div>
              Với danh sách liên quan (đơn hàng, báo giá, lịch hẹn, ...).
            </div>
          </div>
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={"Bàn giao công việc cho Nguyễn Văn Nam thành công!"}
        link={"/bill/list"}
      />
    </>
  );
};

export default HandeOverModal;
