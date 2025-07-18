
import React from "react";
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
 
}

const columns: ColumnsType<DataType> = [
    {
                title: (
                  <div>
                    <Checkbox></Checkbox> 
                  </div>
                ),
                width: 60,
                
                render: () => (
                  <div>
                    <Checkbox></Checkbox> 
                  </div>
                ),
              },
  {
    title: "STT",
    width: 70,
   dataIndex: "id",
    key: "0",
  },
  {
    title: "Tải khoản",
    width: 1470,
    render: () => (
      <div className={styles.frame_fr}>
        <Image  
                              width={50}
                              height={50}
                              src="/crm/Acc_ava.svg"
                              alt="hungha365.com" />
      <div className={styles.div_2_fr}>
      
        <div className={styles.div_2_fr}>
        
          <div className={styles.name_fr}>Vũ thị thuỳ dung</div>
          <div className={styles.text_wrapper_fr}>0987 654 321</div>
        </div>
      </div>
    </div>
       
    ),
    key: "1",
    
  },
 
];

export const data: DataType[] = [];
for (let i = 0; i < 50; i++) {
  data.push({
    key: i,
    id: i + 1,
   
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
              bordered />
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
