import React, { useEffect, useState } from "react";
import { Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import MarketingSMSHistoryActionTable from "../marketing/sms/sms_history_action_table";
import { MarketingZALOHistoryActionTable } from '../marketing/zalo/group/group_history_action_table'
import Link from "next/link";
import GroupZaloUserTable from "../marketing/zalo/group/group_table_user_image";
import HistoryGroupZalo from "../marketing/zalo/group/group_history";
import { useMediaQuery } from 'react-responsive';
import styles from '../marketing/zalo/group/group.module.css'

interface DataType {
  key: React.Key;
  id: number;
  module: string;
  trangthai: string;
  telenumber: string;
  content: string;
  sender: string;
  date: string;
  telenumbersend: string;
}





export const data: DataType[] = [];
for (let i = 0; i < 30; i++) {
  data.push({
    key: i,
    id: i + 1,
    module: "Khách hàng",
    trangthai: "Chưa gửi",
    telenumber: "0987656341",
    content: "Chào chị Phượng, mình có lịch hẹn demo lúc 14:00 ngày 22/03/2022 nhé!",
    sender: "Công ty Cổ phần Thanh toán Hưng Hà",
    date: "10:10 - 22/03/2022",
    telenumbersend: "0987654321",
  });
  };

  export interface GetNumberProps {
    changeNumberPage(e: number) : any
  }

const TableDataZaloForm: React.FC<GetNumberProps> = ({ changeNumberPage }) => {


    const [ isMobile, setIsMobile ] = useState(false);
    const [ isTabnet, sestIsTabnet ] = useState(false);
    const isMobileCheck: boolean = useMediaQuery({
        query: '(max-width: 414px)',
    });
    const isTabnetCheck: boolean = useMediaQuery({
        query: '(max-width: 768px)',
    });

    

    const columns: ColumnsType<DataType> = [
        {
          title: "STT",
          width: isMobileCheck ? 20 : isTabnetCheck ? 1 : 20,
          dataIndex: "id",
          key: "0",
          fixed: isMobileCheck ? "left" : undefined,
        },
        {
          title: "Nhóm",
          width: isMobileCheck ? 70 : isTabnetCheck ? 3 : 65,
          dataIndex: "module",
          key: "1",
          render: () => (
              <GroupZaloUserTable linkUser="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/Hinh-nen-anime-cute-8-1.jpg" nameUser="Nguyen Thi Kim Phuong" isMobile={false}/>
             ),
        },
        {
          title: "Phân loại nhãn",
          width: isMobileCheck ? 90 : isTabnetCheck ? 2 :  250,
          dataIndex: "object",
          key: "2",
          render: () => (
           <HistoryGroupZalo isHaveClose={false} list={[1,3,4,5,6,7,8]}/>
          ),
        },
        {
          title: "Tuỳ chọn",
          dataIndex: "operation",
          key: "3",
          width: isMobileCheck ?  30 : isTabnetCheck ? 2 : 50,
          fixed: isMobileCheck ? "right" : undefined,
          render: () => 
            <MarketingZALOHistoryActionTable isPined={true} />
        },
      ];
    
    
      useEffect(() => {
        if(isMobileCheck && isTabnetCheck) {
            setIsMobile(isMobileCheck);
            return;
        } else {
            sestIsTabnet(isTabnetCheck)
        }
      })


  return (
    <div style={{marginTop: "20px", position: 'relative'}}>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: isTabnet ? 0 : isMobile ? 600 : 1500 , y: 400 }}
      />
      <div className="main__footer fix-main flex_between" id={styles.fix_main}>
        <div className={`show_number_item ${styles.hidden_mobile}`}>
          <b className={`${styles.hidden_mobile}`}>Hiển thị:</b>
          <select className={`${styles.hidden_mobile}  show_item`}>
            <option value={10}>10 bản ghi trên trang</option>
            <option value={20}>20 bản ghi trên trang</option>
            <option value={30}>30 bản ghi trên trang</option>
            <option value={40}>40 bản ghi trên trang</option>
            <option value={50}>50 bản ghi trên trang</option>
          </select>
        </div>
        <div className="total">
          Tổng số: <b>{data.length}</b> SMS
        </div>
      </div>
    </div>
  );
};

export default TableDataZaloForm;
