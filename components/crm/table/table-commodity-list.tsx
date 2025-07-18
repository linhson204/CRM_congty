import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import CommodityAction from "@/components/commodity/ComodityAction";

interface DataType {
  key: React.Key;
  idCommodity: string;
  name: HTMLElement | string;
  category: string;
  unit: string;
  capital_price: string;
  price: string;
  min_amount: string;
  group: string;
  description: string;
  operation: "";
}

interface TableDataChanceProps {
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
}
const TableCommodityList = ({
  data,
  total,
  setPageSize,
  setRecall = null,
  setPage,
  pageSize,
}): any => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Mã vật tư, hàng hóa",
      width: 200,
      dataIndex: "idCommodity",
      key: "0",
    },
    {
      title: "Vật tư hàng hóa",
      width: 200,
      dataIndex: "name",
      key: "1",
    },
    {
      title: "Tính chất",
      dataIndex: "category",
      key: "2",
      width: 150,
    },
    {
      title: "Đơn vị tính",
      dataIndex: "unit",
      key: "3",
      width: 120,
    },
    {
      title: "Giá vốn	",
      dataIndex: "capital_price",
      key: "4",
      width: 180,
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "5",
      width: 250,
    },
    {
      title: "Tồn tối thiểu",
      dataIndex: "min_amount",
      key: "6",
      width: 120,
    },
    {
      title: "Nhóm vật tư,hàng hóa",
      dataIndex: "group",
      key: "7",
      width: 200,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "6",
      width: 220,
    },
    {
      title: "chức năng",
      dataIndex: "operation",
      key: "7",
      width: 120,
      fixed: "right",
      render: (data, record) => (
        <CommodityAction setRecall={setRecall} record={record} />
      ),
    },
  ];

  return (
    <div className="custom_table product_return">
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 1500, y: 1100 }}
        pagination={{
          total: total,
          pageSize: pageSize,
          onChange(page, pageSize) {
            setPage(page);
          },
        }}
      />
      <div
        style={{ marginTop: "5px", width: "50%" }}
        className="flex_between"
        id=""
      >
        <div className="show_number_item">
          <b>Hiển thị:</b>
          <select
            onChange={(e) => {
              setPage(1);
              setPageSize(e.target.value);
            }}
            className="show_item"
          >
            <option value={10}>10 bản ghi trên trang</option>
            <option value={20}>20 bản ghi trên trang</option>
            <option value={30}>30 bản ghi trên trang</option>
            <option value={40}>40 bản ghi trên trang</option>
            <option value={50}>50 bản ghi trên trang</option>
          </select>
        </div>
        <div className="total">
          Tổng số: <b>{total}</b> Liên hệ
        </div>
      </div>
    </div>
  );
};

export default TableCommodityList;
