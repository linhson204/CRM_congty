// import OrderSelectBoxStep from "../order_steps/select_box_step";
import { useEffect, useState } from "react";
import styles from "./order_new_detail.module.css";
// import InputText from "./input_text";
import { Input, Table } from "antd";
import Cookies from "js-cookie";


export default function AddOrderNewDetailInfo({ orderDetail }: any) {
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        bankName: orderDetail?.inForOrder?.timviec?.bankName,
        bankCode: orderDetail?.inForOrder?.timviec?.bankCode,
        bankCus: orderDetail?.inForOrder?.timviec?.bankCus,
        bankInfo: orderDetail?.inForOrder?.timviec?.bankInfo,
        moneyUpdateVat: orderDetail?.inForOrder?.timviec?.money_with_vat,
        moneyRefund: orderDetail?.inForOrder?.timviec?.money_refund,
    });


    useEffect(() => {
        if (orderDetail?.inForOrder?.timviec) {
            setData({
                bankName: orderDetail.inForOrder.timviec.bankName,
                bankCode: orderDetail.inForOrder.timviec.bankCode,
                bankCus: orderDetail.inForOrder.timviec.bankCus,
                bankInfo: orderDetail.inForOrder.timviec.bankInfo,
                moneyUpdateVat: orderDetail.inForOrder.timviec.money_with_vat,
                moneyRefund: orderDetail.inForOrder.timviec.money_refund,
            });
            setLoading(false);
        }
    }, [orderDetail?.inForOrder?.timviec])

    if (loading) {
        return <div>Loading...</div>;
    }


    const handleChange = (value: string, key: string) => {
        setData({ ...data, [key]: value });
    };


    const dataString = {
        "name_service": orderDetail?.inForOrder?.timviec?.name_service,
        "type_service": orderDetail?.inForOrder?.timviec?.type_service,
        "total_price_service": orderDetail?.inForOrder?.timviec?.total_price_service,
        "price_service": orderDetail?.inForOrder?.timviec?.price_service,
        "discount_service": orderDetail?.inForOrder?.timviec?.discount_service,
    };
    const nameServiceArray = dataString?.name_service?.split(',');
    const typeServiceArray = dataString?.type_service?.split(',');
    const totalPriceArray = dataString?.total_price_service?.split(',');
    const priceServiceArray = dataString?.price_service?.split(',');
    const discountServiceArray = dataString?.discount_service?.split(',');

    const dataSource = nameServiceArray?.map((name_service, index) => ({
        key: index.toString(),
        name_service,
        type_service: typeServiceArray[index],
        total_price_service: totalPriceArray[index],
        price_service: priceServiceArray[index],
        discount_service: discountServiceArray[index]
    }));

    const columns = [
        {
            title: "Tên dịch vụ",
            width: 50,
            dataIndex: 'name_service',
            key: 'name_service'
        },
        {
            title: "Loại dịch vụ",
            width: 30,
            dataIndex: 'type_service',
            key: "type_service",
        },
        {
            title: "Đơn giá",
            width: 30,
            dataIndex: 'price_service',
            key: "price_service",
            render: (text: any, record: any) => (
                <b>{text}VND</b>
            ),
        },
        {
            title: "Chiết khấu",
            width: 20,
            dataIndex: 'discount_service',
            key: "discount_service",
            render: (text: any, record: any) => (
                <b>{text}</b>
            )
        },
        {
            title: "Thành tiền",
            width: 40,
            dataIndex: 'total_price_service',
            key: "total_price_service",
            render: (text: any, record: any) => (
                <b>{text} VND</b>
            )
        },
    ];

    const handleSumbit = async () => {
        try {
            const response = await fetch(`https://api.timviec365.vn/api/crm/order/editOrderByStaff`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("token_base365")}`,
                },
                body: JSON.stringify({
                    "id": orderDetail?._id,
                    "moneyUpdateWithVat": data.moneyUpdateVat,
                    "moneyRefundUpdate": data.moneyRefund,
                    "bankName": data.bankName,
                    "bankCode": data.bankCode,
                    "bankCus": data.bankCus,
                    "bankInfo": data.bankInfo
                })
            });
            const dataRes = await response.json();
            if (dataRes && dataRes.data && dataRes.data.message) {
                alert(dataRes.data.message);
            } else {
                alert(dataRes.message || 'Something went wrong');
            }
            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    }

    const pointArray = orderDetail?.inForOrder?.timviec?.point.split(',').map(Number);
    const allZero = pointArray?.every(p => p === 0);
    const allNonZero = pointArray?.every(p => p !== 0);

    const result = allZero ? 'Ghim tin' : allNonZero ? 'Cộng điểm' : 'Cộng điểm/Ghim tin';

    return (
        <div>
            <p style={{ marginLeft: "15px" }} className={styles.main__body__type}>
                Thông tin chi tiết
            </p>
            <div className={styles.main__content__body}>
                <div className={styles.row}>
                    <div className={`${styles["col-lg-6"]}`}>
                        <div
                            className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
                        >
                            <div className={`${styles.main__body__item__title}`}>
                                <b>Mã đơn hàng:</b>
                            </div>
                            <div className={`${styles.main__body__item__value}`}>{orderDetail.order_id_text}</div>
                        </div>
                    </div>
                    <div className={`${styles["col-lg-6"]}`}>
                        <div
                            className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
                        >
                            <div className={`${styles.main__body__item__title}`}>
                                <b>Id công ty:</b>
                            </div>
                            <div className={`${styles.main__body__item__value}`}>{orderDetail?.inForOrder?.timviec?.com_id}</div>
                        </div>
                    </div>
                    <div className={`${styles["col-lg-6"]}`}>
                        <div
                            className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
                        >
                            <div className={`${styles.main__body__item__title}`}>
                                <b>Trạng thái:</b>
                            </div>
                            {(() => {
                                switch (orderDetail?.inForOrder?.timviec?.status) {
                                    case 0:
                                        return <b className={`${styles.main__body__item__value}`} style={{ color: "blue" }}>Đơn hàng vừa tạo</b>;
                                    case 1:
                                        return <b className={`${styles.main__body__item__value}`} style={{ color: "orange" }}>Chuyên viên đã duyệt</b>;
                                    case 2:
                                        return <b className={`${styles.main__body__item__value}`} style={{ color: "green" }}>Công ty đã duyệt</b>;
                                    case 3:
                                        return <b className={`${styles.main__body__item__value}`} style={{ color: "red" }}>Từ chối</b>;
                                    default:
                                        return "Không xác định";
                                }
                            })()}
                        </div>
                    </div>

                    <div className={`${styles["col-lg-6"]}`}>
                        <div
                            className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
                        >
                            <div className={`${styles.main__body__item__title}`}>
                                <b>Thời gian cập nhật:</b>
                            </div>
                            <div className={`${styles.main__body__item__value}`}>
                                {(() => {
                                    const date = new Date(orderDetail.updateAt * 1000);
                                    const day = date.getDate().toString().padStart(2, '0');
                                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                    const year = date.getFullYear();

                                    return `${day}/${month}/${year}`;
                                }
                                )()}
                            </div>
                        </div>
                    </div>

                    <div className={`${styles["col-lg-6"]}`}>
                        <div
                            className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
                        >
                            <div className={`${styles.main__body__item__title}`}>
                                <b>Khách hàng:</b>
                            </div>
                            <div className={`${styles.main__body__item__value}`}>
                                {orderDetail?.inForOrder?.timviec?.name_timviec_khach ?? orderDetail?.inForOrder?.timviec?.id_timviec_khach}
                            </div>
                        </div>
                    </div>


                    <div className={`${styles["col-lg-6"]}`}>
                        <div
                            className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
                        >
                            <div className={`${styles.main__body__item__title}`}>
                                <b>Loại đơn hàng:</b>
                            </div>
                            <div
                                className={`${styles.main__body__item__value}`}
                            >
                                {result}
                            </div>
                        </div>
                    </div>


                    <div className={`${styles["col-lg-6"]}`}>
                        <div
                            className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
                        >
                            <div className={`${styles.main__body__item__title}`}>
                                <b>Mã nhân viên phụ trách:</b>
                            </div>
                            <div className={`${styles.main__body__item__value}`}>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    {orderDetail?.inForOrder?.timviec?.id_crm_chuyenvien}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={`${styles["col-lg-6"]}`}>
                        <div
                            className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
                        >
                            <div className={`${styles.main__body__item__title}`}>
                                <b>Số lượng dịch vụ:</b>
                            </div>
                            <div className={`${styles.main__body__item__value}`}>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    {orderDetail?.inForOrder?.timviec?.point.split(',').length}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Table
                dataSource={dataSource}
                columns={columns}
                bordered
                scroll={{ x: 1500, y: 1200 }}
            />

            <div style={{ marginLeft: "30px", marginRight: "30px", marginTop: "30px" }} className={styles.main__content__body}>
                <div className={styles.row}>

                    <div
                        className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
                    >
                        <div className={`${styles.main__body__item__title}`}>
                            <b>Tổng giá trị đơn hàng:</b>
                        </div>
                        <div className={`${styles.main__body__item__value}`}>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(orderDetail?.inForOrder?.timviec?.money)}
                        </div>
                    </div>

                    <div
                        className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
                    >
                        <div className={`${styles.main__body__item__title}`}>
                            <b>Tổng tiền thanh toán ( đã bao gồm VAT )</b>
                        </div>
                        <div className={`${styles.main__body__item__value}`}>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(orderDetail?.inForOrder?.timviec?.money_with_vat)}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.main__content__body} style={{ marginTop: "60px" }}>
                <div className={styles.row}>
                    <div className={`${styles["col-lg-6"]}`}>
                        <div
                            className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
                        >
                            <div className={`${styles.main__body__item__title}`}>
                                <b>Ngân hàng</b>
                            </div>
                            <div className={`${styles.main__body__item__value}`}>
                                <Input id="bankName" onChange={(e) => { handleChange(e.target.value, "bankName") }} width={"100%"} value={`${data.bankName}`}></Input>
                            </div>
                        </div>
                    </div>


                    <div className={`${styles["col-lg-6"]}`}>
                        <div
                            className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
                        >
                            <div className={`${styles.main__body__item__title}`}>
                                <b>Số tài khoản</b>
                            </div>
                            <div className={`${styles.main__body__item__value}`}>
                                <Input id="bankCode" onChange={(e) => { handleChange(e.target.value, "bankCode") }} width={"100%"} value={`${data.bankCode}`}></Input>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles["col-lg-6"]}`}>
                        <div
                            className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
                        >
                            <div className={`${styles.main__body__item__title}`}>
                                <b>Chủ tài khoản</b>
                            </div>
                            <div className={`${styles.main__body__item__value}`}>
                                <Input id="bankCus" onChange={(e) => { handleChange(e.target.value, "bankCus") }} width={"100%"} value={`${data.bankCus}`}></Input>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles["col-lg-6"]}`}>
                        <div
                            className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
                        >
                            <div className={`${styles.main__body__item__title}`}>
                                <b>Nội dung chuyển khoản</b>
                            </div>
                            <div className={`${styles.main__body__item__value}`}>
                                <Input id="bankInfo" onChange={(e) => { handleChange(e.target.value, "bankInfo") }} width={"100%"} value={`${data.bankInfo}`}></Input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.main__content__body} style={{ marginTop: "60px" }}>
                <div className={styles.row}>
                    <div className={`${styles["col-lg-6"]}`}>
                        <div
                            className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
                        >
                            <div className={`${styles.main__body__item__title}`}>
                                <b>Tiền nhận</b>
                            </div>
                            <div className={`${styles.main__body__item__value}`}>
                                <Input id="moneyUpdateVat" onChange={(e) => { handleChange(e.target.value, "moneyUpdateVat") }} width={"100%"} value={`${data.moneyUpdateVat}`}></Input>
                            </div>
                        </div>
                    </div>


                    <div className={`${styles["col-lg-6"]}`}>
                        <div
                            className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
                        >
                            <div className={`${styles.main__body__item__title}`}>
                                <b>Tiền hoàn</b>
                            </div>
                            <div className={`${styles.main__body__item__value}`}>
                                <Input id="moneyRefund" onChange={(e) => { handleChange(e.target.value, "moneyRefund") }} width={"100%"} value={`${data.moneyRefund}`}></Input>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles["col-lg-6"]}`}>
                        <div
                            className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
                        >
                            <div className={`${styles.main__body__item__title}`}>
                                <b>Tổng tiền thực nhận</b>
                            </div>
                            <div className={`${styles.main__body__item__value}`}>
                                <Input width={"100%"} value={`${(data.moneyUpdateVat - data.moneyRefund)}`}></Input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.main__footer}`} onClick={handleSumbit}>
                <button className={`${styles.save}`}>Lưu</button>
            </div>
        </div>
    );
}
