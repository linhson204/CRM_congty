
import React, { useState } from "react";
import { Table, Tooltip ,Checkbox, Button} from "antd";
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

export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
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
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckAllChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleCheckboxChange = (checkboxValue) => {
    
    console.log('Checkbox value:', checkboxValue);
  };
const columns: ColumnsType<DataType> = [
  {
    title: (
      <div>
        <Checkbox checked={isChecked} onChange={handleCheckAllChange}></Checkbox> 
      </div>
    ),
    width: 60,
    
    render: () => (
      <div>
        <Checkbox  value="checkbox"
checked={isChecked}
onChange={() => handleCheckboxChange('checkbox')} ></Checkbox> 
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
    width: 183,
    render: () => (
      <div className={styles.frame_fr}>
        <Image  
                              width={26}
                              height={26}
                              src="/crm/zalo_ava_2.svg"
                              alt="hungha365.com" />
      
          <p>Nguyễn Văn Nam  </p> 
        </div>
    
       
    ),
    key: "1",
  },
  {
    title: "Phân loại nhãn",
    width: 1164,
    render: () => (
        <div className={styles.friendButton}>
        <Button type="primary">Nhãn dán 1</Button>
        <Button type="primary"> Nhãn dán 2</Button>
        <Button  type="primary">Nhãn dán 3</Button>
        <Button type="primary">Nhãn dán 4</Button>
        <Button type="primary">Nhãn dán 5</Button>
        <Button type="primary">Nhãn dán 6</Button>
        <Button type="primary">Nhãn dán 7</Button>
        <Button type="primary">Nhãn dán 8</Button>
        
       
      
      
     </div>
       
    ),
    key: "1",
    
  },
  {
    title: "Ghin tin",
    width: 123,
   render : ()=>(
    <><button> <div className={styles.frame_fr}><Image
           width={20}
           height={20}
           src="/crm/unpin.svg" alt={""} />
           <p>Bỏ ghim</p>
           </div></button>
           </>
   ),
    key: "0",
  },
];


  return (
    <><div style={{ marginTop: "20px" }}>
          <Table
              columns={columns}
              dataSource={data}
              bordered 
              scroll={{ x: 1500, y: 800 }}
             />
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
