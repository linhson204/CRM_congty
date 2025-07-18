import React, { useContext, useState } from "react";
import { Button, Modal, message } from "antd";
import Image from "next/image";
import styles from "@/components/crm/quote/quote.module.css";
import { useRouter } from "next/router";
import { showModalWithTimeout } from "@/components/crm/ultis/helper";
import ModalCompleteStep from "../quote_steps/complete_modal";
import { QuoteContext } from "../quoteContext";
import { axiosCRMCall } from "@/utils/api/api_crm_call";

interface MyComponentProps {
  isModalCancel: boolean;
  record: any;
  onClose: any;
}
const DelDSCS: React.FC<MyComponentProps> = ({
  isModalCancel,
  onClose,
  record,
}) => {
  const [isModalSuccess, setIsMdalSuccess] = useState(false);

  const messageKey = 'loading'
  const [messageApi, contextHolder] = message.useMessage();
  const { recordId, getPropOrDefault } = useContext(QuoteContext)

  const startLoading = () => {
    messageApi.open({
      key: messageKey,
      type: 'loading',
      content: 'Vui lòng chờ...',
      duration: 20
    })
  }

  const stopLoading = () => {
    messageApi.destroy(messageKey)
  }

  const errorMessage = () => {
    messageApi.open({
      key: messageKey,
      type: 'error',
      content: 'Có lỗi xảy ra!'
    })
  }

  const handleOk = async () => {
    const success = await handleDel()
    if (success) {
      setIsMdalSuccess(true)
      onClose()
    }
  }

  const handleDel = async () => {
    let result = false
    startLoading()
    try {
      await axiosCRMCall
        .post('/quote/share', { quote_id: recordId, user_id: record, role: '0' })
        .then(res => {
          // console.log(res)
          stopLoading()
          result = true
        })
        .catch(e => { console.log(e); errorMessage(); })
    } catch (error) {
      console.log(error)
      errorMessage()
    }
    return result
  }

  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      {contextHolder}
      <Modal
        title={"Xác nhận gỡ bỏ chia sẻ"}
        centered
        open={isModalCancel}
        onCancel={() => onClose()}
        className={"mdal_cancel"}
        onOk={handleOk}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div>Bạn có chắc chắn muốn gỡ bỏ chia sẻ ?</div>
      </Modal>

      <ModalCompleteStep
        modal1Open={isModalSuccess}
        setModal1Open={setIsMdalSuccess}
        title={`Gỡ bỏ chia sẻ thành công!`}
        link={"#"}
      />
    </>
  );
};

export default DelDSCS;
