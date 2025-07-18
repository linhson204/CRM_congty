import styles from "./add_file_campaign.module.css";
import InputText from "./input_text";
import { Input } from "antd";
import $ from "jquery";
import { useEffect, useState } from "react";
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.min.js";
import InputTextDotRed from "./input_text_dot_red";
import { useForm } from "../../hooks/useForm";
import { fetchApi } from "../../ultis/api";
import Cookies from "js-cookie";

export default function AddGeneralInfo({
  formFields,
  handleChange,
  typeRef,
  statusRef,
  chanelRef,
  empRef,
}) {
  const [emp, setEmp] = useState([]);
  const token = Cookies.get("token_base365");
  const dataTypeCampaign = [
    { value: 1, label: "Chưa cập nhật" },
    { value: 2, label: "Gửi mail" },
    { value: 3, label: "Điện thoại" },
    { value: 4, label: "Tổ chức hội thảo tập huấn" },
    { value: 5, label: "Gặp mặt trực tiếp" },
    { value: 6, label: "Qua bưu điện" },
    { value: 7, label: "Mạng xã hội" },
  ];

  const dataStatusCampaign = [
    { value: 1, label: "Chưa cập nhật" },
    { value: 2, label: "Chưa diễn ra" },
    { value: 3, label: "Đã kết thúc" },
    { value: 4, label: "Đang tạm dừng" },
    { value: 5, label: "Đang diễn ra" },
  ];

  const dataChanelCampaign = [
    { value: 1, label: "Chưa cập nhật" },
    { value: 2, label: "Website" },
    { value: 3, label: "Báo điện tử" },
    { value: 4, label: "Báo viết" },
    { value: 5, label: "Truyền hình" },
    { value: 6, label: "Mạng xã hôi" },
    { value: 7, label: "Tài trợ" },
    { value: 8, label: "Hội thảo-Triển lãm" },
  ];

  const fetchAPIEmployee = async () => {
    const dataApi = await fetchApi(
      "https://api.timviec365.vn/api/qlc/managerUser/listUser",
      token,
      { page: 1, pageSize: 10000 },
      "POST"
    );
    setEmp(dataApi?.data?.data);
  };

  useEffect(() => {
    fetchAPIEmployee();
  }, []);

  useEffect(() => {
    $(".js-example-basic-single").select2();
  }, []);

  return (
    <div>
      <p className={styles.main__body__type}>Thông tin chung</p>

      <div className={styles.row_custom}>
        <InputTextDotRed
          label="Tên chiến dịch"
          placeholder="Nhập tên chiến dịch"
          handleChange={handleChange}
          formFields={formFields}
          name="nameCampaign"
        />
        <div
          className={`${styles.mb_3} ${styles["col-lg-6"]} ${styles.custom_select2}`}
        >
          <label className={`${styles["form-label"]}`}>Loại</label>
          <select
            className="js-example-basic-single"
            name="typeCampaign"
            onChange={handleChange}
            value={formFields?.typeCampaign}
            ref={typeRef}
          >
            {dataTypeCampaign?.map((item, i) => (
              <option key={i} value={item.value}>
                {item?.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.row_custom}>
        <div
          className={`${styles.mb_3} ${styles["col-lg-6"]} ${styles.custom_select2}`}
        >
          <label className={`${styles["form-label"]}`}>Tình trạng</label>
          <select
            className="js-example-basic-single"
            name="state"
            onChange={handleChange}
            value={formFields?.status}
            ref={statusRef}
          >
            {dataStatusCampaign?.map((item, i) => (
              <option key={i} value={item.value}>
                {item?.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.row_input_custom}>
          <div className={`${styles.width1} ${styles["col-lg-6"]}`}>
            <InputText
              label="Ngày bắt đầu"
              placeholder=""
              type="date"
              handleChange={handleChange}
              formFields={formFields}
              name="timeStart"
            />
          </div>
          <div className={`${styles.width4} ${styles["col-lg-6"]}`}>
            <InputText
              label="Ngày kết thúc"
              placeholder=""
              type="date"
              handleChange={handleChange}
              formFields={formFields}
              name="timeEnd"
            />
          </div>
        </div>
      </div>

      <div className={styles.row_custom}>
        <div className={styles.row_input_custom}>
          <div className={`${styles.width2} ${styles["col-lg-6"]}`}>
            <label className={`${styles["form-label"]}`}>Ngân sách</label>
            <Input
              type="number"
              placeholder="Nhập"
              suffix="VNĐ"
              name="investment"
              onChange={handleChange}
              value={formFields?.investment || ""}
            />
          </div>
          <div className={`${styles.width3} ${styles["col-lg-6"]}`}>
            <label className={`${styles["form-label"]}`}>
              Doanh số kỳ vọng
            </label>
            <Input
              type="number"
              placeholder="Nhập"
              suffix="VNĐ"
              name="expectedSales"
              onChange={handleChange}
              value={formFields?.expectedSales || ""}
            />
          </div>
        </div>
        <div
          className={`${styles.mb_3} ${styles["col-lg-6"]} ${styles.custom_select2}`}
        >
          <label className={`${styles["form-label"]} `}>
            Kênh truyền thông
          </label>
          <select
            className="js-example-basic-single"
            name="state"
            ref={chanelRef}
            onChange={handleChange}
            value={formFields?.chanelCampaign}
          >
            {dataChanelCampaign?.map((item, i) => (
              <option key={i} value={item.value}>
                {item?.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.row_custom}>
        <InputText
          label="Số đã chi"
          type="number"
          placeholder="Nhập"
          handleChange={handleChange}
          formFields={formFields}
          name="money"
        />
        <div
          className={`${styles.mb_3} ${styles["col-lg-6"]} ${styles.custom_select2}`}
        >
          <label className={`${styles["form-label"]}`}>
            Nhân viên phụ trách
          </label>
          <select
            className={`js-example-basic-single`}
            name="state"
            ref={empRef}
            onChange={handleChange}
            value={formFields?.empID}
          >
            <option value="0">Chọn</option>
            {emp?.map((item, i) => (
              <option key={i} value={item.ep_id}>
                {item?.userName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <link href="path/to/select2.min.css" rel="stylesheet" />
      <script src="path/to/select2.min.js"></script>
    </div>
  );
}
