import React, { useEffect, useState } from "react";
import styles from "../order/order.module.css";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import OrderSelectBoxStep from "../order/order_steps/select_box_table_step";
import stylesOrderSelect from "@/components/crm/order/order.module.css";
import Link from "next/link";
import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.min.js";

interface DataType {
  key: React.Key;
  idproduct: string;
  nameproduct: string;
  donvi: string;
  soluong: number;
  dongia: number;
  chietkhau: number;
  tienchietkhau: number;
  tien: number;
  thue: string;
  tienthue: number;
  total: number;
}

interface TableDataOrderEditFilesDrops {
  setSelected: (value: boolean) => void;
  setTongTien: (value: number) => void;
}

const initialData: DataType[] = [
  {
    key: "1",
    idproduct: "ABC123",
    nameproduct: "Sản phẩm A",
    donvi: "Cái",
    soluong: 0,
    dongia: 0,
    tien: 0,
    chietkhau: 0,
    tienchietkhau: 0,
    thue: "0",
    tienthue: 0,
    total: 0,
  },
  {
    key: "2",
    idproduct: "DEF456",
    nameproduct: "Sản phẩm B",
    donvi: "Hộp",
    soluong: 0,
    dongia: 0,
    tien: 0,
    chietkhau: 0,
    tienchietkhau: 0,
    thue: "0",
    tienthue: 0,
    total: 0,
  },
  {
    key: "3",
    idproduct: "FGH1212",
    nameproduct: "Sản phẩm C",
    donvi: "Hộp",
    soluong: 0,
    dongia: 0,
    tien: 0,
    chietkhau: 0,
    tienchietkhau: 0,
    thue: "0",
    tienthue: 0,
    total: 0,
  },
];

const TableDataOrderEditFiles: React.FC<TableDataOrderEditFilesDrops> = ({
  setTongTien,
}: any) => {
  const [dataTable, setDataTable] = useState<DataType[]>(initialData);
  const [thanhTien, setThanhTien] = useState<number>(0);
  const [donGia, setDonGia] = useState<number>(0);
  const [totalTienChietKhau, setTotalTienChietKhau] = useState<number>(0);
  const [totalSoluong, setTotalSoluong] = useState<number>(0);
  const [selectedTaxRate, setSelectedTaxRate] = useState<string>("");
  const [taxAmount, setTaxAmount] = useState<number>(0);
  const [selectdRecord, setSelectdRecord] = useState<number | null>(null);
  const [totalTien, setTotalTien] = useState<number>(0);

  useEffect(() => {
    $(".order_edit").select2();
    $(".order_edit").on("select2:opening", function (e) {
      const record = JSON.parse(e.target.getAttribute("data-record"));
      setSelectdRecord(record.key);
    });
    $(".order_edit").on("change", (e: any) => {
      setSelectedTaxRate(e.target.value);
    });
  }, []);

  const handleSoluongChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: React.Key
  ) => {
    const newValue = parseFloat(e.target.value) || 0;
    const updatedData = dataTable.map((item) => {
      if (item.key === key) {
        const newDonGia = newValue === 0 ? 0 : item.tien / newValue;
        return { ...item, soluong: newValue, tien: newValue * item.dongia };
      }
      return item;
    });
    setDataTable(updatedData);
    const totalTien = updatedData.reduce((total, item) => total + item.tien, 0);
    const totalSoluong = updatedData.reduce(
      (total, item) => total + item.soluong,
      0
    );
    setDonGia(totalSoluong === 0 ? 0 : totalTien / totalSoluong);
    setThanhTien(totalTien);
    setTotalSoluong(totalSoluong);
  };

  const handleDongiaChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: React.Key
  ) => {
    const newValue = parseFloat(e.target.value) || 0;
    const updatedData = dataTable.map((item) => {
      if (item.key === key) {
        const newTien = newValue * item.soluong;
        return { ...item, dongia: newValue, tien: newTien };
      }
      return item;
    });
    setDataTable(updatedData);
    const totalTien = updatedData.reduce((total, item) => total + item.tien, 0);
    const totalSoluong = updatedData.reduce(
      (total, item) => total + item.soluong,
      0
    );
    setDonGia(totalSoluong === 0 ? 0 : totalTien / totalSoluong);
    setThanhTien(totalTien);
  };

  const handleThanhTienChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: React.Key
  ) => {
    const newValue = parseFloat(e.target.value) || 0;
    const updatedData = dataTable.map((item) => {
      if (item.key === key) {
        const newDonGia = item.soluong === 0 ? 0 : newValue / item.soluong;
        return { ...item, dongia: newDonGia, tien: newValue };
      }
      return item;
    });
    setDataTable(updatedData);
    const totalTien = updatedData.reduce((total, item) => total + item.tien, 0);
    const totalSoluong = updatedData.reduce(
      (total, item) => total + item.soluong,
      0
    );
    setDonGia(totalSoluong === 0 ? 0 : totalTien / totalSoluong);
    setThanhTien(totalTien);
  };

  const handleChietKhauChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: React.Key
  ) => {
    const newValue = parseFloat(e.target.value) || 0;
    const updatedData = dataTable.map((item) => {
      if (item.key === key) {
        const tienchietkhau = (newValue / 100) * item.tien;
        return { ...item, chietkhau: newValue, tienchietkhau };
      }
      return item;
    });
    setDataTable(updatedData);

    const totalTienChietKhau = updatedData.reduce(
      (total, item) => total + item.tienchietkhau,
      0
    );
    setTotalTienChietKhau(totalTienChietKhau);
  };

  const handleTienChietKhauChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: React.Key
  ) => {
    const newValue = parseFloat(e.target.value) || 0;
    const updatedData = dataTable.map((item) => {
      if (item.key === key) {
        const newChietKhau = (newValue / item.tien) * 100;
        return {
          ...item,
          tienchietkhau: newValue,
          chietkhau: newChietKhau,
        };
      }
      return item;
    });
    setDataTable(updatedData);

    const totalTienChietKhau = updatedData.reduce(
      (total, item) => total + item.tienchietkhau,
      0
    );
    setTotalTienChietKhau(totalTienChietKhau);
  };

  const calculateTienThue = (
    thanhTien: number,
    totalTienChietKhau: number,
    selectedTaxRate: string
  ): number => {
    const numericThanhTien = Number(thanhTien);
    const numericTotalTienChietKhau = Number(totalTienChietKhau);
    const numericSelectedTaxRate = Number(selectedTaxRate);
    return (
      ((numericThanhTien - numericTotalTienChietKhau) *
        numericSelectedTaxRate) /
      100
    );
  };

  const calculateTotalTien = (
    thanhTien: number,
    totalTienChietKhau: number,
    selectedTaxRate: string
  ): void => {
    const numericThanhTien = Number(thanhTien);
    const numericTotalTienChietKhau = Number(totalTienChietKhau);
    const numericSelectedTaxRate = Number(selectedTaxRate);

    const newTotalTien =
      numericThanhTien -
      numericTotalTienChietKhau +
      ((numericThanhTien - numericTotalTienChietKhau) *
        numericSelectedTaxRate) /
        100;

    setTotalTien(isNaN(newTotalTien) ? 0 : newTotalTien);
    setTongTien(isNaN(newTotalTien) ? 0 : newTotalTien);
  };

  useEffect(() => {
    calculateTotalTien(thanhTien, totalTienChietKhau, selectedTaxRate);
    calculateTienThue(thanhTien, totalTienChietKhau, selectedTaxRate);
  }, [thanhTien, totalTienChietKhau, selectedTaxRate]);

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: 60,
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Mã hàng hóa",
      width: 120,
      dataIndex: "idproduct",
      key: "0",
    },
    {
      title: "Tên hàng hóa",
      dataIndex: "nameproduct",
      key: "1",
      width: 120,
      render: () => (
        <div
          style={{ padding: "5px", paddingLeft: "11px" }}
          className={stylesOrderSelect.wrap_select}
        >
          <OrderSelectBoxStep value="Tất cả" placeholder="Tất cả" />
        </div>
      ),
    },
    {
      title: "Đơn vị tính",
      dataIndex: "donvi",
      key: "2",
      width: 100,
    },
    {
      title: "Số lượng",
      dataIndex: "soluong",
      key: "3",
      width: 100,
      render: (text, record) => (
        <input
          type="text"
          className={styles.inputform}
          value={text}
          onChange={(e) => handleSoluongChange(e, record.key)}
        />
      ),
    },
    {
      title: "Đơn giá (VNĐ)",
      dataIndex: "dongia",
      key: "4",
      width: 150,
      render: (text, record) => (
        <input
          type="text"
          className={styles.inputform}
          value={text}
          onChange={(e) => handleDongiaChange(e, record.key)}
        />
      ),
    },
    {
      title: "Thành tiền (VNĐ)",
      dataIndex: "tien",
      key: "5",
      width: 150,
      render: (text, record) => (
        <input
          type="text"
          className={styles.inputform}
          value={text}
          onChange={(e) => handleThanhTienChange(e, record.key)}
        />
      ),
    },
    {
      title: "Tỷ lệ chiết khấu (%)",
      dataIndex: "chietkhau",
      key: "6",
      width: 150,
      render: (text, record) => (
        <input
          type="text"
          className={styles.inputform}
          value={text}
          onChange={(e) => handleChietKhauChange(e, record.key)}
        />
      ),
    },
    {
      title: "Tiền chiết khấu (VNĐ)",
      dataIndex: "tienchietkhau",
      key: "7",
      width: 180,
      render: (text, record) => (
        <input
          type="text"
          className={styles.inputform}
          value={text}
          onChange={(e) => handleTienChietKhauChange(e, record.key)}
        />
      ),
    },
    {
      title: "Thuế suất(%)",
      dataIndex: "thue",
      key: "8",
      width: 150,
      render: (_, record) => (
        <select
          className="order_edit"
          name="state"
          style={{ width: "100%" }}
          value={record.key === selectdRecord ? selectedTaxRate : ""}
          data-record={JSON.stringify(record)} // Lưu bản ghi vào data attribute
          onChange={(e) => setSelectedTaxRate(e.target.value)}
        >
          <option value="">-Không chọn-</option>
          <option value="0">0%</option>
          <option value="5">5%</option>
          <option value="8">8%</option>
          <option value="10">10%</option>
        </select>
      ),
    },
    {
      title: "Tiền thuế (VNĐ)",
      dataIndex: "tienthue",
      key: "9",
      width: 150,
      render: (text, record) => (
        <input
          type="text"
          className={styles.inputform}
          value={
            // dataTable?.map((item) => item)
            ((thanhTien - totalTienChietKhau) * Number(selectedTaxRate)) / 100
          }
        />
      ),
    },
    {
      title: "Tổng tiền (VNĐ)",
      dataIndex: "total",
      key: "10",
      width: 150,
      render: (text) => (
        <input disabled className={styles.inputform} value={totalTien} />
      ),
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "11",
      width: 70,
      fixed: "right",
      render: () => (
        <Link href={"#"}>
          <button>
            <img className={styles.icon_delete} src="/crm/h_delete_cus.svg" />{" "}
            Xóa
          </button>
        </Link>
      ),
    },
  ];

  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={dataTable}
        bordered
        scroll={{ x: 1500, y: 1100 }}
        summary={() => {
          return (
            <>
              <Table.Summary fixed="bottom">
                <Table.Summary.Row
                  style={{
                    background: "#EEEEEE",
                    borderInlineEnd: "1px solid #ccc",
                  }}
                >
                  <Table.Summary.Cell index={0}>
                    <div style={{ background: "white" }}></div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1} colSpan={3}>
                    <div style={{ background: "#EEEEEE", textAlign: "left" }}>
                      &nbsp;
                      <b>Tổng cộng:</b>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={4}>
                    {totalSoluong}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={7} colSpan={3}>
                    {thanhTien}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={8} colSpan={1}>
                    {totalTienChietKhau}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={9} colSpan={2}>
                    {((thanhTien - totalTienChietKhau) *
                      Number(selectedTaxRate)) /
                      100}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={11} colSpan={1}>
                    {totalTien}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell
                    index={12}
                    colSpan={1}
                  ></Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>

              <Table.Summary fixed="bottom">
                <Table.Summary.Row
                  style={{
                    background: "white",
                    borderInlineEnd: "1px solid #ccc",
                  }}
                >
                  <Table.Summary.Cell index={0}>
                    <div
                      style={{
                        background: "white",
                        borderInlineEnd: "1px solid #ccc",
                      }}
                    ></div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1} colSpan={1}>
                    <div style={{ textAlign: "left" }}>
                      <button type="button">
                        <div style={{ background: "white", color: "#4C5BD4" }}>
                          &nbsp;
                          <i className="bi bi-plus-circle-fill"></i>
                          &nbsp;<b>Thêm dòng</b>
                        </div>
                      </button>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1} colSpan={10}>
                    <div style={{ textAlign: "left" }}>
                      <button type="button">
                        <div style={{ background: "white", color: "#4C5BD4" }}>
                          &nbsp;
                          <i className="bi bi-plus-circle-fill"></i>
                          &nbsp;<b>Thêm dòng</b>
                        </div>
                      </button>
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1} colSpan={1}>
                    <div style={{ textAlign: "left" }}>
                      <button type="button">
                        <div style={{ background: "white", color: "#4C5BD4" }}>
                          &nbsp;
                          <i className="bi bi-plus-circle-fill"></i>
                          &nbsp;<b>Thêm dòng</b>
                        </div>
                      </button>
                    </div>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            </>
          );
        }}
      />
    </div>
  );
};

export default TableDataOrderEditFiles;
