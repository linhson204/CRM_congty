import { useRouter } from "next/router";
import { MenuProps, Modal } from "antd";
import { Button, Dropdown, Space } from "antd";
import Link from "next/link";
import { useState } from "react";
// import DelActionModal from "./delete_action_sms";
import Review from "./review";
import router from "next/router";
import Resender from "./cancel_modal";
import SendSMS from "../sms/sendsms";
import styles from './facebook.module.css'
import { boolean } from "yup";
import { Delete, Custom, Caculate, Success } from "@/public/img/marketing/facebook";
import SuccessModal from "./success_modal";

export const MarketingFacebookHistoryActionTable = () => {
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [isModalSend, setIsModalSend] = useState(false);
  const [isSuccess, setIsSuccess ] = useState(false);
  const [isModalSendSMS, setIsModalSendSMS] = useState(false);
  const router = useRouter();

  const handleClickAction = (e: any, type: string | undefined) => {
    if (type === "delete") {
      setIsDelOpen(true);
    }
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <>
          <div
          className={styles.box_action}
          onClick={async () => {
            setIsSuccess(true)
          }}
          >
            <Custom className={styles.action_icon}/>
            Chỉnh sửa
          </div>
        </>
      )
    },

    {
      key: "2",
      label: (
        <>
          <div
          className={styles.box_action}
            onClick={async () => {
              setIsModalSend(true)
            }}
          >
            <Caculate className={styles.action_icon}/>
            Lên lịch gửi
          </div>
        </>
      )
    },
    {
      key: "3",
      label: (
        <>
          <div className={styles.box_action}  onClick={ () => {
              setIsModalSend(true)
            }}>
            <Delete className={styles.action_icon}/>
            Xóa
          </div>
        </>
      )
    },

  ];

  return (
    <>
       {
        <Resender
          isModalCancel={isModalSend}
          setIsModalCancel={setIsModalSend}
          content={"Bạn chắc chắn muốn xóa?"}
          title={"Xóa mẫu tin nhắn"} next={() => {}}        />
      }
      {
        <SuccessModal isModalCancel={isSuccess} setIsModalCancel={setIsSuccess} content={"Xóa mẫu tin nhắn thành công"} title={""} className={""}/>
      }
      {
        <Review
          isModalCancel={isModalCancel}
          setIsModalCancel={setIsModalCancel}
        />
      } 
      <SendSMS
        isModalCancel={isModalSendSMS}
        setIsModalCancel={setIsModalSendSMS}
      />
      <div>
        <Dropdown menu={{ items }}>
          <button style={{ justifyContent: "center" }}>
            <img src="/crm/3_cham.png" style={{ margin: "-4px 0px" }} />
            Thao tác
          </button>
        </Dropdown>
      </div>
      {/* <DelActionModal
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
      /> */}
    </>
  );
};
