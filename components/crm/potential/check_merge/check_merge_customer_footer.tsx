import { useState } from "react";
import CancelModal from "../potential_steps/cancel_modal";
import styles from "../potential_add_files/add_file_potential.module.css";
import Link from "next/link";

export default function PotentialFooterCheckMerge() {
  const [isModalCancel, setIsModalCancel] = useState(false);
  return (
    <div className={styles.main__footer}>
      <button type="button" onClick={() => setIsModalCancel(true)}>
        Hủy
      </button>
      <Link href={"/customer/check_merge"}>
        <button className={styles.save} type="submit">
          Tiếp theo
        </button>
      </Link>

      {
        <CancelModal
          isModalCancel={isModalCancel}
          setIsModalCancel={setIsModalCancel}
          content={
            "Bạn có chắc chắn muốn hủy thêm mới tiềm năng Tên tiềm năng mọi thông tin bạn nhập sẽ không được lưu lại?"
          }
          title={"Xác nhận hủy thêm mới tiềm năng"}
          link="/customer/list"
        />
      }
    </div>
  );
}
