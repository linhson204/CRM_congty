import React, { useEffect, useState, useRef, useContext } from "react";
import Image from 'next/image'
import moment from "moment";
import styles from './message.module.css'
import { MessageContext } from '../context/messageContext'
import { notifySuccess } from "@/utils/function";

const MessageBody = ({ user, conversationId, avatarConversation, socket, isOpen, listMember }) => {
    const { setConvSocket } = useContext(MessageContext);
    const [listMessage, setListMessage] = useState([]);
    const [countMessage, setCountMessage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const messageContainerRef = useRef(null);

    const handleGetListMessage = async (listMess = 0) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_CHAT_URL}/message/LoadMessageZalo`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        conversationId: conversationId,
                        listMess: listMess
                    }),
                }
            );
            const data = await res.json()
            if (data?.data?.listMessages) {
                const newMessages = data.data.listMessages.map((message) => {
                    const user = listMember.find(member => member.id == message.senderID)
                    return {
                        messageID: message.messageID,
                        createAt: message.createAt,
                        message: message.message,
                        messageType: message.messageType,
                        senderID: message.senderID,
                        senderName: user.userName || '',
                        avatarUser: user.avatarUser,
                    }
                });

                setListMessage((prevMessages) => [...prevMessages, ...newMessages]);
                if (listMess === 0) {
                    setCountMessage(data.data.countMessage);
                }
            }
        } catch (error) { }
    };

    const handleLoadMoreMessages = async () => {
        try {
            const { scrollTop, scrollHeight } = messageContainerRef.current;
            await handleGetListMessage(listMessage.length);
            // const newScrollHeight = messageContainerRef.current.scrollHeight;
            // const scrollDifference = newScrollHeight - scrollHeight;
            // messageContainerRef.current.scrollTop = scrollTop + scrollDifference;
            messageContainerRef.current.scrollTo({ top: scrollTop, behavior: 'smooth' });
        } catch (error) {
            // Handle errorhandleLoadMoreMessages
        }
    };

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = messageContainerRef.current;
        if (
            Math.ceil(scrollHeight - clientHeight) >= Math.ceil(Math.abs(scrollTop)) - 1 &&
            listMessage.length > 0 &&
            listMessage.length < countMessage
        ) {
            // handleLoadMoreMessages();
        }
    };

    const handleSendMessage = (message) => {
        if (message.TypeGroup && message.TypeGroup === 'Zalo') {
            setConvSocket({
                messageId: message.MessageID,
                message: message.Message,
                conversationId: message.ConversationID,
                createAt: message.CreateAt,
            });

            if (message.ConversationID == conversationId) {
                const isMessageExists = listMessage.some(item => item.messageID === message.MessageID);
                if (!isMessageExists) {
                    setListMessage((prevMessages) => [...prevMessages, {
                        messageID: message.MessageID,
                        createAt: message.CreateAt,
                        message: message.Message,
                        messageType: message.MessageType,
                        senderID: message.SenderID,
                    }]);
                }
                if (message.SenderID !== user._id && isOpen === false) {
                    notifySuccess(`Bạn nhận được 1 tin nhắn mới: ${message.Message}`)
                }
            } else {
                if (message.SenderID !== user._id) {
                    notifySuccess(`Bạn nhận được 1 tin nhắn mới: ${message.Message}`)
                }
            }
        }
    };

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (messageContainerRef.current) {
                messageContainerRef.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, [listMessage]);

    useEffect(() => {
        setListMessage([])
        handleGetListMessage();
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = 0;
        }
    }, [conversationId]);

    useEffect(() => {
        socket.on('SendMessage', handleSendMessage);

        return () => {
            socket.off('SendMessage', handleSendMessage);
        };
    }, [isOpen]);
    // }, [conversationId, listMessage, isOpen]);

    return (
        <>
            <div className={styles.message_body} ref={messageContainerRef} >
                <div>
                    {listMessage.map((message, index) => (
                        <div key={index}>
                            {message.senderID == user._id ? (
                                <div className={styles.message_me}>
                                    <div className={styles.boxChatContent}>
                                        <div className={styles.message_content}>
                                            <div className={styles.message_text}>
                                                {message.message}
                                            </div>
                                            <div className={styles.message_time}>
                                                <span>{moment(message.createAt).format("HH:mm A")}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.message_cus}>
                                    <div className={styles.message_avatar}>
                                        <Image
                                            src={message.avatarUser}
                                            width={40}
                                            height={30}
                                            alt="avatar"
                                        />
                                    </div>
                                    <div className={styles.liveChatContent}>
                                        <div className={styles.liveChatTime}>
                                            {message.senderName}, {moment(message.createAt).format("DD/MM/YYYY")}
                                        </div>
                                        <div className={styles.boxContentLiveChat_p_relative}>
                                            <div className={styles.liveChatContentMess}>
                                                {message.messageType === 'text' && (
                                                    <div className={styles.liveChatContentText}>
                                                        <span>{message.message}</span>
                                                    </div>
                                                )}
                                                {message.messageType === 'sticker' && (
                                                    <div className={styles.liveChatContentText}>
                                                        <Image
                                                            src={message.message}
                                                            width={130}
                                                            height={130}
                                                            alt="sticker"
                                                            style={{ width: 'auto', height: 'auto' }}
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                )}
                                                <div className={styles.detailTime}>
                                                    <span>{moment(message.createAt).format("HH:mm A")}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default MessageBody;
