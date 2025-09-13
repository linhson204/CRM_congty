import React, { useEffect } from 'react';
import style from '../[accountId]/popup/popup.module.css';

interface LoadingDialogProps {
    message?: string;
    show: boolean;
    onClose?: () => void;
    status: string
}

const SuccessDialog: React.FC<LoadingDialogProps> = ({ message = "Thành công", show, onClose, status }) => {
    useEffect(() => {
        if (show) {
        const timer = setTimeout(() => {
            onClose(); // sau 1.5s tự đóng
        }, 500);

        return () => clearTimeout(timer); // dọn timer khi component unmount
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className={style.dialogContainer}>
            <div className={style.dialogContent}>
                <div className={`${style[status]}`}></div>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default SuccessDialog;
