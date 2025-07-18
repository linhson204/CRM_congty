import Link from "next/link";
import styles from "../table.module.css";
import { Button, Tooltip } from "antd";
export const ColumProductReturn = [
  {
    width: 87,
    title: "Số đề nghị",
    dataIndex: "name",
    render: (text: any) => (
      <div>
        <Link href="">{text}</Link>
      </div>
    ),
  },
  {
    width: 300,
    title: "Khách hàng	",
    dataIndex: "name",
    render: (text: any) => (
      <div>
        <Link href="">{text}</Link>
      </div>
    ),
  },
  {
    width: 141,
    title: "Tình trạng đề nghị",
    dataIndex: "name",
    render: (text: any) => <div style={{ color: "#4C5BD4" }}>{text}</div>,
  },
  {
    width: 154,
    title: "Tình trạng thực hiện",
    dataIndex: "name",
    render: (text: any) => <div style={{ color: "green" }}>{text}</div>,
  },
  {
    width: 300,
    title: "Diễn giải",
    dataIndex: "name",
    render: (text: any) => (
      <div>
        <Tooltip placement="bottom" title={text + text + text + text + text}>
          <div>{text + text + text + text + text}</div>
        </Tooltip>
      </div>
    ),
  },
  {
    width: 105,
    title: "Ngày đề nghị",
    dataIndex: "day",
  },
  {
    width: 105,
    title: "Số đơn hàng",
    dataIndex: "name",
    render: (text: any) => (
      <div>
        <Link href="">{text}</Link>
      </div>
    ),
  },
  {
    width: 105,
    title: "Ngày đề nghị",
    dataIndex: "day",
  },
  {
    width: 125,
    title: "Tổng tiền (VNĐ)	",
    dataIndex: "myPhone",
    render: (text: any) => <div>{text.toLocaleString("vi")}</div>,
  },
  {
    width: 300,
    title: "Địa chỉ	",
    dataIndex: "name",
    render: (text: any) => (
      <div>
        <Tooltip placement="bottom" title={text + text + text + text + text}>
          <div>{text + text + text + text + text}</div>
        </Tooltip>
      </div>
    ),
  },
  {
    width: 172,
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
    width: 147,
    title: "Thời gian xóa",
    dataIndex: "timeDelete",
  },
];
