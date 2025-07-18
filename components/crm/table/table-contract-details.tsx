import React, { useEffect, useState } from "react";
import styles from "../contract/contract.module.css";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useApi } from "../hooks/useApi";
import { useRouter } from "next/router";
import { base_url } from "../service/function";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";

interface DataType {
  _id: any;
  key: React.Key;
  name: string;
  date1: string;
  date2: string;
  filename: string;
  operation: string;
}

interface TableDataContracDrops {}

const TableDataContractDetailList: React.FC<
  TableDataContracDrops
> = ({}: any) => {
  const [id_customer, setid_customer] = useState<any>("");
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<any>([]);

  const fetchData = async () => {
    try {
      const formData = new FormData();
      formData.append("id_customer", id.toString());

      const response = await axios.post(
        `http://210.245.108.202:3007/api/crm/contractforcus/list`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token_base365")}`,
            // "Content-Type": "multipart/form-data",
          },
        }
      );

      setData(response.data);
    } catch (error) {
      // Xử lý lỗi ở đây
      console.error(error);
    }
  };

  function convertTimestampToDateFormat(timestamp) {
    const date = new Date(timestamp * 1000);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    fetchData();
  }, []);

  const datatable = data?.data?.data?.map((item: any, index: number) => {
    return {
      key: index + 1,
      _id: item.id,
      name: item?.user_created,
      ep_id: item.ep_id,
      file: item?.filename,
      created_at: item.created_at,
      user_created: item.user_created,
      id_customer: item.id_customer,
      status: item.status,
    };
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: 50,
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên hợp đồng",
      width: 200,
      dataIndex: "file",
      key: "file",
      render: (data, record) => (
        <Link href={`/customer/contract/detail/${id}/${record?._id}`}>
          <Tooltip title={data}>
            <span className={styles.font_file}>{data}</span>
          </Tooltip>
        </Link>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      width: 130,
      render: (date) => <span>{convertTimestampToDateFormat(date)}</span>,
    },
    {
      title: "Người tạo",
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (_, record) => (
        <div className={styles.username}>
          <Image
            className={styles.icon_user}
            src="/crm/user.svg"
            alt={"icon_user"}
            width={35}
            height={35}
          />
          {record.name}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => (
        <>
          {status ? (
            <button className={styles.send}>Đã gửi</button>
          ) : (
            <button className={styles.not_send}>Chưa gửi</button>
          )}
        </>
      ),
    },
    {
      title: "Gửi hợp đồng",
      dataIndex: "send",
      key: "send",
      width: 80,
      render: (data, record) => (
        <>
          <Link href={`/customer/contract/send/${id}/${record?._id}`}>
            <button>Gửi</button>
          </Link>
        </>
      ),
    },
    {
      title: "Chức năng",
      dataIndex: "action",
      key: "action",
      width: 100,
      render: () => (
        <>
          <button className={styles.delete_button}>
            <img className={styles.icon_delete} src="/crm/h_delete_cus.svg" />
            Xóa
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={datatable}
        bordered
        scroll={{ x: 1000, y: 1100 }}
      />
    </div>
  );
};

export default TableDataContractDetailList;
