import { Col, Image, Row } from "antd";
import styles from "./styles-card.module.scss";
export default function CardTongDai() {
    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <div className={styles.wrapper}>
                    <div className={styles.title}>
                        TÍNH NĂNG TỔNG ĐÀI ĐA THÔNG MINH
                    </div>
                    <div className={styles.chan}>
                        <div className={styles.card_content}>
                            <div className={styles.card_title}>01</div>
                            <div className={styles.card_name}>
                                Tính năng tiện ích
                            </div>
                            <div className={styles.card_des}>
                                OMICall: Hỗ trợ liên kết và chăm sóc khách hàng
                                - CRM (Quản lý - Phân quyền - Lưu trữ), cung cấp
                                giao diện lập trình ứng dụng (API), mở rộng data
                                lưu trữ.v.v
                            </div>
                        </div>
                        <div className={styles.line1}></div>
                        <div className={styles.card_content}>
                            <div className={styles.card_title}>02</div>
                            <div className={styles.card_name}>
                                Đa dạng gói dịch vụ
                            </div>
                            <div className={styles.card_des}>
                                OMICall: Bảng giá đa dạng dành cho doanh nghiệp.
                                Cung cấp các tính năng chuyên nghiệp, đưa ra
                                nhiều sự chọn hợp lý cho từng yêu cầu của doanh
                                nghiệp, tiết kiệm thời gian và chi phí.
                            </div>
                        </div>
                    </div>
                    <div className={styles.line2}></div>
                    <div className={styles.chan}>
                        <div className={styles.card_content}>
                            <div className={styles.card_title}>03</div>
                            <div className={styles.card_name}>
                                Giảm thiểu chi phí doanh nghiệp
                            </div>
                            <div className={styles.card_des}>
                                OMICall: Hỗ trợ gói chi phí lắp đặt, giá thành
                                canh tranh, tỉ lệ thành công cuộc gọi cao, đột
                                phá doanh số, tối ưu hóa mối quan hệ giữa doanh
                                nghiệp và khánh hàng.v.v
                            </div>
                        </div>
                        <div className={styles.line1}></div>

                        <div className={styles.card_content}>
                            <div className={styles.card_title}>04</div>
                            <div className={styles.card_name}>
                                Quyền lợi doanh nghiệp
                            </div>
                            <div className={styles.card_des}>
                                OMICall: Hỗ trợ chế độ dùng thử 30 ngày, hỗ trợ
                                doanh nghiệp thay đổi gói dịch vụ dễ dàng, giao
                                diện thân thiện với người dùng, bảo mật thông
                                tin dữ liệu khách hàng và doanh nghiệp.v.v
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
