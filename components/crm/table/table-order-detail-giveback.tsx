import React from "react";
import { Table, Tooltip } from "antd";
import styles from "../order/order.module.css";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
// import { TableRowSelection } from "antd/es/table/interface";
import OrderDetailGivebackActionTable from "@/components/crm/order/order_detail/order_detail_giveback_action_table";

interface DataType {
  key: React.Key;
  number: string;
  status: string;
  status_execute: string;
  explain: string;
  date: string;
  order_number: string;
  total: string;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 30,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Số đề nghị",
    width: 50,
    dataIndex: "number",
    key: "number",
    render: (text: any) => (
      <Link href={"/order/detail"}>
        <b>{text}</b>
      </Link>
    ),
  },

  {
    title: "Tình trạng đề nghị",
    width: 100,
    dataIndex: "status",
    key: "status",
    render: (text) => <div style={{ color: "#4C5BD4" }}>{text}</div>,
  },
  {
    title: "Tình trạng thực hiện",
    dataIndex: "status_execute",
    key: "status_execute",
    width: 80,
  },
  {
    title: "Diễn giải",
    dataIndex: "explain",
    key: "explain",
    width: 160,
  },
  {
    title: "Ngày đề nghị",
    dataIndex: "date",
    key: "date",
    width: 80,
  },
  {
    title: "Số đơn hàng",
    dataIndex: "order_number",
    key: "order_number",
    width: 60,
    render: (text: any) => (
      <Link href={"/order/detail"}>
        <b>{text}</b>
      </Link>
    ),
  },
  {
    title: "Tổng tiền (VNĐ)",
    dataIndex: "total",
    key: "total",
    width: 60,
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
    width: 200,
  },
  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "11",
    width: 50,
    fixed: "right",
    render: () => <OrderDetailGivebackActionTable />,
  },
];

export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    number: `ĐN-0000`,
    status: "Đã thực hiện",
    status_execute: "Đã hủy bỏ",
    explain: "Đề nghị trả hàng Nguyễn Trần Kim Phượng",
    date: "09/03/2022",
    order_number: "ĐH-0000",
    total: "10.000.000.0000",
    address: "Số 1 Trần Nguyên Đán, Định Công, Hoàng Mai, Hà Nôi.",
  });
}

interface TableDataOrderDetailBillProps {}

const TableDataOrderDetailBill: React.FC<
  TableDataOrderDetailBillProps
> = () => {
  return (
    <div className="custom_table campaign_tble">
      <Table
        columns={columns}
        dataSource={data}
        // rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: 1500, y: 820 }}
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
          Tổng số: <b>{data.length}</b> Đề nghị
        </div>
      </div>
    </div>
  );
};

export default TableDataOrderDetailBill;
