import { useState } from "react";
import TableDataBillDetail from "@/components/crm/table/table-bill-detail";
import BillSelectBoxStep from "../bill_steps/select_box_step";
import styles from "./bill_detail.module.css";
import { Input, Tooltip } from "antd";
// import BillListModal from "../add_bill_action_modal/bill_list";

export default function AddTable() {
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin hàng hóa</p>
      <TableDataBillDetail
        setSelected={function (value: boolean): void {
          throw new Error("Function not implemented.");
        }}
      />

      <div className={styles.main__content__body}>
        <div className={`${styles.row}`}>
          <div className={`${styles["col-lg-3"]} }`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Chiết khấu đơn hàng:</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>0%</div>
            </div>
          </div>

          <div className={`${styles["col-lg-3"]} `}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>&nbsp;</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>0 VNĐ</div>
            </div>
          </div>

          <div className={`${styles["col-lg-6"]}`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between}`}
            >
              <div className={`${styles.main__body__item__title}`}>
                <b>Giá trị đơn hàng:</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>
                10.000.000 VNĐ
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
