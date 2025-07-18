import React from "react";
import styles from "../contract/contract.module.css";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import ProductActionDropDown from "../product_return/product_action_dropdown";
import ChanceActionDropDown from "../customer/chance/chance_action_dropdown";
import ContactActionDropDown from "../customer/contact/contact_action_dropdown";
import { useRouter } from "next/router";

interface DataType {
  key: React.Key;
  personname: string;
  date1: string;
  date2: string;
  filename: string;
  operation: string;
}

const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i + 1,
    filename: `Dulich.docx ${i}`,
    personname: `Anh`,
    operation: "",
    date1: `10/07/2023`,
    date2: `17/07/2023`,
  });
}

interface TableContactDetailCustomerProps {}

const TableContactDetailCustomer: React.FC<
  TableContactDetailCustomerProps
> = () => {
  const router = useRouter();
  const { id } = router.query;
  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: 50,
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Loại liên hệ",
      dataIndex: "personname",
      key: "1",
      width: 150,
      render: () => (
        <>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <img src="/crm/loai_lh_1.png" />
            <img src="/crm/loai_lh_2.png" />
            <img src="/crm/loai_lh_3.png" />
            <img src="/crm/loai_lh_4.png" />
          </div>
        </>
      ),
    },
    {
      title: "Họ và tên",
      width: 200,
      dataIndex: "filename",
      key: "0",
      render: (data) => (
        <Link target="_blank" href={`/customer/contact/detail/${id}/${data}`}>
          {data}
        </Link>
      ),
    },
    {
      title: "Xưng hô",
      dataIndex: "personname",
      key: "1",
      width: 100,
    },
    {
      title: "Chức danh",
      dataIndex: "date1",
      key: "2",
      width: 150,
    },
    {
      title: "Điện thoại cơ quan",
      dataIndex: "date1",
      key: "2",
      width: 150,
    },
    {
      title: "Email cơ quan",
      dataIndex: "date2",
      key: "3",
      width: 150,
    },
    {
      title: "Điện thoại cá nhân",
      dataIndex: "date2",
      key: "3",
      width: 150,
    },
    {
      title: "Email cá nhân",
      dataIndex: "date2",
      key: "3",
      width: 150,
    },
    {
      title: "Zalo",
      dataIndex: "date2",
      key: "3",
      width: 150,
    },
    {
      title: "Facebook",
      dataIndex: "date2",
      key: "3",
      width: 150,
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "4",
      width: 120,
      fixed: "right",
      render: () => <ContactActionDropDown />,
    },
  ];
  return (
    <div className="custom_table product_return">
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 1500, y: 1100 }}
      />
    </div>
  );
};

export default TableContactDetailCustomer;
