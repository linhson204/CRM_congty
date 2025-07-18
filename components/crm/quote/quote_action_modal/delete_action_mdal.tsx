import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Modal } from "antd";
import Image from "next/image";
import styles from "@/components/crm/quote/quote.module.css";
import { useRouter } from "next/router";
import { showModalWithTimeout } from "@/components/crm/ultis/helper";
import ModalCompleteStep from "../quote_steps/complete_modal";
import { QuoteContext } from "../quoteContext";
import { axiosCRMCall } from "@/utils/api/api_crm_call";

interface MyComponentProps {
  isModalCancel: boolean;
  setIsModalCancel: (value: boolean) => void;
  record: any;
  allkey: any;
}
const DelActionModal: React.FC<MyComponentProps> = ({
  isModalCancel,
  setIsModalCancel,
  record,
  allkey
}) => {
  const [isModalSuccess, setIsMdalSuccess] = useState(false);
  const { recordId, listRecordId, setShouldFetchData, listRecordName, recordName, getPropOrDefault, getRoleMany } = useContext(QuoteContext)
  const quoteName = allkey?.length > 0 ? listRecordName.join(', ') : recordName
  const router = useRouter();

  const [listAllowed, setListAllowed] = useState([])
  const [allowedName, setAllowedName] = useState('')

  const deleteQuote = async (id: Number) => {
    await axiosCRMCall
    .post('/quote/delete', {id: id})
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
            if (role === 3) {
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
  
  const handleOK = () => {
    if (listAllowed?.length > 0) {
      listAllowed.map((id) => {
        deleteQuote(id)
      })
    } else {
      deleteQuote(recordId)
    }
    setIsModalCancel(false);
    // showModalWithTimeout(setIsMdalSuccess, 2000);
    setIsMdalSuccess(true);
    setTimeout(() => {
      setIsMdalSuccess(false)
      setShouldFetchData(true)
      router.push("/quote/list")
    }, 2000);
  };

  return (
    <>
      {/* <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button> */}
      <Modal
        title={"Xóa báo giá"}
        centered
        open={isModalCancel}
        onOk={() => handleOK()}
        onCancel={() => setIsModalCancel(false)}
        className={"mdal_cancel"}
        okText="Đồng ý"
        cancelText="Huỷ"
        okButtonProps={{
          disabled: allkey.length > 0 && listAllowed.length === 0
        }}
      >
        <div>Bạn có chắc chắn muốn xóa báo giá <strong>{`${quoteName}`}</strong></div>
        <div
            style={{
              visibility: listAllowed.length === allkey.length ? 'hidden' : 'visible',
              fontStyle: 'italic',
              fontWeight: '600',
              color: 'red',
              marginTop: '10px'
            }}
          >{listAllowed.length === 0 ? `Bạn không có quyền xóa` : `Bạn chỉ có quyền xóa ${allowedName}`}</div>
      </Modal>

      <ModalCompleteStep
        modal1Open={isModalSuccess}
        setModal1Open={setIsMdalSuccess}
        title={`Xóa báo giá ${allkey.length > 0 ? allowedName : quoteName} thành công!`}
        link={"/quote/list"}
      />
    </>
  );
};

export default DelActionModal;
