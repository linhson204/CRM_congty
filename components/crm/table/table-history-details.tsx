import React from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useRouter } from "next/router";
import DocumentActionDropDown from "../customer/documents/document_input_group";

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

interface TableChanceDetailHistoryProps {}

const TableChanceDetailHistory: React.FC<
  TableChanceDetailHistoryProps
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
      title: "Giai đoạn",
      width: 150,
      dataIndex: "filename",
      key: "0",
      render: (data) => (
        // <Link href={`/customer/chance/detail/${id}/${data}`}>
        <span>{data}</span>
        // </Link>
      ),
    },
    {
      title: "Số tiền (VNĐ)",
      dataIndex: "personname",
      key: "1",
      width: 120,
    },
    {
      title: "Tỷ lệ thành công (%)",
      dataIndex: "date1",
      key: "2",
      width: 120,
    },
    {
      title: "Doanh số kỳ vọng (VND)",
      dataIndex: "date1",
      key: "2",
      width: 150,
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "date1",
      key: "2",
      width: 150,
    },
    {
      title: "Thời gian sửa",
      dataIndex: "date1",
      key: "2",
      width: 150,
    },
    {
      title: "Người sửa",
      dataIndex: "date1",
      key: "2",
      width: 150,
    },
  ];
  return (
    <div className="custom_table product_return">
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 1024, y: 1100 }}
      />
    </div>
  );
};

export default TableChanceDetailHistory;
