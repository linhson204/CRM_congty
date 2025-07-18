import React from "react";
import { Table, Tooltip } from "antd";
import styles from "../order/order.module.css";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
// import { TableRowSelection } from "antd/es/table/interface";
import OrderActionTable from "@/components/crm/order/order_detail/order_detail_contact_action";

interface DataType {
  key: React.Key;
  contact: string;
  name: string;
  xungho: string;
  title: string;
  phone: string;
  email: string;
  phone_private: string;
  email_private: string;
  zalo: string;
  facebook: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 50,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Loại liên hệ",
    width: 180,
    dataIndex: "contact",
    key: "contact",
    render: (text: any) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        {" "}
        <div>
          <img src="crm/customer/loai_lh_1.png" alt="" />
          &nbsp;
          <img src="crm/customer/loai_lh_2.png" alt="" />
          &nbsp;
          <img src="crm/customer/loai_lh_3.png" alt="" />
          &nbsp;
          <img src="crm/customer/loai_lh_4.png" alt="" />
        </div>
      </div>
    ),
  },
  {
    title: "Họ và tên",
    width: 200,
    dataIndex: "name",
    key: "name",
    render: (text: any) => (
      <Link href={"/customer/contact/detail"}>
        <b>{text}</b>
      </Link>
    ),
  },
  {
    title: "Xưng hô",
    dataIndex: "xungho",
    key: "xungho",
    width: 70,
  },
  {
    title: "Chức danh",
    dataIndex: "title",
    key: "title",
    width: 150,
  },
  {
    title: "Điện thoại cơ quan",
    dataIndex: "phone",
    key: "phone",
    width: 150,
  },
  {
    title: "Email cơ quan",
    dataIndex: "email",
    key: "email",
    width: 250,
  },
  {
    title: "Điện thoại cá nhân",
    dataIndex: "phone_private",
    key: "phone_private",
    width: 150,
  },
  {
    title: "Email cá nhân",
    dataIndex: "email_private",
    key: "email_private",
    width: 250,
  },
  {
    title: "Zalo",
    dataIndex: "zalo",
    key: "zalo",
    width: 150,
  },
  {
    title: "Facebook",
    dataIndex: "facebook",
    key: "facebook",
    width: 150,
    render: (text: any) => (
      <Link href={"/order/detail/contact"}>
        <b>{text}</b>
      </Link>
    ),
  },
  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "11",
    width: 100,
    fixed: "right",
    render: () => <OrderActionTable />,
  },
];

export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    contact: ``,
    name: "Nguyễn Trần Kim Phượng",
    xungho: "Anh",
    title: "Phó tổng giám đốc",
    phone: `0123 456 789`,
    email: `nguyenvannam@gmail.com`,
    phone_private: `0123 456 789`,
    email_private: `nguyenvannam@gmail.com`,
    zalo: `30/07/2023`,
    facebook: `123.site.facebook.com`,
  });
}

interface TableDataCampaignProps {}

const TableDataCampaign: React.FC<TableDataCampaignProps> = () => {
  return (
    <div className="custom_table campaign_tble">
      <Table
        columns={columns}
        dataSource={data}
        // rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: 1500, y: 820 }}
      />
      <div className="main__footer flex_between" id="">
        <div className="show_number_item">
          <b>Hiển thị:</b>
          <select className="show_item">
            <option value={10}>10 bản ghi trên trang</option>
            <option value={20}>20 bản ghi trên trang</option>
            <option value={30}>30 bản ghi trên trang</option>
            <option value={40}>40 bản ghi trên trang</option>
            <option value={50}>50 bản ghi trên trang</option>
          </select>
        </div>
        <div className="total">
          Tổng số: <b>{data.length}</b> Liên hệ
        </div>
      </div>
    </div>
  );
};

export default TableDataCampaign;
