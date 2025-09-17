import Filter from "@/pages/toolfacebook/tham-gia-nhom/[accountId]/popup/Filter";
import style from "@/pages/toolfacebook/tham-gia-nhom/styles.module.css";
import { useEffect, useState } from "react";

interface UserFilterProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (UserState: boolean) => void; // callback
    active?: boolean;
}

export default function UserFilter({ isOpen, onClose, onApply, active }: UserFilterProps) {
    const [activeFilter, setActiveFilter] = useState<boolean | null>(null);
    useEffect(() => {
        if (active == null) {
            setActiveFilter(active);
        }
    }, [active]);

    if (!isOpen) return null;

    return (
        <Filter
            onClose={onClose}
            onApply={() => onApply(activeFilter)}>
                <div className={style.filterContainerHP}>
                    <div className={style.BlockColumn}>
                    <label className={style.filterLabel}>
                        Trạng thái tài khoản
                    </label>
                    <select
                        className={style.filterSelect}
                        value={
                        activeFilter === null
                            ? "all"
                            : activeFilter.toString()
                        }
                        onChange={(e) => {
                        const value = e.target.value;
                        setActiveFilter(
                            value === "all"
                            ? null
                            : value === "true"
                            ? true
                            : false
                        );
                        }}
                    >
                        <option value="all">Tất cả</option>
                        <option value="true">Online</option>
                        <option value="false">Offline</option>
                    </select>
                    </div>
                </div>
        </Filter>
    );
}