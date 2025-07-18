import { useState } from "react";
import TableDataBillAddFiles from "@/components/crm/table/table-bill-add-files";
import OrderSelectBoxStep from "../bill_steps/select_box_step";
import styles from "./add_file_bill.module.css";
import InputText from "./input_text";
import { Input, Tooltip } from "antd";
import OrderListModal from "@/components/crm/order/add_order_action_modal/order_list";

export default function AddTable() {
  const [isModalCancel, setIsModalCancel] = useState(false);
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin hàng hóa</p>
      <TableDataBillAddFiles
        setSelected={function (value: boolean): void {
          throw new Error("Function not implemented.");
        }}
      />

      <div className={styles.row_input}></div>
      <div className={styles.row_input}>
        <div className={`${styles.width2} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]} `}>
            Chiết khấu đơn hàng
          </label>
          <Input placeholder="0" suffix="%" />
        </div>
        <div className={`${styles.width3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>&nbsp;</label>
          <Input placeholder="0" suffix="VNĐ" />
        </div>

        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Giá trị đơn hàng</label>
          <Input
            style={{ background: "#e9ecef", color: "black" }}
            placeholder="0"
            suffix="VNĐ"
            disabled
          />
        </div>
      </div>
      {
        <OrderListModal
          isModalCancel={isModalCancel}
          setIsModalCancel={setIsModalCancel}
          title="Danh sách hàng hóa"
          // content="Hello"
        />
      }
    </div>
  );
}
