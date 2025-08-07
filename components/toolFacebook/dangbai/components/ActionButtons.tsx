import React from "react";

interface ActionButtonsProps {
  isCurrentAccountCrawling: () => boolean;
  postsLength: number;
  onOpenModal: () => void;
  onCrawlComments: () => void;
  stylesContract: any;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  isCurrentAccountCrawling,
  postsLength,
  onOpenModal,
  onCrawlComments,
  stylesContract,
}) => {
  return (
    <div style={{ display: "flex", gap: "12px" }}>
      <button
        onClick={onOpenModal}
        disabled={isCurrentAccountCrawling()}
        className={stylesContract.sub2}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 24px",
          fontSize: "14px",
          justifyContent: "center",
          opacity: isCurrentAccountCrawling() ? 0.6 : 1,
          cursor: isCurrentAccountCrawling() ? "not-allowed" : "pointer",
          minWidth: "160px",
        }}
      >
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>
          {isCurrentAccountCrawling() ? "🔄" : "+"}
        </span>
        {isCurrentAccountCrawling() ? "Đang cào comment..." : "Đăng bài mới"}
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
  );
};
