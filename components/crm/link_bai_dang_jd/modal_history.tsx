import { convertStringToTimestamp, convertTimestampToFull, convertTimestampToInputValue } from "@/utils/function";
import { Button, Modal } from "antd";
import { ChangeEvent, useEffect, useState } from "react";

export default function ModalHistoryUpload({ isOpen, setIsOpen }: any) {
    const [filter, setFilter] = useState({
        fileName: "",
        fromDate: 0,
        toDate: 0
    })
    const [tableData, setTableData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.type === "text") {
            setFilter((prev) => ({
                ...prev,
                [event.target.id]: event.target.value
            }))
        }
        if (event.target.type === "date") {
            setFilter((prev) => ({
                ...prev,
                [event.target.id]: convertStringToTimestamp(event.target.value) || 0
            }))
        }
    }

    const handleCancel = () => {
        setFilter({
            fileName: "",
            fromDate: 0,
            toDate: 0,
        })
        setTableData([])
        if (!!setIsOpen) {
            setIsOpen(false)
        }
    }

    const handleSearch = async () => {
        setLoading(true);
        fetch("/crm/api/facebook/get_history_upload_file_jd", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...(!!filter.fromDate && { fromDate: filter.fromDate }),
                ...(!!filter.toDate && { toDate: filter.toDate }),
                ...(!!filter.fileName && { fileName: filter.fileName }),
            }),
        })
            .then((res) => res.json())
            .then((res2) => {
                // console.log("🚀 ~ .then ~ res2:", res2?.data?.data?.data)
                // setListData(res2?.data?.data?.data);
                // setTotal(res2?.data?.data?.total);
                // setTableData(res2?.data?.data?.data || [])
                const rawData = res2?.data?.data?.data
                if (Array.isArray(rawData)) {
                    setTableData(rawData.map((item: any) => ({
                        fileName: item?.fileName || "Chưa cập nhật",
                        time: item?.time ? convertTimestampToFull(item?.time) : "Chưa cập nhật",
                        link: item?.link || "#",
                    })))
                }
            });
        setLoading(false);
    }

    useEffect(() => {
        if (!!isOpen) {
            handleSearch()
        }
        return () => { }
    }, [isOpen])

    return (
        <>
            <Modal
                open={!!isOpen}
                title="Lịch sử file JD"
                footer={(
                    <div style={{ textAlign: "center" }}>
                        <Button type="primary" onClick={handleCancel}>Đóng</Button>
                    </div>
                )}
            >
                <div style={{ display: 'flex', flexWrap: "wrap", gap: '10px', margin: "10px 0" }}>
                    <input
                        type="text"
                        name="fileName"
                        id="fileName"
                        placeholder="tên file"
                        style={{ padding: "5px" }}
                        value={filter.fileName}
                        onChange={handleInputChange}
                    />
                    <div>
                        <label htmlFor="fromDate">Từ: </label>
                        <input
                            type="date"
                            name="fromDate"
                            id="fromDate"
                            value={filter.fromDate ? convertTimestampToInputValue(filter.fromDate, 'date') : ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="toDate">Đến: </label>
                        <input
                            type="date"
                            name="toDate"
                            id="toDate"
                            value={filter.toDate ? convertTimestampToInputValue(filter.toDate, 'date') : ""}
                            onChange={handleInputChange}
                        />
                    </div>
                    <Button type="primary" loading={loading} onClick={handleSearch}>Tìm</Button>
                </div>
                <table style={{ width: "100%", borderSpacing: 0 }}>
                    <colgroup>
                        <col span={1} style={{ width: "50%" }} />
                        <col span={1} style={{ width: "50%" }} />
                    </colgroup>
                    <thead style={{ backgroundColor: "#4c5bd4", color: "white" }}>
                        <th style={{ border: "solid 1px black" }}>Tên file</th>
                        <th style={{ border: "solid 1px black" }}>Ngày đăng</th>
                    </thead>
                </table>
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                    <table style={{ width: "100%", borderSpacing: 0 }}>
                        <colgroup>
                            <col span={1} style={{ width: "50%" }} />
                            <col span={1} style={{ width: "50%" }} />
                        </colgroup>
                        <tbody>
                            {
                                tableData.map((item: any, index: number) => (
                                    <tr key={index}>
                                        <td style={{ border: "solid 1px black", color: "#4c5bd4" }}>
                                            <a style={{ cursor: "pointer" }} target="_blank" href={item?.link || "#"}>
                                                {item?.fileName}
                                            </a>
                                        </td>
                                        <td style={{ border: "solid 1px black" }}>{item?.time}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </Modal>
        </>
    )
}