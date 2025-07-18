import React, { useEffect, useState } from "react";
import { Dropdown, MenuProps, Space, Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import MarketingSMSHistoryActionTable from "../marketing/sms/sms_history_action_table";
import { MarketingZALOHistoryActionTable } from "../marketing/zalo/group/group_history_action_table";
import GroupZaloUserTable from "../marketing/zalo/group/group_table_user_image";
import styles from "../marketing/zalo/group/group.module.css";
import { useMediaQuery } from 'react-responsive';

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
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    id: i + 1,
    module: "Khách hàng",
    trangthai: "Chưa gửi",
    telenumber: "0987656341",
    content:
      "Chào chị Phượng, mình có lịch hẹn demo lúc 14:00 ngày 22/03/2022 nhé!",
    sender: "Công ty Cổ phần Thanh toán Hưng Hà",
    date: "10:10 - 22/03/2022",
    telenumbersend: "0987654321"
  });
}

interface TableZaloGroupAddFriendProps {
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
}

const TableZaloGroupAddFriend: React.FC<TableZaloGroupAddFriendProps> = (
  any
) => {

    const [ isMobile, setIsMobile ] = useState(false);
    const [ isTabnet, sestIsTabnet ] = useState(false);
    const isMobileCheck: boolean = useMediaQuery({
        query: '(max-width: 414px)',
    });
    const isTabnetCheck: boolean = useMediaQuery({
        query: '(max-width: 768px)',
    });

  const [selected, setSelected] = useState([]);
  const items: MenuProps["items"] = [
    {
      label: "Tất cả",
      key: "0"
    },
    {
      label: "Không tìm thấy",
      key: "1"
    },
    {
      label: "Đã gửi",
      key: "2"
    }
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: isMobileCheck ? 45 :  isTabnetCheck ? 35  : 60,
      dataIndex: "id",
      key: "0"
    },
    {
      title: "Name",
      dataIndex: "module",
      width: isMobileCheck ? 180 : isTabnetCheck ? 150 : 250,
      key: "1",
      render: () => (
        <GroupZaloUserTable
          linkUser="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/Hinh-nen-anime-cute-8-1.jpg"
          nameUser="Nguyen Thi Kim Phuong" isMobile={false}        />
      )
    },
    Table.SELECTION_COLUMN,
   
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
    <div style={{ position: "relative" }}>
      <Table
        rowSelection={{
          onChange: (selectedRowKeys, selectedRows) => {
            setSelected(selectedRows.map((row) => row.key));
          }
          // getCheckboxProps: (record) => {
          //   if (selected.length > 2) {
          //     return {
          //       disabled: !selected.includes(record.key) // Column configuration not to be checked
          //     };
          //   }
          // }
        }}
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 0, y: 520 }}
        pagination={false}
      />
      
    </div>
  );
};

export default TableZaloGroupAddFriend;
