import { useEffect, useState } from "react";
import styles from "../order_edit_files/order_edit.module.css";
import { Input } from "antd";
import OrderListModal from "../add_order_action_modal/order_list";
import TableDataOrderEditFiles from "../../table/table-order-edit-files";

export default function EditTable() {
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [tongTien, setTongTien] = useState<number>(0);
  const [chietkhau, setChieuKhau] = useState<number>(0);

  const handleChietKhauChange = (e) => {
    const newValue = e.target.value;
    setChieuKhau(newValue);
  };
  const calculateOrderValue = (tongTien, chietkhau) => {
    const giaTriDonHang = tongTien - (chietkhau * tongTien) / 100;
    return giaTriDonHang;
  };

  return (
    <div>
      <p className={styles.main__body__type}>
        Thông tin hàng hóa
        <button
          onClick={() => {
            setIsModalCancel(true);
          }}
          className={`${styles.pick_product} `}
        >
          <i className="bi bi-check2-square"></i>
          <b>Chọn hàng hóa</b>
        </button>
      </p>
      {/* <TableDataOrderEditFiles setTongTien={setTongTien} /> */}

      <div className={styles.row_input}></div>
      <div className={styles.row_input}>
        <div className={`${styles.width2} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]} `}>
            Chiết khấu đơn hàng
          </label>
          <Input
            value={chietkhau}
            onChange={handleChietKhauChange}
            suffix="%"
          />
        </div>
        <div
          className={`${styles.width3} ${styles["col-lg-6"]}`}
          style={{ marginBottom: "15px" }}
        >
          <label className={`${styles["form-label"]}`}>&nbsp;</label>
          <Input value={tongTien} suffix="VNĐ" />
        </div>

        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Giá trị đơn hàng</label>
          <Input
            value={calculateOrderValue(tongTien, chietkhau)}
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
