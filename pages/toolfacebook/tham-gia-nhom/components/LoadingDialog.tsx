import React, { useEffect } from 'react';
import style from '../[accountId]/popup/popup.module.css';

interface LoadingDialogProps {
    message?: string;
    show: boolean;
    onClose?: () => void;
}

const LoadingDialog: React.FC<LoadingDialogProps> = ({ message = "Đang gửi yêu cầu...", show, onClose }) => {
    useEffect(() => {
        if (show) {
        const timer = setTimeout(() => {
            onClose(); // sau 1.5s tự đóng
        }, 1500);

        return () => clearTimeout(timer); // dọn timer khi component unmount
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className={style.dialogContainer}>
            <div className={style.dialogContent}>
                <div
                    style={{
                    border: '4px solid #f3f3f3',
                    borderTop: '4px solid #3498db',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 20px',
                    }}>
                </div>
                <p>{message}</p>
            </div>
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default LoadingDialog;
