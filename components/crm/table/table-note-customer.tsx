import React, { useState, useEffect, useContext } from "react";
import styles from "../contract/contract.module.css";
import { Table, Tooltip, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import NoteActionDropDown from "../customer/note/note_dropdown_action";
import { useRouter } from "next/router";
import { axiosCRM } from "@/utils/api/api_crm";
import { convertTimestampToDate, notifyError } from "@/utils/function";
import { useFormData } from "../context/formDataContext";
const Cookies = require("js-cookie");

interface DataType {
  key: React.Key;
  id: number;
  personname: string;
  date1: string;
  date2: string;
  content: string;
  operation: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 40,
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Nội dung ghi chú",
    width: 160,
    dataIndex: "content",
    key: "0",
    render: (data) => (
      <Tooltip title={data}>
        <span>{data}</span>
      </Tooltip>
    ),
  },
  {
    title: "Người ghi chú",
    dataIndex: "user_name",
    key: "2",
    width: 130,
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "date1",
    key: "1",
    width: 150,
  },
  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "4",
    width: 50,
    fixed: "right",
    render: (_, record) => (
      <div>
        <NoteActionDropDown record={record} />
      </div>
    ),
  },
];

const TableDataNoteDetailList: React.FC<any> = ({}: any) => {
  const [totalRecords, setTotalRecords] = useState();
  const [dataTable, setDataTable] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setloading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const { formData, setFormData } = useContext(useFormData);
  useEffect(() => {
    setFormData({ recall: false });
  }, []);
  useEffect(() => {
    axiosCRM
      .post("/potential/listNotePotential", { ...formData, cus_id: id })
      .then((res) => {
        setTotalRecords(res.data.data.total);
        handleDataTable(res.data.data.data);
      })
      .catch((err) => notifyError("Vui lòng thử lại sau"));
  }, [page, pageSize, formData.recall, formData.emp_id]);
  const handleDataTable = (datas) => {
    const datatable = datas?.map((item, index: number) => ({
      id: item.id,
      key: index + 1,
      stt: (page - 1) * pageSize + index + 1,
      user_name: item.user_name,
      content: item.content,
      personname: item.emp_name,
      date1: convertTimestampToDate(item.updated_at),
    }));
    setDataTable(datatable);
  };

  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={dataTable}
        bordered
        scroll={{ x: 2000, y: 1100 }}
        pagination={{
          // style: {
          //   paddingBottom: 20,
          //   display: "flex",
          //   position: "absolute",
          //   left: "30%",
          // },
          current: page,
          pageSize: pageSize,
          total: totalRecords,
          onChange: (current, pageSize) => {
            if (current != page) {
              // setDatatable([]);
              setPage(current);
            }
          },
        }}
      />
      <div className="main__footer flex_between" id="">
        <div className="show_number_item">
          <b>Hiển thị:</b>
          <Select
            style={{ width: 200 }}
            placeholder={
              <div style={{ color: "black" }}>10 bản ghi trên trang</div>
            }
            onChange={(value) => {
              setPageSize(value);
              setPage(1);
            }}
          >
            <option value={10}>10 bản ghi trên trang</option>
            <option value={20}>20 bản ghi trên trang</option>
            <option value={30}>30 bản ghi trên trang</option>
            <option value={40}>40 bản ghi trên trang</option>
            <option value={50}>50 bản ghi trên trang</option>
          </Select>
        </div>
        <div className="total">
          Tổng số: <b>{totalRecords}</b> Ghi chú
        </div>
      </div>
    </div>
  );
};

export default TableDataNoteDetailList;
