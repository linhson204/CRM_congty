"use client";
import style from "./header.module.css";
import Image from "next/image";
import MessageModal from "./modal_header/modal_message";
import useModal from "../hooks/useModal";
export default function MessageButtonHeader() {
  const { isOpen, toggleModal, closeModal } = useModal(style.modal_message, [
    style.mess_icon_1,
    style.mess_icon_2,
  ]);

  return (
    <>
      <Image
        className={style.mess_icon_1}
        width={28}
        height={28}
        alt=".."
        src="/crm/messenger.svg"
        onClick={toggleModal}
      />
      <Image
        className={style.mess_icon_2}
        width={28}
        height={28}
        alt=".."
        src="/crm/icon-mess-1024.svg"
        onClick={toggleModal}
      />

      <div style={{ display: isOpen ? 'block' : 'none' }}>
        <MessageModal isOpen={isOpen} closeModal={closeModal} />
      </div>

      {/* {isOpen ? <MessageModal isOpen={isOpen} closeModal={closeModal} /> : null} */}

    </>
  );
}
