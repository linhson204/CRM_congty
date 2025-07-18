import React, { useEffect, useState } from "react";
import { Input, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/router";
import Image from "next/image";

import { TableRowSelection } from "antd/es/table/interface";
import ModalDelEmpGroup from "../modals/modal_del_group";
import { toLowerCaseNonAccentVietnamese } from "@/utils/function";

interface DataType {
  key: React.Key;
  userName: string;
  organizeDetailName: string;
  ep_id: number;
}

interface TableStaffCustomerGroupAddProps {
  dataEmp: any;
  setData: any;
  valueSelected: any;
}

const TableStaffCustomerGroupAdd: React.FC<TableStaffCustomerGroupAddProps> = ({
  dataEmp, //Toàn bộ nhân viên
  setData,
  valueSelected, //Nhân viên được chọn
}) => {
  const router = useRouter();
  const { id } = router.query;
  const [isOpenModalDel, setIsOpenModalDel] = useState(false);
  const [isOpenModalDelMulti, setIsOpenModalDelMulti] = useState(false);
  const [idDel, setIdDel] = useState();
  const [searchName, setSearchName] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");
  const [listEmpTable, setListEmpTable] = useState([]);
  const [listEmpShow, setListEmpShow] = useState<any>([]);
  const [dataRowSelect, setDataRowSelect] = useState<any>([]);
  const [selectedRow, setSelectedRow] = useState(0);

  const newArray = dataEmp?.filter((item) => {
    if (typeof valueSelected === "object") {
      return valueSelected?.includes(item.ep_id);
    } else {
      return [valueSelected]?.includes(item.ep_id);
    }
  });
  const data: any = newArray?.map((item) => {
    return {
      key: item.ep_id,
      nameDeparment: item?.nameDeparment,
      ep_name: item?.ep_name,
      item: item,
    };
  });
  useEffect(() => {
    setListEmpTable(
      data?.map((item) => ({ ...item.item, key: item.item.ep_id }))
    );
    setListEmpShow(
      data?.map((item) => ({ ...item.item, key: item.item.ep_id }))
    );
  }, [data.length]);

  useEffect(() => {
    if (!searchDepartment && !searchName) {
      setListEmpShow(listEmpTable);
      return;
    }
    setListEmpShow(
      listEmpTable?.filter(
        (emp) =>
          toLowerCaseNonAccentVietnamese(emp.organizeDetailName)?.includes(
            toLowerCaseNonAccentVietnamese(searchDepartment)
          ) &&
          (toLowerCaseNonAccentVietnamese(emp.userName)?.includes(
            toLowerCaseNonAccentVietnamese(searchName)
          ) ||
            emp.ep_id.toString()?.includes(searchName) ||
            emp.phoneTK?.includes(searchName))
      )
    );
  }, [searchDepartment, searchName]);

  function handleDelRow(item: any): void {
    setIsOpenModalDel(true);
    setIdDel(item);
  }
  const handleDelGroup = (id) => {
    const index = valueSelected?.findIndex((item) => item === id);
    const arrVal = valueSelected.slice();
    const newData = arrVal.splice(index, 1);
    setData(arrVal);
  };

  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys: any, selectedRows: string | any[]) => {
      setSelectedRow(selectedRows?.length);
      setDataRowSelect(selectedRowKeys);
    },
    onSelect: (record: any, selected: any, selectedRows: string | any[]) => {
      //   setNumberSelected(selectedRows?.length);
    },
    onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {},
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên nhân viên",
      dataIndex: "userName",
      key: "1",
      width: 200,
      render(value, record, index) {
        return (
          <span>
            {record.ep_id}. {record.userName}
          </span>
        );
      },
    },
    {
      title: "Phòng ban",
      dataIndex: "organizeDetailName",
      key: "2",
      width: 150,
    },
    {
      title: "Chức năng",
      dataIndex: "ep_id",
      key: "4",
      width: 120,
      fixed: "right",
      render: (item) => (
        <button
          style={{
            color: "#FF3333",
            display: "flex",
            alignItems: "center",
            margin: "auto",
          }}
          onClick={() => {
            handleDelRow(item);
          }}
        >
          <Image alt="img" width={26} height={26} src={"/crm/del_red.svg"} />
        </button>
      ),
    },
  ];
  const handleDelMultiRow = () => {
    const newData = valueSelected?.filter((el) => !dataRowSelect?.includes(el));
    setData(newData);
    console.log("check", newData);
  };

  return (
    <>
      <div className="custom_table product_return">
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "50px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "50px",
              }}
            >
              <p
                style={{
                  width: "250px",
                  display: "block",
                }}
              >
                Tìm kiếm phòng ban
              </p>
              <Input
                onChange={(e) => setSearchDepartment(e.target.value)}
                placeholder="Nhập tên phòng ban"
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "50px",
                margin: " 0 20px",
              }}
            >
              <p style={{ width: "240px", display: "block" }}>
                Tìm kiếm nhân viên
              </p>
              <Input
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Nhập tên, id của nhân viên"
              />
            </div>

            {selectedRow >= 2 && (
              <div style={{ marginLeft: "10px" }}>
                <button
                  style={{
                    color: "#FF3333",
                    display: "flex",
                    alignItems: "center",
                    margin: "auto",
                    width: "138px",
                    background: "#FFFF",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "3px",
                    height: "32px",
                    justifyContent: "center",
                    gap: "3px",
                  }}
                  onClick={() => {
                    setIsOpenModalDelMulti(true);
                    // handleDelRow(item);
                  }}
                >
                  <Image
                    alt="img"
                    width={26}
                    height={26}
                    src={"/crm/del_red.svg"}
                  />
                  Gỡ bỏ
                </button>
              </div>
            )}
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={listEmpShow}
          rowSelection={{ ...rowSelection }}
          bordered
          pagination={false}
          scroll={{ x: 992, y: 1100 }}
        />
      </div>
      <ModalDelEmpGroup
        isModalCancel={isOpenModalDel}
        setIsModalCancel={setIsOpenModalDel}
        content={"Bạn có chắc chắn muốn gỡ bỏ chia sẻ này không?"}
        title={"Xác nhận gỡ bỏ chia sẻ"}
        link={"#"}
        handleOk={() => {
          handleDelGroup(idDel);
        }}
      />
      <ModalDelEmpGroup
        isModalCancel={isOpenModalDelMulti}
        setIsModalCancel={setIsOpenModalDelMulti}
        content={`Bạn có chắc chắn muốn gỡ bỏ ${dataRowSelect.length} chia sẻ này không?`}
        title={"Xác nhận gỡ bỏ chia sẻ"}
        link={"#"}
        handleOk={() => {
          handleDelMultiRow();
        }}
      />
    </>
  );
};

export default TableStaffCustomerGroupAdd;
