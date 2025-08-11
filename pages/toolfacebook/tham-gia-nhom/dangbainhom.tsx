import { SidebarContext } from "@/components/crm/context/resizeContext";
import styleHome from "@/components/crm/home/home.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import styles from "@/components/crm/potential/potential.module.css";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch, FaUsers } from 'react-icons/fa';
import { FaNewspaper } from 'react-icons/fa6';
import style from './styles.module.css';

interface Group {
  id: number;
  name: string;
  memberCount: number;
  isPublic: boolean;
  lastActivity: string;
  posts: Post[];
}

interface Post {
  id: number;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
  comments: number;
  isPinned?: boolean;
}

export default function GroupPostingPage() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { isOpen } = useContext<any>(SidebarContext);
  const { setHeaderTitle, setShowBackButton, setCurrentPath }: any = useHeader();
  const router = useRouter();
  const [postContent, setPostContent] = useState("");
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [search, setSearch] = useState('');

  const handlePostSubmit = () => {
    if (postContent.trim() === "" || !activeGroup) return;
    
    const newPost: Post = {
      id: Date.now(),
      content: postContent,
      author: "Bạn",
      timestamp: new Date().toLocaleString(),
      likes: 0,
      comments: 0
    };

    setGroups(groups.map(group => 
      group.id === activeGroup 
        ? { ...group, posts: [newPost, ...group.posts] }
        : group
    ));
    
    setPostContent("");
  };

  const filteredGroups = groups.filter((group) => {
    const nameMatch = search.trim() === '' || 
      group.name.replace(/\s+/g, '').toLowerCase()
        .includes(search.replace(/\s+/g, '').toLowerCase());
    return nameMatch;
  });

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handlePostSubmit();
    }
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('../../data/groups.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format: Expected array');
        }

        setGroups(data.map(group => ({
          ...group,
          posts: group.posts || []
        })));
        
      } catch (error) {
        console.error('Error loading group data:', error);
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    setHeaderTitle("Tool Facebook - Đăng bài trong nhóm");
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
        <title>Tool Facebook - Đăng bài nhóm</title>
        <meta name="description" content="Đăng bài trong các nhóm Facebook" />
      </Head>
      
      <div className={styleHome.main} ref={mainRef}>
        <div className={styles.main_importfile}>
          <div className={styles.info_step}>
            <div className={styles.main__title}>Tool Facebook - ĐĂNG BÀI - Tài Khoản FB đang sử dụng: Nguyen Van A</div>
            <div className={styles.form_add_potential}>
              <div className={`${styles.main__body} ${style.groupContainer}`}>
                <div className={style.groupList}>
                  <div className={style.searchContainer}>
                    <FaSearch className={style.searchIcon} />
                    <input 
                      type="text" 
                      placeholder="Tìm kiếm nhóm..."
                      className={style.searchInput}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  
                  {filteredGroups.map(group => (
                    <div 
                      key={group.id}
                      className={`${style.groupItem} ${activeGroup === group.id ? style.activeGroup : ''}`}
                      onClick={() => setActiveGroup(group.id)}
                    >
                      <div className={style.groupAvatar}>
                        <FaUsers className={style.groupIcon} />
                      </div>
                      <div className={style.groupInfo}>
                        <div className={style.groupHeader}>
                          <h3 className={style.groupName}>
                            {group.name}
                          </h3>
                          <span className={style.groupType}>
                            {group.isPublic ? 'Công khai' : 'Riêng tư'}
                          </span>
                        </div>
                        <div className={style.groupDetails}>
                          <p className={style.groupMembers}>
                            {group.memberCount} thành viên
                          </p>
                          <p className={style.groupActivity}>
                            Hoạt động gần nhất: {group.lastActivity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className={style.postingArea}>
                  {activeGroup ? (
                    <>
                      <div className={style.groupHeader}>
                        <div className={style.groupTitle}>
                          <h2>{groups.find(g => g.id === activeGroup)?.name}</h2>
                          <span className={style.groupStatus}>
                            {groups.find(g => g.id === activeGroup)?.isPublic ? 'Công khai' : 'Riêng tư'}
                          </span>
                        </div>
                        <button className={style.groupOptions}>
                          <BsThreeDotsVertical size={20} />
                        </button>
                      </div>
                      
                      <div className={style.postInputContainer}>
                        <textarea
                          value={postContent}
                          onChange={(e) => setPostContent(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Bạn muốn đăng gì trong nhóm này?"
                          className={style.postInput}
                          rows={4}
                        />
                        <div className={style.postActions}>
                          <button 
                            onClick={handlePostSubmit}
                            disabled={!postContent.trim()}
                            className={`${style.postButton} ${
                              !postContent.trim() ? style.disabled : ''
                            }`}
                          >
                            Đăng bài
                          </button>
                        </div>
                      </div>
                      
                      <div className={style.postsContainer}>
                        <h3 className={style.postsTitle}>Bài viết trong nhóm</h3>
                        {groups.find(g => g.id === activeGroup)?.posts.map(post => (
                          <div key={post.id} className={style.post}>
                            <div className={style.postHeader}>
                              <div className={style.postAuthor}>
                                <div className={style.authorAvatar}>
                                  {post.author.charAt(0)}
                                </div>
                                <div>
                                  <h4>{post.author}</h4>
                                  <p className={style.postTime}>{post.timestamp}</p>
                                </div>
                              </div>
                              {post.isPinned && (
                                <span className={style.pinnedBadge}>Ghim</span>
                              )}
                            </div>
                            <div className={style.postContent}>
                              {post.content}
                            </div>
                            <div className={style.postStats}>
                              <span>{post.likes} lượt thích</span>
                              <span>{post.comments} bình luận</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className={style.emptyState}>
                      <FaNewspaper className={style.emptyIcon} />
                      <h3 className={style.emptyTitle}>Chọn một nhóm</h3>
                      <p className={style.emptyText}>Đăng bài hoặc xem bài viết trong các nhóm bạn tham gia</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .groupItem:hover {
          background-color: #f5f5f5 !important;
        }
        
        .post {
          transition: all 0.3s ease;
        }
        
        .post:hover {
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
      `}</style>
    </>
  );
}