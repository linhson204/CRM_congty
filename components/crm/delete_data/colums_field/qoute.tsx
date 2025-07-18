import Link from "next/link";
import styles from "../table.module.css";
export const ColumQoute = [
  {
    width: 91,
    title: "Số báo giá",
    dataIndex: "name",
    render: (text: any) => (
      <div style={{ color: "#4C5BD4" }}>
        <Link href="">{text}</Link>
      </div>
    ),
  },
  {
    width: 89,
    title: "Tình trạng",
    dataIndex: "name",
    render: (text: any) => <div style={{ color: "green" }}>{text}</div>,
  },
  {
    width: 109,
    title: "Ngày báo giá",
    dataIndex: "day",
    render: (text: any) => <div>{text}</div>,
  },
  {
    width: 147,
    title: "Hiệu lực đến ngày",
    dataIndex: "day",
    render: (text: any) => <div>{text}</div>,
  },
  {
    width: 315,
    title: "Khách hàng",
    dataIndex: "name",
    render: (text: any) => (
      <div style={{ color: "#4C5BD4" }}>
        <Link href="">{text}</Link>
      </div>
    ),
  },
  {
    width: 131,
    title: "Tổng tiền (VNĐ)",
    dataIndex: "myPhone",
    render: (text: number) => <div>{text.toLocaleString("vi-VN")}</div>,
  },
  {
    width: 315,
    title: "Mô tả",
    dataIndex: "office",
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
