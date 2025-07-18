import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import {
    Modal,
    Input,
    Form,
    Select,
} from "antd";
const { Option } = Select;
import type { UploadProps } from "antd";
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
const { TextArea } = Input;
import styles from "../customer_css/setting_call.module.css";
import axios from "axios";
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";

const Add_Setting_Call = ({ open, setOpen, setIsLoad }) => {


    const currentCookie = Cookies.get("token_base365")
    const decodedToken: any = jwt_decode(currentCookie)
    const com_id = decodedToken?.data?.com_id

    const [form] = Form.useForm();
    const [checked, setChecked] = useState<any>(false);
    const [status, setStatus] = useState<any>(true)
    const [listOrg, setListOrg] = useState<any>([])
    const [listUser, setListUser] = useState<any>([])
    const onChange = (checked: boolean) => {
        setChecked(checked);
    };


    useEffect(() => {
        const getAPI = async () => {
            try {
                console.log("com_id", com_id)
                const res = await axios.post("https://api.timviec365.vn/api/qlc/organizeDetail/listAll",
                    {
                        com_id: com_id
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${currentCookie}`,
                            'Content-Type': 'application/json'
                        },
                    }
                )
                console.log("res", res)
                if (res?.status === 200) {
                    setListOrg(res?.data?.data?.data)
                }
            } catch (error) {
                console.log("error", error)
            }
        }
        getAPI()
    }, [])
    useEffect(() => {
        const getAPI = async () => {
            try {
                console.log("com_id", com_id)
                const res = await axios.post("https://api.timviec365.vn/api/qlc/managerUser/listUser",
                    {
                        com_id: com_id,
                        ep_status: "Active",
                        pageSize: 1000000
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${currentCookie}`,
                            'Content-Type': 'application/json'
                        },
                    }
                )
                console.log("res", res)
                if (res?.status === 200) {
                    setListUser(res?.data?.data?.data)
                }
            } catch (error) {
                console.log("error", error)
            }
        }
        getAPI()
    }, [])


    const [tagList, setTagList] = useState([]);
    const [inputValue, setInputValue] = useState('');
    useEffect(() => {
        console.log("tagList", tagList)
    }, [tagList])


    const handleChange = (value) => {
        console.log("vào đây", value)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value) {
            if (value.length) {
                if (emailRegex.test(value[value.length - 1])) setTagList(value);
            }
            else {
                setTagList(value)
            }
        }


    };


    // -----------------------------------------

    const onSubmit = (value: any) => {
        console.log("value", value)
        const call = async () => {
            try {
                setStatus(false)
                const res = await axios.post(`https://api.timviec365.vn/api/crm/customer/setting_call/create`,
                    {
                        list_emp: value?.list_ep?.includes("all") ? [] : value?.list_ep,
                        list_org: value?.list_org?.includes("all") ? [] : value?.list_org,
                        type_call: value?.type_call,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${currentCookie}`,
                            'Content-Type': 'application/json'
                        },
                    }
                )

                window.alert("Thêm thành công")
                setIsLoad(true)
                setOpen(false)
            } catch (error) {
                window.alert("Thêm thất bại")
                setStatus(true)
            }
        }

        call()
    }



    return (
        <>
            <Modal
                open={open}
                title={"Thêm/Sửa"}
                centered
                className={"mdal_cancel email_add_mdal .ant-upload-list-new"}
                onOk={onSubmit}
                onCancel={() => {
                    // form.resetFields()
                    setTagList([])
                    setOpen(false)
                }}
                cancelButtonProps={{ style: { display: "none" } }}
                okButtonProps={{ style: { display: "none" } }}
            >
                <div className={styles.body}>


                    <Form form={form} onFinish={onSubmit}>


                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Tổ chức"
                            name="list_org"
                        >
                            <Select
                                options={[
                                    { label: "Tất cả tổ chức", value: "all" },
                                    ...listOrg?.map((item) => ({
                                        label: item?.organizeDetailName,
                                        value: item?.id,
                                    }))
                                ]}
                                mode="multiple"
                                size="large"
                                showSearch
                                optionFilterProp="label"
                            />
                        </Form.Item>

                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Nhân viên"
                            name="list_ep"
                        >
                            <Select
                                options={[
                                    { label: "Tất cả nhân viên", value: "all" },
                                    ...listUser?.map((item) => ({
                                        label: `${item?.userName} - ${item?._id}`,
                                        value: item?._id,
                                    })),
                                ]}
                                mode="multiple"
                                size="large"
                                showSearch
                                optionFilterProp="label"
                            />
                        </Form.Item>

                        <Form.Item
                            labelCol={{ span: 24 }}
                            label="Loại"
                            name="type_call"
                            style={{ borderRadius: "8px" }}
                        >
                            <Select

                                options={[
                                    { value: 3, label: <span>Tất cả</span> },
                                    { value: 1, label: <span>Gọi module</span> },
                                    { value: 2, label: <span>Gọi tổng đài</span> }
                                ]}
                                size="large"
                                showSearch
                                optionFilterProp="label"
                            />
                        </Form.Item>
                        {status ? <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "20px",
                            }}
                        >
                            <button className={styles.huyb} onClick={() => setOpen(false)}>
                                <p className={styles.texthuyb}>Huỷ</p>
                            </button>

                            <button className={styles.luu} type="submit">
                                <p className={styles.textluu}>Gửi</p>
                            </button>


                        </div> : <div style={{ display: "flex", justifyContent: "center" }}><LoadingOutlined style={{ fontSize: 30 }} /></div>}
                    </Form>

                </div >

            </Modal >

        </>
    )
}

export default Add_Setting_Call