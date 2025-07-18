import { Modal, Table, Popover, Button } from "antd";
import React, { use, useContext, useEffect, useRef, useState } from "react";
import { useFormData } from "../../context/formDataContext";
import type { ColumnsType } from "antd/es/table";
import { axiosCRMv2 } from "@/utils/api/api_crm";
import { convertStringToTimestamp } from "@/utils/function";
import styles from "../../customer/group_customer/customer_group.module.css";
import Add_Setting_Call from "./customer_modal_add_setting_call"
import axios from "axios";
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";
import { DeleteOutlined } from '@ant-design/icons';

type TypeListCustomer = {
    key: React.Key;
    cus_id: number;
    name: string;
    phone_number: string;
    email: string | null;
};
export default function ModalDataCustomerKD({
    isOpenModalDataCustomerKD,
    setIsOpenModalDataCustomerKD,
}) {
    const { formData, setFormData } = useContext(useFormData);
    const [isOpenTakeListCustomer, setIsOpenTakeListCustomer] = useState(false);
    const [dataCustomer, setDataCustomer] = useState<any>([]);
    const [customerList, setCustomerList] = useState<any>([]);
    const [isOpenModalAdd, setIsOpenModalAdd] = useState<any>(false)
    const [open, setOpen] = useState<any>(false)
    const [isLoad, setIsLoad] = useState<any>(false)
    const [columns, setColumns] = useState<ColumnsType<any>>([
        { key: "index", dataIndex: "index", title: "STT", width: 150 },
        {
            key: "list_org",
            dataIndex: "list_org",
            title: "Tổ chức",
            width: 200,
            render: (text, record) => (
                <Popover
                    content={
                        <div style={{ padding: "10px" }}>
                            {text.map((p) => (
                                <p>{p}</p>
                            ))}
                        </div>
                    }
                >
                    {text.length > 0 ? " Xem thêm" : "Tất cả"}
                </Popover>
            ),
        },
        {
            key: "list_emp",
            dataIndex: "list_emp",
            title: "Nhân viên",
            width: 150,
            render: (text, record) => (
                <Popover
                    content={
                        <div style={{ padding: "10px" }}>
                            {text.map((p) => (
                                <p>{p}</p>
                            ))}
                        </div>
                    }
                >
                    {text.length > 0 ? " Xem thêm" : "Tất cả"}
                </Popover>
            ),
        },
        {
            key: "type_call_name",
            dataIndex: "type_call_name",
            title: "Loại",
            width: 200,
        },
        {
            key: "id",
            dataIndex: "id",
            title: "Hành động",
            width: 50,
            render: (text, record) => (
                <button
                    type="button"
                    className={`${styles.dropbtn_add} flex_align_center`}

                    onClick={() => {
                        handleDelete(text)
                    }}
                >

                    <DeleteOutlined />
                </button>
            ),
        },
    ]);

    useEffect(() => {
        if (isLoad) {
            fetchAPI()
            setIsLoad(false)
        }
    }, [isLoad])

    const handleDelete = (record) => {
        const getAPI = async () => {
            try {
                await axios.post('https://api.timviec365.vn/api/crm/customer/setting_call/delete',
                    {
                        id: Number(record)
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${currentCookie}`,
                            'Content-Type': 'application/json'
                        },
                    })
                window.alert("Xóa thành công")
                fetchAPI()
            } catch (error) {
                console.log("error", error)
                window.alert("Xóa thất bại")
            }
        }
        getAPI()
    }
    const checkTitle = useRef({});
    const summaryTotalRef = useRef([]);
    const listCustomerColumns: ColumnsType<TypeListCustomer> = [
        { key: "cus_id", dataIndex: "cus_id", title: "ID", width: 150 },
        {
            key: "name",
            dataIndex: "name",
            title: "Họ và tên",
            width: 350,
        },
        {
            key: "phone_number",
            dataIndex: "phone_number",
            title: "Số điện thoại",
            width: 150,
        },
        {
            key: "email",
            dataIndex: "email",
            title: "Email",
            width: 250,
            render: (text: string) => {
                return text ? text : "Chưa có";
            },
        },
    ];
    const handleDataTable = (dataRes: any) => {
        const uniqueArray = [];
        const totalSummary = { userName: "Tổng" };
        dataRes?.forEach((item) => {
            const rowData = {
                userName: `${item.idQLC}. ${item.userName}`,
                idQLC: item.idQLC,
            };

            item.listFrom.forEach((itemForm, index) => {
                rowData[itemForm._id] = item.listCount[index];
                totalSummary[itemForm._id] =
                    Number(totalSummary[itemForm._id] || 0) +
                    Number(item.listCount[index]);
            });

            uniqueArray.push(rowData);
        });
        console.log("totalSummary", totalSummary);
        setDataCustomer([...uniqueArray, totalSummary]);
        dataRes?.forEach((item) => {
            item.listFrom.forEach((itemFrom) => {
                if (!checkTitle[itemFrom._id]) {
                    checkTitle[itemFrom._id] = true;
                    summaryTotalRef.current.push({
                        title: itemFrom._id.toUpperCase(),
                        dataIndex: itemFrom._id,
                        key: itemFrom._id,
                        width: 150,
                    });
                    setColumns((prevColumns) => [
                        ...prevColumns,
                        {
                            title: itemFrom._id.toUpperCase(),
                            dataIndex: itemFrom._id,
                            key: itemFrom._id,
                            width: 150,
                            render(value, record, index) {
                                return (
                                    <div
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            setIsOpenTakeListCustomer(true);
                                            setFormData((pre) => ({
                                                ...pre,
                                                from: itemFrom._id,
                                                idQLC: record.idQLC,
                                            }));
                                        }}
                                    >
                                        {value}
                                    </div>
                                );
                            },
                        },
                    ]);
                }
            });
        });
        console.log("checkkkkk", summaryTotalRef.current);
    };
    const getDulieuKhachHangKinhDoanh = async () => {
        try {
            const dataRes = await axiosCRMv2(
                "/account/ShowDulieuKhachHangKinhDoanh",
                {
                    start: convertStringToTimestamp(formData.start),
                    end: convertStringToTimestamp(formData.end),
                }
            );
            handleDataTable(dataRes?.listData);
        } catch (error) {
            console.log("getDulieuKhachHangKinhDoanh", error);
        }
    };
    const getTakeListCustomer = async () => {
        try {
            const resData = await axiosCRMv2("/account/takeListCustomer", {
                ...formData,
                start: convertStringToTimestamp(formData.start),
                end: convertStringToTimestamp(formData.end),
            });
            setCustomerList(resData.listCus);
        } catch (error) {
            console.log("getTakeListCustomer", error);
        }
    };
    useEffect(() => {
        formData.idQLC && getTakeListCustomer();
    }, [formData.idQLC, formData.from]);
    useEffect(() => {
        if (formData.start && formData.end) {
            getDulieuKhachHangKinhDoanh();
        }
    }, [formData.start, formData.end]);


    const [listOrg, setListOrg] = useState<any>([])
    const [listUser, setListUser] = useState<any>([])
    const currentCookie = Cookies.get("token_base365")
    const decodedToken: any = jwt_decode(currentCookie)
    const com_id = decodedToken?.data?.com_id



    const fetchAPI = async () => {
        try {
            console.log("com_id", com_id)
            const data = await axios.post('https://api.timviec365.vn/api/crm/customer/setting_call/list',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${currentCookie}`,
                        'Content-Type': 'application/json'
                    },
                })

            const result = data?.data?.data
            result.map((e, index) => {
                e.index = index + 1
                if (e.type_call == 1) e.type_call_name = "Gọi module"
                if (e.type_call == 2) e.type_call_name = "Gọi tổng đài"
                if (e.type_call == 3) e.type_call_name = "Tất cả"
            })
            setDataCustomer(data?.data?.data)
            // result.map(e => {
            //     e.list_org = []

            // })
        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        console.log("vaofffffffffff")
        fetchAPI()
    }, [])


    return (
        <div>
            <Modal
                open={isOpenModalDataCustomerKD}
                className={"mdal_default email_add_mdal shared_factor"}
                title="Danh sách cài đặt"
                onCancel={() => setIsOpenModalDataCustomerKD(false)}
                // footer={null}
                width={800}
            >

                <div className={`${styles.main__control_add}`}>

                    <button
                        type="button"
                        className={`${styles.dropbtn_add} flex_align_center`}
                        style={{ justifyContent: "flex-start", marginBottom: "20px" }}
                        onClick={() => {
                            setIsOpenModalAdd(true)
                            setOpen(true)
                        }}
                    >
                        <img src="/crm/add.svg" />
                        Thêm mới
                    </button>
                </div>



                <Table
                    pagination={{ pageSize: 1000 }}
                    bordered
                    columns={columns}
                    dataSource={dataCustomer}
                    scroll={{ y: 500, x: 1000 }}
                />


                {

                    isOpenModalAdd && (
                        < Add_Setting_Call
                            open={isOpenModalAdd}
                            setOpen={setIsOpenModalAdd}
                            setIsLoad={setIsLoad}
                        />
                    )

                }
            </Modal>

        </div>
    );
}
