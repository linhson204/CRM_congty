import Link from "next/link";
import styles from "../table.module.css";
import { Tooltip } from "antd";
export const ColumReceipts = [
  {
    width: 80,
    title: "Số phiếu",
    dataIndex: "name",
    render: (text: any) => (
      <div style={{ color: "#4C5BD4" }}>
        <Link href="">{text}</Link>
      </div>
    ),
  },
  {
    width: 117,
    title: "Tên phiếu thu",
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
    width: 166,
    title: "Người tạo",
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
    width: 142,
    title: "Ngày tạo",
    dataIndex: "day",
  },
  {
    width: 187,
    title: "Đối tượng",
    dataIndex: "name",
  },
  {
    width: 131,
    title: "Tổng tiền",
    dataIndex: "myPhone",
    render: (text: number) => (
      <div>{text.toLocaleString("vi-VN") + " " + "VNĐ"}</div>
    ),
  },
  {
    width: 119,
    title: "Trạng thái gửi",
    dataIndex: "office",
    render: (text: number) => <div style={{ color: "green" }}>{text}</div>,
  },
  {
    width: 139,
    title: "Trạng thái",
    dataIndex: "office",
  },
  {
    width: 93,
    title: "Ngày thu",
    dataIndex: "day",
  },
  {
    width: 167,
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
    width: 144,
    title: "Thời gian xóa",
    dataIndex: "timeDelete",
  },
];
