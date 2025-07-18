import Link from "next/link";
import styles from "../table.module.css";
export const ColumCampaign = [
  {
    width: 286,
    title: "Tên chiến dịch",
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
    render: (text: any) => <div style={{ color: "#FFA800" }}>{text}</div>,
  },
  {
    width: 172,
    title: "Loại",
    dataIndex: "name",
    render: (text: any) => <div>{text}</div>,
  },
  {
    width: 147,
    title: "Ngày bắt đầu",
    dataIndex: "day",
    render: (text: any) => <div>{text}</div>,
  },
  {
    width: 147,
    title: "Ngày kết thúc",
    dataIndex: "day",
    render: (text: any) => <div>{text}</div>,
  },
  {
    width: 180,
    title: (
      <div>
        Doanh số kỳ vọng <div>(VNĐ)</div>
      </div>
    ),
    dataIndex: "myPhone",
    render: (text: number) => <div>{text.toLocaleString("vi-VN")}</div>,
  },
  {
    width: 133,
    title: (
      <div>
        Ngân sách <div>(VNĐ)</div>
      </div>
    ),
    dataIndex: "myPhone",
    render: (text: number) => <div>{text.toLocaleString("vi-VN")}</div>,
  },
  {
    width: 167,
    title: "Người phụ trách",
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
