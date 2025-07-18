import { ColumnProps, TablePaginationConfig } from "antd/es/table"
import { Table, Tooltip } from "antd"
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { useFormData } from "../context/formDataContext"
import { dxhd_status_admin_num_to_color, dxhd_status_admin_num_to_string, dxhd_status_num_to_color, dxhd_status_num_to_string, isDenied } from "../de_xuat_hoan_diem/dxhd_status"
import Link from "next/link"
import { axiosCRMCall } from "@/utils/api/api_crm_call"
import { axiosCRMSite } from "@/utils/api/api_crm_site"
import axios from "axios"
import Cookies from "js-cookie";
import { getPropOrDefault } from "../de_xuat_hoan_diem/utils"
import dayjs from "dayjs"

interface DataType {
    key: React.Key,
    id: number,
    title: string,
    status: number,
    created_at: string,
    ntd: string,
    result: string,
    admin_accept: number,
}

const columns: ColumnProps<DataType>[] = [
    {
        title: 'STT',
        dataIndex: 'key',
        width: 50
    },
    {
        title: 'Mã đề xuất',
        dataIndex: 'id',
        width: 150,
        render: (text) => (
            <Link href={`/de-xuat-hoan-diem/detail/${text}`}>
                {text}
            </Link>
        )
    },
    {
        title: 'Tên đề xuất',
        dataIndex: 'title',
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
        title: 'Trạng thái',
        dataIndex: 'status',
        width: 150,
        render: (text, record) => (
            <div style={{ color: Number(text) === 5 && Number(record.admin_accept > 1) ? dxhd_status_admin_num_to_color(Number(record.admin_accept)) : dxhd_status_num_to_color(Number(text)) }}>
                {Number(text) === 5 && Number(record.admin_accept > 1) ? dxhd_status_admin_num_to_string(Number(record.admin_accept)) : dxhd_status_num_to_string(Number(text))}
            </div>
        )
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'created_at',
        width: 150
    },
    {
        title: 'Nhà tuyển dụng',
        dataIndex: 'ntd',
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
        title: 'Kết quả',
        dataIndex: 'result',
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

interface TableDxhdProps {

}

let fakeData: DataType[] = []
for (let i = 0; i < 100; i++) {
    const data: DataType = {
        key: i + 1,
        id: i + 1,
        title: `Đề xuất hoàn điểm số ${i + 1}`,
        status: Math.floor(Math.random() * 5) + 1,
        ntd: `${i + 1} - Nguyễn Tuyển Dụng`,
        created_at: '20/12/2023',
        result: '1 đã duyệt, 2 từ chối, 3 chờ xử lý',
        admin_accept: 0,
    }
    fakeData.push(data)
}

const TableDxhd: React.FC<TableDxhdProps> = ({ }: any) => {
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [total, setTotal] = useState(0)
    const [tableData, setTableData] = useState<DataType[]>([])
    const { formData, setFormData, handleRecall } = useContext(useFormData)
    const [getData, setGetData] = useState(false)

    // const baseURL = 'http://localhost:3007/api/crm/dxhd/admin'
    const baseURL = 'https://api.timviec365.vn/api/crm/dxhd/admin'
    const axiosTimViecAdminDxhdCall = axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
            // Authentication: accessToken,
        },
    })
    axiosTimViecAdminDxhdCall.interceptors.request.use((config: any) => {
        let accessToken = Cookies.get("token_base365");
        return { ...config, headers: { Authorization: `Bearer ${accessToken}` } };
    });

    const fetchData = async () => {
        // fetch data ...
        // console.log('fetch data:', formData)
        let isAdmin = 0
        let admin
        await axiosTimViecAdminDxhdCall
        .post('/checkSupportAdmin')
        .then(res => {
            const isAdminData = getPropOrDefault(res, 'data.data.data.isAdmin', 0)
            isAdmin = isAdminData
            admin = getPropOrDefault(res, 'data.data.data.admin', null)
        })
        .catch(e => console.log(e))

        await axiosTimViecAdminDxhdCall
            .post(`/${isAdmin ? 'getAdminDxhdList' : 'getSupporterDxhdList'}`, {
                page: page,
                limit: perPage,
                status: getPropOrDefault(formData, 'status', 0),
                dateFrom: getPropOrDefault(formData, 'startDate', 0) !== 0 ? dayjs(getPropOrDefault(formData, 'startDate', 0)).startOf('day').unix() : 0,
                dateTo: getPropOrDefault(formData, 'endDate', 0) !== 0 ? dayjs(getPropOrDefault(formData, 'endDate', 0)).endOf('day').unix() : 0,
                keyword: getPropOrDefault(formData, 'keyword', ''),
                adm_id: getPropOrDefault(admin, 'adm_id', 0),
            })
            .then(res => {
                const listDx = getPropOrDefault(res, 'data.data.data.list', [])
                // console.log(listDx)
                if (listDx.length > 0) {
                    setTableData(listDx.map((dx, index) => {
                        const ntd = getPropOrDefault(dx, 'ntd_id.idTimViec365', 0) + ' - ' + getPropOrDefault(dx, 'ntd_id.userName', 'Chưa cập nhật')
                        const time = getPropOrDefault(dx, 'created_at', 0) ? dayjs.unix(getPropOrDefault(dx, 'created_at', 0)).format('DD/MM/YYYY') : 'Chưa cập nhật'
                        let result = ''
                        if (isDenied(getPropOrDefault(dx, 'status', -1))) {
                            result = 'Từ chối do ' + getPropOrDefault(dx, 'deny_explain', '')
                        } else {
                            result = getPropOrDefault(dx, 'result', 'Chưa cập nhật')
                        }
                        const dxData: DataType = {
                            id: getPropOrDefault(dx, 'id', 0),
                            key: (index + 1) + (page - 1) * perPage,
                            title: getPropOrDefault(dx, 'title', ''),
                            status: getPropOrDefault(dx, 'status', -1),
                            // status: 5,
                            ntd: ntd,
                            created_at: time,
                            result: result,
                            admin_accept: getPropOrDefault(dx, 'admin_accept', 0),
                            // admin_accept: 3
                        }

                        return dxData
                    }))
                    setTotal(getPropOrDefault(res, 'data.data.data.total', 0))
                } else {
                    setTableData([])
                    setTotal(0)
                }
            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        fetchData()
    }, [formData.recall])

    useEffect(() => {
        if (getData) {
            handleRecall()
        }
        setGetData(false)
    }, [getData])

    useEffect(() => {
        setFormData((prev) => ({ ...prev, page: page, perPage: perPage }))
        setGetData(true)
    }, [page, perPage])

    const handleTablePageChange = (pagination: TablePaginationConfig) => {
        setPage(pagination.current)
    }

    function handlePerPage(event: ChangeEvent<HTMLSelectElement>): void {
        setPerPage(Number(event.target.value))
        setPage(1)
    }

    return (
        <div className="custom_table">
            <Table
                bordered
                scroll={{ 
                    x: 1500, 
                    y: 1200 
                }}
                columns={columns}
                dataSource={tableData}
                pagination={{
                    current: page,
                    pageSize: perPage,
                    total: total
                }}
                onChange={handleTablePageChange}
                style={{
                    marginBottom: '10px'
                }}
            />
            <div
                className="main__footer flex_between"
                id=""
                style={{
                    position: 'relative',
                    bottom: 0
                }}
            >
                <div className="show_number_item">
                    <b>Hiển thị:</b>
                    <select
                        className="show_item"
                        value={perPage}
                        onChange={handlePerPage}
                        name="perPage"
                    // defaultValue={perPage}
                    >
                        <option value={10}>10 bản ghi trên trang</option>
                        <option value={20}>20 bản ghi trên trang</option>
                        <option value={30}>30 bản ghi trên trang</option>
                        <option value={40}>40 bản ghi trên trang</option>
                        <option value={50}>50 bản ghi trên trang</option>
                    </select>
                </div>
                <div className="total">
                    Tổng số: <b>{total}</b> Đề xuất
                </div>
            </div>
        </div>
    )
}

export default TableDxhd