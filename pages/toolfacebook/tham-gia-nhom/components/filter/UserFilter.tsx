import Filter from "@/pages/toolfacebook/tham-gia-nhom/[accountId]/popup/Filter";
import style from "@/pages/toolfacebook/tham-gia-nhom/styles.module.css";
import { useState } from "react";

interface UserFilterProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (UserState: string, device: string) => void; // callback
    devices?: string[];
}

export default function UserFilter({ isOpen, onClose, onApply, devices }: UserFilterProps) {
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [deviceFilter, setDeviceFilter] = useState<string | null>(null);

    // sếp lại thứ tự thiết bị
    function sortAxyArray(array) {
        return array.sort((a, b) => {
            // Lấy phần số từ chuỗi (2 chữ số cuối)
            const numA = parseInt(a.slice(-2));
            const numB = parseInt(b.slice(-2));
            
            return numA - numB;
        });
    }

    const sortedDevices = sortAxyArray(devices);
    if (!isOpen) return null;

    return (
        <Filter
            onClose={onClose}
            onApply={() => onApply(activeFilter, deviceFilter)}>
                <div className={style.filterContainerHP}>
                    <div className={style.BlockColumn}>
                    <label className={style.filterLabel}>
                        Trạng thái tài khoản
                    </label>
                    <select
                        className={style.filterSelect}
                        value={ activeFilter }
                        onChange={(e) => {
                            const value = e.target.value;
                            setActiveFilter(value);
                        }}
                    >
                        <option value="all">Tất cả</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                        <option value="Not available">Not available</option>
                    </select>
                    </div>
                </div>
                <div className={style.filterContainerHP}>
                    <div className={style.BlockColumn}>
                    <label className={style.filterLabel}>
                        Thiết bị quản lí
                    </label>
                    <select
                        className={style.filterSelect}
                        value={ deviceFilter }
                        onChange={(e) => {
                            const value = e.target.value;
                            setDeviceFilter(value);
                        }}
                    >
                        <option value="all">Tất cả</option>
                        {sortedDevices?.map((device, index) => (
                            <option key={index} value={device}>{device}</option>
                        ))}
                    </select>
                    </div>
                </div>
        </Filter>
    );
}