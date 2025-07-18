// import OrderSelectBoxStep from "../order_steps/select_box_step";
import styles from "./bill_detail.module.css";
// import InputText from "./input_text";
import { Input, Tooltip } from 'antd';

export default function AddBillGeneralInfo() {
    return (
        <div>
            <p className={styles.main__body__type}>Thông tin chung</p>
            <div className={styles.main__content__body}>
                <div className={styles.row}>
                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}>

                            <div className={`${styles.main__body__item__title}`}><b>Số đề nghị xuất hóa đơn:</b></div>
                            <div className={`${styles.main__body__item__value}`}>ĐN-0000</div>
                        </div>
                    </div>

                     

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Khách hàng:</b></div>
                            <div className={`${styles.main__body__item__value}`}>Nguyễn Trần Kim Phượng</div>
                        </div>
                    </div>

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Địa chỉ:</b></div>
                            <div className={`${styles.main__body__item__value}`}>Số 1 Trần Nguyên Đán, Định Công, Hoàng Mai, Hà Nội</div>
                        </div>
                    </div>

                     

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Tài khoản ngân hàng:</b></div>
                            <div className={`${styles.main__body__item__value} ${styles.not_update}`}>Chưa cập nhật</div>
                        </div>
                    </div>

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Mở tại ngân hàng:</b></div>
                            <div className={`${styles.main__body__item__value} ${styles.not_update}`}>Chưa cập nhật</div>
                        </div>
                    </div>

                     

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Mã số thuế:</b></div>
                            <div className={`${styles.main__body__item__value} ${styles.not_update}`}>Chưa cập nhật</div>
                        </div>
                    </div>

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Người mua hàng:</b></div>
                            <div className={`${styles.main__body__item__value} ${styles.not_update}`}>Chưa cập nhật</div>
                        </div>
                    </div>

                     

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Người nhận hóa đơn:</b></div>
                            <div className={`${styles.main__body__item__value}`}>Đơn hàng bán cho Nguyễn Trần Kim Phượng</div>
                        </div>
                    </div>

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Email người nhận hóa đơn:</b></div>
                            <div className={`${styles.main__body__item__value} ${styles.not_update}`}>Chưa cập nhật</div>
                        </div>
                    </div>

                     

                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Điện thoại người nhận hóa đơn:</b></div>
                            <div className={`${styles.main__body__item__value} ${styles.not_update}`}>Chưa cập nhật</div>
                        </div>
                    </div>
                     

                </div>
            </div>

        </div>
    );
}
