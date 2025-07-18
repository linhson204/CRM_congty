import { useState } from "react";
import TableDataOrderDetail from "@/components/crm/table/table-order-detail";
import styles from "../../../crm/order/order_detail/order_detail.module.css";
import { Input, Tooltip } from "antd";
import TableDataProductChanceDetail from "../../table/table-chance-product-detail";

export default function ChanceProductDetailTable({ formData }) {
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin hàng hóa</p>
      <TableDataProductChanceDetail formData={formData} />

      <div className={styles.main__content__body}>
        <div className={`${styles.row}`}>
          <div className={`${styles["col-lg-3"]} }`}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
            >
              <div
                className={`${styles.main__body__item__title}`}
                style={{ marginLeft: "15px" }}
              >
                <b>Chiết khấu đơn hàng:</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>
                {formData?.detailChance?.chance_discount_rate}%
              </div>
            </div>
          </div>

          <div className={`${styles["col-lg-3"]} `}>
            <div
              className={`${styles.main__body__item} ${styles.d_flex} ${styles.justify_content_between} `}
            >
              <div
                className={`${styles.main__body__item__title}`}
                style={{ marginLeft: "15px" }}
              >
                <b>Số tiền</b>
              </div>
              <div className={`${styles.main__body__item__value}`}>
                {formData?.detailChance?.chance_discount_money} VNĐ
              </div>
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
                {formData?.detailChance?.total_money} VNĐ
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
