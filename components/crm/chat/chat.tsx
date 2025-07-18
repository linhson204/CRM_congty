import styles from "./chat.module.css";
import useModal from "../hooks/useModal";
import { useRef, useEffect, useState } from "react";
import NewChatBusinessBody from "./chat_body_tlkd";

export default function ChatBusiness({ data }) {

  const chatRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    chatRef.current?.classList.add("active_open_chat");
  }, [])
  const handleOpenChatBody = () => {
    setIsOpen(!isOpen)
    if (isOpen) {
      chatRef.current?.classList.remove("active_open_chat");
    } else {
      chatRef.current?.classList.add("active_open_chat");
    }
  };
  console.log("isOpen", isOpen)
  return (
    <>
      <div ref={chatRef} className={styles.business_assistant}>
        <div
          className={styles.business_assistant_header}
          onClick={handleOpenChatBody}
        >
          <span style={{ color: "white" }}>Trợ lý kinh doanh</span>
          <div>
            <button id={styles.business_assistant_close}></button>
          </div>

        </div>
        {isOpen && data ? (
          <NewChatBusinessBody handleOpenChatBody={handleOpenChatBody} final_data={data} />
        ) : null}
      </div>
    </>
  );
}
