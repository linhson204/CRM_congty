import Link from "next/link";
import styles from "../table.module.css";
export const ColumSchedule = [
  {
    width: 423,
    title: "Tên lịch hẹn",
    dataIndex: "address",
    render: (text: any) => (
      <div className={styles.name} style={{ overflow: "hidden" }}>
        <Link href="">{text}</Link>
      </div>
    ),
  },
  {
    width: 172,
    title: "Trạng thái",
    dataIndex: "name",
    render: (text: any) => <div style={{ color: "#FFA800" }}>{text}</div>,
  },
  {
    width: 209,
    title: "Thời gian thực hiện	",
    dataIndex: "timeDelete",
    render: (text: any) => (
      <div>
        <div></div>&nbsp;{text} <div>{text}</div>
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
