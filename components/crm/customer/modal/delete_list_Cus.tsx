import React, { useRef, useState } from "react";
import { Modal, Select, notification } from "antd";
import type { SelectProps } from "antd";
import ModalCompleteStepDEl from "../../potential/potential_steps/mdaldel_completeCus";
import { base_url } from "../../service/function";
const Cookies = require("js-cookie");
interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  selectedCus: any;
}

const DelCustomerModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  selectedCus,
}) => {
  const [valueSharing, setValueSharing] = useState("");
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const options: SelectProps["options"] = [];
  let cus_id = [];
  selectedCus?.map((item) => {
    cus_id.push(item.cus_id);
  });
  const handleOK = async () => {
    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    try {
      await fetch(`${base_url}/api/crm/customer/deleteKH`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({ cus_id: cus_id }),
      });
    } catch (error) { }
  };

  return (
    <>
      <Modal
        title={"Xóa khách hàng"}
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        Xác nhận xóa khách hàng đã chọn?
      </Modal>
      <ModalCompleteStepDEl
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
      />
    </>
  );
};

export default DelCustomerModal;
