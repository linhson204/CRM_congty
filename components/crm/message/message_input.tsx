import React, { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import styles from './message.module.css'

const MessageInput = ({ user, conversationId, oa_id }) => {
    const [message, setMessage] = useState('')

    const handleInputChange = (e: any) => {
        setMessage(e.target.value)
    }

    const handleKeyDown = (e: any) => {
        // Kiểm tra nếu phím được nhấn là phím Enter (keyCode 13)
        if (e.key === 'Enter' || e.keyCode === 13) {
            handleSendMessage();
        }
    };

    const handleSendMessage = async () => {
        if (message !== '') {
            //Call api SendMessage
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_CHAT_URL}/message/sendMessageZalo`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ConversationID: conversationId,
                        SenderID: user._id,
                        MessageType: 'text',
                        Message: message,
                        from: 'Zalo',
                        oa_id: oa_id
                    }),
                }
            );
            const data = await res.json()
        }
        setMessage('')
    }

    return (
        <div className={styles.business_assistant_input_message}>
            <div className={styles.form_business_assistant}>
                <div
                    className={`${styles.business_assistant_item} ${styles.business_assistant_item_gray}`}
                >
                    <input
                        name="message"
                        type="text"
                        className={styles.tawk_chatinput_editor}
                        placeholder="Nhập nội dung tin nhắn"
                        value={message}
                        autoComplete="off"
                        onKeyDown={handleKeyDown}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div
                    className={`${styles.business_assistant_item} ${styles.businessAssistantSave}`}
                >
                    <button
                        id={`${styles.businessAssistantSave}`}
                        onClick={() => {
                            handleSendMessage();
                        }}
                    >
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 30 31"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_571_56690)">
                                <path
                                    d="M30 7.4273V23.5726C30 27.3987 26.8987 30.5 23.0727 30.5H6.92736C3.10131 30.5 0 27.3987 0 23.5727V7.4273C0 3.60131 3.10131 0.5 6.92736 0.5H23.0727C26.8987 0.5 30 3.60131 30 7.4273Z"
                                    fill="url(#paint0_linear_571_56690)"
                                ></path>
                                <path
                                    d="M6.79923 30.5C3.05012 30.5 0 27.4499 0 23.7008V7.29923C0 3.55012 3.05012 0.5 6.79923 0.5H23.2008C26.9499 0.5 30 3.55012 30 7.29923V23.7008C30 27.4499 26.9499 30.5 23.2008 30.5H6.79923Z"
                                    fill="url(#paint1_linear_571_56690)"
                                ></path>
                                <path
                                    opacity="0.5"
                                    d="M30.0001 15.4666V23.5725C30.0001 27.3986 26.8987 30.5 23.0726 30.5H16.8868L8.66577 22.279L23.4435 8.90997L30.0001 15.4666Z"
                                    fill="url(#paint2_linear_571_56690)"
                                ></path>
                                <path
                                    opacity="0.3"
                                    d="M23.7208 9.24756L5.73975 13.7902L8.95742 16.8186V22.5914L12.1258 20.1762L15.2035 23.2539L23.7208 9.24756Z"
                                    fill="#1A1A1A"
                                ></path>
                                <path
                                    d="M23.4085 8.93506L10.2539 18.3042L14.8911 22.9414L23.4085 8.93506Z"
                                    fill="url(#paint3_linear_571_56690)"
                                ></path>
                                <path
                                    d="M8.64502 16.5061V22.279L10.2539 18.3042L23.4085 8.93506L8.64502 16.5061Z"
                                    fill="url(#paint4_linear_571_56690)"
                                ></path>
                                <path
                                    d="M5.42725 13.4777L8.64492 16.5061L23.4084 8.93506L5.42725 13.4777Z"
                                    fill="url(#paint5_linear_571_56690)"
                                ></path>
                                <path
                                    d="M8.64502 22.279L11.8134 19.8638L10.2539 18.3042L8.64502 22.279Z"
                                    fill="#D2D2D2"
                                ></path>
                                <path
                                    d="M23.4085 8.93506L10.2539 18.3042L14.8911 22.9414L23.4085 8.93506Z"
                                    fill="white"
                                ></path>
                                <path
                                    d="M8.64502 16.5061V22.279L10.2539 18.3042L23.4085 8.93506L8.64502 16.5061Z"
                                    fill="#9FB5DF"
                                ></path>
                                <path
                                    d="M5.42725 13.4777L8.64492 16.5061L23.4084 8.93506L5.42725 13.4777Z"
                                    fill="white"
                                ></path>
                            </g>
                            <defs>
                                <linearGradient
                                    id="paint0_linear_571_56690"
                                    x1="15"
                                    y1="0.5"
                                    x2="15"
                                    y2="30.5"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop offset="0.005" stopColor="#FFE5AE"></stop>
                                    <stop offset="1" stopColor="#FF992D"></stop>
                                </linearGradient>
                                <linearGradient
                                    id="paint1_linear_571_56690"
                                    x1="15"
                                    y1="0.792976"
                                    x2="15"
                                    y2="30.678"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#4C5BD4"></stop>
                                    <stop offset="1" stopColor="#1F7ED0"></stop>
                                </linearGradient>
                                <linearGradient
                                    id="paint2_linear_571_56690"
                                    x1="15.9939"
                                    y1="15.5339"
                                    x2="28.7275"
                                    y2="28.267"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#64A8E2"></stop>
                                    <stop
                                        offset="1"
                                        stopColor="#1F7ED0"
                                        stopOpacity="0"
                                    ></stop>
                                </linearGradient>
                                <linearGradient
                                    id="paint3_linear_571_56690"
                                    x1="10.2539"
                                    y1="15.9382"
                                    x2="23.4085"
                                    y2="15.9382"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop offset="0.009" stopColor="#F3E0DF"></stop>
                                    <stop offset="1" stopColor="#E8E0BA"></stop>
                                </linearGradient>
                                <linearGradient
                                    id="paint4_linear_571_56690"
                                    x1="14.2217"
                                    y1="12.9556"
                                    x2="15.4627"
                                    y2="14.7785"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop offset="0.009" stopColor="#65BCC0"></stop>
                                    <stop offset="1" stopColor="#53838A"></stop>
                                </linearGradient>
                                <linearGradient
                                    id="paint5_linear_571_56690"
                                    x1="5.42725"
                                    y1="12.7206"
                                    x2="23.4084"
                                    y2="12.7206"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop offset="0.009" stopColor="#F3E0DF"></stop>
                                    <stop offset="1" stopColor="#E8E0BA"></stop>
                                </linearGradient>
                                <clipPath id="clip0_571_56690">
                                    <rect
                                        y="0.5"
                                        width="30"
                                        height="30"
                                        rx="15"
                                        fill="white"
                                    ></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MessageInput