import React from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import Link from "next/link";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  operation: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Tên danh sách",
    width: 150,
    dataIndex: "name",
    key: "name",
    render:(text:any) =><Link href={"#"}>{text}</Link>
  },
  {
    title: "Số lượng liên hệ",
    width: 150,
    dataIndex: "age",
    key: "age",
    render: (data) => (
      <Tooltip title={data}>
        <span>{data}</span>
      </Tooltip>
    ),
  },
  {
    title: "Nhà cung cấp",
    dataIndex: "address",
    key: "1",
    width: 150,
  },
  {
    title: "Người tạo",
    dataIndex: "address",
    key: "2",
    width: 150,
  },
  {
    title: "Ngày tạo",
    dataIndex: "address",
    key: "3",
    width: 150,
  },
];

export const data: DataType[] = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
    operation: `Nguyen Van Hung`,
  });
}

interface TableDataEmailMarketingProps {}

const TableDataEmailMarketing: React.FC<TableDataEmailMarketingProps> = () => {
  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows?.length > 0) {
      } else {
      }
    },
    onSelect: (record, selected, selectedRows) => {},
    onSelectAll: (selected, selectedRows, changeRows) => {},
    fixed: "left",
  };
  return (
    <div className="custom_table campaign_tble">
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: 1500, y: 300 }}
      />
    </div>
  );
};

export default TableDataEmailMarketing;
