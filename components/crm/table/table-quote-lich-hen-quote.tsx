import React, { useContext, useEffect, useState } from "react";
import { Table, Tooltip } from "antd";
import styles from "../order/order.module.css";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
// import { TableRowSelection } from "antd/es/table/interface";
import QuoteActionLichHenTable from "../quote/action_lich_hen_table";
import { renderAppointmentStatus } from "@/utils/listOption";
import { convertTimeToDate, notifyError } from "@/utils/function";
import { useFormData } from "../context/formDataContext";
import { axiosCRM } from "@/utils/api/api_crm";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import dayjs from "dayjs";

interface DataType {
  key: React.Key;
  _id: number;
  stt: number;
  schedule_name: string;
  schedule_status: string;
  start_date_schedule: string;
  end_date_schedule: string;
  description: string;
  address: string;
  ep_name: string;
  date: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 50,
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Tên lịch hẹn",
    width: 300,
    dataIndex: "schedule_name",
    key: "schedule_name",
    render: (text: any, record: any) => (
      <Link href={`/customer/schedule/detail/${record.key}/${record.key}`}>
        <b>{text}</b>
      </Link>
    ),
  },
  {
    title: "Trạng thái",
    dataIndex: "schedule_status",
    key: "schedule_status",
    width: 100,
    render: (value) => (
      <div style={{ color: "#FFA800" }}>{renderAppointmentStatus(value)}</div>
    ),
  },
  {
    title: "Thời gian thực hiện",
    dataIndex: "date",
    key: "date",
    width: 200,
    render: (_, record) => (
      <div>
        {convertTimeToDate(record.start_date_schedule)}-{" "}
        {convertTimeToDate(record.end_date_schedule)}
      </div>
    ),
  },
  {
    title: "Nhân viên thực hiện",
    width: 200,
    dataIndex: "ep_name",
    key: "ep_name",
    render: (text: any) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src="/crm/user_kh.png"></img>
        <div>{text}</div>
      </div>
    ),
  },
  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "11",
    width: 80,
    fixed: "right",
    render: (text: any, record: any) => (
      <QuoteActionLichHenTable record={record} />
    ),
  },
];

interface TableDataCampaignProps {
  fromDate: Date,
  toDate: Date,
  cus_id: number,
  emp_id: number,
  status: number,
  keyword: string
}

const TableDataLichhen: React.FC<TableDataCampaignProps> = (props: any) => {
  const { formData } = useContext(useFormData);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<any>(10);
  const [total, setTotal] = useState(0);
  const [listAppointment, setListAppointment] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [empId, setEmpId] = useState(0)
  const [status, setStatus] = useState(0)
  const [keyword, setKeyword] = useState('')
  const [cusId, setCusId] = useState(0)

  useEffect(() => {
    setFromDate(props.fromDate ? dayjs(props.fromDate).format('YYYY-MM-DD') : '')
    setToDate(props.toDate ? dayjs(props.toDate).format('YYYY-MM-DD') : '')
    setEmpId(props.emp_id)
    setStatus(props.status)
    setKeyword(props.keyword)
    setCusId(props.cus_id)
  }, [props])

  useEffect(() => {
    axiosCRM
      .post("/potential/listAppointment", {
        ...formData,
        cus_id: cusId,
        fromDate: fromDate,
        toDate: toDate,
        name: keyword,
        ep_id: empId,
        status: status,
        page: page,
        pageSize: pageSize,
      })
      .then((res) => {
        setTotal(res.data.data.total);
        setListAppointment(
          res.data.data.data?.map((item, index: number) => ({
            ...item,
            stt: (page - 1) * pageSize + index + 1,
          }))
        );
      })
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  }, [formData.recall, page, pageSize]);
  return (
    <div className="custom_table campaign_tble">
      <Table
        columns={columns}
        dataSource={listAppointment}
        bordered
        pagination={{
          total: total,
          pageSize: pageSize,
          onChange(page, pageSize) {
            setPage(page);
          },
        }}
        scroll={{ x: "100%", y: 600 }}
      />
      <div
        style={{ marginTop: "10px", transform: "translateY(0px)" }}
        className={`flex_between ${total ? "custom_info_table" : ""}`}
      >
        <div style={{ marginBottom: "10px" }} className="show_number_item">
          <b>Hiển thị:</b>
          <select
            onChange={(e) => {
              setPageSize(Number(e.target.value)), setPage(1);
            }}
            className="show_item"
          >
            <option value={10}>10 bản ghi trên trang</option>
            <option value={20}>20 bản ghi trên trang</option>
            <option value={30}>30 bản ghi trên trang</option>
            <option value={40}>40 bản ghi trên trang</option>
            <option value={50}>50 bản ghi trên trang</option>
          </select>
        </div>
        <div
          style={{
            marginBottom: "10px",
            transform: total ? "translateX(50%)" : "",
          }}
          className="total"
        >
          <div className="total">
            Tổng số: <b>{total}</b> Lịch hẹn
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default TableDataLichhen;
