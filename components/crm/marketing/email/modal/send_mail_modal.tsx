import React, { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx";
import {
    Modal,
    Input,
    Button,
    Form,
    Upload,
    message,
    Switch,
    Select,
    Tag,
} from "antd";
import type { UploadProps } from "antd";
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import styles from "./send_mail_modal.module.css";
import axios from "axios";
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import TextEditor from "../ck_editor/text_editor";
const Send_Mail = ({ open, setOpen, form }) => {
    const [refDes, setrefDes] = useState<any>("123");
    const [checked, setChecked] = useState<any>(false);
    const [status, setStatus] = useState<any>(true)
    const [loadFile, setLoadFile] = useState<any>(true)
    const [loadContentFile, setLoadContentFile] = useState<any>(false)
    const [tagList, setTagList] = useState([]);
    const [mail, setMail] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [connected, setConnected] = useState(false);
    const [currentBlock, setCurrentBlock] = useState(1); // Trạng thái để lưu khối hiện tại

    const peerRef = useRef(null);

    useEffect(() => {
        const arr = [...tagList]
        if (mail.length) {
            mail.map(e => {
                if (!arr.includes(e)) arr.push(e)
            })
            setTagList(arr)
        }

    }, [mail])

    useEffect(() => {
        if (!loadFile) {
            const call = async () => {
                try {
                    const mail_length = tagList.length
                    const data = await axios.post(`https://api.timviec365.vn/api/qlc/ai/convert_file_to_html`,
                        {
                            num_email: mail_length,
                        })

                } catch (error) {

                }
            }
            // call()
        }
    }, [loadFile])

    const onChange = (checked: boolean) => {
        setChecked(checked);
    };

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
                setLoadContentFile(false)
                setLoadFile(false)
                convert_data_file(info.file)
            }
            if (info.file.status === "done") {
                console.log("info.file11122", info.file)
                console.log("tới đây")


            } else if (info.file.status === "error") {
                message.error(`Tải file thất bại`);
                setLoadFile(true)
            }
        },
    };
    const props_send: UploadProps = {
        name: "file",
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: "authorization-text",
        },
        accept: ".xlsx,.xls",
        beforeUpload: file => {
            const isExcel = file.name.endsWith('.xls') || file.name.endsWith('.xlsx');
            if (!isExcel) {
                message.error('Bạn chỉ có thể tải lên file Excel!');
            }
            return !isExcel;
        },

        onChange(info) {
            console.log("info======", info?.file)
            console.log("info.file.status", info.file.status)
            if (info.file.status === "uploading") {
                console.log("Đang upfile")
            }
            else if (info.file.status === "error") {

            } else if (!info.file.status) {

                console.log("vào else =======")
                const file = info.fileList[info.fileList?.length - 1]?.originFileObj
                const reader = new FileReader();
                reader.onload = (event: any) => {
                    const data = new Uint8Array(event.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const excelData = XLSX.utils.sheet_to_json(sheet);

                    // Lấy ra tất cả các địa chỉ email từ dữ liệu Excel
                    const emails: any = excelData.reduce((acc: any, row) => {
                        const keys = Object.keys(row);
                        keys.forEach(key => {
                            const value = row[key];
                            // Kiểm tra nếu giá trị của cột là một địa chỉ email
                            if (typeof value === 'string' && value.includes('@')) {
                                var emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
                                if (emailRegex.test(value)) acc.push(value);

                            }
                        });
                        return acc;
                    }, []);
                    console.log("emails", emails)
                    if (emails && emails.length) {
                        const arr = [...tagList, ...emails]
                        setTagList(arr)
                    }
                };
                reader.readAsArrayBuffer(file);

                message.success(`Tải dữ liệu mail thành công`);

            }
        },
    };

    const handleChange = (value) => {
        console.log("vào đây", value)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value) {
            console.log("value", value)
            if (value.length) {
                if (emailRegex.test(value[value.length - 1])) setMail(value);
            }
            else {
                setMail(value)
            }
        }


    };

    const convert_data_file = async (file) => {
        try {
            const mail_length = tagList.length
            console.log("call API")
            const data = await axios.post(`https://api.timviec365.vn/api/qlc/ai/convert_file_to_html`,
                {
                    num_email: mail_length,
                    file: file
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            setListContent(data?.data?.data?.data)
            setLoadFile(true)
            setLoadContentFile(true)
        } catch (error) {
            window.alert("Lỗi đọc nội dung file")
            setLoadFile(true)
        }
    }

    const onSubmit = (value) => {
        const call = async () => {
            try {
                console.log("vào đây")
                setStatus(false)
                if (tagList && tagList.length > 0) {
                    let ID = null
                    if (Cookies.get('token_base365')) {
                        const decoded: any = jwtDecode(Cookies.get('token_base365'))
                        ID = decoded?.data?._id
                    }
                    if (ID) {
                        await axios.post("https://api.timviec365.vn/api/qlc/ai/SendBBC",
                            {
                                ID: ID,
                                List_Gmail: tagList || [],
                                Title: value?.title || "",
                                list_content: checked ? listContent : null,
                                content: checked ? null : listContent[0] || null,
                                checked: checked
                            },
                            {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            })
                        setStatus(true)
                        window.alert("Gửi thành công")
                        setTagList([])
                        form.resetFields()
                        setOpen(false)
                    }
                    else {
                        window.alert("Lỗi : Người gửi không xác định")
                        setStatus(true)
                    }

                }
                else {
                    window.alert("Danh sách người nhận không được để trống")
                    setStatus(true)
                }


            } catch (error) {
                window.alert(error?.message)
                setStatus(true)
            }
        }

        call()
    }
    const [listContent, setListContent] = useState<any>([1, 2, 3, 4, 5])
    useEffect(() => {
        setListContent([])
    }, [])
    const handleBlockChange = (blockNumber) => {
        setCurrentBlock(blockNumber);
    };

    const handleRemove = (value:any) => {
        const newValue = tagList.filter((item:any) => item !== value);
        setTagList(newValue); // Cập nhật lại giá trị sau khi xóa
    };


    return (
        <>
            <Modal
                open={open}
                title={"Gửi thư"}
                centered
                className={"mdal_cancel email_add_mdal .ant-upload-list-new"}
                onOk={onSubmit}
                onCancel={() => {
                    form.resetFields()
                    setTagList([])
                    setOpen(false)
                }}
                cancelButtonProps={{ style: { display: "none" } }}
                okButtonProps={{ style: { display: "none" } }}
            >
                <div className={styles.body}>
                    <div>




                        <Form form={form} onFinish={onSubmit} >

                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Người nhận"
                                rules={[{ required: true, message: 'Người nhận không được để trống' }]}
                            >
                                <Select
                                    size="large"
                                    mode="tags"
                                    style={{ width: '100%', maxHeight: "200px", overflowY: "auto" }}
                                    placeholder="Nhập Email"
                                    onChange={handleChange}
                                    value={tagList}
                                    onDeselect={handleRemove}
                                >
                                </Select>
                                <span>Số lượng {tagList?.length}</span>
                            </Form.Item>
                            <Form.Item name={'file_mail'}>
                                <Upload {...props_send}>
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


                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Tiêu đề"
                                name={"title"}
                            >
                                <Input
                                    size="large"
                                    placeholder="Tiêu đề"
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                            <Form.Item name="over_night">
                                <Switch defaultChecked={checked} onChange={onChange} />{" "}
                                <span>Gửi file</span>
                            </Form.Item>
                            {
                                !checked ? <Form.Item
                                    labelCol={{ span: 24 }}
                                    label="Nội dung"
                                    name={"content"}
                                >
                                    <TextEditor
                                        className={"1"}
                                        refDes={refDes}
                                        setrefDes={setrefDes}
                                        content={""}
                                        index={0}
                                        listContent={""}
                                        setListContent={setListContent} />
                                </Form.Item> : <Form.Item
                                    name={"file"}
                                    style={{ display: "flex", justifyContent: "center" }}
                                >

                                    {loadFile ? (<Upload {...props}>
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
                                    </Upload>) : <LoadingOutlined style={{ fontSize: "40px" }} />}
                                </Form.Item>
                            }

                            {checked && loadContentFile && listContent.map((content, index) => (

                                currentBlock === index + 1 && < Form.Item labelCol={{ span: 24 }
                                } label={`Nội dung ${index + 1}`} name={`label${index + 1}`}>
                                    <TextEditor
                                        className={"1"}
                                        refDes={refDes}
                                        setrefDes={setrefDes}
                                        content={content}
                                        index={index}
                                        listContent={listContent}
                                        setListContent={setListContent}
                                    />
                                </Form.Item>
                            ))}

                            {checked && loadContentFile && <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'end' }}>
                                {[...Array(listContent.length)].map((_, index) => (
                                    <Button key={index} onClick={() => handleBlockChange(index + 1)} style={{
                                        width: "20px",
                                        marginRight: '5px',
                                        ...(currentBlock === index + 1 ? { backgroundColor: "silver" } : {}),
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                            {index + 1}
                                        </div>
                                    </Button>
                                ))}
                            </div>}


                            {status ? <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "20px",
                                }}
                            >
                                <button type="button" className={styles.huyb} onClick={() => setOpen(false)}>
                                    <p className={styles.texthuyb}>Huỷ</p>
                                </button>

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

export default Send_Mail