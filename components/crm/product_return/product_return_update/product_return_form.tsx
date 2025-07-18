import styles from "../../potential/potential_add_files/add_file_potential.module.css";
import InputText from "@/components/crm/potential/potential_add_files/input_text";
import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import SelectOrederProductReturnModal from "../product_return_modal/product_return_select_table_mdal";
import { useState } from "react";
import InputProductReturnText from "./product_return_input";
export default function UpdateProductReturnForm() {
  const [isOpenModalSelect, setIsOpenModalSelect] = useState(false);
  return (
    <>
      <div style={{ marginTop: "-15px" }}>
        <p className={styles.main__body__type}>Thông tin chi tiết</p>

        <div className={styles.row_input_product}>
          <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
            <InputText
              label="Ngày đề nghị"
              placeholder="Ngày đề nghị"
              type="date"
              require={true}
            />
          </div>
          <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
            <label className={`${styles["form-label"]} required`}>
              Khách hàng
            </label>
            <PotentialSelectBoxStep value="Chọn" placeholder="Chọn" />
          </div>
        </div>

        <div className={styles.row_input_product}>
          <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
            <label className={`${styles["form-label"]}`}>Liên hệ</label>
            <PotentialSelectBoxStep value="Chọn" placeholder="Chọn" />
          </div>
          <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
            <label className={`${styles["form-label"]}`}>Người trả hàng</label>
            <PotentialSelectBoxStep value="Chọn" placeholder="Chọn" />
          </div>
        </div>

        <div className={styles.row_input_product}>
          <InputText label="Điện thoại" placeholder="SĐT của liên hệ" />
          <InputProductReturnText
            label="Đơn hàng"
            placeholder="Chọn đơn hàng"
            setOpenMdal={setIsOpenModalSelect}
          />
        </div>

        <div className={styles.row_input_product}>
          <InputText
            label="Diễn giải"
            placeholder="Nguyễn Trần Kim Phượng trả hàng"
          />
          <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
            <label className={`${styles["form-label"]}`}>
              Tình trạng thực hiện
            </label>
            <PotentialSelectBoxStep value="Chọn" placeholder="Chọn" />
          </div>
        </div>

        <div className={styles.row_input_product}>
          <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
            <label className={`${styles["form-label"]}`}>Người duyệt</label>
            <PotentialSelectBoxStep
              value="Chọn người duyệt"
              placeholder="Chọn người duyệt"
            />
          </div>
        </div>
      </div>
      <SelectOrederProductReturnModal
        isModalCancel={isOpenModalSelect}
        setIsModalCancel={setIsOpenModalSelect}
      />
    </>
  );
}
