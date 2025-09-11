import { useState } from "react";
import style from "../../styles.module.css";
import stylepu from "../popup/popup.module.css";

interface FullscreenFilterProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (grStateTemp: string, joinTemp: string) => void; // callback
}

export default function FilterPopup({
    isOpen,
    onClose,
    onApply,
    }: FullscreenFilterProps) {
    if (!isOpen) return null;

    const [grStateTemp, setGrStateTemp] = useState('all');
    const [joinTemp, setJoinTemp] = useState('all');

    return (
        <div
        className={stylepu.fullscreenPopup}
        onClick={(e) => e.stopPropagation()}
        >
            <div
                className={stylepu.PopupFilterContent}
                onClick={(e) => e.stopPropagation()} // chặn click ra ngoài đóng
            >
                <div className={stylepu.filterContainer}>
                    <div className={stylepu.BlockColumn}>
                        <div className={stylepu.selectBlockFilter}> 
                            <label className={style.filterLabel}>Trạng thái nhóm</label>
                            <select
                                className={style.filterSelect}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setGrStateTemp(value);
                                }}
                            >
                                <option value="all">Tất cả</option>
                                <option value="private">Riêng tư</option>
                                <option value="public">Công khai</option>
                            </select>
                        </div>
                        <div className={style.selectBlockFilter}> 
                            <label className={style.filterLabel}>Tham gia</label>
                            <select
                                className={style.filterSelect}
                                onChange={(e) => {
                                    const value1 = e.target.value;
                                    setJoinTemp(value1);
                                }}
                            >
                                <option value="all">Tất cả</option>
                                <option value="not">Chưa tham gia</option>
                                <option value="join">Đã tham gia</option>
                                <option value="pending">Đang chờ duyệt</option>
                            </select>
                        </div>
                    </div>
                    <div className={style.BlockRow}>
                        <button 
                            className={stylepu.PopupCancelFilter}
                            onClick={onClose}>
                            huỷ
                        </button>
                        <button 
                            onClick={() => {
                                onApply(grStateTemp, joinTemp);
                            }}
                            className={style.PopupConfirmFilter}>
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
