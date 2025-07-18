import React, { useContext, useState } from "react";
import { Button, Modal } from "antd";
import Image from "next/image";
import styles from "@/components/crm/quote/quote.module.css";
import { useRouter } from "next/router";
import { showModalWithTimeout } from "@/components/crm/ultis/helper";
import ModalCompleteStep from "../quote_steps/complete_modal";
import { axiosCRM } from "@/utils/api/api_crm";
import { useFormData } from "../../context/formDataContext";
import { notifyError } from "@/utils/function";
import { ToastContainer } from "react-toastify";
import { axiosCRMCall } from "@/utils/api/api_crm_call";

interface MyComponentProps {
  isModalCancel: boolean;
  record: any;
  onClose: any;
}
const DelTLDK: React.FC<MyComponentProps> = ({
  isModalCancel,
  onClose,
  record,
}) => {
  const [isModalSuccess, setIsMdalSuccess] = useState(false);
  const { handleRecall } = useContext(useFormData);
  const handleDeleteFile = () => {
    axiosCRMCall
      .post("/quote/delete-attachment", { id: record.id })
      .then((res) => {
        setIsMdalSuccess(true), onClose(), handleRecall();
      })
      .catch(() => notifyError());
  };
  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      <Modal
        title={"Xóa tài liệu đính kèm"}
        centered
        open={isModalCancel}
        onCancel={() => onClose()}
        className={"mdal_cancel"}
        onOk={handleDeleteFile}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>
          Bạn có chắc chắn muốn xóa tài liệu đính kèm:{" "}
          {/* <p>{`${record.linkFile?.split("file-")[1]}`}</p> */}
          <p>{`${record.file_name}`}</p>
        </div>
      </Modal>

      <ModalCompleteStep
        modal1Open={isModalSuccess}
        setModal1Open={setIsMdalSuccess}
        title={`Xóa tài liệu đính kèm ${
          record.linkFile?.split("file-")[1]
        } thành công!`}
        link={"#"}
      />
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default DelTLDK;
