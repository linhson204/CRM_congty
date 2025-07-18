import React, { useContext, useEffect, useState } from "react";
import { Table, Tooltip } from "antd";
import styles from "../order/order.module.css";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
// import { TableRowSelection } from "antd/es/table/interface";
import OrderActionTable from "@/components/crm/order/order_action_table";
import { useFormData } from "../context/formDataContext";
import { useRouter } from "next/router";
import { axiosCRMCall } from "@/utils/api/api_crm_call";
import dayjs from "dayjs";

interface DataType {
  key: React.Key;
  stt: string;
  order_number: string;
  status: string;
  explain: string;
  value: number;
  name: string;
  order_date: string;
}

// Cần đưa vào 1 hàm dùng chung cho nhiều nơi
const statusArr = [
  { key: 0, value: "Tất cả", color: "inherit" },
  { key: 1, value: "Chờ duyệt", color: "#FFA800" },
  { key: 2, value: "Đã duyệt", color: "#34B632" },
  { key: 3, value: "Hủy bỏ", color: "#FF3333" },
]
const numToStatus = (numb) => {
  const result = statusArr.find(s => s.key === numb)
  const str = result ? result.value : "Tất cả"
  return str
}
const numToColor = (numb) => {
  const result = statusArr.find(s => s.key === numb)
  const str = result ? result.color : "inherit"
  return str
}

const columns: ColumnsType<DataType> = [
  {
    title: "STT",
    width: 50,
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Số đơn hàng",
    width: 100,
    dataIndex: "order_number",
    key: "order_number",
    render: (text: any) => (
      <Link href={"/order/detail"}>
        <b>{text}</b>
      </Link>
    ),
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: 100,
    render: (text) => <div style={{ color: (text && Number(text) ? numToColor(Number(text)) : 'inherit') }}>{text && Number(text) ? numToStatus(Number(text)) : 'Chưa cập nhật'}</div>,
  },
  {
    title: "Diễn giải",
    dataIndex: "explain",
    key: "explain",
    width: 200,
    render: (text) => <div>{text}</div>,
  },
  {
    title: "Giá trị (VNĐ)",
    dataIndex: "value",
    key: "value",
    width: 150,
  },
  {
    title: "Người thực hiện",
    width: 200,
    dataIndex: "name",
    key: "name",
    render: (text: any) => (
      <Link href={"/customer/contact/detail"}>
        <b>{text}</b>
      </Link>
    ),
  },

  {
    title: "Ngày đặt hàng",
    dataIndex: "order_date",
    key: "order_date",
    width: 150,
  },

  {
    title: "Chức năng",
    dataIndex: "operation",
    key: "11",
    width: 80,
    fixed: "right",
    render: (text: any, record: any) => (
      <OrderActionTable record={record} />
    ),
  },
];

export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    stt: 'string',
    order_number: `ĐH-000${i}`,
    status: `Chờ duyệt`,
    explain: `Đơn hàng Nguyễn Trần Kim Phượng Đơn hàng Nguyễn Trần Kim Phượng  `,
    value: 10000000,
    name: `Nguyễn Văn Nam`,
    order_date: "01/08/2023",
  });
}

interface TableDataCampaignProps {
  keyword: string,
  date: Date,
  status: number
}

const TableDataCampaign: React.FC<TableDataCampaignProps> = (props: any) => {
  const { formData, setFormData, handleRecall } = useContext(useFormData);
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [record, setRecord] = useState<any>({});
  const [listDocument, setListDocument] = useState<any>([]);

  const [keyword, setKeyword] = useState(props && props.hasOwnProperty('keyword') ? props.keyword : '')
  const [date, setDate] = useState<null | number>(props && props.hasOwnProperty('date') ? dayjs(props.date).unix() : null)
  const [status, setStatus] = useState(props && props.hasOwnProperty('status') ? props.status : 0)

  useEffect(() => {
    setKeyword(props.keyword)
    setDate(props.date ? dayjs(props.date).unix() : null)
    setStatus(props.status)
  }, [props])

  useEffect(() => {
    axiosCRMCall
      .post('/order/list-order', {
        ...formData,
        quote_id: id,
        page: page,
        pageSize: pageSize,
        keyword: keyword,
        fromDate: date,
        toDate: date,
        status: status
      })
      .then(response => {
        setTotal(response.data.data.data.length);
        handleDataTable(response.data.data.data);
      })
  }, [formData.recall, page, pageSize])

  const handleDataTable = (datas) => {
    datas &&
      setListDocument(
        datas.map((item: any, index: number) => ({
          key: index,
          stt: (page - 1) * pageSize + index + 1,
          order_number: item._id,
          status: item.status,
          explain: item.explain,
          value: item.total_money,
          name: item.user_create_id ? item.user_create_id.userName : 'Chưa cập nhật',
          order_date: item.date ? dayjs.unix(item.date).format('DD/MM/YYYY') : 'Chưa cập nhật',
          id: item._id,
        }))
      );
  };

  // useEffect(() => {
  //   console.log(listDocument)
  // }, [listDocument])

  return (
    <div className="custom_table campaign_tble">
      <Table
        columns={columns}
        dataSource={listDocument}
        // rowSelection={{ ...rowSelection }}
        pagination={{
          total: total,
          pageSize: pageSize,
          onChange(page, pageSize) {
            setPage(page);
          },
        }}
        bordered
        scroll={{ x: "100%", y: 600 }}
      />
      <div className="main__footer flex_between" id="">
        <div className="show_number_item">
          <b>Hiển thị:</b>
          <select
            onChange={(e) => {
              setPageSize(Number(e.target.value)), setPage(1);
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
          Tổng số: <b>{listDocument.length}</b> Đơn hàng
        </div>
      </div>
    </div>
  );
};

export default TableDataCampaign;
