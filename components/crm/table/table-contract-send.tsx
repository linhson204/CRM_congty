import React, { useState, useEffect } from "react";
import styles from "../contract/contract.module.css";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { el } from "date-fns/locale";

interface DataType {
  key: any;
  name: string;
  ep_id: any;
  positions: string;
  department: string;
  employees: any;
}

interface TableDataContracDrops {
  selectedDepartment: string;
  selectedEmployee: string;
  data: any[];
  dataFromSelectDataBox: any;
  selectedValue: any;
  dataPosition: any[];
  setSelectValue: any;
}

const TableDataContractSend: React.FC<TableDataContracDrops> = ({
  selectedDepartment,
  selectedEmployee,
  selectedValue,
  data,
  dataPosition,
  setSelectValue,
}: any) => {
  const [isSelectionReady, setIsSelectionReady] = useState(false);
  const [sendData, setSendData] = useState<any[]>([]);
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    if (selectedDepartment && selectedEmployee) {
      setIsSelectionReady(true);
    } else {
      setIsSelectionReady(false);
    }
  }, [selectedDepartment, selectedEmployee]);

  useEffect(() => {
    const newData = data.filter((item) =>
      item?.employees?.includes(selectedEmployee)
    );
    const newData2 = newData.map((el, index) => {
      return {
        department: el?.department,
        employees: selectedEmployee,
        positions: el.positions?.[0],
      };
    });

    if (newData2 && newData2[0]) {
      setSendData((prev) => {
        if (prev) {
          return [...prev, newData2[0]];
        }
      });
    }
  }, [selectedValue]);

  const handleDelete = (record: DataType) => {
    const updatedData = selectedValue?.filter((item) => item !== record.ep_id);
    setSelectValue(updatedData);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: 50,
      dataIndex: "key",
      key: "key",
    },
    {
      title: "ID nhân viên",
      width: 200,
      dataIndex: "ep_id",
      key: "ep_id",
    },
    {
      title: "Họ và tên",
      dataIndex: "employees",
      key: "employees",
      width: 150,
    },
    {
      title: "Chức vụ",
      dataIndex: "positions",
      key: "positions",
      width: 130,
    },
    {
      title: "Phòng ban",
      dataIndex: "department",
      key: "3",
      width: 100,
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      width: 120,
      render: (_, record) => (
        <button onClick={() => handleDelete(record)}>
          <img className={styles.icon_delete} src="/crm/h_delete_cus.svg" />
          Xóa
        </button>
      ),
    },
  ];

  // const newDataTble = data?.filter
  const result = data
    ? data?.filter((item) => selectedValue?.includes(item.ep_id))
    : [];

  const dataTble = result.map((el, index) => {
    return {
      department: el?.nameDeparment,
      employees: el?.ep_name,
      positions:
        dataPosition?.filter((item) => item?._id === el?.role_id)[0]?.name ||
        "Chưa cập nhật",
      key: index + 1,
      ep_id: el?.ep_id,
    };
  });

  return (
    <div className="custom_table">
      {result && result?.length > 0 && (
        <Table
          columns={columns}
          dataSource={dataTble ? dataTble : null}
          bordered
          scroll={{ x: 900, y: 1100 }}
        />
      )}
    </div>
  );
};

export default TableDataContractSend;
