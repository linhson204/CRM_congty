import React, { useRef, useState } from "react";
import { Modal } from "antd";
import styles from "../bill.module.css";
import { useRouter } from "next/router";
import OrderSelectBoxStep from "../bill_steps/select_box_step";
import ModalCompleteStep from "../bill_steps/complete_modal";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}

const ShareActionModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [label, setLabel] = useState("");
  const [elements, setElements] = useState<JSX.Element[]>([]);
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);

  const handleOK = () => {
    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    setTimeout(() => {
      setIsOpenMdalSuccess(false);
    }, 2000);
  };

  const handleAddElement = (condition: string) => {
    const newElement = (
      <div className={styles.content_obj} key={label}>
        <div className={styles.choose_obj}>
          <label className={`${styles.form_label} required`}>{condition}</label>
          <OrderSelectBoxStep
            value="Tất cả phòng ban"
            placeholder="Chọn phòng ban"
          />
        </div>
        <div className={styles.choose_obj}>
          <label className={`${styles.form_label} required`}>
            Quyền sử dụng
          </label>
          <OrderSelectBoxStep value="Tất cả phòng ban" placeholder="Chọn" />
        </div>
      </div>
    );
    if (label === condition) {
      setElements((prevElements) => [...prevElements, newElement]);
    } else {
      setElements([newElement]);
    }
  };

  return (
    <>
      <Modal
        title={"Chia sẻ đơn hàng"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className={styles.row_mdal}>
          <div className={styles.btn_share}>
            <button
              onClick={() => {
                setIsOpenSelect(true);
                handleAddElement("Phòng ban được chia sẻ");
                setLabel("Phòng ban được chia sẻ");
              }}
              className={`${styles.department} ${styles.btn_obj}`}
            >
              Phòng ban
            </button>
            <button
              onClick={() => {
                setIsOpenSelect(true);
                handleAddElement("Nhân viên được chia sẻ");
                setLabel("Nhân viên được chia sẻ");
              }}
              className={`${styles.employ} ${styles.btn_obj}`}
            >
              Nhân viên
            </button>
          </div>
          <div>{isOpenSelect && elements}</div>
          <div className={`${styles.mb_3} ${styles["col-lg-12"]}`}>
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
        title={"Chia sẻ tiềm năng thành công!"}
        link={"/bill/list"}
      />
    </>
  );
};

export default ShareActionModal;
