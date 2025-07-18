import { axiosCRMCall } from "@/utils/api/api_crm_call";
import { Spin, Table, Tooltip } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import dayjs from "dayjs";
import Link from "next/link";
import React, { CSSProperties, useContext, useEffect, useState } from "react";
import useLoading from "../hooks/useLoading";
import { QuoteContext } from "../quote/quoteContext";
import QuoteActionTable from "../quote/quote_action_table";

interface DataType {
  key: React.Key;
  quote_code: string;
  status: string;
  customer: string;
  description: string;
  value: number;
  quote_date: string;
  quote_date_end: string;
}

interface TableDataOrderProps {
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
}

const TableDataQuote: React.FC<TableDataOrderProps> = ({
  setSelected,
  setNumberSelected,
}: any) => {
  const [key, setKey] = useState();
  const [allKey, setAllKey] = useState<any>();

  const { dateQuote, dateQuoteEnd, status, quoteCode, shouldFetchData,
    setShouldFetchData, setRecordId, setListRecordId, listRecordId,
    setRecordName, setListRecordName, statusStrToColor, statusNumToStr,
    setShouldFetchDetailData, recordId } = useContext(QuoteContext);
  const [quoteData, setQuoteData] = useState<any>([]) // Data từ API
  const [data, setData] = useState<DataType[]>([]); // Data đổ bảng
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const tooltipStyle: CSSProperties = {
    backgroundColor: 'white',
    color: 'black'
  }

  const handlePerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value) || 10)
    setCurrentPage(1)
    setShouldFetchData(true)
  }

  const handleTablePageChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current)
    setShouldFetchData(true)
  }

  const convertToDataType = (data?) => {
    const newData = data?.map((item) => ({
      key: item.id,
      quote_code: item.quote_code_str,
      status: statusNumToStr(item.status),
      customer: item.customer_name,
      description: item.description,
      value: item.total_money,
      quote_date: dayjs(item.date_quote).format('DD/MM/YYYY'),
      quote_date_end: dayjs(item.date_quote_end).format('DD/MM/YYYY'),
    }))
    setData(newData)
  }

  const getData = () => {
    axiosCRMCall
      .post('/quote/list', {
        date_quote: dateQuote,
        date_quote_end: dateQuoteEnd,
        status: status === 0 ? null : Math.max(Math.min(status, 6), 1),
        quote_code_str: quoteCode,
        page: currentPage,
        perPage: perPage
      })
      .then((res) => {
        // console.log(res?.data?.data);
        res?.data?.data?.data?.length > 0 ?
          setQuoteData(res.data.data.data) :
          setQuoteData([])
        res?.data?.data?.total ?
          setTotal(res?.data?.data?.total) :
          setTotal(res?.data?.data?.data?.length) // Tạm thời khi API chưa sửa
      })
      .catch((err) => console.log(err))
  }

  // Run first
  useEffect(() => {
    startLoading();
    getData();
    stopLoading();
  }, [])

  // Run when triggered
  useEffect(() => {
    if (shouldFetchData) {
      startLoading();
      getData();
    }
    setRecordId(0)
    setListRecordId([])
    setShouldFetchData(false)
  }, [shouldFetchData])
  useEffect(() => {
    convertToDataType(quoteData);
    stopLoading();
  }, [quoteData])

  // useEffect(() => {
  //   if (recordId && Number(recordId) && Number(recordId) !== 0)
  //     setShouldFetchDetailData(true)
  // }, [recordId])

  const columns: ColumnsType<DataType> = [
    {
      title: "Số báo giá",
      width: 120,
      dataIndex: "quote_code",
      key: "quote_code",
      render: (text: any, record: any) => (
        <Link href={`/quote/detail/${record.key}`}>
          <b>{text}</b>
        </Link>
      ),
    },
    {
      title: "Tình trạng",
      width: 120,
      dataIndex: "status",
      key: "status",
      render: (text) => <div style={{ color: statusStrToColor(text) }}>{text}</div>,
    },
    {
      title: "Ngày báo giá",
      dataIndex: "quote_date",
      key: "quote_date",
      width: 250,
    },
    {
      title: "Hiệu lực đến ngày",
      dataIndex: "quote_date_end",
      key: "quote_date_end",
      width: 250,
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
      width: 300,
      ellipsis: {
        showTitle: false
      },
      render: (text) => (
        <Tooltip placement="topLeft" title={text} color="white" overlayInnerStyle={tooltipStyle}>
          {text}
        </Tooltip>
      )
    },
    {
      title: "Tổng tiền (VNĐ)",
      dataIndex: "value",
      key: "value",
      width: 180,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 300,
      ellipsis: {
        showTitle: false
      },
      render: (text) => (
        <Tooltip placement="topLeft" title={text} color="white" overlayInnerStyle={tooltipStyle}>
          {text}
        </Tooltip>
      )
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      key: "11",
      width: 150,
      fixed: "right",
      render: (text: any, record: any) => (
        <div onClick={() => { setKey(record.key); setRecordId(record.key); setRecordName(record.quote_code); }}>
          <QuoteActionTable record={key} allKey={[]} />
        </div>
      ),
    },
  ];

  // const data: DataType[] = [];
  // for (let i = 0; i < 15; i++) {
  //   data.push({
  //     key: i,
  //     order_number: `ĐH-000${i}`,
  //     status: `Chờ duyệt`,
  //     customer: `Nguyễn Trần Kim Phượng`,
  //     explain: `Đơn hàng Nguyễn Trần Kim Phượng Đơn hàng Nguyễn Trần Kim Phượng  `,
  //     value: 10000000,
  //     name: `Nguyễn Văn Nam`,
  //     order_date: "01/08/2023",
  //     order_status: `Đã thanh toán một phần`,
  //     delivery_status: `Chưa giao hàng`,
  //   });
  // }
  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      setAllKey(selectedRows);
      if (selectedRows?.length > 0) {
        setSelected(true);
      } else {
        setSelected(false);
      }
      setListRecordId(selectedRowKeys) // Lưu id bản ghi 
      setListRecordName(selectedRows.map((row) => row.quote_code))
    },
    onSelect: (record, selected, selectedRows) => {
      setNumberSelected(selectedRows?.length);
    },
    onSelectAll: (selected, selectedRows, changeRows) => { },
  };
  return (
    <div className="custom_table">
      {isLoading ? (
        <Spin
          style={{
            margin: "auto",
            width: "100%",
            display: "block",
            padding: "5px",
            height: "100%",
          }}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          rowSelection={{ ...rowSelection }}
          bordered
          scroll={{ x: 1500, y: 1200 }}
          pagination={{
            current: currentPage,
            pageSize: perPage,
            total: total
          }}
          onChange={handleTablePageChange}
          style={{
            marginBottom: '10px'
          }}
        />
      )}
      <div
        className="main__footer flex_between"
        id=""
        style={{
          position: 'relative',
          bottom: 0
        }}
      >
        <div className="show_number_item">
          <b>Hiển thị:</b>
          <select
            className="show_item"
            value={perPage}
            onChange={handlePerPage}
          // defaultValue={perPage}
          >
            <option value={10}>10 bản ghi trên trang</option>
            <option value={20}>20 bản ghi trên trang</option>
            <option value={30}>30 bản ghi trên trang</option>
            <option value={40}>40 bản ghi trên trang</option>
            <option value={50}>50 bản ghi trên trang</option>
          </select>
        </div>
        <div className="total">
          Tổng số: <b>{total}</b> Báo giá
        </div>
      </div>
    </div>
  );
};

export default TableDataQuote;
