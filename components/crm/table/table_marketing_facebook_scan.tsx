// import React from "react";
import { Table, Tooltip, Button, Switch, Image, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import styles from "../marketing/facebook/marketing.module.css";
import { Delete, DeleteScan, Eye, Upload } from "@/public/img/marketing/facebook";
import styleFacebook  from '../../crm/marketing/facebook/facebook.module.css'
import CancelModal from "../marketing/facebook/cancel_modal";
import { useState } from "react";
import SuccessModal from "../marketing/facebook/success_modal";

interface DataType {
    key: React.Key;
    id: number;
    loaiquet: string,
    tentaikhoanquet: string,
    soluongdukienquet: string,
    trangthai: string, 
    ghichu: string,
    chucnang: string
}

export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        id: i + 1,
        loaiquet: 'Tương tác bài viết',
        tentaikhoanquet: 'trịnh thị hồng nhung',
        soluongdukienquet: '300',
        trangthai: 'Quét thành công', 
        ghichu: 'Đã thêm vào danh sách quét',
        chucnang: 'Chức năng'
    });
};



interface TableDataFacebookScan {
    setOpenModalUpdate: Function
    setOpenModalDel: Function
    setOpenModalOtpAcc: Function
    setSelected: (value: boolean) => void;
    setNumberSelected: any;
}

const TableDataFacebookScan: React.FC<TableDataFacebookScan> = ({ setSelected, openModallOtpAcc, setOpenModalOtpAcc, setOpenModalDel, setOpenModalUpdate }: any) => {
   
    const [openCancel, setOpenCancel ] = useState<boolean>(false);
    const [openSuccess, setOpenSuccess ] = useState<boolean>(false);

    const columns: ColumnsType<DataType> = [
        {
          title: "STT",
          width:  70,
          dataIndex: "id",
          key: "1",
          
        },
        {
          title: "Loại quét",
          width:   180,
          dataIndex: "loaiquet",
          key: "2",
        },
        {
          title: "Tên tài khoản quét",
          width:   285,
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
                    <p>
                        Vũ Thị Thùy Dung
                    </p>
                </div>
            </div>

        ),
        },
        {
          title: "Số lượng dự kiến quét",
          width:   200,
          dataIndex: "soluongdukienquet",
          key: "4",
        },
        {
          title: "Trạng thái",
          width:   140,
          dataIndex: "trangthai",
          key: "5",
        },
        {
          title: "Ghi chú",
          width:   180,
          dataIndex: "ghichu",
          key: "6",
        },
        
        {
          title: "Chức năng",
          dataIndex: "operation",
          key: "7",
          width:  120,
          fixed: "right" ,
          render: () => (
            <>
                <Tooltip  color="white" placement="top" title={<>
                    <div className={styles.table_action_facebook}>
                        <div>
                            <Eye/>
                            <p>Xem chi tiết</p>
                        </div>
                        <div onClick={() => {
                            setOpenModalUpdate(true)
                        }}>
                            <Upload/>
                            <p>Xuất file UID</p>
                        </div>
                        <div onClick={() => {
                            setOpenCancel(true)
                        }}>
                            <DeleteScan/>
                            <p>Mã xác thực OTP</p>
                        </div>
                        <SuccessModal className={"scan_modal"} isModalCancel={openSuccess} setIsModalCancel={() => setOpenSuccess(false)} content={"Xóa lịch sử thành công"} title={""}/>
                        <CancelModal  isModalCancel={openCancel} setIsModalCancel={() => {
                              setOpenCancel(false)
                          } } content={"Bạn chắc chắn muốn xóa?"} title={"Xóa lịch sử"} next={(e) => {
                            if(e === 'next') {
                                setOpenCancel(false),
                                setOpenSuccess(true);
                            }
                          }}/>
                    </div>
                </>}>
                    <div><Image width={16} height={16} preview={false} src="/crm/3_cham.png" /> <span style={{ color: '#4C5BD4', fontWeight: '500' }}>Tùy chọn</span></div>
                </Tooltip>
            </>
        ),
        }
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
                rowSelection={{ ...rowSelection }}
                scroll={{ x: 'max-content', y: 870 }}
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

export default TableDataFacebookScan;

