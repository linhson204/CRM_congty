import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../marketing/marketing.module.css";
import { Input, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { ApiFacebook, getCookieValueFacebook } from "@/pages/api/facebook";
import { SidebarContext } from "../../context/resizeContext";
import { changeMessage } from "../../redux/message/messageSlice";

interface ChatSidebarProps {
  listChat: any;
  changeUrl: (e: string, chat: any) => void
}

const ChatSidebar = ({ listChat, changeUrl }: ChatSidebarProps) => {
    const dispatch = useDispatch();
  const { url, handleUrl } = useContext<any>(SidebarContext);
  const [isMobile, setIsMobile] = useState<boolean>();
  const [pinId, setPinId] = useState<string>("");
  const [user, setUser] = useState({
    name: "",
    id: "",
    img: "",
    pin: false
  });
  const [isRead, setIsRead] = useState<boolean>(true);
  const [isShowRoom, setIsShowRoom] = useState<boolean>(false);
  const [listFlowCheckRep, setListFlowCheckRep] = useState<any>();
  const [userChating, setUserChating] = useState<any>({
    name: "",
    active: false,
    img: "",
    url_user_sended: ""
  });

  const getAllChat = async () => {
    const newId = await getCookieValueFacebook("id_user_login_facebook");
    const res = await ApiFacebook(
      "/get_box_chat",
      {
        id_user_login: newId
      },
      "",
      false
    );

    if (res) {
      setListFlowCheckRep(
        res.data_chat
      );
    }
  };

  const getUser = async () => {
    const newId = await getCookieValueFacebook("id_user_login_facebook");
    const newName = await getCookieValueFacebook("name_user_facebook");
    const isPin = await getCookieValueFacebook("require_pin");
    const url = await getCookieValueFacebook("url_img_login");
    setPinId(newId);
    setUser({
      name: newName,
      id: newId,
      img: url,
      pin: isPin as any
    });
  };

  const changeFlowCheckRep = (number: number) => {
    if (number == 1) {
      setIsRead(true);
    } else {
      setIsRead(false);
    }
    setListFlowCheckRep(
      listChat?.filter((chat: any) => chat.check_rep == number)
    );
  };

  useEffect(() => {
    getUser();
    getAllChat();
  }, [])

  useEffect(() => {
    if (window.innerWidth < 440) {
      setIsMobile(true);
    }
  }, [window.innerWidth]);
  return (
    <>
        <div className={styles.messidebar}>
          <div className={styles.mesInfo}>
            <div className={styles.accInfo}>
              <div className={styles.acc_img}>
                <div className="ava">
                  <Image
                    width={36}
                    height={36}
                    style={{
                      borderRadius: "50%"
                    }}
                    src={user.img || "/crm/chat_ava.svg"}
                    alt="ava"
                  />

                  <Image
                    width={12}
                    height={12}
                    style={{ marginLeft: "-10px" }}
                    src="/crm/active.svg"
                    alt="status"
                  />
                </div>
                <div>
                  <div className="accName">{user.name}</div>
                  {/* <div className="altName">
                <Image width={15}
                  height={15}
                  alt="icon"
                  src="/crm/accIcon.svg"
                />
                 <span> Trung cute</span>
              </div> */}
                </div>
              </div>

              <button className={styles.switchAcc}>
                <Image
                  width={30}
                  height={33}
                  alt="icon"
                  src="/crm/3dots_2.svg"
                />
              </button>
            </div>

            <Input
              className={styles.mesSearchBar}
              prefix={
                <Image
                  alt="hungha.com"
                  src={"/crm/search.svg"}
                  width={14}
                  height={14}
                />
              }
              placeholder="Người, nhóm và tin nhắn"
            />
          </div>
          <div
            className={styles.recentMes}
            style={{
              display: isMobile && isShowRoom ? "none" : "block"
            }}
          >
            <div>
              <h5>Cuộc trò chuyện gần đây</h5>
            </div>
            <div className={styles.mesCate}>
              <button
                className={isRead ? styles.mesCateButton : ""}
                onClick={() => changeFlowCheckRep(1)}
              >
                Tất cả
              </button>
              <button
                className={!isRead ? styles.mesCateButton : ""}
                onClick={() => changeFlowCheckRep(0)}
              >
                Chưa đọc
              </button>
            </div>
            <p style={{ color: "#666666", fontWeight: "bold" }}>
              Cuộc trò chuyện
            </p>
            <div
              style={{
                width: "100%"
              }}
            >
              <div
                style={{
                  width: "100%"
                }}
              >
                {listFlowCheckRep &&
                  listFlowCheckRep.map((chat: any) => (
                    <div
                      style={{
                        display: "flex",
                        paddingTop: "10px"
                      }}
                      onClick={() => {
                        console.log("num_box_chat");
                      }}
                    >
                      <div>
                        <a
                          href={chat.url_user_sended}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            width={36}
                            height={36}
                            src={chat.src_img}
                            style={{
                              borderRadius: "50%"
                            }}
                            alt={chat.name_user_sended}
                          />
                        </a>
                        {chat.check_onl == 1 && (
                          <Image
                            width={12}
                            height={12}
                            style={{ marginLeft: "-10px" }}
                            src="/crm/active.svg"
                            alt="status"
                          />
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          width: "calc(100% - 46px)",
                          paddingLeft: "10px"
                        }}
                        onClick={() => {
                          // setNumberFirst(0)
                          //   if (!isFirstIn) {
                          //     setIsFristIn(true);
                          //   }
                          dispatch(changeMessage({
                            messages: []
                          }))
                          changeUrl(chat.url_user_sended, chat)
                        //   handleUrl(chat.url_user_sended),
                            //   setListDetialChat(null);
                            // dispatch(changeMessage({
                            //   url: chat.url_user_sended,
                            //   messages: []
                            // }));
                            // getChatDetail(chat.url_user_sended),
                            // setUserChating({
                            //   name: chat.name_user_sended,
                            //   img: chat.src_img,
                            //   active: chat.check_onl,
                            //   url_user_sended: chat.url_user_sended
                            // });

                          // setValueSubmit({
                          //   text: "",
                          //   url_img: [],
                          //   data_img: [],
                          //   isHaveValue: false
                          // });
                          // setIsShowRoom(true);
                        }}
                      >
                        <p style={{ fontWeight: "bold" }}>
                          {chat.name_user_sended}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            cursor: "pointer"
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              width: "calc(100% - 80px)",
                              overflow: "hidden",
                              textOverflow: "ellipsis"
                            }}
                            onClick={() => {}}
                          >
                            <p
                              style={{
                                whiteSpace: "nowrap",
                                width: "100%",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                              }}
                            >
                              {chat.last_mess}
                            </p>
                          </div>
                          <div
                            style={{
                              width: "100%",
                              justifyContent: "flex-end",
                              display: "flex",
                              flex: 1,
                              alignItems: "flex-end"
                              // whiteSpace: "nowrap"
                            }}
                          >
                            <p>{chat.last_time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default ChatSidebar;
