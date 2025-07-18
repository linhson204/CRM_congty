import React, { useEffect, useState } from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import styles from "../order/order.module.css";
import OrderActionTable from "../order/order_action_table";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useTrigger } from "../context/triggerContext";
import { fetchApi } from "../ultis/api";
import { timestampToCustomString } from "../ultis/convert_date";
import useLoading from "../hooks/useLoading";

interface DataType {
  key: React.Key;
  number: string;
  name: string;
  status: string;
  note: string;
  staff: string;
}

interface TableDataCampaignCustomerProps {
  body?: any;
  setBody?: any;
  emp?: any;
  setNumberSelected?: React.Dispatch<{}>;
}

const TableDataCampaignCustomer: React.FC<TableDataCampaignCustomerProps> = ({
  body,
  setBody,
  emp,
  setNumberSelected,
}: any) => {
  const url = "https://api.timviec365.vn/api/crm/campaign/detail-campaign-cus";
  const token = Cookies.get("token_base365");
  const router = useRouter();
  const { trigger, setTrigger } = useTrigger();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [dataAPI, setDataApi] = useState([]);
  const [count, setCount] = useState(0);

  const statusList = [
    { value: 1, label: "Chưa liên hệ" },
    { value: 0, label: "Chưa liên hệ" },
    { value: 2, label: "Chưa gửi thư mời" },
    { value: 3, label: "Đã liên hệ" },
    { value: 4, label: "Đã gửi thư mời" },
    { value: 5, label: "Đã nhận" },
    { value: 6, label: "Đã mở" },
    { value: 7, label: "Xác nhận tham gia" },
    { value: 8, label: "Không liên hệ được" },
    { value: 9, label: "Đã tham gia" },
    { value: 10, label: "Chưa quan tâm" },
  ];

  const fetchAPIDelCampaignChance = async (id: number) => {
    const bodyAPI = {
      chance_id: id,
      campaign_id: 0,
    };
    const dataApi = await fetchApi(
      "https://api.timviec365.vn/api/crm/customerdetails/add-campaign-customer",
      token,
      bodyAPI,
      "POST"
    );
    if (dataApi) {
      setTrigger(true);
    }
  };

  const fetchAPICampaignCustomer = async () => {
    const bodyAPI = {
      ...body,
      cam_id: Number(router.query.id),
    };
    startLoading();
    const dataApi = await fetchApi(url, token, bodyAPI, "POST");
    setDataApi(dataApi?.data?.data);
    setCount(dataApi?.data?.count);
    stopLoading();
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Mã KH",
      width: 80,
      dataIndex: "cus_id",
      key: "cus_id",
    },
    {
      title: "Tên khách hàng",
      width: 120,
      dataIndex: "customerDetails",
      key: "customerDetails",
      render: (text: any, record: any) => (
        <Link href={`/customer/detail/${text?.cus_id}`}>
          <b>{text?.name}</b>
        </Link>
      ),
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (text, record: any) => <>{statusList[text]?.label}</>,
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
      width: 320,
      render: (text) => <div>{text || "Chưa cập nhật"}</div>,
    },
    {
      title: "Nhân viên thực hiện",
      dataIndex: "emp_id",
      key: "emp_id",
      width: 120,
      render: (empID) => (
        <div>
          {emp.filter((empList) => empList?.ep_id === empID)[0]?.userName ||
            "Chưa cập nhật"}
        </div>
      ),
    },
  ];

  const data =
    dataAPI?.map((item, index) => {
      return {
        ...item,
        index: index + 1,
        key: index,
      };
    }) || [];

  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows?.length > 0) {
        // setSelected(true);
      } else {
        // setSelected(false);
      }
    },
    onSelect: (record, selected, selectedRows) => {
      // setNumberSelected(selectedRows?.length);
      setNumberSelected(selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      setNumberSelected(selectedRows);
    },
  };

  useEffect(() => {
    if (trigger) {
      fetchAPICampaignCustomer();
    }
    setTrigger(false);
  }, [trigger]);

  useEffect(() => {
    fetchAPICampaignCustomer();
  }, [body]);

  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: 1200, y: 1200 }}
        pagination={{
          style: {
            paddingBottom: 20,
            display: "flex",
            position: "absolute",
            right: 0,
          },
          current: body?.page,
          pageSize: body?.pageSize,
          total: count,
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
          Tổng số: <b>{data.length}</b> Khách hàng
        </div>
      </div>
    </div>
  );
};

export default TableDataCampaignCustomer;
