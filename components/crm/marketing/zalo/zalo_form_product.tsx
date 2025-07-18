import { Card, Form, Button, Input, Col, Row, Upload, Image } from 'antd'
import styles from '../marketing.module.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CrossCircle } from '@/public/img/marketing';

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}api/crm`
const { TextArea } = Input

export default function ZaloFormProduct({ type, category_id, product_id = undefined }) {
    const router = useRouter()
    const [product, setProduct] = useState({})
    const [form] = Form.useForm()
    const [listFileName, setListFileName] = useState('')
    const [fileList, setFileList] = useState([])
    const [showERRImg, getShowERRImg] = useState(false)
    const formItemLayout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
    };
    const [isLoading, getIsLoading] = useState(false)
    const callApi = async (payload, url) => {
        try {
            const res = await fetch(
                url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );
            const data = await res.json()
            return data
        } catch (e) {
            console.log(e);
            alert('Lỗi')
            return null
        }
    }

    useEffect(() => {
        if (product_id) {
            const getData = async () => {
                const response = await callApi({ product_id: product_id, category_id: category_id }, `${BASE_URL}/marketingZalo/getZaloShopProduct`)
                if (response?.data?.result) {
                    const data = response.data.data[0]
                    const newProduct = { ...data }
                    delete newProduct._id
                    setProduct(newProduct)
                    form.setFieldsValue({ ...newProduct })
                    const newFileList = newProduct.img?.map((item, index) => {
                        return {
                            img_url: item,
                            img_uid: `${index}`
                        }
                    })
                    setFileList(newFileList)
                }
            }
            getData()
        }
    }, [])

    const onSubmit = async (value) => {
        if (fileList && fileList.length !== 0) {
            getIsLoading(true)
            let img = []
            if (type === 'add') {
                img = await Promise.all(
                    value?.anh?.fileList?.map(async (item, index) => {
                        try {
                            const imgTypeBase64 = await fileToBase64(item?.originFileObj);
                            const response = await callApi({ img: imgTypeBase64 }, `${BASE_URL}/marketingZalo/saveImgMarketingZalo`);
                            if (response?.data?.result) {
                                return response.data.data;
                            }
                            alert('Lỗi tải ảnh');
                            return '';
                        } catch (error) {
                            console.error('Error uploading image:', error);
                            return '';
                        }
                    })
                );
            } else if (type === 'update') {
                img = fileList.map((item, index) => item.img_url)
            }

            let payload = { ...value }
            delete payload.anh
            try {
                console.log({ ...payload, img: img, category_id: category_id });
                let res = null
                if (type === 'add') {
                    res = await callApi({ ...payload, img: img, category_id: category_id }, `${BASE_URL}/marketingZalo/addZaloShopProduct`)
                } else if (type === 'update') {
                    res = await callApi({ ...payload, img: img, category_id: category_id, product_id: product_id }, `${BASE_URL}/marketingZalo/updateZaloShopProduct`)
                }
                if (res?.data?.result) {
                    alert('Thành công')
                    router.push('/marketing/zalo')
                }
                getIsLoading(false)
            } catch (e) {
                getIsLoading(false)
                console.log(e);
                if (type === 'addd') {
                    alert('Thêm sản phẩm không thành công')
                } else if (type === 'update') {
                    alert('Sửa thông tin không thành công')
                }
            }
        } else {
            getShowERRImg(true)
        }
    }

    const onChangeImage = ({ fileList }) => {
        const listFileName = fileList.map((item, index) => {
            return item?.originFileObj?.name
        })
        const newListFileName = listFileName.join(' , ')
        setListFileName(newListFileName)
        setFileList(fileList)
    }

    const onUpload = async (file) => {
        try {
            const imgTypeBase64 = await fileToBase64(file)
            const response = await callApi({ img: imgTypeBase64 }, `${BASE_URL}/marketingZalo/saveImgMarketingZalo`);
            if (response?.data?.result) {
                let newFileList = [...fileList]
                newFileList.push({
                    img_url: response.data.data,
                    img_uid: file.uid
                })
                setFileList(newFileList)
            }
        } catch (error) {
            console.log(error);
            alert('Lỗi upload ảnh')
        }
        return 'true'
    }

    const onRemove = (file) => {
        let newFileList = [...fileList].filter((e) => e.img_uid !== file.uid)
        setFileList(newFileList)
    }


    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64String = event.target.result;
                resolve(base64String);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    }
    try {
    } catch (error) {
        console.error("Lỗi khi chuyển đổi tệp thành base64:", error);
    }
    return (<>
        <Card
            className='form_add_zalo_product'
        >
            <div className={styles.container_content_zalo_product}>
                {
                    type === 'add' ? <>
                        <h3>Thêm sản phẩm</h3>
                    </> : <>
                        <h3>Chỉnh sửa thông tin sản phẩm</h3>
                    </>
                }
                <div className={styles.content_zalo_product}>
                    <p>Thông tin sản phẩm</p>
                    <Form
                        className='zalo_add_product'
                        {...formItemLayout}
                        form={form}
                        onFinish={onSubmit}
                    >
                        <Row>
                            <Col xs={24} sm={12} md={12}>
                                <div>
                                    <label htmlFor="product_name" style={{
                                        color: '#474747',
                                        fontSize: '16px',
                                        fontWeight: 500,
                                        marginBottom: '10px'
                                    }}>Tên sản phẩm<span style={{ color: 'red' }}>*</span> </label>
                                    <Form.Item
                                        name='product_name'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập tên sản phẩm',
                                            },]}
                                    >
                                        <Input size='large' placeholder='Nhập tên sản phẩm' />
                                    </Form.Item>
                                </div>
                            </Col>
                            <Col xs={24} sm={12} md={12}>
                                <div className={styles.zalo_form_ml}>
                                    <label htmlFor="product_price" style={{
                                        color: '#474747',
                                        fontSize: '16px',
                                        fontWeight: 500,
                                        marginBottom: '10px'
                                    }}>Giá sản phẩm<span style={{ color: 'red' }}>*</span> </label>
                                    <Form.Item
                                        name='product_price'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập giá thành sản phẩm',
                                            },]}
                                    >
                                        <Input size='large' addonAfter={'VND'} placeholder='10000' />
                                    </Form.Item>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} sm={24} md={24}>
                                <div>
                                    <label htmlFor="product_description" style={{
                                        color: '#474747',
                                        fontSize: '16px',
                                        fontWeight: 500,
                                        marginBottom: '10px'
                                    }}>Mô tả<span style={{ color: 'red' }}>*</span></label>
                                    <Form.Item
                                        name='product_description'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập mô tả',
                                            },]}
                                    >
                                        <TextArea size='large' placeholder='Nhập mô tả chi tiết về sản phẩm' autoSize />
                                    </Form.Item>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} sm={24} md={24}>
                                <div className='upload_zalo_product'>
                                    <label htmlFor="anh" style={{
                                        color: '#474747',
                                        fontSize: '16px',
                                        fontWeight: 500,
                                        marginBottom: '10px'
                                    }}>Ảnh<span style={{ color: 'red' }}>*</span></label>
                                    <Form.Item
                                        name='anh'
                                    >
                                        {
                                            type === 'add' ? <>
                                                <Upload
                                                    className='form_product_upload_add'
                                                    style={{ width: '100%' }}
                                                    fileList={fileList}
                                                    onChange={onChangeImage}
                                                    listType="picture"
                                                    showUploadList>
                                                    <Input value={listFileName} size='large' style={{ width: '100%', cursor: 'pointer' }} addonAfter={<Image alt='hungha.com' src={'/crm/img/marketing/upload.svg'} width={27} height={27} preview={false} />}
                                                        placeholder='Chưa có hình ảnh được chọn' readOnly />

                                                </Upload>
                                            </> : <>
                                                <div className={styles.list_image_product}>
                                                    {
                                                        fileList?.map((item, index) => {
                                                            return (
                                                                <>
                                                                    <div className={styles.image_product}>
                                                                        <Image src={item.img_url} alt="hungha.com" />
                                                                        <div style={{
                                                                            position: 'absolute',
                                                                            top: '-30px',
                                                                            right: '3px',
                                                                            cursor: 'pointer',
                                                                        }}
                                                                            onClick={() => onRemove({ uid: item.img_uid })}
                                                                        >
                                                                            <CrossCircle />
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <Upload
                                                    className='form_product_upload_update'
                                                    style={{ width: '100%' }}
                                                    onRemove={(file) => onRemove(file)}
                                                    action={(file) => onUpload(file)}
                                                    listType="picture-card"
                                                    fileList={fileList}
                                                    showUploadList={false}>

                                                    <div>
                                                        <img src="/crm/img/marketing/plus_image.svg" />
                                                        <div style={{
                                                            color: '#999',
                                                            fontSize: '15px',
                                                            fontWeight: '400'
                                                        }}>Thêm ảnh</div>
                                                    </div>
                                                </Upload>
                                            </>
                                        }
                                        {
                                            showERRImg && fileList.length == 0 ? <>
                                                <p style={{ color: '#ff4d4f', fontSize: '14px' }}>Vui lòng chọn ảnh</p>
                                            </> : <></>
                                        }
                                    </Form.Item>
                                </div>
                            </Col>
                        </Row>
                        <Row>

                        </Row>
                        <Row>
                            <Col xs={24} sm={24} md={12}>
                                <div>
                                    <label htmlFor="phone" style={{
                                        color: '#474747',
                                        fontSize: '16px',
                                        fontWeight: 500,
                                        marginBottom: '10px'
                                    }}>Số điện thoại<span style={{ color: 'red' }}>*</span></label>
                                    <Form.Item
                                        name='phone'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập số điện thoại',
                                            },]}
                                    >
                                        <Input size='large' addonBefore={'+84'} placeholder='987 654 321' />
                                    </Form.Item></div>
                            </Col>
                            <Col xs={24} sm={24} md={12}>
                                <div className={styles.zalo_form_zalo_qr}>
                                    <label htmlFor="link_zalo" style={{
                                        color: '#474747',
                                        fontSize: '16px',
                                        fontWeight: 500,
                                        marginBottom: '10px'
                                    }}><span style={{ color: 'red' }}>*</span> Link zalo</label>
                                    <div style={{ display: 'flex' }}>
                                        <Form.Item
                                            name='link_zalo'
                                            style={{ width: '100%' }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập link Zalo',
                                                },]}
                                        >
                                            <Input size='large' placeholder='Dán link...' />
                                        </Form.Item>

                                        <div className={styles.uploadQR}>
                                            <img src="/crm/img/marketing/uploadQR.svg" alt="hungha.com" />
                                            <span>Upload QR</span>
                                        </div>
                                    </div>
                                    <p style={{ marginTop: '10px' }}>Vui lòng điền link Zalo cá nhân để khách hàng liên hệ mua sản phẩm.
                                        Bạn có thể Upload mã QR cá nhân bằng cách nhấn vào nút "Upload mã QR" bên cạnh
                                    </p>
                                </div>
                            </Col>
                        </Row>
                        <div className={`${styles.zalo_add_product_btn} form_zalo_product`}>
                            <div style={{ flex: 1 }}>
                                <Button
                                    disabled={isLoading}
                                    style={{ width: '100%' }}
                                >
                                    Hủy
                                </Button>
                            </div>
                            <div style={{ flex: 1 }}>
                                <Button
                                    disabled={isLoading}
                                    style={{ width: '100%', textAlign: 'center', background: '#4C5BD4' }}
                                    htmlType='submit'
                                    type='primary'
                                >
                                    Lưu
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>

        </Card>
        {
            type === 'add' ? <>
                <div className={styles.tutorial}>
                    <h3>Hướng dẫn lấy mã QR code cá nhân</h3>
                    <img src="/crm/img/marketing/huong_dan.png" alt="hungha.com" style={{ width: '100%' }} />
                </div>
            </> : <></>
        }
    </>)
}