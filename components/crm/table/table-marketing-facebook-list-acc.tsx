// import React from "react";
import { Table, Tooltip, Button, Switch, Image, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import styles from "../marketing/facebook/marketing.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, currentUserChat, changeUserSlice } from "../redux/userFacebook/userSlice";
import { ModalDel } from "../marketing/facebook/facebook_modal";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

interface DataType {
    key: React.Key;
    id: number;
    ep_id: number;
    password: string;
    note: string;
    isDoing: boolean;
}

export const data: DataType[] = [];

interface TableDataFaceBookListAcc {
    setOpenModalUpdate: Function
    setOpenModalDel: Function
    setOpenModalOtpAcc: Function
    setSelected: (value: boolean) => void;
    setNumberSelected: any;
}

const TableDataFaceBookListAcc: React.FC<TableDataFaceBookListAcc> = ({ setSelected, openModallOtpAcc, setOpenModalOtpAcc, setOpenModalDel, setOpenModalUpdate }: any) => {
    const listUserFacebook = useSelector((state: any) => state.userFacebook.user);
    const changeUser = useSelector((state: any) => state.userFacebook.isChange)
    const total = useSelector((state: any) => state.userFacebook.total);
    const dispatch = useDispatch();
    const [ dataTable, setDataTable ] = useState<any>();
    const [ logout, setLogout ] = useState<Boolean>(false);
    const [ idDelete, setIdDelete ] = useState<string>();
    
    const pagination = {
        total: data.length, // Tổng số bản ghi
        pageSize: 10, // Số bản ghi trên mỗi trang
        showSizeChanger: true,
        // Các cài đặt khác của pagination
      };

      const handlePageChange = (page: number, pageSize: number) => {
        if(page * pageSize < listUserFacebook.length ) {
            setDataTable(listUserFacebook.slice(page * pageSize - pageSize, page * pageSize))
        }
        else  if(listUserFacebook.length < page * pageSize && listUserFacebook.length > page * pageSize - pageSize){
            setDataTable(listUserFacebook.slice(page * pageSize - pageSize, listUserFacebook.length))
        }
        
      };
    const columns: ColumnsType<DataType> = [
        {
            title: "STT",
            render: (text: any, record: any, index: number) => {
                return <>{index + 1}</>;
              },
            key: "id",
            width: 70,
        },
        {
            title: "ID",
            dataIndex: "ID_chat",
            width: 150
        },
        {
            title: "Tải khoản",
            
            render: (record) => (
                <div >
                    <div className={styles.user_info} >
                        <Image
                            style={{ borderRadius: '50px' }}
                            preview={false}
                            width={50}
                            height={50}
                            src={record.url_img_login ?  record.url_img_login : "/crm/zalo_ava_2.svg"}
                            alt="hungha365.com" />
                        <p>
                            {record.name_login}
                        </p>
                    </div>
                </div>

            ),
            key: "info",
            width: 285
        },

        {
            title: "Mật khẩu",
            dataIndex: "password",
            key: 'password',
            width: 160,
            render: (record) => <span>*************</span>
        },
        {
            title: "Trạng thái",
            width: 150,
            render: (record) => <span style={{ color: '#34B632' }}>{record.status_login ? 'Đang hoạt động' : 'Không hoạt động'}</span>,
        },
        {
            title: "Ghi chú",
            dataIndex: "note",
            key: "note",
            width: 180,
        },
        {
            title: "Chức năng",
            width: 120,
            fixed: 'right',
            render: (record) => (
                <>
                    <Tooltip color="white" placement="top" title={<>
                        <div className={styles.table_action_facebook}>
                            <div onClick={() =>  dispatch(currentUserChat(record))}>
                                <Image preview={false} width={28} height={28} src="/crm/img/marketing/truy_cap.png" />
                                <p>Truy cập</p>
                            </div>
                            <div onClick={() => {
                                setOpenModalUpdate(true)
                            }}>
                                <Image preview={false} width={28} height={28} src="/crm/img/marketing/cap_nhat_thong_tin.png" />
                                <p>Cập nhật thông tin</p>
                            </div>
                            <div onClick={() => {
                                setOpenModalOtpAcc(true)
                            }}>
                                <Image preview={false} width={28} height={28} src="/crm/img/marketing/xac_thuc_otp.png" />
                                <p>Mã xác thực OTP</p>
                            </div>
                            <div onClick={() => {
                                console.log('record?.id_user_login',record, record?.id_user_login);
                                setIdDelete(record?.id_user_login)
                                setLogout(true)
                            }}>
                                <Image preview={false} width={28} height={28} src="/crm/icon-logout.svg" />
                                <p>Đăng xuất</p>
                            </div>
                            <div onClick={() => {
                                
                                setOpenModalDel(true)
                            }}>
                                <Image preview={false} width={28} height={28} src="/crm/img/marketing/xoa_tai_khoan.png" />
                                <p>Xóa tài khoản</p>
                            </div>
                        </div>
                    </>}>
                        <div><Image width={16} height={16} preview={false} src="/crm/3_cham.png" /> <span style={{ color: '#4C5BD4', fontWeight: '500' }}>Tùy chọn</span></div>
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

    const getAllUser = async () => {
        // Split the token into parts
        const token:any = Cookies.get("token_base365");
        const parts = token.split('.');
        // Decode the payload (second part)
        const payload:any = jwtDecode(token);
        console.log('payload', payload);
        // Extract the ID from the payload
        const id = payload?.data?._id;
        const response = await fetch("/crm/api/get_all_user", {
            method: 'POST',
            body: JSON.stringify({
                ID_chat: id.toString() 
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then(res => res.json()).then((data) => data);
          if(response?.data) {
            setDataTable(response.data.res)
            dispatch(changeUserSlice(response.data.res || []))
           
          }
    };

  

    const handleDel = async () => {
        const response = await fetch("/crm/api/logout_facebook", {
            method: 'POST',
            body: JSON.stringify({
              id_user_login: idDelete
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then(res => res.json()).then((data) => data);
      
          if(response.data) {
            await getAllUser()
            return '1'
          }
    }

    useEffect(() => {
        getAllUser()
    }, [changeUser])
    return (
        <div style={{ marginTop: "20px" }}>
            <Table
                className="marketing_table_custom"
                columns={columns}
                dataSource={dataTable}
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
                                <span>Tổng số: {dataTable?.length ? dataTable.length : 0} Tài khoản</span>
                            </div>
                            <div className={styles.pagination}>
                                <Pagination showLessItems size="small" pageSize={10} total={dataTable?.length ? dataTable.length : 0} {...pagination}
                                onChange={handlePageChange} />
                                <ModalDel
                                handleDel={ async () => await handleDel()}
                                openModalDel={logout}
                                setOpenModalDel={() => setLogout(false)}
                                text={"Bạn chắc chắn muốn đăng xuất tài khoản này?"}
                                textSuccess={"Đăng xuất thành công"}
                            />
                            </div>
                        </div>
                    </>
                )}
            />

        </div>
    );
};

export default TableDataFaceBookListAcc;