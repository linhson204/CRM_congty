import React from "react";
import styles from "../contract/contract.module.css";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import ProductActionDropDown from "../product_return/product_action_dropdown";
import ChanceActionDropDown from "../customer/chance/chance_action_dropdown";
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
    personname: `NguyenVanHung`,
    operation: "",
    date1: `10/07/2023`,
    date2: `17/07/2023`,
  });
}

interface TableChanceDetailCustomerProps {}

const TableChanceDetailCustomer: React.FC<
  TableChanceDetailCustomerProps
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
      title: "Tên cơ hội",
      width: 200,
      dataIndex: "filename",
      key: "0",
      render: (data) => (
        <Link href={`/customer/chance/detail/${id}/${data}`}>
          <span>{data}</span>
        </Link>
      ),
    },
    {
      title: "Số tiền (VNĐ)",
      dataIndex: "personname",
      key: "1",
      width: 200,
    },
    {
      title: "Giai đoạn",
      dataIndex: "date1",
      key: "2",
      width: 150,
    },
    {
      title: "Tỷ lệ thành công",
      dataIndex: "date1",
      key: "2",
      width: 150,
    },
    {
      title: "Doanh số kỳ vọng (VNĐ)",
      dataIndex: "date2",
      key: "3",
      width: 350,
    },
    {
      title: "Ngày kỳ vọng/kết thúc",
      dataIndex: "date2",
      key: "3",
      width: 150,
    },
    {
      title: "Người thực hiện",
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
      render: () => <ChanceActionDropDown />,
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

export default TableChanceDetailCustomer;
