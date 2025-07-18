import React, { useEffect, useState } from "react";
import styles from "../../crm/order/order.module.css";
import { Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import OrderSelectBoxStep from "../order/order_steps/select_box_table_step";
import stylesOrderSelect from "@/components/crm/order/order.module.css";
import Link from "next/link";

interface DataType {
  key: React.Key;
  idproduct: string;
  nameproduct: string;
  donvi: string;
  soluong: number;
  dongia: number;
  tien: number;
  chietkhau: number;
  tienchietkhau: number;
  thue: string;
  tienthue: number;
  total: number;
}

interface TableDataOrderAddFilesDrops {
  setTongTien: (value: number) => void;
}

const initialData: DataType[] = [
  {
    key: "1",
    idproduct: "ABC123",
    nameproduct: "Sản phẩm A",
    donvi: "-Không Chọn-",
    soluong: 0,
    dongia: 0,
    tien: 0,
    chietkhau: 0,
    tienchietkhau: 0,
    thue: "",
    tienthue: 0,
    total: 0,
  },
  {
    key: "2",
    idproduct: "DEF456",
    nameproduct: "Sản phẩm B",
    donvi: "-Không Chọn-",
    soluong: 0,
    dongia: 0,
    tien: 0,
    chietkhau: 0,
    tienchietkhau: 0,
    thue: "",
    tienthue: 0,
    total: 0,
  },
  {
    key: "3",
    idproduct: "FGH1212",
    nameproduct: "Sản phẩm C",
    donvi: "-Không Chọn-",
    soluong: 0,
    dongia: 0,
    tien: 0,
    chietkhau: 0,
    tienchietkhau: 0,
    thue: "",
    tienthue: 0,
    total: 0,
  },
];
type Props={
  setTongTien?:any
}
const TableDataOrderAddFiles = ({ setTongTien }: Props) => {
  const [dataTable, setDataTable] = useState<DataType[]>(initialData);
  const [selectChange, setSelectChange] = useState(false);
  console.log(dataTable, "dataTable");

  const handleSoluongChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: React.Key
  ) => {
    const newValue = parseFloat(e.target.value) || 0;
    const updatedDataTable = [...dataTable];
    const updatedItemIndex = updatedDataTable.findIndex(
      (item) => item.key === key
    );
    if (updatedItemIndex !== -1) {
      const updatedItem = { ...updatedDataTable[updatedItemIndex] };
      const newDonGia = newValue === 0 ? 0 : updatedItem.tien / newValue;
      updatedItem.soluong = newValue;
      updatedItem.tien = newValue * newDonGia;
      updatedDataTable[updatedItemIndex] = updatedItem;
      setDataTable(updatedDataTable);
    }
    setSelectChange(true);
  };

  const handleDongiaChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: React.Key
  ) => {
    const newValue = parseFloat(e.target.value) || 0;
    const updatedDataTable = [...dataTable];
    const updatedItemIndex = updatedDataTable.findIndex(
      (item) => item.key === key
    );
    if (updatedItemIndex !== -1) {
      const updatedItem = { ...updatedDataTable[updatedItemIndex] };
      updatedItem.dongia = newValue;
      updatedItem.tien = newValue * updatedItem.soluong;
      updatedDataTable[updatedItemIndex] = updatedItem;
      setDataTable(updatedDataTable);
    }
    setSelectChange(true);
  };

  const handleThanhTienChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: React.Key
  ) => {
    const newValue = parseFloat(e.target.value) || 0;
    const updatedDataTable = [...dataTable];
    const updatedItemIndex = updatedDataTable.findIndex(
      (item) => item.key === key
    );
    if (updatedItemIndex !== -1) {
      const updatedItem = { ...updatedDataTable[updatedItemIndex] };
      const newDonGia =
        updatedItem.soluong === 0 ? 0 : newValue / updatedItem.soluong;
      updatedItem.dongia = newDonGia;
      updatedItem.tien = newValue;
      updatedDataTable[updatedItemIndex] = updatedItem;
      setDataTable(updatedDataTable);
    }
    setSelectChange(true);
  };

  const handleChietKhauChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: React.Key
  ) => {
    const newValue = parseFloat(e.target.value) || 0;
    const updatedDataTable = [...dataTable];
    const updatedItemIndex = updatedDataTable.findIndex(
      (item) => item.key === key
    );
    if (updatedItemIndex !== -1) {
      const updatedItem = { ...updatedDataTable[updatedItemIndex] };
      const tienchietkhau = (newValue / 100) * updatedItem.tien;
      updatedItem.chietkhau = newValue;
      updatedItem.tienchietkhau = tienchietkhau;
      updatedDataTable[updatedItemIndex] = updatedItem;
      setDataTable(updatedDataTable);
    }
    setSelectChange(true);
  };

  const calculateTienThue = (item: DataType) => {
    const thueSuat = parseFloat(item.thue) || 0;
    const tienThue = (item.tien - item.tienchietkhau) * (thueSuat / 100);
    return tienThue;
  };

  useEffect(() => {
    if (selectChange) {
      const newDataTable = dataTable.map((item) => {
        const tienThue = calculateTienThue(item);
        const total = item.tien - item.tienchietkhau + tienThue;
        return { ...item, tienthue: tienThue, total };
      });
      setDataTable(newDataTable);
      setSelectChange(false);
    }
  }, [selectChange]);

  const totalTienThue = dataTable.reduce(
    (total, item) => total + item.tienthue,
    0
  );

  const totalTienChietKhau = dataTable?.reduce(
    (total, item) => total + item.tienchietkhau,
    0
  );

  const totalSoluong = dataTable?.reduce(
    (total, item) => total + item.soluong,
    0
  );

  const totalTien = dataTable?.reduce((total, item) => total + item.tien, 0);
  const total = dataTable?.reduce((total, item) => total + item.total, 0);

  useEffect(() => {
    setTongTien(total);
  }, [selectChange]);
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
      width: 150,
      render: (_, record) => (
        <Select
          showSearch
          className="order_edit"
          style={{ width: "90%" }}
          value={record?.donvi.toString()}
          onChange={(value) => {
            const index = dataTable
              ?.slice()
              .findIndex((e) => e.key === record.key);
            const data = {
              ...dataTable[index],
              donvi: value.toString(),
            };
            const newData = dataTable.slice();
            newData.splice(index, 1, data);
            setDataTable(newData);
            // setSelectChange(true);
          }}
        >
          <Select.Option value="0">-Không chọn-</Select.Option>
          <Select.Option value="1">Cái</Select.Option>
          <Select.Option value="2">Hộp</Select.Option>
          <Select.Option value="3">Bộ</Select.Option>
        </Select>
      ),
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
        <input type="text" className={styles.inputform} value={text} />
      ),
    },
    {
      title: "Thuế suất(%)",
      dataIndex: "thue",
      key: "8",
      width: 150,
      render: (_, record) => (
        <Select
          showSearch
          className="order_edit"
          style={{ width: "90%" }}
          value={record?.thue.toString() || 0}
          onChange={(value) => {
            const index = dataTable
              ?.slice()
              .findIndex((e) => e.key === record.key);
            const data = {
              ...dataTable[index],
              thue: value.toString(),
            };
            const newData = dataTable.slice();
            newData.splice(index, 1, data);
            setDataTable(newData);
            setSelectChange(true);
          }}
        >
          <Select.Option value="0">-Không chọn-</Select.Option>
          <Select.Option value="0">0%</Select.Option>
          <Select.Option value="5">5%</Select.Option>
          <Select.Option value="8">8%</Select.Option>
          <Select.Option value="10">10%</Select.Option>
        </Select>
      ),
    },
    {
      title: "Tiền thuế (VNĐ)",
      dataIndex: "tienthue",
      key: "9",
      width: 150,
      render: (text, record) => (
        <input type="text" className={styles.inputform} value={text} readOnly />
      ),
    },
    {
      title: "Tổng tiền (VNĐ)",
      dataIndex: "total",
      key: "10",
      width: 150,
      render: (text, record) => (
        <input type="text" className={styles.inputform} value={text} readOnly />
      ),
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "11",
      width: 70,
      fixed: "right",
      render: () => (
        <Link href="#">
          <button>
            <img className={styles.icon_delete} src="/crm/h_delete_cus.svg" />
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
                    {totalTien}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={8} colSpan={1}>
                    {totalTienChietKhau}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={9} colSpan={2}>
                    {totalTienThue}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={11} colSpan={1}>
                    {total}
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

export default TableDataOrderAddFiles;
