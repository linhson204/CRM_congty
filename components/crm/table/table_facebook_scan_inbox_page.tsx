// import React from "react";
import { Table, Tooltip, Button, Switch, Image, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import styles from "../marketing/facebook/marketing.module.css";

interface DataType {
    key: React.Key;
    id: number;
    uid: string,
    tentaikhoan: string,
    trangthai: string,
    themvaodanhsach: string
}

export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        id: i + 1,
        uid: '123456789',
        tentaikhoan: 'trịnh thị hồng nhung',
        trangthai: 'Hoạt động',
        themvaodanhsach: '123456789'
    });
};



interface TableDataFacebookScanUIDPage {
    setOpenModalUpdate: Function
    setOpenModalDel: Function
    setOpenModalOtpAcc: Function
    setSelected: (value: boolean) => void;
    setNumberSelected: any;
}

const TableDataFacebookScanPage: React.FC<TableDataFacebookScanUIDPage> = ({ setSelected, openModallOtpAcc, setOpenModalOtpAcc, setOpenModalDel, setOpenModalUpdate }: any) => {
   

    const columns: ColumnsType<DataType> = [
        {
          title: "STT",
          width:  70,
          dataIndex: "id",
          key: "1",
          
        },
        {
          title: "UID",
          width:   100,
          dataIndex: "uid",
          key: "2",
        },
        {
          title: "Tên tài khoản",
          width:   220,
          dataIndex: "tentaikhoanquet",
          key: "3",
          render: () => (
            <div >
                <div className={styles.user_info} >
                    <Image
                        style={{ borderRadius: '50%', 
                        border: "1px solid  #3582CD" }}
                        preview={false}
                        width={50}
                        height={50}
                        src="/crm/zalo_ava_2.svg"
                        alt="hungha365.com" />
                    <p style={{
                        whiteSpace: 'nowrap'
                    }}>
                        Vũ Thị Thùy Dung
                    </p>
                </div>
            </div>

        ),
        },
        {
            title: "Trạng thái",
            width:   100,
            dataIndex: "trangthai",
            key: "2",
          },
          {
            title: "Thêm vào danh sách",
            width:   100,
            dataIndex: "themvaodanhsach",
            key: "2",
          },
      ];
      const rowSelection: TableRowSelection<any> = {
        onChange: (selectedRowKeys, selectedRows) => {
            // if (selectedRows?.length > 0) {
            //   setSelected(true);
            // } else {
            //   setSelected(false);
            // }
        },
        onSelect: (record, selected, selectedRows) => {
            setSelected(selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            setSelected(selectedRows);
        },
    };

    return (
        <div style={{ marginTop: "20px" }}>
            <Table
                className="marketing_table_custom"
                columns={columns}
                dataSource={data}
                bordered
                pagination={false}
                scroll={{ x: 'max-content', y: 870 }}
                rowSelection={{ ...rowSelection }}
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
                                <Pagination showLessItems size="small" pageSize={10} total={data ? data.length : 0} />
                            </div>
                        </div>
                    </>
                )}
            />

        </div>
    );
};

export default TableDataFacebookScanPage;

