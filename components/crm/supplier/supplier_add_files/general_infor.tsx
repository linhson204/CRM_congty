import React from "react";
import { Input } from "antd";
import styles from "./add_file_supplier.module.css";
import InputText from "./input_text";
import { Select } from "antd";

const { Option } = Select;

const handleChange = (value: string[]) => {};
export default function AddPersonalInfo() {
  return (
    <div>
      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label
            className={`${styles["form-label"]}`}
            style={{
              fontWeight: "bold",
            }}
          >
            Mã nhà cung cấp
          </label>
          <Input
            style={{
              lineHeight: "1.8",
              borderRadius: "0.25rem",
            }}
            prefix="Hệ thống tự động thiết lập"
            disabled
          />
        </div>

        <label className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <div>
            <label
              className="bank"
              style={{
                fontWeight: "bold",
              }}
            >
              Ngân hàng
            </label>
          </div>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Tìm kiếm hoặc chọn nhóm nhà cung cấp"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={[
              {
                value: "vcb",
                label: "Ngân hàng ngoại thương Việt Nam (Vietcombank)",
              },
              {
                value: "bidv",
                label: "Ngân hàng Đầu Tư và Phát triển Việt Nam ( BIDV )",
              },
              {
                value: "Vietin",
                label: "NH TMCP Công thương Việt Nam (Vietinbank)",
              },
              {
                value: "agri",
                label:
                  "NH Nông nghiệp và Phát triển Nông thôn Việt Nam (Agribank)",
              },
              {
                value: "acb",
                label: "NH TMCP Á Châu (ACB Bank)",
              },
              {
                value: "mb",
                label: "NH TMCP Quân Đội (MB Bank)",
              },
              {
                value: "maritime",
                label: "NHTMCP Hàng Hải (Maritime Bank)",
              },
              {
                value: "tech",
                label: "NHTMCP Kỹ Thương Việt Nam (Techcombank)",
              },
            ]}
          />
        </label>
      </div>

      <div className={styles.row_input}>
        <InputText
          label="Tên nhà cung cấp"
          placeholder="Nhập tên nhà cung cấp"
        />
        <InputText label="Số tài khoản" placeholder="Nhập số tài khoản" />
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <InputText label="Số điện thoại" placeholder="Nhập số điện thoại" />
        </div>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <InputText label="Chủ tài khoản" placeholder="Nhập tên tài khoản" />
        </div>
      </div>

      <div className={styles.row_input}>
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <InputText label="Email" placeholder="Nhập email" />
        </div>

        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label style={{ width: "100%" }}>
            <div className={styles.wrap_label}>
              <label className={`${styles["form-label"]}`}>
                Nhóm khách hàng
              </label>
              <button
                style={{ paddingBottom: 10, fontSize: 16, color: "#4C5BD4" }}
              >
                Tạo nhóm
              </button>
            </div>
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Tìm kiếm theo nhóm khách hàng"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                {
                  value: "1",
                  label: "Nhóm 1",
                },
                {
                  value: "2",
                  label: "Nhóm 2",
                },
                {
                  value: "3",
                  label: "Nhóm 3",
                },
                {
                  value: "4",
                  label: "Nhóm 4",
                },
              ]}
            />
          </label>
        </div>
      </div>

      <div className={styles.row_input}>
        <InputText label="Địa chỉ" placeholder="Nhập địa chỉ" />
        <InputText
          label="Mô tả nhà cung cấp"
          placeholder="Nhập nội dung mô tả nhà cung cấp"
        />
      </div>

      <div className={styles.row_input}>
        <InputText label="Người liên hệ" placeholder="Nhập tên người liên hệ" />
        <InputText label="Mã số thuế" placeholder="Nhập mã số thuế" />
      </div>

      <div className={styles.row_input}>
        <InputText
          label="Số điện thoại người liên hệ"
          placeholder="Nhập số điện thoại"
        />
        <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label>
            <label
              style={{
                fontWeight: "bold",
                width: "100%",
              }}
            >
              Nhân viên phụ trách
            </label>
            <br />
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Tìm kiếm hoặc chọn nhân viên phụ trách"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                {
                  value: "1",
                  label: "Nhân viên 1",
                },
                {
                  value: "2",
                  label: "Nhân viên 2",
                },
                {
                  value: "3",
                  label: "Nhân viên 3",
                },
              ]}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
