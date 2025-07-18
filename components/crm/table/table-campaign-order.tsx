import React, { useEffect, useState } from "react";
import { Spin, Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import styles from "../order/order.module.css";
import OrderActionTable from "../order/order_action_table";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useTrigger } from "../context/triggerContext";
import useLoading from "../hooks/useLoading";
import { fetchApi } from "../ultis/api";
import { timestampToCustomString } from "../ultis/convert_date";

interface DataType {
  key: React.Key;
  order_number: string;
  status: string;
  customer: string;
  explain: string;
  value: number;
  name: string;
  order_date: string;
}

interface TableDataCampaignOrderProps {
  setSelected?: (value: boolean) => void;
  setNumberSelected?: any;
  body?: any;
  setBody?: any;
  emp?: any;
}

const TableDataCampaignOrder: React.FC<TableDataCampaignOrderProps> = ({
  body,
  setBody,
  setSelected,
  setNumberSelected,
  emp,
}: any) => {
  const url = "https://api.timviec365.vn/api/crm/order/list-order";
  const token = Cookies.get("token_base365");
  const router = useRouter();
  const { trigger, setTrigger } = useTrigger();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [dataAPI, setDataApi] = useState([]);
  const [count, setCount] = useState(0);

  const status = [
    <div style={{ color: "#FFA800" }}>Chờ duyệt</div>,
    <div style={{ color: "#FFA800" }}>Chờ duyệt</div>,
    <div style={{ color: "#34B632" }}>Đã duyệt</div>,
    <div style={{ color: "#F33" }}>Từ chối</div>,
    <div style={{ color: "#666" }}>Đã hủy bỏ</div>,
  ];

  const bodyAPI = [
    {
      typeAPI: "del",
      campaign_id: 0,
    },
    {
      typeAPI: "deny",
      status: 3,
    },
    {
      typeAPI: "confirm",
      status: 2,
    },
    {
      typeAPI: "cancel",
      status: 4,
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

  const fetchAPIEdit = async (id: number, bodyAPIs) => {
    bodyAPIs = {
      ...bodyAPIs,
      id: id,
    };
    const dataApi = await fetchApi(
      "https://api.timviec365.vn/api/crm/order/edit-order",
      token,
      bodyAPIs,
      "POST"
    );
    if (dataApi) {
      setTrigger(true);
    }
  };

  const fetchAPICampaignOrder = async () => {
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

  const data =
    dataAPI?.map((item, index) => {
      return {
        ...item,
        index: index + 1,
        key: index,
      };
    }) || [];

  const columns: ColumnsType<DataType> = [
    {
      title: "Số đơn hàng",
      width: 90,
      dataIndex: "_id",
      key: "_id",
      render: (text: any, record: any) => (
        <Link href={`/order/detail/${record._id}`}>
          <b>{text}</b>
        </Link>
      ),
    },
    {
      title: "Trạng thái",
      width: 130,
      dataIndex: "status",
      key: "status",
      render: (text) => <div>{status[text]}</div>,
    },
    {
      title: "Khách hàng",
      dataIndex: "cus_id",
      key: "cus_id",
      width: 220,
      render: (text) => <div>{text?.name}</div>,
    },
    {
      title: "Diễn giải",
      dataIndex: "explain",
      key: "explain",
      width: 250,
      ellipsis: true,
    },
    {
      title: "Giá trị (VNĐ)",
      dataIndex: "total_money",
      key: "total_money",
      width: 150,
    },
    {
      title: "Người thực hiện",
      dataIndex: "emp_id",
      key: "emp_id",
      width: 180,
      render: (empID) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          <img src="/crm/user_kh.png" alt="" />
          {emp.filter((empList) => empList?.ep_id === empID)[0]?.userName ||
            "Chưa cập nhật"}
        </div>
      ),
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "date",
      key: "date",
      width: 120,
      render: (date) => <div>{timestampToCustomString(date)}</div>,
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "11",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <OrderActionTable
          record={record}
          fetchAPIEdit={fetchAPIEdit}
          bodyAPI={bodyAPI}
        />
      ),
    },
  ];

  useEffect(() => {
    fetchAPICampaignOrder();
  }, [body]);

  useEffect(() => {
    if (trigger) {
      fetchAPICampaignOrder();
    }
    setTrigger(false);
  }, [trigger]);

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
  return (
    <div className="custom_table">
      {isLoading ? (
        <Spin style={{ width: "100%", margin: "auto" }} />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default TableDataCampaignOrder;
