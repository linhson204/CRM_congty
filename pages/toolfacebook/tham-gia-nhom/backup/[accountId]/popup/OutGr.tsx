import React from "react";
import { PiWarningCircleLight } from "react-icons/pi";
import style from "./popup.module.css";


interface ConfirmLeaveGroupProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    groupName: string;
}

const ConfirmLeaveGroup: React.FC<ConfirmLeaveGroupProps> = ({
    isOpen,
    onClose,
    onConfirm,
    groupName
    }) => {
        if (!isOpen) return null;

        return (
            <div className={style.PopupContainer}>
                <div className={style.PopupOutGrICWrapper}>
                    <div>
                        <PiWarningCircleLight style={{width: '50px', height: '50px'}}/>
                    </div></div>
                <h2 className={style.PopupOutGrHeader}> Xác nhận rời nhóm </h2>
                <p className={style.PopupOutGrContent}> Bạn có chắc chắn muốn rời nhóm <strong>{groupName}</strong> không?</p>
                <div className={style.BlockRow}>
                    <button onClick={onClose} className={style.PopupOutGrCancelButton}>
                        Hủy
                    </button>
                    <button onClick={onConfirm} className={style.PopupOutGrConfirmButton}>
                        Rời nhóm
                    </button>
                </div>
            </div>
        );
    };

export default ConfirmLeaveGroup;
