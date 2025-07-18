import Link from "next/link";
import styles from "../table.module.css";
export const ColumChange = [
  {
    width: 209,
    title: "Tên cơ hội",
    dataIndex: "name",
    render: (text: any) => (
      <div>
        <Link href="">{text}</Link>
      </div>
    ),
  },
  {
    width: 270,
    title: "Khách hàng",
    dataIndex: "name",
    render: (text: any) => (
      <div>
        <Link href="">{text}</Link>
      </div>
    ),
  },
  {
    width: 120,
    title: "Số tiền (VNĐ)",
    dataIndex: "myPhone",
    render: (text: any) => <div>{text.toLocaleString("vi-VN")}</div>,
  },
  {
    width: 87,
    title: "Giai đoạn",
    dataIndex: "office",
  },
  {
    width: 190,
    title: "Ngày kỳ vọng/kết thúc",
    dataIndex: "day",
  },
  {
    width: 167,
    title: "Người thực hiện",
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
    width: 143,
    title: "Ngày tạo",
    dataIndex: "myEmail",
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
