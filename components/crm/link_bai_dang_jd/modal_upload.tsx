import { Button, Modal } from "antd";
import { ChangeEvent, useState } from "react";

export default function ModalUploadFile({ isOpen, setIsOpen }: any) {
    const [fileObj, setFileObj] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputFile = event.target.files ? event.target.files[0] : null

        if (inputFile) {
            // Validate file types
            const allowedTypes = [
                'image/jpeg',
                'image/jpg',
                'image/png',
                'application/pdf',
                'application/msword', // .doc files
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx files
            ];

            if (!allowedTypes.includes(inputFile.type)) {
                alert("Loại file không hợp lệ")
                return;
            }

            // Validate file size (e.g., 10MB max)
            const maxSize = 10 * 1024 * 1024; // 10MB in bytes
            if (inputFile.size > maxSize) {
                alert("File quá lớn")
                return;
            }

            setFileObj(inputFile)
        }

        event.target.value = ""
    }

    const handleCancel = () => {
        setFileObj(null)
        if (!!setIsOpen) {
            setIsOpen(false)
        }
    }

    const handleUpload = async () => {
        if (!fileObj) return;

        setLoading(true)
        const formData = new FormData();
        formData.append('JD', fileObj)
        formData.append('fileName', fileObj.name)

        try {
            const response = await fetch('/crm/api/facebook/upload_file_jd', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const res = await response.json()
                alert(res?.message)
                handleCancel()
            } else {
                const res = await response.json()
                alert(res?.message)
            }
        } catch (error) {
            console.log("🚀 ~ handleUpload ~ error:", error?.message)
            alert(error?.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Modal
                open={!!isOpen}
                title="Tải file JD lên"
                footer={(
                    <div style={{ textAlign: "center" }}>
                        <Button onClick={handleCancel} disabled={loading}>Hủy</Button>
                        {
                            !!fileObj &&
                            <>
                                <Button danger onClick={() => setFileObj(null)} disabled={loading}>Xóa</Button>
                                <Button type="primary" onClick={handleUpload} loading={loading}>Tải lên</Button>
                            </>
                        }
                    </div>
                )}
            >
                <div style={{ textAlign: 'center', margin: "40px 0" }}>
                    <label htmlFor="upload" style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ width: "50px" }}>
                            {
                                !!fileObj ?
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#4c5bd4" d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM288 368a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm211.3-43.3c-6.2-6.2-16.4-6.2-22.6 0L416 385.4l-28.7-28.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l40 40c6.2 6.2 16.4 6.2 22.6 0l72-72c6.2-6.2 6.2-16.4 0-22.6z" /></svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#4c5bd4" d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM216 408c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-102.1-31 31c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l72-72c9.4-9.4 24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-31-31L216 408z" /></svg>
                            }
                        </div>
                        <p style={{ color: "#4c5bd4" }}>{!!fileObj ? `${fileObj.name}` : "Chọn file jpeg, jpg, png, pdf, doc, docx không quá 10MB"}</p>
                    </label>
                    <input type="file" name="upload" id="upload" onChange={handleFileChange} hidden accept=".jpeg,.jpg,.png,.pdf,.doc,.docx" />
                </div>
            </Modal>
        </>
    )
}