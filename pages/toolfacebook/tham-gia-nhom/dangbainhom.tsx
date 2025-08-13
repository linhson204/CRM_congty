import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import Head from "next/head";
import { useContext, useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaNewspaper } from "react-icons/fa6";

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

  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  const handlePostSubmit = () => {
    if (postContent.trim() === "") return;

    const newPost: Post = {
      id: Date.now(),
      content: postContent,
      author: "Bạn",
      timestamp: new Date().toLocaleString(),
      likes: 0,
      comments: 0,
    };

    setPosts([newPost, ...posts]);
    setPostContent("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlePostSubmit();
    }
  };

  useEffect(() => {
    const samplePosts: Post[] = [
      {
        id: 1,
        content: "Chào mừng bạn đến với trang đăng bài mẫu! 🚀",
        author: "Nguyễn Văn A",
        timestamp: "13/08/2025 09:30",
        likes: 12,
        comments: 3,
      },
      {
        id: 2,
        content: "Hôm nay thời tiết đẹp quá, ai đi cafe không? ☕️",
        author: "Trần Thị B",
        timestamp: "12/08/2025 16:15",
        likes: 8,
        comments: 2,
      },
    ];
    setPosts(samplePosts);
  }, []);

  useEffect(() => {
    setHeaderTitle("Bảng tin");
    setShowBackButton(true);
    setCurrentPath("/toolfacebook/newsfeed");
  }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

  useEffect(() => {
    if (isOpen) {
      mainRef.current?.style.setProperty("margin-left", "240px");
    } else {
      mainRef.current?.style.removeProperty("margin-left");
    }
  }, [isOpen]);

  const styles = {
    main: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
    },
    container: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      maxWidth: "800px",
      margin: "0 auto",
    },
    title: { fontSize: "18px", fontWeight: "bold", marginBottom: "20px" },
    postInputContainer: {
      marginBottom: "20px",
      backgroundColor: "#f9f9f9",
      padding: "10px",
      borderRadius: "8px",
    },
    textarea: {
      width: "100%",
      border: "1px solid #ddd",
      borderRadius: "6px",
      padding: "10px",
      fontSize: "14px",
      resize: "none",
    },
    postActions: { marginTop: "10px", textAlign: "right" },
    postButton: {
      backgroundColor: "#1877f2",
      color: "#fff",
      border: "none",
      padding: "8px 14px",
      borderRadius: "6px",
      fontSize: "14px",
      cursor: "pointer",
    },
    postButtonDisabled: { backgroundColor: "#ccc", cursor: "not-allowed" },
    postsTitle: { fontSize: "16px", fontWeight: "bold", marginBottom: "10px" },
    postCard: {
      backgroundColor: "#fff",
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "10px",
      border: "1px solid #eee",
      transition: "box-shadow 0.3s ease",
    },
    postHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "8px",
    },
    postAuthor: { display: "flex", alignItems: "center", gap: "8px" },
    authorAvatar: {
      backgroundColor: "#1877f2",
      color: "#fff",
      width: "36px",
      height: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      fontWeight: "bold",
    },
    postTime: { fontSize: "12px", color: "#888" },
    postContent: { margin: "10px 0", fontSize: "14px" },
    postStats: {
      fontSize: "12px",
      color: "#555",
      display: "flex",
      gap: "12px",
    },
    emptyState: {
      textAlign: "center",
      padding: "40px 0",
      color: "#888",
    },
    emptyIcon: { fontSize: "40px", marginBottom: "10px" },
    pinnedBadge: {
      backgroundColor: "#ff9800",
      color: "#fff",
      fontSize: "12px",
      padding: "2px 6px",
      borderRadius: "4px",
    },
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>Bảng tin</title>
        <meta name="description" content="Đăng bài giống Facebook" />
      </Head>

      <div ref={mainRef} style={styles.main}>
        <div style={styles.container}>
          <div style={styles.title}>Bảng tin - Tài Khoản FB: Nguyen Van A</div>

          {/* Form đăng bài */}
          <div style={styles.postInputContainer}>
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Bạn đang nghĩ gì?"
              style={styles.textarea}
              rows={4}
            />
            <div style={styles.postActions}>
              <button
                onClick={handlePostSubmit}
                disabled={!postContent.trim()}
                style={{
                  ...styles.postButton,
                  ...(postContent.trim() ? {} : styles.postButtonDisabled),
                }}
              >
                Đăng
              </button>
            </div>
          </div>

          {/* Danh sách bài viết */}
          <h3 style={styles.postsTitle}>Bài viết mới nhất</h3>
          {posts.map((post) => (
            <div
              key={post.id}
              style={styles.postCard}
              onMouseOver={(e) =>
                ((e.currentTarget.style.boxShadow =
                  "0 2px 8px rgba(0,0,0,0.1)"))
              }
              onMouseOut={(e) =>
                ((e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"))
              }
            >
              <div style={styles.postHeader}>
                <div style={styles.postAuthor}>
                  <div style={styles.authorAvatar}>
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h4>{post.author}</h4>
                    <p style={styles.postTime}>{post.timestamp}</p>
                  </div>
                </div>
                {post.isPinned && <span style={styles.pinnedBadge}>Ghim</span>}
                <button
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  <BsThreeDotsVertical size={20} />
                </button>
              </div>
              <div style={styles.postContent}>{post.content}</div>
              <div style={styles.postStats}>
                <span>{post.likes} lượt thích</span>
                <span>{post.comments} bình luận</span>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div style={styles.emptyState}>
              <FaNewspaper style={styles.emptyIcon} />
              <h3>Chưa có bài viết nào</h3>
              <p>Hãy là người đầu tiên đăng bài!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
