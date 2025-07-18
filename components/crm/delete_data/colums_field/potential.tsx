import Link from "next/link";
import styles from "../table.module.css";
export const ColumPotential = [
  {
    width: 127,
    title: "Mã tiềm năng",
    dataIndex: "key",
  },
  {
    width: 82,
    title: "Xưng hô",
    dataIndex: "vocative",
  },
  {
    width: 350,
    title: "Họ và tên",
    dataIndex: "name",
    render: (text: any) => <Link href={""}>{text}</Link>,
  },
  {
    width: 150,
    title: "Chức danh",
    dataIndex: "office",
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
    width: 168,
    title: "Điện thoại cơ quan",
    dataIndex: "companyPhone",
  },
  {
    width: 350,
    title: "Email cơ quan",
    dataIndex: "companyEmail",
  },
  {
    width: 350,
    title: <div>Địa chỉ</div>,
    dataIndex: "address",
    render: (text: any) => (
      <div className={styles.name} style={{ overflow: "hidden" }}>
        {text}
      </div>
    ),
  },
  {
    width: 182,
    title: "Tỉnh/Thành phố",
    dataIndex: "tinh",
  },
  {
    width: 134,
    title: "Quận/Huyện",
    dataIndex: "quan",
  },
  {
    width: 150,
    title: "Phường/Xã",
    dataIndex: "phuong",
  },
  {
    width: 118,
    title: "Nguồn gốc",
    dataIndex: "source",
  },
  {
    width: 250,
    title: "Loại hình",
    dataIndex: "type",
  },
  {
    width: 83,
    title: "Lĩnh vực",
    dataIndex: "field",
  },
  {
    width: 350,
    title: "Mô tả",
    dataIndex: "description",
  },
  {
    width: 118,
    title: "Loại hình",
    dataIndex: "typecompany",
  },
  {
    width: 178,
    title: "Người tạo",
    dataIndex: "nameCreate",
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
