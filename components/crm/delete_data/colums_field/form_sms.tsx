import Link from "next/link";
import styles from "../table.module.css";
import { Tooltip } from "antd";
export const ColumFormSms = [
  {
    width: 485,
    title: "Tên mẫu	",
    dataIndex: "name",
    render: (text: any) => (
      <Link
        href={""}
        style={{ overflow: "hidden", maxWidth: 355, maxHeight: 50 }}
      >
        <Tooltip
          overlayStyle={{ width: "355px" }}
          placement="bottom"
          title={text + text}
        >
          <div>{text + text}</div>
        </Tooltip>
      </Link>
    ),
  },
  {
    width: 248,
    title: "Người cập nhật",
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
    width: 231,
    title: "Thời gian cập nhật",
    dataIndex: "timeDelete",
  },
  {
    width: 248,
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
    width: 211,
    title: "Thời gian xóa",
    dataIndex: "timeDelete",
  },
];
