import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import styles from "@/components/crm/quote/quote.module.css";
import PotentialSelectBoxStep from "../quote_steps/select_box_step";
import ModalCompleteStep from "../quote_steps/complete_modal";
import { QuoteContext } from "../quoteContext";
import { axiosCRMCall } from "@/utils/api/api_crm_call";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  record: any;
  allkey: any;
}

const StatusModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  record,
  allkey,
}) => {
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const { allAvailableStatusString, statusStrToNum, recordId, listRecordId, setShouldFetchData, recordName, listRecordName,
    setShouldFetchDetailData, checkRoleEdit, detailData, getPropOrDefault, getRoleMany } = useContext(QuoteContext);
  const [value, setValue] = useState('Bản thảo')
  const allStatusString = allAvailableStatusString();
  const quoteName = allkey?.length > 0 ? listRecordName.join(', ') : recordName

  const [listAllowed, setListAllowed] = useState([])
  const [allowedName, setAllowedName] = useState('')

  const updateStatus = async (id: Number, status: Number) => {
    await axiosCRMCall
      .post('/quote/updateStatus', { id: id, status: status })
      .then((res) => {
      })
      .catch((err) => console.log(err))
  }

  // Chỉ cần xử lý nhiều, xử lý đơn đã có phần trước đó xử lý
  const checkRoleCallback = useCallback(
    async () => {
      let com_id = 0
      if (allkey?.length > 0) {
        await axiosCRMCall
          .post('/quote/getDetail', { id: Number(allkey[0]) || 0 })
          .then((res) => {
            // console.log(getPropOrDefault(res, 'data.data.data.com_id', ''))
            com_id = getPropOrDefault(res, 'data.data.data.com_id', 0)
          })
          .catch((err) => console.log(err))
      }
      if (com_id > 0) {
        if (allkey?.length > 0) {
          let list = []
          let listName = []
          const list_role = await getRoleMany(allkey)
          // console.log(allkey, list_role, listRecordName)
          for (let i = 0; i < list_role.length; i++) {
            const element = list_role[i];
            const role = getPropOrDefault(element, 'role', 0)
            if (role > 1) {
              list.push(allkey[i])
              listName.push(listRecordName[i])
            }
          }
          setListAllowed(list)
          setAllowedName(listName.join(', '))
        }
      }
    },
    [allkey, recordId],
  )
  useEffect(() => {
    // console.log(allkey)
    isModalCancel && checkRoleCallback()
  }, [isModalCancel])

  // useEffect(() => {
  //   console.log(listAllowed)
  // }, [listAllowed])

  const handleOK = () => {
    const status = statusStrToNum(value);
    if (listAllowed?.length > 0) { // Nếu là sửa nhiều
      listAllowed.map((id) => {
        updateStatus(id, status)
      })
    } else { // Sửa 1
      updateStatus(recordId, status)
    }

    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    setTimeout(() => {
      setIsOpenMdalSuccess(false);
      setShouldFetchData(true)
      setShouldFetchDetailData(true);
    }, 2000);
  };

  return (
    <>
      <Modal
        title={"Cập nhật tình trạng"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel email_add_mdal"}
        okText="Đồng ý"
        cancelText="Huỷ"
        okButtonProps={{
          disabled: allkey.length > 0 && listAllowed.length === 0
        }}
      >
        <div className={styles.row_mdal}>
          <div className={styles.choose_obj}>
            <label className={`${styles.form_label} required`}>
              {"Tình trạng"}
            </label>
            <PotentialSelectBoxStep value={value} placeholder="Chọn" data={allStatusString} setValue={setValue} />
          </div>
          <div
            style={{
              visibility: listAllowed.length === allkey.length ? 'hidden' : 'visible',
              fontStyle: 'italic',
              fontWeight: '600',
              color: 'red',
              marginTop: '10px'
            }}
          >{listAllowed.length === 0 ? `Bạn không có quyền chỉnh sửa` : `Bạn chỉ có quyền chỉnh sửa ${allowedName}`}</div>
        </div>
      </Modal>
      <ModalCompleteStep
        modal1Open={isOpenMdalSuccess}
        setModal1Open={setIsOpenMdalSuccess}
        title={`Cập nhật tình trạng ${allkey.length > 0 ? allowedName : quoteName} thành công`}
        link={"/quote/list"}
      />
    </>
  );
};

export default StatusModal;
