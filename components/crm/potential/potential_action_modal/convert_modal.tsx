import React, { useState } from "react";
import { Modal } from "antd";
import styles from "../potential.module.css";
import { useRouter } from "next/router";
import ModalCompleteStep from "../potential_steps/complete_modal";
import { axiosCRM } from "@/utils/api/api_crm";
import { notifyError, notifyWarning } from "@/utils/function";
import { ToastContainer } from "react-toastify";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}
const ConvertModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const [isOpenMdalComplete, setIsOpenMdalConplete] = useState(false);
  const [type_customer, setTypeCustomer] = useState(0);
  const handleConvertPotential = () => {
    if (!type_customer) {
      notifyWarning("Chọn loại chuyển đổi");
      return;
    }
    axiosCRM
      .post("/potential/convert-potential", { cus_id: id, type_customer })
      .then((res) => {
        setIsModalCancel(false);
        setIsOpenMdalConplete(true);
        setTimeout(() => {
          setIsOpenMdalConplete(false);
        }, 2000);
      })
      .catch(() => notifyError());
  };
  return (
    <>
      <Modal
        title={"Chuyển đổi tiềm năng"}
        centered
        open={isModalCancel}
        onOk={handleConvertPotential}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className="type_convert " style={{ textAlign: "left" }}>
          <p className="d-flex-radio-mdal">
            <input
              type="radio"
              name="type"
              className="company"
              onChange={(e) => setTypeCustomer(1)}
            />
            Thành Khách hàng doanh nghiệp
          </p>
          <p className="d-flex-radio-mdal">
            <input
              type="radio"
              name="type"
              className="personal"
              onChange={(e) => setTypeCustomer(2)}
            />
            Thành Khách hàng cá nhân
          </p>
        </div>
      </Modal>

      <ModalCompleteStep
        modal1Open={isOpenMdalComplete}
        setModal1Open={setIsOpenMdalConplete}
        title={"Chuyển đổi tiềm năng thành khách hàng thành công!"}
        link={"/potential/list"}
      />
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default ConvertModal;
