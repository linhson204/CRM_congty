import { useState } from "react";
import TableDataOrderAddFiles from "@/components/crm/table/table-order-edit-files";
import OrderSelectBoxStep from "../quote_steps/select_box_step";
import styles from "./edit_file_order.module.css";
import InputText from "./input_text";
import { Input, Tooltip } from "antd";
import OrderListModal from "../add_quote_action_modal/quote_list";

export default function AddTable() {
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [tongTien, setTongTien] = useState<number>(0);

  return (
    <div>
      <p className={styles.main__body__type}>Thông tin hàng hóa</p>
      {/* <TableDataOrderAddFiles setTongTien={setTongTien} /> */}

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
          <Input placeholder="0" suffix="VNĐ" disabled />
        </div>
      </div>
      {
        // <OrderListModal
        //   isModalSelect={isModalSelect}
        //   setIsModalSelect={setIsModalSelect}
        //   // content={contentCancel}
        //   // title={titleCancel}
        // />
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
