import { SearchOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, MenuProps, Table } from "antd";
import React, { useState } from "react";
import style from "./khao-sat.module.css";
import styles from "../delete_data/table.module.css";
import styless from "../potential/potential2.module.css";
import cskh from "./csks.module.css";
import ModalDeleteKhaoSat from "./modal/modaldelkhaosat";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
type Props = {};

const KhaoSat = (props: Props) => {
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
      key: "4",
      label: (
        <div
          style={{ display: "flex" }}
          rel="noopener noreferrer"
          onClick={() => {
            setIsShowModal(true);
          }}
        >
          <Image
            width={18}
            height={18}
            src="/crm/icon-delete-black.svg"
            alt="hungha365.com"
          />
          &nbsp; &nbsp; <p>Xóa</p>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          style={{ display: "flex" }}
          rel="noopener noreferrer"
          onClick={() => {
            router.push(`/chinh-sua-khao-sat/${id}`);
          }}
        >
          <Image
            src="/crm/icon-edit-black.svg"
            alt="hungha365.com"
            width={18}
            height={18}
          />
          &nbsp; &nbsp; <p>Chỉnh sửa</p>
        </div>
      ),
    },
  ];
  const Colums = [
    {
      width: 195,
      title: "Tên khảo sát",
      dataIndex: "name",
      render: (text: any, record: any) => (
        <Link href={`/chi-tiet-khao-sat/${record.name}`}>{text}</Link>
      ),
    },
    {
      width: 276,
      title: "Url",
      dataIndex: "des",
      render: (text: any, record: any) => (
        <Link href={`/khao-sat/${record.name}-ks`}>{text}</Link>
      ),
    },
    {
      width: 276,
      title: "Mô tả",
      dataIndex: "des",
      render: (text: any) => <div>{text}</div>,
    },
    {
      width: 152,
      title: "Thời gian tạo",
      dataIndex: "date",
    },
    {
      width: 185,
      title: "Đối tượng thực hiện",
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
            <Image
              onClick={() => {
                handleSelect(record.name);
              }}
              style={{ cursor: "pointer" }}
              width={15}
              height={15}
              alt="logo"
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
        fontSize: 18,
        color: "black",
        paddingBottom: 7,
      }}
    />
  );
  return (
    <div>
      <div className={`${style.select_item} ${style.select_item_time}`}>
        <label htmlFor="" className="">
          Thời gian tạo:
        </label>
        <div className={style.input_item_time}>
          <input type="date" name="" id="start_time" /> -
          <input type="date" name="" id="end_time" />
        </div>
      </div>

      <div className={cskh.input}>
        <div className={styles.main__control_search_delete}>
          <Input
            placeholder={`Tìm kiếm`}
            suffix={suffix}
            bordered={false}
            style={{
              width: "100%",
              fontSize: 10,
              fontWeight: 1000,
              textAlign: "center",
              height: "100%",
              paddingLeft: 20,
              paddingTop: 10,
            }}
          />
        </div>
        <div className={cskh.themmoiks}>
          <Link
            href={"/them-khao-sat"}
            style={{ height: 40, width: 150 }}
            className={`${styless.dropbtn_add} flex_align_center`}
          >
            <Image width={15} height={15} alt="logo" src={"/crm/add.svg"} />
            <div style={{ fontSize: 18 }}>Thêm mới</div>
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
        <ModalDeleteKhaoSat
          isShowModal={isShowModal}
          onClose={onClose}
          handleDeleteDB={handleDeleteDB}
        />
      </div>
    </div>
  );
};
export default KhaoSat;
