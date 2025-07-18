// import React from "react";
import { Table, Tooltip, Button, Switch, Image, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import styles from "../marketing/facebook/marketing.module.css";
import styleFacebook from '../../crm/marketing/facebook/facebook.module.css'

interface DataType {
  key: React.Key;
  id: number;
  idtennhom: any;
  uiquet: any;
  tentaikhoan: string;
}

const RenderNameID = () => {
  return (
    <>
      <span className={styleFacebook.text_table_id}>123456789</span><br></br>
      <p className={styleFacebook.text_table_name}>HỘI NHỮNG NGƯỜI CẦN TÌM VIỆC LÀM TẠI MIỀN BẮC</p>
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

export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    id: i + 1,
    idtennhom: <RenderNameID/>,
    uiquet: <RenderScan/>,
    tentaikhoan: ''
  });
}

interface TableDataFacebookScanUIDGroup {
  setOpenModalUpdate: Function;
  setOpenModalDel: Function;
  setOpenModalOtpAcc: Function;
  setSelected: (value: boolean) => void;
  setNumberSelected: any;
}

const TableDataFacebookScanUIDGroup: React.FC<
  TableDataFacebookScanUIDGroup
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
      width: 250,
      dataIndex: "idtennhom",
      key: "2"
    },
    {
        title: "UID quét được",
        width: 80,
        dataIndex: "uiquet",
        key: "3"
      },
    
    {
      title: "Tên tài khoản của UID",
      width: 220,
      dataIndex: "tentaikhoan",
      key: "4",
      render: () => (
        <div>
          <div className={styles.user_info}>
            <Image
              style={{ borderRadius: '50%', 
              border: "1px solid  #3582CD" }}
              preview={false}
              width={50}
              height={50}
              src="/crm/zalo_ava_2.svg"
              alt="hungha365.com"
            />
            <p
              style={{
                whiteSpace: "nowrap"
              }}
            >
              Vũ Thị Thùy Dung
            </p>
          </div>
        </div>
      )
    },
  ];
//   const rowSelection: TableRowSelection<any> = {
//     onChange: (selectedRowKeys, selectedRows) => {
//       // if (selectedRows?.length > 0) {
//       //   setSelected(true);
//       // } else {
//       //   setSelected(false);
//       // }
//     },
//     onSelect: (record, selected, selectedRows) => {
//       setSelected(selectedRows);
//     },
//     onSelectAll: (selected, selectedRows, changeRows) => {
//       setSelected(selectedRows);
//     }
//   };

  return (
    <div style={{ marginTop: "20px" }}>
      <Table
        className="marketing_table_custom"
        columns={columns}
        dataSource={data}
        bordered
        pagination={false}
        scroll={{ x: "max-content", y: 870 }}
        // rowSelection={{ ...rowSelection }}
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

export default TableDataFacebookScanUIDGroup;
