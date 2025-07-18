import React, { useEffect, useState } from "react";
import styles from "../contract/contract.module.css";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import Link from "next/link";
import { useApi } from "@/components/crm/hooks/useApi";
import { base_url } from "../service/function";

interface DataType {
  id_form_contract: any;
  key: React.Key;
  user_created: string;
  created_at: string;
  update_at: string;
  path_dowload: string;
}

interface TableContractProps {
  valSearch: string;
}

const TableContract: React.FC<TableContractProps> = ({ valSearch }) => {
  const [openSharedModal, setOpenSharedModal] = useState(false);
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const handleClickSelectoption = () => {};
  const [isOpen, setIsOpen] = useState(false);
  const [id_customer, setid_customer] = useState<any>("");
  const [id, setId] = useState();
  const [name, setName] = useState();
  const Cookies = require("js-cookie");

  function convertUnixTimestampToDateString(unixTimestamp) {
    const timestamp = unixTimestamp * 1000; // Unix timestamp in milliseconds
    const date = new Date(timestamp);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }

  const { data, loading, error, fetchData, updateData, deleteData } = useApi(
    // `https://api.timviec365.vn/api/crm/contract/list`,
    "https://api.timviec365.vn/api/crm/contract/list", // Đợi API được đẩy lên Server
    Cookies.get("token_base365"),
    "POST",
    // { id_customer: `${id_customer}`, pageSize: 10000 }
    {}
  );

  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    if (valSearch && !hasFetchedData) {
      fetchData();
      setHasFetchedData(true); // Đã gọi fetchData, đánh dấu là đã fetch data
    }
  }, [valSearch, hasFetchedData]);

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: 50,
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên hợp đồng",
      width: 240,
      dataIndex: "name",
      key: "0",
      render: (data, record) => (
        <Link href={`detail/${record?.id_form_contract}`}>
          <Tooltip title={data}>
            <span>{data}</span>
          </Tooltip>
        </Link>
      ),
    },
    {
      title: "Người tạo",
      dataIndex: "user_created",
      key: "1",
      width: 200,
      render: (name) => <span>{name || "Chưa cập nhật"}</span>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "2",
      width: 150,
      render: (date) => <div>{convertUnixTimestampToDateString(date)}</div>,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "update_at",
      key: "3",
      width: 150,
      render: (date) => <div>{convertUnixTimestampToDateString(date)}</div>,
    },
    {
      title: "Chức năng",
      dataIndex: "id_form_contract",
      key: "4",
      width: 200,
      // fixed:"right",
      render: (data) => (
        <>
          <Link href={`/contract/edit/${data}`}>
            <button>
              <img className={styles.icon_edit} src="/crm/h_edit_cus.svg" />
              Sửa
            </button>
          </Link>
          <Link href={"#"}>
            <button>
              <img className={styles.icon_delete} src="/crm/h_delete_cus.svg" />
              Xóa
            </button>
          </Link>
        </>
      ),
    },
  ];
  const newData = data?.data?.list?.filter((item) =>
    item?.name.toLowerCase().includes(valSearch.toLowerCase())
  );
  const datatable = newData?.map((item: any, index: number) => {
    return {
      key: index + 1,
      _id: item?._id,
      name: item?.name,
      pathFile: item?.path_file,
      com_id: item?.com_id,
      ep_id: item?.ep_id,
      id_file: item?.id_file,
      created_at: item?.created_at,
      user_created: item?.user_created,
      id_customer: item?.id_customer,
      update_at: item?.updated_at || "Chua cap nhat",
      status: item?.status,
      is_delete: item?.is_delete,
      new_field: item?.new_field,
      old_field: item?.old_field,
      index_field: item?.index_field,
      default_field: item?.default_field,
      path_dowload: item?.path_dowload,
      id_form_contract: item?.id,
    };
  });

  const [current, setcurrent] = useState(1);
  const [pageSize, setpageSize] = useState(10);

  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={datatable}
        bordered
        scroll={{ x: 1500, y: 1100 }}
      />
    </div>
  );
};

export default TableContract;
