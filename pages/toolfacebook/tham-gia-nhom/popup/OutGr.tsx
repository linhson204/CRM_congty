import React from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div
        style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
        }}
        >
        <div
            style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            minWidth: "300px",
            maxWidth: "90%",
            position: "relative",
            }}
        >
            {title && <h2 style={{ marginTop: 0 }}>{title}</h2>}
            <button
            onClick={onClose}
            style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
            }}
            >
            ✖
            </button>
            <div>{children}</div>
        </div>
        </div>
    );
};

export default Popup;
