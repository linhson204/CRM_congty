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
import style from "../delete_data/table_deleted.module.css";
import styles from "../delete_data/table.module.css";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import Link from "next/link";

const Table_Cong_Nokh = (props: any) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const data = [];
  for (let i = 1; i < 15; i++) {
    data.push({
      key: i,
      id: i,
      monneyin: 100000000000,
      monneyout: 2000000,
      name: `Trang${i}`,
      borrow: 200000,
    });
  }
  const Colums = [
    {
      width: 80,
      title: "STT",
      dataIndex: "id",
      render: (text: any) => <div>{text}</div>,
    },
    {
      width: 872,
      title: "Tên khách hàng	",
      dataIndex: "name",
      render: (text: any, record: any) => <div>{text}</div>,
    },
    {
      width: 190,
      title: "Tổng thu",
      dataIndex: "monneyin",
      render: (text: any, record: any) => (
        <div>{text.toLocaleString("vi") + " VNĐ"}</div>
      ),
    },
    {
      width: 190,
      title: "Tổng chi",
      dataIndex: "monneyout",
      render: (text: any, record: any) => (
        <div>{text.toLocaleString("vi") + " VNĐ"}</div>
      ),
    },
    {
      width: 195,
      title: "Tổng nợ",
      dataIndex: "borrow",
      render: (text: any, record: any) => (
        <div>{text.toLocaleString("vi") + " VNĐ"}</div>
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
  const handleChange = (page: number, pageSize: number) => {
    if (page != current) {
      setCurrent(page);
    }
  };
  return (
    <div className={`${styles.main__content} ${styles.flex_column}`}>
      <div style={{ display: "flex", gap: 20 }}>
        <button className={style.list_sp}>
          <Link style={{ color: "#a3a3a3" }} href="/cong-no-nha-cung-cap">
            Nhà cung cấp
          </Link>
        </button>
        <button className={style.list_gr_sp}>
          <Link
            style={{ color: "#666666", background: "#fff" }}
            href="/cong-no-khach-hang"
          >
            Khách hàng
          </Link>
        </button>
      </div>
      <div style={{ display: "block" }}>
        <div className={styles.main__control_search_delete}>
          <Input
            placeholder={`Tìm kiếm theo tên khách hàng`}
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
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            height: 40,
            justifyContent: "center",
            fontSize: 20,
          }}
        >
          <label className={styles.day}>Ngày tạo: </label>
        </div>

        <div style={{ height: 34, width: 600 }} className={style.input_loc}>
          <input
            style={{
              border: "1px solid #a2a4a8",
              height: "100%",
              borderRadius: 10,
              width: 150,
              fontSize: 18,
              textAlign: "center",
            }}
            type="date"
            name=""
            id="start_time"
          />
          <input
            style={{
              border: "1px solid #a2a4a8",
              height: "100%",
              borderRadius: 10,
              width: 150,
              fontSize: 18,
              textAlign: "center",
            }}
            type="date"
            name=""
            id="end_time"
          />
          <button className={style.loc2}>Lọc</button>
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.scrollTable}>
          <Table
            columns={Colums as any}
            dataSource={data}
            bordered
            scroll={{ x: 1300 }}
            pagination={{
              current: current,
              pageSize: pageSize,
              onChange(page, pageSize) {
                handleChange(page, pageSize);
              },
            }}
          />
        </div>
        <br />
      </div>
    </div>
  );
};
export default Table_Cong_Nokh;
