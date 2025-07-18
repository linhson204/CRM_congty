import styles from "./price_policy.module.css";
import { MenuProps, Modal } from "antd";
import { Button, Dropdown, Space } from "antd";
import Link from "next/link";
import { dataActionPricePolicy } from "../../ultis/consntant";
import { useState } from "react";
import DelActionModal from "./delete_action_sms";
import Review from "./review";
import router from "next/router";
import Resender from "./cancel_modal";
import SendSMS from "./sendsms";

export default function PricePolicyActionTable() {
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [isModalSend, setIsModalSend] = useState(false);
  const [isModalSendSMS, setIsModalSendSMS] = useState(false);
    
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
          <div onClick={() => setIsModalCancel(true)}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              style={{ margin: "-3px 4px" }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 8.09091C1 8.09091 3.54545 3 8 3C12.4545 3 15 8.09091 15 8.09091C15 8.09091 12.4545 13.1818 8 13.1818C3.54545 13.1818 1 8.09091 1 8.09091Z"
                stroke="#474747"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M7.99991 10C9.05427 10 9.909 9.14528 9.909 8.09091C9.909 7.03655 9.05427 6.18182 7.99991 6.18182C6.94555 6.18182 6.09082 7.03655 6.09082 8.09091C6.09082 9.14528 6.94555 10 7.99991 10Z"
                stroke="#474747"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            Xem trước
          </div>
        </>
      ),
    },

    {
      key: "2",
      label: (
        <>
         <div onClick={() => setIsModalSend(true)}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              style={{ margin: "-3px 4px" }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.4 2.5H13.6C14.37 2.5 15 3.13 15 3.9V12.3C15 13.07 14.37 13.7 13.6 13.7H2.4C1.63 13.7 1 13.07 1 12.3V3.9C1 3.13 1.63 2.5 2.4 2.5Z"
                stroke="#474747"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M15 3.89844L8 8.79844L1 3.89844"
                stroke="#474747"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            Gửi lại
            </div>
        
        </>
      ),
    },
    {
      key: "3",
      label: (
        <>
     <div onClick={() => setIsModalSendSMS(true)}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              style={{ margin: "-3px 4px" }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9998 1L7.2998 8.7"
                stroke="#474747"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M15 1L10.1 15L7.3 8.7L1 5.9L15 1Z"
                stroke="#474747"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            Gửi thử
          </div>
        </>
      ),
    },
    {
      key: "4",
      label: (
        <>
          <Link href="sms/update">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              style={{ margin: "-3px 4px" }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.26201 2.47656H2.39156C2.02249 2.47656 1.66855 2.62317 1.40758 2.88414C1.14661 3.14511 1 3.49906 1 3.86812V13.609C1 13.9781 1.14661 14.332 1.40758 14.593C1.66855 14.854 2.02249 15.0006 2.39156 15.0006H12.1325C12.5015 15.0006 12.8555 14.854 13.1165 14.593C13.3774 14.332 13.524 13.9781 13.524 13.609V8.73858"
                stroke="#474747"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M12.4815 1.4323C12.7583 1.1555 13.1337 1 13.5251 1C13.9166 1 14.292 1.1555 14.5688 1.4323C14.8456 1.7091 15.0011 2.08452 15.0011 2.47597C15.0011 2.86742 14.8456 3.24284 14.5688 3.51964L7.9589 10.1295L5.17578 10.8253L5.87156 8.04221L12.4815 1.4323Z"
                stroke="#474747"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            Chỉnh sửa
          </Link>
        </>
      ),
    },
    {
      key: "5",
      label: (
        <div onClick={() => setIsDelOpen(true)}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            style={{ margin: "-3px 4px" }}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.75 3.7998H3.15H14.35"
              stroke="#474747"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M5.24844 3.8V2.4C5.24844 2.0287 5.39594 1.6726 5.65849 1.41005C5.92104 1.1475 6.27713 1 6.64844 1H9.44844C9.81974 1 10.1758 1.1475 10.4384 1.41005C10.7009 1.6726 10.8484 2.0287 10.8484 2.4V3.8M12.9484 3.8V13.6C12.9484 13.9713 12.8009 14.3274 12.5384 14.5899C12.2758 14.8525 11.9197 15 11.5484 15H4.54844C4.17713 15 3.82104 14.8525 3.55849 14.5899C3.29594 14.3274 3.14844 13.9713 3.14844 13.6V3.8H12.9484Z"
              stroke="#474747"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M6.65039 7.2998V11.4998"
              stroke="#474747"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M9.44922 7.2998V11.4998"
              stroke="#474747"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          Xóa
        </div>
      ),
    },
  ];

  return (
    <>
         {
        <Resender
          isModalCancel={isModalSend}
          setIsModalCancel={setIsModalSend} 
          content={"Bạn có chắc chắn muốn gửi lại sms?"}
          title={"Xác nhận gửi lại sms"}        
          />
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
            <img
              src="/crm/3_cham.png"
              style={{ margin: "-4px 0px" }}
            />
            Thao tác
          </button>
        </Dropdown>
      </div>
      <DelActionModal
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
      />
    </>
  );
}
