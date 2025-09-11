import { PiWarningCircleLight } from "react-icons/pi";
import style from "../popup.module.css";

interface FullscreenPopupProps {
    isOpen: boolean;
    onClose: () => void;
    GrCancelName: string;
    children: React.ReactNode;
}

export default function CancelQueuePopup({
    isOpen,
    onClose,
    GrCancelName,
    children
    }: FullscreenPopupProps) {
    if (!isOpen) return null;

    return (
        <div
        className={style.fullscreenPopup}
        onClick={(e) => e.stopPropagation()}
        >
            <div
                className={style.fullscreenPopupContent}
                onClick={(e) => e.stopPropagation()} // chặn click ra ngoài đóng
            >
                <div className={style.PopupOutGrICWrapper}><PiWarningCircleLight className={style.PopupOutGrIC}/></div>
                <h2 className={style.PopupOutGrHeader}> 
                    Bạn chắc chắn huỷ yêu cầu tham gia nhóm <strong>{GrCancelName}</strong> không?
                </h2>
                <p className={style.PopupOutGrContent}>
                    Bạn sẽ phải trả lời lại câu hỏi nếu đây là nhóm kín
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
