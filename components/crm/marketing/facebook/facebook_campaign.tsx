import React, { useContext, useEffect, useRef, useState } from "react";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import { Select, Form, Input, Checkbox, Radio } from "antd";
import styles from './marketing.module.css'

const optionsAcc = []
for (let i = 0; i < 10; i++) {
    optionsAcc.push({
        label: '123456789 - Vũ Thị Thùy Dung',
        value: 1,
        key: i + 1,
    });
};


const FacebookCampaign: React.FC = () => {
    const mainRef = useRef<HTMLDivElement>(null);
    const [checkFile, setCheckFile] = useState(false);
    const { isOpen } = useContext<any>(SidebarContext);
    const imgRef = useRef<HTMLInputElement>(null);
    const {
        headerTitle,
        setHeaderTitle,
        setShowBackButton,
        setCurrentPath,
    }: any = useHeader();

    useEffect(() => {
        setHeaderTitle("Marketing / Facebook / Quản lý chiến dịch");
        setShowBackButton(true);
        setCurrentPath("/marketing/facebook");
    }, [setHeaderTitle, setShowBackButton, setCurrentPath]);
    const options = [
        {
            label: 'Quản lý chiến dịch theo tin nhắn',
            value: 1,
            key: 1,
        },
        {
            label: 'Quản lý chiến dịch theo kịch bản bạn bè',
            value: 2,
            key: 2,
        },
        {
            label: 'Quản lý chiến dịch theo kịch bản nhóm',
            value: 3,
            key: 3,
        },
    ]

    const optionsTypeList = [
        {
            label: 'Danh sách có sẵn',
            value: 1,
            key: 1,
        },
        {
            label: 'Danh sách trong mục đã quét',
            value: 2,
            key: 2,
        },
    ]

    const [checkedTypeList, setCheckedTypeList] = useState(false)

    const [form] = Form.useForm()
    return (
        <>
            <div>
                <Select
                    defaultValue={1}
                    options={options}
                    size="large"
                >

                </Select>
            </div>
            <div>
                <div>
                    <h3>Tin nhắn truyền thống</h3>
                    <p>Mẫu tin nhắn tự động số 1</p>
                    <Form
                        layout="vertical"
                    >
                        <div>
                            <Form.Item
                                name='note_customer'
                                label='Ghi chú về khách hàng'
                            >
                                <Input size="large" defaultValue={'Tất cả khách hàng thân quen'} readOnly />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                label='Tài khoản thực hiện'
                                name='name_acc'
                            >
                                <Select
                                    size="large"
                                    defaultValue={1}
                                    options={optionsAcc}
                                >
                                </Select>
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                label='Danh sách lựa chọn'
                                name='type_list'
                            >
                                <Select
                                    size="large"
                                    options={optionsTypeList}
                                    defaultValue={1}
                                >
                                </Select>
                            </Form.Item>
                            <div>
                                <Radio value={1} checked={checkedTypeList} onChange={() => {setCheckedTypeList(!checkedTypeList)}}>Bạn bè</Radio>
                                <Radio value={2} checked={!checkedTypeList} >Nhóm</Radio>
                            </div>
                        </div>
                    </Form>
                </div>
                <div></div>
            </div>
        </>

    );
};

export default FacebookCampaign;


