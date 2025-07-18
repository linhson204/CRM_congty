import React, { ChangeEvent, useContext, useRef, useState } from "react";
import { Input, Modal, message } from "antd";
import styles from "@/components/crm/quote/quote.module.css";
import PotentialSelectBoxStep from "../quote_steps/select_box_step";
import ModalCompleteStep from "../quote_steps/complete_modal";
import { QuoteContext } from "../quoteContext";
import axios from "axios";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  record: any;
  allkey: any;
}

const SendMailModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  record,
  allkey,
}) => {
  const { recordName, getPdfLink } = useContext(QuoteContext)
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const [inputText, setInputText] = useState('')

  const [showWarning, setShowWarning] = useState(false)

  const messageKey = 'loading'
  const [messageApi, contextHolder] = message.useMessage();

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

  const handleOK = async () => {
    const success = await handleSend()
    if (success) {
      setIsModalCancel(false);
      setIsOpenMdalSuccess(true);
      setTimeout(() => {
        setIsOpenMdalSuccess(false);
      }, 2000);
    }
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    let text = event.target.value
    setInputText(text.replace(/\D/g, ''))
  }

  const handleSend = async () => {
    startLoading()
    let result = false
    try {
      const link = await getPdfLink(record)
      let message = `Kính gửi bạn báo giá ${recordName}\n${link}`
      const data = {
        ContactId: inputText,
        SenderID: '1192',
        MessageType: 'OfferReceive',
        Message: message,
        Link: link,
        typeSender: 'idChat'
      };
      let send = await axios.post('http://210.245.108.202:9000/api/message/SendMessage_v3', data);

      stopLoading()
      result = true
    } catch (error) {
      console.log(error)
      errorMessage()
    }
    return result
  }

  return (
    <>
      <Modal
        title={"Gửi qua chát"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
      >
        <div className={styles.row_mdal}>
          <div className={styles.choose_obj}>
            <label className={`${styles.form_label} required`}>
              {"Gửi đến"}
            </label>
            <Input
              placeholder="Nhập ID HungHa365"
              value={inputText}
              onChange={handleChange}
            />
          </div>
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={`Gửi ${recordName} thành công`}
        link={"#"}
      />
    </>
  );
};

export default SendMailModal;
