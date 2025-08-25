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
  onlineStatus: {
    [facebookId: string]: {
      isOnline: boolean;
      lastSeen?: string;
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
  onlineStatus,
  isCurrentAccountCrawling,
  getCurrentCrawlingMessage,
  onAccountChange,
}) => {
  // Helper function để get online status icon và text
  const getOnlineStatusDisplay = (facebookId: string) => {
    const status = onlineStatus[facebookId];
    if (!status) {
      return { icon: "", text: "Chưa xác định" };
    }

    if (status.isOnline) {
      return { icon: "🟢", text: "Online" };
    } else {
      return { icon: "🔴", text: "Offline" };
    }
  };

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
        {facebookAccounts.map((account) => {
          const onlineDisplay = getOnlineStatusDisplay(account.facebookId);
          return (
            <option key={account.facebookId} value={account.facebookId}>
              {onlineDisplay.icon} {account.userNameFb} ({account.facebookId})
              {crawlingStatus[account.facebookId]?.isActive
                ? " - 🔄 Đang cào..."
                : ""}
            </option>
          );
        })}
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
          <strong>Tên Fb:</strong> {selectedFacebookAccount.userNameFb}
        </div>
        <div>
          <strong>Fb ở máy:</strong> {selectedFacebookAccount.note}
        </div>
        <div>
          <strong>ID:</strong> {selectedFacebookAccount.facebookId}
        </div>
        <div>
          <strong>Trạng thái:</strong>{" "}
          <span
            style={{
              color:
                getOnlineStatusDisplay(selectedFacebookAccount.facebookId)
                  .icon === "🟢"
                  ? "#28a745"
                  : "#dc3545",
            }}
          >
            {getOnlineStatusDisplay(selectedFacebookAccount.facebookId).icon}{" "}
            {getOnlineStatusDisplay(selectedFacebookAccount.facebookId).text}
          </span>
          {onlineStatus[selectedFacebookAccount.facebookId]?.lastSeen && (
            <span
              style={{ marginLeft: "8px", fontSize: "11px", color: "#999" }}
            >
              (Lần cuối:{" "}
              {new Date(
                onlineStatus[selectedFacebookAccount.facebookId].lastSeen!
              ).toLocaleTimeString("vi-VN")}
              )
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
