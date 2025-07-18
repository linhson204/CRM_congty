import React, { useEffect, useState } from "react";
import { Pagination, Select, Spin, Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import CampaignSelectBoxStep from "@/components/crm/campaign/campaign_steps/select_box_table_step";
import stylesCampaignSelect from "@/components/crm/campaign/campaign.module.css";
import styles from "../order/order.module.css";
import Link from "next/link";
import { fetchApi } from "../ultis/api";
import Cookies from "js-cookie";
import { useTrigger } from "../context/triggerContext";
import useLoading from "../hooks/useLoading";
import $ from "jquery";
import "select2";

interface DataType {
  resource: number;
  resoure: number;
  group_id: any;
  key: React.Key;
  cus_id: string;
  name: string;
  phone_number: string;
  email: string;
  status: string;
  description: string;
  cus_from: string;
  group: string;
  staff: string;
  date: string;
}

interface TableDataOrderProps {
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
  setArrCustomerId: any;
  searchParam?: {};
}

const TableDataOrder: React.FC<TableDataOrderProps> = ({
  setSelected,
  setNumberSelected,
  setArrCustomerId,
  searchParam,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const url = "https://api.timviec365.vn/api/crm/customer/list";
  const token = Cookies.get("token_base365");
  const [dataAPI, setDataApi] = useState([]);
  const [count, setCount] = useState(0);
  const { trigger, setTrigger } = useTrigger();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const initialOption = { gr_id: 0, gr_name: "Chưa cập nhật" };
  const [dataGroup, setDataGroup] = useState([]);
  const [emp, setEmp] = useState([]);
  const [dataStatus, setDataStatus] = useState([]);

  const arrOriginCustomer = [
    { label: "Chưa cập nhật", value: 0 },
    { label: "Facebook", value: 1 },
    { label: "Website", value: 3 },
    { label: "Zalo", value: 2 },
    { label: "Dữ liệu bên thứ 3", value: 4 },
    { label: "Khách hàng giới thiệu", value: 5 },
    { label: "Giới thiệu", value: 6 },
    { label: "Chăm sóc khách hàng", value: 7 },
    { label: "Email", value: 8 },
  ];

  const options = [...(dataGroup ?? [])].map((item) => ({
    label: item.gr_name, // Không trả về label nếu item.gr_id = 0
    options:
      item.gr_id !== "0"
        ? [
            {
              value: item.gr_id.toString(),
              label: item.gr_name,
            },
            ...(item?.lists_child ?? []).map((child) => ({
              value: child.gr_id.toString(),
              label: child.gr_name,
            })),
          ]
        : [{ label: item.gr_name, value: item.gr_id.toString() }],
  }));

  const fetchAPICustomer = async () => {
    const bodyAPI = {
      ...searchParam,
      page: currentPage,
    };
    startLoading();
    const dataApi = await fetchApi(url, token, bodyAPI, "POST");
    setDataApi(dataApi?.data);
    setCount(dataApi?.total);
    stopLoading();
  };

  const fetchAPIEmployee = async () => {
    const dataApi = await fetchApi(
      "http://210.245.108.202:3000/api/qlc/managerUser/listUser",
      token,
      { page: 1, pageSize: 10000 },
      "POST"
    );
    setEmp(dataApi?.data?.data);
  };

  const handleGetInfoSTT = async () => {
    try {
      const res = await fetch(
        `https://api.timviec365.vn/api/crm/customerStatus/list`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: JSON.stringify({ pageSize: 100 }),
        }
      );
      const data = await res.json();
      if (data && data?.data)
        setDataStatus(
          data?.data?.map((item) => {
            return {
              label: item?.stt_name,
              value: item?.stt_id,
            };
          })
        );
    } catch (error) {}
  };

  const handleGetGr = async () => {
    try {
      const res = await fetch(
        `https://api.timviec365.vn/api/crm/group/list_group_khach_hang`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
          },
          body: JSON.stringify({ com_id: Cookies.get("com_id") }),
        }
      );
      let arr = [];
      const data = await res.json();
      setDataGroup(data?.data);
      data?.data?.map((item) => {
        item?.lists_child.map((item) => {
          arr.push(item);
        });
      });
    } catch (error) {}
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Mã KH",
      width: 120,
      dataIndex: "cus_id",
      key: "cus_id",
      // render:(text:any,record:any)=><Link href={`/order/detail/${record.key}`} ><b>{text}</b></Link>
    },
    {
      title: "Tên khách hàng",
      width: 200,
      dataIndex: "name",
      key: "name",
      render: (text: any, record: any) => (
        <Link href={`/customer/detail/${record.key}`}>
          <b>{text}</b>
        </Link>
      ),
    },
    {
      title: "Điện thoại",
      dataIndex: "phone_number",
      key: "phone_number",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Tình trạng khách hàng",
      dataIndex: "status",
      key: "status",
      width: 180,
      render: (data, record) => (
        <Select
          className="customer_group_select"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          style={{ width: "100%", height: "100%", border: 0 }}
          options={
            dataStatus
              ? [
                  {
                    label: "Chưa cập nhật",
                    value: 0,
                  },
                  ...dataStatus,
                ]
              : [
                  {
                    label: "Chưa cập nhật",
                    value: 0,
                  },
                ]
          }
          defaultValue={record?.status || 0}
          placeholder="Tình trạng khách hàng "
          onChange={async (value) => {
            await fetchApi(
              "https://api.timviec365.vn/api/crm/customerdetails/editCustomer",
              token,
              { status: value, cus_id: record?.cus_id },
              "POST"
            );
          }}
        />
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 150,
    },
    {
      title: "Nguồn khách hàng",
      dataIndex: "resource",
      key: "resource",
      width: 180,
      render: (data, record) => (
        <Select
          className="customer_group_select"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          style={{ width: "100%", height: "100%", border: 0 }}
          options={arrOriginCustomer}
          defaultValue={record?.resource || 0}
          placeholder="Nguồn: "
          onChange={async (value) => {
            await fetchApi(
              "https://api.timviec365.vn/api/crm/customerdetails/editCustomer",
              token,
              { resoure: value, cus_id: record?.cus_id },
              "POST"
            );
          }}
        />
      ),
    },
    {
      title: "Nhóm khách hàng",
      dataIndex: "group_id",
      key: "group",
      width: 250,
      render: (data, record) => (
        <Select
          className="customer_group_select"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          style={{ width: "100%", height: "100%", border: 0 }}
          options={[
            ...options,
            {
              label: "Chưa cập nhật",
              value: 0,
            },
          ]}
          defaultValue={record?.group_id || 0}
          placeholder="Nhóm khách hàng: "
          onChange={async (value) => {
            await fetchApi(
              "https://api.timviec365.vn/api/crm/customerdetails/editCustomer",
              token,
              { group_id: value, cus_id: record?.cus_id },
              "POST"
            );
          }}
        />
      ),
    },
    {
      title: "Nhân viên phụ trách",
      dataIndex: "emp_id",
      key: "emp_id",
      width: 200,
      render: (empID) => (
        <div>
          {emp?.filter((empList) => empList?.ep_id === empID)[0]?.userName ||
            "Chưa cập nhật"}
        </div>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "date",
      width: 120,
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
      fetchAPICustomer();
    }
    setTrigger(false);
  }, [trigger]);

  useEffect(() => {
    fetchAPICustomer();
  }, [currentPage, searchParam]);

  useEffect(() => {
    handleGetGr();
    handleGetInfoSTT();
    fetchAPIEmployee();
  }, []);

  useEffect(() => {}, []);

  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows?.length > 0) {
        let arr_cus = selectedRows.map((e, i) => {
          return e.cus_id;
        });
        setArrCustomerId(arr_cus);
      }
    },
    onSelect: (record, selected, selectedRows) => {
      setNumberSelected(selectedRows?.length);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {},
  };

  return (
    <>
      {isLoading ? (
        <Spin
          style={{
            width: "100%",
            minWidth: "300px",
            margin: "auto",
            marginTop: "10px",
          }}
        />
      ) : (
        <div className="custom_table">
          <Table
            columns={columns}
            dataSource={data}
            rowSelection={{ ...rowSelection }}
            bordered
            scroll={{ x: 1500, y: 400 }}
          />
          <div className={`${styles.main__footer} ${styles.flex_between}`}>
            <div className="total">
              Tổng số: <b>{count}</b> Khách hàng
            </div>
            <Pagination
              current={currentPage}
              total={count}
              onChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TableDataOrder;
