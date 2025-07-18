import React from "react";
import { Table } from "antd";

import { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  MaHangHoa: string;
  TenHangHoa: string;
  NhomHangHoa: string;
  DonViTinh: string;
  DonGia: string;
}

const columns: ColumnsType /* <DataType> */ = [
  {
    title: "STT",
    width: 50,
    dataIndex: "stt",
    key: "STT",
  },
  {
    title: "Mã hàng hoá",
    width: 180,
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Tên hàng hóa",
    width: 150,
    dataIndex: "prod_name",
    key: "prod_name",
  },
  {
    title: "Nhóm hàng hóa",
    dataIndex: "gr_name",
    key: "gr_name",
    width: 70,
  },
  {
    title: "Đơn vị tính",
    dataIndex: "unit_name",
    key: "unit_name",
    width: 150,
  },
  {
    title: "Đơn giá (VNĐ)",
    dataIndex: "price",
    key: "price",
    width: 150,
  },
];

// const data: DataType[] = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i.toString(),
//     MaHangHoa: `HH-000`,
//     TenHangHoa: "Dịch vụ bảo hành máy tính trọn đời",
//     NhomHangHoa: "Dịch vụ máy tính",
//     DonViTinh: "Gói",
//     DonGia: `1.000.000.000`,
//   });
// }

const TablePotentialshowItem = ({ selectedRowKeys, data }) => {
  return (
    <div className="custom_table campaign_tble ">
      <Table
        rowSelection={selectedRowKeys}
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 1500, y: 320 }}
      />
    </div>
  );
};

export default TablePotentialshowItem;
