import style from "../header.module.css";
import React, { useEffect, useState, useContext } from "react";
import Image from 'next/image';
import moment from "moment";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { MessageContext } from '../../context/messageContext'

function MessageModal({ isOpen, closeModal }: any) {
  const { setDataConversation, convSocket } = useContext(MessageContext);
  const [listConv, setListConv] = useState([])

  const handleConversationClick = (conversationId, avatarConversation, conversationName, listMember) => {
    const userZalo = listMember.find(user => user.oa_id && user.oa_id !== '')
    setDataConversation({
      conversationId: conversationId,
      avatarConversation: avatarConversation,
      conversationName: conversationName,
      oa_id: userZalo.oa_id,
      listMember: listMember
    })
    closeModal()
  }

  useEffect(() => {
    const updateListConv = async () => {
      const index = listConv.findIndex((item) => item?.conversationId === convSocket.conversationId);
      if (index !== -1) {
        // Update the existing conversation
        listConv[index] = {
          ...listConv[index],
          message: convSocket.message,
          createAt: convSocket.createAt,
        };
        // Move the updated conversation to the beginning of the array
        setListConv((prevList) => {
          prevList.unshift(prevList.splice(index, 1)[0]);
          return [...prevList];
        })
      } else  {
        if(convSocket.conversationId) {
          // If the conversation is not in the list, add it to the beginning
          const newConversation = await handleGetConv(convSocket.conversationId)
          setListConv((prevList) => {
            prevList.unshift(newConversation);
            return [...prevList];
          })
        }
      }
    }
    updateListConv()
  }, [convSocket]);

  const handleGetConv = async (convId) => {
    try {
      const decodedToken = jwt_decode(Cookies.get("token_base365"))
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CHAT_URL}/conversations/GetOneConversationZalo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId: decodedToken['data']['_id'],
            conversationId: convId

          }),
        }
      );
      const data = await res.json()
      if (data?.data?.conversation_info) {
        return {
          conversationId: data.data.conversation_info.conversationId,
          avatarConversation: data.data.conversation_info.avatarConversation,
          conversationName: data.data.conversation_info.conversationName,
          listMember: data.data.conversation_info.listMember,
          message: data.data.conversation_info.message,
          createAt: data.data.conversation_info.createAt,
        }
      }
    } catch (error) { }
  };

  const handleGetListConv = async () => {
    try {
      const decodedToken = jwt_decode(Cookies.get("token_base365"))
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CHAT_URL}/conversations/GetConversation_zalo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: decodedToken['data']['_id'],
            countConversationLoad: 0
          }),
        }
      );
      const data = await res.json()
      if (data?.data?.conversation_info) {
        setListConv(data.data.conversation_info)
      }
    } catch (error) { }
  };

  useEffect(() => {
    handleGetListConv();
  }, []);
  return (
    <div className={style.modal_message}>
      <div className={style.top}>
        <div className={style.title_message_modal}>Tin nhắn</div>
        <div className={style.top_right}>
          <button className={style.btn_tab}>
            <img src="/crm/icon-zoom.svg" alt="..." />
          </button>
          <div className={style.closeBtn} onClick={closeModal}>
            <img src="/crm/icon-close-black.svg" alt="..." />
          </div>
        </div>
      </div>
      <div className={style.search_on_chat}>
        <input type="text" className={style.input_search} />
        <img className="img_search" src="/crm/search.svg" alt="hungha365.com" />
      </div>
      <div className={style.title_content}>Trò chuyện Zalo</div>
      <ul className={style.messages_box}>
        {listConv?.map((item, index) => (
          <li
            className={style.mess_item}
            key={index}
            onClick={() => handleConversationClick(item?.conversationId, item?.avatarConversation, item?.conversationName, item?.listMember)}
          >
            <div className={style.mess_item_a}>
              <div className={style.avatar_mess}>
                <Image
                  src={item?.avatarConversation}
                  width={500}
                  height={500}
                  alt="Picture of the author"
                />
              </div>
              <div className={style.information_messenges}>
                <div className={style.infor_left}>
                  <span className={style.sender}>{item?.conversationName}</span>
                  {item?.messageType === 'text' && (
                    <p className={style.content_messenges} style={{fontWeight: 'bold'}}>
                      {item?.message}
                    </p>
                  )}
                  {item?.messageType === 'sticker' && (
                    <p className={style.content_messenges}><i>[sticker]</i></p>
                  )}
                </div>
                <p className={style.date_right}>
                  {moment(item?.createAt).format("HH:mm")}
                  <br />
                  {moment(item?.createAt).format("DD/MM/YYYY")}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MessageModal
