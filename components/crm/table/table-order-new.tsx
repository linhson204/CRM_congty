import { Col, Row, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import Link from "next/link";
import React, { useEffect, useState } from "react";


interface DataType {
    key: React.Key;
    order_Id: string;
    status: string;
    customer: string;
    value: number;
    order_date: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: "Id đơn hàng",
        width: 150,
        dataIndex: "order_id_text",
        key: "order_id_text",
        render: (text: any, record: any) => (
            <Link href={`/order-new/detail/${record._id}`} target="_blank">
                <b>{text}</b>
            </Link>
        ),
    },
    {
        title: "Id công ty",
        dataIndex: ['inForOrder', 'timviec', 'id_timviec_khach'],
        key: "customer",
        width: 100,
        render: (text: any, record: any) => (
            text ? <b style={{ color: 'grey' }}>{text}</b> : 'Khách hàng mua đơn'
        ),
    },
    {
        title: "Tên công ty",
        dataIndex: ['inForOrder', 'timviec', 'name_timviec_khach'],
        key: "name_timviec_khach",
        width: 160,
        render: (text: any, record: any) => (
            <b style={{ color: 'grey' }}>{text}</b>
        ),
    },
    {
        title: "Site",
        dataIndex: ['inForOrder', 'timviec', 'from'],
        key: "site",
        width: 100,
        render: (text: any, record: any) => {
            let siteText;
            switch (text) {
                case "tv365com":
                    siteText = "Work247";
                    break;
                case "tv365.com.vn":
                    siteText = "Vieclam88";
                    break;
                case "joblike365.com":
                    siteText = "Joblike365";
                    break;
                case "tuyendung3s.com":
                    siteText = "Tuyendung3s";
                    break;
                case "tv365":
                    siteText = "Timviec365";
                    break;
            }
            return <p>{siteText}</p>;
        }
    },
    {
        title: "Tên chuyên viên",
        dataIndex: ['CvName'],
        key: "cvname",
        width: 150,
    },
    {
        title: "Trạng thái",
        width: 150,
        dataIndex: ['inForOrder', 'timviec', 'status'],
        key: "status",
        render: (text) => {
            let statusText;
            let color;
            switch (text) {
                case 0:
                    statusText = "Đơn hàng vừa tạo";
                    color = "blue";
                    break;
                case 1:
                    statusText = "Chuyên viên đã duyệt";
                    color = "orange";
                    break;
                case 2:
                    statusText = "Công ty đã duyệt";
                    color = "green";
                    break;
                case 3:
                    statusText = "Từ chối";
                    color = "red";
                    break;
                default:
                    statusText = "Không xác định";
                    color = "black";
            }
            return <b style={{ color }}>{statusText}</b>;
        },
    },
    {
        title: "Giá trị (VNĐ)",
        dataIndex: ['inForOrder', 'timviec', 'money_with_vat'],
        key: "value",
        width: 120,
        render: (text) => {
            return text ? `${text.toLocaleString('vi-VN')} VND` : '0';
        },
    },
    {
        title: "Loại",
        dataIndex: ['inForOrder', 'timviec', 'point'],
        key: "point",
        width: 120,
        render: (text) => {
            const pointArray = text.split(',').map(Number);

            const allZero = pointArray.every(p => p === 0);
            const allNonZero = pointArray.every(p => p !== 0);

            const result = allZero ? 'Ghim tin' : allNonZero ? 'Cộng điểm' : 'Cộng điểm/Ghim tin';
            return result;
        },
    },
    {
        title: "Thời gian",
        dataIndex: 'updateAt',
        key: "order_date",
        width: 120,
        render: (timestamp) => {
            const date = new Date(timestamp * 1000);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();

            return `${day}/${month}/${year}`;
        },
    },
    // {
    //     title: "Chức năng",
    //     key: "11",
    //     width: 150,
    //     fixed: "right",
    //     render: (text: any, record: any) => <OrderNewActionTable record={text} />,
    // },
];


interface TableDataOrderProps {
    setSelected: (value: boolean) => void;
    setNumberSelected: any;
    condition: any,
    setCurrent: any;
    current: number;
}

const TableDataOrderNew: React.FC<TableDataOrderProps> = ({
    setSelected,
    setNumberSelected,
    condition,
    setCurrent,
    current
}: any) => {
    const [loading, setLoading] = useState(false);
    const [listData, setListData] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalMoney, setTotalMoney] = useState(0);
    const [totalMoneyRefund, setTotalMoneyRefund] = useState(0);

    const [user, setUser] = useState(() => {
        const decodedToken = jwt_decode(Cookies.get("token_base365"))
        if (decodedToken && decodedToken['data']) {
            return decodedToken['data']
        }
        return undefined
    })

    useEffect(() => {
        console.log("condition", condition)
        const getData = async () => {
            if (user?.type === 2) {
                const response = await fetch(`https://api.timviec365.vn/api/crm/order/takeListOrderStaff`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${Cookies.get("token_base365")}`,
                    },
                    body: condition,
                });
                const data = await response.json();
                console.log("DATA RES CVIEN", data.data.data);
                setLoading(false)
                if (data && data.data) {
                    setListData(data.data.data);
                    setTotalRecords(data.data.total)
                    setTotalMoney(data.data.totalMoney)
                    setTotalMoneyRefund(data.data.totalMoneyRefundValue)
                }
            } else {
                const response = await fetch(`https://api.timviec365.vn/api/crm/order/takeListOrderCom`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${Cookies.get("token_base365")}`,
                    },
                    body: condition,
                });
                const data = await response.json();
                console.log("DATA RES CTY", data.data.data);
                setLoading(false)
                if (data && data.data) {
                    setListData(data.data.data);
                    setTotalRecords(data.data.total)
                    setTotalMoney(data.data.totalMoney)
                    setTotalMoneyRefund(data.data.totalMoneyRefundValue)
                }
            }
        };
        getData();
    }, [condition]);

    const rowSelection: TableRowSelection<DataType> = {
        onChange: (selectedRowKeys, selectedRows) => {
            if (selectedRows?.length > 0) {
                setSelected(true);
            } else {
                setSelected(false);
            }
        },
        onSelect: (record, selected, selectedRows) => {
            setNumberSelected(selectedRows?.length);
        },
        onSelectAll: (selected, selectedRows, changeRows) => { },
    };

    const handlePageChange = (page) => {
        if (page !== current) {
            setCurrent(page);
        }
    };
    return (
        <div className="custom_table">
            <Col style={{ marginBottom: '8px' }}>
                <div className="total" style={{ fontSize: '16px' }}>
                    Tổng số: <b>{totalRecords}</b> đơn hàng
                </div>
            </Col>
            <Row justify="space-between" style={{ marginBottom: '20px' }}>
                <Col>
                    <div className="total" style={{ fontSize: '16px' }}>
                        Tổng số tiền nhận: <b>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalMoney)}</b>
                    </div>
                </Col>
                <Col>
                    <div className="total" style={{ fontSize: '16px' }}>
                        Tổng số tiền hoàn: <b>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalMoneyRefund)}</b>
                    </div>
                </Col>
                <Col>
                    <div className="total" style={{ fontSize: '16px' }}>
                        Tổng số tiền thực nhận: <b>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalMoney - totalMoneyRefund)}</b>
                    </div>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={listData}
                // rowSelection={{ ...rowSelection }}
                bordered
                scroll={{ x: 1500, y: 1200 }}
                pagination={{
                    style: { paddingBottom: 30, float: "left" },
                    current: current,
                    total: totalRecords,
                    pageSize: 10,
                    onChange: handlePageChange,
                }}
            />
        </div>
    );
};

export default TableDataOrderNew;
