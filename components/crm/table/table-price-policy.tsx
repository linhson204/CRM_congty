import React from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import styles from "../price_policy/price_policy.module.css";
import { Button, Dropdown, Space } from "antd";
import PricePolicyActionTable from "../price_policy/price_policy_action_table";

interface DataType {
  key: React.Key;
  id: string;
  name: string;
  object: string;
  date1: string;
  date2: string;
  creator: string;
  creatdate: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Mã chính sách giá",
    width: 180,
    dataIndex: "id",
    key: "0",
  },
  {
    title: "Tên chính sách giá",
    width: 380,
    dataIndex: "name",
    key: "1",
    render: (data) => (
      <Tooltip title={data}>
        <span>{data}</span>
      </Tooltip>
    ),
  },
  {
    title: "Đối tượng",
    dataIndex: "object",
    key: "2",
    width: 200,
  },
  {
    title: "Từ ngày",
    dataIndex: "date1",
    key: "4",
    width: 150,
  },
  {
    title: "Đến ngày",
    dataIndex: "date2",
    key: "5",
    width: 150,
  },
  {
    title: "Người tạo",
    dataIndex: "creator",
    key: "6",
    width: 150,
  },
  {
    title: "Ngày tạo",
    dataIndex: "creatdate",
    key: "7",
    width: 150,
  },
  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "8",
    width: 200,
    render: () => 
      <PricePolicyActionTable/>
  },
];

export const data: DataType[] = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i,
//     id: "123456",
//     name: `Chính sách giá tháng 4 cho dịch vụ sửa chữa`,
//     object: "Theo khách hàng cụ thể",
//     date1: "10/10/2020",
//     date2: "10/10/2020",
//     creator: "Nguyễn Văn Hùng",
//     creatdate: "10:10 - 22/03/2022",
//   });
// }

interface TableDataPricePolicyProps {
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
}

const TableDataPricePolicy: React.FC<TableDataPricePolicyProps> = ({
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
        scroll={{ x: 1500, y: 300 }}
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
          Tổng số: <b>{data.length}</b> Chính sách giá
        </div>
      </div>
    </div>
  );
};

export default TableDataPricePolicy;
