import React, { useState } from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import stylePotential from "../potential/potential.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import PotentialSelectBox from "../potential/potential_selectt";
import CancelModal from "../potential/potential_steps/cancel_modal";
import { TableRowSelection } from "antd/es/table/interface";
import { data } from "./table-bill";

interface DataType {
  key: React.Key;
  userName: string;
  nameDeparment: string;
}

interface TableSharedFactorProps {
  data: any;
  empIdArr: any;
}

const TableSharedFactor: React.FC<TableSharedFactorProps> = ({
  data,
  empIdArr,
}: any) => {
  const router = useRouter();
  const { id } = router.query;
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);

  const dataFilter = data?.data?.items?.filter((item) =>
    empIdArr.includes(item?.ep_id)
  );

  const dataTble: DataType[] = dataFilter?.map((item,index) => {
    return {
      key: index,
      nameDeparment: item?.nameDeparment,
      userName: item?.ep_name,
      item: item,
    };
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên nhân viên",
      dataIndex: "userName",
      key: "1",
      width: 200,
    },
    {
      title: "Phòng ban",
      dataIndex: "nameDeparment",
      key: "2",
      width: 150,
    },
  ];

  return (
    <>
      <div key={"5"} className="custom_table product_return">
        <Table
          columns={columns}
          dataSource={dataTble}
          bordered
          pagination={false}
          // scroll={{ x: 992, y: 1100 }}
        />
      </div>
    </>
  );
};

export default TableSharedFactor;
