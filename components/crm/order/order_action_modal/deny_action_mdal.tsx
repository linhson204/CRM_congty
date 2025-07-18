import React, { useRef, useState } from "react";
import { Button, Modal } from "antd";
import Image from "next/image";
import styles from "../order.module.css";
import { useRouter } from "next/router";
import { showModalWithTimeout } from "@/components/crm/ultis/helper";
import ModalCompleteStep from "../order_steps/complete_modal";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  record?: any;
  handleApiReq?: (type: string, data: {}) => Promise<void>;
}
const DenyActionModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  record,
  handleApiReq,
}) => {
  const [isModalSuccess, setIsMdalSuccess] = useState(false);
  const textRef = useRef(null);

  const handleOK = async () => {
    const body = {
      reason: textRef?.current?.value,
    };
    if (body?.reason) {
      await handleApiReq("deny", body);
      showModalWithTimeout(setIsMdalSuccess, 2000);
    } else {
      alert("Vui lòng điền lý do từ chối");
    }

    setIsModalCancel(false);
  };

  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      <Modal
        title={"Từ chối duyệt đơn hàng"}
        centered
        width={530}
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className={styles.row_mdal}>
          <div className={`${styles.md_txtarea}`}>
            Lý do*
            <textarea
              ref={textRef}
              name="address_contact"
              id="address_contact"
              className={`${styles.md_txtarea} ${styles.textarea}`}
              placeholder="Nhập lý do"
              defaultValue={""}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </Modal>

      <ModalCompleteStep
        modal1Open={isModalSuccess}
        setModal1Open={setIsMdalSuccess}
        title={"Từ chối duyệt đơn hàng thành công!"}
        link={"/order/list"}
      />
    </>
  );
};

export default DenyActionModal;
