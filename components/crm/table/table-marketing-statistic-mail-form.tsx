import React from "react";
import { Table, Modal, Select, DatePicker } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
import MarketingEmailFormActionTable from "../marketing/email/email_form_action_table";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import dayjs from "dayjs"
import styles from "./css/table.module.css";
import { SelectSingleAndOption } from "@/components/commodity/select";
import { axiosQLC } from "@/utils/api/api_qlc";
import jwt_decode from "jwt-decode";

interface DataType {
    key: React.Key;
    id: number;
    creator: string;
    update: string;
    timeupdate: string;
    send_mail: SendMailType[];
    quantity: number;
}
interface SendMailType {
    id: number,
    email: string
}

// export const data: DataType[] = [];
// for (let i = 0; i < 100; i++) {
//     data.push({
//         key: i,
//         id: i + 1,

//         creator: "Công ty Cổ phần Thanh toán Hưng Hà",
//         update: "Chưa cập nhật",
//         timeupdate: "Chưa cập nhật",
//     });
// };



interface TableDataEmailFormProps {
    setSelected: (value: boolean) => void;
    setNumberSelected: any;
}


const TableDataEmailForm: React.FC<TableDataEmailFormProps> = (any) => {

    const currentToken = Cookies.get('token_base365')
    const decode: any = jwt_decode(currentToken)
    const com_id = decode?.data?.com_id
    const [company_id, setCompanyId] = useState(0);
    const [listDepartment, setListDepartment] = useState([]);
    const [dataSource, setDataSource] = useState([])
    const [pageSize, setPageSize] = useState(10)
    const [sendMail, setSendMail] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState<any>({});
    const [listEmp, setListEmp] = useState([]);
    const [total, setTotal] = useState(0);
    const [date, setDate] = useState<any>(null);
    useEffect(() => {
        if (currentToken) {
            const decodedToken: any = jwt_decode(currentToken);
            setCompanyId(decodedToken?.data?.com_id);
        }
    }, []);

    const getListNVKDofDepartment = () => {
        console.log("formData", formData)
        axiosQLC
            .post("/managerUser/listUser", {
                ...formData,
                pageSize: 1000000
            })
            .then((res) => {
                setListEmp(
                    res.data.data.data?.map((emp) => ({
                        value: emp._id,
                        label: `${emp._id}. ${emp.userName}`,
                        phoneTK: emp.phoneTK,
                    }))
                );
            })
            .catch((err) => console.log("errgetListNVKDofDepartment", err));
    };

    useEffect(() => {
        if (com_id) {
            getListNVKDofDepartment();
        }
    }, [formData.listOrganizeDetailId, com_id]);



    useEffect(() => {

        const getData = async () => {
            try {
                const conditions: any = {}

                if (formData?.IdCRM) conditions.user_id = formData?.IdCRM
                if (formData?.listOrganizeDetailId) conditions.listOrganizeDetailId = formData?.listOrganizeDetailId
                if (date) conditions.date = date
                let data = await fetchAPI(conditions)

                data = data.sort((a, b) => new Date(b?.create_time).getTime() - new Date(a?.create_time).getTime())
                data.map((e, index) => {
                    e.index = index + 1
                    e.create_time = dayjs(e.create_time).format("DD-MM-YYYY")
                })

                let total = 0
                const arr: any = data.reduce((arr: any, currentValue) => {
                    const findData = arr?.find(e => e?.user_id === currentValue.user_id)
                    if (findData) {
                        total += currentValue?.send_mail?.length
                        findData.quantity += currentValue?.send_mail?.length
                    }
                    else {
                        total += currentValue?.send_mail?.length
                        arr.push({
                            index: currentValue?.index,
                            user_id: currentValue?.user_id,
                            userName: currentValue?.userName,
                            organizeDetailName: currentValue?.organizeDetailName,
                            quantity: currentValue?.send_mail?.length
                        })
                    }

                    return arr
                }, [])

                setDataSource(arr)
                setTotal(total)
            } catch (error) {
                console.log("error", error)
                window.alert(error?.message)
            }
        }
        getData()

    }, [formData, date]);

    const columns: ColumnsType<DataType> = [
        {
            title: "STT",
            width: 100,
            dataIndex: "index",
        },
        {
            title: "ID",
            width: 100,
            dataIndex: "user_id",
        },
        {
            title: "Người gửi",
            dataIndex: "userName",
            width: 250,
        },
        {
            title: "Tổ chức",
            dataIndex: "organizeDetailName",
            width: 250,
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            width: 250,
        },
    ];

    const columns_mail: ColumnsType<SendMailType> = [
        {
            title: "STT",
            width: 100,
            dataIndex: "id",
        },
        {
            title: "Email",
            width: 200,
            dataIndex: "email",
        },
    ];

    const handleDetail = (data) => {
        const arr = []
        data.forEach((e, index) => {
            arr.push({
                id: index + 1,
                email: e
            })
        })
        setSendMail(arr)
        setIsOpen(true)
    }

    const fetchAPI = async (conditions) => {
        const res = await axios.post('https://api.timviec365.vn/api/crm/marketing/email/get_list',
            conditions,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${currentToken}`
                }
            }
        )
        return res?.data?.data?.data
    }

    useEffect(() => {
        const getData = async () => {
            try {
                let data = await fetchAPI({})

                data = data.sort((a, b) => new Date(b?.create_time).getTime() - new Date(a?.create_time).getTime())
                data.map((e, index) => {
                    e.index = index + 1
                    e.create_time = dayjs(e.create_time).format("DD-MM-YYYY")
                })

                let total = 0
                const arr: any = data.reduce((arr: any, currentValue) => {
                    const findData = arr?.find(e => e?.user_id === currentValue.user_id)
                    if (findData) {
                        total += currentValue?.send_mail?.length
                        findData.quantity += currentValue?.send_mail?.length
                    }
                    else {
                        total += currentValue?.send_mail?.length
                        arr.push({
                            index: currentValue?.index,
                            user_id: currentValue?.user_id,
                            userName: currentValue?.userName,
                            organizeDetailName: currentValue?.organizeDetailName,
                            quantity: currentValue?.send_mail?.length
                        })
                    }

                    return arr
                }, [])

                setDataSource(arr)
                setTotal(total)

            } catch (error) {
                console.log("error", error)
                window.alert(error?.message)
            }
        }
        getData()
    }, [])

    useEffect(() => {
        //getlistDepartment
        company_id &&
            axiosQLC
                .post("/organizeDetail/listAll", { com_id: company_id })
                .then((res) =>
                    setListDepartment(
                        res.data.data.data?.map((dp) => ({
                            value: dp.listOrganizeDetailId,
                            label: dp.organizeDetailName,
                        }))
                    )
                )
                .catch((err) => console.log("getListDepartment", err));
    }, [company_id]);


    return (
        <>

            <div style={{ marginTop: "20px" }}>

                <div style={{ display: "flex", width: "100%" }}>


                    <div style={{ width: "33%", marginRight: "30px" }}>
                        <SelectSingleAndOption
                            title="Tổ chức"
                            data={listDepartment}
                            setFormData={setFormData}
                            formData={formData}
                            name={"listOrganizeDetailId"}
                            placeholder="Chọn tổ chức"
                        />
                    </div>
                    <div style={{ width: "33%" }}>
                        <SelectSingleAndOption
                            title="Nhân viên"
                            data={listEmp}
                            setFormData={setFormData}
                            formData={formData}
                            name={"IdCRM"}
                            placeholder="Chọn nhân viên"
                        />
                    </div>
                    <div style={{ width: "33%", marginRight: "30px" }}>
                        <label style={{
                            marginLeft: "20px",
                            color: "#474747",
                            fontSize: "16px",
                            lineHeight: "19px",
                            fontFamily: "Roboto-Medium"
                        }}>Ngày</label>
                        <DatePicker
                            onChange={(value) => setDate(dayjs(value))}
                            className={styles.date_picker}
                            placeholder="Chọn ngày"
                        />
                    </div>
                </div>

                <Table
                    columns={columns}
                    dataSource={dataSource}
                    bordered
                    scroll={{ x: 500, y: 400 }}
                    pagination={{

                        pageSize: pageSize,
                        showSizeChanger: true,
                        showQuickJumper: true
                    }}
                />
                <div className="main__footer_new flex_between" id="" style={{ marginTop: "20px", fontSize: "18px" }}>
                    <div className="show_number_item" style={{ fontSize: "18px" }}>
                        <b>Hiển thị:</b>
                        <select className="show_item" onChange={(event) => setPageSize(Number(event?.target?.value))}>
                            <option value={10}>10 bản ghi trên trang</option>
                            <option value={20}>20 bản ghi trên trang</option>
                            <option value={30}>30 bản ghi trên trang</option>
                            <option value={40}>40 bản ghi trên trang</option>
                            <option value={50}>50 bản ghi trên trang</option>
                            <option value={100}>100 bản ghi trên trang</option>
                        </select>
                    </div>
                    <div className="total" >
                        Tổng thư đã gửi: <b>{total}</b>
                    </div>
                </div>
            </div >
        </>
    );
};

export default TableDataEmailForm;
