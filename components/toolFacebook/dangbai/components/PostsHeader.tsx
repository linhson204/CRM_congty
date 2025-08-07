import React from "react";

interface PostsHeaderProps {
  postsLength: number;
  isLoadingPosts: boolean;
  onRefreshPosts: () => void;
}

export const PostsHeader: React.FC<PostsHeaderProps> = ({
  postsLength,
  isLoadingPosts,
  onRefreshPosts,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
        paddingBottom: "12px",
        borderBottom: "2px solid #e0e0e0",
      }}
    >
      <h2
        style={{
          fontSize: "18px",
          fontWeight: "600",
          margin: 0,
          color: "#333",
        }}
      >
        Danh sách bài đăng
      </h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <button
          onClick={onRefreshPosts}
          style={{
            background: "none",
            border: "1px solid #007bff",
            color: "#007bff",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
          disabled={isLoadingPosts}
        >
          ↻ Làm mới
        </button>
        {isLoadingPosts && (
          <span style={{ fontSize: "12px", color: "#666" }}>Đang tải...</span>
        )}
        <span
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "4px 12px",
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          {postsLength || 0} bài
        </span>
      </div>
    </div>
  );
};
