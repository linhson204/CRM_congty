import React, { useEffect, useState } from "react";
import styles from "../contract/contract.module.css";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import Link from "next/link";
import CancelModal from "../potential/potential_steps/cancel_modal";
import GroupSharedAFactorModal from "../customer/group_customer/group_shared_modal";
import Image from "next/image";
import DOMPurify from "dompurify";

import { useApi } from "../hooks/useApi";
import CancelModalDelGroup from "../customer/group_customer/delete_mdal_gr_cus";
import { base_url } from "../service/function";
import Cookies from "js-cookie";
import { ModalGroupCustomerShare } from "../customer/group_customer/modal_share";

interface TableDataGroupListCustomerProps {
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
  setSelectedRow: any;
  setChange: any;
  change: any;
  data?: any;
  updateData?: any;
}

const TableDataGroupListCustomer: React.FC<TableDataGroupListCustomerProps> = ({
  setSelected,
  setNumberSelected,
  setSelectedRow,
  setChange,
  change,
  data,
  updateData,
}: any) => {
  const [isOpenCancel, setIsOpenCancel] = useState(false);
  const [keyDeleted, setKeyDeleted] = useState<any>();
  const [listKeyDeleted, setListKeyDeleted] = useState([]);
  const [numberDat, setNumberData] = useState(10);
  const accessToken = Cookies.get("token_base365");
  const [groupId, setGroupId] = useState(null);
  const [empId, setEmpId] = useState(null);
  const [isOpenModalShare, setIsOpenModalShare] = useState(false);
  interface DataType {
    key: React.Key;
    gr_id: number;
    gr_name: string;
    gr_description: string;
    group_parent: number;
    company_id: number;
    dep_id: string;
    emp_id: string;
    count_customer: number;
    is_delete: number;
    created_at: number;
    updated_at: number;
    lists_child: [];
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên nhóm khách hàng",
      width: 300,
      dataIndex: "gr_name",
      key: "gr_name",
      render: (data, record) => (
        <Link
          target="_blannk"
          href={`/danh-sach-khach-hang/group_parent/${record?.gr_id}`}
        >
          <span>{data}</span>
        </Link>
      ),
    },
    {
      title: "Đối tượng được chia sẻ",
      width: 150,
      dataIndex: "group_parent",
      key: "group_parent",
      render: (data, record) => (
        // <Tooltip title={data}>
        <button
          onClick={() => {
            setGroupId(record.gr_id);
            setIsOpenModalShare(true);
          }}
        >
          <img alt="logo" width={26} height={26} src={"/crm/user_kh.png"} />
        </button>
        // </Tooltip>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "gr_description",
      key: "1",
      width: 280,
      render: (data) => {
        return (
          <div>
            {React.createElement("div", {
              dangerouslySetInnerHTML: { __html: data },
            })}
          </div>
        );
      },
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updated_at",
      key: "2",
      width: 150,
      render: (data) => {
        const date = new Date(data * 1000);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
        const year = date.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;
        return <div>{formattedDate}</div>;
      },
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "6",
      width: 120,
      // fixed:"right",
      render: (data, record: any) => (
        <>
          <Link href={`/customer/group/edit/${record.key}`}>
            <button>
              <img
                className={styles.icon_edit}
                src={"/crm/h_edit_cus.svg"}
                alt="sua"
              />
              Sửa
            </button>
          </Link>
          <button
            onClick={() => (setIsOpenCancel(true), setKeyDeleted(record.gr_id))}
          >
            <img
              className={styles.icon_delete}
              src={"/crm/del_red.svg"}
              alt="xoa"
            />
            Xóa
          </button>
        </>
      ),
    },
  ];

  // const datatable: DataType[] = [
  //   {
  //     key: index + 1,
  //     name: "John Brown sr.",
  //     age: 60,
  //     address: "New York No. 1 Lake Park",
  //     children: [
  //       {
  //         key: 11,
  //         name: "John Brown",
  //         age: 42,
  //         address: "New York No. 2 Lake Park",
  //       },
  //       {
  //         key: 12,
  //         name: "John Brown jr.",
  //         age: 30,
  //         address: "New York No. 3 Lake Park",
  //       },
  //     ],
  //   },
  //   {
  //     key: 2,
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sydney No. 1 Lake Park",
  //   },
  // ];

  const datatable: DataType[] = data?.map((item: DataType, index: number) => {
    return {
      key: item.gr_id,
      gr_name: item.gr_name,
      group_parent: item.group_parent,
      gr_description: item.gr_description,
      updated_at: item.updated_at,
      gr_id: item.gr_id,
      dep_id: item?.dep_id,
      emp_id: item?.emp_id,
      children:
        item.lists_child?.length > 0
          ? item?.lists_child.map((items: DataType) => {
              return {
                key: items.gr_id,
                gr_name: items.gr_name,
                group_parent: items.group_parent,
                gr_description: items.gr_description,
                updated_at: items.updated_at,
                gr_id: items.gr_id,
                dep_id: items?.dep_id,
                emp_id: items?.emp_id,
              };
            })
          : null,
    };
  });

  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows?.length > 0) {
        setSelected(true);
        setSelectedRow(selectedRowKeys);
      } else {
        setSelected(false);
      }
    },
    onSelect: (record, selected, selectedRows) => {
      setNumberSelected(selectedRows?.length);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {},
  };

  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={datatable}
        rowSelection={{ ...rowSelection, checkStrictly: true }}
        bordered
        scroll={{ x: 1024, y: 400 }}
        pagination={{ pageSize: numberDat }}
        className={styles.custom_table_children_row}
      />
      {datatable?.length > 0 && (
        <div className="main__footer flex_between" id="">
          <div className="show_number_item">
            <b>Hiển thị:</b>
            <select
              value={numberDat}
              className="show_item"
              onChange={(e) => setNumberData(+e.target.value)}
            >
              <option value={10}>10 bản ghi trên trang</option>
              <option value={20}>20 bản ghi trên trang</option>
              <option value={30}>30 bản ghi trên trang</option>
              <option value={40}>40 bản ghi trên trang</option>
              <option value={50}>50 bản ghi trên trang</option>
            </select>
          </div>
          <div className="total">
            Tổng số:{" "}
            <b>
              {datatable?.length > numberDat ? numberDat : datatable?.length}
            </b>{" "}
            Nhóm khách hàng
          </div>
        </div>
      )}

      <CancelModalDelGroup
        isModalCancel={isOpenCancel}
        setIsModalCancel={setIsOpenCancel}
        content={"Bạn có đồng ý xóa nhóm khách hàng này không?"}
        title={"Xác nhận xóa nhóm khách hàng"}
        link={"#"}
        keyDeleted={keyDeleted}
        updateData={updateData}
        setChange={setChange}
      />
      <ModalGroupCustomerShare
        setIsOpenModalShare={setIsOpenModalShare}
        isOpenModalShare={isOpenModalShare}
        IdGroup={groupId}
      />
      {/* <GroupSharedAFactorModal
        isModalCancel={openSharedModal}
        setIsModalCancel={setOpenSharedModal}
        empId={empId}
        depId={depId}
      /> */}
    </div>
  );
};

export default TableDataGroupListCustomer;
