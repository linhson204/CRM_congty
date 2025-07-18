import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import CommodityAction from "@/components/commodity/ComodityAction";
import ActionGroup from "@/components/commodity/ActionGroup";

interface DataType {
  key: React.Key;
  idCommodity: string;
  name: string;
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
const TableCommodityGroup = ({
  data,
  total,
  setPageSize,
  setRecall = null,
  setPage,
  pageSize,
}): any => {
  const onChangePageSize = (e) => {
    // setPageSize(e.target.value);
    // setPage(1);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: 50,
      dataIndex: "stt",
      key: "0",
    },
    {
      title: "Tên nhóm vật tư, hàng hóa",
      width: 150,
      dataIndex: "gr_name",
      key: "1",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "2",
      width: 200,
    },

    {
      title: "chức năng",
      dataIndex: "operation",
      key: "7",
      width: 80,
      fixed: "right",
      render: (data, record) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ActionGroup setRecall={setRecall} record={record} />
        </div>
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
      <div className="main__footer flex_between" id="">
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

export default TableCommodityGroup;
