import Link from "next/link";
import styles from "../table.module.css";
import { Tooltip } from "antd";
export const Columbill = [
  {
    width: 108,
    title: "Số hóa đơn",
    dataIndex: "name",
    render: (text: any) => (
      <div style={{ color: "#4C5BD4" }}>
        <Link href="">{text}</Link>
      </div>
    ),
  },
  {
    width: 200,
    title: "Khách hàng",
    dataIndex: "name",
    render: (text: any) => (
      <div>
        <Link href="">{text}</Link>
      </div>
    ),
  },
  {
    width: 104,
    title: "Tình trạng",
    dataIndex: "name",
    render: (text: any) => <div style={{ color: "#FFA800" }}>{text}</div>,
  },
  {
    width: 108,
    title: "Số hóa đơn",
    dataIndex: "name",
    render: (text: any) => <div>-</div>,
  },
  {
    width: 108,
    title: "Mã tra cứu",
    dataIndex: "myPhone",
    render: (text: number) => <div>-</div>,
  },
  {
    width: 130,
    title: "Ngày hóa đơn",
    dataIndex: "myPhone",
    render: (text: number) => <div>-</div>,
  },
  {
    width: 142,
    title: "Tổng tiền (VNĐ)",
    dataIndex: "myPhone",
    render: (text: number) => <div>{text.toLocaleString("vi-VN")}</div>,
  },
  {
    width: 355,
    title: "Địa chỉ",
    dataIndex: "name",
    render: (text: any) => (
      <div>
        <Tooltip placement="bottom" title={text + text + text + text}>
          <div>{text}</div>
        </Tooltip>
      </div>
    ),
  },
  {
    width: 204,
    title: "Tình trạng gửi hóa đơn",
    dataIndex: "name",
    render: (text: any) => <div style={{ color: "green" }}>{text}</div>,
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
