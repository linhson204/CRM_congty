import { Button, Modal, Spin } from "antd";


export default function ModalListContentCall({ isOpen, setIsOpen, list, setList, isLoading }: any) {
    const convertDate = (date) => {
        try {
            const dateTime = new Date(date);
            const year = dateTime.getUTCFullYear();
            const month = String(dateTime.getUTCMonth() + 1).padStart(2, "0");
            const day = String(dateTime.getUTCDate()).padStart(2, "0");
            const hour = String(dateTime.getUTCHours() + 7).padStart(2, "0");
            const minute = String(dateTime.getUTCMinutes()).padStart(2, "0");
            // const second = String(dateTime.getUTCSeconds()).padStart(2, "0");
            return `${year}-${month}-${day} ${hour}:${minute}`;
        } catch (error) {
            console.log("🚀 ~ convertDate ~ error:", error?.message)
            return "Lỗi thời gian cập nhật"
        }
    };

    return (
        <>
            <Modal
                open={!!isOpen}
                title={
                    <>
                        Lịch sử chăm sóc khách hàng {!!isLoading && <Spin size="small" />}
                    </>
                }
                footer={
                    <>
                        <Button type="primary" onClick={() => {
                            if (!!setList) {
                                setList([])
                            }
                            if (!!setIsOpen) {
                                setIsOpen(false)
                            }
                        }}>Đóng</Button>
                    </>
                }
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        maxHeight: "300px",
                        overflowY: "auto",
                    }}
                >
                    {
                        (Array.isArray(list) && list.length > 0) ?
                            list.map((item: any, index: number) => (
                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        border: "solid 1px black",
                                        padding: "10px 20px",
                                        borderRadius: "10px",
                                    }}
                                >
                                    <div style={{ float: "left", margin: '0 8px 0 0' }}>
                                        {convertDate(item?.created_at)}
                                    </div>
                                    <div style={{ float: "left", color: "#4c5bd4", textAlign: 'left', whiteSpace: 'pre-line' }}>
                                        {`${item?.content_call}`.replace(/<[^>]*>|&nbsp;|&#160;/g, "")}
                                    </div>
                                </div>
                            )) :
                            <div
                                style={{
                                    color: "gray",
                                    fontStyle: "italic",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                Chưa có
                            </div>
                    }
                </div>
            </Modal>
        </>
    )
}