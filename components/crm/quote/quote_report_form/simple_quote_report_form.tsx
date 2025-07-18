import { axiosCRMCall } from "@/utils/api/api_crm_call";
import { axiosQLC } from "@/utils/api/api_qlc";
import { Col, Descriptions, DescriptionsProps, Image, Table, Typography } from 'antd';
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import React, { CSSProperties, useContext, useEffect, useLayoutEffect, useState } from "react";
import { QuoteContext } from "../quoteContext";
const { Title } = Typography

type QuoteDetailData = {}

interface QuoteDataType {
    key: React.Key;
    idproduct: string;
    nameproduct: string;
    soluong: number;
    dongia: number;
    chietkhau: number;
    thue: number;
    total: number;
}

const sectionCss: CSSProperties = {
    width: 'calc(100% - 40px)',
    display: 'flex',
    marginBottom: '10px'
}

const descriptLabel: CSSProperties = {
    color: '#474747',
    fontWeight: 600,
    fontSize: '15px',
}

const descriptContent: CSSProperties = {
    color: '#474747',
    fontWeight: 400,
    fontSize: '14px'
}

const simpleLabel: CSSProperties = {
    color: '#474747',
    fontWeight: 600,
    fontSize: '15px',
    textAlign: 'left',
    // marginBottom: '10px'
}

const simpleContent: CSSProperties = {
    color: '#474747',
    fontWeight: 400,
    fontSize: '14px',
    textAlign: 'left',
    // wordWrap: "break-word"
}

const sampleData: QuoteDataType[] = []
for (let i = 0; i < 4; i++) {
    sampleData.push({
        key: i + 1,
        idproduct: 'VT-0000',
        nameproduct: 'Nước lọc Safari',
        soluong: 10,
        dongia: 100000000,
        chietkhau: 2.1,
        thue: 2.1,
        total: 100000000,
    })
}

const defaultNumbers = ' hai ba bốn năm sáu bảy tám chín';

const chuHangDonVi = ('1 một' + defaultNumbers).split(' ');
const chuHangChuc = ('lẻ mười' + defaultNumbers).split(' ');
const chuHangTram = ('không một' + defaultNumbers).split(' ');

function convert_block_three(number) {
    if (number == '000') return '';
    var _a = number + ''; //Convert biến 'number' thành kiểu string

    //Kiểm tra độ dài của khối
    switch (_a.length) {
        case 0: return '';
        case 1: return chuHangDonVi[_a];
        case 2: return convert_block_two(_a);
        case 3:
            var chuc_dv = '';
            if (_a.slice(1, 3) != '00') {
                chuc_dv = convert_block_two(_a.slice(1, 3));
            }
            var tram = chuHangTram[_a[0]] + ' trăm';
            return tram + ' ' + chuc_dv;
    }
}

function convert_block_two(number) {
    var dv = chuHangDonVi[number[1]];
    var chuc = chuHangChuc[number[0]];
    var append = '';

    // Nếu chữ số hàng đơn vị là 5
    if (number[0] > 0 && number[1] == 5) {
        dv = 'lăm'
    }

    // Nếu số hàng chục lớn hơn 1
    if (number[0] > 1) {
        append = ' mươi';

        if (number[1] == 1) {
            dv = ' mốt';
        }
    }

    return chuc + '' + append + ' ' + dv;
}

const dvBlock = '1 nghìn triệu tỷ'.split(' ');

function to_vietnamese(number) {
    var str = parseInt(number) + '';
    var i = 0;
    var arr = [];
    var index = str.length;
    var result = [];
    var rsString = '';

    if (index == 0 || str == 'NaN') {
        return '';
    }

    // Chia chuỗi số thành một mảng từng khối có 3 chữ số
    while (index >= 0) {
        arr.push(str.substring(index, Math.max(index - 3, 0)));
        index -= 3;
    }

    // Lặp từng khối trong mảng trên và convert từng khối đấy ra chữ Việt Nam
    for (i = arr.length - 1; i >= 0; i--) {
        if (arr[i] != '' && arr[i] != '000') {
            result.push(convert_block_three(arr[i]));

            // Thêm đuôi của mỗi khối
            if (dvBlock[i]) {
                result.push(dvBlock[i]);
            }
        }
    }

    // Join mảng kết quả lại thành chuỗi string
    rsString = result.join(' ');

    // Trả về kết quả kèm xóa những ký tự thừa
    return rsString.replace(/[0-9]/g, '').replace(/ /g, ' ').replace(/ $/, '');
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatPhoneNumber(phoneNumber) {
    // Remove any non-numeric characters from the input string
    const numericOnly = phoneNumber.replace(/\D/g, '');

    // Check if the numericOnly string is empty or not
    if (numericOnly.length === 0) {
        return '';  // Return an empty string if there are no numeric characters
    }

    // Split the numericOnly string into groups of 4, 3, and the remaining characters
    const groups = [];
    let remaining = numericOnly.length;

    while (remaining > 0) {
        if (remaining >= 4) {
            groups.push(numericOnly.substr(-remaining, 4));
            remaining -= 4;
        } else {
            groups.push(numericOnly.substr(-remaining));
            remaining = 0;
        }
    }

    // Join the groups with dots and return the formatted string
    return groups.join('.');
}

const SimpleQuoteReport = ({ id = 0, visible = 'visible', setIsLoaded = (value) => { } }: any) => {
    const { getPropOrDefault, recordId, shouldFetchDetailData, detailData,
        customerData, companyData, setShouldGetCus, setShouldGetCom } = useContext(QuoteContext)
    const [quoteData, setQuoteData] = useState<any>({})
    // const [companyData, setCompanyData] = useState<any>({})
    // const [customerData, setCustomerData] = useState<any>({})
    const [productData, setProductData] = useState<any>([])
    const [productTableData, setProductTableData] = useState<QuoteDataType[]>([])
    const [totalMoneyBeforeDiscount, setTotalMoneyBeforeDiscount] = useState(0)
    // const [shouldGetCus, setShouldGetCus] = useState(false)

    const getQuoteData = () => {
        if ((Number(recordId) && Number(recordId) !== 0) || (id !== 0)) {
            // axiosCRMCall
            //     .post('/quote/getDetail', { id: Number(recordId) || id || 0 })
            //     .then((res) => {
            //         if (res?.data?.data?.data) {
            //             setQuoteData(res?.data?.data?.data)
            //             setProductData(res?.data?.data?.data.product_list)
            //             setShouldGetCus(true)
            //         } else {
            //             setQuoteData({})
            //             setProductData([])
            //         }
            //     })
            //     .catch((err) => console.log(err))

            setQuoteData(detailData)
            Object.keys(detailData).length > 0 && setProductData(getPropOrDefault(detailData, 'product_list', []))
            setShouldGetCus(true)
        }
    }

    // const getCustomerData = () => {
    //     if (shouldGetCus) {
    //         axiosCRMCall
    //             .post('/customerdetails/detail', { cus_id: getPropOrDefault(quoteData, 'customer_id', 0) })
    //             .then(res => {
    //                 if (res && res?.data && res?.data.hasOwnProperty('data') && res?.data?.data) {
    //                     setCustomerData(res?.data?.data)
    //                 }
    //             })
    //             .catch((err) => console.log(err))
    //     }
    // }

    // const getCompanyData = () => {
    //     if (shouldGetQuoteAndCom) {
    //         axiosQLC
    //             .post('/company/info')
    //             .then(res => {
    //                 res?.data?.data?.data ?
    //                     setCompanyData(res?.data?.data?.data) :
    //                     setCompanyData({})
    //             })
    //             .catch((err) => console.log(err))
    //     }
    // }

    // useEffect(() => {
    //     Object.keys(quoteData).length > 0 && shouldGetCus && getCustomerData()
    //     setShouldGetCus(false)
    // }, [quoteData, shouldGetCus])
    useEffect(() => {
        let tempData = []
        let tempTotal = 0
        for (let i = 0; i < productData.length; i++) {
            tempData.push({
                key: i + 1,
                idproduct: getPropOrDefault(productData[i], 'product_id._id', 'Chưa cập nhật'),
                nameproduct: getPropOrDefault(productData[i], 'product_id.prod_name', 'Chưa cập nhật'),
                soluong: getPropOrDefault(productData[i], 'amount', '0'),
                dongia: getPropOrDefault(productData[i], 'product_price', '0'),
                chietkhau: getPropOrDefault(productData[i], 'product_discount_rate', '0'),
                thue: getPropOrDefault(productData[i], 'tax_rate', '0'),
                total: getPropOrDefault(productData[i], 'product_total_money', '0'),
            })
            tempTotal += Number(getPropOrDefault(productData[i], 'product_total_money', '0')) || 0
        }
        setProductTableData(tempData)
        setTotalMoneyBeforeDiscount(tempTotal)
    }, [productData])

    // useEffect(() => {
    //     if (shouldGetQuoteAndCom) {
    //         setShouldGetQuoteAndCom(false)
    //         getQuoteData();
    //         getCompanyData();
    //     }
    // }, [shouldGetQuoteAndCom])

    useEffect(() => {
        if (Object.keys(detailData).length > 0) {
            // setShouldGetQuoteAndCom(true)
            getQuoteData();
            setShouldGetCus(true)
            setShouldGetCom(true)
        }
    }, [detailData])

    // useEffect(() => {
    //     if (shouldFetchDetailData) {
    //         setShouldGetQuoteAndCom(true)
    //     }
    // }, [shouldFetchDetailData])

    const basicQuoteInfo: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Số báo giá',
            children: getPropOrDefault(quoteData, 'quote_code_str', 'Chưa cập nhật')
        },
        {
            key: '2',
            label: 'Ngày báo giá',
            children: getPropOrDefault(quoteData, 'date_quote', '') ? dayjs(getPropOrDefault(quoteData, 'date_quote', '')).format('DD/MM/YYYY') : 'Chưa cập nhật'
        },
        {
            key: '3',
            label: 'Hiệu lực báo giá',
            children: getPropOrDefault(quoteData, 'date_quote_end', '') ? dayjs(getPropOrDefault(quoteData, 'date_quote_end', '')).format('DD/MM/YYYY') : 'Chưa cập nhật'
        }
    ]

    const companyInfo: DescriptionsProps['items'] = [
        {
            key: '1',
            label: getPropOrDefault(companyData, 'com_name', 'Chưa cập nhật tên'),
            children: ''
        },
        {
            key: '2',
            label: getPropOrDefault(companyData, 'com_address', 'Chưa cập nhật địa chỉ'),
            children: ''
        },
        {
            key: '3',
            label: getPropOrDefault(companyData, 'com_phone', '') ? formatPhoneNumber(getPropOrDefault(companyData, 'com_phone', '')) : 'Chưa cập nhật số điện thoại',
            children: ''
        },
        {
            key: '4',
            label: getPropOrDefault(companyData, 'com_phone_tk', '') ? formatPhoneNumber(getPropOrDefault(companyData, 'com_phone_tk', '')) : 'Chưa cập nhật số điện thoại',
            children: ''
        },
        {
            key: '5',
            label: getPropOrDefault(companyData, 'com_email_lh', 'Chưa cập nhật email liên hệ'),
            children: ''
        }
    ]

    const customerInfo: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Khách hàng',
            children: getPropOrDefault(customerData, 'name', 'Chưa cập nhật')
        },
        {
            key: '2',
            label: 'Địa chỉ',
            children: getPropOrDefault(quoteData, 'address', 'Chưa cập nhật')
        },
        {
            key: '3',
            label: 'Số điện thoại',
            children: getPropOrDefault(quoteData, 'phone_number', 'Chưa cập nhật')
        },
        {
            key: '4',
            label: 'Mã số thuế',
            children: getPropOrDefault(quoteData, 'tax_code', 'Chưa cập nhật')
        },
    ]

    const totalPriceInfo: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Tổng thành tiền',
            children: `${totalMoneyBeforeDiscount.toLocaleString('vi-VN')} VNĐ`
        },
        {
            key: '2',
            label: 'Chiết khấu đơn hàng',
            children: `${Number(getPropOrDefault(quoteData, 'discount_rate', '0')).toLocaleString('vi-VN')} %`
        },
        {
            key: '3',
            label: 'Tổng tiền thanh toán',
            children: `${Number(Number(getPropOrDefault(quoteData, 'total_money', '0')).toFixed(0)).toLocaleString('vi-VN')} VNĐ`
        },
    ]

    const columns: ColumnsType<QuoteDataType> = [
        {
            title: "STT",
            width: 30,
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Mã hàng hóa",
            width: 80,
            dataIndex: "idproduct",
            key: "0",
        },
        {
            title: "Hàng hóa",
            dataIndex: "nameproduct",
            key: "1",
            width: 100,
        },
        {
            title: "SL",
            dataIndex: "soluong",
            key: "3",
            width: 30,
            render: (text) => (
                Number(text).toLocaleString('vi-VN')
            )
        },
        {
            title: "Đơn giá (VNĐ)",
            dataIndex: "dongia",
            key: "4",
            width: 100,
            render: (text) => (
                Number(text).toLocaleString('vi-VN')
            )
        },
        {
            title: "Chiết khấu (%)",
            dataIndex: "chietkhau",
            key: "5",
            width: 60,
            render: (text) => (
                Number(text).toLocaleString('vi-VN')
            )
        },
        {
            title: "VAT (%)",
            dataIndex: "thue",
            key: "6",
            width: 60,
            render: (text) => (
                Number(text).toLocaleString('vi-VN')
            )
        },
        {
            title: "Thành tiền (VNĐ)",
            dataIndex: "total",
            key: "7",
            width: 100,
            render: (text) => (
                Number(text).toLocaleString('vi-VN')
            )
        },
    ]

    return (
        <>


            <div id="quote_report_simple" style={{ width: '100%', maxWidth: '210mm', margin: '20px', pointerEvents: "none", pageBreakBefore: 'always', visibility: visible }}>
                {/* Logo + thông tin báo giá cơ bản */}
                <div style={sectionCss}>
                    {/* <Col span={24}> */}
                    <Col span={8}>
                        <Image
                            width={'100%'}
                            src="/crm/img/TimViec365_logo.svg"
                            alt="Logo TimViec365"
                        />
                    </Col>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <Descriptions
                            items={basicQuoteInfo}
                            column={1}
                            labelStyle={descriptLabel}
                            contentStyle={descriptContent}
                            size="small"
                        />
                    </Col>
                    {/* </Col> */}
                </div>

                {/* Tiêu đề */}
                <div style={{ textAlign: 'center', width: 'calc(100% - 40px)', marginBottom: '30px' }}>
                    <Title>BẢNG BÁO GIÁ</Title>
                </div>

                {/* Thông tin cty và thông tin khách hàng */}
                <div style={sectionCss}>
                    <Col span={11}>
                        <Descriptions
                            items={companyInfo}
                            column={1}
                            labelStyle={descriptLabel}
                            contentStyle={descriptContent}
                            colon={false}
                            size="small"
                        />
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                        <Descriptions
                            items={customerInfo}
                            column={1}
                            labelStyle={descriptLabel}
                            contentStyle={descriptContent}
                            size="small"
                        />
                    </Col>
                </div>

                {/* Lời giới thiệu */}
                <div style={{ width: 'calc(100% - 40px)', marginBottom: '20px' }}>
                    <p style={simpleLabel}>Lời giới thiệu</p>
                    <p style={simpleContent}>{getPropOrDefault(quoteData, 'introducer', 'Chưa cập nhật')}</p>
                </div>

                {/* Bảng báo giá */}
                <div style={{ width: 'calc(100% - 40px)', marginBottom: '20px' }}>
                    <Table
                        columns={columns}
                        dataSource={productTableData}
                        bordered
                        pagination={{
                            position: [],
                        }}
                    />
                </div>

                {/* Tổng hợp */}
                <div style={sectionCss}>
                    <Col span={14}></Col>
                    <Col span={10}>
                        <Descriptions
                            items={totalPriceInfo}
                            column={1}
                            labelStyle={descriptLabel}
                            contentStyle={descriptContent}
                            size="small"
                        />
                    </Col>
                </div>

                {/* Tiền bằng chữ */}
                <div style={sectionCss}>
                    <p>
                        <span style={simpleLabel}>
                            Số tiền viết bằng chữ:
                        </span>
                        <span style={simpleContent}>
                            {` ${capitalizeFirstLetter(to_vietnamese(Number(getPropOrDefault(quoteData, 'total_money', '0')).toFixed(0)))} đồng`}
                        </span>
                    </p>
                </div>

                {/* Điều khoản và quy định + ghi chú */}
                <div style={{ width: 'calc(100% - 40px)', marginBottom: '20px' }}>
                    <p style={simpleLabel}>Điều khoản &  Quy định </p>
                    <p style={simpleContent}>{getPropOrDefault(quoteData, 'terms_and_conditions', 'Chưa cập nhật')}</p>
                </div>
                <div style={{ width: 'calc(100% - 40px)', marginBottom: '20px' }}>
                    <p style={simpleLabel}>Ghi chú:</p>
                    <p style={simpleContent}>{getPropOrDefault(quoteData, 'note', 'Chưa cập nhật')}</p>
                </div>

                {/* Chỗ ký tên */}
                <div style={sectionCss}>
                    <Col span={12}>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{
                                fontSize: '16px',
                                fontWeight: 700
                            }}>
                                Người lập
                            </p>
                            <p style={{
                                fontSize: '16px',
                                fontWeight: 400,
                                marginBottom: '30px'
                            }}>
                                (Ký, họ tên)
                            </p>
                            <p style={{
                                fontSize: '20px',
                                fontWeight: 600
                            }}>
                                {getPropOrDefault(quoteData, 'creator_name', 'Chưa cập nhật')}
                            </p>
                        </div>
                    </Col>
                    {/* <Col span={6}></Col> */}
                    <Col span={12}>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{
                                fontSize: '16px',
                                fontWeight: 700
                            }}>
                                Giám đốc
                            </p>
                            <p style={{
                                fontSize: '16px',
                                fontWeight: 400,
                                marginBottom: '30px'
                            }}>
                                (Ký, họ tên, đóng dấu)
                            </p>
                            <p style={{
                                fontSize: '20px',
                                fontWeight: 600
                            }}>
                                {getPropOrDefault(quoteData, 'ceo_name', 'Chưa cập nhật')}
                            </p>
                        </div>
                    </Col>
                </div>
            </div>

        </>
    )
}

export default SimpleQuoteReport