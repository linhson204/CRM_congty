import GroupFilter from "@/pages/toolfacebook/tham-gia-nhom/components/filter/GroupFilter";
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

    return (
        <div
        className={stylepu.fullscreenPopup}
        onClick={(e) => e.stopPropagation()}
        >
            <div
                className={stylepu.PopupFilterContent}
                onClick={(e) => e.stopPropagation()} // chặn click ra ngoài đóng
            >
                <GroupFilter
                    isOpen={isOpen}
                    onClose={onClose}
                    onApply={onApply}>
                </GroupFilter>
            </div>
        </div>
    );
}
