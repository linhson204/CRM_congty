import React, { useState, useEffect } from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import MarketingSMSFormActionTable from "../marketing/sms/sms_form_action_table";
import Link from "next/link";
import Cookies from 'js-cookie'

interface DataType {
  templateId: string;
  templateName: string;
  price: string | number;
  previewUrl: string;
  createAt: string;
  status: string;
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
        `${process.env.NEXT_PUBLIC_BASE_URL_QLC}/api/crm/marketingZalo/getListDetailTemplate`,
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
      width: 100,
      dataIndex: "id",
      key: "0",
      render: (value, record, index) => index + 1 + (pageCurrent - 1) * 10,
    },
    {
      title: "ID - Tên mẫu",
      width: 250,
      dataIndex: "templateName",
      key: "1",
      render: (text, record) => (
        <div style={{textAlign: 'left', marginLeft: '12px'}}>{record.templateId} - {record.templateName}</div>
      ),
    },
    {
      title: "Người cập nhật",
      dataIndex: "update",
      key: "2",
      width: 280,
      render: (text) => 'Công ty Cổ phần Thanh toán Hưng Hà'
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "3",
      width: 180,
      render: (text) => `${text} vnđ`,
    },
    {
      title: "Xem trước",
      dataIndex: "operation",
      key: "4",
      width: 120,
      render: (text, record) => (
        <Link target="_blank" href={record.previewUrl}>
          <span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 16"
              style={{ margin: "-3px 4px" }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 8.09091C1 8.09091 3.54545 3 8 3C12.4545 3 15 8.09091 15 8.09091C15 8.09091 12.4545 13.1818 8 13.1818C3.54545 13.1818 1 8.09091 1 8.09091Z"
                stroke="#474747"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M7.99991 10C9.05427 10 9.909 9.14528 9.909 8.09091C9.909 7.03655 9.05427 6.18182 7.99991 6.18182C6.94555 6.18182 6.09082 7.03655 6.09082 8.09091C6.09082 9.14528 6.94555 10 7.99991 10Z"
                stroke="#474747"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </span>
        </Link>
      )
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      key: "5",
      width: 140,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "6",
      width: 140,
    },
  ];
  return (
    <div style={{ marginTop: "20px" }}>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 500, y: 800 }}
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
