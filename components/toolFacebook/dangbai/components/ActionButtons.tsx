import React from "react";

interface ActionButtonsProps {
  isCurrentAccountCrawling: () => boolean;
  postsLength: number;
  onOpenModal: () => void;
  onCrawlComments: () => void;
  stylesContract: any;
  canPost: () => boolean;
  getTimeUntilNextPost: () => number;
  formatTimeRemaining: (milliseconds: number) => string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  isCurrentAccountCrawling,
  postsLength,
  onOpenModal,
  onCrawlComments,
  stylesContract,
  canPost,
  getTimeUntilNextPost,
  formatTimeRemaining,
}) => {
  const timeUntilNext = getTimeUntilNextPost();
  const isDisabled = isCurrentAccountCrawling() || !canPost();

  return (
    <div style={{ display: "flex", gap: "12px", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: "12px" }}>
        <button
          onClick={onOpenModal}
          disabled={isDisabled}
          className={stylesContract.sub2}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            fontSize: "14px",
            justifyContent: "center",
            opacity: isDisabled ? 0.6 : 1,
            cursor: isDisabled ? "not-allowed" : "pointer",
            minWidth: "160px",
          }}
        >
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            {isCurrentAccountCrawling() ? "🔄" : !canPost() ? "⏰" : "+"}
          </span>
          {isCurrentAccountCrawling()
            ? "Đang cào comment..."
            : !canPost()
            ? "Chờ để đăng bài"
            : "Đăng bài mới"}
        </button>

        <button
          onClick={onCrawlComments}
          disabled={isCurrentAccountCrawling() || !postsLength}
          className={stylesContract.sub2}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            fontSize: "14px",
            justifyContent: "center",
            opacity: isCurrentAccountCrawling() || !postsLength ? 0.6 : 1,
            cursor:
              isCurrentAccountCrawling() || !postsLength
                ? "not-allowed"
                : "pointer",
            backgroundColor: "#28a745",
            borderColor: "#28a745",
            minWidth: "160px",
          }}
        >
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            {isCurrentAccountCrawling() ? "🔄" : "🔍"}
          </span>
          {isCurrentAccountCrawling() ? "Đang cào..." : "Cào comment"}
        </button>
      </div>

      {/* Hiển thị thời gian chờ nếu không thể đăng bài */}
      {!canPost() && timeUntilNext > 0 && (
        <div
          style={{
            padding: "8px 12px",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffeaa7",
            borderRadius: "4px",
            fontSize: "13px",
            color: "#856404",
            textAlign: "center",
          }}
        >
          ⏰ Chờ <strong>{formatTimeRemaining(timeUntilNext)}</strong> nữa để
          đăng bài tiếp theo
        </div>
      )}
    </div>
  );
};
