import React, { useState, useRef } from "react";
import styles from "../marketing.module.css";
import Link from "next/link";
import DelActionModal from "./delete_action_sms";
import Review from "./review";
import ModalCompleteStep from "@/components/crm/potential/potential_steps/complete_modal";
import { Dropdown, MenuProps, Switch } from "antd";
import Resender from "./cancel_modal";

export default function CustomerListInputGroup({
  link,
  title,
  contentCancel,
  titleCancel,
}: any) {
  const [open, setOpen] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [isDelOpen, setIsDelOpen] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const [isModalSend, setIsModalSend] = useState(false);
  const [isOpenMdalSuccess, setIsOpenMdalSuccess] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleOK = () => {
    setIsModalCancel(false);
    setIsOpenMdalSuccess(true);
    setTimeout(() => {
      setIsOpenMdalSuccess(false);
    }, 2000);
  };

  const App: React.FC = () => <Switch defaultChecked onChange={onChange} />;

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <>
          <div onClick={() => setIsModalSend(true)}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              style={{ marginRight: "4px" }}
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
            Gửi lại
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={() => setIsDelOpen(true)}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            style={{ marginRight: "4px" }}
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

  const onChange = (checked: boolean) => {};

  return (
    <>
      <Resender
        isModalCancel={isModalSend}
        setIsModalCancel={setIsModalSend}
        content={"Bạn có chắc chắn muốn gửi lại sms?"}
        title={"Xác nhận gửi lại sms"}
      />
      <div className={`${styles.main__control} ${styles.customer_custom}`}>
        <div
          className={`${styles.main__control_add}`}
          style={{ width: "100%" }}
        >
          <div
            className={`flex_align_center`}
            style={{ paddingRight: "110px" }}
          >
            <Switch
              defaultChecked
              onChange={onChange}
              style={{ marginRight: "5px" }}
            />
            Ẩn dữ liệu trống
          </div>

          <div className={styles.group_button_SMS}>
            <button
              className={`${styles.dropbtn_add} flex_align_center ${styles.btn_file}`}
              onClick={() => setIsModalCancel(true)}
            >
              <img
                width="14"
                height="10"
                src="/crm/eye2.svg"
                alt="hungha365.com"
              />
              Xem trước
            </button>
            {
              <Review
                isModalCancel={isModalCancel}
                setIsModalCancel={setIsModalCancel}
              />
            }
            <button
              className={styles.btn_edit}
              style={{ background: "#34B632", border: "1px solid #34B632" }}
              type="submit"
              onClick={() => setModal1Open(true)}
            >
              <img
                width="14"
                height="14"
                src="/crm/icon_send.svg"
                alt="hungha365.com"
                style={{ marginRight: "8px", verticalAlign: "middle" }}
              />
              Gửi
            </button>
            {
              <ModalCompleteStep
                modal1Open={modal1Open}
                setModal1Open={setModal1Open}
                link="/setting/sms"
                title="Gửi sms thành công!"
              />
            }
            <Link href="update">
              <button type="button" className={styles.btn_edit}>
                <img src="/crm/edit_kh.svg" style={{ margin: "-3px 5px" }} />
                Chỉnh sửa
              </button>
            </Link>

            <button
              type="button"
              className={styles.btn_delete}
              onClick={() => setIsDelOpen(true)}
            >
              <img
                src="/crm/delete_kh.svg"
                alt="hungha365.com"
                style={{ margin: "-3px 5px" }}
              />
              Xoá
            </button>
            {
              <DelActionModal
                isModalCancel={isDelOpen}
                setIsModalCancel={setIsDelOpen}
              />
            }
            <div>
              <Dropdown menu={{ items }}>
                <button
                  style={{ justifyContent: "center", color: "#4C5BD4" }}
                  className={styles.btn_delete}
                >
                  <img src="/crm/3_cham.png" style={{ margin: "-4px 0px" }} />
                  Thao tác
                </button>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
