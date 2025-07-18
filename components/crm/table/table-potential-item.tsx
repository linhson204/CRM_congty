import React, { useEffect, useState } from "react";
import { Table } from "antd";
import styles from "../campaign/campaign.module.css";
import style from "../potential/detail/information.module.css";
import Link from "next/link";
import { ColumnsType } from "antd/es/table";
import { axiosCRM } from "@/utils/api/api_crm";
import { notifyError } from "@/utils/function";

interface DataType {
  key: React.Key;
  product_id: string;
  prod_name: string;
  group_name: string;
  unit_name: string;
  price: string;
}

const TablePotentialItem = ({ formSearch, setFormSearch }) => {
  const [listProduct, setListProduct] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    axiosCRM
      .post("/potential/listProductInterest", formSearch)
      .then((res) => {
        setTotal(res.data.data.total);
        handleDataTable(res.data.data.data);
      })
      .catch((err) => notifyError("Đã có lỗi xảy ra"));
  }, [formSearch.recall, formSearch.page]);
  const handleDataTable = (datas) => {
    setListProduct(
      datas?.map((item: any, index: number) => ({
        ...item,
        STT: (formSearch.page - 1) * formSearch.pageSize + index + 1,
      }))
    );
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: 50,
      dataIndex: "STT",
      key: "STT",
    },
    {
      title: "Mã hàng hoá",
      width: 180,
      dataIndex: "product_id",
      key: "product_id",
    },
    {
      title: "Tên hàng hóa",
      width: 150,
      dataIndex: "prod_name",
      key: "prod_name",
      render: (_, data) => (
        <Link href={`/commodity/detail/${data.product_id}`}>
          <span>{data.prod_name}</span>
        </Link>
      ),
    },
    {
      title: "Nhóm hàng hóa",
      dataIndex: "group_name",
      key: "group_name",
      width: 100,
    },
    {
      title: "Đơn vị tính",
      dataIndex: "unit_name",
      key: "unit_name",
      width: 150,
    },
    {
      title: "Đơn giá (VNĐ)",
      dataIndex: "price",
      key: "price",
      width: 150,
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "ChucNang",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <button
          className={style.action_delete}
          onClick={() => handleDelete(record.product_id)}
        >
          <img
            className={styles.icon_delete}
            src="/crm/h_delete_cus.svg"
            alt="Delete Icon"
          />
          Gỡ bỏ
        </button>
      ),
    },
  ];
  const handleDelete = (product_id) => {
    axiosCRM
      .post("/potential/deleteProductPotential", {
        cus_id: formSearch.potential_id,
        product_id: product_id,
      })
      .then((res) =>
        setFormSearch({ ...formSearch, recall: !formSearch.recall })
      )
      .catch((err) => notifyError("Vui lòng thử lại sau"));
  };
  return (
    <div className="custom_table campaign_tble ">
      <Table
        columns={columns}
        dataSource={listProduct}
        bordered
        pagination={{
          total: total,
          onChange(page, pageSize) {
            setFormSearch({ ...formSearch, page: page });
          },
        }}
        scroll={{ x: 1500, y: 320 }}
      />
      <div className="main__footer flex_between" id="">
        <div className="show_number_item">
          <b>Hiển thị:</b>
          <select
            onChange={(e) =>
              setFormSearch({
                ...formSearch,
                pageSize: e.target.value,
                page: 1,
              })
            }
            className="show_item"
          >
            <option value={10}>10 bản ghi trên trang</option>
            <option value={20}>20 bản ghi trên trang</option>
            <option value={30}>30 bản ghi trên trang</option>
            <option value={40}>40 bản ghi trên trang</option>
            <option value={50}>50 bản ghi trên trang</option>
          </select>
        </div>
        <div className="total">
          Tổng số: <b>{total}</b> Hàng hoá
        </div>
      </div>
    </div>
  );
};

export default TablePotentialItem;
