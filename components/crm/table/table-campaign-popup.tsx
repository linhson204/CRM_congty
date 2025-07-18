import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { TableRowSelection } from "antd/es/table/interface";
import styles from "../potential/potential2.module.css";

interface DataType {
  key: React.Key;
  name: string;
  status: string;
  type: string;
  date_start: string;
  date_end: string;
  sale: number;
  budget: number;
  person: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Tên chiến dịch",
    width: 150,
    dataIndex: "name",
    key: "name",
    render: (text: any, record: any) => (
      <Link href={`/campaign/detail/${record.key}`}>
        <b>{text}</b>
      </Link>
    ),
  },
  {
    title: "Tình trạng",
    width: 100,
    dataIndex: "status",
    key: "status",
    className: styles["orange-text"],
    // render: (data) => (
    //   <Tooltip title={data}>
    //     <span>{data}</span>
    //   </Tooltip>
    // ),
  },
  {
    title: "Loại",
    dataIndex: "type",
    key: "type",
    width: 70,
  },
  {
    title: "Ngày bắt đầu",
    dataIndex: "date_start",
    key: "date_start",
    width: 80,
  },
  {
    title: "Ngày kết thúc",
    dataIndex: "date_end",
    key: "date_end",
    width: 80,
  },

  {
    title: "Người phụ trách",
    dataIndex: "person",
    key: "person",
    width: 150,
  },
];

export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Campaign ${i}`,
    status: "Đang diễn ra",
    type: "abc",
    date_start: "29/07/2023",
    date_end: `30/07/2023`,
    sale: 10000000,
    budget: 10000000,
    person: `Nguyen Van Hung`,
  });
}

interface TableDataCampaignProps {
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
}

const TableDataCampaignPopup: React.FC<TableDataCampaignProps> = ({
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
    <div className="custom_table campaign_tble">
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: 1500, y: 320 }}
      />
    </div>
  );
};

export default TableDataCampaignPopup;
