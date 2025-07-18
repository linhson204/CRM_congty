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

const LichChamSocKH = (props: Props) => {
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
  // for (let i = 1; i < 6; i++) {
  //   data.push({
  //     key: i,
  //     name: "Truong" + i,
  //     monney: 100000000000,
  //     des: "balaalaaaaaaaaaaaaaaaaaaaaaa",
  //     nameBoss: "Trang",
  //     status: "Ngừng hoạt động",
  //     date: "12-07-2023",
  //   });
  // }
  const router = useRouter();
  const items: MenuProps["items"] = [
    {
      key: "3",
      label: (
        <div
          style={{ display: "flex", fontSize: 15 }}
          rel="noopener noreferrer"
          onClick={() => {
            // router.push(`/sua-lich-cham-soc-khach-hang/${id}`);
          }}
        >
          <img src="/crm/icon-edit-black.svg" alt="" />
          &nbsp; &nbsp; <p>Chỉnh sửa</p>
        </div>
      ),
    },
  ];
  const Colums = [
    {
      width: 195,
      title: "Tên lịch",
      dataIndex: "name",
      render: (text: any, record: any) => (
        <Link href={`/chi-tiet-lich-cham-soc-khach-hang/${record.name}`}>
          {text}
        </Link>
      ),
    },
    {
      width: 276,
      title: "Người tạo",
      dataIndex: "des",
      render: (text: any, record: any) => <div>{text}</div>,
    },
    {
      width: 100,
      title: "Tổng khách hàng",
      dataIndex: "des",
      render: (text: any) => <div>{text}</div>,
    },
    {
      width: 100,
      title: "Tổng chăm sóc	",
      dataIndex: "name",
    },

    {
      width: 50,
      title: "Chức năng",
      dataIndex: "func",
      render: (text: any, record: any) => (
        <div>
          <Dropdown
            overlayStyle={{ margin: "-10px -10px" }}
            trigger={["click"]}
            menu={{ items }}
            placement="bottomLeft"
          >
            <img
              onClick={() => {
                handleSelect(record.name);
              }}
              style={{ cursor: "pointer" }}
              src="/crm/icon_1.svg"
            />
          </Dropdown>
        </div>
      ),
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
      <div className={cskh.input}>
        <div className={styles.main__control_search_delete}>
          <Input
            placeholder={`Tìm kiếm`}
            suffix={suffix}
            bordered={false}
            style={{
              width: "100%",
              fontSize: 17,
              fontWeight: 1000,
              textAlign: "center",
              height: "100%",
            }}
          />
        </div>
        <div className={cskh.themmoiks} style={{ paddingRight: 20 }}>
          <Link
            href={"/them-lich-cham-soc-khach-hang"}
            style={{ height: 40, width: 140 }}
            className={`${styless.dropbtn_add} flex_align_center`}
          >
            <img src="/crm/add.svg" />
            Thêm mới
          </Link>
        </div>
      </div>
      <div style={{ paddingTop: 20 }}>
        <Table
          // className={styles.table_antd}
          columns={Colums as any}
          dataSource={data}
          bordered
          scroll={{ x: 1500, y: 300 }}
          pagination={false}
        />
      </div>
    </div>
  );
};
export default LichChamSocKH;
