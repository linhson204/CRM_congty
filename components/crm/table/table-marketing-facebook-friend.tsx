// import React from "react";
import { Table, Tooltip, Button, Switch, Image, Pagination, Checkbox } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import styles from "../marketing/facebook/marketing.module.css";

interface DataType {
    key: React.Key;
    id: number;
    uid: string;
    password: string;
    note: string;
    status: string;
}

export const data: DataType[] = [];
for (let i = 0; i < 10; i++) {
    data.push({
        key: i,
        id: i + 1,
       uid: '123456789',
        password: '123456',
        note: '123456',
        status: 'Hoạt động',
    });
};



interface TableDataFaceBookListAcc {
    setOpenModalUpdate: Function
    setOpenModalInvite: Function
    setOpenModalDel: Function
    setOpenModalOtpAcc: Function
    setSelected: (value: boolean) => void;
    setNumberSelected: any;
}

const TableDataFaceBookListAcc: React.FC<TableDataFaceBookListAcc> = ({ setSelected, openModallOtpAcc, setOpenModalOtpAcc, setOpenModalDel, setOpenModalUpdate,setOpenModalInvite }: any) => {
    
    const columns: ColumnsType<DataType> = [
        {
            title: "STT",
            dataIndex: "id",
            key: "id",
            width: 70,
        },
        {
            title: "UID",
            dataIndex: "uid",
            width: 150
        },
        {
            title: "Tên tài khoản",
            render: () => (
                <div >
                    <div className={styles.user_info} >
                        <Image
                            style={{ borderRadius: '50px' }}
                            preview={false}
                            width={50}
                            height={50}
                            src="/crm/zalo_ava.svg"
                            alt="hungha365.com" />
                        <p>
                            Vũ Thị Thùy Dung
                        </p>
                    </div>
                </div>

            ),
            key: "info",
            width: 285
        },

        {
            title: "Nhãn",
            dataIndex: "password",
            key: 'password',
            width: 304,
            render: () => (
                <>
                 <button
                type="button"
                
                className={styles.dropbtn_add_zalo_shop} 
                
              >
                
                <div style={{ display:'flex', justifyContent:'space-between'}} >Kết bạn tự động <img src="/crm/arr_down_full.svg" /> </div>
               
              </button></>
            )
        },
        {
            title: "Ghim",
            dataIndex: "status",
            key: "status",
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
        },
        {
            title: "Nhắn tin",
            
            key: "note",
            width: 74,
            render: () => (
                <div>
                  <Checkbox  
      ></Checkbox> 
                </div>
              ),
        },
        {
            title: "Chức năng",
            width: 120,
            fixed: 'right',
            render: () => (
                <>
                    <Tooltip color="white" placement="top" title={<>
                        <div className={styles.table_action_facebook}>
                            <div>
                                <Image preview={false} width={28} height={28} src="/crm/mess.svg" />
                                <p>Nhắn tin</p>
                            </div>
                            <div onClick={() => {
                                setOpenModalInvite(true)
                            }}>
                                <Image preview={false} width={28} height={28} src="/crm/add_to_gr.svg" />
                                <p>Mời vào nhóm</p>
                            </div>
                          
                            <div onClick={() => {
                                setOpenModalDel(true)
                            }}>
                                <Image preview={false} width={28} height={28} src="/crm/img/marketing/xoa_tai_khoan.png" />
                                <p>Xóa bạn bè</p>
                            </div>
                        </div>
                    </>}>
                        <div><Image width={16} height={16} preview={false} src="/crm/3_cham.png" /> <span style={{ color: '#4C5BD4', fontWeight: '500' }}>Chức năng</span></div>
                    </Tooltip>
                </>
            ),
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

export default TableDataFaceBookListAcc;
