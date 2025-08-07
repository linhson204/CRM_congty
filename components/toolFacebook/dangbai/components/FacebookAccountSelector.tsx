import React from "react";
import { FacebookAccount } from "../types";

interface FacebookAccountSelectorProps {
  selectedFacebookAccount: FacebookAccount;
  facebookAccounts: FacebookAccount[];
  crawlingStatus: {
    [facebookId: string]: {
      isActive: boolean;
      message: string;
      timestamp?: string;
    };
  };
  isCurrentAccountCrawling: () => boolean;
  getCurrentCrawlingMessage: () => string;
  onAccountChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const FacebookAccountSelector: React.FC<
  FacebookAccountSelectorProps
> = ({
  selectedFacebookAccount,
  facebookAccounts,
  crawlingStatus,
  isCurrentAccountCrawling,
  getCurrentCrawlingMessage,
  onAccountChange,
}) => {
  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "16px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
      }}
    >
      <div
        style={{
          marginBottom: "8px",
          fontSize: "14px",
          fontWeight: "600",
          color: "#333",
        }}
      >
        Chọn tài khoản Facebook:
      </div>
      <select
        value={selectedFacebookAccount.facebookId}
        onChange={onAccountChange}
        style={{
          width: "100%",
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "14px",
          backgroundColor: "white",
          cursor: "pointer",
        }}
      >
        {facebookAccounts.map((account) => (
          <option key={account.facebookId} value={account.facebookId}>
            {account.userNameFb} ({account.facebookId})
            {crawlingStatus[account.facebookId]?.isActive
              ? " - 🔄 Đang cào..."
              : ""}
          </option>
        ))}
      </select>

      {/* Hiển thị crawling status */}
      {isCurrentAccountCrawling() && (
        <div
          style={{
            marginTop: "8px",
            padding: "8px 12px",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffeaa7",
            borderRadius: "4px",
            fontSize: "12px",
            color: "#856404",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span style={{ animation: "spin 1s linear infinite" }}>🔄</span>
          <span>
            <strong>Đang cào comment:</strong> {getCurrentCrawlingMessage()}
          </span>
        </div>
      )}

      {/* Hiển thị thông tin account được chọn */}
      <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>
        <div>
          <strong>Trang:</strong> {selectedFacebookAccount.userNameFb}
        </div>
        <div>
          <strong>Link:</strong>{" "}
          <a
            href={selectedFacebookAccount.userLinkFb}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#007bff" }}
          >
            {selectedFacebookAccount.userLinkFb}
          </a>
        </div>
        <div>
          <strong>ID:</strong> {selectedFacebookAccount.facebookId}
        </div>
      </div>
    </div>
  );
};
