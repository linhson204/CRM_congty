import React, { useRef, useState } from "react";
import { Input, Modal } from "antd";
import styles from "../../potential/potential.module.css";
import InputText from "@/components/crm/potential/potential_add_files/input_text";
import ModalCompleteStep from "@/components/crm/setting/complete_modal";
import { base_url } from "../../service/function";
const Cookies = require("js-cookie");
interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  updateData?: any;
}

const AddStatusCustomerModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  updateData,
}) => {
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const [sttName, setsttName] = useState("");
  const handleOK = async () => {
    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    await fetch(`${base_url}/api/crm/customerStatus/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token_base365")}`,
      },
      body: JSON.stringify({ stt_name: sttName }),
    });
  };
  return (
    <>
      <Modal
        title={"Thêm tình trạng khách hàng"}
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className={styles.choose_obj}>
          Tên tình trạng
          <Input
            placeholder="Tên tình trạng"
            value={sttName}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setsttName(e.target.value)}
          />
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={"Bạn đã thêm trạng thái khách hàng thành công!"}
        link={""}
      />
    </>
  );
};

export default AddStatusCustomerModal;
