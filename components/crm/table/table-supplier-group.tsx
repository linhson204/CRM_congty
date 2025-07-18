import React, { useState } from "react";
import styles from "../supplier/suplier.module.css";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import Link from "next/link";
import SupplierActionTable from "@/components/crm/supplier/supplier_table_action";

interface DataType {
  groupname: string;
  description: string;
  quantity: string;
  function: string;
}
const columns: ColumnsType<DataType> = [
  {
    title: "Tên nhóm",
    width: 1,
    dataIndex: "groupname",
    key: "0",
  },
  {
    title: "Mô tả nhóm",
    width: 2,
    dataIndex: "description",
    key: "1",
    render: (data) => (
      <Tooltip title={data}>
        <span>{data}</span>
      </Tooltip>
    ),
  },
  {
    title: "Số lượng NCC",
    dataIndex: "quantity",
    key: "2",
    width: 1,
  },
  {
    title: "Chức năng",
    dataIndex: "function",
    key: "4",
    width: 2,
    render: () => <SupplierActionTable />,
  },
];

const data: DataType[] = [];
// for (let i = 0; i < 3; i++) {
//   data.push({
//     groupname: `abc`,
//     description: `NMH`,
//     quantity: `3`,
//     function: "",
//   });
// }

interface TableDataContracDrops {
  setSelected: (value: boolean) => void;
}

const TableDataContract: React.FC<TableDataContracDrops> = ({}: any) => {
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 1000, y: 1100 }}
      />
    </div>
  );
};

export default TableDataContract;
