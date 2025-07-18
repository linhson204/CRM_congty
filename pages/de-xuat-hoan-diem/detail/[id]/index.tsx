import { SidebarContext } from "@/components/crm/context/resizeContext";
import { useHeader } from "@/components/crm/hooks/useHeader";
import Head from "next/head";
import React, { useContext, useEffect, useRef } from "react";
import styles from '@/components/crm/de_xuat_hoan_diem/detail/dxhd_detail.module.css'
import styleHome from "@/components/crm/home/home.module.css";
import DxhdDetailBtnGroup from "@/components/crm/de_xuat_hoan_diem/detail/dxhd_button_group";
import { DxhdDetailProvider } from "@/components/crm/de_xuat_hoan_diem/dxhd_detail_context";
import DxhdDetailInfo from "@/components/crm/de_xuat_hoan_diem/detail/dxhd_detail_info";
import TableDxhdDetail from "@/components/crm/table/table-dxhd-detail";
import DxhdDetailDiary from "@/components/crm/de_xuat_hoan_diem/detail/dxhd_detail_diary";

const DxhdDetail: React.FC = () => {
    const mainRef = useRef<HTMLDivElement>(null);
    const { isOpen } = useContext<any>(SidebarContext);
    const {
        headerTitle,
        setHeaderTitle,
        setShowBackButton,
        setCurrentPath,
    }: any = useHeader();

    useEffect(() => {
        setHeaderTitle("Đề xuất hoàn điểm / Chi tiết");
        setShowBackButton(true);
        setCurrentPath("/de-xuat-hoan-diem/list");
    }, [setHeaderTitle, setShowBackButton, setCurrentPath]);

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
                <title>Chi tiết đề xuất hoàn điểm </title>
                <meta
                    name="description"
                    content="CRM 365 được đánh giá là công cụ tốt nhất hiện nay trong việc kết nối khách hàng và doanh nghiệp. Phần mềm chú trọng vào các nhiệm vụ hỗ trợ doanh nghiệp tăng tập khách hàng tiềm năng và thân thiết, tăng doanh thu và tối ưu chi phí. Đăng ký hôm nay, lợi ích đến ngay!"
                />
                <meta name="Keywords" content="Phần mềm CRM, phần mềm crm miễn phí" />
                <meta property="og:locale" content="vi_VN" />
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="CRM 365 - đáp án của bài toán tối ưu quy trình, gia tăng lợi nhuận"
                />
                <meta
                    property="og:description"
                    content="CRM 365 được đánh giá là công cụ tốt nhất hiện nay trong việc kết nối khách hàng và doanh nghiệp. Phần mềm chú trọng vào các nhiệm vụ hỗ trợ doanh nghiệp tăng tập khách hàng tiềm năng và thân thiết, tăng doanh thu và tối ưu chi phí. Đăng ký hôm nay, lợi ích đến ngay!"
                />
                <meta
                    property="og:image"
                    content="https://crm.timviec365.vn/assets/img/images-banners.png"
                />
                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:description"
                    content="CRM 365 được đánh giá là công cụ tốt nhất hiện nay trong việc kết nối khách hàng và doanh nghiệp. Phần mềm chú trọng vào các nhiệm vụ hỗ trợ doanh nghiệp tăng tập khách hàng tiềm năng và thân thiết, tăng doanh thu và tối ưu chi phí. Đăng ký hôm nay, lợi ích đến ngay!"
                />
                <meta
                    name="twitter:title"
                    content="CRM 365 - đáp án của bài toán tối ưu quy trình, gia tăng lợi nhuận"
                />
                <link rel="canonical" href="https://hungha365.com/crm" />

                {/* CSS */}
                <script
                    async
                    src="https://www.googletagmanager.com/gtm.js?id=GTM-NXVQCHN"
                ></script>
            </Head>
            <DxhdDetailProvider>
                <div className={styleHome.main} ref={mainRef}>
                    <div className={styles.main_importfile}>
                        <div className={styles.formInfoStep}>
                            <div className={styles.info_step}>
                                <div className={styles.form_add_potential}>
                                    <DxhdDetailBtnGroup />
                                </div>

                                <div className={styles.main__title}>Thông tin đề xuất</div>
                                <div className={styles.form_add_potential}>
                                    <div
                                        className={styles.main__body}
                                    // style={{ height: 180 }}
                                    >
                                        <DxhdDetailInfo />
                                    </div>
                                </div>

                                <div className={styles.main__title}>Danh sách yêu cầu</div>
                                <div className={styles.form_add_potential}>
                                    <div
                                        className={styles.main__body}
                                    // style={{ height: 180 }}
                                    >
                                        <TableDxhdDetail />
                                    </div>
                                </div>

                                <div className={styles.main__title}>Nhật ký</div>
                                <div className={styles.form_add_potential}>
                                    <div
                                        className={styles.main__body}
                                    // style={{ height: 180 }}
                                    >
                                        <DxhdDetailDiary />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DxhdDetailProvider>
        </>
    )
}

export default DxhdDetail