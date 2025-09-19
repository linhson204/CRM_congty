import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import styles from "@/components/crm/potential/potential.module.css";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import TableOfContent from "../components/TableOfContent";
import style from './test.module.css';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const savedData = JSON.parse(localStorage.getItem("userProfile"));

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

  const handleIconClick = () => {
    fileInputRef.current?.click();
  }

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
    setShowBackButton(true);
    setCurrentPath("/toolfacebook/tham-gia-nhom/HomePage");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Tool Facebook - TEST</title>
        <meta name="description" content="Nhắn tin với các tài khoản Facebook" />
      </Head>
      
      <div className={styleHome.main} ref={mainRef}>
        <div className={styles.main_importfile}>
          <div className={styles.info_step}>
            <div className={styles.main__title}>TRANG TEST</div>
            <div className={styles.form_add_potential}>
              <div className={`${styles.main__body} ${style.messagingContainer}`}>
                <div className={style.userList}>
                    <TableOfContent
                        attributes={['a','b']}
                    ></TableOfContent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}