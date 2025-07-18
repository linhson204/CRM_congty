import PotentialSelectBoxStep from "@/components/crm/potential/potential_steps/select_box_step";
import styles from "../../potential/potential_add_files/add_file_potential.module.css";
import InputText from "@/components/crm/potential/potential_add_files/input_text";
import Link from "next/link";
import { useState, useContext } from "react";

export default function AddPersonalCustomerInfor({
  formData,
  setFormData,
}: any) {
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin chung</p>

      <div className={styles.row_input}>
        <InputText
          label="Tên khách hàng"
          placeholder="Nhập tên khách hàng"
          value={formData?.name}
          setFormData={setFormData}
          keyValue="name"
        />
        <InputText
          label="Tên viết tắt"
          placeholder="Tên viết tắt"
          setFormData={setFormData}
          value={formData?.stand_name}
          keyValue="stand_name"
        />
      </div>

      <div className={styles.row_input}>
        <InputText
          label="Mã số thuế"
          placeholder="Nhập mã số thuế"
          setFormData={setFormData}
          value={formData?.tax_code}
          keyValue="tax_code"
        />
        <InputText
          label="Điện thoại"
          placeholder="Nhập số điện thoại"
          value={formData?.phone_number}
          setFormData={setFormData}
          keyValue="phone_number"
        />
      </div>
      <div className={styles.row_input}>
        <InputText
          label="Email"
          placeholder="Nhập email"
          value={formData?.email}
          setFormData={setFormData}
          keyValue="email"
        />
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Nguồn khách hàng</label>
          <PotentialSelectBoxStep
            placeholder="Chọn nguồn khách hàng"
            value={formData?.cus_from}
            selectData={(value) => {
              setFormData((prev) => {
                return { ...prev, cus_from: value };
              });
            }}
            data={[
              "Facebook",
              "Zalo",
              "Website",
              "Dữ liệu bên thứ 3",
              "Khách hàng giới thiệu",
              "Giới thiệu",
              "Chăm sóc khách hàng",
              "Email",
            ]}
          />
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>
            Phân loại khách hàng
          </label>
          <PotentialSelectBoxStep
            value={formData?.business_type}
            placeholder="Chọn"
            selectData={(value) => {
              setFormData((prev) => {
                return { ...prev, business_type: value };
              });
            }}
            data={["Khách hàng dự án", "Khách hàng bán lẻ"]}
          />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Lĩnh vực</label>
          <PotentialSelectBoxStep
            value={formData?.business_areas}
            placeholder="Chọn lĩnh vực"
            selectData={(value) => {
              setFormData((prev) => {
                return { ...prev, business_areas: value };
              });
            }}
            data={[
              "Thương mại",
              "Dịch vụ",
              "Sản xuất",
              "Xây lắp",
              "Công nghiệp nhẹ",
            ]}
          />
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Loại hình</label>
          <PotentialSelectBoxStep
            value={formData?.classify}
            placeholder="Chọn"
            selectData={(value) => {
              setFormData((prev) => {
                return { ...prev, classify: value };
              });
            }}
            data={["Doanh nghiệp", "Hộ cá thể", "Hành chính sự nghiệp", "Khác"]}
          />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Ngành nghề</label>
          <PotentialSelectBoxStep
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
          <PotentialSelectBoxStep
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
          <PotentialSelectBoxStep
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
          <PotentialSelectBoxStep
            value="Chọn nhân viên phụ trách"
            placeholder="Chọn nhân viên phụ trách"
          />
        </div>
      </div>
    </div>
  );
}
