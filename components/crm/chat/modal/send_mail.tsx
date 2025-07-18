import { Button, Col, DatePicker, Form, Modal, Row, Select, Input, message, Switch, Upload } from "antd";
const { TextArea } = Input;
import styles from "./modal.module.css";
import type { UploadProps } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import TextEditor from "../ck_editor/text_editor";
export default function DetailMail({ isOpen, setIsOpen, setOpenSMS, setTitle, setContentMail, setTypeSendMail, setFileMail, setSendMail, recipientMail, setOpenZalo,setOpenFB }) {
    const [form] = Form.useForm();
    const [checked, setChecked] = useState<any>(false);
    const [refDes, setrefDes] = useState<any>();
    const props: UploadProps = {
        name: "file",
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: "authorization-text",
        },
        accept: ".docx,.doc",
        beforeUpload: file => {
            const isWordFile = file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            console.log("isWordFile", isWordFile)
            if (!isWordFile) {
                message.error('Chỉ được phép tải lên các tệp Word!');
            }
            return !isWordFile;
        },

        onChange(info) {
            console.log("info======", info?.file)
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === "done") {
                message.success(`Tải file thành công`);
            } else if (info.file.status === "error") {
                message.error(`Tải file thất bại`);
            }
        },
    };
    const initialValues = {
        mail: recipientMail
    }
    const onChange = (checked: boolean) => {
        setChecked(checked);
    };

    const onSubmit = (value) => {
        setTitle(value?.title)
        if (checked) {
            if (value?.file?.fileList?.length) {
                value.file.fileList = value?.file?.fileList?.filter(e => !e.error)
                if (value.file.fileList.length > 1) {
                    window.alert("Chỉ được phép gửi 1 file")
                }
                else {
                    setTypeSendMail(true)
                    setFileMail(value?.file?.fileList[0]?.originFileObj)
                }
            }
        } else {
            setContentMail(refDes)
            setTypeSendMail(false)
        }

        setIsOpen(false)

        setSendMail(true)
    }

    return (
        <>
            <Modal
                open={isOpen}
                title={"Thông tin gửi email"}
                centered
                className={"mdal_cancel email_add_mdal .ant-upload-list-new"}
                onOk={onSubmit}
                onCancel={() => {
                    setIsOpen(false)
                    setOpenZalo(true)
                    // setOpenFB(true)
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
                                label="Người nhận"
                                name={"mail"}
                            >
                                <Input
                                    size="large"
                                    style={{ width: "100%", borderRadius: "0px" }}
                                    disabled
                                />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Tiêu đề"
                                name={"title"}
                                rules={[{ required: true, message: 'Tiêu đề không được để trống' }]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Tiêu đề"
                                    style={{ width: "100%", borderRadius: "0px" }}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Switch defaultChecked={checked} onChange={onChange} />
                                <span style={{ marginLeft: "5px" }}>Gửi file</span>
                            </Form.Item>


                            {
                                !checked ? <Form.Item
                                    labelCol={{ span: 24 }}
                                    label={"Nhập nội dung"}
                                    name={"content"}
                                >

                                    <TextEditor
                                        className={"1"}
                                        refDes={refDes}
                                        setrefDes={setrefDes}
                                    />

                                </Form.Item> : <Form.Item
                                    name={"file"}
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
                                            Chọn File
                                        </Button>
                                    </Upload>
                                </Form.Item>
                            }


                            {1 ? <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "20px",
                                }}
                            >
                                {/* <button className={styles.huyb} onClick={() => {
                                    setIsOpen(false)
                                    setOpenSMS(true)
                                }
                                }>
                                    <p className={styles.texthuyb}>Quay lại</p>
                                </button> */}

                                <button className={styles.luu} type="submit">
                                    <p className={styles.textluu}>Gửi</p>
                                </button>
                            </div> : <div style={{ display: "flex", justifyContent: "center" }}><LoadingOutlined style={{ fontSize: 30 }} /></div>}
                        </Form>
                    </div>
                </div >
            </Modal >

        </>
    )
}