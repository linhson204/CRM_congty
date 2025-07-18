// import OrderSelectBoxStep from "../order_steps/select_box_step";
import styles from "./bill_detail.module.css";
// import InputText from "./input_text";
import { Input, Tooltip } from 'antd';

export default function AddBillBonuslInfo() {
    return (
        <div>
            <p className={styles.main__body__type}>Thông tin bổ sung</p>
            <div className={styles.main__content__body}>
                <div className={styles.row}>
                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}>

                            <div className={`${styles.main__body__item__title}`}><b>Loại hóa đơn:</b></div>
                            <div className={`${styles.main__body__item__value}`}>Hóa đơn GTGT</div>
                        </div>
                    </div>

                     

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Hình thức thanh toán:</b></div>
                            <div className={`${styles.main__body__item__value}`}>Chuyển khoản/Tiền mặt</div>
                        </div>
                    </div>

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Tình trạng:</b></div>
                            <div className={`${styles.main__body__item__value}`}>Đề nghị xuất</div>
                        </div>
                    </div>

                     

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Ngày đề nghị:</b></div>
                            <div className={`${styles.main__body__item__value}`}>10/10/2020</div>
                        </div>
                    </div>

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Số đơn hàng:</b></div>
                            <div className={`${styles.main__body__item__value} ${styles.not_update}`}>BG-0000</div>
                        </div>
                    </div>

                     

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Chiến dịch:</b></div>
                            <div className={`${styles.main__body__item__value} ${styles.not_update}`}>Chưa cập nhật</div>
                        </div>
                    </div>

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Mã tra cứu:</b></div>
                            <div className={`${styles.main__body__item__value} ${styles.not_update}`}>Chưa cập nhật</div>
                        </div>
                    </div>

                     

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Số hóa đơn:</b></div>
                            <div className={`${styles.main__body__item__value} ${styles.not_update}`}>Chưa cập nhật</div>
                        </div>
                    </div>

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Tình trạng gửi hóa đơn:</b></div>
                            <div className={`${styles.main__body__item__value} ${styles.not_update}`}>Chưa cập nhật</div>
                        </div>
                    </div>

                     

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Ngày hóa đơn:</b></div>
                            <div className={`${styles.main__body__item__value} ${styles.not_update}`}>Chưa cập nhật</div>
                        </div>
                    </div>

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Đã thu:</b></div>
                            <div className={`${styles.main__body__item__value} ${styles.not_update}`}>Chưa cập nhật</div>
                        </div>
                    </div>

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Chuyển hóa đơn giấy:</b></div>
                            <div className={`${styles.main__body__item__value} ${styles.not_update}`}>Chưa cập nhật</div>
                        </div>
                    </div>

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Đã nhận hóa đơn:</b></div>
                            <div className={`${styles.main__body__item__value} ${styles.not_update}`}>Chưa cập nhật</div>
                        </div>
                    </div>
                     

                </div>
            </div>

        </div>
    );
}
