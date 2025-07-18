import React from "react";
import { Table, Tooltip } from "antd";
import styles from "../order/order.module.css";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import BillSelectBoxStep from "../bill/bill_steps/select_box_table_step";
import stylesOrderSelect from "@/components/crm/bill/bill.module.css";
import OrderApplyModal from "../order/add_order_action_modal/order_apply";
// import { TableRowSelection } from "antd/es/table/interface";
import OrderActionTable from "@/components/crm/order/order_detail/order_detail_action_modal/order_detail_share_list_action";

interface DataType {
  key: React.Key;
  type: string;
  name: string;
  room: string;
  right: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 20,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Loại đối tượng",
    width: 80,
    dataIndex: "type",
    key: "type",
  },

  {
    title: "Tên đối tượng",
    width: 60,
    dataIndex: "name",
    key: "name",
    render: (text: any) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        {" "}
        <div>
          <img src="/crm/user_kh.png" alt="" />
        </div>
        &nbsp;{text}
      </div>
    ),
  },
  {
    title: "Phòng ban",
    dataIndex: "room",
    key: "room",
    width: 60,
  },
  {
    title: "Quyền",
    dataIndex: "right",
    key: "right",
    width: 100,
    render: () => (
      <div
        style={{ padding: "5px", paddingLeft: "11px" }}
        className={stylesOrderSelect.wrap_select}
      >
        <BillSelectBoxStep value="Tất cả" placeholder="Tất cả" />
      </div>
    ),
  },
  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "11",
    width: 30,
    // render: () => <OrderActionTable />,
  },
];

export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    type: `Nhân viên`,
    name: "Nguyễn Văn Nam",
    room: "	Phòng kỹ thuật",
    right: "Toàn quyền",
  });
}

interface TableDataBillDetailShareListProps {}

const TableDataBillDetailShareList: React.FC<
  TableDataBillDetailShareListProps
> = () => {
  const [isModalCancel, setIsModalCancel] = useState(false);
  return (
    <div className="custom_table campaign_tble">
      <Table
        columns={columns}
        dataSource={data}
        // rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: 1000, y: 820 }}
      />
      {
        <OrderApplyModal
          isModalCancel={isModalCancel}
          setIsModalCancel={setIsModalCancel}
          title="Áp dụng cho hàng hóa"
          // content="Hello"
        />
      }
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
          Tổng số: <b>{data.length}</b> Ghi chú
        </div>
      </div>
    </div>
  );
};

export default TableDataBillDetailShareList;
