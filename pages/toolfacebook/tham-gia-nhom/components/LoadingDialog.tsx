import React, { useEffect } from 'react';

interface LoadingDialogProps {
    message?: string;
    show: boolean;
    onClose?: () => void;
}

const LoadingDialog: React.FC<LoadingDialogProps> = ({ message = "Đang gửi yêu cầu...", show, onClose }) => {
    useEffect(() => {
        if (show) {
        const timer = setTimeout(() => {
            onClose(); // sau 3s tự đóng
        }, 3000);

        return () => clearTimeout(timer); // dọn timer khi component unmount
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
            }}
        >
            <div
                style={{
                    background: 'white',
                    padding: '30px',
                    borderRadius: '10px',
                    textAlign: 'center',
                }}
            >
                <div
                    style={{
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #3498db',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 20px',
                    }}
                ></div>
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
