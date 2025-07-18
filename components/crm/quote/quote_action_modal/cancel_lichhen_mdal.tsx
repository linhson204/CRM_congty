import React, { useState } from "react";
import { Button, Modal } from "antd";
import Image from "next/image";
import styles from "@/components/crm/quote/quote.module.css";
import { useRouter } from "next/router";
import { showModalWithTimeout } from "@/components/crm/ultis/helper";
import ModalCompleteStep from "../quote_steps/complete_modal";

interface MyComponentProps {
  isModalCancel?: boolean;
  cancelContent?: string;
  setIsModalCancel?: (value: boolean) => void;
  handleCancel?: any;
  record?: any;
  setCancelContent?: any;
  name?: string;
}
const CanCel_LichHen_Mdal: React.FC<MyComponentProps> = ({
  handleCancel,
  isModalCancel,
  cancelContent,
  setIsModalCancel,
  setCancelContent,
  record,
  name = "address_contact",
}) => {
  const [isModalSuccess, setIsMdalSuccess] = useState(false);

  const handleOK = () => {
    /* handleCancel thực hiện mới thực hiện tiếp */
    // handleCancel() &&
    setIsModalCancel(false), showModalWithTimeout(setIsMdalSuccess, 2000);
  };

  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}

      <Modal
        title={"Hủy lịch hẹn"}
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
              // onChange={(e) => setCancelContent({ [name]: e.target.value })}
              // name={name}
              // value={cancelContent}
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
        title={`Hủy bỏ lịch hẹn thành công!`}
        link={"#"}
      />
    </>
  );
};

export default CanCel_LichHen_Mdal;
