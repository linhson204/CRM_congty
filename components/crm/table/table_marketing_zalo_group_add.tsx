import React from "react";
import { Dropdown, MenuProps, Space, Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import MarketingSMSHistoryActionTable from "../marketing/sms/sms_history_action_table";
import { MarketingZALOHistoryActionTable } from "../marketing/zalo/group/group_history_action_table";
import Link from "next/link";
import GroupZaloUserTable from "../marketing/zalo/group/group_table_user_image";
import HistoryGroupZalo from "../marketing/zalo/group/group_history";
import { useMediaQuery } from "react-responsive";
import styles from "../marketing/zalo/group/group.module.css";

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

interface TableZaloGroupAddProps {
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
}

const TableZaloGroupAdd: React.FC<TableZaloGroupAddProps> = (any) => {

  const items: MenuProps["items"] = [
    {
      label: "Tất cả",
      key: "0",
    },
    {
      label: "Không tìm thấy",
      key: "1",
    },
    {
      label: "Đã gửi",
      key: "2",
    },
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: 8,
      dataIndex: "id",
      key: "0"
    },
    {
      title: "Link nhóm",
      width: 38,
      dataIndex: "module",
      key: "1",
      render: () => (
        <div className={styles.add__link} >
          <Link  href={"https://zalo.me/g/xtwoys334"}>https://zalo.me/g/xtwoys334</Link>
        </div>
      )
    },
    {
      title: (
        <div className={styles.table__add_custom}>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
              <span>Trạng thái</span>
                <div>
                  <svg
                    className={styles.add__color_svg}
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    fill="currentColor"
                  >
                    <path
                      d="M0 3.72656H12L6 9.72656L0 3.72656Z"
                      fill="currenColor"
                    />
                  </svg>
                </div>
              </Space>
            </a>
          </Dropdown>
        </div>
      ),
      dataIndex: "operation",
      key: "2",
      width: 22,
      render: () =>  <div  >
      <span>(Không tìm thấy)</span>
    </div>
    }
  ];

  

  return (
    <div style={{ marginTop: "20px", position: "relative" }}>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: 0, y: 768 }}
        pagination={false} 
      />
      <div className={styles.add__delay}>
      <span >Delay: 10 phút</span>
      </div>
    </div>
  );
};

export default TableZaloGroupAdd;
