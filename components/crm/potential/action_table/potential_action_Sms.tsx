import styles from "./order.module.css";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";
import Link from "next/link";
import { dataActionEmailPotential } from "@/components/crm/ultis/consntant";
import { useState } from "react";
import QuoteBrowsingModal from "@/components/crm/quote/quote_action_modal/quote_browsing_action_mdal";
import DenyActionModal from "@/components/crm/quote/quote_action_modal/deny_action_mdal";
import DelActionModal from "@/components/crm/quote/quote_action_modal/delete_action_mdal";
import CancelActionModal from "@/components/crm/quote/quote_action_modal/cancel_action_mdal";
import ShareActionModal from "@/components/crm/quote/quote_action_modal/share_action_mdal";
import HandOverActionModal from "@/components/crm/quote/quote_action_modal/handover_action_mdal";
import StatusModal from "@/components/crm/quote/quote_action_modal/status-mdal";
import SendMailModal from "@/components/crm/quote/quote_action_modal/send_mail_mdal";
import CallModal from "@/components/crm/quote/quote_action_modal/complete-mdal";
import CanCel_LichHen_Mdal from "@/components/crm/quote/quote_action_modal/cancel_lichhen_mdal";
import DelActionModalEmil from "../mdal_action/del_action_email";
import ShareActionModalE from "@/components/crm/marketing/email/review";
import { useRouter } from "next/router";
import ResendActionModalEmil from "../mdal_action/resend_action_email";
import ShareActionModalS from "@/components/crm/marketing/sms/review";
import ResendActionModalSms from "../mdal_action/resend_action_SMS";
import SendSMSDemoModal from "../mdal_action/send_demo.sms";

export default function PotentialActionSMSTable(props: any) {
  const { record, allkey } = props;

  const [isModalCancel, setIsModalCancel] = useState(false);
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
  const [isShowModalResend, setIsShowModalResend] = useState(false);
  const [smsDemo, setsmsDemo] = useState(false);
  const onClose = () => {
    setIsShowModalAdd(false);
    setIsShowModal(false);
  };
  const handleAddDB = () => {
    setIsShowModalAdd(false);
  };
  const router = useRouter();
  const handleClickAction = (e: any, type: string | undefined) => {
    if (type === "reSend") {
      setIsShowModalResend(true);
    }
    if (type === "view") {
      setIsModalCancel(true);
    }
    if (type === "deny") {
      setIsDenyOpen(true);
    }
    if (type === "cancel") {
      setsmsDemo(true);
    }
    if (type === "share") {
      setIsOpenShare(true);
    }
    if (type === "edit") {
      router.push("/marketing/sms/update");
    }
    if (type === "complete") {
      setIsOpenUpdate(true);
    }
    // if (type === "send") {
    //   setIsOpenSend(true);
    // }
  };
  const items: MenuProps["items"] = [];
  for (let i = 0; i < dataActionEmailPotential.length; i++) {
    items.push({
      key: i,
      label: (
        <>
          {dataActionEmailPotential[i].link !== "#" ? (
            <Link
              href={`${dataActionEmailPotential[i].link}/${record}`}
              className="flex-start-btn"
            >
              <i className={dataActionEmailPotential[i].img}></i>
              {dataActionEmailPotential[i].name}
            </Link>
          ) : (
            <button
              className="flex-start-btn"
              onClick={(e) =>
                handleClickAction(e, dataActionEmailPotential[i].type)
              }
            >
              <i className={dataActionEmailPotential[i].img}></i>
              {dataActionEmailPotential[i].name}
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
            <img src="/crm/3_cham.png" />
            Thao tác
          </button>
        </Dropdown>
      </div>
      <SendSMSDemoModal
        record={record}
        isModalCancel={smsDemo}
        setIsModalCancel={setsmsDemo}
      />
      <ShareActionModalS
        isModalCancel={isModalCancel}
        setIsModalCancel={setIsModalCancel}
      />
      <DelActionModalEmil
        record={record}
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
      />
      <ResendActionModalSms
        record={record}
        isModalCancel={isShowModalResend}
        setIsModalCancel={setIsShowModalResend}
      />
      <QuoteBrowsingModal
        isModalCancel={isOrderBrowsingOpen}
        setIsModalCancel={setIsOrderBrowsingOpen}
      />

      <DenyActionModal
        isModalCancel={isDenyOpen}
        setIsModalCancel={setIsDenyOpen}
      />
      {/* <CanCel_LichHen_Mdal
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
