import { useContext, useState } from "react";
import CancelModal from "../quote_steps/cancel_modal";
import styles from "./add_file_order.module.css";
import ModalCompleteStep from "../quote_steps/complete_modal";
import { QuoteContext } from "../quoteContext";
import { axiosCRMCall } from "@/utils/api/api_crm_call";
import ModalError from "../quote_steps/error_mdal";
import { message } from "antd";

export default function QuoteFooterAddFiles({
  link = "/quote/list",
  title,
  contentCancel,
  titleCancel,
}: any) {
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const [errorModalOpen, setErrorModelOpen] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState('')
  const { newQuote, validateQuote, setShouldFetchData, stringifyObject,
    isCreate } = useContext(QuoteContext)

  const messageKey = 'loading'
  const [messageApi, contextHolder] = message.useMessage();

  const handleSave = () => {
    // console.log(stringifyObject(newQuote))
    const invalidMsg = validateQuote();
    if (invalidMsg.length === 0) {
      messageApi.open({
        key: messageKey,
        type: 'loading',
        content: 'Vui lòng chờ...',
        duration: 20
      })
      if (isCreate) { // Thêm mới
        const sendData = (({ id: _, ...rest }) => rest)(newQuote)
        axiosCRMCall
          .post('/quote/create', stringifyObject(sendData))
          .then((res) => {
            setShouldFetchData(true)
            setModal1Open(true)
            messageApi.destroy(messageKey)
          })
          .catch((err) => {
            console.log(err)
            messageApi.open({
              key: messageKey,
              type: 'error',
              content: 'Có lỗi xảy ra!'
            })
          })
      } else { // Chỉnh sửa
        axiosCRMCall
          .post('/quote/update', stringifyObject(newQuote))
          .then((res) => {
            setShouldFetchData(true)
            setModal1Open(true)
            messageApi.destroy(messageKey)
          })
          .catch((err) => {
            console.log(err)
            messageApi.open({
              key: messageKey,
              type: 'error',
              content: 'Có lỗi xảy ra!'
            })
          })
      }
    } else {
      setInvalidMessage(invalidMsg.join('\n'))
      setErrorModelOpen(true)
    }
  }

  return (
    <>
      {contextHolder}
      <div className={styles.main__footer}>
        <button type="button" onClick={() => setIsModalCancel(true)}>
          Hủy
        </button>
        <button
          className={styles.save}
          type="submit"
          onClick={handleSave}
        >
          Lưu
        </button>

        {
          <CancelModal
            isModalCancel={isModalCancel}
            setIsModalCancel={setIsModalCancel}
            content={contentCancel}
            title={titleCancel}
          />
        }
        {
          <ModalError
            modal1Open={errorModalOpen}
            setModal1Open={setErrorModelOpen}
            title={invalidMessage}
          />
        }

        <ModalCompleteStep
          modal1Open={modal1Open}
          setModal1Open={setModal1Open}
          title={title}
          link={link}
        />
      </div>
    </>
  );
}
