import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import ChanceActionDropDown from "../chance/chance_action_dropdown";
import { TableRowSelection } from "antd/es/table/interface";
import { timestampToCustomString } from "../ultis/convert_date";

interface TableDataChanceProps {
  setSelected: (value: boolean) => void;
  body?: any;
  setBody?: any;
  emp?: any;
  dataAPI?: {}[];
}
const TableDataChance: React.FC<TableDataChanceProps> = ({
  setSelected,
  body,
  setBody,
  emp,
  dataAPI,
}: any) => {
  const statusList = {
    0: "Chưa cập nhật",
    1: "Chưa cập nhật",
    2: "Mở đầu",
    3: "Khách hàng quan tâm",
    4: "Demo/Gthieu",
    5: "Đàm phán/ thương lương",
  };

  const rowSelection: TableRowSelection<any> = {
    onChange: (selectedRowKeys, selectedRows) => {
      // if (selectedRows?.length > 0) {
      //   setSelected(true);
      // } else {
      //   setSelected(false);
      // }
    },
    onSelect: (record, selected, selectedRows) => {
      setSelected(selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      setSelected(selectedRows);
    },
  };

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      width: 50,
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Tên cơ hội",
      width: 180,
      dataIndex: "name",
      key: "name",
      render: (text: any, record: any) => (
        <Link target="_blank" href={`/chance/detail/${record.id}`}>
          <b>{text}</b>
        </Link>
      ),
    },
    {
      title: "ID",
      width: 50,
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Khách hàng",
      width: 150,
      dataIndex: "cus_id",
      key: "cus_id",
      render: (data) => <span>{data?.name || "Chưa cập nhật"}</span>,
    },
    {
      title: "Số tiền (VNĐ)",
      dataIndex: "total_money",
      key: "total_money",
      width: 150,
    },
    {
      title: "Giai đoạn",
      dataIndex: "stages",
      key: "stages",
      width: 150,
      render: (data) => <span>{statusList?.[data]}</span>,
    },
    {
      title: "Tỷ lệ thành công",
      dataIndex: "success_rate",
      key: "success_rate",
      width: 150,
    },
    {
      title: "Doanh số kỳ vọng (VNĐ)",
      dataIndex: "expected_sales",
      key: "expected_sales",
      width: 250,
    },
    {
      title: "Ngày kỳ vọng/kết thúc",
      dataIndex: "time_complete",
      key: "time_complete",
      width: 150,
      render: (date) => <div>{timestampToCustomString(date)}</div>,
    },
    {
      title: "Người thực hiện",
      dataIndex: "emp_id",
      key: "emp_id",
      width: 150,
      render: (empID) => (
        <div>
          {emp.filter((empList) => empList?.ep_id === empID)[0]?.userName ||
            "Chưa cập nhật"}
        </div>
      ),
    },
    {
      title: "Chức năng",
      dataIndex: "id",
      key: "11",
      width: 150,
      fixed: "right",
      render: (data, record) => <ChanceActionDropDown data={record} />,
    },
  ];

  const data =
    dataAPI?.data?.map((item, index) => {
      return {
        ...item,
        index: index + 1,
        key: index,
      };
    }) || [];

  return (
    <div className="custom_table product_return">
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: 1500, y: 1100 }}
        pagination={{
          style: {
            paddingBottom: 20,
            display: "flex",
            position: "absolute",
            right: 0,
          },
          current: body?.page,
          pageSize: body?.pageSize,
          total: dataAPI?.count,
          onChange: (current, pageSize) => {
            if (current != body?.page) {
              setBody((prev) => {
                return {
                  ...prev,
                  page: current,
                };
              });
            }
          },
        }}
      />
      <div style={{ marginTop: "10px" }} className="flex_between" id="">
        <div style={{ marginBottom: "10px" }} className="show_number_item">
          <b>Hiển thị:</b>
          <select
            onChange={(el) => {
              setBody({
                ...body,
                pageSize: Number(el.target.value),
              });
            }}
            className="show_item"
            value={body?.pageSize || 10}
          >
            <option value={10}>10 bản ghi trên trang</option>
            <option value={20}>20 bản ghi trên trang</option>
            <option value={30}>30 bản ghi trên trang</option>
            <option value={40}>40 bản ghi trên trang</option>
            <option value={50}>50 bản ghi trên trang</option>
          </select>
        </div>
        <div style={{ marginBottom: "10px" }} className="total">
          Tổng số: <b>{data.length}</b> Cơ hội
        </div>
      </div>
    </div>
  );
};

export default TableDataChance;
