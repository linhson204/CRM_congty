import React from "react";
import styles from "../setting/webform/webform.module.css";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { Switch } from "antd";

const onChange = (checked: boolean) => {
};

const App: React.FC = () => <Switch defaultChecked onChange={onChange} />;

interface DataType {
  key: React.Key;
  formname: string;
  trangthai: string;
  person: string;
  time: string;
  operation: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 40,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Tên Form",
    width: 150,
    dataIndex: "formname",
    key: "0",
    render: (data) => (
      <Tooltip title={data}>
        <span>{data}</span>
      </Tooltip>
    ),
  },
  {
    title: "Trạng thái",
    dataIndex: "trangthai",
    key: "1",
    width: 80,
    render: () => (
      <>
        <Switch defaultChecked onChange={onChange} />
      </>
    ),
  },
  {
    title: "Người tạo",
    dataIndex: "person",
    key: "2",
    width: 200,
  },
  {
    title: "Thời gian cập nhật",
    dataIndex: "time",
    key: "3",
    width: 100,
  },
  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "4",
    width: 80,
    fixed: "right",
    render: () => (
      <>
        <Link href={"#"}>
          <button>
            <img className={styles.icon_delete} src="/crm/h_delete_cus.svg" />
            Xóa
          </button>
        </Link>
      </>
    ),
  },
];

const data: DataType[] = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i + 1,
//     formname: `Liên hệ với chúng tôi`,
//     trangthai: ``,
//     person: "Công ty Cổ phần Thanh toán Hưng Hà",
//     time: `10:10 - 22/03/2022`,
//     operation: ``,
//   });
// }

interface TableDataWebformDrops {
  setSelected: (value: boolean) => void;
}

const TableDataWebform: React.FC<TableDataWebformDrops> = ({}: any) => {
  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 1000, y: 1100 }}
      />
    </div>
  );
};

export default TableDataWebform;
