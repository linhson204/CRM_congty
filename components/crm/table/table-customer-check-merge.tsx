import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import Link from "next/link";
import styles from "@/components/crm/potential/potential.module.css";

interface DataType {
  key: React.Key;
  name: string;
  salutation: string;
  address: string;
  operation: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Mã KH",
    width: 120,
    dataIndex: "cus_id",
    key: "cus_id",
  },
  {
    title: "Tên khách hàng",
    width: 250,
    dataIndex: "name",
    key: "name",
    render: (data) => (
      // <Tooltip title={data}>
      <Link href={`/customer/detail/${data}`}>
        <span>{data}</span>
      </Link>
      // </Tooltip>
    ),
  },
  {
    title: "Điện thoại",
    dataIndex: "phone_number",
    key: "phone_number",
    width: 300,

  },
  {
    title: "Mã số thuế",
    dataIndex: "tax_code ",
    key: "tax_code",
    width: 150,
  },

  {
    title: "Website",
    dataIndex: "website",
    key: "website",
    width: 150,
  },
  {
    title: "Địa chỉ(hóa đơn)",
    dataIndex: "bill_address",
    key: "bill_address",
    width: 150,
  },
  {
    title: "Nhân viên phụ trách",
    dataIndex: "user_handing_over_work",
    key: "user_handing_over_work",
    width: 150,
  },

];



interface TableDataPotentialProps {
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
  setRowDataSelected: any;
  data: any
}

const TableDataPotential: React.FC<TableDataPotentialProps> = ({
  setSelected,
  setNumberSelected,
  setRowDataSelected,
  data,
}: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  let arr = []
  for (let key in Object(data)) {
    if (data[key]?.cus_id) {
      arr.push(data[key])

    }
  }
  const dataTable = arr?.filter((item: any) => {
    return {
      name: item?.name,
      cus_id: item?.cus_id,
      tax_code: item?.tax_code,
      website: item?.website,
      bill_address: item?.bill_address,
      user_handing_over_work: item?.user_handing_over_work,
      phone_number: item?.phone_number,
    };
  });


  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows?.length >= 1) {
        setSelected(true);
      } else {
        setSelected(false);
      }
    },
    onSelect: (record, selected, selectedRows) => {
      setNumberSelected(selectedRows?.length);
      setRowDataSelected(selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      setNumberSelected(selectedRows?.length);
      setRowDataSelected(selectedRows);
    },
  };


  return (
    <>
      <div className="custom_table">
        <Table
          columns={columns}
          rowSelection={{ ...rowSelection }}
          bordered
          scroll={{ x: 1500, y: 300 }}
          pagination={false}
          dataSource={dataTable?.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
        />
      </div>
      <div className={` flex_between ${styles.custom_pagination}`} id="">
        <div className="show_number_item">
          <b>Hiển thị:</b>
          <select
            className="show_item"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={10}>10 bản ghi trên trang</option>
            <option value={20}>20 bản ghi trên trang</option>
            <option value={30}>30 bản ghi trên trang</option>
            <option value={40}>40 bản ghi trên trang</option>
            <option value={50}>50 bản ghi trên trang</option>
          </select>
        </div>
        <div className="total">
          Tổng số: <b>{dataTable.length}</b> Khách hàng
        </div>
      </div>
    </>
  );
};

export default TableDataPotential;
