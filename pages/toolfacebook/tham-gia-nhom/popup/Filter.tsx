import React from "react";
import style from "../styles.module.css";

interface FullscreenFilterProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function FilterPopup({
    isOpen,
    onClose,
    children,
    }: FullscreenFilterProps) {
    if (!isOpen) return null;

    return (
        <div
        className={style.fullscreenPopup}
        onClick={(e) => e.stopPropagation()}
        >
        <div
            className={style.PopupFilterContent}
            onClick={(e) => e.stopPropagation()} // chặn click ra ngoài đóng
        >
            {children}
        </div>
        </div>
    );
}
