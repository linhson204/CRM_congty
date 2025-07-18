import React, { useEffect, useRef, useState } from "react";
import { Button, Space, Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { MarketingZALOHistoryActionTable } from '../marketing/zalo/group/group_history_action_table'
import { useMediaQuery } from 'react-responsive';
import styles from '../marketing/zalo/group/group.module.css'
import { MarketingFacebookHistoryActionTable } from "../marketing/facebook/facebook_table_action";


interface DataType {
  key: React.Key;
  id: number;
  tenmautinnhan: string,
  loaitinnhan: string,
  khachhang: string,
  ghichu: string, 
  ngaytao: string
}

export const data: DataType[] = [];
for (let i = 0; i < 50; i++) {
  data.push({
    key: i,
    id: i + 1,
    tenmautinnhan: 'Mẫu tin nhắn tự động số 1',
    loaitinnhan: 'Tin nhắn tự động',
    khachhang: 'Tất cả',
    ghichu: 'Thêm ghi chú', 
    ngaytao: '22/03/2022'
  });
  };

  export interface GetNumberProps {
    changeNumberPage(e: number) : any
  }

const TableDataFacebook: React.FC<GetNumberProps> = ({ changeNumberPage }) => {
  const [selectionType, setSelectionType] = useState<any>('checkbox');
  const tableContainerRef = useRef(null);

  
   
    const isMobileCheck: boolean = useMediaQuery({
        query: '(max-width: 414px)',
    });
    const isTabnetCheck: boolean = useMediaQuery({
        query: '(max-width: 768px)',
    });

    

    const columns: ColumnsType<DataType> = [
        {
          title: "STT",
          width:  40,
          dataIndex: "id",
          key: "1",
          
        },
        {
          title: "Tên mẫu tin nhắn",
          width:   250,
          dataIndex: "tenmautinnhan",
          key: "2",
        },
        {
          title: "Loại tin nhắn",
          width:   100,
          dataIndex: "loaitinnhan",
          key: "3",
        },
        {
          title: "Khách hàng",
          width:   90,
          dataIndex: "khachhang",
          key: "4",
        },
        {
          title: "Ghi chú",
          width:   140,
          dataIndex: "ghichu",
          key: "5",
        },
        {
          title: "Ngày tạo",
          width:   90,
          dataIndex: "ngaytao",
          key: "6",
        },
        
        {
          title: "Chức năng",
          dataIndex: "operation",
          key: "7",
          width:  60,
          fixed: "right" ,
          render: () => 
          <MarketingFacebookHistoryActionTable />
        }
      ];

      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
      };

      const handleScrollLeft = () => {
        tableContainerRef.current.scrollLeft -= 100;
      };
    
      const handleScrollRight = () => {
        tableContainerRef.current.scrollLeft += 100;
      };
    
  return (
    <div style={{marginTop: "20px", position: 'relative'}}>
      <Table
      ref={tableContainerRef}
       rowSelection={{
        type: selectionType,
        ...rowSelection,
      }}
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 1200 , y: 600 }}
      />
      {/* <div className="main__footer fix-main flex_between" id={styles.fix_main}>
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
      </div> */}
    </div>
  );
};

export default TableDataFacebook;
