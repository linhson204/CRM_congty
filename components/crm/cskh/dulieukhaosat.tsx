import { SearchOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, MenuProps, Table } from "antd";
import React, { useState } from "react";
import styles from "../delete_data/table.module.css";
import styless from "../potential/potential.module.css";
import cskh from "./csks.module.css";
import ModalDeleteKhaoSat from "./modal/modaldelkhaosat";
import Link from "next/link";
import { useRouter } from "next/router";
type Props = {};

const DLKhaoSat = (props: Props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [isShowModalChange, setIsShowModalChange] = useState(false);
  const [id, setId] = useState();
  const onClose = () => {
    setIsShowModalAdd(false);
    setIsShowModalChange(false);
    setIsShowModal(false);
  };
  const handleSelect = (id: any) => {
    setId(id);
  };
  const handleDeleteDB = () => {
    setIsShowModal(false);
  };
  const data = [];
  for (let i = 1; i < 1; i++) {
    data.push({
      key: i,
      name: "Truong" + i,
      monney: 100000000000,
      des: "balaalaaaaaaaaaaaaaaaaaaaaaa",
      nameBoss: "Trang",
      status: "Ngừng hoạt động",
      date: "12-07-2023",
    });
  }
  const router = useRouter();
  const Colums = [
    {
      width: "10%",
      title: "STT",
      dataIndex: "name",
      render: (text: any, record: any) => <Link href={``}>{text}</Link>,
    },
    {
      width: "25%",
      title: "Tên khách hàng",
      dataIndex: "name",
      render: (text: any, record: any) => (
        <Link href={``}>{text}</Link>
      ),
    },
    {
        width: "25%",
      title: "Số điện thoại",
      dataIndex: "des",
      render: (text: any) => <div>{text}</div>,
    },
    {
        width: "25%",
      title: "Email",
      dataIndex: "date",
    },
    {
      width: "15%",
      title: "Địa chỉ",
      dataIndex: "name",
    },
  ];
  const suffix = (
    <SearchOutlined
      onClick={() => window.location.reload()}
      style={{
        fontSize: 20,
        color: "black",
      }}
    />
  );
  return (
    <div>
        <Table
          // className={styles.table_antd}
          columns={Colums as any}
          dataSource={data}
          bordered
          scroll={{ x: "100%", y: 300 }}
          pagination={false}
        />
        <ModalDeleteKhaoSat
          isShowModal={isShowModal}
          onClose={onClose}
          handleDeleteDB={handleDeleteDB}
        />
      </div>
  );
};
export default DLKhaoSat;
