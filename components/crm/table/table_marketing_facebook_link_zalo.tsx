// import React from "react";
import { Table, Tooltip, Button, Switch, Image, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import styles from "../marketing/facebook/marketing.module.css";
import styleFacebook from '../../crm/marketing/facebook/facebook.module.css'

interface DataType {
  key: React.Key;
  id: number;
  idscan: any;
  link: any;
  name: any;
  phone: any;
  namescan: any;
}

const RenderNameID = () => {
  return (
    <>
      <span className={styleFacebook.text_table_id}>123456789</span><br></br>
      <p className={styleFacebook.text_table_name}>HỘI NHỮNG NGƯỜI CẦN TÌM VIỆC LÀM TẠI MIỀN BẮC</p>
    </>
  );
};

const RenderGroup = () => {
    return (
      <>
        <p className={styleFacebook.text_table_zalo}>HỘI NGƯỜI LƯỜI VIỆT NAM</p>
      </>
    );
  };

const RenderScan = () => {
    return (
        <>
        <span className={styleFacebook.text_table_id}>123456789</span>
        </>
    )
}


interface NameProps {
    text: string
}

const Name:React.FC<NameProps> = ({ text }) => {
    return (
        <>
        <span className={styleFacebook.text_table_zalo}>{text}</span>
        </>
    )
}

export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    id: i + 1,
    idscan: <RenderNameID/>,
    link: <RenderScan/>,
    name: <RenderGroup/>,
    phone: <RenderScan/>,
    namescan: <Name text="Vũ Thị Thùy Dung"/>,
  });
}

interface TableDataFacebookScanZaloPhone {
  setOpenModalUpdate: Function;
  setOpenModalDel: Function;
  setOpenModalOtpAcc: Function;
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
}

const TableDataFacebookScanLinkZaloPhone: React.FC<
TableDataFacebookScanZaloPhone
> = ({
  setSelected,
  openModallOtpAcc,
  setOpenModalOtpAcc,
  setOpenModalDel,
  setOpenModalUpdate
}: any) => {
  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      width: 70,
      dataIndex: "id",
      key: "1"
    },
    {
      title: "ID nhóm - Tên nhóm",
      width: 380,
      dataIndex: "idscan",
      key: "2"
    },
    {
        title: "Link Zalo quét được",
        width: 175,
        dataIndex: "link",
        key: "3"
      },
      {
        title: "Tên nhóm Zalo",
        width: 240,
        dataIndex: "name",
        key: "3"
      },
      {
        title: "SDT quét được",
        width: 140,
        dataIndex: "phone",
        key: "3"
      },
      
    
    {
      title: "Tên của SDT",
      width: 180,
      dataIndex: "name",
      key: "4",
      render: () => (
        <div>
          <div className={styles.user_info}>
            <p
              style={{
                whiteSpace: "nowrap"
              }}
              className={styleFacebook.text_table_zalo}
            >
              Vũ Thị Thùy Dung
            </p>
          </div>
        </div>
      )
    },
    
  ];
  

  return (
    <div style={{ marginTop: "20px" }}>
      <Table
        className="marketing_table_custom"
        columns={columns}
        dataSource={data}
        bordered
        pagination={false}
        scroll={{ x: "max-content", y: 870 }}
        footer={() => (
          <>
            <div className={styles.marketing_footer_table}>
              <div className={styles.pagesize}>
                <b>Hiển thị: </b>
                <select className="">
                  <option value={10}>10 bản ghi trên trang</option>
                  <option value={20}>20 bản ghi trên trang</option>
                  <option value={30}>30 bản ghi trên trang</option>
                  <option value={40}>40 bản ghi trên trang</option>
                  <option value={50}>50 bản ghi trên trang</option>
                </select>
              </div>
              <div className={styles.total}>
                <span>Tổng số: {data ? data.length : 0} Tài khoản</span>
              </div>
              <div className={styles.pagination}>
                <Pagination
                  showLessItems
                  size="small"
                  pageSize={10}
                  total={data ? data.length : 0}
                />
              </div>
            </div>
          </>
        )}
      />
    </div>
  );
};

export default TableDataFacebookScanLinkZaloPhone;
