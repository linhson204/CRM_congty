import React from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import BillActionTable from "@/components/crm/bill/bill_table_action";
import styles from "../order/order.module.css";
import OrderActionTable from "../order/order_action_table";
import Link from "next/link";

interface DataType {
  key: React.Key;
  number: string;
  name: string;
  status: string;
  bill_number: string;
  code: string;
  date: string;
  total: string;
  address: string;
  status_bill: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Số đề nghị xuất hóa đơn",
    width: 180,
    dataIndex: "number",
    key: "number",
    render: (text: any, record: any) => (
      <Link href={`/bill/detail/${record.key}`}>
        <b>{text}</b>
      </Link>
    ),
  },
  {
    title: "Khách hàng",
    width: 180,
    dataIndex: "name",
    key: "name",
    render: (text: any, record: any) => (
      <Link href={`/customer/detail/${record.key}`}>
        <b>{text}</b>
      </Link>
    ),
  },
  {
    title: "Tình trạng",
    dataIndex: "status",
    key: "status",
    width: 100,
  },
  {
    title: "Số hóa đơn",
    dataIndex: "bill_number",
    key: "bill_number",
    width: 100,
    ellipsis: true,
  },
  {
    title: "Mã tra cứu",
    dataIndex: "code",
    key: "code",
    width: 120,
  },
  {
    title: "Ngày hóa đơn",
    dataIndex: "date",
    key: "date",
    width: 120,
  },
  {
    title: "Tổng tiền (VNĐ)",
    dataIndex: "total",
    key: "total",
    width: 120,
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
    width: 350,
    ellipsis: true,
  },
  {
    title: "Tình trạng gửi hóa đơn",
    dataIndex: "status_bill",
    key: "status_bill",
    width: 220,
    render: (text) => <div style={{ color: "#FFA800" }}>{text}</div>,
  },
  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "11",
    width: 150,
    fixed: "right",
    render: (text: any, record: any) => <BillActionTable record={record.key} />,
  },
];

export const data: DataType[] = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i,
//     number: `ĐN-0000`,
//     name: `Nguyễn Trần Kim Phượng`,
//     status: `Đã xuất`,
//     bill_number: `- `,
//     code: `-`,
//     date: `-`,
//     total: `10.000.000.000`,
//     address: `Số 1 Trần Nguyên Đán, Định Công, Hoàng Mai, Hà Nội`,
//     status_bill: `Chưa gửi`,
//   });
// }

interface TableDataCampaignBillProps {
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
}

const TableDataCampaignBill: React.FC<TableDataCampaignBillProps> = ({
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
        rowSelection={{ ...rowSelection }}
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

export default TableDataCampaignBill;
