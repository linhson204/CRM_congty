import React, { useCallback, useEffect, useState } from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import MarketingSMSHistoryActionTable from "../marketing/sms/sms_history_action_table";
import { MarketingZALOHistoryActionTable } from "../marketing/zalo/group/group_history_action_table";
import Link from "next/link";
import GroupZaloUserTable from "../marketing/zalo/group/group_table_user_image";
import HistoryGroupZalo from "../marketing/zalo/group/group_history";
import { useMediaQuery } from "react-responsive";
import styles from "../marketing/zalo/group/group.module.css";
import { StringChain } from "lodash";
import Image from "next/image";
import { number } from "yup";
import { MarketingZALOPostHistoryActionTable } from "../marketing/zalo/post/post_history_action_table";

interface listProps {
  list: any;
  isMobile: boolean;
}

const RenderListAccount: React.FC<listProps> = ({ list, isMobile }) => {
  return (
    <div
      style={{
        padding: "1.25rem"
      }}
    >
      {list?.list_acc && list.list_acc.map((item, index) => (
        <div
          style={{
            marginBottom: index !== list.list_acc.length - 1 ? "0.62rem" : ""
          }}
        >
          <GroupZaloUserTable
            isMobile={isMobile}
            linkUser="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/Hinh-nen-anime-cute-8-1.jpg"
            nameUser={`Nguyễn Văn Nam ${item}`}
          />
        </div>
      ))}
    </div>
  );
};

interface DataType {
  key: React.Key;
  id: any;
  module: any;
  trangthai: any;
  telenumber: string;
  content: string;
  sender: string;
  date: string;
  telenumbersend: string;
  image: String;
  operation: any;
}

export interface GetNumberProps {
  dataTable: any;
  changeNumberPage(e: number): void;
  isLoading: boolean,
  handleFilter: (value: number) => void
}

const TableDataZaloPost: React.FC<GetNumberProps> = ({
  dataTable,
  changeNumberPage,
  isLoading,
  handleFilter
}) => {
   const [ listData, setListData ] = useState<any>(dataTable)
  const [isMobile, setIsMobile] = useState(false);
  const [isTabnet, sestIsTabnet] = useState(false);
  const [ numberDel, setNumberDel ] = useState(undefined);
  const isMobileCheck: boolean = useMediaQuery({
    query: "(max-width: 414px)"
  });
  const isTabnetCheck: boolean = useMediaQuery({
    query: "(max-width: 768px)"
  });

 const handleTransFormIndex = (e) => {
      handleFilter(e)
    }

  const data: DataType[] = [];
  for (let i = 0; i < dataTable?.count; i++) {
    data.push({
      key: i,
      id: i < 9 ? '0' + (i + 1) : i + 1 as number,
      module: (
        <RenderListAccount list={dataTable.data[i]} isMobile={isMobileCheck} />
      ),
      trangthai: (
        dataTable.data[i]?.status == 1
          ? <span style={{
            color: '#34B632',
            fontFamily: 'Roboto',
            fontSize: '0.875rem',
            fontStyle: 'normal',
            fontWeight: 400
          }}>Đã đăng</span>
          : dataTable.data[i]?.status == 2
            ? <span style={{
              color: '#FFA800',
              fontFamily: 'Roboto',
              fontSize: '0.875rem',
              fontStyle: 'normal',
              fontWeight: 400
            }}>Chưa đăng</span>
            : <span style={{
              color: '#F33',
              fontFamily: 'Roboto',
              fontSize: '0.875rem',
              fontStyle: 'normal',
              fontWeight: 400
            }}>Không đăng được</span>),
      telenumber: "0987656341",
      content: dataTable.data[i]?.content,
      operation: (
        <MarketingZALOPostHistoryActionTable isPined={true} index={dataTable.data[i].schedule_id} onDel={(e) => handleTransFormIndex(e)} />
      ),
      image: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/Hinh-nen-anime-cute-8-1.jpg",
      sender: "",
      date: "",
      telenumbersend: ""
    });
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: isMobileCheck ? 30 : isTabnetCheck ? 1 : 35,
      dataIndex: "id",
      key: "0",
      fixed: isMobileCheck ? "left" : undefined
    },
    {
      title: "Tài khoản",
      width: isMobileCheck ? 100 : isTabnetCheck ? 4 : 150,
      dataIndex: "module",
      key: "1"
    },
    {
      title: "Nội dung",
      width: isMobileCheck ? 90 : isTabnetCheck ? 2 : 300,
      dataIndex: "content",
      key: "2"
    },
    {
      title: "Ảnh",
      width: isMobileCheck ? 90 : isTabnetCheck ? 2 : 55,
      dataIndex: "image",
      key: "3",
      render: () => (
        <div
          style={{
            paddingTop: "20px",
            paddingBottom: "20px",
            paddingLeft: "auto"
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            viewBox="0 0 46 46"
            fill="#3333"
          >
            <path
              d="M2.27151 38.6241L2.22644 38.6692C1.61799 37.3396 1.23489 35.8297 1.07715 34.1621C1.23489 35.8072 1.66306 37.2945 2.27151 38.6241Z"
              fill="#3333"
            />
            <path
              d="M16.7394 19.176C19.7015 19.176 22.1027 16.7747 22.1027 13.8126C22.1027 10.8505 19.7015 8.44922 16.7394 8.44922C13.7772 8.44922 11.376 10.8505 11.376 13.8126C11.376 16.7747 13.7772 19.176 16.7394 19.176Z"
              fill="white"
            />
            <path
              d="M32.9423 0.291504H14.0578C5.85498 0.291504 0.964844 5.18164 0.964844 13.3845V32.269C0.964844 34.7253 1.39301 36.8662 2.22682 38.669C4.16484 42.9507 8.31132 45.3619 14.0578 45.3619H32.9423C41.1451 45.3619 46.0353 40.4718 46.0353 32.269V27.1084V13.3845C46.0353 5.18164 41.1451 0.291504 32.9423 0.291504ZM42.362 23.9535C40.6043 22.4436 37.7648 22.4436 36.0071 23.9535L26.6325 31.9985C24.8747 33.5084 22.0353 33.5084 20.2775 31.9985L19.5113 31.3676C17.9113 29.9704 15.3648 29.8352 13.562 31.0521L5.13386 36.7084C4.63808 35.4464 4.34513 33.9816 4.34513 32.269V13.3845C4.34513 7.02953 7.70287 3.67179 14.0578 3.67179H32.9423C39.2972 3.67179 42.655 7.02953 42.655 13.3845V24.2014L42.362 23.9535Z"
              fill="#3333"
            />
          </svg>
        </div>
      )
    },
    {
      title: "Trạng thái",
      width: isMobileCheck ? 90 : isTabnetCheck ? 2 : 65,
      dataIndex: "trangthai",
      key: "4"
    },
    {
      title: "Tuỳ chọn",
      dataIndex: "operation",
      key: "5",
      width: isMobileCheck ? 40 : isTabnetCheck ? 2 : 60,
      fixed: isMobileCheck ? "right" : undefined,
    }
  ];

  useEffect(() => {
    if (isMobileCheck && isTabnetCheck) {
      setIsMobile(isMobileCheck);
      return;
    } else {
      sestIsTabnet(isTabnetCheck);
    }
  });

  return (
    <div style={{ marginTop: "20px", position: "relative" }}>
      {isLoading ? <span>
        Loading...
      </span> : <>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        bordered
        scroll={{ x: isMobileCheck ? 900 : 0, y: 400 }}
      />
      <div className="main__footer fix-main flex_between" id={styles.fix_main}>
        <div className="total">
          Tổng số: <b>{data.length}</b> SMS
        </div>
      </div></>}
      
    </div>
  );
};

export default TableDataZaloPost;
