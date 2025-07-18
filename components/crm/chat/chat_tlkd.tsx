import styles from "./chat.module.css";
import useModal from "../hooks/useModal";
import { useEffect, useRef } from "react";
import NewChatBusinessBody from "./chat_tlkd_detail";
import { useRouter } from "next/router";
import { validatePhone } from "@/utils/function";

export default function ChatBusiness() {

    const chatRef = useRef<HTMLDivElement>(null);
    const { isOpen, toggleModal } = useModal(null, [null]);
    const handleOpenChatBody = () => {
        toggleModal();
        if (isOpen) {
            chatRef.current?.classList.remove("active_open_chat");
        } else {
            chatRef.current?.classList.add("active_open_chat");
        }
    };

    // Lấy dữ liệu trên url, mở nhanh nút gọi, truyền tham số 
    const router = useRouter()
    useEffect(() => {
        if (router.isReady) {
            const callNow = router.query['callNow']
            const cusName = router.query['cusName']
            const cusPhone = router.query['cusPhone']

            if (typeof callNow === 'string' && callNow == '1' && typeof cusName === 'string' && typeof cusPhone === 'string' && validatePhone(cusPhone)) {
                if (!isOpen) {
                    toggleModal();
                    chatRef.current?.classList.add("active_open_chat");
                }
            }
        }
        return () => { }
    }, [router, router.isReady, router.query])

    return (
        <>
            <div ref={chatRef} className={styles.business_assistant}>
                <div

                    onClick={handleOpenChatBody}
                >
                    <button
                        type="button"
                        style={{
                            position: "fixed",
                            zIndex: "9999",
                            right: "20px",
                            top: "80%",
                            transform: "translateY(-50%)"
                        }}
                    >
                        <img
                            width={50}
                            height={50}
                            src="/crm/phone.svg"
                            alt="hungha365.com"
                        />
                    </button>
                </div>
                {isOpen ? (
                    <NewChatBusinessBody handleOpenChatBody={handleOpenChatBody} />
                ) : null}
            </div>
        </>
    );
}
