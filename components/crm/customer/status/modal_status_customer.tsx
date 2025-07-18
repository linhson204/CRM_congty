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
  name?: any;
  id?: any;
}

const EditStatusCustomerModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  updateData,
  name,
  id,
}) => {
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const [dataUpdate, setdataUpdate] = useState("");
  const handleOK = async () => {
    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    if (dataUpdate != "") {
      await fetch(`${base_url}/api/crm/customerStatus/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({ stt_name: `${dataUpdate}`, stt_id: id }),
      });
    }
    setdataUpdate("");
  };
  return (
    <>
      <Modal
        title={"Chỉnh sửa tình trạng khách hàng"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => (setIsModalCancel(false), setdataUpdate(""))}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className={styles.row_mdal}>
          <div className={styles.choose_obj}>
            <div>Tên tình trạng</div>
            <Input
              value={dataUpdate}
              placeholder={name}
              onChange={(e: any) => setdataUpdate(e.target.value)}
            />
          </div>
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={"Cập nhật thành công!"}
        link={""}
      />
    </>
  );
};

export default EditStatusCustomerModal;
