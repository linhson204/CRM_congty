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
    width: 70,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Mã sản phẩm",
    width: 120,
    dataIndex: "filename",
    key: "0",
    render: (data) => (
      <Tooltip title={data}>
        <span>{data}</span>
      </Tooltip>
    ),
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "personname",
    key: "1",
    width: 200,
    render: (text) => <div style={{ color: "#4C5BD4" }}>{text}</div>,
  },
  {
    title: "Đơn vị tính",
    dataIndex: "date1",
    key: "2",
    width: 120,
  },
  {
    title: "Số lượng",
    dataIndex: "date1",
    key: "2",
    width: 120,
  },
  {
    title: "Đơn hàng",
    dataIndex: "date2",
    key: "3",
    width: 150,
  },
  {
    title: "Giá trị (VNĐ)",
    dataIndex: "date2",
    key: "3",
    width: 120,
  },
  {
    title: "Ngày mua hàng",
    dataIndex: "date2",
    key: "3",
    width: 150,
  },
];

const data: DataType[] = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i + 1,
    filename: `Dulich.docx ${i}`,
    personname: `NguyenVanHung`,
    operation: "",
    date1: `10/07/2023`,
    date2: `17/07/2023`,
  });
}

interface TableProductListBuyProps {}

const TableProductListBuy: React.FC<TableProductListBuyProps> = () => {
  return (
    <div className="custom_table product_return">
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 992, y: 1100 }}
      />
    </div>
  );
};

export default TableProductListBuy;
