// import OrderSelectBoxStep from "../order_steps/select_box_step";
import styles from "./quote_detail.module.css";
import { useContext, useState } from "react";
import { Switch, message } from "antd";
import Link from "next/link";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import OrderBrowsingModal from "@/components/crm/quote/quote_action_modal/quote_browsing_action_mdal";
import DenyActionModal from "@/components/crm/quote/quote_action_modal/deny_action_mdal";
import DelActionModal from "@/components/crm/quote/quote_action_modal/delete_action_mdal";
import CancelActionModal from "@/components/crm/quote/quote_action_modal/cancel_action_mdal";
import ShareActionModal from "@/components/crm/quote/quote_action_modal/share_action_mdal";
import HandOverActionModal from "@/components/crm/quote/quote_action_modal/handover_action_mdal";
import { dataActionForm } from "@/components/crm/ultis/consntant";
// import InputText from "./input_text";
import { Input, Tooltip } from "antd";
import StatusModal from "../quote_action_modal/status-mdal";
import { useRouter } from "next/router";
import SendMailModal from "../quote_action_modal/send_mail_mdal";
// import { handlePrintPDF } from "../quote_report_form/pdf_helper";
// import SimpleQuoteReport from "../quote_report_form/simple_quote_report_form"
import PdfGenerator2 from "../quote_report_form/pdfGenerator2";
import { QuoteContext } from "../quoteContext";

export default function ButtonControlForm({ isSelectedRow }: any) {
  const [isOpenOrderBrowsing, setIsOpenOrderBrowsing] = useState(false);
  const [isOpenDeny, setIsOpenDeny] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [isOpenHandOver, setIsOpenHandOver] = useState(false);
  const [record, setRecode] = useState();
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenSend, setIsOpenSend] = useState(false);
  const [allkey, setAllkey] = useState();
  const [isOpenPdf, setIsOpenPdf] = useState(false)
  const [isDownload, setIsDownload] = useState(false)
  const { getPdfLink, recordId } = useContext(QuoteContext)

  const [messageApi, contextHolder] = message.useMessage();
  const messageKey = 'loading'

  const handleClickAction = async (e: any, type: string | undefined) => {
    if (type === "order_browsing") {
      setIsOpenOrderBrowsing(true);
    }
    if (type === "deny") {
      setIsOpenDeny(true);
    }
    if (type === "update-status") {
      setIsOpenUpdate(true);
    }
    if (type === "send") {
      setIsOpenSend(true);
    }
    if (type === "delete") {
      setIsDelOpen(true);
    }
    if (type === "cancel") {
      setIsOpenCancel(true);
    }
    if (type === "share") {
      setIsOpenShare(true);
    }
    if (type === "hand_over") {
      setIsOpenHandOver(true);
    }
    if (type === "printer") {
      // setIsDownload(false)
      // setIsOpenPdf(true)
      messageApi.open({
        key: messageKey,
        type: 'loading',
        content: 'Vui lòng chờ...',
        duration: 20
      })

      const link = await getPdfLink(recordId)
      // messageApi.destroy(messageKey)

      if (link !== '') {
        messageApi.open({
          key: messageKey,
          type: 'success',
          content: 'Xong!'
        })
          .then(() => {
            window.open(link, '_blank')
          })
      } else {
        messageApi.open({
          key: messageKey,
          type: 'error',
          content: 'Có lỗi xảy ra!'
        })
      }
    }
    if (type === "download") {
      // setIsDownload(true)
      // setIsOpenPdf(true)
      messageApi.open({
        key: messageKey,
        type: 'loading',
        content: 'Vui lòng chờ...',
        duration: 20
      })

      const link = await getPdfLink(recordId)
      // messageApi.destroy(messageKey)

      if (link !== '') {
        messageApi.open({
          key: messageKey,
          type: 'success',
          content: 'Xong!'
        })
          .then(() => {
            window.open(link, '_blank')
          })
      } else {
        messageApi.open({
          key: messageKey,
          type: 'error',
          content: 'Có lỗi xảy ra!'
        })
      }
    }
  };
  const router = useRouter();
  const path = router.query;
  const items: MenuProps["items"] = [];
  for (let i = 0; i < dataActionForm.length; i++) {
    items.push({
      key: i,
      label: (
        <>
          {dataActionForm[i].link !== "#" ? (
            <Link href={dataActionForm[i].link} className="flex-start-btn">
              <i className={dataActionForm[i].img}></i>
              {dataActionForm[i].name}
            </Link>
          ) : (
            <button
              className="flex-start-btn"
              onClick={(e) => handleClickAction(e, dataActionForm[i].type)}
            >
              <i className={dataActionForm[i].img}></i>
              {dataActionForm[i].name}
            </button>
          )}
        </>
      ),
    });
  }

  const onChange = (checked: boolean) => { };
  return (
    <div>
      {contextHolder}
      <div className={`${styles.main}`}>
        <div className={styles.row_input}>
          <div className={`${styles.main__control_btn} ${styles.flex_end} `}>
            <Link href={`/quote/edit/${path.id}`}>
              <button
                type="button"
                className={`${styles.btn_edit} flex_align_center`}
              >
                <i className="bi bi-pencil-square"></i>
                Chỉnh sửa
              </button>
            </Link>
            <Dropdown menu={{ items }} placement="bottomLeft">
              <button className={`${styles.btn_execute} flex_align_center`}>
                <img src="/crm/3_cham.png" />
                Thao tác
              </button>
            </Dropdown>
          </div>
        </div>
      </div>

      <OrderBrowsingModal
        isModalCancel={isOpenOrderBrowsing}
        setIsModalCancel={setIsOpenOrderBrowsing}
      />

      <DenyActionModal
        isModalCancel={isOpenDeny}
        setIsModalCancel={setIsOpenDeny}
      />

      <DelActionModal
        record={path.id}
        allkey={[]}
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
      />

      <CancelActionModal
        isModalCancel={isOpenCancel}
        setIsModalCancel={setIsOpenCancel}
      />

      <ShareActionModal
        record={path.id}
        isModalCancel={isOpenShare}
        setIsModalCancel={setIsOpenShare}
      />
      <StatusModal
        record={path.id}
        allkey={[]}
        isModalCancel={isOpenUpdate}
        setIsModalCancel={setIsOpenUpdate}
      />
      <SendMailModal
        record={path.id}
        allkey={allkey}
        isModalCancel={isOpenSend}
        setIsModalCancel={setIsOpenSend}
      />
      <HandOverActionModal
        record={record}
        isModalCancel={isOpenHandOver}
        setIsModalCancel={setIsOpenHandOver}
      />

      {/* <PdfGenerator2 
        isVisible={isOpenPdf}
        closePdfModal={() => setIsOpenPdf(false)}
        isDownload={isDownload}
      /> */}
    </div>
  );
}
