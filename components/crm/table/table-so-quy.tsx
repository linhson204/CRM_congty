import {
  Button,
  Dropdown,
  Input,
  Menu,
  MenuProps,
  Pagination,
  Select,
  Table,
} from "antd";
import styles from "../delete_data/table.module.css";
import styless from "../potential/potential.module.css";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import ModalDelete from "../delete_data/modal/modal_delete";
import ModalAddSoQuy from "./modal/ModalAddSoQuy";
import ModalChangeSoQuy from "./modal/ModalChangeSoQuy";

const Table_So_Quy = (props: any) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalAdd, setIsShowModalAdd] = useState(false);
  const [isShowModalChange, setIsShowModalChange] = useState(false);

  const handleSelect = (id: any) => {
  };
  const handleDeleteDB = () => {
    setIsShowModal(false);
  };
  const data = [
    // {
    //   key: "1",
    //   name: "Truong",
    //   monney: 100000000000,
    //   des: "balaalaaaaaaaaaaaaaaaaaaaaaa",
    //   nameBoss: "Trang",
    //   status: "Ngừng hoạt động",
    // },
    // {
    //   key: "2",
    //   name: "Truong2",
    //   monney: 100000000001,
    //   des: "balaalaaaaaaaaaaaaaaaaaaaaaa1",
    //   nameBoss: "Trang",
    //   status: "Hoạt động",
    // },
  ];
  const items: MenuProps["items"] = [
    {
      key: "3",
      label: (
        <div
          style={{ display: "flex", fontSize: 15 }}
          rel="noopener noreferrer"
          onClick={() => {
            setIsShowModalChange(true)
          }}
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
      width: 172,
      title: "Tên sổ quỹ	",
      dataIndex: "name",
      render: (text: any) => <div>{text}</div>,
    },
    {
      width: 148,
      title: "Số tiền",
      dataIndex: "monney",
      render: (text: any, record: any) => (
        <div>{text.toLocaleString("vi") + " VNĐ"}</div>
      ),
    },
    {
      width: 416,
      title: "Mô tả",
      dataIndex: "des",
      render: (text: any) => <div>{text}</div>,
    },
    {
      width: 296,
      title: "Người quản lý",
      dataIndex: "nameBoss",
    },
    {
      width: 195,
      title: "Trạng thái",
      dataIndex: "status",
    },

    {
      width: 196,
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
                handleSelect(record.myPhone);
              }}
              style={{ cursor: "pointer" }}
              src="/crm/icon_1.svg"
            />
          </Dropdown>
        </div>
      ),
    },
  ];
  const onClose = () => {
    setIsShowModalAdd(false);
    setIsShowModalChange(false);
    setIsShowModal(false);
  };
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
    <div className={`${styles.main__content} ${styles.flex_column}`}>
      <div style={{ display: "block" }}>
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
        <div style={{ paddingTop: 20 }}>
          <Button
            onClick={() => {
              setIsShowModalAdd(true);
            }}
            style={{ height: 40, width: 150 }}
            className={`${styless.dropbtn_add} flex_align_center`}
          >
            <img src="/crm/add.svg" />
            Thêm mới
          </Button>
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.scrollTable}>
          <Table
            columns={Colums as any}
            dataSource={data}
            bordered
            scroll={{ x: 1500, y: 300 }}
            pagination={false}
          />
        </div>
        <div className={styles.custom_total}>
          <span className={styles.total}>Tổng tiền:</span>
          <p>0 VND</p>
        </div>
      </div>

      <ModalAddSoQuy isShowModalAdd={isShowModalAdd} onClose={onClose} />
      <ModalChangeSoQuy
        isShowModalChange={isShowModalChange}
        onClose={onClose}
      />
      <ModalDelete
        isShowModal={isShowModal}
        onClose={onClose}
        handleDeleteDB={handleDeleteDB}
      />
    </div>
  );
};
export default Table_So_Quy;
