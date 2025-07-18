import React, { useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import io from 'socket.io-client';
import { ToastContainer } from "react-toastify";
import style from './message.module.css';
import MessageBody from './message_body';
import MessageInput from './message_input';
import { MessageContext } from '../context/messageContext';

const getUserFromToken = () => {
    const decodedToken = jwt_decode(Cookies.get('token_base365'));
    return decodedToken['data'] || null;
};

const Message = () => {
    const [socket, setSocket] = useState(null);
    const { dataConversation } = useContext(MessageContext);
    const [isOpen, setIsOpen] = useState(!!dataConversation);
    const [user, setUser] = useState(getUserFromToken);

    useEffect(() => {
        if (user) {
            const newSocket = io.connect('https://socket.timviec365.vn', {
                secure: true,
                enabledTransports: ['https'],
                transports: ['websocket', 'polling'],
            });

            newSocket.emit('Login', user._id, 'chat365');

            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
            };
        }
    }, [user]);

    useEffect(() => {
        setIsOpen(!!dataConversation);
    }, [dataConversation]);

    const handleClickCancel = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className={style.main} style={{ display: isOpen ? 'block' : 'none' }}>
                {socket && (
                    <>
                        <div className={style.header}>
                            <p>{dataConversation?.conversationName}</p>
                            <span onClick={handleClickCancel}>X</span>
                        </div>
                        <MessageBody
                            user={user}
                            conversationId={dataConversation?.conversationId}
                            avatarConversation={dataConversation?.avatarConversation}
                            socket={socket}
                            isOpen={isOpen}
                            listMember={dataConversation?.listMember}
                        />
                        <MessageInput
                            user={user}
                            conversationId={dataConversation?.conversationId}
                            oa_id={dataConversation?.oa_id}
                        />
                    </>
                )}
            </div>
            <ToastContainer autoClose={1000} />
        </>
    );
};

export default Message;
