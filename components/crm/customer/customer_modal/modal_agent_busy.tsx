import { useState, useEffect } from "react";
import { Button, Modal, Input, message  } from "antd";

const ModalAgentBusy = ({ isOpenModalBusy, setIsOpenModalBusy }) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval;
        if (isOpenModalBusy) {
            setTime(0);
            callDataBusy();
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);


        }
        return () => clearInterval(interval);
    }, [isOpenModalBusy]);

    const callDataBusy = async () => {
        try {
            message.success("Đã gửi trạng thái bận!");
        } catch (error) {
            message.error("Lỗi khi gửi trạng thái bận!");
            console.error("API Error:", error);
        }
    }

    // Format time in MM:SS format
    const formatTime = (seconds) => {
        const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
        const secs = String(seconds % 60).padStart(2, "0");
        return `${minutes}:${secs}`;
    };

    return (
        <Modal
            title="NHÂN VIÊN ĐANG BẬN"
            open={isOpenModalBusy}
            onCancel={() => {
                console.log("time cancel", time);

                setIsOpenModalBusy(false)
            }}
            footer={null}
            centered
        >
            <div>
                <label>
                    Lý do bận <span style={{ color: "red" }}>*</span>
                </label>
                <Input placeholder="Nhập lý do bận" />

                <div style={{ textAlign: "center", margin: "20px 0" }}>
                    <div
                        style={{
                            width: "200px",
                            height: "200px",
                            borderRadius: "50%",
                            backgroundColor: "#E0E0E0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "24px",
                            fontWeight: "bold",
                            border: "10px solid #8080FF",
                            margin: "auto",
                        }}
                    >
                        {formatTime(time)}
                    </div>
                </div>

                <Button
                    type="primary"
                    danger
                    block
                    onClick={() => {
                        console.log("time", time);
                        setIsOpenModalBusy(false)
                    }}
                >
                    Hủy bận
                </Button>
            </div>
        </Modal>
    );
};

export default ModalAgentBusy;
