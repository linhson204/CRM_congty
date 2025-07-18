import React, { useState } from "react";
import { Modal } from "antd";
import styles from "../product_return.module.css";
import stylePotential from "../../potential/potential.module.css";
import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import { showModalWithTimeout } from "@/components/crm/ultis/helper";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}
const ProductReturnUpdateModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const [isModalSuccess, setIsMdalSuccess] = useState(false);
  const handleOK = () => {
    setIsModalCancel(false);
    showModalWithTimeout(setIsMdalSuccess, 2000);
  };

  return (
    <>
      <Modal
        title={"Cập nhật tình trạng thực hiện"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div style={{ textAlign: "left" }}>
          <div
            className={`${stylePotential.choose_obj} ${stylePotential.update_action_return}`}
          >
            <label className={`${stylePotential.form_label}`}>
              {"Tình trạng giao hàng"}
            </label>
            <PotentialSelectBoxStep
              value="Tất cả phòng ban"
              placeholder="Chọn phòng ban"
            />
          </div>
          <label
            style={{ marginBottom: 0 }}
            className={`${styles.label} required`}
          >
            Lý do
          </label>
          <textarea placeholder="Nhập lý do" className={styles.form_control} />
        </div>
      </Modal>

      <ModalCompleteStep
        modal1Open={isModalSuccess}
        setModal1Open={setIsMdalSuccess}
        title={
          "Cập nhật tình trạng thực hiện đề nghị trả hàng Số đề nghị thành công!"
        }
        link={"/product_return/list"}
      />
    </>
  );
};

export default ProductReturnUpdateModal;
