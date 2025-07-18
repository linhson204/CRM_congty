import React from "react";
import { Select, Table, Tooltip } from "antd";
import styles from "../order/order.module.css";
import { useState, useEffect } from "react";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useRouter } from "next/router";
import { axiosCRM } from "@/utils/api/api_crm";
import OrderSelectBoxStep from "../order/order_steps/select_box_table_step";
import stylesOrderSelect from "@/components/crm/order/order.module.css";
import OrderApplyModal from "../order/add_order_action_modal/order_apply";
// import { TableRowSelection } from "antd/es/table/interface";
import OrderActionTable from "@/components/crm/order/order_detail/order_detail_action_modal/order_detail_share_list_action";
const optionSelect=[{value:1,label:"Xem"},{value:2,label:"Sửa"},{value:3,label:"Toàn quyền"}]
interface DataType {
  key: React.Key;
  type: string;
  name: string;
  room: string;
  role: string;
  dep_id: number,
  dep_name: string,
  emp_name: string,
}
interface TableDataCampaignShareListProps {
  formData?: any;
  setFormData?: any;
}

const TableDataCampaignShareList: React.FC<TableDataCampaignShareListProps> = ({
  formData = null,
  setFormData = null,
}) => {
  const router = useRouter();
  const [listShareCampaign, setListShareCampaign] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [isModalCancel, setIsModalCancel] = useState(false);
  useEffect(() => {
    setFormData({ ...formData, pageSize: pageSize, page: currentPage });
  }, [currentPage, pageSize]);

  useEffect(() => {
    axiosCRM
      .post("/campaign/listShareCampaign", {
        ...formData,
        campaign_id: Number(router.query.id),
        pageSize: pageSize,
        page: currentPage,
      })
      .then((res) => {
        handleDataTable(res.data.data.data);
        setTotal(res.data.data.total);
      })
      .catch((err) => console.log("error"));
  }, [pageSize, currentPage, formData.recall]);
  const handleDataTable = (datas) => {
    setListShareCampaign(
      datas?.map((data, index) => ({
        ...data,
        key: index+1,
        user_name: data.user_name!=""?data.user_name: "Chưa cập nhật",
      }))
    );
  };

  const handleChangeRole = (value, record)=>{
    axiosCRM
      .post("/campaign/updateRoleShareCampaign", {
        _id: record._id,
        role: value
      })
      .then((res) => {
        setFormData({...formData,recall:!formData.recall})
      })
      .catch((err) => console.log("error"));
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: 20,
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Loại đối tượng",
      width: 80,
      dataIndex: "type",
      key: "type",
      render:(_,record)=>(
        <div style={{ display: "flex", justifyContent: "center" }}>
          {record.dep_id==0?"Nhân viên":"Phòng ban"}
        </div>
      )
    },

    {
      title: "Tên đối tượng",
      width: 60,
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Phòng ban",
      dataIndex: "room",
      key: "room",
      width: 60,
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
      width: 100,
      render:(value, record, index) =>(<Select options={optionSelect} value={value} onChange={(e)=>handleChangeRole(e, record)} style={{width: 200}}/>),
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "11",
      width: 30,
      render: (value, record, index) => <OrderActionTable record={record} setFormData={setFormData}/>,
    },
  ];
  return (
    <div className="custom_table campaign_tble">
      <Table
        columns={columns}
        dataSource={listShareCampaign}
        bordered
        scroll={{ x: 1500, y: 320 }}
        pagination={{
          style: {
            paddingBottom: 20,
            display: "flex",
            position: "absolute",
            right: 0,
          },
          current: currentPage,
          pageSize: pageSize,
          total: total,
          onChange: (current) => {
            setCurrentPage(current);
          },
        }}
      />
      {
        <OrderApplyModal
          isModalCancel={isModalCancel}
          setIsModalCancel={setIsModalCancel}
          title="Áp dụng cho hàng hóa"
        />
      }
      <div className="main__footer flex_between" id="">
        <div className="show_number_item">
          <b>Hiển thị:</b>
          <select
            onChange={(el) => {
              setPageSize(Number(el.target.value));
            }}
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
          Tổng số: <b>{total}</b> Ghi chú
        </div>
      </div>
    </div>
  );
};

export default TableDataCampaignShareList;
