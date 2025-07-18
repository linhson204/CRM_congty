import { Modal, Button, Form, Image, Input, Table, Checkbox, Upload } from "antd"
import { SuccessIcon, CrossBlack } from '@/public/img/marketing'
import styles from '../marketing.module.css'
import { useState } from "react"
import type { ColumnsType } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";
export const ModalThem = () => {
    return (
        <>
            <Modal>
            </Modal>
        </>
    )
}

export const ModalSucess = ({ openModalSucess, setOpenModalSucess, text }) => {
    return (
        <>
            <Modal
                open={openModalSucess}
                onCancel={() => { setOpenModalSucess(false) }}
                footer={[
                    <>
                        <div className={styles.facebook_modal_footer_success}>
                            <Button size="large" onClick={() => { setOpenModalSucess(false) }}>
                                Đóng
                            </Button>
                        </div>
                    </>
                ]}
            >
                <div className={styles.facebook_modal_success}>
                    <div>
                        <SuccessIcon />
                    </div>
                    <p>
                        {text}
                    </p>
                </div>
            </Modal>
        </>
    )
}

export const ModalDel = ({ handleDel, openModalDel, setOpenModalDel, text, textSuccess = 'Thành công',  }) => {
    const [openModalSucess, setOpenModalDelSucess] = useState(false)
    return (
        <>
            <Modal
                className='custom_modal_del'
                open={openModalDel}
                onCancel={() => { setOpenModalDel() }}
                footer={[
                    <>
                        <div className={styles.facebook_modal_footer_del}>
                            <Button type="primary"
                                style={{
                                    background: '#4C5BD4',
                                    color: '#FFF'
                                }} size="large" onClick={async() => {
                                    const value = await handleDel();
                                    if(value == 1) {
                                        setOpenModalDel()
                                        setOpenModalDelSucess(true)
                                    }
                                }}>
                                Có
                            </Button>
                            <Button style={{
                                color: '#4C5BD4',
                                border: '1px solid #4C5BD4'
                            }} size="large" onClick={() => {
                                setOpenModalDel()
                            }}>
                                Không
                            </Button>
                        </div>
                    </>
                ]}
            >
                <div className={styles.facebook_modal_del}>
                    <h3>Xóa tài khoản</h3>
                    <img className={styles.cross} src="/crm/img/marketing/cross.svg" alt="hungha.com" onClick={() => { setOpenModalDel() }} />
                    <p>
                        {text}
                    </p>
                </div>
            </Modal>
            <ModalSucess openModalSucess={openModalSucess} setOpenModalSucess={setOpenModalDelSucess} text={textSuccess} />
        </>
    )
}
export const ModalLeave = ({ openModalLeave, setOpenModalLeave, text, textSuccess = 'Thành công' }) => {
    const [openModalSucess, setOpenModalLeaveSucess] = useState(false)
    return (
        <>
            <Modal
                className='custom_modal_del'
                open={openModalLeave}
                onCancel={() => { setOpenModalLeave(false) }}
                footer={[
                    <>
                        <div className={styles.facebook_modal_footer_del}>
                            <Button type="primary"
                                style={{
                                    background: '#4C5BD4',
                                    color: '#FFF'
                                }} size="large" onClick={() => {
                                    setOpenModalLeave(false)
                                    setOpenModalLeaveSucess(true)
                                }}>
                                Có
                            </Button>
                            <Button style={{
                                color: '#4C5BD4',
                                border: '1px solid #4C5BD4'
                            }} size="large" onClick={() => {
                                setOpenModalLeave(false)
                            }}>
                                Không
                            </Button>
                        </div>
                    </>
                ]}
            >
                <div className={styles.facebook_modal_del}>
                    <h3>Xóa tài khoản</h3>
                    <img className={styles.cross} src="/crm/img/marketing/cross.svg" alt="hungha.com" onClick={() => { setOpenModalLeave(false) }} />
                    <p>
                        {text}
                    </p>
                </div>
            </Modal>
            <ModalSucess openModalSucess={openModalSucess} setOpenModalSucess={setOpenModalLeaveSucess} text={textSuccess} />
        </>
    )
}

export const ModalUpdateInfoAcc = ({ openModalUpdate, setOpenModalUpdate, text }) => {
    const initialValues = {
        ep_id: 12345678,
        user_name: 'VŨ THỊ THÙY DUNG',
        password: '12345678',
        email: 'thuydung1234@gmail.com',
        status: 'Hoạt động',
        note: 'Không có ghi chú',
        date_modifiled: '10:10 - 21/12/2023',
        orther: 'Không có'
    }
    const [form] = Form.useForm()
    const [openModalSucess, setOpenModalSucess] = useState(false)
    const onFinish = (value) => {
        console.log(value);
        setOpenModalUpdate(false)
        setOpenModalSucess(true)
    }
    return (
        <>
            <Modal
                width={700}
                open={openModalUpdate}
                onCancel={() => {
                    setOpenModalUpdate(false)
                }}
                footer={null}
            >
                <div className={styles.header_update_inf}>
                    <h2>Cập nhật thông tin</h2>
                    <div className={styles.cross} onClick={() => { setOpenModalUpdate(false) }}>
                        <CrossBlack />
                    </div>
                    <Image preview={false} src="/crm/img/marketing/smile.png" alt="hungha.com" />
                </div>
                <div className={styles.facebook_form_update_inf}>
                    <Form
                        initialValues={initialValues}
                        className="facebook_modal_update_info"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name='ep_id'
                            label='ID'
                        >
                            <Input style={{ background: '#EBEBEB', cursor: 'default' }} size="large" readOnly />
                        </Form.Item>
                        <Form.Item
                            name='user_name'
                            label='Tên tài khoản'>
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            label='Mật khẩu'>
                            <Input.Password size="large" />
                        </Form.Item>
                        <h3>Thông tin chi tiết</h3>
                        <Form.Item
                            name='email'
                            label='Email'>
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item
                            name='status'
                            label='Trạng thái'>
                            <Input style={{ color: '#34B632' }} size="large" />
                        </Form.Item>
                        <Form.Item
                            name='note'
                            label='Ghi chú'>
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item
                            name='date_modifiled'
                            label='Chỉnh sửa lần cuối'>
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item
                            name='orther'
                            label='Thông tin khác'>
                            <Input size="large" />
                        </Form.Item>

                        <div className={styles.facebook_form_update_inf_btn}>
                            <div style={{ flex: 1 }}>
                                <Button
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                    style={{ background: '#4C5BD4' }}
                                >
                                    Cập nhật
                                </Button>
                            </div>
                            <div style={{ flex: 1 }}>
                                <Button
                                    size="large"
                                    onClick={() => { setOpenModalUpdate(false) }}>
                                    Đóng
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </Modal>
            <ModalSucess openModalSucess={openModalSucess} setOpenModalSucess={setOpenModalSucess} text={text} />
        </>
    )
}
export const ModalInvite = ({ openModalInvite, setOpenModalInvite, text }) => {

    interface DataType {
        key: React.Key;
        id: number;
        uid: string;

        status: string;
    }

    const data: DataType[] = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            id: i + 1,
            uid: '123456789',

            status: 'HỘI NHỮNG NGƯỜI CẦN TÌM VIỆC LÀM TẠI MIỀN BẮC',
        });
    };
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckAllChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleCheckboxChange = (checkboxValue) => {

        console.log('Checkbox value:', checkboxValue);
    };
    const columns: ColumnsType<DataType> = [
        {
            title: (
                <div>
                    <Checkbox checked={isChecked} onChange={handleCheckAllChange}></Checkbox>
                </div>
            ),
            width: 74,

            render: () => (
                <div>
                    <Checkbox value="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckboxChange('checkbox')} ></Checkbox>
                </div>
            ),
        },
        {
            title: "STT",
            dataIndex: "id",
            key: "id",
            width: 70,
        },
        {
            title: "ID nhóm",
            dataIndex: "uid",
            width: 162
        },
        {
            title: "Tên nhóm",

            key: "note",
            width: 316,
            dataIndex: "status",
            render: (status) => (
                <div style={{ color: '#3582CD', fontWeight: 'bold' }}>
                    {status}
                </div>
            ),
        },


    ];


    const [form] = Form.useForm()
    const [openModalSucess, setOpenModalSucess] = useState(false)
    const onFinish = (value) => {
        console.log(value);
        setOpenModalInvite(false)
        setOpenModalSucess(true)
    }
    return (
        <>

            <Modal
                width={671}
                open={openModalInvite}
                onCancel={() => {
                    setOpenModalInvite(false)
                }}
                footer={null}
            >
                <div className={styles.header_update_inf}>
                    <h2>Mời <span style={{ color: '#4C5BD4' }}> Vũ Thị Thùy Dung </span>vào </h2>
                    <div className={styles.cross} onClick={() => { setOpenModalInvite(false) }}>
                        <CrossBlack />
                    </div>

                </div>
                <div className={styles.facebook_form_update_inf}>
                    <Table
                        className="marketing_table_custom"
                        columns={columns}
                        dataSource={data}
                        bordered


                        scroll={{ x: 'max-content', y: 500 }}

                    />
                    <div className={styles.facebook_form_update_inf_btn}>
                        <div style={{ flex: 1 }}>
                            <Button
                                size="large"
                                type="primary"
                                htmlType="submit"
                                style={{ background: '#4C5BD4' }}
                            >
                                Mời vào nhóm
                            </Button>
                        </div>
                        <div style={{ flex: 1 }}>
                            <Button
                                style={{ background: '#D44C4C' }}
                                className={`${styles.dropbtn_del_zalo_shop} flex_align_center items-center`}
                                size="large"
                                onClick={() => { setOpenModalInvite(false) }}>
                                Huỷ
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
            <ModalSucess openModalSucess={openModalSucess} setOpenModalSucess={setOpenModalSucess} text={text} />
        </>
    )
}
export const ModalAddToGroup = ({ openModalAddToGroup, setOpenModalAddToGroup, text }) => {
    interface DataType {
        key: React.Key;
        id: number;
        uid: string;

        status: string;
    }

    const data: DataType[] = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            id: i + 1,
            uid: '123456789',

            status: 'Vũ Thị Thuỳ Dung',
        });
    };
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckAllChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleCheckboxChange = (checkboxValue) => {

        console.log('Checkbox value:', checkboxValue);
    };
    const columns: ColumnsType<DataType> = [
        {
            title: (
                <div>
                    <Checkbox checked={isChecked} onChange={handleCheckAllChange}></Checkbox>
                </div>
            ),
            width: 74,

            render: () => (
                <div>
                    <Checkbox value="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckboxChange('checkbox')} ></Checkbox>
                </div>
            ),
        },
        {
            title: "STT",
            dataIndex: "id",
            key: "id",
            width: 70,
        },
        {
            title: "ID nhóm",
            dataIndex: "uid",
            width: 162
        },
        {
            title: "Tên bạn bè",

            key: "note",
            width: 316,
            dataIndex: "status",
            render: (status) => (
                <div style={{ color: '#3582CD', textTransform: 'uppercase' }}>
                    {status}
                </div>
            ),
        },


    ];


    const [form] = Form.useForm()
    const [openModalSucess, setOpenModalSucess] = useState(false)
    const onFinish = (value) => {
        console.log(value);
        setOpenModalAddToGroup(false)
        setOpenModalSucess(true)
    }
    return (
        <>

            <Modal
                width={671}
                open={openModalAddToGroup}
                onCancel={() => {
                    setOpenModalAddToGroup(false)
                }}
                footer={null}
            >
                <div className={styles.header_update_inf}>
                    <h2>Thêm bạn bè vào <span style={{ color: '#4C5BD4' }}> Hội người lười Việt Nam </span></h2>
                    <div className={styles.cross} onClick={() => { setOpenModalAddToGroup(false) }}>
                        <CrossBlack />
                    </div>

                </div>
                <div className={styles.facebook_form_update_inf}>
                    <Table
                        className="marketing_table_custom"
                        columns={columns}
                        dataSource={data}
                        bordered


                        scroll={{ x: 'max-content', y: 500 }}

                    />
                    <div className={styles.facebook_form_update_inf_btn}>
                        <div style={{ flex: 1 }}>
                            <Button
                                size="large"
                                type="primary"
                                htmlType="submit"
                                style={{ background: '#4C5BD4' }}
                            >
                                Mời vào nhóm
                            </Button>
                        </div>
                        <div style={{ flex: 1 }}>
                            <Button
                                style={{ background: '#D44C4C' }}
                                className={`${styles.dropbtn_del_zalo_shop} flex_align_center items-center`}
                                size="large"
                                onClick={() => { setOpenModalAddToGroup(false) }}>
                                Huỷ
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
            <ModalSucess openModalSucess={openModalSucess} setOpenModalSucess={setOpenModalSucess} text={text} />
        </>
    )
}
export const ModalAddFriendInGroup = ({ openModalAddFriendInGroup, setOpenModalAddFriendInGroup, text }) => {
    interface DataType {
        key: React.Key;
        id: number;
        uid: string;

        status: string;
    }

    const data: DataType[] = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            key: i,
            id: i + 1,
            uid: '123456789',

            status: 'Vũ Thị Thuỳ Dung',
        });
    };
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckAllChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleCheckboxChange = (checkboxValue) => {

        console.log('Checkbox value:', checkboxValue);
    };
    const columns: ColumnsType<DataType> = [

        {
            title: "STT",
            dataIndex: "id",
            key: "id",
            width: 70,
        },
        {
            title: "UID",
            dataIndex: "uid",
            width: 162
        },
        {
            title: "Tên bạn bè",

            key: "note",
            width: 338,
            dataIndex: "status",
            render: (status) => (
                <div style={{ color: '#3582CD', textTransform: 'uppercase' }}>
                    {status}
                </div>
            ),
        },
        {
            title: "Nhãn",

            key: "note",
            width: 288,

            render: () => (
                <Button

                    type="primary"
                    htmlType="submit"
                    style={{ background: '#3582CD', width: '130px' }}
                >
                    Kết bạn
                </Button>
            ),
        },


    ];


    const [form] = Form.useForm()
    const [openModalSucess, setOpenModalSucess] = useState(false)
    const onFinish = (value) => {
        console.log(value);
        setOpenModalAddFriendInGroup(false)
        setOpenModalSucess(true)
    }
    return (
        <>

            <Modal
                width={900}
                open={openModalAddFriendInGroup}
                onCancel={() => {
                    setOpenModalAddFriendInGroup(false)
                }}
                footer={null}
            >
                <div className={styles.header_update_inf}>
                    <h2>Kết bạn với thành viên nhóm <span style={{ color: '#4C5BD4' }}> Hội người lười Việt Nam </span></h2>
                    <div className={styles.cross} onClick={() => { setOpenModalAddFriendInGroup(false) }}>
                        <CrossBlack />
                    </div>

                </div>
                <div className={styles.facebook_form_update_inf}>
                    <Table
                        className="marketing_table_custom"
                        columns={columns}
                        dataSource={data}
                        bordered


                        scroll={{ x: 'max-content', y: 500 }}

                    />

                </div>
            </Modal>
            <ModalSucess openModalSucess={openModalSucess} setOpenModalSucess={setOpenModalSucess} text={text} />
        </>
    )
}
export const ModalPost = ({ openModalPost, setOpenModalPost, text }) => {



    const [isChecked, setIsChecked] = useState(false);

    const handleCheckAllChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleCheckboxChange = (checkboxValue) => {

        console.log('Checkbox value:', checkboxValue);
    };
    const { Search } = Input;
    const { TextArea } = Input;
    const [form] = Form.useForm()
    const [openModalSucess, setOpenModalSucess] = useState(false)
    const onFinish = (value) => {
        console.log(value);
        setOpenModalPost(false)
        setOpenModalSucess(true)
    }
    return (
        <>

            <Modal
                width={727}
                open={openModalPost}
                onCancel={() => {
                    setOpenModalPost(false)
                }}
                footer={null}
            >
                <div className={styles.header_update_post}>
                    <h2 style={{ color: '#4C5BD4' }}> Tạo bài viết mới trong nhóm HỘI NGƯỜI LƯỜI VIỆT NAM </h2>
                    <div className={styles.cross} onClick={() => { setOpenModalPost(false) }}>
                        <CrossBlack />
                    </div>

                </div>
                <div className={styles.facebook_form_update_post}>
                    <p>Nội dung bài viết</p>
                    <TextArea style={{margin:'12px 0 8px',resize:'none'}} rows={6} placeholder=""  />
                    <span style={{fontStyle:'italic'}}>Nội dung bài viết có thể chứa icon, các đường link dẫn</span>
                    <div style={{margin:'24px 0'}}>
                    <p >Đính kèm</p>
                  
                    <Search size="large" placeholder="Upload" enterButton="File"/>
                   
                    </div>
                    <Checkbox ><p>Đăng ẩn danh</p></Checkbox>
                </div>
                <div className={styles.facebook_form_update_inf_btn}>
                        <div style={{ flex: 1 }}>
                        <Button
                                style={{ background: '#D44C4C' }}
                                className={`${styles.dropbtn_del_zalo_shop} flex_align_center items-center`}
                                size="large"
                                onClick={() => { setOpenModalPost(false) }}>
                                Huỷ
                            </Button>
                        </div>
                        <div style={{ flex: 1 }}>
                           
                            <Button
                                size="large"
                                type="primary"
                                htmlType="submit"
                                style={{ background: '#4C5BD4' }}
                            >
                                Đăng bài
                            </Button>
                        </div>
                    </div>

            </Modal>
            <ModalSucess openModalSucess={openModalSucess} setOpenModalSucess={setOpenModalSucess} text={text} />
        </>
    )
}