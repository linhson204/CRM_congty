import React from "react";
import { PiWarningCircleLight } from "react-icons/pi";
import style from "./popup.module.css";

interface FullscreenPopupProps {
    GrOutName: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function OutGrFS({
    isOpen,
    onClose,
    children,
    GrOutName
    }: FullscreenPopupProps) {
    if (!isOpen) return null;

    return (
        <div
        className={style.fullscreenPopup}
        onClick={(e) => e.stopPropagation()}>
            <div
                className={style.fullscreenPopupContent}
                onClick={(e) => e.stopPropagation()} // chặn click ra ngoài đóng
            >
                <div className={style.PopupOutGrICWrapper}><PiWarningCircleLight className={style.PopupOutGrIC}/></div>
                <h2 className={style.PopupOutGrHeader}> 
                    Bạn chắc chắn muốn rời nhóm <strong>{GrOutName}</strong> không?
                </h2>
                <p className={style.PopupOutGrContent}>
                    Hành động này sẽ không thể hoàn tác.
                </p>
                <div className={`${style.BlockRow} ${style.PopupOutGrButtonWrapper}`}>
                    <button onClick={onClose} className={style.PopupOutGrCancelButton}>
                        Hủy
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
}
