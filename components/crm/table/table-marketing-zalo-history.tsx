import React, { useState, useEffect } from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import MarketingZaloHistoryActionTable from "../marketing/zalo/zalo_history_action_table";
import Link from "next/link";
import Cookies from 'js-cookie'

interface DataType {
  created_at: string;
  message_id: string;
  phone_number: string;
  status: string;
  userName: string;
  templateName: string;
  templateId: string | number;

}

interface TableDataZaloFormProps {
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
}

const TableDataZaloForm: React.FC<TableDataZaloFormProps> = (any) => {
  const [data, setData] = useState([])
  const [pageCurrent, setPageCurrent] = useState(1)
  const handleGetListTemplate = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/crm/marketingZalo/getListHistory`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
        }
      );
      const data = await res.json()
      setData(data?.data?.data);
    } catch (error) { }
  };

  useEffect(() => {
    handleGetListTemplate();
  }, []);
  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: 50,
      dataIndex: "id",
      key: "0",
      render: (value, record, index) => index + 1 + (pageCurrent - 1) * 10,
    },
    {
      title: "Người gửi",
      width: 200,
      dataIndex: "userName",
      key: "2",
      // render: () => 
    },
    {
      title: "Template Zalo",
      width: 150,
      dataIndex: "templateName",
      key: "3",
      render: (value, record, index) => (
        <div>{record.templateId}-{record.templateName}</div>
      )
    },
    {
      title: "Số điện thoại nhận",
      width: 150,
      dataIndex: "phone_number",
      key: "4",
    },
    {
      title: "Trạng thái",
      width: 100,
      dataIndex: "status",
      key: "5",
    },
    {
      title: "Thời gian",
      dataIndex: "created_at",
      key: "6",
      width: 150,
    },
  ];

  return (
    <div style={{ marginTop: "20px" }}>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 1200, y: 400 }}
        pagination={{
          style: { paddingBottom: 30, float: "left" },
          current: pageCurrent,
          pageSize: 10,
          onChange(page, pageSize) {
            if (page != pageCurrent) {
              setPageCurrent(page);
            }
          },
        }}
      />
    </div>
  );
};

export default TableDataZaloForm;
