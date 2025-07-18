import React from "react";

import { Table, Tooltip, Checkbox, Button, Select, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import MarketingSMSHistoryActionTable from "../marketing/sms/sms_history_action_table";
import styles from "../marketing/marketing.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ZaloFrSt from "../marketing/zalo/zalo_fr_sent";
import ZaloFrRq from "../marketing/zalo/zalo_fr_req";
import ZaloAuto from "../marketing/zalo/zalo_account_kb"
import ZaloMess from "../marketing/zalo/zalo_mess";
import ZaloFriend from "../marketing/zalo/zalo_friend";
import InputGroup from "../marketing/zalo/zalo_account_input_group";
interface DataType {
  key: React.Key;
  id: number;

  trangthai: string;
  telenumber: string;
  content: string;
  sender: string;
  date: string;
  telenumbersend: string;
}



export const data: DataType[] = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: i,
    id: i + 1,

    trangthai: "Hoạt động",
    telenumber: "0987656341",
    content: "1 bạn 0 nhóm Kết bạn: 0/0",
    sender: "Công ty Cổ phần Thanh toán Hưng Hà",
    date: "10:10 - 22/03/2022",
    telenumbersend: "0987654321",
  });
};


interface TableDataZaloFormProps {
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
}

const TableDataZaloForm: React.FC<TableDataZaloFormProps> = (any) => {
  const [showFrRq, setShowFrRq] = useState(false);
  const [showFrSt, setShowFrSt] = useState(false);
  const [showFrAuto, setShowFrAuto] = useState(false);
  const [showMess, setShowMess] = useState(false);
  const [showFr, setShowFr] = useState(false);
  const [openCategModal, setOpenCategModal] = useState(false)
  const [type, setType] = useState('')
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckAllChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleCheckboxChange = (checkboxValue) => {

    console.log('Checkbox value:', checkboxValue);
  };
  const handleButtonClick = (record) => {
    setShowFrRq(true);
  };
  const handleButtonClick_2 = (record) => {
    setShowFrAuto(true);
  };
  const handleButtonClick_3 = (record) => {
    setShowFrSt(true);
  };
  const handleButtonClick_4 = (record) => {
    setShowFr(true);
  };
  const handleButtonClick_5 = (record) => {
    setShowMess(true);
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
          <Checkbox value="checkbox"
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

          <p>Nguyễn Văn Namm  </p>
        </div>


      ),
      key: "1",
    },
    {
      title: "Nội dung",
      width: 116,
      render: () => (
        <>
          <p>1 bạn</p>
          <p>0 nhóm</p>
          <p>Kết bạn: 0/0</p>
        </>

      ),
      key: "2",

    },
    {
      title: "Trạng thái",
      width: 147,
      dataIndex: "trangthai",
      key: "trangthai",
      render: (trangthai) => <span style={{ color: '#34B632' }}>{trangthai}</span>,
    },
    {
      title: "Tuỳ chọn",

      key: "9",
      width: 810,

      render: (_, record) =>
      (<div className={styles.accountButton}>
        <Button type="primary" onClick={() => handleButtonClick_4(record)}>Bạn bè</Button>
        <Button type="primary">Nhóm</Button>
        <Button type="primary" onClick={() => handleButtonClick(record)}>Lời mời kết bạn</Button>
        <Button type="primary" onClick={() => handleButtonClick_3(record)} >Lời mời đã gửi</Button>
        <Button type="primary" onClick={() => handleButtonClick_2(record)}>Kết bạn tự động</Button>

        <Button type="primary" onClick={() => handleButtonClick_5(record)} >Nhắn tin</Button>



        <Button type="primary">Xuất file</Button>
      </div>)
    },
    {
      title: "Proxy",
      width: 214,
      render: () => (
        <>
          <Select
            defaultValue="Không sử dụng"
            style={{ width: 174 }}
            onChange={handleChange}
            options={[

            ]}
          />
        </>

      ),
      key: "4",
    },

  ];

  return (

    <div style={{ marginTop: "20px" }}>
      {showFrRq ? <>
        <ZaloFrRq /></>
        : showFrAuto ? <>
          <ZaloAuto /></> : showFrSt ? <ZaloFrSt /> : showFr ? <><ZaloFriend /></> : showMess ? <ZaloMess /> : <>

            <InputGroup />

            <Table
              style={{ marginTop: '20px' }}
              columns={columns}
              dataSource={data}
              bordered
              scroll={{ x: 1500, y: 800 }}
            />

          </>}
    </div>
  );
};

export default TableDataZaloForm;
function handleChange(value: string, option: { value: string; label: string; disabled?: undefined; } | { value: string; label: string; disabled: true; } | ({ value: string; label: string; disabled?: undefined; } | { value: string; label: string; disabled: true; })[]): void {
  throw new Error("Function not implemented.");
}


