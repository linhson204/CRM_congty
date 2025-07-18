import React from "react";
import { Table, Input, Button } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from "antd/es/table";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import dayjs from "dayjs"
import styles from "./css/table.module.css";
import { SelectSingleAndOption } from "@/components/commodity/select";
import jwt_decode from "jwt-decode";


interface DataType {
    key: React.Key;
    id: number;
    idFromNTD:number;
    nameFromNTD:string;
    idToNTD:number;
    nameToNTD:string;
    siteFrom:number;
    siteTo:number;
    point:number;
}



interface TableDataEmailFormProps {
    setSelected: (value: boolean) => void;
    setNumberSelected: any;
}


const TableDataEmailForm: React.FC<TableDataEmailFormProps> = (any) => {
    const dataSite = [
        {
            value: 1,
            label: "Work247"
        },
        {
            value: 2,
            label: "Vieclam88"
        },
        {
            value: 3,
            label: "Tuyendung3s"
        },
        {
            value: 4,
            label: "Joblike"
        },
        {
            value: 5,
            label: "Timviec365"
        }
    ]
    const currentToken = Cookies.get('token_base365')
    const decode: any = jwt_decode(currentToken)
    const [dataSource, setDataSource] = useState([])
    const [pageSize, setPageSize] = useState(10)
    const [formData, setFormData] = useState<any>({});


    const columns: ColumnsType<DataType> = [
        {
            title: "STT",
            width: 100,
            dataIndex: "index",
        },
        {
            title: "ID",
            width: 100,
            dataIndex: "idCV",
        },
        {
            title: "Chuyên viên",
            dataIndex: "userName",
            width: 250,
        },
        {
            title: "Tổ chức",
            dataIndex: "organizeDetailName",
            width: 250,
        },
        {
            title: "Nhà tuyển dụng (chuyển điểm)",
            dataIndex: "userName",
            width: 250,
            render: (text, record) => (
                <div>
                    <p>{`${record?.nameFromNTD}-${record?.idFromNTD} `}</p>
                    <p style={{color:"blue"}}>{`(${dataSite[record?.siteFrom -1]?.label || 'Chưa cập nhật'})`}</p>
                </div>

            )
        },
        {
            title: "Nhà tuyển dụng (nhận điểm)",
            dataIndex: "userName",
            width: 250,
            render: (text, record) => (
                <div>
                    <p>{`${record?.nameToNTD}-${record?.idToNTD} `}</p>
                    <p style={{color:"blue"}}>{`(${dataSite[record?.siteTo -1]?.label || 'Chưa cập nhật'})`}</p>
                </div>

            )
        },
        {
            title: "Điểm",
            dataIndex: "point",
            width: 250,
        },
        {
            title: "Ngày chuyển",
            dataIndex: "createdAt",
            width: 250,
        },
    ];



    const fetchAPI = async (conditions) => {
        const res = await axios.post('https://api.timviec365.vn/api/crm/points/getListPointMove',
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

                data = data.sort((a, b) => new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime())
                data.map((e, index) => {
                    e.index = index + 1
                    e.createdAt = dayjs(e.createdAt).format("DD-MM-YYYY")
                })
                console.log("checkdataa",data)
                setDataSource(data)
            } catch (error) {
                console.log("error", error)
                window.alert(error?.message)
            }
        }
        getData()
    }, [])



    return (
        <>

            <div style={{ marginTop: "20px" }}>

                <div style={{ display: "flex", width: "100%" }}>
                    <div style={{ width: "40%" }}>
                        <SelectSingleAndOption
                            title="Site"
                            data={[
                                {
                                    value: 1,
                                    label: "Work247"
                                },
                                {
                                    value: 2,
                                    label: "Vieclam88"
                                },
                                {
                                    value: 3,
                                    label: "Tuyendung3s"
                                },
                                {
                                    value: 4,
                                    label: "Joblike"
                                },
                                {
                                    value: 5,
                                    label: "Timviec365"
                                }
                            ]}
                            setFormData={setFormData}
                            formData={formData}
                            name={"IdNTD"}
                            placeholder="Chọn site"
                        />
                    </div>
                    <div style={{ width: "40%", marginRight: "30px" }}>
                        <label style={{
                            marginLeft: "20px",
                            color: "#474747",
                            fontSize: "16px",
                            lineHeight: "19px",
                            fontFamily: "Roboto-Medium"
                        }}>ID Nhà tuyển dụng</label>

                        <Input
                            className={styles.date_picker}
                            placeholder="Nhập ID Nhà tuyển dụng" />
                    </div>

                    <div style={{ width: "20%", marginRight: "30px",marginTop:"28px" }}>
                    
                        <Button className={styles.date_picker} type="primary" icon={<SearchOutlined />} >
                            Tìm kiếm
                        </Button>
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
                <div className="main__footer_new flex_between" id="" style={{ marginTop: "20px" }}>
                    <div className="show_number_item">
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
                    <div className="total">
                        Tổng số: <b>{dataSource.length}</b> Mẫu email
                    </div>
                </div>
            </div >
        </>
    );
};

export default TableDataEmailForm;
