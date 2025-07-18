import React, { useState } from "react";
import { Button, Modal } from "antd";
import Image from "next/image";
import styles from "@/components/crm/quote/quote.module.css";
import { useRouter } from "next/router";
import { showModalWithTimeout } from "@/components/crm/ultis/helper";
import ModalCompleteStep from "../quote_steps/complete_modal";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
}
const DelActionModal: React.FC<MyComponentProps> = ({
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
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}

      <Modal
        title={"Hủy bỏ đơn hàng"}
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
              name="address_contact"
              id="address_contact"
              className={`${styles.md_txtarea} ${styles.textarea}`}
              placeholder="Nhập lý do"
              defaultValue={""}
              style={{ width: "550px" }}
            />
          </div>
        </div>
      </Modal>

      <ModalCompleteStep
        modal1Open={isModalSuccess}
        setModal1Open={setIsMdalSuccess}
        title={"Hủy bỏ đơn hàng ĐH-0000 thành công!"}
        link={"/order/list"}
      />
    </>
  );
};

export default DelActionModal;
