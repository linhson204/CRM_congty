import React from "react";
import { Table, Tooltip } from "antd";
import styles from "../order/order.module.css";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
// import { TableRowSelection } from "antd/es/table/interface";
import QuoteActionLichHenTable from "../quote/action_lich_hen_table";
import PotentialActionEmailTable from "../potential/action_table/potential_action_Email";
import PotentialActionSMSTable from "../potential/action_table/potential_action_Sms";

interface DataType {
  key: React.Key;
  number: string;
  name: string;
  status: string;
  total: string;
  address: string;
  order_status: string;
  date: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 50,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Số điện thoại nhận",
    width: 300,
    dataIndex: "number",
    key: "number",
    render: (text: any, record: any) => (
      <Link href={`/marketing/sms/detail`}>
        <b>{text}</b>
      </Link>
    ),
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: 100,
    render: (text) => <div style={{ color: "#FF3333" }}>{text}</div>,
  },
  {
    title: "Nội dung",
    dataIndex: "status",
    key: "status",
    width: 300,
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Người gửi",
    width: 200,
    dataIndex: "name",
    key: "name",
    render: (text: any) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src="/crm/user_kh.png"></img>
        <div>{text}</div>
      </div>
    ),
  },
  {
    title: "Ngày gửi",
    dataIndex: "date",
    key: "date",
    width: 150,
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Số diện thoại gửi",
    dataIndex: "number",
    key: "number",
    width: 150,
    render: (text) => <div>{text}</div>,
  },

  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "11",
    width: 80,
    fixed: "right",
    render: (text: any, record: any) => (
      <PotentialActionSMSTable record={record.number} />
    ),
  },
];

export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    number: `0367648999`,
    name: "Nguyễn Trần Kim Phượng",
    status: "Đã hủy",
    total: "10.000.000.000",
    address: `Số 1 Trần Nguyên Đán, Định Công, Hoàng Mai, Hà Nội`,
    order_status: `Chưa gửi`,
    date: "09/08/2023",
  });
}

interface TableDataCampaignProps {}

const TableDataSMSPo: React.FC<TableDataCampaignProps> = () => {
  return (
    <div className="custom_table campaign_tble">
      <Table
        columns={columns}
        dataSource={data}
        // rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: "100%", y: 600 }}
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
          Tổng số: <b>{data.length}</b> SMS
        </div>
      </div>
    </div>
  );
};

export default TableDataSMSPo;
