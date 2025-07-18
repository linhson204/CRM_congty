import { Form, Modal, Input } from "antd";
const { TextArea } = Input;
import styles from "./modal.module.css";
import React, { useEffect, useState } from "react";
export default function DetailMail({ isOpen, setIsOpen, openMail, setContentSms, setSendSMS, openZalo,openFB }) {
    const [form] = Form.useForm();
    const onSubmit = (value) => {
        setContentSms(value?.content_mail)
        setIsOpen(false)
        setSendSMS(true)
    }
    return (
        <>
            <Modal
                open={isOpen && !openMail && !openZalo && !openFB}
                title={"Gửi tin nhắn"}
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
                                name={"content_mail"}
                                label="Nội dung"
                            >
                                <TextArea
                                    style={{
                                        resize: "none",
                                        borderRadius: "5px",
                                        border: "3px solid #9f9f9f",
                                    }}
                                    rows={5}
                                    placeholder="Nhập tin nhắn muốn gửi"
                                />
                            </Form.Item>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "20px",
                                }}
                            >
                                <button className={styles.huyb} onClick={() => setIsOpen(false)}>
                                    <p className={styles.texthuyb}>Huỷ</p>
                                </button>

                                <button className={styles.luu} type="submit" >
                                    <p className={styles.textluu}>Tiếp tục</p>
                                </button>

                            </div>
                        </Form>
                    </div>
                </div >
            </Modal >

        </>
    )
}