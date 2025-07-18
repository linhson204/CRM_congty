import React, { useContext, useEffect, useRef, useState } from "react";
import styleHome from "@/components/crm/home/home.module.css";
import styles from "@/components/crm/order/order.module.css";
import { SidebarContext } from "@/components/crm/context/resizeContext";
import AddButtonControl from "@/components/crm/order/order_detail/order_button_control";
import TabOrderList from "@/components/crm/order/order_detail/tab_order_detail";
import { useHeader } from "@/components/crm/hooks/useHeader";
import Head from "next/head";
import AddOrderNewDetailInfo from "@/components/crm/order_new/order_new_detail/order_new_info";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useDataContainer } from "@/components/crm/context/dataContainer";
import Cookies from "js-cookie";
import AddButtonNewControl from "@/components/crm/order_new/order_new_detail/order_new_button_control";


const AddFilesPotential: React.FC = () => {
    const [orderDetail, setOrderDetail] = useState({});
    const [adminInfo, setAdminInfo] = useState({});
    const mainRef = useRef<HTMLDivElement>(null);
    const [checkFile, setCheckFile] = useState(false);
    const { isOpen } = useContext<any>(SidebarContext);
    const imgRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const {
        headerTitle,
        setHeaderTitle,
        setShowBackButton,
        setCurrentPath,
    }: any = useHeader();

    useEffect(() => {
        setHeaderTitle("Quản lý đơn hàng/ Chi tiết");
        setShowBackButton(true);
        setCurrentPath("/order-new/list");
    }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

    useEffect(() => {
        const getCustomer = async () => {
            try {
                const response = await fetch(`https://api.timviec365.vn/api/crm/order/orderTimviecDetail`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${Cookies.get("token_base365")}`,
                    },
                    body: JSON.stringify({ "id": router.query.id })
                });
                const data = await response.json();
                console.log("DT", data.data);
                setOrderDetail(data.data.data);
                setAdminInfo(data.data.adminInfo);
            } catch (error) {
                console.log(error);
            }
        }
        getCustomer()
    }, []);

    const handleClickImg = () => {
        imgRef?.current?.click();
    };

    useEffect(() => {
        if (isOpen) {
            mainRef.current?.classList.add("content_resize");
        } else {
            mainRef.current?.classList.remove("content_resize");
        }
    }, [isOpen]);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width" initial-scale="1" />
                <meta name="robots" content="noindex,nofollow" />
                <title>Chi tiết đơn hàng</title>
                <meta
                    name="description"
                    content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
                />
                <meta
                    name="Keywords"
                    content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
                />
                <meta property="og:locale" content="vi_VN" />
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="Phần mềm CRM của AI365 – giải pháp tuyệt vời chăm sóc khách hàng tự động"
                />
                <meta
                    property="og:description"
                    content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
                />
                <meta
                    property="og:image"
                    content="https://crm.timviec365.vn/assets/img/images-banners.png"
                />
                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:description"
                    content="CRM của AI365 là một phần mềm chăm sóc khách hàng tự động, có tính linh hoạt cao, thích hợp ứng dụng vào mọi loại hình doanh nghiệp. Phần mềm thuộc hệ sinh thái gồm 200 phần mềm, đều được AI365 kết nối trên 1 nền tảng duy nhất. Mọi báo cáo khách hàng đều được kiểm soát qua chat365 vô cùng tiện lợi"
                />
                <meta
                    name="twitter:title"
                    content="Phần mềm CRM của AI365 – giải pháp tuyệt vời chăm sóc khách hàng tự động"
                />
                <link rel="canonical" href="https://hungha365.com/crm" />

                {/* CSS */}
                <script
                    async
                    src="https://www.googletagmanager.com/gtm.js?id=GTM-NXVQCHN"
                ></script>
            </Head>
            <div className={styleHome.main} ref={mainRef}>
                <div className={styles.main_importfile}>
                    <div className={styles.formInfoStep}>
                        <div className={styles.info_step}>
                            <div className={styles.form_add_potential}>
                                <AddButtonNewControl orderDetail={orderDetail} adminInfo={adminInfo} />
                            </div>
                            <div className={styles.main__title}>Thông tin đơn hàng</div>
                            <div className={styles.form_add_potential}>
                                <div className={styles.main__body}>
                                    <AddOrderNewDetailInfo orderDetail={orderDetail} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddFilesPotential;
