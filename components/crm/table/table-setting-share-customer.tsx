import React from "react";
import styles from "../setting/sales_process/sales_process.module.css";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import Link from "next/link";

interface DataType {
  key: React.Key;
  name: string;
  phong: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 30,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Tên nhân viên",
    width: 120,
    dataIndex: "name",
    key: "0",
    render: (data) => (
      <Tooltip title={data}>
        <span>{data}</span>
      </Tooltip>
    ),
  },
  {
    title: "Phòng ban",
    dataIndex: "phong",
    key: "1",
    width: 100,
  },
];

const data: DataType[] = [];
// for (let i = 0; i < 20; i++) {
//   data.push({
//     key: i + 1,
//     name: `Test Anh`,
//     phong: `KỸ THUẬT`,
//   });
// }

interface TableDataShareCustomerDrops {
  setSelected: (value: boolean) => void;
}

const TableDataShareCustomer: React.FC<
  TableDataShareCustomerDrops
> = ({}: any) => {
  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 1000, y: 1100 }}
      />
      <div className="show_number_item"></div>
      <div className="total">
        Tổng số: <b>{data.length}</b> Đối tượng
      </div>
    </div>
  );
};

export default TableDataShareCustomer;
