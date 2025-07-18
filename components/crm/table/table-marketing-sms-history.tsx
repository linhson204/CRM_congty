import React from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import MarketingSMSHistoryActionTable from "../marketing/sms/sms_history_action_table";
import Link from "next/link";

interface DataType {
  key: React.Key;
  id: number;
  module: string;
  trangthai: string;
  telenumber: string;
  content: string;
  sender: string;
  date: string;
  telenumbersend: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 50,
    dataIndex: "id",
    key: "0",
  },
  {
    title: "Phân hệ gửi",
    width: 150,
    dataIndex: "module",
    key: "1",
  },
  {
    title: "Đối tượng gửi",
    width: 250,
    dataIndex: "object",
    key: "2",
    render: () => (
     <Link href="sms/detail">Nguyễn Trần Kim Phượng</Link>
    ),
  },
  {
    title: "Trạng thái",
    width: 150,
    dataIndex: "trangthai",
    key: "3",
  },
  {
    title: "Điện thoại",
    width: 150,
    dataIndex: "telenumber",
    key: "4",
  },
  {
    title: "Nội dung",
    width: 300,
    dataIndex: "content",
    key: "5",
  },
  {
    title: "Người thực hiện",
    dataIndex: "sender",
    key: "6",
    width: 280,
  },
  {
    title: "Ngày gửi",
    dataIndex: "date",
    key: "7",
    width: 180,
  },
  {
    title: "Số điện thoại gửi",
    dataIndex: "telenumbersend",
    key: "8",
    width: 200,
  },
  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "9",
    width: 120,
    fixed:"right",
    render: () => 
      <MarketingSMSHistoryActionTable/>
  },
];

export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    id: i + 1,
    module: "Khách hàng",
    trangthai: "Chưa gửi",
    telenumber: "0987656341",
    content: "Chào chị Phượng, mình có lịch hẹn demo lúc 14:00 ngày 22/03/2022 nhé!",
    sender: "Công ty Cổ phần Thanh toán Hưng Hà",
    date: "10:10 - 22/03/2022",
    telenumbersend: "0987654321",
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
        scroll={{ x: 1500, y: 400 }}
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

export default TableDataSMSForm;
