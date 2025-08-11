import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import styles from "@/components/crm/potential/potential.module.css";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPaperPlane, FaSearch } from 'react-icons/fa';
import { FaComments } from 'react-icons/fa6';
import style from './styles.module.css';

// fetch data prepare
interface Conversations {
  id: number;
  sender: string;
  last_message: string;
  last_message_time: string;
  last_5_messages: messages[];
  Active?: boolean;
}

interface messages {
  id?: number;
  sender: string;
  content: string;
  repiledCont?: string;
  repliedTo?: string;
  timestamp?: string;
  isMe?: boolean;
}

export default function MessagingPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any = useHeader();
  const router = useRouter();
  const [currentMessage, setCurrentMessage] = useState("");
  const [activeUser, setActiveUser] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [convers, setConvers] = useState<Conversations[]>([]);
  const [mess, setMess] = useState <messages[]>([]);
  const [search, setSearch] = useState('');

  const handleSendMessage = () => { //gui tin nhan -> them phan tra data cho tool de gui lai (api?)
    if (currentMessage.trim() === "") return;
    
    const newMessage: messages = {
      id: mess.length + 1,
      sender: "Tôi",
      content: currentMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };
    
    setMess([...mess, newMessage]);
    setCurrentMessage("");
    
    // Simulate reply after 1 second
    setTimeout(() => {
      const replyMessage: messages = {
        id: mess.length + 2,
        sender: convers.find(u => u.id === activeUser)?.sender || "User",
        content: `Đây là phản hồi tự động cho: "${currentMessage}"`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false,
      };
      setMess(prev => [...prev, replyMessage]);
    }, 1000);
  };

  const filteredUser = convers.filter((conver) => {
    const nameMatch = search.trim() === '' || 
    conver.sender.replace(/\s+/g, '').toLowerCase()
    .includes(search.replace(/\s+/g, '').toLowerCase());
    return nameMatch;
  });

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Cách 1: Nếu file JSON trong public folder
        const response = await fetch('../../data/message.json');
        
        // Cách 2: Nếu import trực tiếp
        // const data = await import('@/data/accountjson.json');
        
        if (!response.ok) throw new Error('Failed to fetch data');
        const rawData = await response.json();
        
        // Kiểm tra cấu trúc dữ liệu
        if (!Array.isArray(rawData)) {
          throw new Error('Invalid data format: Expected array');
        }

        //format
        const formatted = rawData.map(obj => {
          const id = Object.keys(obj)[0];
          return {
            id,
            ...obj[id]
          }
        });
        
        // Cập nhật state với dữ liệu đã kiểm tra
        // setConvers(data.map(user => ({
        //   ...user,
        //   last_5_messages: user.last_5_messages || [] // Đảm bảo groups luôn là mảng
        // })));

        setConvers(formatted);
        
      } catch (error) {
        console.error('Error loading user data:', error);
        // Xử lý lỗi (hiển thị thông báo, v.v.)
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [mess]);

  useEffect(() => {
    setHeaderTitle("Tool Facebook - Nhắn tin");
    setShowBackButton(false);
    setCurrentPath("/toolfacebook/nhan-tin");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  console.log(convers)

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Tool Facebook - Nhắn tin</title>
        <meta name="description" content="Nhắn tin với các tài khoản Facebook" />
      </Head>
      
      <div className={styleHome.main} ref={mainRef}>
        <div className={styles.main_importfile}>
          <div className={styles.info_step}>
            <div className={styles.main__title}>Tool Facebook - NHẮN TIN - Tài Khoản FB đang sử dụng: Nguyen Van A</div>
            <div className={styles.form_add_potential}>
              <div className={`${styles.main__body} ${style.messagingContainer}`}>
                <div className={style.userList}>
                  <div className={style.searchContainer}>
                    <FaSearch className={style.searchIcon} />
                    <input 
                      type="text" 
                      placeholder="Tìm kiếm tài khoản..."
                      className={style.searchInput}
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                  </div>
                  
                  {/* sidebar list tai khoan */}
                  {filteredUser.map(user => (
                    <div 
                      key={user.id}
                      className={`${style.userItem} ${activeUser === user.id ? style.activeUser : ''}`}
                        onClick={() => {setActiveUser(user.id); setMess(user.last_5_messages || []);}}
                    >
                      <div className={style.avatarContainer}>
                        <div className={style.avatar}>
                          {user.sender.charAt(0)}
                        </div>
                        {user.Active && <div className={style.onlineIndicator}></div>}
                      </div>
                      <div className={style.userInfo}>
                        <div className={style.userHeader}>
                          <h3 className={style.userName}>
                            {user.sender}
                          </h3>
                          <span className={style.lastMessageTime}>
                            {user.last_5_messages[0].content.length > 15 ? 
                              user.last_5_messages[0].content.substring(0, 15) + '...' : 
                              user.last_5_messages[0].content}
                          </span>
                        </div>
                        <div className={style.userLastMessage}>
                          <p className={style.messagePreview}>
                            {/* {user.last_message.length > 30 ? 
                              user.last_message.substring(0, 30) + '...' : 
                              user.last_message} */}
                          </p>
                          {/* {user.unread > 0 && (
                            <span className={style.unreadBadge}>
                              {user.unread}
                            </span>
                          )} */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Right side - Chat area */}
                <div className={style.chatArea}>
                  {activeUser ? (
                    <>
                      {/* Chat header */}
                      <div className={style.chatHeader}>
                        <div className={style.chatAvatar}>
                          {convers.find(u => u.id === activeUser)?.sender.charAt(0)}
                        </div>
                        <div className={style.chatUserInfo}>
                          <h3 className={style.chatUserName}>
                            {convers.find(u => u.id === activeUser)?.sender}
                          </h3>
                          <p className={`${style.userStatus} ${
                            convers.find(u => u.id === activeUser)?.Active ? style.online : style.offline
                          }`}>
                            {convers.find(u => u.id === activeUser)?.Active ? 'Online' : 'Offline'}
                          </p>
                        </div>
                        <button className={style.chatOptions}>
                          <BsThreeDotsVertical size={20} />
                        </button>
                      </div>
                      
                      {/* Messages area */}
                      <div className={style.messagesContainer}>
                        {mess.map(message => (
                          <div 
                            key={message.id}
                            className={`${style.messageWrapper} ${
                              message.sender === 'Tôi' ? style.sentMessage : style.receivedMessage
                            }`}
                          >
                            <div className={`${style.messageBubble} ${
                              message.sender === 'Tôi' ? style.sent : style.received
                            }`}>
                              {message.content}
                            </div>
                            <span className={style.messageTime}>
                              {message.timestamp}
                            </span>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                      
                      {/* Message input */}
                      <div className={style.messageInputContainer}>
                        <button className={style.attachButton}>
                          {/* <MdOutlineAttachFile size={24} /> */}
                        </button>
                        <textarea
                          value={currentMessage}
                          onChange={(e) => setCurrentMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Nhập tin nhắn..."
                          className={style.messageInput}
                          rows={1}
                        />
                        <button 
                          onClick={handleSendMessage}
                          disabled={!currentMessage.trim()}
                          className={`${style.sendButton} ${
                            !currentMessage.trim() ? style.disabled : ''
                          }`}
                        >
                          <FaPaperPlane />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className={style.emptyState}>
                      <FaComments className={style.emptyIcon} />
                      <h3 className={style.emptyTitle}>Chọn một cuộc trò chuyện</h3>
                      <p className={style.emptyText}>Bắt đầu trò chuyện với các tài khoản Facebook của bạn</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .userItem:hover {
          background-color: #f5f5f5 !important;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}