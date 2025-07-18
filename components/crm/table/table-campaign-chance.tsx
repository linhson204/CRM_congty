import React, { useEffect, useState } from "react";
import { Spin, Table, Tooltip } from "antd";
import styles from "../campaign/campaign.module.css";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
// import { TableRowSelection } from "antd/es/table/interface";
import CampaignChanceActionTable from "@/components/crm/campaign/campaign_chance_table_action";
import Cookies from "js-cookie";
import { useTrigger } from "../context/triggerContext";
import { fetchApi } from "../ultis/api";
import useLoading from "../hooks/useLoading";
import { useRouter } from "next/router";
import { timestampToCustomString } from "../ultis/convert_date";

interface TableDataCampaginChanceProps {
  body?: any;
  setBody?: any;
  emp?: any;
}

const TableDataCampaginChance: React.FC<TableDataCampaginChanceProps> = ({
  body,
  setBody,
  emp,
}) => {
  const url = "https://api.timviec365.vn/api/crm/chance/list-chance";
  const token = Cookies.get("token_base365");
  const router = useRouter();
  const { trigger, setTrigger } = useTrigger();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [dataAPI, setDataApi] = useState([]);
  const [count, setCount] = useState(0);

  const statusList = {
    0: "Chưa cập nhật",
    1: "Chưa cập nhật",
    2: "Mở đầu",
    3: "Khách hàng quan tâm",
    4: "Demo/Gthieu",
    5: "Đàm phán/ thương lương",
  };

  const fetchAPIDelCampaignChance = async (id: number) => {
    const bodyAPI = {
      chance_id: id,
      campaign_id: 0,
    };
    const dataApi = await fetchApi(
      "https://api.timviec365.vn/api/crm/chance/edit-chance",
      token,
      bodyAPI,
      "POST"
    );
    if (dataApi) {
      setTrigger(true);
    }
  };

  const fetchAPICampaignChance = async () => {
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
      render: (id: number) => (
        <CampaignChanceActionTable
          handleDel={fetchAPIDelCampaignChance}
          id={id}
        />
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

  useEffect(() => {
    if (trigger) {
      fetchAPICampaignChance();
    }
    setTrigger(false);

    return () => {
      setTrigger(true);
    };
  }, [trigger]);

  useEffect(() => {
    fetchAPICampaignChance();
  }, [body]);

  return (
    <>
      {isLoading ? (
        <Spin style={{ width: "100%", margin: "auto" }} />
      ) : (
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
            <div style={{ marginBottom: "10px" }} className="total">
              Tổng số: <b>{data.length}</b> Cơ hội
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableDataCampaginChance;
