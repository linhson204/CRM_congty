import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import Link from "next/link";
import { dataActionLichHenQuote } from "@/components/crm/ultis/consntant";
import { useState } from "react";
import QuoteBrowsingModal from "@/components/crm/quote/quote_action_modal/quote_browsing_action_mdal";
import DenyActionModal from "@/components/crm/quote/quote_action_modal/deny_action_mdal";
import ShareActionModal from "@/components/crm/quote/quote_action_modal/share_action_mdal";
import HandOverActionModal from "@/components/crm/quote/quote_action_modal/handover_action_mdal";
import SendMailModal from "@/components/crm/quote/quote_action_modal/send_mail_mdal";
import CallModal from "@/components/crm/quote/quote_action_modal/complete-mdal";
import CanCel_LichHen_Mdal from "@/components/crm/quote/quote_action_modal/cancel_lichhen_mdal";
import DelLichHenModal from "@/components/crm/quote/quote_action_modal/delete_lich_hen-mdal";
import ModalSuaLichhen from "@/components/crm/cskh/modal/modalsualichhen";
import Image from "next/image";

export default function QuoteActionLichHenTable(props: any) {
  const { record, allkey } = props;
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isOrderBrowsingOpen, setIsOrderBrowsingOpen] = useState(false);
  const [isDenyOpen, setIsDenyOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [isOpenHandOver, setIsOpenHandOver] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenSend, setIsOpenSend] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);

  const onClose = () => {
    setIsShowModalAdd(false);
    setIsShowModal(false);
  };
  const handleAddDB = () => {
    setIsShowModalAdd(false);
  };
  const handleClickAction = (e: any, type: string | undefined) => {
    if (type === "delete") {
      setIsDelOpen(true);
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
      setIsOpenShare(true);
    }
    if (type === "edit") {
      setIsShowModalAdd(true);
    }
    if (type === "complete") {
      setIsOpenUpdate(true);
    }
    if (type === "send") {
      setIsOpenSend(true);
    }
  };
  const items: MenuProps["items"] = [];
  for (let i = 0; i < dataActionLichHenQuote.length; i++) {
    items.push({
      key: i,
      label: (
        <>
          {dataActionLichHenQuote[i].link !== "#" ? (
            <Link
              href={`${dataActionLichHenQuote[i].link}/${record}`}
              className="flex-start-btn"
            >
              <i className={dataActionLichHenQuote[i].img}></i>
              {dataActionLichHenQuote[i].name}
            </Link>
          ) : (
            <button
              className="flex-start-btn"
              onClick={(e) =>
                handleClickAction(e, dataActionLichHenQuote[i].type)
              }
            >
              <i className={dataActionLichHenQuote[i].img}></i>
              {dataActionLichHenQuote[i].name}
            </button>
          )}
        </>
      ),
    });
  }

  return (
    <>
      <div>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <button style={{ justifyContent: "center" }}>
            <Image
              alt="thao_tac"
              width={16}
              height={16}
              src="/crm/3_cham.png"
            />
            Thao tác
          </button>
        </Dropdown>
      </div>
      <QuoteBrowsingModal
        isModalCancel={isOrderBrowsingOpen}
        setIsModalCancel={setIsOrderBrowsingOpen}
      />
      <ModalSuaLichhen
        isShowModalAdd={isShowModalAdd}
        onClose={onClose}
        handleAddDB={handleAddDB}
      />
      <DenyActionModal
        isModalCancel={isDenyOpen}
        setIsModalCancel={setIsDenyOpen}
      />
      {/* <DelLichHenModal
        record={record}
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
      />
      <CanCel_LichHen_Mdal
        record={record}
        isModalCancel={isCancelOpen}
        setIsModalCancel={setIsCancelOpen}
      /> */}
      <ShareActionModal
        record={record}
        isModalCancel={isOpenShare}
        setIsModalCancel={setIsOpenShare}
      />
      <HandOverActionModal
        record={record}
        isModalCancel={isOpenHandOver}
        setIsModalCancel={setIsOpenHandOver}
      />
      <CallModal
        record={record}
        allkey={allkey}
        isModalCancel={isOpenUpdate}
        setIsModalCancel={setIsOpenUpdate}
      />
      <SendMailModal
        record={record}
        allkey={allkey}
        isModalCancel={isOpenSend}
        setIsModalCancel={setIsOpenSend}
      />
    </>
  );
}
