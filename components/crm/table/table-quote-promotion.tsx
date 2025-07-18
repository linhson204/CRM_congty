import React, { useState } from "react";
import { Checkbox, Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import ModalCTPromotion from "./modal/Modal-quote-promotion-ctt";

interface DataType {
  key: React.Key;
  tenCTKM: string;
  detail: string;
  maKM: string;
}

export const data: DataType[] = [];
for (let i = 0; i < 2; i++) {
  data.push({
    key: i,
    tenCTKM: `Chương trình khuyến mại ${i}`,
    detail: `Giảm 20.000 VNĐ`,
    maKM: `CTKM ${i}`,
  });
}

interface TableDataOrderPromotionProps {}

const TableDataQuotePromotion: React.FC<TableDataOrderPromotionProps> = () => {
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
  const [isShowModalctt, setIsShowModalctt] = useState(false);
  const columns: ColumnsType<DataType> = [
    {
      title: (
        <div>
          <Checkbox></Checkbox> Mã CTKM
        </div>
      ),
      width: 48,
      dataIndex: "maKM",
      key: "maKM",
      render: (text: string) => (
        <div>
          <Checkbox></Checkbox> {text}
        </div>
      ),
    },
    {
      title: "Tên CTKM",
      width: 100,
      dataIndex: "tenCTKM",
      key: "tenCTKM",
    },
    {
      title: "Chi tiết",
      width: 100,
      dataIndex: "detail",
      key: "detail",
      render: (text: string) => (
        <div style={{ cursor: "pointer" }} onClick={() => setIsShowModalctt(true)}>
          {text}
        </div>
      ),
    },
  ];
  return (
    <div className="custom_table campaign_tble">
      <ModalCTPromotion
        isShowModalctt={isShowModalctt}
        setIsShowModalctt={setIsShowModalctt}
      />
      <div style={{ width: "100%", display: "flex" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "120px",
            justifyContent: "center",
            border: "1px solid #ccc",
            background: "#E1E1E1",
            borderTopLeftRadius: 10,
            height: 50,
            fontSize: 18,
          }}
        >
          2- Coca
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "180px",
            justifyContent: "center",
            border: "1px solid #ccc",
            background: "#E1E1E1",
            height: 50,
            fontSize: 18,
          }}
        >
          ĐVT: Chai
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "70px",
            justifyContent: "center",
            border: "1px solid #ccc",
            background: "#E1E1E1",
            height: 50,
            fontSize: 18,
          }}
        >
          SL: 1
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "250px",
            justifyContent: "center",
            border: "1px solid #ccc",
            background: "#E1E1E1",
            height: 50,
            borderTopRightRadius: 10,
            fontSize: 18,
          }}
        >
          Tổng tiền: 500.000 VNĐ
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 500, y: 300 }}
      />
    </div>
  );
};

export default TableDataQuotePromotion;
