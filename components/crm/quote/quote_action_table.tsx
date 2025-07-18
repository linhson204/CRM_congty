import type { MenuProps } from "antd";
import { Dropdown, Image, message } from "antd";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { dataActionQuote } from "../ultis/consntant";
import { QuoteContext } from "./quoteContext";
import CancelActionModal from "./quote_action_modal/cancel_action_mdal";
import DelActionModal from "./quote_action_modal/delete_action_mdal";
import DenyActionModal from "./quote_action_modal/deny_action_mdal";
import HandOverActionModal from "./quote_action_modal/handover_action_mdal";
import QuoteBrowsingModal from "./quote_action_modal/quote_browsing_action_mdal";
import SendMailModal from "./quote_action_modal/send_mail_mdal";
import ShareActionModal from "./quote_action_modal/share_action_mdal";
import StatusModal from "./quote_action_modal/status-mdal";
import ModalRole from "./quote_role/quote_role_modal";

export default function QuoteActionTable(props: any) {
  const { recordId, setRecordId, setShouldFetchDetailData, getPdfLink,
    checkRoleFull, checkRoleEdit, checkRoleView } = useContext(QuoteContext)
  const { record, allkey } = props;
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isOrderBrowsingOpen, setIsOrderBrowsingOpen] = useState(false);
  const [isDenyOpen, setIsDenyOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [isOpenHandOver, setIsOpenHandOver] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenSend, setIsOpenSend] = useState(false);
  const [isOpenPdf, setIsOpenPdf] = useState(false);
  const [isDownloadPdf, setIsDownloadPdf] = useState(false)
  const [roleOpen, setRoleOpen] = useState(false)

  const [messageApi, contextHolder] = message.useMessage();
  const messageKey = 'loading'

  const [linkPdf, setLinkPdf] = useState('')

  const handleClickAction = async (e: any, type: string | undefined) => {
    if (type === "delete") {
      const isAllowed = await checkRoleFull(recordId)
      if (isAllowed) {
        setIsDelOpen(true);
      } else {
        setRoleOpen(true)
      }
    }
    if (type === "order_browsing") {
      setIsOrderBrowsingOpen(true);
    }
    if (type === "deny") {
      setIsDenyOpen(true);
    }
    if (type === "cancel") {
      setIsCancelOpen(true);
    }
    if (type === "share") {
      const isAllowed = await checkRoleFull(recordId)
      if (isAllowed) {
        setIsOpenShare(true);
      } else {
        setRoleOpen(true)
      }
    }
    if (type === "hand_over") {
      const isAllowed = await checkRoleFull(recordId)
      if (isAllowed) {
        setIsOpenHandOver(true);        
      } else {
        setRoleOpen(true)
      }
    }
    if (type === "update-status") {
      const isAllowed = await checkRoleEdit(recordId)
      if (isAllowed) {
        setIsOpenUpdate(true);
      } else {
        setRoleOpen(true)
      }
    }
    if (type === "send") {
      const isAllowed = await checkRoleView(recordId)
      if (isAllowed) {
        setIsOpenSend(true);
      } else {
        setRoleOpen(true)
      }
    }
    if (type === "printer") {
      // setShouldFetchDetailData(true)
      // setIsDownloadPdf(false)
      // setIsOpenPdf(true)
      const isAllowed = await checkRoleView(recordId)
      if (isAllowed) {
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
      } else {
        setRoleOpen(true)
      }
    }
    if (type === "download") {
      // setShouldFetchDetailData(true)
      // setIsDownloadPdf(true)
      // setIsOpenPdf(true)
      const isAllowed = await checkRoleView(recordId)
      if (isAllowed) {
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
              // saveAs(link)
              window.open(link, '_blank')
            })
        } else {
          messageApi.open({
            key: messageKey,
            type: 'error',
            content: 'Có lỗi xảy ra!'
          })
        }
      } else {
        setRoleOpen(true)
      }
    }
  };

  useEffect(() => {
    getPdfLink(record).then(link => setLinkPdf(link))
  }, [])

  const items: MenuProps["items"] = [];
  for (let i = 0; i < dataActionQuote.length; i++) {
    // if (['download'].includes(dataActionQuote[i].type)) {
    //   items.push({
    //     key: i,
    //     label: (
    //       <>
    //       <Link
    //           href={linkPdf}
    //           className="flex-start-btn"
    //           download
    //           target="_blank"
    //         >
    //           <i className={dataActionQuote[i].img}></i>
    //           {dataActionQuote[i].name}
    //         </Link>
    //       </>
    //     )
    //   })
    // } else
    items.push({
      key: i,
      label: (
        <>
          {dataActionQuote[i].link !== "#" ? (
            <Link
              href={`${dataActionQuote[i].link}/${record}`}
              className="flex-start-btn"
            >
              <i className={dataActionQuote[i].img}></i>
              {dataActionQuote[i].name}
            </Link>
          ) : (
            <button
              className="flex-start-btn"
              onClick={(e) => handleClickAction(e, dataActionQuote[i].type)}
            >
              <i className={dataActionQuote[i].img}></i>
              {dataActionQuote[i].name}
            </button>
          )}
        </>
      ),
    });
  }

  return (
    <>
      {contextHolder}
      <div>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <button style={{ justifyContent: "center" }}>
            <Image src="/crm/3_cham.png" width={15} height={15} preview={false} />
            Thao tác
          </button>
        </Dropdown>
      </div>
      <QuoteBrowsingModal
        isModalCancel={isOrderBrowsingOpen}
        setIsModalCancel={setIsOrderBrowsingOpen}
      />
      <DenyActionModal
        isModalCancel={isDenyOpen}
        setIsModalCancel={setIsDenyOpen}
      />
      <DelActionModal
        record={record}
        allkey={[]}
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
      />
      <CancelActionModal
        isModalCancel={isCancelOpen}
        setIsModalCancel={setIsCancelOpen}
      />
      <ShareActionModal
        record={record}
        isModalCancel={isOpenShare}
        setIsModalCancel={setIsOpenShare}
      />
      {/* <SharingQuoteModal
        record={record}
        isModalOpen={isOpenShare}
        setIsModalOpen={setIsOpenShare}
      /> */}
      <HandOverActionModal
        record={record}
        isModalCancel={isOpenHandOver}
        setIsModalCancel={setIsOpenHandOver}
      />
      <StatusModal
        record={record}
        allkey={[]}
        isModalCancel={isOpenUpdate}
        setIsModalCancel={setIsOpenUpdate}
      />
      <SendMailModal
        record={record}
        allkey={allkey}
        isModalCancel={isOpenSend}
        setIsModalCancel={setIsOpenSend}
      />
      <ModalRole
        modal1Open={roleOpen}
        setModal1Open={setRoleOpen}
        title="Bạn không có quyền để thực hiện thao tác này"
        link=""
      />
      {/* TODO Test hiệu năng sau build: Hơi chậm */}
      {/* <PdfGenerator2
        isVisible={isOpenPdf}
        closePdfModal={setIsOpenPdf}
        isDownload={isDownloadPdf}
      /> */}
    </>
  );
}
