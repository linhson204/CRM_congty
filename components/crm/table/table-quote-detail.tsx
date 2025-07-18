import React from "react";
import { useState } from "react";
import styles from "../order/order.module.css";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import QuoteApplyModal from "../quote/add_quote_action_modal/quote_apply";

interface DataType {
  key: React.Key;
  idproduct: string;
  nameproduct: string;
  donvi: string;
  soluong: string;
  dongia: string;
  chietkhau: string;
  tienchietkhau: string;
  tien: string;
  thue: string;
  tienthue: string;
  total: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 30,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Mã hàng hóa",
    width: 80,
    dataIndex: "idproduct",
    key: "0",
  },
  {
    title: "Số lượng",
    dataIndex: "soluong",
    key: "3",
    width: 70,
  },
  {
    title: "Đơn giá (VNĐ)",
    dataIndex: "dongia",
    key: "4",
    width: 80,
  },
  {
    title: "VAT (%)",
    dataIndex: "chietkhau",
    key: "6",
    width: 110,
  },
  {
    title: "Thành tiền (VNĐ)",
    dataIndex: "tien",
    key: "5",
    width: 100,
  },
];

const data: DataType[] = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: i + 1,
    idproduct: "VT-0000",
    nameproduct: "Bánh",
    donvi: "Hộp",
    soluong: "100",
    dongia: "100.000",
    tien: "100.000",
    chietkhau: "100.000",
    tienchietkhau: "100.000",
    thue: "10",
    tienthue: "1.000.000",
    total: "101.000.000",
  });
}

interface TableDataOrderDetailDrops {
  setSelected: (value: boolean) => void;
}

const TableDataQuoteDetail: React.FC<TableDataOrderDetailDrops> = ({}: any) => {
  const [isModalCancel, setIsModalCancel] = useState(false);
  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: "100%", y: 1100 }}
        pagination={false}
      />
      {
        <QuoteApplyModal
          isModalCancel={isModalCancel}
          setIsModalCancel={setIsModalCancel}
          title="Áp dụng cho hàng hóa"
          // content="Hello"
        />
      }
    </div>
  );
};

export default TableDataQuoteDetail;
