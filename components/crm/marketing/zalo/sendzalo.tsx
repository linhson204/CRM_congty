import React, { useRef, useState } from "react";
import { Modal } from "antd";
import styles from "../marketing.module.css";
import { useRouter } from "next/router";
import ModalCompleteStep from "@/components/crm/setting/complete_modal";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}

const ShareActionModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
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
    const newElement = <div className={styles.content_obj} key={label}></div>;
    if (label === condition) {
      setElements((prevElements) => [...prevElements, newElement]);
    } else {
      setElements([newElement]);
    }
  };

  return (
    <>
      <Modal
        title={"Gửi thử sms"}
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
            <div className="mb-3 col-lg-12">
              <label className={styles.form_label} aria-required="true">
                Gửi đến
              </label>
              <input
                type="text"
                className={styles.form_control}
                name=""
                placeholder="Nhập sms"
              ></input>
            </div>
          </div>
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={"Gửi sms thành công!"}
        link={"/marketing/sms"}
      />
    </>
  );
};

export default ShareActionModal;
