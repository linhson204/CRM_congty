import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import { axiosCRM } from "@/utils/api/api_crm";
import { useRouter } from "next/router";
import { renderPosition } from "@/utils/function";
import {
  renderBusinessType,
  renderPotentialResource,
  renderSector,
  renderVocative,
} from "@/utils/listOption";
import { renderCity, renderDistrict } from "@/constants/address-constant";

interface DataType {
  key: React.Key;
  name: string;
  salutation: string;
  address: string;
  operation: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Mã tiềm năng",
    width: 120,
    dataIndex: "cus_id",
    key: "cus_id",
  },
  {
    title: "Xưng hô",
    width: 150,
    dataIndex: "vocative",
    key: "vocative",
  },
  {
    title: "Họ và tên",
    dataIndex: "fullName",
    key: "fullName",
    width: 300,
    // render: (data) => (
    //   // <Tooltip title={data}>
    //   <Link href={`/potential/detail/${data}`}>
    //     <span>{data}</span>
    //   </Link>
    //   // </Tooltip>
    // ),
  },
  {
    title: "Chức danh",
    dataIndex: "pos_id",
    key: "pos_id",
    width: 200,
  },
  {
    title: "Điện thoại cá nhân",
    dataIndex: "private_phone",
    key: "private_phone",
    width: 150,
  },
  {
    title: "Email cá nhân",
    dataIndex: "private_email",
    key: "private_email",
    width: 200,
  },
  {
    title: "Điện thoại cơ quan",
    dataIndex: "office_phone",
    key: "office_phone",
    width: 200,
  },
  {
    title: "Email cơ quan",
    dataIndex: "office_email",
    key: "office_email",
    width: 200,
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
    width: 200,
  },
  {
    title: "Tỉnh/Thành phố",
    dataIndex: "cit_id",
    key: "cit_id",
    width: 150,
  },
  {
    title: "Quận/Huyện",
    dataIndex: "district_id",
    key: "district_id",
    width: 150,
  },
  {
    title: "Phường/Xã",
    dataIndex: "ward",
    key: "ward",
    width: 150,
  },
  {
    title: "Nguồn gốc",
    dataIndex: "resource",
    key: "resource",
    width: 150,
  },
  {
    title: "Loại hình",
    dataIndex: "business_type",
    key: "business_type",
    width: 150,
  },
  {
    title: "Lĩnh vực",
    dataIndex: "sector",
    key: "sector",
    width: 150,
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
    width: 150,
  },
  {
    title: "Người tạo",
    dataIndex: "user_create_name",
    key: "user_create",
    width: 200,
  },
];

interface TableDataPotentialProps {
  setSelected?: (value: boolean) => void;
  setNumberSelected?: any;
  setRowDataSelected?: any;
  formData?: any;
  setFormData?: any;
}

const TableDataPotential: React.FC<TableDataPotentialProps> = ({
  setSelected,
  setNumberSelected,
  setRowDataSelected,
  formData = null,
  setFormData = null,
}) => {
  const router = useRouter();
  const [listPotential, setListPotential] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setFormData({ ...formData, pageSize: pageSize, page: currentPage });
  }, [currentPage, pageSize]);
  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows?.length >= 1) {
        setSelected(true);
      } else {
        setSelected(false);
      }
    },
    onSelect: (record, selected, selectedRows) => {
      setNumberSelected(selectedRows?.length);
      setRowDataSelected(selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      setNumberSelected(selectedRows?.length);
      setRowDataSelected(selectedRows);
    },
  };
  useEffect(() => {
    axiosCRM
      .post("/potential/listPotential", {
        ...formData,
        pageSize: pageSize,
        page: currentPage,
      })
      .then((res) => {
        handleDataTable(res.data.data.data);
        setTotal(res.data.data.total);
      })
      .catch((err) => console.log("error", err));
  }, [, pageSize, currentPage, formData.recall]);
  const handleDataTable = (datas) => {
    setListPotential(
      datas?.map((data) => ({
        ...data,
        key: data.potential_id,
        vocative: renderVocative(data.vocative),
        fullName: (
          <button
            style={{ color: "blue", fontSize: "15px" }}
            onClick={() => router.push(`/potential/detail/${data.cus_id}`)}
          >
            {data.stand_name} {data.name}
          </button>
        ),
        pos_id: renderPosition(data.pos_id),
        cit_id: renderCity(data.cit_id),
        district_id: renderDistrict(data.district_id),
        resource: renderPotentialResource(data.resource),
        business_type: renderBusinessType(data.business_type),
        sector:
          data.sector &&
          data.sector
            .split(",")
            .map(
              (item, index) =>
                `${renderSector(item)}${
                  index < data.sector.split(",").length - 1 ? `, ` : ""
                }`
            ),
      }))
    );
  };
  return (
    <div className="custom_table">
      <Table
        columns={columns}
        dataSource={listPotential}
        rowSelection={{ ...rowSelection }}
        bordered
        scroll={{ x: 1500, y: 500 }}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          showSizeChanger: true,

          onChange: (page, pageSize) => {
            setCurrentPage(page);
          },
        }}
      />
      <div style={{ marginTop: "5px", width: "55%" }} className="flex_between">
        <div className="show_number_item">
          <b>Hiển thị:</b>
          <select
            className="show_item"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={10}>10 bản ghi trên trang</option>
            <option value={20}>20 bản ghi trên trang</option>
            <option value={30}>30 bản ghi trên trang</option>
            <option value={40}>40 bản ghi trên trang</option>
            <option value={50}>50 bản ghi trên trang</option>
          </select>
        </div>
        <div className="total">
          Tổng số: <b>{total}</b> Tiềm năng
        </div>
      </div>
    </div>
  );
};

export default TableDataPotential;
