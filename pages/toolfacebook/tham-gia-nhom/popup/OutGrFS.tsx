import React from "react";
import style from "../styles.module.css";

interface FullscreenPopupProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function FullscreenPopup({
    isOpen,
    onClose,
    children,
    }: FullscreenPopupProps) {
    if (!isOpen) return null;

    return (
        <div
        className={style.fullscreenPopup}
        onClick={onClose}
        >
        <div
            className={style.fullscreenPopupContent}
            onClick={(e) => e.stopPropagation()} // chặn click ra ngoài đóng
        >
            {children}
        </div>
        </div>
    );
}
