import { SearchOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, MenuProps, Table } from "antd";
import React, { useState } from "react";
import styles from "../../delete_data/table.module.css";
import styless from "../../potential/potential2.module.css";
import cskh from "../csks.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import ModalDeleteLichhen from "../modal/modaldellichhen";
import ModalThemMoiLichhen from "../modal/modalthemmoilichhen";
type Props = {};

const LichHen = (props: Props) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [id, setId] = useState();
  const onClose = () => {
    setIsShowModalAdd(false);
    setIsShowModal(false);
  };
  const handleSelect = (id: any) => {
    setId(id);
  };
  const handleDeleteDB = () => {
    setIsShowModal(false);
  };
  const handleAddDB = () => {
    setIsShowModalAdd(false);
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
          //   onClick={() => {
          //     router.push(`/chinh-sua-khao-sat/${id}`);
          //   }}
        >
          <img src="/crm/icon-edit-black.svg" alt="" />
          &nbsp; &nbsp; <p>Chỉnh sửa</p>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div
          style={{ display: "flex", fontSize: 15 }}
          rel="noopener noreferrer"
          onClick={() => {
            setIsShowModal(true);
          }}
        >
          <img src="/crm/icon-delete-black.svg" alt="" />
          &nbsp; &nbsp; <p>Xóa</p>
        </div>
      ),
    },
  ];
  const Colums = [
    {
      width: 60,
      title: "STT",
      dataIndex: "name",
      render: (text: any, record: any) => <Link href={``}>{text}</Link>,
    },
    {
      width: 310,
      title: "Tên lịch hẹn",
      dataIndex: "des",
      render: (text: any, record: any) => <Link href={``}>{text}</Link>,
    },
    {
      width: 310,
      title: "Khách hàng",
      dataIndex: "des",
      render: (text: any) => <div>{text}</div>,
    },
    {
      width: 152,
      title: "Trạng thái",
      dataIndex: "date",
    },
    {
      width: 213,
      title: "Nhân viên thực hiện",
      dataIndex: "name",
    },
    {
      width: 250,
      title: "Thời gian thực hiện",
      dataIndex: "name",
    },

    {
      width: 150,
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
        <div className={cskh.themmoiks}>
          <Button
            onClick={() => setIsShowModalAdd(true)}
            style={{ height: 40, width: 150 }}
            className={`${styless.dropbtn_add} flex_align_center`}
          >
            <img src="/crm/add.svg" />
            Thêm mới
          </Button>
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
        <ModalDeleteLichhen
          isShowModal={isShowModal}
          onClose={onClose}
          handleDeleteDB={handleDeleteDB}
        />
        <ModalThemMoiLichhen
          isShowModalAdd={isShowModalAdd}
          onClose={onClose}
          handleAddDB={handleAddDB}
        />
      </div>
    </div>
  );
};
export default LichHen;
