import Link from "next/link";
import styles from "../table.module.css";
export const ColumContact = [
  {
    width: 127,
    title: "Loại liên hệ",
    dataIndex: "key",
    render: (text: any) => (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <img src="/crm/loai_lh_1.png"></img>
        <img src="/crm/loai_lh_2.png"></img>
        <img src="/crm/loai_lh_3.png"></img>
        <img src="/crm/loai_lh_4.png"></img>
      </div>
    ),
  },
  {
    width: 350,
    title: "Họ và tên",
    dataIndex: "name",
    render: (text: any) => <Link href="">{text + text}</Link>,
  },
  {
    width: 82,
    title: "Xưng hô",
    dataIndex: "vocative",
  },
  {
    width: 150,
    title: "Chức danh",
    dataIndex: "office",
  },
  {
    width: 168,
    title: "Điện thoại cơ quan",
    dataIndex: "companyPhone",
  },
  {
    width: 167,
    title: "Điện thoại cá nhân",
    dataIndex: "myPhone",
  },
  {
    width: 350,
    title: "Email cá nhân",
    dataIndex: "myEmail",
  },
  {
    width: 95,
    title: "Zalo",
    dataIndex: "companyEmail",
  },
  {
    width: 287,
    title: "Facebook",
    dataIndex: "name",
    render: (text: any) => (
      <div style={{ maxWidth: 287 }}>
        <Link href={""}>{text}</Link>
      </div>
    ),
  },
  {
    width: 178,
    title: "Người Xóa",
    dataIndex: "nameDelete",
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
    width: 153,
    title: "Thời gian xóa",
    dataIndex: "timeDelete",
  },
];
