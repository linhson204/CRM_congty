import { Card, Form, Button, Input, Col, Row, Upload, Image, Select, Space } from 'antd'
import styles from '../marketing.module.css'
import { useState } from 'react';
import Link from 'next/link';
export default function ZaloAddMessPlan({ }: any) {
    const [form] = Form.useForm()
    const formItemLayout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
    };
    const onSubmit = () => {

    }
    const [fileList, setFileList] = useState([])
    function handleChange(value: string, option: { value: string; label: string; disabled?: undefined; } | { value: string; label: string; disabled: true; } | ({ value: string; label: string; disabled?: undefined; } | { value: string; label: string; disabled: true; })[]): void {
        throw new Error('Function not implemented.');
    }

    return (<>
        <Card
            className='form_add_zalo_product'
        >
            <div className={styles.container_content_zalo_product}>
                <h3>Mẫu kịch bản 1</h3>
                <div className={styles.content_zalo_product}>
                    <p>Mẫu tin nhắn spam</p>
                    <Form
                        className='zalo_add_product'
                        {...formItemLayout}
                        form={form}
                        onFinish={onSubmit}
                    >
                        <Row>
                            <Col md={12}>
                                <div>
                                    <Form.Item
                                        name='name'
                                        label="Tên tiêu đề"
                                        rules={[
                                            {

                                                message: 'Vui lòng nhập tên tiêu đề',
                                            },]}
                                    >
                                        <Input placeholder='Đặt tên tiêu đề' />
                                    </Form.Item>
                                </div>
                            </Col>
                            <Col md={12}>
                                <div style={{ marginLeft: '30px' }}>
                                    <Form.Item
                                        name='target'
                                        label="Đối tượng chọn"
                                        rules={[
                                            {

                                                message: 'Chọn đối tượng gửi',
                                            },]}
                                    >
                                        <Input placeholder='Chọn đối tượng gửi' />
                                    </Form.Item>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24}>
                                <div>
                                    <Form.Item
                                        name='content'
                                        label="Nội dung"
                                        rules={[
                                            {

                                                message: 'Vui lòng nhập mô tả',
                                            },]}
                                    >
                                        <Input placeholder='Nhập nội dung cho tin nhắn' />
                                    </Form.Item>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={24}>
                                <div className='upload_zalo_product'>
                                    <Form.Item
                                        name='upload'
                                        label="Đính kèm"
                                        rules={[
                                            {

                                                message: 'Vui lòng chọn ảnh',
                                            },]}
                                    >
                                        <Upload
                                            className={styles.containerUpload}
                                            style={{ width: '100%' }}
                                            fileList={fileList}
                                            showUploadList>
                                            <Input style={{ width: '100%' }} addonAfter={<Image alt='hungha.com' src={'/crm/import_file.svg'} width={28} height={28} />}
                                                placeholder='Chọn ảnh (< 500 KB), video (< 35 MB), pdf, word, excel' />
                                        </Upload>
                                    </Form.Item>
                                </div>
                            </Col>
                        </Row>
                        <Row>

                        </Row>
                        <Row>
                            <Col md={12}>
                                <div>
                                    <Form.Item
                                        name='name'
                                        label="Khoảng Delay mỗi lần gửi (giây)"
                                        rules={[
                                            {

                                                message: 'Nhập delay mỗi lần gửi (giây)',
                                            },]}
                                    >
                                        <Input placeholder='300 - 350' />
                                        <p style={{ marginTop: '10px', color: 'red', fontStyle: 'italic' }}>Lưu ý: Gửi tin nhắn đến người chưa kết bạn giới hạn 10 tin nhắn/giờ. Vì vậy khoảng delay phải trên 300 giây!
                                        </p>
                                    </Form.Item></div>
                            </Col>
                            <Col md={12}>
                                <div style={{ marginLeft: '30px' }}>
                                    <Form.Item
                                        name='timesend'
                                        label="Khung giờ gửi tin"
                                        rules={[
                                            {

                                                message: 'Vui lòng nhập link Zalo',
                                            },]}
                                    >
                                        <div style={{ display: 'flex' }}>
                                            <form action="" method="post">
                                                <input type="radio" name='khunggio'  />
                                                <label >&nbsp; Cả Ngày</label><br />
                                                <input type="radio" name='khunggio' />
                                                <label >&nbsp; Tuỳ chỉnh</label>
                                            </form>

                                        </div>

                                    </Form.Item>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <div>
                                    <Form.Item
                                        name='timedelay'
                                        label="Thời gian nghỉ trước khi lăp lại"
                                        rules={[
                                            {

                                                message: 'Nhập thời gian nghỉ',
                                            },]}
                                    >
                                        <Input placeholder='9' />
                                    </Form.Item>
                                </div>
                            </Col>
                            <Col md={12}>
                                <div style={{ marginLeft: '30px' }}>
                                    <Form.Item
                                        name='repeat'
                                        label="Lặp lại"
                                        rules={[
                                            {

                                                message: 'Chọn đối tượng gửi',
                                            },]}
                                    >
                                        <Select
                                            defaultValue="Không lặp lại"

                                            onChange={handleChange}
                                            options={[
                                                { value: 'Không lặp lại', label: 'Không lặp lại' },
                                                { value: '1 lần', label: '1 lần' },
                                                { value: '2 lần', label: '2 lần' },
                                                { value: '3 lần', label: '3 lần' },
                                            ]}
                                        />

                                    </Form.Item>
                                </div>
                            </Col>
                        </Row>





                    </Form>
                </div>
            </div>
        </Card>
        <p style={{ color: '#4C5BD4', fontSize: '20px', fontWeight: '500', textDecorationLine: 'underline', marginBottom: '20px',marginTop: '20px' }}>Nút thao tác (tối đa 4 nút) </p>
        <Card>
        <div >
                <Form
                  className='zalo_add_product'
                  {...formItemLayout}
                  form={form}
                  onFinish={onSubmit}>
                    <Row>
                        <Col md={12}>
                            <div>
                                <Form.Item
                                    name='name'
                                    label="Tên nút"
                                    rules={[
                                        {

                                            message: 'Vui lòng nhập tên nút',
                                        },]}
                                >
                                    <Input placeholder='Nhập tên nút' />
                                </Form.Item>
                            </div>
                        </Col>
                        <Col md={12}>
                            <div style={{ marginLeft: '30px' }}>
                                <Form.Item
                                    name='target'
                                    label="Đường dẫn"
                                    rules={[
                                        {

                                            message: 'Chọn đường dẫn',
                                        },]}
                                >
                                    <Input placeholder='Chọn đường dẫn' />
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>

                </Form>
           </div>
            </Card>
        <div>
       
                    <button
                        type="button"
                        className={`${styles.dropbtn_add} flex_align_center items-center`}
                        style={{marginTop:'20px',backgroundColor:'#DDEFFF', color:'#333333'}}
                    >
                        <img height={14} width={14} alt="..." src="/crm/add_mess_plan.svg"  />
                        <div>Thêm nút thao tác</div>
                    </button>
              
            </div>    
        <div className={styles.zalo_add_plan_btn}>
          
            <div style={{ flex: 1 }}>
                <Button
                    style={{ width: '100%' }}
                >
                    Hủy
                </Button>
            </div>
            <div style={{ flex: 1 }}>
                <Button
                    style={{ width: '100%', textAlign: 'center' }}
                    htmlType='submit'
                    type='primary'
                >
                    Tiếp tục
                </Button>
            </div>
        </div>
    </>)
}