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
import styles from "../delete_data/table_deleted.module.css";
import { PlusCircleFilled, SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useState } from "react";
const Table_San_Pham = (props: any) => {
  const [idSanPham, setIdSanPham] = useState();
  const data = [];
  for (let i = 1; i < 5; i++) {
    data.push({
      key: i,
      id: i,
      monneyin: 100000000000,
      monneyout: 2000000,
      name: `Trang${i}`,
      borrow: 200000,
    });
  }
  const handleSelect = (id: any) => {
    setIdSanPham(id);
  };
  const items: MenuProps["items"] = [
    {
      key: "3",
      label: (
        <Link
          href={`/chinh-sua-san-pham/${idSanPham}`}
          style={{ display: "flex", fontSize: 15 }}
          rel="noopener noreferrer"
          // onClick={() => { setIsShowModalChange(true), }}
        >
          <img src="/crm/icon-edit-black.svg" alt="" />
          &nbsp; &nbsp; <p>Chỉnh sửa</p>
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <div
          style={{ display: "flex", fontSize: 15 }}
          rel="noopener noreferrer"
          // onClick={() => { setIsShowModal(true) }}
        >
          <img src="/crm/icon-delete-black.svg" alt="" />
          &nbsp; &nbsp; <p>Xóa</p>
        </div>
      ),
    },
  ];
  const Colums = [
    {
      width: 148,
      title: "Mã sản phẩm",
      dataIndex: "id",
      render: (text: any) => <div>{text}</div>,
    },
    {
      width: 211,
      title: "Tên sản phẩm",
      dataIndex: "name",
      render: (text: any, record: any) => (
        <Link href={`/chi-tiet-san-pham/${record.id}`}>{text}</Link>
      ),
    },
    {
      width: 170,
      title: "Nhóm sản phẩm",
      dataIndex: "name",
      render: (text: any, record: any) => (
        <div>{text.toLocaleString("vi") + " VNĐ"}</div>
      ),
    },
    {
      width: 157,
      title: "Tồn kho",
      dataIndex: "name",
      render: (text: any, record: any) => <div>{text}</div>,
    },
    {
      width: 158,
      title: "Giá nhập	",
      dataIndex: "borrow",
      render: (text: any, record: any) => (
        <div>{text.toLocaleString("vi") + " VNĐ"}</div>
      ),
    },
    {
      width: 158,
      title: "Giá bán lẻ	",
      dataIndex: "borrow",
      render: (text: any, record: any) => (
        <div>{text.toLocaleString("vi") + " VNĐ"}</div>
      ),
    },
    {
      width: 158,
      title: "Trạng thái buôn	",
      dataIndex: "name",
      render: (text: any, record: any) => <div>{text}</div>,
    },
    {
      width: 158,
      title: "Trạng thái	",
      dataIndex: "borrow",
      render: (text: any, record: any) => <div>{text}</div>,
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
                handleSelect(record.id);
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
    <div className={`${styles.main__content} ${styles.flex_column}`}>
      <div className={styles.inputSP2}>
        <div className={styles.ipSearch}>
          <Input
            placeholder={`Tìm kiếm`}
            className={styles.main__control_search}
            suffix={suffix}
            bordered={false}
          />
        </div>
        <div className={styles.group_button_sp}>
          <div className={styles.ip1}>
            <button className={styles.list_sp}>
              <Link href="/san-pham" style={{ color: "#a3a3a3" }}>
                Danh sách sản phẩm
              </Link>
            </button>
          </div>
          <div className={styles.ip1}>
            <button className={styles.list_gr_sp}>
              <Link
                href="/nhom-san-pham"
                style={{ color: "#666666", background: "#fff" }}
              >
                Danh sách nhóm sản phẩm
              </Link>
            </button>
          </div>
        </div>
      </div>
      <Link href={"/them-moi-san-pham"} style={{ width: "10%" }}>
        <Button
          style={{
            color: "#fff",
            background: "#4C5BD4",
            borderRadius: 10,
            height: 40,
            width: "150px",
            fontSize: 18,
          }}
        >
          <PlusCircleFilled style={{ color: "#fff" }}></PlusCircleFilled>Thêm
          mới
        </Button>
      </Link>

      <div className={styles.table}>
        <div className={styles.scrollTable}>
          <Table
            // className={styles.table_antd}
            columns={Colums as any}
            dataSource={data}
            bordered
            //     scroll={{ x: 1500, y: 300 }}
            scroll={{ x: 1300 }}
            pagination={false}
          />
        </div>
        <br />
      </div>
    </div>
  );
};
export default Table_San_Pham;
