// import React from "react";
import { Table, Tooltip ,Button, Switch } from "antd";
import { DownOutlined } from '@ant-design/icons';
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import MarketingSMSHistoryActionTable from "../marketing/sms/sms_history_action_table";
import styles from "../marketing/marketing.module.css";
import Link from "next/link";
import Image from "next/image";


interface DataType {
  key: React.Key;
  id: number;
  target: string;
  telenumber: string;
  kichban : string;
  date: string;
  messnumbersend: string;
  trangthai:string;
  delay:string;
}

const columns: ColumnsType<DataType> = [
   
  {
    title: "STT",
    width: 70,
    dataIndex: "id",
    key: "0",
    fixed: 'left',
  },
  {
    title:"Hoạt động",
    width: 116,
 render: ()=>(
    <div>
       <label className={styles.switch}>
  <input type="checkbox" />
  <span className={styles.slider} ></span>
</label>
    </div>
 ),
 fixed: 'left',
  },
  {
    title: "Kịch bản",
    width: 218,
    dataIndex:'kichban'
    ,
  },
  {
    title: "Tải khoản",
    width: 218,
    render: () => (
      <div >
      <div className={styles.messformname} >
      <Image  
                              width={26}
                              height={26}
                              src="/crm/zalo_ava_2.svg"
                              alt="hungha365.com" />
        <p>
          Nguyễn Văn Nam  
        </p>
        
      </div>
    </div>
       
    ),
    key: "1",
  },
  
  {
    title: "Đối tượng gửi",
    width: 218,
    dataIndex: "target",
    key: "3",
  },
   
  {
    title: "Ngày tạo",
    width: 218,
    dataIndex: "date",
    key: "4",
  },
  {
    title: "Delay",
    width: 214,
    dataIndex: "delay",
    key: "4",
  },
  {
    title: "Tin đã gửi",
    width: 113,
    dataIndex: "messnumbersend",
    key: "4",
    
  },
  {
    title: "Trạng thái",
    width: 140,
    dataIndex: "trangthai",
    key: "4",
    render: (trangthai) => <span style={{ color:  '#34B632' }}>{trangthai}</span>,
  },
  {
    title: "Chức năng",
    width: 120,
    render : ()=>(
      <div className={styles.dropdown}>
      <button className={styles.dropbtn}><img src="/crm/thaotac.svg"/> Thao tác</button>
      <div className={styles.dropdown_content}>
      <a href="#"><img src="/crm/sent.svg"/>Gửi lại</a>
      <a href="#"><img src="/crm/edit_mess.svg"/>Chỉnh sửa</a>
      <a href="#"><img src="/crm/del.svg"/>Xoá</a>
      </div>
    </div>
    ),
    key: "4",
  },

];

export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    id: i + 1,
    target: "Gửi tin nhắn tất cả bạn bè",
    telenumber: "0987656341",
   kichban: "Kịch bản "  + (i + 1),   
    date: "22/03/2022",
    messnumbersend: "1219",
    trangthai: "Đã gửi",
    delay: "10 giây",
  });
  };


interface TableDataZaloFormProps {
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
}

const TableDataZaloForm: React.FC<TableDataZaloFormProps> = ( any) => {

  return (
    <><div style={{ marginTop: "20px" }}>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 1500, y: 870 }} />
    </div><div className="main__footer flex_between" id="">
        <div className="show_number_item">
          <b>Hiển thị:</b>
          <select className="show_item">
           
            <option value={10}>10 bản ghi trên trang</option>
            <option value={20}>20 bản ghi trên trang</option>
            <option value={30}>30 bản ghi trên trang</option>
            <option value={40}>50 bản ghi trên trang</option>
          </select>
        </div>
        <div className="total">
          Tổng số: <b>{data.length}</b> Job
        </div>
      </div></>
  );
};

export default TableDataZaloForm;
