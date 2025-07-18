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
import ModalReturn from "../delete_data/modal/modal_return";
import exportToExcel from "../ultis/export_xlxs";
import Link from "next/link";
import DropdownChucNang from "../theo-doi-thu-chi/dropdow-chucnang";
import DropdownChucNangphieuchi from "../theo-doi-thu-chi/dropdow-chucnang-phieuchi";

const Table_Phieu_Chi = (props: any) => {
  const { dataPotential, name } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalReturn, setIsShowModalReturn] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const data = [];
  // const data = dataPotential;
  const [total, setTotal] = useState<number>(data.length);
  const start = () => {
    setSelectedRowKeys([]);
  };
  const handleSelect = (id: any) => {};

  const ColumPhieuThu = [
    {
      width: 114,
      title: "Số phiếu",
      dataIndex: "myPhone",
      render: (text: any) => <div style={{ color: "#4C5BD4" }}>{text}</div>,
    },
    {
      width: 148,
      title: "Tên phiếu chi",
      dataIndex: "name",
      render: (text: any, record: any) => (
        <div style={{ overflow: "hidden" }}>
          <Link href={`/chi-tiet-phieu-chi/${record.myPhone}`}>
            <div>{text}</div>
          </Link>
        </div>
      ),
    },
    {
      width: 161,
      title: "Người tạo",
      dataIndex: "name",
      render: (text: any) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {" "}
          <div>
            <img src="/crm/user_kh.png" alt="" />
          </div>
          &nbsp;{text}
        </div>
      ),
    },
    {
      width: 109,
      title: "Ngày tạo",
      dataIndex: "day",
    },
    {
      width: 257,
      title: "Đối tượng",
      dataIndex: "name",
    },
    {
      width: 149,
      title: "Tổng tiền",
      dataIndex: "myPhone",
      render: (text: number) => (
        <div>{text.toLocaleString("vi-VN") + " " + "VNĐ"}</div>
      ),
    },
    {
      width: 149,
      title: "Đã chi",
      dataIndex: "myPhone",
      render: (text: number) => (
        <div>{text.toLocaleString("vi-VN") + " " + "VNĐ"}</div>
      ),
    },
    {
      width: 149,
      title: "Nợ",
      dataIndex: "myPhone",
      render: (text: number) => (
        <div>{text.toLocaleString("vi-VN") + " " + "VNĐ"}</div>
      ),
    },
    {
      width: 125,
      title: "Trạng thái gửi",
      dataIndex: "office",
      render: (text: number) => <div style={{ color: "green" }}>{text}</div>,
    },
    {
      width: 157,
      title: "Trạng thái",
      dataIndex: "office",
    },
    {
      width: 158,
      title: "Chức năng",
      dataIndex: "day",
      fixed: "right",
      render: (text: any, record: any) => (
        <div>
          <DropdownChucNangphieuchi record={record} />
        </div>
      ),
    },
  ];

  const onClose = () => {
    setIsShowModal(false);
    setIsShowModalReturn(false);
  };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const handleDeleteDB = () => {
    onClose();
  };
  const handleReturnDB = () => {
    onClose();
  };
  const datas = [
    {
      "Số phiếu": "1",
      "Tên phiếu thu": "2",
      "Người tạo": "3",
      "Ngày tạo": "4",
      "Đối tượng": "5",
      "Tổng tiền": "6",
      "Đã thu": "7",
      Nợ: "8",
      "Trạng thái gửi	": "9",
      "Trạng thái": "10",
    },
    // Add more sample data objects here if needed
  ];
  const handleExportToExcel = () => {
    const filename = "Danh sách phiếu thu.xlsx";
    const sheetName = "Danh sách tiềm năng";
    const columnHeaders = [
      "Số phiếu",
      "Tên phiếu thu",
      "Người tạo",
      "Ngày tạo",
      "Đối tượng",
      "Tổng tiền",
      "Đã thu",
      "Nợ",
      "Trạng thái gửi	",
      "Trạng thái",
    ];
    exportToExcel(datas, filename, sheetName, columnHeaders);
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link
          className={`${styless.dropbtn_add} flex_align_center`}
          rel="noopener noreferrer"
          href="/them-phieu-chi-nha-cung-cap"
        >
          <p style={{ color: "#f7e9c1" }}>Nhà cung cấp</p>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          className={`${styless.dropbtn_add} flex_align_center`}
          rel="noopener noreferrer"
          href="/them-phieu-chi-khach-hang"
        >
          <p style={{ color: "#f7e9c1" }}>Khách hàng</p>
        </Link>
      ),
    },
  ];
  return (
    <div className={`${styles.main__content} ${styles.flex_column}`}>
      <div>
        <button
          style={{ background: "#fff" }}
          type="button"
          onClick={handleExportToExcel}
          className={`${styless.dropbtn_add} flex_align_center ${styless.btn_excel}`}
        >
          <img style={{ color: "black" }} src="/crm/excel.svg" />
          <p style={{ color: "black" }}>Xuất excel</p>
        </button>
      </div>
      <div className={styles.g_input}>
        <div className={styles.main__control_search}>
          <div className={styles.inputne} style={{ fontSize: 0 }}>
            <Input
              placeholder={`Tìm kiếm`}
              bordered={false}
              style={{
                width: "100%",
                fontWeight: 400,
                fontFamily: "inherit",
                paddingTop: 8,
              }}
            />
          </div>
          <select className={styles.select}>
            <option value={10}>Trạng thái</option>
            <option value={"Đã duyệt"}>Đã duyệt</option>
            <option value={"Chưa duyệt"}>Chưa duyệt</option>
          </select>
          <div>
            <SearchOutlined
              className={styles.search}
              onClick={() => window.location.reload()}
            />
          </div>
        </div>

        <div className={styles.ipleft}>
          <Dropdown
            overlayStyle={{ margin: "-10px -50px" }}
            trigger={["click"]}
            menu={{ items }}
            placement="bottomLeft"
          >
            <Button
              style={{ height: 40, width: 150 }}
              className={`${styless.dropbtn_add} flex_align_center`}
            >
              <img src="/crm/add.svg" />
              Thêm mới
            </Button>
          </Dropdown>
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.scrollTable}>
          <Table
            // className={styles.table_antd}
            // rowSelection={{ ...rowSelection }}
            columns={ColumPhieuThu as any}
            dataSource={data}
            bordered
            //     scroll={{ x: 1500, y: 300 }}
            scroll={{ x: 1500, y: 300 }}
            pagination={{
              style: { display: "none" },
              current: current,
              pageSize: pageSize,
            }}
          />
        </div>
        <br />
      </div>
      <ModalDelete
        isShowModal={isShowModal}
        onClose={onClose}
        handleDeleteDB={handleDeleteDB}
      />
      <ModalReturn
        isShowModalReturn={isShowModalReturn}
        onClose={onClose}
        handleReturnDB={handleReturnDB}
      />
    </div>
  );
};
export default Table_Phieu_Chi;
