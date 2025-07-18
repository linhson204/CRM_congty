import { Tooltip, Table } from "antd";
import { ColumnProps } from "antd/es/table";
import Link from "next/link";
import { dxhd_req_status_num_to_color, dxhd_req_status_num_to_string } from "../de_xuat_hoan_diem/dxhd_status";
import { useContext, useEffect, useState } from "react";
import { DxhdDetailContext } from "../de_xuat_hoan_diem/dxhd_detail_context";
import { getPropOrDefault } from "../de_xuat_hoan_diem/utils";
import DxhdProcessActionDropdown from "../de_xuat_hoan_diem/process/dxhd_process_action_dropdown";
import { useFormData } from "../context/formDataContext";


interface DataType {
    key: React.Key,
    id: number,
    link: string,
    point: number,
    reason: string,
    status: number,
    verify_user: string,
    verify_reason: string,
}



const TableDxhdProcess: React.FC = () => {
    const { setFormData } = useContext(useFormData)
    const [tableData, setTableData] = useState<DataType[]>([])
    const { dxhdDetail } = useContext(DxhdDetailContext)
    const [reqChangeList, setReqChangeList] = useState([])
    // const [oldTableData, setOldTableData] = useState<DataType[]>([])
    // const [updateTableData, setUpdateTableData] = useState([])

    useEffect(() => {
        const reqList = getPropOrDefault(dxhdDetail, 'req', [])
        if (reqList.length > 0) {
            convertToTableData(reqList)
        }
    }, [dxhdDetail])

    const convertToTableData = (data: []) => {
        let newData = []
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            const newItem: DataType = {
                key: i + 1,
                id: getPropOrDefault(element, 'id', 0),
                link: getPropOrDefault(element, 'link', 'Chưa cập nhật'),
                point: getPropOrDefault(element, 'point', 0),
                reason: getPropOrDefault(element, 'reason', 'Chưa cập nhật'),
                status: getPropOrDefault(element, 'status', -1),
                verify_user: `${getPropOrDefault(element, 'verify_user.id', 0)} - ${getPropOrDefault(element, 'verify_user.userName', 'Chưa cập nhật')}`,
                verify_reason: getPropOrDefault(element, 'verify_reason', 'Chưa cập nhật')
            }
            newData.push(newItem)
        }
        setTableData(newData)
    }

    const updateTable = (id, status, verify_reason, verify_user = '') => {
        const tableIndex = tableData.findIndex(data => data.id === id)
        if (tableIndex !== -1) {
            let update = tableData
            update[tableIndex] = { ...update[tableIndex], status: status, verify_reason: verify_reason, verify_user: verify_user ? verify_user : 'Sẽ cập nhật' }
            // console.log(update)
            setTableData([...update])
            // console.log('update')
            // setTableData(prev => ([
            //     ...prev,
            //     prev[tableIndex] = { ...prev[tableIndex], status: status, verify_reason: verify_reason, verify_user: verify_user ? verify_user : 'Sẽ cập nhật' }
            // ]))
        }
    }

    const handleReqAdd = (id, status, verify_reason) => {
        // setOldTableData([...tableData])

        const index = reqChangeList.findIndex(req => req.id === id)

        if (index !== -1) {
            let update = reqChangeList
            update[index] = { ...update[index], status, verify_reason }
            setReqChangeList([...update])
        } else {
            setReqChangeList(prev => ([
                ...prev,
                { id, status, verify_reason }
            ]))
        }

        // update table
        updateTable(id, status, verify_reason)
    }

    const handleReqRemove = (id) => {
        let update = reqChangeList.filter(req => req.id !== id)
        setReqChangeList([...update])

        // update table
        const tableIndex = tableData.findIndex(old => old.id === id)
        if (tableIndex !== -1) {
            // updateTable(id, oldTableData[tableIndex].status, oldTableData[tableIndex].verify_reason, oldTableData[tableIndex].verify_user)
            updateTable(id, 1, '', 'Đã hủy')
        }
    }
    // console.log(oldTableData)
    useEffect(() => {
        // console.log(reqChangeList)
        setFormData(prev => ({
            ...prev,
            req: reqChangeList
        }))
    }, [reqChangeList])

    const columns: ColumnProps<DataType>[] = [
        {
            title: 'STT',
            dataIndex: 'key',
            width: 50
        },
        {
            title: 'Link ứng viên',
            dataIndex: 'link',
            width: 250,
            ellipsis: {
                showTitle: false
            },
            render: (text) => (
                <Link
                    href={text}
                    target="_blank"
                    title={text}
                >
                    {text}
                </Link>
            )
        },
        {
            title: 'Số điểm hoàn lại',
            dataIndex: 'point',
            width: 150
        },
        {
            title: 'Lý do',
            dataIndex: 'reason',
            width: 300,
            ellipsis: {
                showTitle: false
            },
            render: (text) => (
                <Tooltip
                    placement="topLeft"
                    title={text}
                    color="white"
                    overlayInnerStyle={{ color: 'black', backgroundColor: 'white' }}
                >
                    {text}
                </Tooltip>
            )
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            width: 150,
            render: (text) => (
                <div style={{ color: dxhd_req_status_num_to_color(Number(text)) }}>
                    {dxhd_req_status_num_to_string(Number(text))}
                </div>
            )
        },
        {
            title: 'Người duyệt',
            dataIndex: 'verify_user',
            width: 250,
            ellipsis: {
                showTitle: false
            },
            render: (text) => (
                <Tooltip
                    placement="topLeft"
                    title={text}
                    color="white"
                    overlayInnerStyle={{ color: 'black', backgroundColor: 'white' }}
                >
                    {text}
                </Tooltip>
            )
        },
        {
            title: 'Lý do duyệt',
            dataIndex: 'verify_reason',
            width: 300,
            ellipsis: {
                showTitle: false
            },
            render: (text) => (
                <Tooltip
                    placement="topLeft"
                    title={text}
                    color="white"
                    overlayInnerStyle={{ color: 'black', backgroundColor: 'white' }}
                >
                    {text}
                </Tooltip>
            )
        },
        {
            title: 'Thao tác',
            dataIndex: "operation",
            width: 150,
            fixed: "right",
            render: (text, record) => (
                <DxhdProcessActionDropdown
                    id={record.id}
                    link={record.link}
                    status={record.status}
                    handleReqAdd={handleReqAdd}
                    handleReqRemove={handleReqRemove}
                />
            )
        }
    ]

    return (
        <div className="custom_table">
            <Table
                bordered
                scroll={{ x: 1500, y: 1200 }}
                columns={columns}
                dataSource={tableData}
                pagination={false}
            />
        </div>
    )
}

export default TableDxhdProcess