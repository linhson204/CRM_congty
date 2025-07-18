import { Modal, Table, TableProps } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";

import { MInputTextAndOption, MInputTextV2 } from "../../input_select/input";
import { useFormData } from "../../context/formDataContext";
import { DefaultRecordType } from "rc-table/lib/interface";
import type { ColumnsType } from "antd/es/table";
import { axiosCRMv2 } from "@/utils/api/api_crm";
import { convertStringToTimestamp } from "@/utils/function";
type TypeListCustomer = {
  key?: React.Key;
  cus_id?: number;
  name?: string;
  phone_number?: string;
  email?: string | null;
};
export default function ModalDataCustomerKD({
  isOpenModalDataCustomerKD,
  setIsOpenModalDataCustomerKD,
}) {
  const { formData, setFormData } = useContext(useFormData);
  const [isOpenTakeListCustomer, setIsOpenTakeListCustomer] = useState(false);
  const [dataCustomer, setDataCustomer] = useState<any>([]);
  const [customerList, setCustomerList] = useState<any>([]);
  const [summaryTotal, setSummaryTotal] = useState([]);
  const [columns, setColumns] = useState<ColumnsType<any>>([
    {
      title: "Tên nhân viên",
      dataIndex: "userName",
      key: "userName",
      width: 350,
    },
  ]);
  const checkTitle = useRef({});
  const summaryTotalRef = useRef([]);
  const listCustomerColumns: ColumnsType<TypeListCustomer> = [
    { key: "cus_id", dataIndex: "cus_id", title: "ID", width: 150 },
    {
      key: "name",
      dataIndex: "name",
      title: "Họ và tên",
      width: 350,
    },
    {
      key: "phone_number",
      dataIndex: "phone_number",
      title: "Số điện thoại",
      width: 150,
    },
    {
      key: "email",
      dataIndex: "email",
      title: "Email",
      width: 250,
      render: (text: string) => {
        return text ? text : "Chưa có";
      },
    },
  ];
  const handleDataTable = (dataRes: any) => {
    const uniqueArray = [];
    const totalSummary = { userName: "Tổng" };
    dataRes?.forEach((item) => {
      const rowData = {
        userName: `${item.idQLC}. ${item.userName}`,
        idQLC: item.idQLC,
      };

      item.listFrom.forEach((itemForm, index) => {
        rowData[itemForm._id] = item.listCount[index];
        totalSummary[itemForm._id] =
          Number(totalSummary[itemForm._id] || 0) +
          Number(item.listCount[index]);
      });

      uniqueArray.push(rowData);
    });
    console.log("totalSummary", [...uniqueArray, totalSummary]);
    setDataCustomer([...uniqueArray, totalSummary]);
    const arr = [...columns]
    dataRes?.forEach((item) => {
      item.listFrom.forEach((itemFrom) => {
        if (!checkTitle[itemFrom?._id]) {
          checkTitle[itemFrom?._id] = true;
          summaryTotalRef?.current?.push({
            title: itemFrom?._id?.toUpperCase(),
            dataIndex: itemFrom?._id,
            key: itemFrom?._id,
            width: 150,
          });
          // ...prevColumns,
          if (itemFrom?._id == 'chợ tốt') itemFrom._id = 'cho_tot'
          if (itemFrom?._id) arr.push({
            title: itemFrom?._id?.toUpperCase(),
            dataIndex: itemFrom?._id,
            key: itemFrom?._id,
            width: 150,
            render(value, record, index) {
              return (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsOpenTakeListCustomer(true);
                    setFormData((pre) => ({
                      ...pre,
                      from: itemFrom?._id,
                      idQLC: record?.idQLC,
                    }));
                  }}
                >
                  {value || ""}
                </div>
              );
            },
          })
        }
      });
    });

    setColumns([...arr])

  };
  const getDulieuKhachHangKinhDoanh = async () => {
    try {
      const dataRes = await axiosCRMv2(
        "/account/ShowDulieuKhachHangKinhDoanh",
        {
          start: convertStringToTimestamp(formData.start),
          end: convertStringToTimestamp(formData.end),
        }
      );
      handleDataTable(dataRes?.listData);
    } catch (error) {
      console.log("getDulieuKhachHangKinhDoanh", error);
    }
  };
  const getTakeListCustomer = async () => {
    try {
      const resData = await axiosCRMv2("/account/takeListCustomer", {
        ...formData,
        start: convertStringToTimestamp(formData.start),
        end: convertStringToTimestamp(formData.end),
      });
      console.log("resData.listCus", resData.listCus)
      setCustomerList(resData.listCus);
    } catch (error) {
      console.log("getTakeListCustomer", error);
    }
  };
  useEffect(() => {
    formData.idQLC && getTakeListCustomer();
  }, [formData.idQLC, formData.from]);
  useEffect(() => {
    if (formData.start && formData.end) {
      getDulieuKhachHangKinhDoanh();
    }
  }, [formData.start, formData.end]);
  console.log("data", dataCustomer);
  return (
    <div>
      <Modal
        open={isOpenModalDataCustomerKD}
        className={"mdal_default email_add_mdal shared_factor"}
        title="Dữ liệu chia khách hàng"
        onCancel={() => setIsOpenModalDataCustomerKD(false)}
        footer={null}
        width={1100}
      >
        <div style={{ display: "flex" }}>
          {" "}
          <MInputTextV2
            label="Thời gian bắt đầu"
            type="datetime-local"
            name="start"
          />
          <MInputTextV2
            label={"Thời gian kết thúc"}
            type="datetime-local"
            name="end"
          />
        </div>

        <Table
          pagination={{ pageSize: 1000 }}
          bordered
          columns={columns}
          dataSource={dataCustomer}
          scroll={{ y: 500, x: 1000 }}
        />
      </Modal>

      {isOpenTakeListCustomer && <Modal
        open={isOpenTakeListCustomer}
        onCancel={() => {
          setIsOpenModalDataCustomerKD(true), setIsOpenTakeListCustomer(false);
        }}
        footer={null}
        width={950}
        title="Danh sách khách hàng"
        className={"mdal_default email_add_mdal shared_factor"}
      >
        <Table
          pagination={{ pageSize: 1000 }}
          bordered
          columns={listCustomerColumns}
          dataSource={customerList}
          scroll={{ y: 700, x: 900 }}
        />
      </Modal>}
    </div>
  );
}
