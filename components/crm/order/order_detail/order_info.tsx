// import OrderSelectBoxStep from "../order_steps/select_box_step";
import styles from "./order_detail.module.css";
// import InputText from "./input_text";
import { Input, Tooltip } from 'antd';

export default function AddOrderInfo() {
    return (
        <div>
            <div className={styles.main__content__body}>
                <div className={styles.row}>
                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}>

                            <div className={`${styles.main__body__item__title}`}><b>Số đơn hàng:</b></div>
                            <div className={`${styles.main__body__item__value}`}>ĐH-0000</div>
                        </div>
                    </div>
             
                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Ngày đặt hàng:</b></div>
                            <div className={`${styles.main__body__item__value}`}>10/10/2020</div>
                        </div>
                    </div>
                    
                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Giá trị đơn hàng:</b></div>
                            <div className={`${styles.main__body__item__value}`}>10.000.000 VNĐ</div>
                        </div>
                    </div>
        
                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Tình trạng:</b></div>
                            <div className={`${styles.main__body__item__value} ${styles.stt_yellow}`}>Chờ duyệt</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
