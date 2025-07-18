import React, { useState } from "react";
import { Button, Dropdown, MenuProps, Table, Tooltip } from "antd";
import styles from "../order/order.module.css";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import DelTLDK from "../quote/quote_action_modal/mdal_delete_TLDK";
import DelDSCS from "../quote/quote_action_modal/mdal-delete_DSCS";
// import { TableRowSelection } from "antd/es/table/interface";

interface TableDataTLCS {}

const TableTLChiaSe: React.FC<TableDataTLCS> = (props: any) => {
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [key, setKey] = useState();
  const onClose = () => {
    setIsCancelOpen(false);
  };
  const handleAddDB = () => {
  };
  interface DataType {
    key: React.Key;
    number: string;
    name: string;
    status: string;
    total: string;
    address: string;
    order_status: string;
    date: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: 50,
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Loại đối tượng",
      width: 100,
      dataIndex: "total",
      key: "total",
      render: (text: any, record: any) => (
        <div>
          <b>{text}</b>
        </div>
      ),
    },
    {
      title: "Tên đối tượng",
      width: 200,
      dataIndex: "name",
      key: "name",
      render: (text: any) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src="/crm/user_kh.png"></img>
          <div>{text}</div>
        </div>
      ),
    },
    {
      title: "Phòng ban",
      dataIndex: "date",
      key: "date",
      width: 200,
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Quyền",
      dataIndex: "status",
      key: "name",
      width: 150,
      render: (text) => (
        <div style={{ width: "100%" }}>
          <select style={{ width: "90%", height: 30 }}>
            <option value="">Toàn quyền</option>
          </select>
        </div>
      ),
    },

    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "11",
      width: 80,
      fixed: "right",
      render: (text: any, record: any) => (
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          <Button
            onClick={() => handleSelect(record.key)}
            style={{ display: "flex", gap: 3, color: "red", border: "none " }}
          >
            <div>
              <img src="/crm/del_red.svg" alt="" />
            </div>
            <div>Gỡ bỏ</div>
          </Button>
        </div>
      ),
    },
  ];
  const data: DataType[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      number: `Lịch hẹn - Nguyễn Thị Hòa${i}`,
      name: "Nguyễn Trần Kim Phượng",
      status: "10.0 MB",
      total: "Nhân viên	",
      address: `Số 1 Trần Nguyên Đán, Định Công, Hoàng Mai, Hà Nội`,
      order_status: `Chưa gửi`,
      date: "09/08/2023",
    });
  }
  const handleSelect = (value: any) => {
    setIsCancelOpen(true);
    setKey(value);
  };
  return (
    <div className="custom_table campaign_tble">
      <Table
        columns={columns}
        dataSource={data}
        // rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: "100%", y: 600 }}
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
          Tổng số: <b>{data.length}</b> Danh sách chia sẻ
        </div>
        <DelDSCS record={key} isModalCancel={isCancelOpen} onClose={onClose} />
      </div>
    </div>
  );
};

export default TableTLChiaSe;
