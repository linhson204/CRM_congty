import React, { useState } from "react";
import { Button, Modal } from "antd";
import Image from "next/image";
import styles from "../ordern.module.css";
import { useRouter } from "next/router";
import { showModalWithTimeout } from "@/components/crm/ultis/helper";
import ModalCompleteStep from "../order_new_steps/complete_modal";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  record?: any;
  handleApiReq?: any;
}
const OrderBrowsingModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  record,
  handleApiReq,
}) => {
  const [isModalSuccess, setIsMdalSuccess] = useState(false);

  const handleOK = async () => {
    const body = {
      flag: "1",
    };
    const resAcp = await handleApiReq("1", body);

    console.log(resAcp.code);

    if (resAcp.error != null) {
      alert("Đơn hàng đã được duyệt hoặc kiểm tra lại tài khoản")
      setIsMdalSuccess(false);
    } else {
      showModalWithTimeout(setIsMdalSuccess, 2000);
    }
    setIsModalCancel(false);
  };

  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      <Modal
        title={"Duyệt đơn hàng"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>Bạn có chắc chắn muốn duyệt đơn hàng</div>
        <div>{record?.length === 1 ? <b>{record[0]?._id}</b> : null}</div>
      </Modal>

      <ModalCompleteStep
        modal1Open={isModalSuccess}
        setModal1Open={setIsMdalSuccess}
        title={"Duyệt đơn hàng thành công!"}
        link={"/order/list"}
      />
    </>
  );
};

export default OrderBrowsingModal;
