import React from "react";
import { Table, Tooltip } from "antd";
import styles from "../order/order.module.css";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
// import { TableRowSelection } from "antd/es/table/interface";
import BillActionTable from "@/components/crm/bill/bill_detail/bill_quote_action_table";

interface DataType {
  key: React.Key;
  name: string;
  status: string;
  date: string;
  personnel: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 20,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Tên lịch hẹn",
    width: 80,
    dataIndex: "name",
    key: "name",
    render: (text: any) => (
      <Link href={"/order/detail"}>
        <b>{text}</b>
      </Link>
    ),
  },

  {
    title: "Trạng thái",
    width: 60,
    dataIndex: "status",
    key: "status",
    render: (text) => <div style={{ color: "#4C5BD4" }}>{text}</div>,
  },
  {
    title: "Thời gian thực hiện",
    dataIndex: "date",
    key: "date",
    width: 60,
  },
  {
    title: "Nhân viên thực hiện",
    dataIndex: "personnel",
    key: "personnel",
    width: 100,
    render: (text: any) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        {" "}
        <div>
          <img src="/crm/user_kh.png" alt="" />
        </div>
        &nbsp;{text}
      </div>
    ),
  },
  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "11",
    width: 30,
    render: () => <BillActionTable />,
  },
];

export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Lịch hẹn - Nguyễn Thị Hòa`,
    status: "Chờ thực hiện",
    date: "09/03/2022",
    personnel: "Nguyễn Văn Hùng",
  });
}

interface TableDataOrderDetailAppointmentProps {}

const TableDataOrderDetailAppointment: React.FC<
  TableDataOrderDetailAppointmentProps
> = () => {
  return (
    <div className="custom_table campaign_tble">
      <Table
        columns={columns}
        dataSource={data}
        // rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: 1000, y: 820 }}
      />
      <div className="main__footer flex_between" id="">
        <div className="show_number_item">
          <b>Hiển thị:</b>
          <select className="show_item">
            <option value={10}>10 bản ghi trên trang</option>
            <option value={20}>20 bản ghi trên trang</option>
            <option value={30}>30 bản ghi trên trang</option>
            <option value={40}>40 bản ghi trên trang</option>
            <option value={50}>50 bản ghi trên trang</option>
          </select>
        </div>
        <div className="total">
          Tổng số: <b>{data.length}</b> Lịch hẹn
        </div>
      </div>
    </div>
  );
};

export default TableDataOrderDetailAppointment;
