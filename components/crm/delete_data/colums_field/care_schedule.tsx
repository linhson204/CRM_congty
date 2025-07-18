import Link from "next/link";
import styles from "../table.module.css";
import { Tooltip } from "antd";
export const ColumCareSchedule = [
  {
    width: 391,
    title: "Tên lịch hẹn",
    dataIndex: "address",
    render: (text: any) => (
      <div className={styles.name} style={{ overflow: "hidden" }}>
        <Link href="">{text}</Link>
      </div>
    ),
  },
  {
    width: 144,
    title: "TKhách hàng	",
    dataIndex: "name",
    render: (text: any) => (
      <div>
        <Link href="">{text}</Link>
      </div>
    ),
  },
  {
    width: 108,
    title: "Trạng thái",
    dataIndex: "myEmail",
    render: (text: any) => <div style={{ color: "red" }}>{text}</div>,
  },
  {
    width: 209,
    title: "Thời gian thực hiện	",
    dataIndex: "timeDelete",
    render: (text: any) => (
      <div>
        <div></div>&nbsp;{text}
      </div>
    ),
  },
  {
    width: 216,
    title: "Nhân viên thực hiện	",
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
    width: 391,
    title: "Nội dung cuộc gọi",
    dataIndex: "address",
    render: (text: any) => (
      <div style={{ overflow: "hidden", maxWidth: 355, maxHeight: 50 }}>
        <Tooltip
          overlayStyle={{ width: "355px" }}
          placement="bottom"
          title={text + text + text}
        >
          <div>{text}</div>
        </Tooltip>
      </div>
    ),
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
    width: 185,
    title: "Thời gian xóa",
    dataIndex: "timeDelete",
  },
];
