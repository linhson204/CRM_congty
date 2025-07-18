import {  Form, Modal, Select, Input } from "antd";
const { TextArea } = Input;
import styles from "./modal.module.css";
import React, { useEffect, useState, useRef } from "react";
import {  LoadingOutlined } from '@ant-design/icons';
import axios from "axios";
export default function DetailMail({ isOpen, setIsOpen, recipientMail, id_chat, phone, openMail,setOpenFB }) {
    const { Option } = Select;
    const [form] = Form.useForm();
    const [listAccountZalo, setListAccountZalo] = useState<any>([])
    const [openListZalo, setOpenListZalo] = useState<any>(false)
    const [accountSend, setAccountSend] = useState<any>(null)
    const [loading, setLoading] = useState<any>(true)
    const initialValues = {
        mail: recipientMail
    }
   

    useEffect(() => {
        const callAPI = async () => {
            try {
                const res = await axios.post(`https://api.timviec365.vn/api/qlc/ai/get_list_zalo`,
                    {
                        id_chat: id_chat.toString()
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                if (res?.status === 200) {
                    setListAccountZalo(res?.data?.data?.data)
                    if (res?.data?.data?.data?.length > 0) {
                        setOpenListZalo(true)
                    }
                }
            } catch (error) {
                console.log("Lỗi get_list_zalo", error)
            }

        }
        callAPI()
    }, [])
    const onSubmit = async (value) => {

        try {
            setLoading(false)
            if (accountSend?.status) {
                const res = await axios.post(`https://api.timviec365.vn/api/qlc/ai/send_message`,
                    {
                        id_chat: id_chat,
                        id_zalo: accountSend?.id_zalo,
                        num_phone: phone,
                        message: value?.content
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                if (res?.status === 200) {

                    window.alert("Gửi tin nhắn zalo thành công")
                    setIsOpen(false)
                    setOpenFB(true)
                }
                else {
                    window.alert("Gửi tin nhắn zalo thất bại")
                    setLoading(true)
                }
            }
            else {
                window.alert("Tài khoản zalo chưa được đăng nhập")
                setLoading(true)
            }

        } catch (error) {
            setLoading(true)
        }
    }

    const handleChooseZalo = (data) => {

        setAccountSend(data)
        setOpenListZalo(false)
    }
    const handleSendZalo = (data) => {
        const parsedData = JSON.parse(data);
        setAccountSend(parsedData)
        setOpenListZalo(false)
    }


    return (
        <>
            <Modal
                open={isOpen && !openMail}
                title={"Thông tin gửi Zalo"}
                centered
                className={"mdal_cancel email_add_mdal .ant-upload-list-new"}
                onOk={onSubmit}
                onCancel={() => {
                    setIsOpen(false)
                    setOpenFB(true)
                }}

                cancelButtonProps={{ style: { display: "none" } }}
                okButtonProps={{ style: { display: "none" } }}

            >
                <div className={styles.body}>
                    <div>

                        <Form
                            form={form}
                            onFinish={onSubmit}
                            initialValues={initialValues}
                        >
                            
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Người gửi"
                            >
                                <Select
                                    placeholder="Người gửi"
                                    style={{ width: "100%", borderRadius: "0px" }}
                                    onChange={handleSendZalo}
                                    value={accountSend ? `${accountSend.name} - ${accountSend.num_phone_zalo}${accountSend.status ? '' : '- Chưa đăng nhập'}` : 'Không có tài khoản zalo'}

                                >
                                    {listAccountZalo &&
                                        listAccountZalo.length > 0 &&
                                        listAccountZalo.map((e: any, index: number) => (
                                            <Option key={index} value={JSON.stringify(e)}>
                                                {`${e?.name} - ${e?.num_phone_zalo}${!e?.status ? '- Chưa đăng nhập' : ''}`}
                                            </Option>
                                        ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Người nhận"
                            >
                                <Input
                                    value={phone}
                                    size="large"
                                    style={{ width: "100%", borderRadius: "0px" }}
                                    disabled
                                />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Nội dung"
                                name={"content"}
                                rules={[{ required: true, message: 'Nội dung không được để trống' }]}
                            >
                                
                                <TextArea rows={5} placeholder="Nhập nội dung" />
                            </Form.Item>
                            


                            


                            {loading ? <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "20px",
                                }}
                            >
                               

                                <button className={styles.luu} type="submit">
                                    <p className={styles.textluu}>Gửi</p>
                                </button>
                            </div> : <div style={{ display: "flex", justifyContent: "center" }}><LoadingOutlined style={{ fontSize: 30 }} /></div>}
                        </Form>


                        {openListZalo && <Modal
                            title="Danh sách tài khoản Zalo"
                            open={true}
                            width={300}
                            maskClosable={true}
                            
                            footer={null}
                        >
                            {listAccountZalo?.map((e, index) => (
                                <div
                                    key={index}
                                    className={styles.phone_item}
                                    onClick={() => handleChooseZalo(e)}
                                >
                                    {`${e?.name} - ${e?.num_phone_zalo}${!e?.status ? '- Chưa đăng nhập' : ''}`}
                                </div>
                            ))}
                        </Modal>}
                    </div>
                </div >
            </Modal >

        </>
    )
}
