import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import stylesPotential from "../potential/potential_add_files/add_file_potential.module.css";
import Image from "next/image";

interface DataType {
  key: React.Key;
  personname: string;
  date1: string;
  date2: string;
  filename: string;
  operation: string;
}

const data: DataType[] = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: i + 1,
    filename: `Dulich.docx ${i}`,
    personname: `NguyenVanHung`,
    operation: "",
    date1: `10/07/2023`,
    date2: `17/07/2023`,
  });
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 50,
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Số đơn hàng",
    width: 200,
    dataIndex: "filename",
    key: "0",
  },
  {
    title: "Ngày đặt hàng",
    dataIndex: "personname",
    key: "1",
    width: 200,
  },
  {
    title: "Mã hàng hóa",
    dataIndex: "date1",
    key: "2",
    width: 150,
  },
  {
    title: "Tên hàng hóa",
    dataIndex: "date1",
    key: "2",
    width: 150,
  },
  {
    title: "Đơn vị tính",
    dataIndex: "date2",
    key: "3",
    width: 150,
  },
  {
    title: "Số lượng",
    dataIndex: "date2",
    key: "3",
    width: 150,
  },
  {
    title: "Số lượng trả",
    dataIndex: "date2",
    key: "3",
    width: 150,
  },
  {
    title: "Đơn giá (VNĐ)",
    dataIndex: "date2",
    key: "3",
    width: 150,
  },
  {
    title: "Thành tiền (VNĐ)",
    dataIndex: "date2",
    key: "3",
    width: 150,
  },
  {
    title: "Tỷ lệ chiết khấu (%)",
    dataIndex: "date2",
    key: "3",
    width: 150,
  },
  {
    title: "Tiền chiết khấu (VNĐ)",
    dataIndex: "date2",
    key: "3",
    width: 150,
  },
  {
    title: "Thuế suất (%)",
    dataIndex: "date2",
    key: "3",
    width: 150,
  },
  {
    title: "Tiền thuế (VNĐ)	",
    dataIndex: "date2",
    key: "3",
    width: 150,
  },
  {
    title: "Tổng tiền (VNĐ)",
    dataIndex: "date2",
    key: "3",
    width: 150,
  },
  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "4",
    width: 120,
    fixed: "right",
    render: () => (
      <div style={{ color: "#FF3333", fontSize: "15px" }}>
        <Image
          width={16}
          height={16}
          alt="del"
          src="crm/customer/del_red.svg"
        />
        Xóa
      </div>
    ),
  },
];

interface TableDataProductInforUpdateProp {}

const TableDataProductInforUpdate: React.FC<
  TableDataProductInforUpdateProp
> = () => {
  return (
    <div className="custom_table product_return">
      <p className={stylesPotential.main__body__type}>Thông tin địa chỉ</p>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        pagination={false}
        scroll={{ x: 1500, y: 300 }}
        summary={() => {
          let totalBorrow = 0;
          let totalRepayment = 0;

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
                  <Table.Summary.Cell index={1} colSpan={5}>
                    <div>Tổng cộng: </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={6}>40</Table.Summary.Cell>
                  <Table.Summary.Cell index={7}>10</Table.Summary.Cell>
                  <Table.Summary.Cell index={8} colSpan={2}>
                    100.000.000
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={9} colSpan={5}>
                    10
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={15}></Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            </>
          );
        }}
      />
    </div>
  );
};

export default TableDataProductInforUpdate;
