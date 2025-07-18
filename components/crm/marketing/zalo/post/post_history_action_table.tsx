import styles from "./price_policy.module.css";
import { useRouter } from "next/router";
import { MenuProps, Modal } from "antd";
import { Button, Dropdown, Space } from "antd";
import Link from "next/link";
import { useState } from "react";
// import DelActionModal from "./delete_action_sms";
// import Review from "./review";
import router from "next/router";
// import Resender from "./cancel_modal";
import SendSMS from "../../sms/sendsms";
import { boolean } from "yup";
import { axiosCRM, axiosCRMv2 } from "@/utils/api/api_crm";
import DelActionModal from "../delete_action_mdal";

export interface PostZaloActionTableProps {
  isPined: boolean;
  index: any;
  onDel: (e: number) => void
}

export const MarketingZALOPostHistoryActionTable: React.FC<
  PostZaloActionTableProps
> = ({ isPined, index, onDel }) => {
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [isModalSend, setIsModalSend] = useState(false);
  const [isModalSendSMS, setIsModalSendSMS] = useState(false);
  const router = useRouter();

  const handdleDelete = async () => {
    const delPost = await axiosCRMv2("/marketingZalo/deletePostSchedule", {
      schedule_id: index
    });
    onDel(index)
  };

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
            onClick={async () => {
              setIsModalSend(true), await router.push("post/post-again");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem"
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M14.9998 1L7.2998 8.7"
                stroke="#474747"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15 1L10.1 15L7.3 8.7L1 5.9L15 1Z"
                stroke="#474747"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Đăng lại
          </div>
        </>
      )
    },

    {
      key: "2",
      label: (
        <>
          <div
            onClick={async () => {
              setIsModalSend(true), await router.push(`post/edit?id=${index}`);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem"
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M7.26201 2.47607H2.39156C2.02249 2.47607 1.66855 2.62268 1.40758 2.88365C1.14661 3.14462 1 3.49857 1 3.86763V13.6085C1 13.9776 1.14661 14.3316 1.40758 14.5925C1.66855 14.8535 2.02249 15.0001 2.39156 15.0001H12.1325C12.5015 15.0001 12.8555 14.8535 13.1165 14.5925C13.3774 14.3316 13.524 13.9776 13.524 13.6085V8.73809"
                stroke="#474747"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.4776 1.4323C12.7544 1.1555 13.1298 1 13.5212 1C13.9127 1 14.2881 1.1555 14.5649 1.4323C14.8417 1.7091 14.9972 2.08452 14.9972 2.47597C14.9972 2.86742 14.8417 3.24284 14.5649 3.51964L7.95499 10.1295L5.17188 10.8253L5.86765 8.04221L12.4776 1.4323Z"
                stroke="#474747"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Chỉnh sửa
          </div>
        </>
      )
    },
    {
      key: "3",
      label: (
        <>
          <div
            onClick={() => setIsDelOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem"
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M1.75 3.7998H3.15H14.35"
                stroke="#474747"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.24844 3.8V2.4C5.24844 2.0287 5.39594 1.6726 5.65849 1.41005C5.92104 1.1475 6.27713 1 6.64844 1H9.44844C9.81974 1 10.1758 1.1475 10.4384 1.41005C10.7009 1.6726 10.8484 2.0287 10.8484 2.4V3.8M12.9484 3.8V13.6C12.9484 13.9713 12.8009 14.3274 12.5384 14.5899C12.2758 14.8525 11.9197 15 11.5484 15H4.54844C4.17713 15 3.82104 14.8525 3.55849 14.5899C3.29594 14.3274 3.14844 13.9713 3.14844 13.6V3.8H12.9484Z"
                stroke="#474747"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.65039 7.2998V11.4998"
                stroke="#474747"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.44922 7.2998V11.4998"
                stroke="#474747"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Xóa
          </div>
        </>
      )
    }
  ];

  return (
    <>
      {/* {
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
      } */}
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
      <DelActionModal
        isModalCancel={isDelOpen}
        setIsModalCancel={setIsDelOpen}
        title={"Xóa đăng bài"}
        content={"Bạn có chắc chắn muốn xóa bài viết không ?"}
        handleCallAPi={() => handdleDelete()}
      />
    </>
  );
};
