import Link from "next/link";
import styles from "../table.module.css";
export const ColumOrder = [
  {
    width: 113,
    title: "Số đơn hàng",
    dataIndex: "name",
    render: (text: any) => (
      <div style={{ color: "#4C5BD4" }}>
        <Link href="">{text}</Link>
      </div>
    ),
  },
  {
    width: 93,
    title: "Trạng thái",
    dataIndex: "name",
    render: (text: any) => <div style={{ color: "#FFA800" }}>{text}</div>,
  },
  {
    width: 191,
    title: "Khách hàng",
    dataIndex: "name",
    render: (text: any) => (
      <div>
        <Link href="">{text}</Link>
      </div>
    ),
  },
  {
    width: 304,
    title: "Diễn giải",
    dataIndex: "name",
    render: (text: any) => (
      <div className={styles.name} style={{ overflow: "hidden" }}>
        {text + text}
      </div>
    ),
  },
  {
    width: 114,
    title: "Giá trị (VNĐ)",
    dataIndex: "myPhone",
    render: (text: number) => <div>{text.toLocaleString("vi-VN")}</div>,
  },
  {
    width: 168,
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
    width: 150,
    title: "Ngày đặt hàng",
    dataIndex: "day",
  },
  {
    width: 184,
    title: "Tình trạng thanh toán",
    dataIndex: "office",
    render: (text: any) => <div style={{ color: "green" }}>{text + text}</div>,
  },
  {
    width: 174,
    title: "Tình trạng giao hàng",
    dataIndex: "office",
    render: (text: any) => <div style={{ color: "#4C5BD4" }}>{text}</div>,
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
