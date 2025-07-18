import CustomerSelectBoxStep from "./select_box_step";
import styles from "../../potential/potential_add_files/add_file_potential.module.css";
import InputText from "@/components/crm/potential/potential_add_files/input_text";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";

export default function EditPersonalCustomerInfor({
  formData,
  setFormData,
}: any) {
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin chung</p>

      <div className={styles.row_input}>
        <InputText
          label="Tên khách hàng"
          value={`${formData?.ten_khach_hang}`}
          setFormData={setFormData}
          keyValue="ten_khach_hang"
        />
        <InputText
          label="Tên viết tắt"
          placeholder="Tên viết tắt"
          setFormData={setFormData}
          value={` ${formData?.ten_viet_tat}`}
          keyValue="stand_name"
        />
      </div>

      <div className={styles.row_input}>
        <InputText
          label="Mã số thuế"
          placeholder="Nhập mã số thuế"
          setFormData={setFormData}
          value={` ${formData?.ma_so_thue}`}
          keyValue="tax_code"
        />
        <InputText
          label="Điện thoại"
          placeholder="Nhập số điện thoại"
          value={`${formData?.dien_thoai}`}
          setFormData={setFormData}
          keyValue="dien_thoai"
        />
      </div>

      <div className={styles.row_input}>
        <InputText
          label="Email"
          placeholder="Nhập email"
          value={`${formData?.email}`}
          setFormData={setFormData}
          keyValue="email"
        />
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Nguồn khách hàng</label>
          <CustomerSelectBoxStep
            placeholder="Chọn nguồn khách hàng"
            value={` ${formData?.thanh_pho}`}
          />
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>
            Phân loại khách hàng
          </label>
          <CustomerSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Lĩnh vực</label>
          <CustomerSelectBoxStep
            value="Chọn lĩnh vực"
            placeholder="Chọn lĩnh vực"
          />
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Loại hình</label>
          <CustomerSelectBoxStep value="Chọn" placeholder="Chọn" />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Ngành nghề</label>
          <CustomerSelectBoxStep
            value="Chọn ngành nghề"
            placeholder="Chọn ngành nghề"
          />
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <div className={styles.wrap_label}>
            <label className={`${styles["form-label"]}`}>Nhóm khách hàng</label>
            <Link color="#4C5BD4" href="/customer/group/list">
              + Thêm nhóm
            </Link>
          </div>
          <CustomerSelectBoxStep
            value="Chọn nhóm khách hàng"
            placeholder="Chọn nhóm khách hàng"
          />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <div className={styles.wrap_label}>
            <label className={`${styles["form-label"]}`}>
              Tình trạng khách hàng
            </label>
            <Link color="#4C5BD4" href="/tinh-trang-khach-hang">
              + Thêm tình trạng
            </Link>
          </div>
          <CustomerSelectBoxStep
            value="Chọn tình trạng khách hàng"
            placeholder="Chọn tình trạng khách hàng"
          />
        </div>
      </div>
      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>
            Nhân viên phụ trách
          </label>
          <CustomerSelectBoxStep
            value="Chọn nhân viên phụ trách"
            placeholder="Chọn nhân viên phụ trách"
          />
        </div>
      </div>
    </div>
  );
}
