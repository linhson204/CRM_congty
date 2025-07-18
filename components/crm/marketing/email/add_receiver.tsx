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
        title={"Thêm danh sách người nhận"}
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
            <div style={{ marginBottom: "1rem" }}>
              <label className={styles.form_label} aria-required="true">
                Tên danh sách
              </label>
              <input
                type="text"
                className={styles.form_control}
                name="name_group"
                id="name_group"
                placeholder=" Nhập tên danh sách"
              ></input>
            </div>
          </div>

          <div className={styles.btn_share}>
            <div className="mb-3 col-lg-12">
              <label className={styles.form_label} aria-required="true">
                Nhà cung cấp
              </label>
              <select className={styles.setting_select}>
                <option>Chọn nhà cung cấp</option>
                <option>Email cá nhân</option>
                <option>Email hệ thống</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={"Thêm người nhận thành công!"}
        link={"/marketing/email"}
      />
    </>
  );
};

export default ShareActionModal;
