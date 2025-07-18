import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal, message } from "antd";
import styles from "@/components/crm/quote/quote.module.css";
import { useRouter } from "next/router";
import OrderSelectBoxStep from "../quote_steps/select_box_step";
import ModalCompleteStep from "../quote_steps/complete_modal";
import DepSelectBoxStep from "../quote_steps/select_box_step_dep";
import EmpSelectBoxStep from "../quote_steps/select_box_step_emp";
import RoleSelectBoxStep from "../quote_steps/select_box_step_role";
import { axiosCRMCall } from "@/utils/api/api_crm_call";
import { QuoteContext } from "../quoteContext";
import { axiosQLC } from "@/utils/api/api_qlc";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  record: any;
}

const ShareActionModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  record,
}) => {
  const { recordId, getPropOrDefault, recordName } = useContext(QuoteContext)
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [label, setLabel] = useState("");
  const [elements, setElements] = useState<JSX.Element[]>([]);
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);

  const [depId, setDepId] = useState(0)
  const [empId, setEmpId] = useState(0)
  const [role, setRole] = useState(0)

  const messageKey = 'loading'
  const [messageApi, contextHolder] = message.useMessage();

  const handleOK = async () => {
    const success = await handleSave()
    if (success) {
      resetValue()
      setIsModalCancel(false);
      setIsOpenMdalSuccess(true);
      setTimeout(() => {
        setIsOpenMdalSuccess(false);
      }, 2000);
    }
  };

  const handleCancel = () => {
    resetValue()
    setIsModalCancel(false)
  }

  const resetValue = () => {
    setElements([])
    setDepId(0)
    setEmpId(0)
    setRole(0)
    setLabel('')
  }

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

  const handleAddElement = (condition: string) => {
    resetValue()
    const newElement = (
      <div className={styles.content_obj} key={label}>
        <div className={styles.choose_obj}>
          <label className={`${styles.form_label} required`}>{condition}</label>
          {/* <OrderSelectBoxStep
            value="Tất cả phòng ban"
            placeholder="Chọn phòng ban"
          /> */}
          {condition === "Phòng ban được chia sẻ" &&
            <DepSelectBoxStep
              setValue={setDepId}
            />
          }
          {condition === "Nhân viên được chia sẻ" &&
            <EmpSelectBoxStep
              setValue={setEmpId}
            />
          }
        </div>
        <div className={styles.choose_obj}>
          <label className={`${styles.form_label} required`}>
            Quyền sử dụng
          </label>
          {/* <OrderSelectBoxStep value="Tất cả phòng ban" placeholder="Chọn" /> */}
          <RoleSelectBoxStep
            setValue={setRole}
          />
        </div>
      </div>
    );
    // if (label === condition) {
    //   setElements((prevElements) => [...prevElements, newElement]);
    // } else {
    //   setElements([newElement]);
    // }
    setElements([newElement])
  };

  const handleSave = async () => {
    let result = false
    try {
      if (label === "Phòng ban được chia sẻ") {
        startLoading()

        let com_id = 0
        await axiosCRMCall
          .post('/quote/getDetail', { id: Number(recordId) || 0 })
          .then((res) => {
            // console.log(getPropOrDefault(res, 'data.data.data.com_id', ''))
            com_id = getPropOrDefault(res, 'data.data.data.com_id', '')
          })
          .catch((err) => { console.log(err); stopLoading(); })

        // Lấy danh sách nhân viên và gửi
        await axiosQLC
          .post('/organizeDetail/listAll', { com_id: com_id, id: depId })
          .then(async (res) => {
            // console.log(getPropOrDefault(res, 'data.data.listUsers', []))
            const listUser = getPropOrDefault(res, 'data.data.listUsers', [])
            const listUserId = listUser.map(user => {
              return { user_id: getPropOrDefault(user, 'ep_id', 0) }
            }).filter(user => user.user_id !== 0)
            // console.log(listUserId)
            await axiosCRMCall
              .post('/quote/shareMany', { quote_id: record, list_user: JSON.stringify(listUserId), role: role })
              .then(res => {
                // console.log(res)
                stopLoading()
                result = true
              })
              .catch(e => { console.log(e); errorMessage(); })
            // stopLoading();
          })
          .catch((err) => { console.log(err); stopLoading(); })
      }


      if (label === "Nhân viên được chia sẻ") {
        // console.log(record, empId, role)
        startLoading()
        await axiosCRMCall
          .post('/quote/share', { quote_id: record, user_id: empId, role: role })
          .then(res => {
            // console.log(res)
            stopLoading()
            result = true
          })
          .catch(e => { console.log(e); errorMessage(); })
      }
    } catch (error) {
      console.log(error)
    }

    return result
  }

  return (
    <>
      {contextHolder}
      <Modal
        title={"Chia sẻ báo giá"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => handleCancel()}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
        okButtonProps={{
          disabled: !((depId !== 0 || empId !== 0) && role !== 0)
        }}
      >
        <div className={styles.row_mdal}>
          <div className={styles.btn_share}>
            <button
              onClick={() => {
                setIsOpenSelect(true);
                handleAddElement("Phòng ban được chia sẻ");
                setLabel("Phòng ban được chia sẻ");
              }}
              className={`${styles.department} ${styles.btn_obj}`}
            // className={`${styles.department}`}
            >
              Phòng ban
            </button>
            <button
              onClick={() => {
                setIsOpenSelect(true);
                handleAddElement("Nhân viên được chia sẻ");
                setLabel("Nhân viên được chia sẻ");
              }}
              className={`${styles.employ} ${styles.btn_obj}`}
            // className={`${styles.employ}`}
            >
              Nhân viên
            </button>
          </div>
          <div>{isOpenSelect && elements}</div>
          <div className={`${styles.mb_3} ${styles["col-lg-12"]}`}>
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
        title={`Chia sẻ báo giá ${recordName} thành công!`}
        // link={"/quote/list"}
        link="#"
      />
    </>
  );
};

export default ShareActionModal;
