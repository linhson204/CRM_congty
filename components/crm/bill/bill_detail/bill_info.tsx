// import OrderSelectBoxStep from "../order_steps/select_box_step";
import styles from "./bill_detail.module.css";
// import InputText from "./input_text";
import { Input, Tooltip } from 'antd';

export default function AddOrderInfo() {
    return (
        <div>
            <div className={styles.main__content__body}>
                <div className={styles.row}>
                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}>

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

                            <div className={`${styles.main__body__item__title}`}><b>Số đề nghị xuất hóa đơn:</b></div>
                            <div className={`${styles.main__body__item__value}`}>DN -0005</div>
                        </div>
                    </div>
        
                    <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}>

                            <div className={`${styles.main__body__item__title}`}><b>Ngày hóa đơn:</b></div>
                            <div className={`${styles.main__body__item__value}`}>Chưa cập nhật</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
