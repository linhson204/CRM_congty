import Link from "next/link";
import styles from "../table.module.css";
import { Button, Tooltip } from "antd";
export const ColumPricePolicy = [
  {
    width: 158,
    title: "Mã chính sách giá",
    dataIndex: "key",
  },
  {
    width: 327,
    title: "Tên chính sách giá",
    dataIndex: "name",
    render: (text: any) => (
      <div>
        <Link href="">
          <Tooltip placement="bottom" title={text + text + text + text + text}>
            <div>{text + text + text + text + text}</div>
          </Tooltip>
        </Link>
      </div>
    ),
  },
  {
    width: 179,
    title: "Đối tượng",
    dataIndex: "name",
    render: (text: any) => <div>{text}</div>,
  },
  {
    width: 96,
    title: "Từ ngày	",
    dataIndex: "day",
  },
  {
    width: 96,
    title: "Đến ngày",
    dataIndex: "day",
  },
  {
    width: 172,
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
    width: 147,
    title: "Ngày tạo",
    dataIndex: "timeDelete",
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
