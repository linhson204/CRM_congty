import React from "react";
import styles from "../setting/sales_process/sales_process.module.css";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import Link from "next/link";
import SalesProcessSelectBoxStep from "../setting/sales_process_steps/select_box_step"

interface DataType {
  key: React.Key;
  processname: string;
  tile: string;
  operation: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 30,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Tên quy trình",
    width: 120,
    dataIndex: "processname",
    key: "0",
    render: (data) => (
      <Tooltip title={data}>
        <span>{data}</span>
      </Tooltip>
    ),
  },
  {
    title: "Tỉ lệ thành công(%)",
    dataIndex: "tile",
    key: "1",
    width: 70,
  },
  {
    title: "Loại dự báo",
    dataIndex: "trangthai",
    key: "2",
    width: 100,
    render: () => <SalesProcessSelectBoxStep/>
  },
  {
    title: "Phân loại dự báo",
    dataIndex: "phanloai",
    key: "3",
    width: 100,
    render: () => <SalesProcessSelectBoxStep/>
  },
  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "4",
    width: 50,
    // fixed:"right",
    render: () => (
      <div className = {styles.icon_act}>
        <button>
          <svg width="16"height="16"viewBox="0 0 16 16"fill="none"xmlns="http://www.w3.org/2000/svg"><path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"stroke="#4C5BD4"stroke-width="2"stroke-linecap="round"stroke-linejoin="round"></path><path d="M8 5.20001V10.8"stroke="#4C5BD4"stroke-width="2"stroke-linecap="round"stroke-linejoin="round"></path><path d="M5.19995 8H10.8"stroke="#4C5BD4"stroke-width="2"stroke-linecap="round"stroke-linejoin="round"></path></svg>
        </button>
        <button>
          <svg width="16"height="16"viewBox="0 0 16 16"fill="none"xmlns="http://www.w3.org/2000/svg"><path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"stroke="#FF3333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.19995 8H10.8" stroke="#FF3333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </button>
        <button>
          <svg width="16"height="16"viewBox="0 0 16 16"fill="none"xmlns="http://www.w3.org/2000/svg"><path d="M4.875 8.875C5.35825 8.875 5.75 8.48325 5.75 8C5.75 7.51675 5.35825 7.125 4.875 7.125C4.39175 7.125 4 7.51675 4 8C4 8.48325 4.39175 8.875 4.875 8.875Z"fill="#474747"stroke="#474747"stroke-width="2"stroke-linecap="round"stroke-linejoin="round"></path><path d="M4.875 2.75C5.35825 2.75 5.75 2.35825 5.75 1.875C5.75 1.39175 5.35825 1 4.875 1C4.39175 1 4 1.39175 4 1.875C4 2.35825 4.39175 2.75 4.875 2.75Z"fill="#474747"stroke="#474747"stroke-width="2"stroke-linecap="round"stroke-linejoin="round"></path><path d="M4.875 15C5.35825 15 5.75 14.6082 5.75 14.125C5.75 13.6418 5.35825 13.25 4.875 13.25C4.39175 13.25 4 13.6418 4 14.125C4 14.6082 4.39175 15 4.875 15Z"fill="#474747"stroke="#474747"stroke-width="2"stroke-linecap="round"stroke-linejoin="round"></path><path d="M10.875 8.875C11.3582 8.875 11.75 8.48325 11.75 8C11.75 7.51675 11.3582 7.125 10.875 7.125C10.3918 7.125 10 7.51675 10 8C10 8.48325 10.3918 8.875 10.875 8.875Z"fill="#474747"stroke="#474747"stroke-width="2"stroke-linecap="round"stroke-linejoin="round"></path><path d="M10.875 2.75C11.3582 2.75 11.75 2.35825 11.75 1.875C11.75 1.39175 11.3582 1 10.875 1C10.3918 1 10 1.39175 10 1.875C10 2.35825 10.3918 2.75 10.875 2.75Z"fill="#474747"stroke="#474747"stroke-width="2"stroke-linecap="round"stroke-linejoin="round"></path><path d="M10.875 15C11.3582 15 11.75 14.6082 11.75 14.125C11.75 13.6418 11.3582 13.25 10.875 13.25C10.3918 13.25 10 13.6418 10 14.125C10 14.6082 10.3918 15 10.875 15Z"fill="#474747"stroke="#474747"stroke-width="2"stroke-linecap="round"stroke-linejoin="round"></path></svg>
        </button>
      </div>
    ),
  },
];

const data: DataType[] = [];
// for (let i = 0; i < 5; i++) {
//   data.push({
//     key: i + 1,
//     processname: `Quy trình kiểm thử phần mềm`,
//     tile: `90`,
//     operation: "",
//   });
// }

interface TableDataSalesProcessDrops {
  setSelected: (value: boolean) => void;
}

const TableDataSalesProcess: React.FC<
  TableDataSalesProcessDrops
> = ({}: any) => {
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

export default TableDataSalesProcess;
