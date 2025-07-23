import React, { useState, useEffect, useContext, useRef } from 'react';
import Cookies from 'js-cookie';
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/potential/potential.module.css";
import stylesContract from "@/components/crm/contract/contract_action.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import Head from "next/head";

interface Post {
  id: number;
  content: string;
  author: string;
  authorId: string;
  timestamp: string;
}

export default function DangBai() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any = useHeader();

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      content: "Đây là bài đăng mẫu đầu tiên về việc làm tại công ty.",
      author: "Nguyễn Văn A",
      authorId: "user123",
      timestamp: "2024-01-20 10:30:00"
    },
    {
      id: 2,
      content: "Chúng tôi đang tuyển dụng các vị trí lập trình viên với mức lương hấp dẫn.",
      author: "Trần Thị B",
      authorId: "user456",
      timestamp: "2024-01-19 15:45:00"
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    setHeaderTitle("Tool Facebook - Đăng bài");
    setShowBackButton(false);
    setCurrentPath("/toolfacebook/dang-bai");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.classList.add("content_resize");
    } else {
      mainRef.current?.classList.remove("content_resize");
    }
  }, [isOpen]);

  // Khởi tạo WebSocket connection
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');
    
    ws.onopen = () => {
      console.log('WebSocket connected');
      // Đăng ký role A
      ws.send(JSON.stringify({
        type: 'register',
        role: 'A'
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('WebSocket message received:', data);
      
      if (data.type === 'post_sent') {
        console.log('Post sent successfully with ID:', data.postId);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setWebsocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPostContent('');
  };

  const handleSubmit = () => {
    if (postContent.trim()) {
      const userID = Cookies.get('userId') || 'anonymous';
      const userName = Cookies.get('userName') || 'Người dùng';
      
      console.log('Nội dung bài đăng:', postContent);
      console.log('User ID:', userID);

      // Tạo bài đăng mới
      const newPost: Post = {
        id: Date.now(),
        content: postContent,
        author: userName,
        authorId: userID,
        timestamp: new Date().toLocaleString('vi-VN')
      };

      // Thêm bài đăng vào danh sách
      setPosts(prevPosts => [newPost, ...prevPosts]);

      // Gửi dữ liệu qua WebSocket nếu đã kết nối
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        const postData = {
          type: 'post',
          content: postContent,
          authorName: userName,
          authorId: userID,
          attachments: [
            {
              "name": "anh_dep.jpg",
              "type": "image/jpeg",
              "size": 123456,
              "url": "https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg"
            },
            {
              "name": "anh_dep2.jpg",
              "type": "image/jpeg",
              "size": 123456,
              "url": "https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045.jpg"
            }
          ],
          metadata: {
            category: 'job_posting',
            source: 'crm_tool',
            platform: 'facebook',
            action: 'create_post',
            timestamp: new Date().toISOString()
          }
        };

        websocket.send(JSON.stringify(postData));
        console.log('Đã gửi dữ liệu qua WebSocket:', postData);
      }

      handleCloseModal();
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('vi-VN');
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Tool Facebook - Đăng bài</title>
        <meta name="description" content="Quản lý và đăng bài lên Facebook" />
      </Head>
      
      <div className={styleHome.main} ref={mainRef}>
        <div className={styles.main_importfile}>
          <div className={styles.formInfoStep}>
            <div className={styles.info_step}>
              <div className={styles.main__title}>Tool Facebook - Đăng bài</div>
              <div className={styles.form_add_potential}>
                
                {/* Nút đăng bài mới */}
                <div className={styles.main__body} style={{ marginBottom: '20px' }}>
                  <button 
                    onClick={handleOpenModal}
                    className={stylesContract.sub2}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 24px',
                      fontSize: '14px',
                      justifyContent: 'center'
                    }}
                  >
                    <span style={{ fontSize: '16px', fontWeight: 'bold' }}>+</span>
                    Đăng bài mới
                  </button>
                </div>

                {/* Header danh sách */}
                <div className={styles.main__body}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '16px',
                    paddingBottom: '12px',
                    borderBottom: '2px solid #e0e0e0'
                  }}>
                    <h2 style={{ 
                      fontSize: '18px', 
                      fontWeight: '600', 
                      margin: 0,
                      color: '#333'
                    }}>
                      Danh sách bài đăng
                    </h2>
                    <span style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {posts.length} bài
                    </span>
                  </div>

                  {/* Danh sách bài đăng */}
                  <div>
                    {posts.map((post) => (
                      <div key={post.id} style={{
                        background: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        padding: '20px',
                        marginBottom: '16px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}>
                        
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '12px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontWeight: 'bold',
                              fontSize: '16px'
                            }}>
                              {post.author.charAt(0)}
                            </div>
                            <div>
                              <div style={{ 
                                fontWeight: '600', 
                                fontSize: '14px',
                                color: '#1f2937',
                                marginBottom: '2px'
                              }}>
                                {post.author}
                              </div>
                              <div style={{ 
                                fontSize: '12px', 
                                color: '#6b7280' 
                              }}>
                                ID: {post.authorId}
                              </div>
                            </div>
                          </div>
                          
                          <div style={{
                            fontSize: '12px',
                            color: '#9ca3af',
                            backgroundColor: '#f3f4f6',
                            padding: '4px 8px',
                            borderRadius: '6px'
                          }}>
                            {formatTimestamp(post.timestamp)}
                          </div>
                        </div>
                        
                        <div style={{ 
                          lineHeight: '1.6', 
                          color: '#374151',
                          fontSize: '14px',
                          backgroundColor: '#f9fafb',
                          padding: '12px',
                          borderRadius: '8px',
                          borderLeft: '4px solid #3b82f6'
                        }}>
                          {post.content}
                        </div>
                        
                        <div style={{
                          marginTop: '12px',
                          display: 'flex',
                          gap: '8px'
                        }}>
                          <span style={{
                            backgroundColor: '#ecfdf5',
                            color: '#059669',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '500'
                          }}>
                            Facebook
                          </span>
                          <span style={{
                            backgroundColor: '#eff6ff',
                            color: '#2563eb',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '500'
                          }}>
                            Đã đăng
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal đăng bài */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            width: '800px',
            maxWidth: '95vw',
            maxHeight: '85vh',
            overflow: 'hidden',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            animation: 'slideUp 0.3s ease'
          }}>
            
            {/* Header modal */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '24px 24px 0 24px',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div>
                <h3 style={{ 
                  margin: 0, 
                  fontSize: '20px', 
                  fontWeight: '700',
                  color: '#1f2937'
                }}>
                  Tạo bài đăng mới
                </h3>
                <p style={{
                  margin: '4px 0 0 0',
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  Chia sẻ thông tin tuyển dụng với cộng đồng
                </p>
              </div>
              <button 
                onClick={handleCloseModal}
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#6b7280',
                  fontSize: '18px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                  e.currentTarget.style.color = '#374151';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                  e.currentTarget.style.color = '#6b7280';
                }}
              >
                ×
              </button>
            </div>
            
            {/* Body modal */}
            <div style={{ padding: '24px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#374151',
                  fontSize: '14px'
                }}>
                  Nội dung bài đăng
                </label>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Chia sẻ cơ hội việc làm, thông tin tuyển dụng hoặc tin tức về công ty..."
                  rows={10}
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    minHeight: '200px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    lineHeight: '1.5'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                <div style={{
                  textAlign: 'right',
                  marginTop: '8px',
                  fontSize: '12px',
                  color: '#6b7280'
                }}>
                  {postContent.length}/1000 ký tự
                </div>
              </div>
            </div>
            
            {/* Footer modal */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              padding: '0 24px 24px 24px',
              borderTop: '1px solid #e5e7eb',
              paddingTop: '20px'
            }}>
              <button 
                onClick={handleCloseModal}
                className={stylesContract.sub1}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px'
                }}
              >
                Hủy
              </button>
              <button 
                onClick={handleSubmit}
                disabled={!postContent.trim()}
                className={stylesContract.sub2}
                style={{
                  padding: '10px 24px',
                  borderRadius: '8px',
                  opacity: postContent.trim() ? 1 : 0.5,
                  cursor: postContent.trim() ? 'pointer' : 'not-allowed'
                }}
              >
                Đăng bài
              </button>
            </div>
          </div>
        </div>
      )}

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
