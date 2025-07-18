import React, { useEffect, useState } from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import CampaginBillActionTable from "@/components/crm/campaign/campaign_table_action";
import styles from "../order/order.module.css";
import OrderActionTable from "../order/order_action_table";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useTrigger } from "../context/triggerContext";
import useLoading from "../hooks/useLoading";
import { fetchApi } from "../ultis/api";
import { convertTimestampToDate } from "@/utils/function";

interface DataType {
  key: React.Key;
  number: string;
  name: string;
  status: string;
  bill_number: string;
  code: string;
  date: string;
  total: string;
  address: string;
  status_bill: string;
}

interface TableDataCampaignBillProps {
  setSelected: (value: boolean) => void;
  setNumberSelected?: React.Dispatch<{}>;
  body?: {};
  setBody?: React.Dispatch<{}>;
  emp?: {}[];
}

const TableDataCampaignBill = ({
  setSelected,
  setNumberSelected,
  body,
  setBody,
  emp,
}: any) => {
  const url = "https://api.timviec365.vn/api/crm/bill/list-bill";
  const token = Cookies.get("token_base365");
  const router = useRouter();
  const { trigger, setTrigger } = useTrigger();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [dataAPI, setDataApi] = useState([]);
  const [count, setCount] = useState(0);

  const bodyAPI = [
    {
      typeAPI: "del",
      campaign_id: 0,
    },
    {
      typeAPI: "deny",
      status: 5,
    },
    {
      typeAPI: "confirm",
      status: 2,
    },
    {
      typeAPI: "cancel",
      status: 3,
    },
    {
      typeAPI: "hand_over",
      status: 0,
    },
    {
      typeAPI: "share",
      status: 0,
    },
  ];

  const statusSendList = [
    <div style={{ color: "#FFA800" }}>Chưa gửi</div>,
    <div style={{ color: "#FFA800" }}>Chưa gửi</div>,
    <div style={{ color: "#34B632" }}>Đã gửi</div>,
  ];

  const statusList = [
    <div style={{ color: "#FFA800" }}>Đề nghị xuất</div>,
    <div style={{ color: "#FFA800" }}>Đề nghị xuất</div>,
    <div style={{ color: "#2A38A2" }}>Duyệt đề nghị</div>,
    <div style={{ color: "#666" }}>Huỷ bỏ</div>,
    <div style={{ color: "#34B632" }}>Đã xuất</div>,
    <div style={{ color: "#F33" }}> Từ chối</div>,
  ];

  const fetchAPIEdit = async (id: number, bodyAPIs) => {
    bodyAPIs = {
      ...bodyAPIs,
      id: id,
    };
    const dataApi = await fetchApi(
      "https://api.timviec365.vn/api/crm/bill/edit-bill",
      token,
      bodyAPIs,
      "POST"
    );
    if (dataApi) {
      setTrigger(true);
    }
  };

  const fetchAPICampaignBill = async () => {
    const bodyAPI = {
      ...body,
      campaign_id: Number(router.query.id),
    };
    startLoading();
    const dataApi = await fetchApi(url, token, bodyAPI, "POST");
    setDataApi(dataApi?.data?.data);
    setCount(dataApi?.data?.count);
    stopLoading();
  };

  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows?.length > 0) {
        setSelected(true);
      } else {
        setSelected(false);
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

  const columns: ColumnsType = [
    {
      title: "Số đề nghị xuất hóa đơn",
      width: 180,
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Khách hàng",
      width: 180,
      dataIndex: "cus_id",
      key: "cus_id",
      render: (text: any, record: any) => (
        <Link href={`/customer/detail/${record?.cus_id?.cus_id}`}>
          <b>{text?.name}</b>
        </Link>
      ),
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (text: number, record: any) => <>{statusList[text]}</>,
    },
    {
      title: "Số hóa đơn",
      dataIndex: "order_id",
      key: "order_id",
      width: 120,
      render: (text: any, record: any) => <b>{text?._id || "--"}</b>,
    },
    // {
    //   title: "Mã tra cứu",
    //   dataIndex: "code",
    //   key: "code",
    //   width: 120,
    // },
    {
      title: "Ngày hóa đơn",
      dataIndex: "date",
      key: "date",
      width: 150,
      render: (text: any, record: any) => <b>{convertTimestampToDate(text)}</b>,
    },
    {
      title: "Tổng tiền (VNĐ)",
      dataIndex: "total_money",
      key: "total_money",
      width: 150,
      render: (text: any, record: any) => <b>{text?.toFixed(2) || "--"}</b>,
    },
    {
      title: "Địa chỉ",
      dataIndex: "bill_address",
      key: "bill_address",
      width: 350,
      ellipsis: true,
    },
    {
      title: "Tình trạng gửi hóa đơn",
      dataIndex: "status_send",
      key: "status_send",
      width: 220,
      render: (text) => (
        <div style={{ color: "#FFA800" }}>{statusSendList?.[text]}</div>
      ),
    },
    {
      title: "Chức năng",
      dataIndex: "_id",
      key: "_id",
      width: 160,
      fixed: "right",
      render: (id, record) => (
        <OrderActionTable
          record={record}
          fetchAPIEdit={fetchAPIEdit}
          bodyAPI={bodyAPI}
          link={`/bill/edit/${id}`}
        />
      ),
    },
  ];

  const data =
    dataAPI?.map((item, i) => {
      return {
        ...item,
        index: i,
        id: item?._id,
        key: i,
      };
    }) || [];

  useEffect(() => {
    fetchAPICampaignBill();
  }, [body]);

  useEffect(() => {
    if (trigger) {
      fetchAPICampaignBill();
    }
    setTrigger(false);
  }, [trigger]);

  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: 1500, y: 1200 }}
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
          Tổng số: <b>{data.length}</b> Đơn hàng
        </div>
      </div>
    </div>
  );
};

export default TableDataCampaignBill;
