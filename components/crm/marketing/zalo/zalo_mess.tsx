import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import Image from "next/image";
import styles from "../../marketing/marketing.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Button, Input, Popover, Spin } from "antd";
import Popup from "./zalo_qr_popup";
import {
  ApiFacebook,
  getCookieValueFacebook
} from "@/pages/api/facebook";
import {
  Close,
  IconArrowLeft,
  IConSendMessage,
  Plus
} from "@/public/img/marketing/facebook";
import OptionDetailRepMessage from "./zalo_detail_chat_option_message";
import { useSelector, useDispatch } from "react-redux";
import { addMessage, changeMessage } from "../../redux/message/messageSlice";
import ChatSidebar from "./chat_sidebar";
import { last } from "lodash";

const ZaloMess: React.FC = () => {
  const messages = useSelector((state: any) => state.message.message);
  const { url, handleUrl } = useContext<any>(SidebarContext);
  const [ lastHeight, setLastHeight ] = useState<number>(0);
  const [ preHeight, setPreHeight ] = useState<number>(0);
  const [ isSend, setIsSend ] = useState<Boolean>(false);
  const [ isMore, setIsMore ] = useState<Boolean>(false);
  const [ isGetMore, setIsGetMore ] = useState<Boolean>(false);
  const dispatch = useDispatch();
  const inputRef = useRef<any>(null);
  const [isFocus, setIsFocus] = useState<Boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>();
  const [isShowRoom, setIsShowRoom] = useState<boolean>(false);
  const [isImg, setIsImg] = useState<boolean>(false);
  const [isFirstIn, setIsFristIn] = useState<Boolean>(false);
  const [showPopup, setShowPopup] = useState(true);
  const [pinId, setPinId] = useState<string>("");
  const [listFlowCheckRep, setListFlowCheckRep] = useState<any>();
  const [valueSubmit, setValueSubmit] = useState<any>({
    text: "",
    url_img: [],
    data_img: [],
    isHaveValue: false
  });
  const inputFileRef = useRef<any>(null);
  const [user, setUser] = useState({
    name: "",
    id: "",
    img: "",
    pin: false
  });
  const [userChating, setUserChating] = useState<any>({
    name: "",
    active: false,
    img: "",
    url_user_sended: ""
  });
  const [listDetailChat, setListDetialChat] = useState<any>(null);
  const scrollRef = useRef<any>(null);
  const scrollMessageRef = useRef<any>(null);
  const [isFetchingDetail, setIsFetchingDetail] = useState<Boolean>(false);
  const [isFetchingMoreChat, setIsFetchingMoreChat] = useState<Boolean>(false);

  const renderChatBundle = () => {
    return (
      <div
        style={{
          padding: "10px",
          backgroundColor: "#f1f0f0",
          borderRadius: "6px"
        }}
      >
        <p style={{ margin: 0 }}>
          Xin chào, đây là tin nhắn, đây là tin nhắn được tạo từ trước nhằm mục
          đích kiểm tra tính năng phần mềm
        </p>
      </div>
    );
  };
  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const data = [
    {
      title: "Ant Design Title 1"
    },
    {
      title: "Ant Design Title 2"
    },
    {
      title: "Ant Design Title 3"
    },
    {
      title: "Ant Design Title 4"
    }
  ];
  const {
    headerTitle,
    setHeaderTitle,
    setShowBackButton,
    setCurrentPath
  }: any = useHeader();

  // detail room message
  const getChatDetail = async (sended: string) => {
    setIsFetchingDetail(true);
    const newId = await getCookieValueFacebook("id_user_login_facebook");
    const response = await ApiFacebook(
      "/show_inbox",
      {
        id_user_login: newId,
        url_user_sended: userChating.url_user_sended
      },
      "",
      false
    );

    if (response) {
      const data = {
        url: sended,
        messages: response.data
      };
      setListDetialChat(response.data)
      dispatch(changeMessage(data));
     
    }
    setIsFetchingDetail(false);
  };

  // submit message
  const submitMessage = async () => {
    console.log(valueSubmit.text, valueSubmit.data_img);
    if (valueSubmit.text || valueSubmit.data_img) {
      const idUser = await getCookieValueFacebook("id_user_login_facebook");
      const urlSended = await getCookieValueFacebook("url_user_rended");
      const newDataImg = valueSubmit.data_img?.map((url: string) => {
        return url.replace("data:image/jpeg;base64,", "");
      });

      const data = {
        id_user_login: idUser,
        url_user_sended: userChating.url_user_sended,
        type: valueSubmit.data_img.length > 0 ? "img" : "text",
        mess: valueSubmit.text,
        url_img: valueSubmit.data_img,
        img_data: newDataImg || []
      };
      setListDetialChat((pre: any) => [
        ...pre,
        {
          id_mess: 0,
          id_user_login: idUser,
          url_user_sended: urlSended,
          type: valueSubmit.data_img.length > 0 ? "img" : "text",
          mess: valueSubmit?.text,
          url_img: valueSubmit?.data_img,
          img_data: valueSubmit?.data_img || []
        }
      ]);

      dispatch(
        addMessage({
          id_mess: 0,
          id_user_login: idUser,
          url_user_sended: urlSended,
          type: valueSubmit.data_img.length > 0 ? "img" : "text",
          mess: valueSubmit?.text,
          url_img: valueSubmit?.data_img,
          img_data: valueSubmit?.data_img || []
        })
      );

      // const res = await ApiFacebook("/send_mess", data, "", false);
      inputRef.current.focus();
      setValueSubmit({
        text: "",
        url_img: [],
        data_img: [],
        isHaveValue: false
      });
      
    }
  };

  //  array to object
  const arrayToObject = (arr) => {
    let result = "";
    const length = arr.length;
    arr.forEach((obj, index) => {
      // Concatenate the values of each object's properties
      if (index == 0) {
        result +=  JSON.stringify(obj);
      } else {
        result += "," + JSON.stringify(obj);
      }
  
    });
    return result;
  };

  // image
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileName = file.name;
        const dataUrlCopy = valueSubmit.url_img;
        const dataImgCopy = valueSubmit.data_img;
        const baseSlice = reader.result.toString();
       
        dataImgCopy.push(baseSlice);
        dataUrlCopy.push(fileName);
        setValueSubmit((pre: any) => ({
          ...pre,
          data_img: dataImgCopy,
          isHaveValue: true,
          url_img: dataUrlCopy
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  //  more chat
  const handleScrollEvent = async () => {
    if (scrollRef.current && isGetMore) {
      if (scrollRef.current.scrollTop === 0) {
        setIsMore(true);
        setIsFetchingMoreChat(true);
        const idUser = await getCookieValueFacebook("id_user_login_facebook");
        const res = await ApiFacebook(
          "/more_chat",
          {
            id_user_login: idUser,
            url_user_sended: url
          },
          "",
          false
        );
        if (res?.data) {
          if (res.data.length > 0) {
            const newMessage = [...messages];
            await res.data.reverse().map((mes) => {
              newMessage.unshift(mes);
            })
            setListDetialChat(newMessage)
            dispatch(changeMessage({
              messages: newMessage
            }));
            setIsFetchingMoreChat(false);
            setLastHeight(scrollRef.current.scrollHeight)
            
          }
        } else {
          setIsFetchingMoreChat(false);
        }
      }
    }
  };

  // Scroll to bottom function
  const scrollToBottom = () => {
    if (scrollRef.current && !isFetchingMoreChat && isMore) {
      console.log('1');
      setIsMore(false);
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight -  lastHeight;
    } else if(scrollRef.current) {
      console.log('2');
      setIsMore(false);
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const content = (
    <div>
      <OptionDetailRepMessage />
    </div>
  );

  const checkKeyPress = useCallback(
    (e: any) => {
      const { key, keyCode } = e;
      console.log(key, keyCode);
      if (keyCode === 13) {
        submitMessage();
      }
    },
    [valueSubmit.text]
  );

  useEffect(() => {
    setHeaderTitle("Marketing/ Zalo");
    setShowBackButton(true);
    setCurrentPath("/marketing/zalo");
    document.addEventListener("keydown", checkKeyPress);
    return () => {
      document.removeEventListener("keydown", checkKeyPress);
    };
  }, [setHeaderTitle, setShowBackButton, setCurrentPath, pinId]);

  useEffect(() => {
    scrollToBottom();
    setIsGetMore(true);
  }, [listDetailChat]);

  useEffect(() => {
    if (window.innerWidth < 440) {
      setIsMobile(true);
    }
  }, [window.innerWidth]);

  useEffect(() => {
    if (userChating.url_user_sended) {
      (async () => {
        setIsMore(false);
        setIsGetMore(false)
        await getChatDetail("");
      })();
    }
  }, [userChating.url_user_sended]);

  useEffect(() => {
    if (userChating.url_user_sended) {
      (async () => {
        if (scrollRef.current) {
          scrollRef.current.addEventListener("scroll", handleScrollEvent);
        }
      })();
      return () => {
        scrollRef.current.removeEventListener("scroll", handleScrollEvent);
      };
    }
  }, [messages]);

  return (
    <div id="chat-mess" className={styles.mescontainer}>
      {/* sidebar chat */}
      <ChatSidebar
        listChat={listFlowCheckRep}
        changeUrl={(e: string, chat: any) => {
          setIsSend(false);
          handleUrl(e);
          setIsFristIn(true);
          setUserChating({
            name: chat.name_user_sended,
            img: chat.src_img,
            active: chat.check_onl,
            url_user_sended: chat.url_user_sended
          });
        }}
      />
      {/* end sidebar chat */}

      {isFirstIn && (
        <div
          className={styles.meschatbox}
          style={{
            display: isMobile && !isShowRoom ? "none" : "block"
          }}
        >
          <div>
            {" "}
            <div
              style={{
                display: "flex",
                alignContent: "center",
                gap: "5px",
                paddingLeft: "10px"
              }}
            >
              <div
                onClick={() => setIsShowRoom(false)}
                style={{
                  display: isMobile ? "flex" : "none",
                  width: "40px",
                  alignItems: "center"
                }}
              >
                <IconArrowLeft />
              </div>
              <div className={styles.chatheader}>
                <div
                  style={{
                    position: "relative"
                  }}
                >
                  <Image
                    width={50}
                    height={50}
                    style={{
                      borderRadius: "50%"
                    }}
                    src={
                      userChating.img ? userChating.img : "/crm/chat_ava.svg"
                    }
                    alt="ava"
                  />
                  {userChating.active == 1 && (
                    <Image
                      width={13}
                      height={13}
                      src={"/crm/active.svg"}
                      style={{
                        marginLeft: "-12px",
                        position: "absolute",
                        bottom: "8px",
                        right: 0
                      }}
                      alt="status"
                    />
                  )}
                </div>
                <div>
                  <h1>{userChating.name}</h1>
                  <span>
                    {userChating.active == 0 ? "Offline" : "Đang hoạt động"}
                  </span>
                  <span> | </span>
                  <button className={styles.chatHeaderText}>Thư viện</button>
                  <span> | </span>
                  <button className={styles.chatHeaderText}>Tìm kiếm</button>
                  <span> | </span>
                </div>
              </div>
            </div>
            {/* list chat */}
            <div
              ref={scrollRef}
              className={styles.chatarea}
              style={
                {
                  //  paddingBottom: valueSubmit.data_img.length > 0  ? : ''
                }
              }
            >
              <div
              ref={scrollMessageRef}
                style={{
                  width: "100%",
                  gap: "10px",
                  height: 'auto'
                  // height: "-webkit-fill-available"
                }}
              >
                {listDetailChat && listDetailChat.length > 0 && !isFetchingDetail ? (
                  listDetailChat.map((chat: any) => (
                    <div
                      className={`${styles.message} ${
                        chat.id_mess == 0 ? styles.chat_of_me : ""
                      }`}
                      style={{
                        display: "flex",
                        gap: "8px",
                        marginTop: chat.sent_time ? "30px" : ""
                      }}
                    >
                      {chat.id_mess == 1 && (
                        <img
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            display: chat.check_img == 1 ? "flex" : "none"
                          }}
                          src={
                            userChating.img
                              ? userChating.img
                              : "/crm/chat_ava.svg"
                          }
                        />
                      )}
                      <div
                        className={styles.name_and_time}
                        style={{
                          flexDirection: "column",
                          alignItems:
                            chat.id_mess == 1 ? "flex-start" : "flex-end"
                        }}
                      >
                        <p
                          style={{
                            textAlign: chat.id_mess == 1 ? "start" : "end",
                            display: chat.check_img == 1 ? "flex" : "none"
                          }}
                        >
                          {chat.id_mess == 1 ? userChating.name : user.name}{" "}
                          <span>{chat.sent_time}</span>
                        </p>

                        {chat.type == "text" && chat.mess.length > 0 && (
                          <div
                            className={styles.detail_options}
                            style={{
                              position: "relative"
                            }}
                          >
                            <p
                              className={`${styles.mess_text} ${
                                chat.id_mess == 1
                                  ? styles.border_left
                                  : styles.border_right
                              }`}
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                marginLeft: chat.check_img == 0 ? "46px" : ""
                              }}
                            >
                              {chat.mess.trim()}
                            </p>
                            <div
                              className={styles.options}
                              style={{
                                position: "absolute",
                                right: chat.id_mess !== 0 ? "-24px" : "",
                                left: chat.id_mess == 0 ? "-24px" : "",
                                paddingRight: "8px",
                                top: "-5px",
                                display: "none",
                                width: "24px",
                                height: "100%"
                              }}
                            >
                              <Popover
                                content={content}
                                title=""
                                trigger="click"
                              >
                                <img
                                  src="/crm/3dots_2.svg"
                                  width={20}
                                  height={20}
                                  alt={"icon-three-dot"}
                                />
                              </Popover>
                            </div>
                          </div>
                        )}
                        {chat.sent_time && (
                          <p
                            style={{
                              position: "absolute",
                              right: chat.id_mess == 0 ? "45%" : "",
                              left: chat.id_mess == 1 ? "45%" : "",
                              top: "-18.1%"
                            }}
                          >
                            {chat.sent_time}
                          </p>
                        )}
                      </div>
                      {chat.type == "img" &&
                        chat.url_img.map((img: string) => (
                          <div
                            className={styles.detail_options}
                            style={{
                              position: "relative"
                            }}
                          >
                            <img
                              style={{
                                borderRadius: "10px"
                              }}
                              width={200}
                              height={150}
                              src={img}
                              alt={img}
                            ></img>
                            <div
                              className={styles.options}
                              style={{
                                position: "absolute",
                                right: chat.id_mess !== 0 ? "-24px" : "",
                                left: chat.id_mess == 0 ? "-24px" : "",
                                paddingRight: "8px",
                                top: "-5px",
                                display: "none",
                                width: "24px",
                                height: "100%"
                              }}
                            >
                              <Popover
                                content={content}
                                title=""
                                trigger="click"
                              >
                                <img
                                  src="/crm/3dots_2.svg"
                                  width={20}
                                  height={20}
                                  alt={"icon-three-dot"}
                                />
                              </Popover>
                            </div>
                          </div>
                        ))}
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      paddingTop: "30%"
                    }}
                  >
                    <Spin />
                  </div>
                )}
              </div>
            </div>
            {/* end list chat */}
            <div
              className={styles.sentmess}
              style={{
                justifyContent:
                  isFocus || valueSubmit.isHaveValue ? "space-between" : ""
              }}
            >
              <div
                className={styles.box_input}
                style={{
                  width: valueSubmit.isHaveValue ? "calc(100% - 40px)" : ""
                }}
              >
                <div
                  className={`${styles.list_img_upload} ${
                    valueSubmit.data_img.length == 0 ? "" : styles.list_img_have
                  }`}
                >
                  {valueSubmit.data_img.length > 0 &&
                    valueSubmit.data_img.map((img: any, index: number) => (
                      <div>
                        <div
                          style={{
                            display: "flex",
                            position: "relative",
                            width: "100px",
                            height: "100px"
                          }}
                        >
                          <img
                            width={100}
                            height={100}
                            style={{
                              borderRadius: "4px"
                            }}
                            src={img}
                            alt="anime"
                          ></img>
                          <div
                            className={styles.close_img_submit}
                            onClick={() => {
                              const newDataImg = valueSubmit.data_img;
                              const newUrlImg = valueSubmit.url_img;
                              newUrlImg.splice(index, 1);
                              newDataImg.splice(index, 1);
                              setValueSubmit((pre: any) => ({
                                ...pre,
                                data_img: newDataImg,
                                url_img: newUrlImg,
                                isHaveValue:
                                  newDataImg.length > 0 ? true : false
                              }));
                            }}
                          >
                            <Close className={styles.icon_close} />
                          </div>
                        </div>
                      </div>
                    ))}
                  <div
                    className={styles.list_img_upload_close}
                    onClick={() =>
                      setValueSubmit({
                        text: valueSubmit.text,
                        url_img: [],
                        data_img: [],
                        isHaveValue: false
                      })
                    }
                  >
                    <Close className={styles.icon_close} />
                  </div>
                  <div
                    className={styles.add_img}
                    onClick={() => {
                      if (inputFileRef.current) {
                        inputFileRef.current.click();
                      }
                    }}
                  >
                    <Plus />
                  </div>
                </div>
                <Input
                  ref={inputRef}
                  className={`${
                    valueSubmit.data_img.length > 0
                      ? styles.change_background_input
                      : ""
                  }`}
                  placeholder="Nhập tin nhắn"
                  style={{
                    width: "100%",
                    borderRadius: "50px",
                    flex: "1 0 0",
                    gap: "10px"
                  }}
                  onKeyDown={checkKeyPress}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  value={valueSubmit.text}
                  onChange={(e) => {
                    if (e.target.value.length > 0) {
                      setValueSubmit((pre: any) => ({
                        ...pre,
                        text: e.target.value,
                        isHaveValue: true
                      }));
                    } else {
                      setValueSubmit((pre: any) => ({
                        ...pre,
                        text: e.target.value,
                        isHaveValue: false
                      }));
                    }
                  }}
                  prefix={
                    <Image
                      alt={userChating.name}
                      src={"/crm/emoji.svg"}
                      width={24}
                      height={25}
                    />
                  }
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-40%)",
                    right: "20px"
                  }}
                  onClick={() => submitMessage()}
                ></div>
              </div>

              <div
                style={{
                  display: isFocus || valueSubmit.isHaveValue ? "flex" : "none"
                }}
                className={styles.box_wrapper_send}
              >
                <Button
                  onClick={() => submitMessage()}
                  className={styles.send_mess}
                  shape="circle"
                  style={{ backgroundColor: "#E6E9FD" }}
                >
                  <IConSendMessage />
                </Button>
              </div>
              <div
                className={styles.list_action}
                style={{
                  display: isFocus || valueSubmit.isHaveValue ? "none" : "flex"
                }}
              >
                <input
                  ref={inputFileRef}
                  type="file"
                  style={{
                    visibility: "hidden",
                    width: "0px"
                  }}
                  onChange={(e) => handleFileChange(e)}
                ></input>
                <Button
                  onClick={() => {
                    if (inputFileRef.current) {
                      inputFileRef.current.click();
                    }
                  }}
                  shape="circle"
                  style={{ backgroundColor: "#E6E9FD" }}
                >
                  {" "}
                  <Image
                    width={22}
                    height={22}
                    src="/crm/import-file.svg"
                    alt="emo"
                  />{" "}
                </Button>
                <Button shape="circle" style={{ backgroundColor: "#E6E9FD" }}>
                  {" "}
                  <Image
                    width={22}
                    height={22}
                    src="/crm/contact.svg"
                    alt="emo"
                  />{" "}
                </Button>
                <Button shape="circle" style={{ backgroundColor: "#E6E9FD" }}>
                  {" "}
                  <Image
                    width={22}
                    height={22}
                    src="/crm/microphone1.svg"
                    alt="emo"
                  />{" "}
                </Button>
                <button>
                  <Image
                    src="/crm/Group 629325.svg"
                    width={32}
                    height={32}
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZaloMess;
