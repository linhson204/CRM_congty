import React from "react";
import { useState } from "react";
import styles from "../order/order.module.css";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import OrderSelectBoxStep from "../order/order_steps/select_box_table_step";
import stylesOrderSelect from "@/components/crm/order/order.module.css";
import Link from "next/link";
import OrderApplyModal from "../order/add_order_action_modal/order_apply";

interface DataType {
  key: React.Key;
  idproduct: string;
  nameproduct: string;
  donvi: string;
  soluong: string;
  dongia: string;
  chietkhau: string;
  tienchietkhau: string;
  tien: string;
  thue: string;
  tienthue: string;
  total: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 30,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Mã hàng hóa",
    width: 80,
    dataIndex: "idproduct",
    key: "0",
    // render: (text) => <div style={{ background: "#EEEEEE", color: "black", textAlign: "center", }}>{text}</div>,
  },
  {
    title: "Tên hàng hóa",
    dataIndex: "nameproduct",
    key: "1",
    width: 70,
  },
  {
    title: "Đơn vị tính",
    dataIndex: "donvi",
    key: "2",
    width: 70,
  },
  {
    title: "Số lượng",
    dataIndex: "soluong",
    key: "3",
    width: 70,
  },
  {
    title: "Đơn giá (VNĐ)",
    dataIndex: "dongia",
    key: "4",
    width: 80,
  },
  {
    title: "Thành tiền (VNĐ)",
    dataIndex: "tien",
    key: "5",
    width: 100,
  },
  {
    title: "Tỷ lệ chiết khấu (%)",
    dataIndex: "chietkhau",
    key: "6",
    width: 110,
    // render: () => (
    //   <>
    //     <input type="text" className={styles.inputform} placeholder="Nhập" />
    //   </>
    // ),
  },
  {
    title: "Tiền chiết khấu (VNĐ)",
    dataIndex: "tienchietkhau",
    key: "7",
    width: 120,
    // render: () => (
    //   <>
    //     <input type="text" className={styles.inputform} placeholder="Nhập" />
    //   </>
    // ),
  },
  {
    title: "Thuế suất(%)",
    dataIndex: "thue",
    key: "8",
    width: 80,
    // render: () => (
    //   <>
    //     <input type="text" className={styles.inputform} placeholder="Nhập" />
    //   </>
    // ),
  },
  {
    title: "Tiền thuế (VNĐ)",
    dataIndex: "tienthue",
    key: "9",
    width: 90,
  },
  {
    title: "Tổng tiền (VNĐ)",
    dataIndex: "total",
    key: "10",
    width: 90,
  },
  // {
  //   title: "Chức năng",
  //   dataIndex: "operation",
  //   key: "11",
  //   width: 70,
  //   fixed:"right",
  //   render: () => (
  //     <>
  //       <Link href={"#"}>
  //         <button>
  //           <img
  //             className={styles.icon_delete}
  //             src="https://crm.timviec365.vn/assets/img/h_delete_cus.svg"
  //           />{" "}
  //           Xóa
  //         </button>
  //       </Link>
  //     </>
  //   ),
  // },
];

const data: DataType[] = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: i + 1,
    idproduct: "VT-0000",
    nameproduct: "Bánh",
    donvi: "Hộp",
    soluong: "100",
    dongia: "100.000",
    tien: "100.000",
    chietkhau: "100.000",
    tienchietkhau: "100.000",
    thue: "10",
    tienthue: "1.000.000",
    total: "101.000.000",
  });
}

interface TableDataOrderDetailDrops {
  setSelected: (value: boolean) => void;
}

const TableDataOrderDetail: React.FC<TableDataOrderDetailDrops> = ({}: any) => {
  const [isModalCancel, setIsModalCancel] = useState(false);
  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 1500, y: 1100 }}
        summary={() => {
          // let totalBorrow = 0;
          // let totalRepayment = 0;

          //   pageData.forEach(({ borrow, repayment }) => {
          //     totalBorrow += borrow;
          //     totalRepayment += repayment;
          //   });

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
                  <Table.Summary.Cell index={4}>1</Table.Summary.Cell>
                  <Table.Summary.Cell index={7} colSpan={3}>
                    100.000.000
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={8} colSpan={1}>
                    100.000.000
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={9} colSpan={2}>
                    100.000.000
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={11} colSpan={1}>
                    100.000.000
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            </>
          );
        }}
      />
      {
        <OrderApplyModal
          isModalCancel={isModalCancel}
          setIsModalCancel={setIsModalCancel}
          title="Áp dụng cho hàng hóa"
          // content="Hello"
        />
      }
      <div className="main__footer flex_between" id="">
        <div className="total">
          Tổng số: <b>{data.length}</b> Hàng hóa
        </div>
      </div>
    </div>
  );
};

export default TableDataOrderDetail;
