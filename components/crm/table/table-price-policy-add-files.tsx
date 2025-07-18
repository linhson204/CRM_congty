import React from "react";
import styles from "../price_policy/price_policy.module.css";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import Link from "next/link";

interface DataType {
  key: React.Key;
  idproduct: string;
  nameproduct: string;
  donvi: string;
  soluong: string;
  dongia: string;
  tien: string;
  tienthue: string;
  total: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 20,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Mã hàng hóa",
    width: 60,
    dataIndex: "idproduct",
    key: "0",
  },
  {
    title: "Tên hàng hóa",
    dataIndex: "nameproduct",
    key: "1",
    width: 70,
  },
  {
    title: "Đơn vị tính",
    dataIndex: "donvi",
    key: "2",
    width: 50,
  },
  {
    title: "Số lượng",
    dataIndex: "soluong",
    key: "3",
    width: 40,
  },
  {
    title: "Đơn giá(VNĐ)",
    dataIndex: "dongia",
    key: "4",
    width: 60,
  },
  {
    title: "Thành tiền(VNĐ)",
    dataIndex: "tien",
    key: "5",
    width: 80,
  },
  {
    title: "Tỷ lệ chiết khấu(%)",
    dataIndex: "chietkhau",
    key: "6",
    width: 80,
    render: () => (
      <>
        <input type="text" className={styles.inputform} placeholder="Nhập" />
      </>
    ),
  },
  {
    title: "Tiền chiết khấu(VNĐ)",
    dataIndex: "tienchietkhau",
    key: "7",
    width: 90,
    render: () => (
      <>
        <input type="text" className={styles.inputform} placeholder="Nhập" />
      </>
    ),
  },
  {
    title: "Thuế suất(%)",
    dataIndex: "thue",
    key: "8",
    width: 80,
    render: () => (
      <>
        <input type="text" className={styles.inputform} placeholder="Nhập" />
      </>
    ),
  },
  {
    title: "Tiền thuế(VNĐ)",
    dataIndex: "tienthue",
    key: "9",
    width: 80,
  },
  {
    title: "Tổng tiền(VNĐ)",
    dataIndex: "total",
    key: "10",
    width: 70,
  },
  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "11",
    width: 50,
    fixed:"right",
    render: () => (
      <>
        <Link href={"#"}>
          <button>
            <img
              className={styles.icon_delete}
              src="/crm/h_delete_cus.svg"
            />{" "}
            Xóa
          </button>
        </Link>
      </>
    ),
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
    tien: "100.000.000",
    tienthue: "1.000.000",
    total: "101.000.000",
  });
}

interface TableDataPricePolicyAddFilesDrops {
  setSelected: (value: boolean) => void;
}

const TableDataPricePolicyAddFiles: React.FC< TableDataPricePolicyAddFilesDrops> = ({}: any) => {
  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 1500, y: 1100 }}
      />
      <div className="main__footer flex_between" id="">
        <div className="total">
          Tổng số: <b>{data.length}</b> Hàng hóa
        </div>
      </div>
    </div>
    
  );
};

export default TableDataPricePolicyAddFiles;
