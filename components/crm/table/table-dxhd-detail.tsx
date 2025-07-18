import { Tooltip, Table } from "antd";
import { ColumnProps } from "antd/es/table";
import Link from "next/link";
import { dxhd_req_status_num_to_color, dxhd_req_status_num_to_string } from "../de_xuat_hoan_diem/dxhd_status";
import { useContext, useEffect, useState } from "react";
import { DxhdDetailContext } from "../de_xuat_hoan_diem/dxhd_detail_context";
import { getPropOrDefault } from "../de_xuat_hoan_diem/utils";


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
]

const TableDxhdDetail: React.FC = () => {
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [total, setTotal] = useState(100)
    const [tableData, setTableData] = useState<DataType[]>([])
    const { dxhdDetail } = useContext(DxhdDetailContext)

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

export default TableDxhdDetail