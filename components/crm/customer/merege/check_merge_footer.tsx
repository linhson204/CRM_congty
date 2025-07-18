import { useState } from "react";
import styles from "../potential_add_files/add_file_potential.module.css";
import Link from "next/link";
import CancelModal from "../../potential/potential_steps/cancel_modal";

export default function PotentialFooterCheckMerge() {
  const [isModalCancel, setIsModalCancel] = useState(false);
  return (
    <div className={styles.main__footer}>
      <button type="button" onClick={() => setIsModalCancel(true)}>
        Hủy
      </button>
      <Link href={"/customer/same_filter"}>
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
          link="/potential/list"
        />
      }
    </div>
  );
}
