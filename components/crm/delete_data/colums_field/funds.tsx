import Link from "next/link";
import styles from "../table.module.css";
import { Tooltip } from "antd";
export const ColumFunds = [
  {
    width: 125,
    title: "Tên sổ quỹ",
    dataIndex: "name",
    render: (text: any) => (
      <div style={{ color: "#4C5BD4" }}>
        <Link href="">{text}</Link>
      </div>
    ),
  },
  {
    width: 186,
    title: "Số tiền",
    dataIndex: "myPhone",
    render: (text: number) => (
      <div>{text.toLocaleString("vi-VN") + " " + "VNĐ"}</div>
    ),
  },
  {
    width: 367,
    title: "Mô tả",
    dataIndex: "name",
    render: (text: any) => (
      <div style={{ overflow: "hidden" }}>
        <Link href="">
          <Tooltip placement="bottom" title={text + text + text + text + text}>
            <div>{text}</div>
          </Tooltip>
        </Link>
      </div>
    ),
  },
  {
    width: 227,
    title: "Người quản lý",
    dataIndex: "name",
    render: (text: any) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <img src="/crm/user_kh.png" alt="hungha365.com" />
        </div>
        &nbsp;{text}
      </div>
    ),
  },
  {
    width: 116,
    title: "Trạng thái",
    dataIndex: "name",
    render: (text: number) => <div style={{ color: "green" }}>{text}</div>,
  },
  {
    width: 216,
    title: "Người xóa",
    dataIndex: "name",
    render: (text: any) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <img src="/crm/user_kh.png" alt="hungha365.com" />
        </div>
        &nbsp;{text}
      </div>
    ),
  },
  {
    width: 186,
    title: "Thời gian xóa",
    dataIndex: "timeDelete",
  },
];
