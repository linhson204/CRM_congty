import { SidebarContext } from "@/components/crm/context/resizeContext";
import DxhdDetailDiary from "@/components/crm/de_xuat_hoan_diem/detail/dxhd_detail_diary";
import { DxhdDetailProvider } from "@/components/crm/de_xuat_hoan_diem/dxhd_detail_context";
import styles from "@/components/crm/de_xuat_hoan_diem/process/dxhd_process.module.css";
import DxhdProcessBtnGroup from "@/components/crm/de_xuat_hoan_diem/process/dxhd_process_button_group";
import DxhdProcessInfo from "@/components/crm/de_xuat_hoan_diem/process/dxhd_process_info";
import styleHome from "@/components/crm/home/home.module.css";
import { useHeader } from "@/components/crm/hooks/useHeader";
import TableDxhdProcess from "@/components/crm/table/table-dxhd-process";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef } from "react";

const DxhdProcess: React.FC = () => {
    const mainRef = useRef<HTMLDivElement>(null);
    const { isOpen } = useContext<any>(SidebarContext);
    const {
        headerTitle,
        setHeaderTitle,
        setShowBackButton,
        setCurrentPath,
    }: any = useHeader();
    const router = useRouter();
    const { id } = router.query

    useEffect(() => {
        setHeaderTitle("Đề xuất hoàn điểm / Xử lý");
        setShowBackButton(true);
        setCurrentPath(`/de-xuat-hoan-diem/detail/${id}`);
    }, [setHeaderTitle, setShowBackButton, setCurrentPath, id]);

    useEffect(() => {
        if (isOpen) {
            mainRef.current?.classList.add("content_resize");
        } else {
            mainRef.current?.classList.remove("content_resize");
        }
    }, [isOpen]);

    // Cảnh báo reload
    useEffect(() => {

        const handleBeforeUnload = (event) => {
            const message = 'Những thao tác bạn chưa lưu sẽ bị mất!\nBạn có chắc chắn không?';
            event.returnValue = message; // Standard for most browsers
            return message; // For some older browsers
        };

        // Attach the event listener when the component mounts
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [])

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width" initial-scale="1" />
                <meta name="robots" content="noindex,nofollow" />
                <title>Xử lý đề xuất hoàn điểm </title>
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
                                <div className={styles.main__title}>Thông tin đề xuất</div>
                                <div className={styles.form_add_potential}>
                                    <div
                                        className={styles.main__body}
                                    // style={{ height: 180 }}
                                    >
                                        <DxhdProcessInfo />
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

                                <div className={styles.main__title}>Danh sách yêu cầu</div>
                                <div className={styles.form_add_potential}>
                                    <div
                                        className={styles.main__body}
                                    // style={{ height: 180 }}
                                    >
                                        <TableDxhdProcess />
                                    </div>
                                </div>

                                <div className={styles.form_add_potential}>
                                    <DxhdProcessBtnGroup />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DxhdDetailProvider>
        </>
    )
}

export default DxhdProcess