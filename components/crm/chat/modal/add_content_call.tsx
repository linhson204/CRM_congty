import { Button, Modal } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { useRef, useState } from "react";

export default function ModalAddContentCall({ isOpen, setIsOpen, cusId, datatable, setDatatable }: any) {
    const [contentCall, setContentCall] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const reset = () => {
        setContentCall("")
        if (textareaRef.current) {
            textareaRef.current.style.width = 'initial'
            textareaRef.current.style.height = 'initial'
        }
    }

    const changeLocal = () => {
        if (!!datatable && !!setDatatable && Array.isArray(datatable)) {
            const temp = datatable.map((item: any) => {
                if (item?.cus_id == cusId) {
                    const now = new Date()
                    return {
                        ...item,
                        latest_content_call: {
                            content_call: contentCall,
                            created_at: now.toISOString(),
                        }
                    }
                } else {
                    return item
                }
            })
            setDatatable({ data: temp })
        }
    }

    const handleAdd = async () => {
        setIsLoading(true)
        const formData = new FormData();
        formData.append("content_call", contentCall);
        formData.append("cus_id", cusId);
        const token = Cookies.get("token_base365");
        const url = "https://api.timviec365.vn/api/crm/customerdetails/editCustomer";
        await axios.post(url, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                alert('Thành công')
                changeLocal()
                reset()
                if (!!setIsOpen) {
                    setIsOpen(false)
                }
            })
            .catch((error) => {
                console.log("🚀 ~ handleAdd ~ error:", error)
                alert('Đã có lỗi xảy ra')
            })
            .finally(() => {
                setIsLoading(false)
            });
    }

    return (
        <>
            <Modal
                open={!!isOpen}
                title="Thêm nội dung cuộc gọi"
                footer={
                    <div
                        style={{
                            textAlign: "center",
                        }}
                    >
                        <Button
                            disabled={isLoading}
                            onClick={() => {
                                reset()
                                if (!!setIsOpen) {
                                    setIsOpen(false)
                                }
                            }}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="primary"
                            loading={isLoading}
                            disabled={((contentCall.trim()).length == 0)}
                            onClick={handleAdd}
                        >
                            Thêm
                        </Button>
                    </div>
                }
            >
                <div style={{ width: "100%", padding: "0 5px" }}>
                    {" "}
                    <textarea
                        ref={textareaRef}
                        style={{ width: "100%", padding: "10px", fontSize: "14px" }}
                        rows={7}
                        cols={59}
                        placeholder="Nhập nội dung"
                        value={contentCall}
                        onChange={(e) => setContentCall(e.target.value)}
                    />
                </div>
            </Modal>
        </>
    )
}