import stylepu from "@/pages/toolfacebook/tham-gia-nhom/[accountId]/popup/popup.module.css";
import style from "@/pages/toolfacebook/tham-gia-nhom/styles.module.css";
import { useState } from "react";

interface GroupFilterProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (grStateTemp: string, joinTemp: string) => void; // callback
}

export default function GroupFilter({ onClose, onApply }: GroupFilterProps) {
    const [grStateTemp, setGrStateTemp] = useState("all");
    const [joinTemp, setJoinTemp] = useState("all");

    return (
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
    );
}