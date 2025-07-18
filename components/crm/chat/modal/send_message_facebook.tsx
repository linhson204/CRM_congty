import { Button,  Form, Modal, Select, Input, message, Upload } from "antd";
const { TextArea } = Input;
import styles from "./modal.module.css";
import type { UploadProps } from "antd";
import React, { useEffect, useState } from "react";
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import axios from "axios";
export default function DetailMail({ isOpen, setIsOpen, id_chat, openMail, openZalo, link }) {
    const { Option } = Select;
    const [form] = Form.useForm();
    
    const [listAccountFacebook, setListAccountFacebook] = useState<any>([])
    const [openListFacebook, setOpenListFacebook] = useState<any>(false)
    const [accountSend, setAccountSend] = useState<any>(null)
    const [loading, setLoading] = useState<any>(true)


    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader: any = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader?.result?.split(',')[1]);
            reader.onerror = error => reject(error);
        });
    }

    const convertFilesToBase64 = async (fileList) => {
        const base64DataArray = [];
        for (const file of fileList) {
            const base64Data = await fileToBase64(file);
            base64DataArray.push(base64Data);
        }
        return base64DataArray;
    }

    const props: UploadProps = {
        name: "file",
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: "authorization-text",
        },
        accept: "image/*",
        beforeUpload: file => {
            const isWordFile = file.type.startsWith('image/');

            if (!isWordFile) {
                message.error('Chỉ được phép tải ảnh');
            }
            return !isWordFile;
        },

        onChange(info) {
            if (info?.file?.status === "uploading") {
                console.log("Đang upfile")
            }
            else if (info?.file?.status === "error") {

            }
            else if (!info?.file?.status) {
                console.log("vào đây")
                message.success(`Tải file thành công`);
            }
        },
    };
    const propsFile: UploadProps = {
        name: "file",
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: "authorization-text",
        },

        beforeUpload: file => {
            const isWordFile = file.type.startsWith('image/');

            if (isWordFile) {
                message.error('Vui lòng chọn file không phải ảnh');
            }
            return isWordFile;
        },

        onChange(info) {
            console.log("info?.file?.status", info?.file?.status)
            if (info?.file?.status === "uploading") {
                console.log("Đang upfile")
            }
            else if (info?.file?.status === "error") {

            }
            else if (!info?.file?.status) {
                console.log("vào đây")
                message.success(`Tải file thành công`);
            }
        },
    };
    
    

    useEffect(() => {
        const callAPI = async () => {
            try {
                const response = await fetch("/crm/api/facebook/get_list_fb", {
                    method: 'POST',
                    body: JSON.stringify({
                        ID_chat: id_chat
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then(res => res.json()).then((data) => data)

                setListAccountFacebook(response?.data?.res)
                if (response?.data?.res?.length > 0) {
                    setOpenListFacebook(true)
                }
            } catch (error) {
                setListAccountFacebook([])
                console.log("Lỗi get_list_zalo", error)
            }

        }
        callAPI()
    }, [])
    const onSubmit = async (value: any) => {
       
        if (accountSend?.status_login) {
            try {
                setLoading(false)
                let base64Img = []
                let arrNameImg = []
                let base64File = []
                let arrNameFile = []
                if (value?.image?.fileList?.length) {
                    base64Img = await convertFilesToBase64(value?.image?.fileList)
                    
                    arrNameImg = value?.image?.fileList?.map((file: any) => file.name);
                }
                if (value?.file?.fileList?.length) {
                    base64File = await convertFilesToBase64(value?.file?.fileList)
                    arrNameFile = value?.file?.fileList?.map((file: any) => file.name);
                }
                await Promise.all([
                    value?.content && fetch("/crm/api/facebook/send_mess_fb", {
                        method: 'POST',
                        body: JSON.stringify({
                            idLogin: accountSend?.id_user_login,
                            linkFB: value?.link,
                            mess: value?.content,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }),
                    arrNameImg.length && axios.post("/crm/api/facebook/send_image_fb", {
                        idLogin: accountSend?.id_user_login,
                        linkFB: value?.link,
                        urlImg: arrNameImg,
                        imgData: base64Img,
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }),
                    arrNameFile.length && axios.post("/crm/api/facebook/send_file_fb", {
                        idLogin: accountSend?.id_user_login,
                        linkFB: value?.link,
                        urlFileSender: arrNameFile,
                        fileData: base64File,
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                ])
                window.alert("Gửi tin thành công")
                setIsOpen(false)
                setLoading(true)
            } catch (error) {
                setLoading(true)
                window.alert("Gửi không thành công")
            }
        }
        else {
            window.alert("Không có tài khoản Facebook")
        }
    }

    const handleChooseFacebook = (data) => {

        setAccountSend(data)
        setOpenListFacebook(false)
    }
    const handleSendZalo = (data:any) => {
        const parsedData = JSON.parse(data);
        setAccountSend(parsedData)
        setOpenListFacebook(false)
    }


    return (
        <>
            <Modal
                open={isOpen && !openMail && !openZalo}
                title={"Thông tin gửi Facebook"}
                centered
                className={"mdal_cancel email_add_mdal .ant-upload-list-new"}
                onOk={onSubmit}
                onCancel={() => {
                    setIsOpen(false)
                }}

                cancelButtonProps={{ style: { display: "none" } }}
                okButtonProps={{ style: { display: "none" } }}

            >
                <div className={styles.body}>
                    <div>

                        <Form
                            form={form}
                            onFinish={onSubmit}
                        >

                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Người gửi"
                                
                            >
                                <Select
                                    placeholder="Người gửi"
                                    style={{ width: "100%", borderRadius: "0px" }}
                                    onChange={handleSendZalo}
                                    value={accountSend ? `${accountSend.name_login}${accountSend.status_login ? '' : '- Chưa đăng nhập'}` : 'Không có tài khoản Facebook'}

                                >
                                    {listAccountFacebook &&
                                        listAccountFacebook.length > 0 &&
                                        listAccountFacebook.map((e: any, index: number) => (
                                            <Option key={index} value={JSON.stringify(e)}>
                                                {`${e?.name_login}${!e?.status_login ? '- Chưa đăng nhập' : ''}`}
                                            </Option>
                                        ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Người nhận"
                                name={"link"}
                            >
                                <Input
                                    defaultValue={link}
                                    size="large"
                                    style={{ width: "100%", borderRadius: "0px" }}
                                    
                                />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Nội dung"
                                name={"content"}
                            >
                                <TextArea rows={5} placeholder="Nhập nội dung" />
                            </Form.Item>


                            <Form.Item
                                name={"image"}
                                label="Gửi ảnh"
                            >

                                <Upload {...props}>
                                    <Button
                                        icon={
                                            <UploadOutlined
                                                rev={
                                                    "xxx"
                                                }
                                            />
                                        }
                                        size="large"
                                    >
                                        Chọn Ảnh
                                    </Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item
                                name={"file"}
                                label="Gửi File"
                            >

                                <Upload {...propsFile}>
                                    <Button
                                        icon={
                                            <UploadOutlined
                                                rev={
                                                    "xxx"
                                                }
                                            />
                                        }
                                        size="large"
                                    >
                                        Chọn File
                                    </Button>
                                </Upload>
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


                        {openListFacebook && <Modal
                            title="Danh sách tài khoản Facebook"
                            open={true}
                            width={300}
                            maskClosable={true}
                            footer={null}
                        >
                            {listAccountFacebook?.map((e, index) => (
                                <div
                                    key={index}
                                    className={styles.phone_item}
                                    onClick={() => handleChooseFacebook(e)}
                                >
                                    {`${e?.name_login}${!e?.status_login ? '- Chưa đăng nhập' : ''}`}
                                </div>
                            ))}
                        </Modal>}
                    </div>
                </div >
            </Modal >

        </>
    )
}
