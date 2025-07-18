import React, { useState } from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import stylePotential from "../potential/potential.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import PotentialSelectBox from "../potential/potential_selectt";
import CancelModal from "../potential/potential_steps/cancel_modal";

interface DataType {
  key: React.Key;
  personname: string;
  date1: string;
  date2: string;
  filename: string;
  operation: string;
}

const data: DataType[] = [];
for (let i = 0; i < 2; i++) {
  data.push({
    key: i + 1,
    filename: `Dulich.docx ${i}`,
    personname: `NguyenVanHung`,
    operation: "",
    date1: `10/07/2023`,
    date2: `17/07/2023`,
  });
}

interface TableChanceDetailShareProps {}

const TableChanceDetailShare: React.FC<TableChanceDetailShareProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: 50,
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Loại đối tượng",
      width: 200,
      dataIndex: "filename",
      key: "0",
      render: (data) => (
        // <Link href={`/customer/chance/detail/${id}/${data}`}>
        <span>{data}</span>
        // </Link>
      ),
    },
    {
      title: "Tên đối tượng",
      dataIndex: "personname",
      key: "1",
      width: 200,
    },
    {
      title: "Phòng ban",
      dataIndex: "date1",
      key: "2",
      width: 150,
    },
    {
      title: "Quyền",
      dataIndex: "date1",
      key: "2",
      width: 150,
      render: (data) => (
        <div
          className={stylePotential.wrap_select_item_custom}
          style={{ width: "100%" }}
        >
          <PotentialSelectBox value="Chon" />
        </div>
      ),
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "4",
      width: 120,
      fixed: "right",
      render: () => (
        <button
          style={{
            color: "#FF3333",
            display: "flex",
            alignItems: "center",
            margin: "auto",
          }}
          onClick={() => setIsOpenModalDel(true)}
        >
          <Image alt="img" width={26} height={26} src={"/crm/del_red.svg"} />
          Gỡ bỏ
        </button>
      ),
    },
  ];
  return (
    <>
      <div className="custom_table product_return">
        <Table
          columns={columns}
          dataSource={data}
          bordered
          scroll={{ x: 992, y: 1100 }}
        />
      </div>
      <CancelModal
        isModalCancel={isOpenModalDel}
        setIsModalCancel={setIsOpenModalDel}
        content={"Bạn có chắc chắn muốn gỡ bỏ chia sẻ này không?"}
        title={"Xác nhận gỡ bỏ chia sẻ"}
        link={"#"}
      />
    </>
  );
};

export default TableChanceDetailShare;
