import React, { useContext, useRef, useState } from "react";
import { Modal, message } from "antd";
import styles from "@/components/crm/quote/quote.module.css";
import PotentialSelectBoxStep from "../quote_steps/select_box_step";
import ModalCompleteStep from "../quote_steps/complete_modal";
import EmpSelectBoxStep from "../quote_steps/select_box_step_emp";
import { axiosCRMCall } from "@/utils/api/api_crm_call";
import { QuoteContext } from "../quoteContext";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  record: any;
}

const HandeOverModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  record,
}) => {
  const { recordName } = useContext(QuoteContext)
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);

  const [empId, setEmpId] = useState(0)

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
    const success = await handleSave()
    if (success) {
      setEmpId(0)
      setIsModalCancel(false);
      setIsOpenMdalSuccess(true);
      setTimeout(() => {
        setIsOpenMdalSuccess(false);
      }, 2000);
    }
  };

  const handleCancel = () => {
    setEmpId(0)
    setIsModalCancel(false);
  }

  const handleSave = async () => {
    let result = false
    try {
      startLoading()

      await axiosCRMCall
        .post('/quote/handOver', { quote_id: record, user_id: empId })
        .then(res => {
          // console.log(res)
          stopLoading()
          result = true
        })
        .catch((err) => { console.log(err); stopLoading(); })
    } catch (error) {
      console.log(error)
      errorMessage();
    }

    return result
  }

  return (
    <>
      {contextHolder}
      <Modal
        title={"Bàn giao công việc"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => handleCancel()}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
        okButtonProps={{
          disabled: empId === 0
        }}
      >
        <div className={styles.row_mdal}>
          <div className={styles.choose_obj}>
            <label className={`${styles.form_label} required`}>
              {"Người nhận công việc"}
            </label>
            {/* <PotentialSelectBoxStep
              value="Người nhận công việc"
              placeholder="Người nhận công việc"
            /> */}
            <EmpSelectBoxStep
              setValue={setEmpId}
            />
          </div>
          <div
            style={{ marginTop: "10px" }}
            className={`${styles.mb_3} ${styles["col-lg-12"]}`}
          >
            {/* <input type="checkbox" id="" name="share_all" defaultValue={1} />
            <div>
              Với danh sách liên quan (đơn hàng, báo giá, lịch hẹn, ...).
            </div> */}
          </div>
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={`Bàn giao báo giá ${recordName} thành công!`}
        link={"#"}
      />
    </>
  );
};

export default HandeOverModal;
