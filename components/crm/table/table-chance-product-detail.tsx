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
    dataIndex: "index",
    key: "0",
  },
  {
    title: "Mã hàng hóa",
    width: 80,
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Tên hàng hóa",
    dataIndex: "prod_name",
    key: "1",
    width: 70,
  },
  {
    title: "Đơn vị tính",
    dataIndex: "unit_name",
    key: "2",
    width: 70,
  },
  {
    title: "Số lượng",
    dataIndex: "count",
    key: "3",
    width: 70,
  },
  {
    title: "Đơn giá (VNĐ)",
    dataIndex: "price",
    key: "4",
    width: 80,
  },
  {
    title: "Thành tiền (VNĐ)",
    dataIndex: "product_cost",
    key: "5",
    width: 100,
  },
  {
    title: "Tỷ lệ chiết khấu (%)",
    dataIndex: "discount_rate",
    key: "6",
    width: 110,
  },
  {
    title: "Tiền chiết khấu (VNĐ)",
    dataIndex: "money_discount",
    key: "7",
    width: 120,
  },
  {
    title: "Thuế suất(%)",
    dataIndex: "tax_rate",
    key: "8",
    width: 80,
  },
  {
    title: "Tiền thuế (VNĐ)",
    dataIndex: "money_tax",
    key: "9",
    width: 90,
  },
  {
    title: "Tổng tiền (VNĐ)",
    dataIndex: "total",
    key: "10",
    width: 90,
  },
];

interface TableDataProductChanceDetailDrops {
  formData: any;
}

const TableDataProductChanceDetail: React.FC<
  TableDataProductChanceDetailDrops
> = ({ formData }: any) => {
  const [isModalCancel, setIsModalCancel] = useState(false);

  return (
    <div className="custom_table" style={{ marginBottom: "20px" }}>
      <Table
        columns={columns}
        dataSource={formData?.data?.map((item, index) => {
          return {
            ...item,
            index,
          };
        })}
        bordered
        scroll={{ x: 1500, y: 1100 }}
        pagination={false}
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
                  <Table.Summary.Cell index={4}>
                    {formData?.data?.reduce((a, b) => a + b?.count, 0)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={7} colSpan={3}>
                    {formData?.data?.reduce((a, b) => a + b?.product_cost, 0)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={8} colSpan={1}>
                    {formData?.data?.reduce((a, b) => a + b?.money_discount, 0)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={9} colSpan={2}>
                    {formData?.data?.reduce((a, b) => a + b?.money_tax, 0)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={11} colSpan={1}>
                    {formData?.data?.reduce((a, b) => a + b?.total, 0)}
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
      <div style={{marginTop: '10px'}}>
        <div className="total">
          Tổng số: <b>{formData?.data?.length}</b> Hàng hóa
        </div>
      </div>
    </div>
  );
};

export default TableDataProductChanceDetail;
