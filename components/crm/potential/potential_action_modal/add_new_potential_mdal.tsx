import React, { useState } from "react";
import { Modal } from "antd";
import styles from "../potential.module.css";
import PotentialSelectBoxStep from "../potential_steps/select_box_step";

interface MyComponentProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}
const AddNewActionModal: React.FC<MyComponentProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleOK = () => {
    setIsModalOpen(false);
    // router.push("/potential/list");
  };

  return (
    <>
      <Modal
        title={"Thêm danh sách người nhận"}
        centered
        open={isModalOpen}
        onOk={() => handleOK()}
        onCancel={() => setIsModalOpen(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className={styles.row} style={{ textAlign: "left" }}>
          <div className={`${styles.mb__3}`}>
            <label className={`${styles.form_label} required`}>
              Tên danh sách
            </label>
            <input
              type="text"
              className={styles.form_control}
              name="name_group"
              id="name_group"
              placeholder=" Nhập tên danh sách"
            />
          </div>
          <div className={`${styles.mb__3}`}>
            <label className={`${styles.form_label}`}>Nhà cung cấp</label>
            <PotentialSelectBoxStep
              value="Chọn nhà cung cấp"
              placeholder="Chọn nhà cung cấp"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddNewActionModal;
