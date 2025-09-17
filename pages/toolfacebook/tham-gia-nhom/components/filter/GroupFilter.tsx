import Filter from "@/pages/toolfacebook/tham-gia-nhom/[accountId]/popup/Filter";
import stylepu from "@/pages/toolfacebook/tham-gia-nhom/[accountId]/popup/popup.module.css";
import style from "@/pages/toolfacebook/tham-gia-nhom/styles.module.css";
import { useEffect, useState } from "react";

interface GroupFilterProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (grStateTemp: string, joinTemp: string) => void; // callback
    grState?: string;
    join?: string;
}

export default function GroupFilter({ isOpen, onClose, onApply, grState, join }: GroupFilterProps) {
    const [grStateTemp, setGrStateTemp] = useState("all");
    const [joinTemp, setJoinTemp] = useState("all");
    useEffect(() => {
        if (grState || join) {
            setGrStateTemp(grState);
            setJoinTemp(join);
        }
    }, [grState, join]);

    if (!isOpen) return null;

    return (
        <Filter
            onClose={onClose}
            onApply={() => onApply(grStateTemp, joinTemp)}>
                <div className={stylepu.BlockColumn}>
                    <div className={stylepu.selectBlockFilter}> 
                        <label className={style.filterLabel}>Trạng thái nhóm</label>
                        <select
                            value={grStateTemp}
                            className={style.filterSelect}
                            onChange={(e) => {
                                const GrStateValue = e.target.value;
                                setGrStateTemp(GrStateValue);
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
                            value={joinTemp}
                            className={style.filterSelect}
                            onChange={(e) => {
                                const JoinStatusValue = e.target.value;
                                setJoinTemp(JoinStatusValue);
                            }}
                        >
                            <option value="all">Tất cả</option>
                            <option value="not">Chưa tham gia</option>
                            <option value="join">Đã tham gia</option>
                            <option value="pending">Đang chờ duyệt</option>
                        </select>
                    </div>
                </div>
        </Filter>
    );
}