import React from "react";
import styles from "../contract/contract.module.css";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import ProductActionDropDown from "../product_return/product_action_dropdown";

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
    title: "STT",
    width: 50,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Số đề nghị",
    width: 100,
    dataIndex: "filename",
    key: "0",
    render: (data) => (
      <Link href={`/product_return/detail/${data}`}>
        <span>{data}</span>
      </Link>
    ),
  },
  {
    title: "Khách hàng",
    dataIndex: "personname",
    key: "1",
    width: 200,
  },
  {
    title: "Tình trạng đề nghị",
    dataIndex: "date1",
    key: "2",
    width: 150,
    render: (text) => <div style={{ color: "#FFA800" }}>{text}</div>,
  },
  {
    title: "Tình trạng thực hiện",
    dataIndex: "date1",
    key: "2",
    width: 150,
    render: (text) => <div style={{ color: "#34B632" }}>{text}</div>,
  },
  {
    title: "Diễn giải",
    dataIndex: "date2",
    key: "3",
    width: 350,
  },
  {
    title: "Ngày đề nghị",
    dataIndex: "date2",
    key: "3",
    width: 150,
  },
  {
    title: "Số đơn hàng",
    dataIndex: "date2",
    key: "3",
    width: 150,
  },
  {
    title: "Tổng tiền (VNĐ)",
    dataIndex: "date2",
    key: "3",
    width: 150,
  },
  {
    title: "Địa chỉ",
    dataIndex: "date2",
    key: "3",
    width: 150,
  },
  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "4",
    width: 120,
    fixed: "right",
    render: () => <ProductActionDropDown />,
  },
];

const data: DataType[] = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i + 1,
//     filename: `Dulich.docx ${i}`,
//     personname: `NguyenVanHung`,
//     operation: "",
//     date1: `10/07/2023`,
//     date2: `17/07/2023`,
//   });
// }

interface TableDataProductReturn {}

const TableDataProductReturn: React.FC<TableDataProductReturn> = () => {
  return (
    <div className="custom_table product_return">
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 1500, y: 1100 }}
      />
    </div>
  );
};

export default TableDataProductReturn;
