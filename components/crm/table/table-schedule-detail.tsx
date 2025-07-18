import React from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useRouter } from "next/router";
import ScheduleActionDropDown from "../customer/schedule/schedule_action_dropdown";

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

interface TableScheduleDetailCustomerProps {}

const TableScheduleDetailCustomer: React.FC<
  TableScheduleDetailCustomerProps
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
      title: "Tên lịch hẹn",
      width: 200,
      dataIndex: "filename",
      key: "0",
      render: (data) => (
        <Link href={`/customer/schedule/detail/${id}/${data}`}>
          <span>{data}</span>
        </Link>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "personname",
      key: "1",
      width: 200,
    },
    {
      title: "Thời gian thực hiện",
      dataIndex: "date1",
      key: "2",
      width: 150,
    },
    {
      title: "Nhân viên thực hiện",
      dataIndex: "date1",
      key: "2",
      width: 150,
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "4",
      width: 120,
      fixed: "right",
      render: () => <ScheduleActionDropDown />,
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

export default TableScheduleDetailCustomer;
