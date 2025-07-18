
import React, { useState } from "react";
import { Table, Tooltip ,Checkbox} from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import MarketingSMSHistoryActionTable from "../marketing/sms/sms_history_action_table";
import Link from "next/link";
import styles from "../marketing/marketing.module.css";
import Image from "next/image";


interface DataType {
    key: React.Key;
    id: number;
    uid: string;
    content:string;
    status: string;
    time: string;
}

const data: DataType[] = [];
for (let i = 0; i < 10; i++) {
    data.push({
        key: i,
        id: i + 1,
        uid: '123456789',
        status: 'HỘI NHỮNG NGƯỜI CẦN TÌM VIỆC LÀM TẠI MIỀN BẮC',
        content:'Nội dung bài viết Nội dung bài viết Nội dung bài viết Nội dung bài viết Nội dung bài viết Nội dung bài viết...',
        time:'00:00 - 01/01/2024',
    });
};



interface TableDataZaloFormProps {
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
}

const TableDataZaloForm: React.FC<TableDataZaloFormProps> = ( any) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckAllChange = (e) => {
        setIsChecked(e.target.checked);
    };
    
    const handleCheckboxChange = (checkboxValue) => {
    
        console.log('Checkbox value:', checkboxValue);
    };
    const columns: ColumnsType<DataType> = [
      
        {
            title: "STT",
            dataIndex: "id",
            key: "id",
            width: 70,
        },
        {
            title: "ID nhóm",
            dataIndex: "uid",
            width: 160,
        },
        {
            title: "Tên nhóm",
    
            key: "note",
            width: 468,
            dataIndex: "status",
            render: (status) => (
                <div style={{ color: '#3582CD', fontWeight: 'bold',display:'flex' ,padding:'20px'}}>
                    {status}
                </div>
            ),
        },
        {
            title: "Nội dung bài viết",
            dataIndex: "content",
            render:(content)=>(
                <div style={{ fontWeight: 'bold',display:'flex' ,padding:'20px',textAlign:'left',fontSize:'16px'}}>
                    {content}
                </div>
            ),
            width: 313,
        }, {
            title: "Thời gian đăng",
            dataIndex: "time",
            width: 189,
        },
    
    ];
  return (
    <><div style={{ marginTop: "20px" }}>
          <Table
              columns={columns}
              dataSource={data}
              bordered
              scroll={{ x: 'max-content', y: 870 }} />
      </div><div className="main__footer flex_between" id="">
              <div className="show_number_item">
                  <b>Hiển thị:</b>
                  <select className="show_item">
                      <option value={5}>5 bản ghi trên trang</option>
                      <option value={10}>10 bản ghi trên trang</option>
                      <option value={20}>20 bản ghi trên trang</option>
                      <option value={30}>30 bản ghi trên trang</option>
                      <option value={40}>40 bản ghi trên trang</option>
                  </select>
              </div>
              <div className="total">
                  Tổng số: <b>{data.length}</b> Bạn bè
              </div>
          </div>
          


          </>
  );
};

export default TableDataZaloForm;
