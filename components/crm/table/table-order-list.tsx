import React from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";

interface DataType {
  key: React.Key;
  mahanghoa: string;
  tenhanghoa: string;
  nhomhanghoa: string;
  donvitinh: string;
  dongia: string;
  thue: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Mã hàng hóa",
    width: 100,
    dataIndex: "mahanghoa",
    key: "mahanghoa",
  },
  {
    title: "Tên hàng hóa",
    width: 220,
    dataIndex: "tenhanghoa",
    key: "tenhanghoa",
    // render: (data) => (
    //   <Tooltip title={data}>
    //     <span>{data}</span>
    //   </Tooltip>
    // ),
  },
  {
    title: "Nhóm hàng hóa",
    dataIndex: "nhomhanghoa",
    key: "nhomhanghoa",
    width: 120,
  },
  {
    title: "Đơn vị tính",
    dataIndex: "donvitinh",
    key: "donvitinh",
    width: 120,
  },
  {
    title: "Đơn giá",
    dataIndex: "dongia",
    key: "dongia",
    width: 120,
  },
  {
    title: "Thuế GTGT",
    dataIndex: "thue",
    key: "thue",
    width: 120,
  },

];


export const data: DataType[] = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    mahanghoa: `HH-000${i}`,
    tenhanghoa:  `Dịch vụ bảo hành máy tính trọn đời`,
    nhomhanghoa: `Dịch vụ máy tính`,
    donvitinh: `Gói`,
    dongia: `1.000.000.000`,
    thue: `10%`,
  });
}

interface TableDataOrderListProps {}

const TableDataOrderList: React.FC<TableDataOrderListProps> = () => {
  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
     
      if (selectedRows?.length > 0) {
      } else {
      }
    },
    onSelect: (record, selected, selectedRows) => {},
    onSelectAll: (selected, selectedRows, changeRows) => {},
    fixed: "left",
  };
  return (
    <div className="custom_table campaign_tble">
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: 600, y: 300 }}
      />
    </div>
  );
};

export default TableDataOrderList;
