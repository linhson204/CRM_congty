import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import styles from "@/components/crm/potential/potential.module.css";
import Head from "next/head";
import { useContext, useEffect, useRef, useState } from 'react';

interface Groups {
    id: number;
    GroupName: string;
    GroupState: string;
    Member: number;
    State: string;
}

export default function DangBai() {
    const mainRef = useRef<HTMLDivElement>(null);
    const { isOpen } = useContext<any>(SidebarContext);
    const { setHeaderTitle, setShowBackButton, setCurrentPath }: any = useHeader();


    const [groups, setGroups] = useState<Groups[]>([]);
    useEffect(() => {
    fetch('../../api/UserDataTest')
        .then(res => res.json())
        .then(data => setGroups(data));
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [postContent, setPostContent] = useState('');
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [showCommentModal, setShowCommentModal] = useState<number | null>(null);
    const [commentContent, setCommentContent] = useState('');
    const [showReplyModal, setShowReplyModal] = useState<{postId: number, commentId: number, replyToAuthor?: string, replyId?: number, facebookCommentId?: string, facebookReplyId?: string} | null>(null);
    const [replyContent, setReplyContent] = useState('');
    const [websocket, setWebsocket] = useState<WebSocket | null>(null);

    
    useEffect(() => {
        setHeaderTitle("Tool Facebook - Danh Sách Tài Khoản");
        setShowBackButton(false);
        setCurrentPath("/toolfacebook/tham-gia-nhom");
    }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

    useEffect(() => {
        if (isOpen) {
        mainRef.current?.classList.add("content_resize");
        } else {
        mainRef.current?.classList.remove("content_resize");
        }
    }, [isOpen]);

    const formatTimestamp = (timestamp: string) => {
        return new Date(timestamp).toLocaleString('vi-VN');
    };

    return (
        <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="robots" content="noindex,nofollow" />
            <title>Tool Facebook - HomePage</title>
            <meta name="description" content="Quản lý và đăng bài lên Facebook" />
        </Head>
        
        <div className={styleHome.main} ref={mainRef}>
            <div className={styles.main_importfile}>
            <div className={styles.formInfoStep}>
                <div className={styles.info_step}>
                <div className={styles.main__title}>Tool Facebook - DANH SÁCH TÀI KHOẢN</div>
                <div className={styles.form_add_potential}>
                    {/* Header danh sách */}
                    <div className={styles.main__body}>
                        {/* Title + BackButton (chuanavigate) */}
                        <div style={{marginTop:'10px', position:'relative', display:'flex'}}>
                            <p style={{
                                fontSize: '30px',
                                float: 'left',
                                width: 'fit-content',
                            }}>
                                CHI TIẾT TÀI KHOẢN
                            </p>
                            <button style={{
                                background: '#4c5bd4',
                                boxShadow: '0px 0px 10px rgb(0 0 0 / 10%)',
                                borderRadius: '10px',
                                padding: '9px 21px',
                                color: '#ffffff',
                                fontFamily: "Roboto-Medium",
                                fontSize: '16px',
                                lineHeight: '19px',
                                columnGap: '5px',
                                marginLeft: 'auto',
                                }}>
                                Quay lại
                            </button>
                        </div>
                    </div>
                    {/* Name + GroupIn/NotIn */}
                    <div style={{display: 'flex', flexDirection: 'row', marginTop: '20px'}}>
                        <div>
                            <i></i>
                            <div>Name</div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', marginLeft: 'auto'}}>
                            <div>Số nhóm chưa tham gia</div>
                            <div>Số nhóm đã tham gia</div>
                        </div>
                    </div>
                    {/* List Nhóm */}
                    <div>Find</div> {/* Search Bar */}
                    <div style={{height: '200px', overflowY: 'auto', background: '#ffc', padding: '10px', display: 'flex', flexDirection: 'column'}}>
                        {groups.map(group => (
                            <div
                                key={group.id}
                                style={{
                                    width: '95%', 
                                    height: '100px', 
                                    display: "flex", 
                                    border: '1px solid black',
                                    borderRadius: '10px',
                                    padding: '5px 15px 5px 15px',
                                    marginTop: '10px'
                                    }}>
                                    <div style={{display: 'flex', flexDirection: 'column', height: '100%', width: 'fit-content'}}>
                                        <h3 style={{fontSize: '30px'}}>{group.GroupName}</h3>
                                        <div style={{display: 'flex', flexDirection: 'row', marginTop: 'auto'}}>
                                            <h2>{group.GroupState}</h2>
                                            <h2 style={{marginLeft: 'auto'}}>{group.Member}</h2>
                                        </div>
                                    </div>
                                    <div style={{float: 'right', marginLeft: 'auto', display: 'flex', flexDirection: 'column'}}>
                                        <h2>{group.State}</h2>
                                        <button style={{
                                            background: '#4c5bd4',
                                            boxShadow: '0px 0px 10px rgb(0 0 0 / 10%)',
                                            borderRadius: '10px',
                                            padding: '9px 21px',
                                            color: '#ffffff',
                                            fontFamily: "Roboto-Medium",
                                            fontSize: '16px',
                                            lineHeight: '19px',
                                            columnGap: '5px',
                                            marginLeft: 'auto',
                                            marginTop: 'auto'
                                            }}>
                                            Tham gia
                                        </button>
                                    </div>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>

        <style jsx>{`
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
