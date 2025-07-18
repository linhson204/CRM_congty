import React, { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import styles from "../potential.module.css";
import { useRouter } from "next/router";
import PotentialSelectBoxStep from "../potential_steps/select_box_step";
import ModalCompleteStep from "../potential_steps/complete_modal";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  listNV: any;
}

const ShareActionModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  listNV,
}) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [label, setLabel] = useState("");
  const [elements, setElements] = useState<JSX.Element[]>([]);
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const handleOK = () => {
    setIsModalCancel(false);
    clearLabel();
    setIsOpenMdalSuccess(true);
    setTimeout(() => {
      setIsOpenMdalSuccess(false);
    }, 2000);
  };

  useEffect(() => {
    if (Array.isArray(listNV)) {
      const updatedOptions = [
        { value: "", label: "Chọn người bàn giao" },
        ...listNV.map((item) => {
          const name = item?.ep_name || "";
          const id = item?.ep_id?.toString() || "";

          return { value: id, label: `(${id}) ${name}` };
        }),
      ];

      setOptions(updatedOptions);
    }
  }, [listNV]);

  const handleAddElement = (condition: string) => {
    const newElement = (
      <div className={styles.content_obj} key={Date.now().toString()}>
        <div className={styles.choose_obj}>
          <label className={`${styles.form_label} required`}>{condition}</label>
          <PotentialSelectBoxStep
            value="Tất cả phòng ban"
            placeholder="Chọn phòng ban"
          />
        </div>
        <div className={styles.choose_obj}>
          <label className={`${styles.form_label} required`}>
            Quyền sử dụng
          </label>
          <PotentialSelectBoxStep value="Tất cả phòng ban" placeholder="Chọn" />
        </div>
      </div>
    );

    if (label !== condition) {
      setLabel(condition);
      setElements([newElement]);
    } else {
      setElements((prevElements) => [...prevElements, newElement]);
    }
  };

  const clearLabel = () => {
    setElements([]);
  };

  return (
    <>
      <Modal
        title={"Chia sẻ chính sách giá"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => {
          setIsModalCancel(false);
          clearLabel();
        }}
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
              }}
              className={`${styles.department} ${styles.btn_obj}`}
            >
              Phòng ban
            </button>
            <button
              onClick={() => {
                setIsOpenSelect(true);
                handleAddElement("Nhân viên được chia sẻ");
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
        link={"/potential/list"}
      />
    </>
  );
};

export default ShareActionModal;
