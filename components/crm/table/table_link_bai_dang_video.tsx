import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
// import { TableRowSelection } from "antd/es/table/interface";

import Cookies from "js-cookie";
// import jwt_decode from "jwt-decode";

interface DataType {
  key: React.Key;
  order_Id: string;
  status: string;
  customer: string;
  value: number;
  order_date: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 30,
    dataIndex: "_id",
    key: "_id",
    render: (text: any, record: any) => <b>{text}</b>,
  },
  {
    title: "Link",
    dataIndex: "link",
    key: "link",
    width: 80,
    render: (text: any, record: any) =>
      text ? (
        <a href={text} style={{ color: "grey" }} target="_blank">
          {text}
        </a>
      ) : (
        "#"
      ),
  },
];

const TableDataLinkList: React.FC<any> = ({
  condition,
  setCurrent,
  current,
  total,
  setTotal,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState([]);

  const getData = async () => {
    setLoading(true);
    fetch("/crm/api/facebook/get_link_bai_fb_video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fromDate: condition.start,
        toDate: condition.end,
      }),
    })
      .then((res) => res.json())
      .then((res2) => {
        setListData(res2?.data?.data?.data);
        setTotal(res2?.data?.data?.total);
      });
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, [condition]);

  const handlePageChange = (page) => {
    if (page !== current) {
      setCurrent(page);
    }
  };
  return (
    <div className="custom_table">
      <div className="flex_between" id=""></div>
      <Button loading={loading} onClick={getData}>Tải lại</Button>
      <Table
        loading={loading}
        columns={columns}
        dataSource={listData}
        bordered
        scroll={{ x: 100, y: 800 }}
        pagination={{
          style: { paddingBottom: 30, float: "left" },
          current: current,
          total: total,
          pageSize: 10,
          onChange: handlePageChange,
        }}
      />
    </div>
  );
};

export default TableDataLinkList;
