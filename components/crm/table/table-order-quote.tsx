import React from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";

interface DataType {
    key: React.Key;
    sobaogia: string;
    status: string;
    ngaybaogia: string;
    hieuluc: string;
    khachhang: string;
    tongtien: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: "Số báo giá",
        width: 100,
        dataIndex: "sobaogia",
        key: "sobaogia",
    },
    {
        title: "Tình trạng",
        width: 100,
        dataIndex: "status",
        key: "status",
        // render: (data) => (
        //   <Tooltip title={data}>
        //     <span>{data}</span>
        //   </Tooltip>
        // ),
    },
    {
        title: "Ngày báo giá",
        dataIndex: "ngaybaogia",
        key: "ngaybaogia",
        width: 120,
    },
    {
        title: "Hiệu lực đến ngày",
        dataIndex: "hieuluc",
        key: "hieuluc",
        width: 150,
    },
    {
        title: "Khách hàng",
        dataIndex: "khachhang",
        key: "khachhang",
        width: 120,
    },
    {
        title: "Tổng tiền (VNĐ)",
        dataIndex: "tongtien",
        key: "tongtien",
        width: 150,
    },

];

export const data: DataType[] = [];
for (let i = 0; i < 10; i++) {
    data.push({
        key: i,
        sobaogia: `BG-000${i}`,
        status: `Bản thảo`,
        ngaybaogia: `10/10/2020`,
        hieuluc: `10/10/2020`,
        khachhang: `Nguyễn Thị Hoa`,
        tongtien: `10.000.000`,
    });
}

interface TableDataOrderQuoteProps { }

const TableDataOrderQuote: React.FC<TableDataOrderQuoteProps> = () => {
    const rowSelection: TableRowSelection<DataType> = {
        onChange: (selectedRowKeys, selectedRows) => {
            if (selectedRows?.length > 0) {
            } else {
            }
        },
        onSelect: (record, selected, selectedRows) => { },
        onSelectAll: (selected, selectedRows, changeRows) => { },
        fixed: "left",
    };
    return (
        <div className="custom_table campaign_tble">
            <Table
                columns={columns}
                dataSource={data}
                rowSelection={{ ...rowSelection }}
                bordered
                scroll={{ x: 600, y: 300 }}
            />
        </div>
    );
};

export default TableDataOrderQuote;
