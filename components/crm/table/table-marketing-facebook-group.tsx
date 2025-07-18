// import React from "react";
import { Table, Tooltip, Button, Switch, Image, Pagination, Checkbox } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import styles from "../marketing/facebook/marketing.module.css";

interface DataType {
    key: React.Key;
    id: number;
    uid: string;
    
    member: number;
    status: string;
}

export const data: DataType[] = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        id: i + 1,
       uid: 'HỘI NHỮNG NGƯỜI CẦN TÌM VIỆC LÀM TẠI MIỀN BẮC',
        
        member: 20000,
        status: 'Hoạt động',
    });
};



interface TableDataFaceBookListAcc {
    setOpenModalUpdate: Function
    setOpenModalLeave: Function
    setOpenModalAddToGroup: Function
    setSelected: (value: boolean) => void;
    setNumberSelected: any;
    setOpenModalAddFriendInGroup:any;
    setOpenModalPost:any;
}

const TableDataFaceBookListAcc: React.FC<TableDataFaceBookListAcc> = ({ setSelected, setOpenModalAddToGroup, setOpenModalLeave, setOpenModalUpdate,setOpenModalAddFriendInGroup,setOpenModalPost }: any) => {
    
    const columns: ColumnsType<DataType> = [
        {
            title: "STT",
            dataIndex: "id",
            key: "id",
            width: 70,
        },
        {
            title: "Tên nhóm",
            dataIndex: "uid",
            width: 675
        },
       

        {
            title: "Trạng thái",
            dataIndex: "status",
            key: 'password',
            width: 147,
            render: (status) => (
               
                
                <div style={{color:'#34B632'}}>{status}</div>

            )
        },
        {
            title: "Số lượng thành viên",
            dataIndex: "member",
            width: 189
        },
        {
            title: "Chức năng",
            width: 120,
            fixed: 'right',
            render: () => (
                <>
                    <Tooltip color="white" placement="top" title={<>
                        <div className={styles.table_action_facebook}>
                            <div onClick={() => {
                                setOpenModalAddFriendInGroup(true)
                            }}> 
                                <Image preview={false} width={28} height={28} src="/crm/img/marketing/ket_ban.png" />
                                <p>Kết bạn với thành viên nhóm</p>
                            </div>
                            <div onClick={() => {
                                setOpenModalAddToGroup(true)
                            }}>
                                <Image preview={false} width={28} height={28} src="/crm/img/marketing/them_ban.png" />
                                <p>Thêm bạn bè vào nhóm</p>
                            </div>
                            <div onClick={() => {
                                setOpenModalPost(true)
                            }}>
                                <Image preview={false} width={28} height={28} src="/crm/img/marketing/dang_bai.svg" />
                                <p>Đăng bài</p>
                            </div>
                            <div onClick={() => {
                                setOpenModalLeave(true)
                            }}>
                                <Image preview={false} width={28} height={28} src="/crm/img/marketing/roi_nhom.svg" />
                                <p>Rời nhóm</p>
                            </div>
                        </div>
                    </>} overlayStyle={{maxWidth: '500px'}} >
                        <div><Image width={16} height={16} preview={false} src="/crm/3_cham.png" /> <span style={{ color: '#4C5BD4', fontWeight: '500' }}>Tùy chọn</span></div>
                    </Tooltip>
                </>
            ),
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
              
                scroll={{ x: 'max-content', y: 500 }}
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
                                <span>Tổng số: {data ? data.length : 0} nhóm</span>
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
