import React from "react";
import styles from "../supplier/suplier.module.css";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import Link from "next/link";

interface DataType {
  key: React.Key;
  personname: string;
  date1: string;
  date2: string;
  filename: string;
  operation: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Mã NCC",
    width: 50,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Tên nhà cung cấp",
    width: 200,
    dataIndex: "filename",
    key: "0",
    render: (data) => (
      <Tooltip title={data}>
        <span>{data}</span>
      </Tooltip>
    ),
  },
  {
    title: "Điện thoại",
    dataIndex: "personname",
    key: "1",
    width: 200,
  },
  {
    title: "Địa chỉ",
    dataIndex: "date1",
    key: "2",
    width: 150,
  },
  {
    title: "Nhóm nhà cung cấp",
    dataIndex: "date2",
    key: "3",
    width: 150,
  },
];

const data: DataType[] = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i + 1,
//     filename: `NMH`,
//     personname: `0346614342`,
//     operation: "",
//     date1: `HX`,
//     date2: `1`,
//   });
// }

interface TableDataContracDrops {
  setSelected: (value: boolean) => void;
}

const TableDataContract: React.FC<TableDataContracDrops> = ({}: any) => {
  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 1500, y: 1100 }}
      />
    </div>
  );
};

export default TableDataContract;
