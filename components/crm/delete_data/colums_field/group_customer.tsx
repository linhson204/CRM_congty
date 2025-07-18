import Link from "next/link";
import styles from "../table.module.css";

export const ColumGCustomer = [
  {
    width: 300,
    title: "Tên nhóm khách hàng	",
    dataIndex: "name",
    render: (text: any) => <Link href={""}>{text}</Link>,
  },
  {
    width: 200,
    title: "Đối tượng được chia sẻ	",
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
    width: 160,
    title: "Số lượng khách hàng	",
    dataIndex: "vocative",
  },
  {
    width: 300,
    title: "Mô tả",
    dataIndex: "address",
    render: (text: any) => (
      <div className={styles.name} style={{ overflow: "hidden" }}>
        {text}
      </div>
    ),
  },
  {
    width: 200,
    title: "Người tạo",
    dataIndex: "companyPhone",
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
    width: 130,
    title: "Ngày tạo",
    dataIndex: "timeDelete",
  },
  {
    width: 200,
    title: "Người xoá",
    dataIndex: "timeDelete",
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
    width: 130,
    title: "Thời gian xoá",
    dataIndex: "timeDelete",
  },
];
