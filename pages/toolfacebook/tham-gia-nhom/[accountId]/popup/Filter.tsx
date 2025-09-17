import style from "./popup.module.css";

interface FullscreenFilterProps {
    children?: React.ReactNode;
    onApply?: () => void;
    onClose: () => void;
}

export default function Filter({
    children,
    onApply,
    onClose,
    }: FullscreenFilterProps) {

    return (
        <div
        className={style.fullscreenPopup}
        onClick={(e) => e.stopPropagation()}
        >
            <div
                className={style.PopupFilterContent}
                onClick={(e) => e.stopPropagation()} // chặn click ra ngoài đóng
            >
                <div className={style.filterContainer}>
                    {children}
                <div className={style.BlockRow}>
                    <button 
                        className={style.PopupCancelFilter}
                        onClick={onClose}>
                        huỷ
                    </button>
                    <button 
                        onClick={onApply}
                        className={style.PopupConfirmFilter}>
                        Xác nhận
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
}
