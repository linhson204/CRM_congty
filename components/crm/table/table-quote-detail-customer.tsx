import React, { useState } from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import Link from "next/link";
import QuoteActionTable from "../quote/quote_action_table";

interface DataType {
  key: React.Key;
  order_number: string;
  status: string;
  customer: string;
  explain: string;
  value: number;
  name: string;
  order_date: string;
  order_status: string;
  delivery_status: string;
}

interface TableDataOrderQuoteProps {}

const TableDataQuoteDetailCustomerChance: React.FC<
  TableDataOrderQuoteProps
> = () => {
  const [key, setKey] = useState();
  const [allKey, setAllKey] = useState<any>();

  const columns: ColumnsType<DataType> = [
    {
      title: "Số báo giá",
      width: 120,
      dataIndex: "order_number",
      key: "order_number",
      render: (text: any, record: any) => (
        <Link href={`/quote/detail/${record.order_number}`}>
          <b>{text}</b>
        </Link>
      ),
    },
    {
      title: "Tình trạng",
      width: 120,
      dataIndex: "status",
      key: "status",
      render: (text) => <div style={{ color: "#34B632" }}>{text}</div>,
    },
    {
      title: "Ngày báo giá",
      dataIndex: "order_date",
      key: "order_date",
      width: 250,
    },
    {
      title: "Hiệu lực đến ngày",
      dataIndex: "order_date",
      key: "order_date",
      width: 250,
    },
    {
      title: "Khách hàng",
      dataIndex: "explain",
      key: "customer",
      width: 300,
    },
    {
      title: "Tổng tiền (VNĐ)",
      dataIndex: "value",
      key: "value",
      width: 120,
    },
    {
      title: "Mô tả",
      dataIndex: "customer",
      key: "customer",
      width: 300,
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "11",
      width: 150,
      fixed: "right",
      render: (text: any, record: any) => (
        <div onClick={() => setKey(record.order_number)}>
          <QuoteActionTable record={key} allKey={allKey} />
        </div>
      ),
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 15; i++) {
    data.push({
      key: i,
      order_number: `ĐH-000${i}`,
      status: `Chờ duyệt`,
      customer: `Nguyễn Trần Kim Phượng`,
      explain: `Đơn hàng Nguyễn Trần Kim Phượng Đơn hàng Nguyễn Trần Kim Phượng  `,
      value: 10000000,
      name: `Nguyễn Văn Nam`,
      order_date: "01/08/2023",
      order_status: `Đã thanh toán một phần`,
      delivery_status: `Chưa giao hàng`,
    });
  }
  return (
    <div className="custom_table campaign_tble">
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 600, y: 300 }}
      />
    </div>
  );
};

export default TableDataQuoteDetailCustomerChance;
