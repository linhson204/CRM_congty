import React from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import MarketingSMSFormActionTable from "../marketing/sms/sms_form_action_table";
import Link from "next/link";

interface DataType {
  key: React.Key;
  id: number;
  update: string;
  timeupdate: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 100,
    dataIndex: "id",
    key: "0",
  },
  {
    title: "Tên mẫu",
    width: 250,
    dataIndex: "name",
    key: "1",
    render: () => (
     <Link href="sms/form_detail">Mẫu sms chăm sóc khách hàng Vip</Link>
    ),
  },
  {
    title: "Người cập nhật",
    dataIndex: "update",
    key: "3",
    width: 280,
  },
  {
    title: "Thời gian cập nhật",
    dataIndex: "timeupdate",
    key: "3",
    width: 180,
  },
  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "4",
    width: 120,
    render: () => 
      <MarketingSMSFormActionTable/>
  },
];

export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    id: i + 1,
    update: "Công ty Cổ phần Thanh toán Hưng Hà",
    timeupdate: "10:10 - 22/03/2022",
  });
  };


interface TableDataSMSFormProps {
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
}

const TableDataSMSForm: React.FC<TableDataSMSFormProps> = ( any) => {

  return (
    <div style={{marginTop: "20px"}}>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 500, y: 400 }}
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
          Tổng số: <b>{data.length}</b> Mẫu SMS
        </div>
      </div>
    </div>
  );
};

export default TableDataSMSForm;
