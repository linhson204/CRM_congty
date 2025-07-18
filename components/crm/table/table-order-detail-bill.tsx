import React from "react";
import { Table, Tooltip } from "antd";
import styles from "../order/order.module.css";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
// import { TableRowSelection } from "antd/es/table/interface";
import OrderActionTable from "../order/order_action_table";

interface DataType {
  key: React.Key;
  number: string;
  name: string;
  status: string;
  total: string;
  address: string;
  order_status: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 50,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Số đề nghị xuất hóa đơn",
    width: 180,
    dataIndex: "number",
    key: "number",
    render: (text: any) => (
      <Link href={"/order/detail"}>
        <b>{text}</b>
      </Link>
    ),
  },

  {
    title: "Người mua hàng",
    width: 200,
    dataIndex: "name",
    key: "name",
    render: (text: any) => (
      <Link href={"/customer/contact/detail"}>
        <b>{text}</b>
      </Link>
    ),
  },
  {
    title: "Tình trạng",
    dataIndex: "status",
    key: "status",
    width: 70,
    render: (text) => <div style={{ color: "#FFA800" }}>{text}</div>,
  },
  {
    title: "Tổng tiền (VNĐ)",
    dataIndex: "total",
    key: "total",
    width: 150,
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
    width: 300,
  },
  {
    title: "Tình trạng gửi hóa đơn",
    dataIndex: "order_status",
    key: "order_status",
    width: 150,
    render: (text) => <div style={{ color: "#FFA800" }}>{text}</div>,
  },

  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "11",
    width: 80,
    fixed: "right",
    render: () => <OrderActionTable />,
  },
];

export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    number: `ĐN-000${i}`,
    name: "Nguyễn Trần Kim Phượng",
    status: "Đã xuất",
    total: "10.000.000.000",
    address: `Số 1 Trần Nguyên Đán, Định Công, Hoàng Mai, Hà Nội`,
    order_status: `Chưa gửi`,
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
          Tổng số: <b>{data.length}</b> Đề nghị trả hàng
        </div>
      </div>
    </div>
  );
};

export default TableDataOrderDetailBill;
