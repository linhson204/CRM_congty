import type { ColumnsType } from "antd/es/table";
import { Card, Form, Button, Input, Col, Row, Upload, Image, Select, Space,ConfigProvider,Table } from 'antd'
import styles from '../marketing.module.css'
import { useState } from 'react';
import Link from 'next/link';
interface DataType {
  key: React.Key;
  id: number;
  trangthai: string;
  telenumber: string;
}
export const data: DataType[] = [];
for (let i = 0; i < 20; i++) {
data.push({
  key: i,
  id: i + 1,
 
  trangthai: "Đã gửi",
  telenumber: "+84 987 654 321",
  
});
};
export default function ZaloFormProduct({ }: any) {
  const [form] = Form.useForm()
  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };
  interface TableDataZaloFormProps {
    setSelected: (value: boolean) => void;
    setNumberSelected: any;
  }
  
  const onSubmit = () => {
  }
  const { TextArea } = Input;
  const defaultValue = 
  `SĐT 1
    SĐT 2
    SĐT 3
    SĐT 4
    SĐT 5
    SĐT 6
    SĐT 7
    SĐT 8
    SĐT 9
    SĐT 10`;
  const [fileList, setFileList] = useState([])
  function handleChange(value: string, option: { value: string; label: string; disabled?: undefined; } | { value: string; label: string; disabled: true; } | ({ value: string; label: string; disabled?: undefined; } | { value: string; label: string; disabled: true; })[]): void {
    throw new Error('Function not implemented.');
  }
 
 
  
  const columns : ColumnsType<DataType>= [
    {
      title: 'STT',
      dataIndex: "id",
      width: 70,
     
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'telenumber',
      width: 160,
     
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangthai',
      render: (trangthai) =>  <span style={{ color: trangthai === 'Đã gửi' ? '#34B632' : '#FF3333' }}>
      ({trangthai})
    </span>,
    
      width: 160,
     
    },
  ];
  return (<>
    <Card
      className='form_add_zalo_product'
    >
      <div className={styles.container_content_zalo_product}>
        <h3>Tự động kết bạn</h3>
        <div className={styles.content_zalo_product}>

          <Form
            className='zalo_add_product'
            {...formItemLayout}
            form={form}
            onFinish={onSubmit}
          >
            <Row>
              <Col md={17}>
               
                  <p className={styles.auto_add_title} >Thiết lập tự động kết bạn</p>
                  <Form.Item
                    name='name'
                    label="Khoảng Delay mỗi lần gửi (phút)"
                    rules={[
                      {

                        message: 'Vui lòng nhập tên tiêu đề',
                      },]}
                  >
                    <Input type='number' placeholder='10 - 30' />
                    <p className={styles.auto_add_warning}>Lưu ý: Thời gian delay phải trên 10 phút, kết bạn quá nhanh sẽ bị chặn!<br/>
                      (Hiện tại Zalo cho phép kết bạn tối đa 10 người / giờ)</p>
                  </Form.Item>
                  <Form.Item
                    name='name'
                    label="Lời mời kết bạn"
                    rules={[
                      {

                        message: 'Vui lòng nhập tên tiêu đề',
                      },]}
                  >
                    <Input type='text' placeholder='Ví dụ: Xin chào, kết bạn với mình nhé' />
                    
                  </Form.Item>
                  <Form.Item
                    name='name'
                    label="Danh sách SĐT muốn kết bạn"
                    rules={[
                      {

                        message: 'Vui lòng nhập tên tiêu đề',
                      },]}
                  >
            <ConfigProvider>
            <TextArea  rows={7}  defaultValue={defaultValue} />
    </ConfigProvider>
                    
                  </Form.Item>
                
              </Col>
              <Col md={7}>
                <div style={{ marginLeft: '30px' }}>
                  <p className={styles.auto_add_title} >Danh sách hiện tại</p>
                  <div style={{ width: '100%', overflowY: 'scroll' }}>
      <Table dataSource={data} 
      columns={columns}
       pagination={false}
       bordered
       style={{ maxHeight: '430px', overflowY: 'scroll' }}
        />
    </div>
                </div>
              </Col>
            </Row>
          
          
          
          
        




          </Form>
        </div>
      </div>
    </Card>
    
   
    < div className={styles.zalo_add_product_btn}>

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
          Lưu
        </Button>
      </div>
    </div>
  </>)
}