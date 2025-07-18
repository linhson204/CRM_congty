import React from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import styles from "../order/order.module.css";
import OrderActionTable from "../order/order_action_table";
import Link from "next/link";

interface DataType {
  key: React.Key;
  order_number: string;
  status: string;
  explain: string;
  value: number;
  name: string;
  order_date: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 50,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Số đơn hàng",
    width: 120,
    dataIndex: "order_number",
    key: "order_number",
    render: (text: any, record: any) => (
      <Link href={`/order/detail/${record.key}`}>
        <b>{text}</b>
      </Link>
    ),
  },
  {
    title: "Trạng thái",
    width: 120,
    dataIndex: "status",
    key: "status",
    render: (text) => <div style={{ color: "#FFA800" }}>{text}</div>,
  },
  {
    title: "Diễn giải",
    dataIndex: "explain",
    key: "explain",
    width: 300,
    // ellipsis: true,
  },
  {
    title: "Giá trị (VNĐ)",
    dataIndex: "value",
    key: "value",
    width: 120,
  },
  {
    title: "Người thực hiện",
    dataIndex: "name",
    key: "name",
    width: 180,
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
    title: "Ngày đặt hàng",
    dataIndex: "order_date",
    key: "order_date",
    width: 120,
  },
  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "11",
    width: 150,
    fixed: "right",
    render: () => <OrderActionTable />,
  },
];

export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    order_number: `ĐH-000${i}`,
    status: `Chờ duyệt`,
    explain: `Đơn hàng Nguyễn Trần Kim Phượng Đơn hàng Nguyễn Trần Kim Phượng  `,
    value: 10000000,
    name: `Nguyễn Văn Nam`,
    order_date: "01/08/2023",
  });
}

interface TableDataBillOrderProps {}

const TableDataBillOrder: React.FC<TableDataBillOrderProps> = ({
  setSelected,
  setNumberSelected,
}: any) => {
  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows?.length > 0) {
        setSelected(true);
      } else {
        setSelected(false);
      }
    },
    onSelect: (record, selected, selectedRows) => {
      setNumberSelected(selectedRows?.length);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {},
  };
  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={data}
        // rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: 1500, y: 1200 }}
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
          Tổng số: <b>{data.length}</b> Đơn hàng
        </div>
      </div>
    </div>
  );
};

export default TableDataBillOrder;
