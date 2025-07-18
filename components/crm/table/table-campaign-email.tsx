import React from "react";
import { Table, Tooltip } from "antd";
import styles from "../campaign/campaign.module.css";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
// import { TableRowSelection } from "antd/es/table/interface";
import CampaignActionTable from "@/components/crm/campaign/campaign_table_action";

interface DataType {
  key: React.Key;
  mail: string;
  status: string;
  person: string;
  address_send: string;
  date: string;
  address_receive: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 50,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Tiêu đề mail",
    width: 180,
    dataIndex: "mail",
    key: "mail",
    render: (text: any, record: any) => (
      <Link href={`/campaign/detail/${record.key}`}>
        <b>{text}</b>
      </Link>
    ),
  },
  {
    title: "Trạng thái",
    width: 150,
    dataIndex: "status",
    key: "status",
    // render: (data) => (
    //   <Tooltip title={data}>
    //     <span>{data}</span>
    //   </Tooltip>
    // ),
  },
  {
    title: "Người gửi",
    dataIndex: "person",
    key: "person",
    width: 70,
  },
  {
    title: "Địa chỉ gửi",
    dataIndex: "address_send",
    key: "address_send",
    width: 150,
  },
  {
    title: "Ngày gửi",
    dataIndex: "date",
    key: "date",
    width: 150,
  },
  {
    title: "Địa chỉ nhận",
    dataIndex: "address_receive",
    key: "address_receive",
    width: 250,
  },

  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "11",
    width: 150,
    fixed: "right",
    render: (text: any, record: any) => (
      <CampaignActionTable record={record.key} />
    ),
  },
];

export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    mail: `Campaign ${i}`,
    status: "Đang diễn ra",
    person: "abc",
    address_send: "29/07/2023",
    date: `30/07/2023`,
    address_receive: `10000000`,
  });
}

interface TableDataCampaignEmailProps {}

const TableDataCampaignEmail: React.FC<TableDataCampaignEmailProps> = () => {
  return (
    <div className="custom_table campaign_tble">
      <Table
        columns={columns}
        dataSource={data}
        // rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: 1500, y: 320 }}
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
          Tổng số: <b>{data.length}</b> Chiến dịch
        </div>
      </div>
    </div>
  );
};

export default TableDataCampaignEmail;
