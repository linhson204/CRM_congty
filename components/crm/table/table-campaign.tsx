import React from "react";
import { Table, Tooltip } from "antd";
import styles from "../campaign/campaign.module.css";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
// import { TableRowSelection } from "antd/es/table/interface";
import CampaignActionTable from "@/components/crm/campaign/campaign_table_action";
import { timestampToCustomString } from "../../crm/ultis/convert_date";
import { fetchApi } from "../ultis/api";
import Cookies from "js-cookie";
import { useTrigger } from "../context/triggerContext";

interface TableDataCampaignProps {
  dataAPI?: any;
  empList?: any;
  setBody?: any;
  body?: any;
}

const TableDataCampaign: React.FC<TableDataCampaignProps> = ({
  dataAPI,
  empList,
  setBody,
  body,
}) => {
  const url = "https://api.timviec365.vn/api/crm/campaign/delete-campaign";
  const token = Cookies.get("token_base365");
  const { trigger, setTrigger } = useTrigger();

  const fetchAPICampaign = async (id: number) => {
    const bodyAPI = {
      cam_id: id,
    };
    const dataApi = await fetchApi(url, token, bodyAPI, "POST");
    if (dataApi) {
      setTrigger(true);
    }
  };
  interface DataType {
    key: React.Key;
    nameCampaign: string;
    _id: number;
    status: number;
    typeCampaign: number;
    timeStart: string;
    timeEnd: string;
    discount: number;
    expectedSales: number;
    companyID: number;
    empID: number;
    description: string;
    money: number;
  }

  const dataStatus = [
    <div>Chưa cập nhật</div>,
    <div>Chưa cập nhật</div>,
    <div style={{ color: "#FFA800" }}>Chưa diễn ra</div>,
    <div style={{ color: "#34B632" }}>Đã kết thúc</div>,
    <div style={{ color: "#FF3333" }}>Đang tạm dừng</div>,
    <div style={{ color: "#4C5BD4" }}>Đang diễn ra</div>,
  ];

  const dataTypeCampaign = [
    <div>Chưa cập nhật</div>,
    <div>Chưa cập nhật</div>,
    <div>Gửi mail</div>,
    <div>Điện thoại</div>,
    <div>Tổ chức hội thảo tập huấn</div>,
    <div>Gặp mặt trực tiếp</div>,
    <div>Qua bưu điện</div>,
    <div>Mạng xã hội</div>,
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: 50,
      dataIndex: "key",
      key: "key",
    },

    {
      title: "Tên chiến dịch",
      width: 180,
      dataIndex: "nameCampaign",
      key: "nameCampaign",
      render: (text: any, record: any) => (
        <Link href={`/campaign/detail/${record._id}`}>
          <b>{text}</b>
        </Link>
      ),
    },
    {
      title: "ID",
      width: 50,
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Tình trạng",
      width: 150,
      dataIndex: "status",
      key: "status",
      render: (data) => <>{dataStatus[data]}</>,
    },
    {
      title: "Loại",
      dataIndex: "typeCampaign",
      key: "typeCampaign",
      width: 120,
      render: (data) => <>{dataTypeCampaign[data]}</>,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "timeStart",
      key: "timeStart",
      width: 150,
      render: (date) => <div>{timestampToCustomString(date)}</div>,
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "timeEnd",
      key: "timeEnd",
      width: 150,
      render: (date) => <div>{timestampToCustomString(date)}</div>,
    },
    {
      title: "Doanh số kỳ vọng (VNĐ)",
      dataIndex: "expectedSales",
      key: "expectedSales",
      width: 180,
    },
    {
      title: "Ngân sách (VNĐ)",
      dataIndex: "money",
      key: "money",
      width: 160,
    },
    {
      title: "Người phụ trách",
      dataIndex: "empID",
      key: "empID",
      width: 180,
      render: (text: any, record: any) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            justifyContent: "center",
          }}
        >
          <img src="/crm/user_kh.png" alt="user" />
          {empList?.filter((emp) => emp.ep_id === text)[0]?.userName ||
            "Chưa cập nhật"}
        </div>
      ),
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "11",
      width: 150,
      fixed: "right",
      render: (text: any, record: any) => (
        <CampaignActionTable
          record={record._id}
          handleDelete={fetchAPICampaign}
        />
      ),
    },
  ];

  const data: DataType[] =
    dataAPI?.data?.map((item, index) => {
      return {
        ...item,
        key: index + 1,
      };
    }) || [];

  return (
    <div className="custom_table campaign_tble">
      <Table
        columns={columns}
        dataSource={data}
        // rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: 1500, y: 320 }}
        pagination={{
          style: {
            paddingBottom: 20,
            display: "flex",
            position: "absolute",
            right: 0,
          },
          current: body?.page,
          pageSize: body?.pageSize,
          total: dataAPI?.total,
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
      <div
        style={{ marginTop: "5px", width: "50%" }}
        className="flex_between"
        id=""
      >
        <div className="show_number_item">
          <b>Hiển thị:</b>
          <select
            onChange={(e) => {
              setBody((prev) => {
                return {
                  ...prev,
                  pageSize: e.target.value,
                };
              });
            }}
            value={body?.pageSize || 10}
            className="show_item"
          >
            <option value={10}>10 bản ghi trên trang</option>
            <option value={20}>20 bản ghi trên trang</option>
            <option value={30}>30 bản ghi trên trang</option>
            <option value={40}>40 bản ghi trên trang</option>
            <option value={50}>50 bản ghi trên trang</option>
          </select>
        </div>
        <div className="total" style={{ marginTop: "5px", marginLeft: "12px" }}>
          Tổng số: <b>{data.length}</b> Chiến dịch
        </div>
      </div>
    </div>
  );
};

export default TableDataCampaign;
