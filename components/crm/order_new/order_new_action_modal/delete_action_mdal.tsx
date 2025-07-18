import React, { useState } from "react";
import { Button, Modal } from "antd";
import Image from "next/image";
import styles from "../ordern.module.css";
import { useRouter } from "next/router";
import { showModalWithTimeout } from "@/components/crm/ultis/helper";
import DelModalCampaignOrder from "../order_new_steps/del_modal_campaign_order";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  record?: any;
  handleApiReq?: (type: string) => Promise<void>;
}
const DelActionModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  record,
  handleApiReq,
}) => {
  const [isModalSuccess, setIsMdalSuccess] = useState(false);

  const handleOK = () => {
    setIsModalCancel(false);
    showModalWithTimeout(setIsMdalSuccess, 2000);
  };

  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      <Modal
        title={"Xóa đơn hàng"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>Bạn có chắc chắn muốn xóa đơn hàng ?</div>
        {/* <div>
          <b>{record?._id}?</b>
        </div> */}
      </Modal>

      <DelModalCampaignOrder
        handleApiReq={handleApiReq}
        modal1Open={isModalSuccess}
        setModal1Open={setIsMdalSuccess}
        title={"Xóa đơn hàng thành công!"}
      // link={"/order/list"}
      />
    </>
  );
};

export default DelActionModal;
