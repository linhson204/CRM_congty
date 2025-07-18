import React from "react";
import { Table, Tooltip } from "antd";
import styles from "../order/order.module.css";
import type { ColumnsType } from "antd/es/table";
import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
// import { TableRowSelection } from "antd/es/table/interface";
import QuoteActionLichHenTable from "../quote/action_lich_hen_table";
import PotentialActionEmailTable from "../potential/action_table/potential_action_Email";
const Cookies = require("js-cookie");
import { useRouter } from "next/router";


interface DataType {
  key: React.Key;
  number: string;
  name: string;
  status: string;
  total: string;
  address: string;
  order_status: string;
  date: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 50,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Tiêu đề mail",
    width: 300,
    dataIndex: "number",
    key: "number",
    render: (text: any, record: any) => (
      <Link href={`/marketing/email/detail`}>
        <b>{text}</b>
      </Link>
    ),
  },
  {
    title: "Trạng thái	",
    dataIndex: "status",
    key: "status",
    width: 100,
    render: (text) => <div style={{ color: "#FF3333" }}>{text}</div>,
  },
  {
    title: "Người gửi",
    width: 200,
    dataIndex: "name",
    key: "name",
    render: (text: any) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src="/crm/user_kh.png"></img>
        <div>{text}</div>
      </div>
    ),
  },
  {
    title: "Địa chỉ gửi",
    dataIndex: "status",
    key: "status",
    width: 150,
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Ngày gửi",
    dataIndex: "date",
    key: "date",
    width: 150,
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Địa chỉ nhận",
    dataIndex: "status",
    key: "status",
    width: 150,
    render: (text) => <div>{text}</div>,
  },

  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "11",
    width: 80,
    fixed: "right",
    render: (text: any, record: any) => (
      <PotentialActionEmailTable record={record.number} />
    ),
  },
];

export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    number: `Lịch hẹn - Nguyễn Thị Hòa${i}`,
    name: "Nguyễn Trần Kim Phượng",
    status: "Đã hủy",
    total: "10.000.000.000",
    address: `Số 1 Trần Nguyên Đán, Định Công, Hoàng Mai, Hà Nội`,
    order_status: `Chưa gửi`,
    date: "09/08/2023",
  });
}

interface TableDataCampaignProps {}

const TableDataEmailPo: React.FC<TableDataCampaignProps> = () => {
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState();
  const [loading, setloading] = useState(true);
  const router = useRouter();
  // const { id } = router.query;

  const fetchData = async () => {
    try {
      const res = await fetch(`https://api.timviec365.vn/api/crm/potential/listEmailPotential`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token_base365")}`,
        },
        body: JSON.stringify({ customer_id: 1 }),
      });
      let data = await res.json();
      data = data?.data?.listEmailPotential;
      setData(data);
      if (data?.data?.length <= 0) {
        setloading(false);
      }
      setTotalRecords(data?.total);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log("checkdara",data)
  return (
    <div className="custom_table campaign_tble">
      <Table
        columns={columns}
        dataSource={data}
        // rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: "100%", y: 600 }}
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
          Tổng số: <b>{data.length}</b> Email
        </div>
      </div>
    </div>
  );
};

export default TableDataEmailPo;
