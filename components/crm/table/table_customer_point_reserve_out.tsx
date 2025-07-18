import React from "react";
import { Table, Modal, Select, DatePicker, Input, Button, Form } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from "antd/es/table";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import dayjs from "dayjs"
import styles from "./css/table.module.css";
import { SelectSingleAndOption } from "@/components/commodity/select";
import { axiosQLC } from "@/utils/api/api_qlc";
import jwt_decode from "jwt-decode";
import { ZoomOutOutlined, LoadingOutlined } from '@ant-design/icons';



interface DataType {
    key: React.Key;
    id: number;
    creator: string;
    update: string;
    timeupdate: string;
    nameNTD: string,
    idNTD: number;
    pointOut: number;
    detail: any;
    detailPointOut: any;
    dateReserve: any;
    site: number;
}



interface DetailPointOut {
    point: number,
    date: number,
    createAt: string
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
    const [form] = Form.useForm();
    const currentToken = Cookies.get('token_base365')
    const decode: any = jwt_decode(currentToken)
    const [dataSource, setDataSource] = useState([])
    const [pageSize, setPageSize] = useState(10)
    const [detailPointOut, setdetailPointOut] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState<any>({});
    const [openPointOut, setOpenPointOut] = useState<any>(false);
    const [pointOutMax, setPointOutMax] = useState<any>(0);
    const [dateOutMax, setDateOutMax] = useState<any>(0);
    const [status, setStatus] = useState<any>(true)
    const [dataPointOut, setDataPointOut] = useState<any>({})

    const handleOutMax = (dataMax: any) => {
        setDataPointOut(dataMax)
        setOpenPointOut(true)
        setPointOutMax(dataMax?.pointReserve - dataMax?.pointOut)
        let dateUse = 0
        dataMax?.detailPointOut?.map((e: any) => dateUse += e?.date)
        setDateOutMax(dataMax?.dateReserve - dateUse)
    }

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
            title: "Nhà tuyển dụng",
            dataIndex: "userName",
            width: 250,
            render: (text, record) => (
                <div>
                    <p>{`${record?.nameNTD}-${record?.idNTD} `}</p>
                    <p style={{ color: "blue" }}>{`(${dataSite[record?.site - 1]?.label || 'Chưa cập nhật'})`}</p>
                </div>

            )
        },
        {
            title: "Điểm bảo lưu",
            dataIndex: "pointReserve",
            width: 250,
        },
        {
            title: "Thời hạn",
            dataIndex: "dateReserve",
            width: 250,
            render: (text, record) => (
                <div>
                    <p>{`${record?.dateReserve} (ngày)`}</p>
                </div>

            )
        },
        {
            title: "Rút điểm",
            dataIndex: "userName",
            width: 250,
            render: (text, record) => (
                <div>
                    <p>{record?.pointOut}</p>
                    <a style={{ color: "blue" }} onClick={() => handleDetail(record?.detailPointOut)}>Xem chi tiết</a>
                </div>

            )
        },
        {
            title: "Ngày bảo lưu",
            dataIndex: "createdAt",
            width: 250,
        },
        {
            title: "Rút điểm",
            dataIndex: "operation",
            width: 150,
            render: (text, record) => (
                <ZoomOutOutlined onClick={() => handleOutMax(record)} />

            )



        },
    ];

    const columnsPointOut: ColumnsType<DetailPointOut> = [
        {
            title: "STT",
            width: 100,
            dataIndex: "id",
        },
        {
            title: "Điểm",
            width: 100,
            dataIndex: "point",
        },
        {
            title: "Thời hạn",
            width: 100,
            dataIndex: "date",
            render: (text, record) => (
                <div>
                    <p>{`${record?.date} (ngày)`}</p>
                </div>

            )
        },
        {
            title: "Ngày rút",
            width: 100,
            dataIndex: "createAt",
        },

    ];

    const handleDetail = (data) => {
        const arr = []
        data.forEach((e, index) => {
            arr.push({
                id: index + 1,
                ...e
            })
        })
        setdetailPointOut(arr)
        setIsOpen(true)
    }

    const fetchAPI = async (conditions) => {
        const res = await axios.post('https://api.timviec365.vn/api/crm/points/getListPoint',
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
                    e?.detailPointOut?.map(e_d => e_d.createAt = dayjs(e_d.createAt).format("DD-MM-YYYY"))
                })
                console.log("checkdataa", data)
                setDataSource(data)
            } catch (error) {
                console.log("error", error)
                window.alert(error?.message)
            }
        }
        getData()
    }, [])


    const onSubmit = (value) => {
        const call = async () => {
            try {
                const { point } = value
                if (pointOutMax < point) {
                    window.alert(`Số điểm rút không được vượt quá ${pointOutMax} điểm`)
                } else {

                    await axios.post('https://api.timviec365.vn/api/crm/points/createPointOut',
                        {
                            site: dataPointOut?.site,
                            id: dataPointOut?.id,
                            pointOut: point
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${currentToken}`
                            }
                        }
                    )
                    window.alert("Rút thành công")
                    form.resetFields()
                    setOpenPointOut(false)
                    setPointOutMax(0)
                    setDateOutMax(0)
                }

            } catch (error) {

            }
        }

        call()
    }


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

                    <div style={{ width: "20%", marginRight: "30px", marginTop: "28px" }}>

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
            {

                < Modal
                    open={isOpen}
                    onCancel={() => setIsOpen(false)}
                    footer={null}
                >

                    <Table
                        columns={columnsPointOut}
                        dataSource={detailPointOut}
                        bordered
                        scroll={{ y: 300 }}
                        pagination={{
                            pageSize: 1000000,
                            showSizeChanger: true,
                            showQuickJumper: true
                        }}

                    />

                </Modal >

            }

            {
                <Modal
                    open={openPointOut}
                    title={"Rút điểm"}
                    centered
                    className={"mdal_cancel email_add_mdal .ant-upload-list-new"}
                    onOk={onSubmit}
                    onCancel={() => {
                        form.resetFields()
                        setOpenPointOut(false)
                        setPointOutMax(0)
                        setDateOutMax(0)

                    }}
                    cancelButtonProps={{ style: { display: "none" } }}
                    okButtonProps={{ style: { display: "none" } }}
                >
                    <div className={styles.openPointOut}>
                        <div>
                            <Form form={form} onFinish={onSubmit} >

                                <Form.Item
                                    labelCol={{ span: 24 }}
                                    label="Điểm"
                                    name={"point"}
                                >
                                    <Input
                                        size="large"
                                        placeholder="Nhập điểm muốn rút"
                                        style={{ width: "100%" }}
                                    />

                                </Form.Item>
                                <span style={{ color: "red" }}>Tối đa {pointOutMax} điểm</span>
                                {status ? <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "20px",
                                    }}
                                >
                                    <button type="button" className={styles.huyb} onClick={() => setOpenPointOut(false)}>
                                        <p className={styles.texthuyb}>Huỷ</p>
                                    </button>

                                    <button className={styles.luu} type="submit">
                                        <p className={styles.textluu}>Rút</p>
                                    </button>


                                </div> : <div style={{ display: "flex", justifyContent: "center" }}><LoadingOutlined style={{ fontSize: 30 }} /></div>}
                            </Form>
                        </div>
                    </div >

                </Modal >
            }



        </>
    );
};

export default TableDataEmailForm;
