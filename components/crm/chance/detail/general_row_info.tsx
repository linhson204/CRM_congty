import { timestampToCustomString } from "../../ultis/convert_date";
import styles from "../chance.module.css";
import InforText from "./text_info";
export default function GeneralRowInforText({ formData, isHideEmpty }) {
  // const listField = [
  //   {
  //     field: "Mã khách hàng:",
  //     value: "937843",
  //   },
  // ];

  const statusList = [
    { value: 1, label: "Chưa cập nhật" },
    { value: 2, label: "Mở đầu" },
    { value: 3, label: "Khách hàng quan tâm" },
    { value: 4, label: "Demo/Gthieu" },
    { value: 5, label: "Đàm phán/ thương lương" },
  ];

  const arrOriginCustomer = [
    { label: "Chưa cập nhật", value: 0 },
    { label: "Facebook", value: 1 },
    { label: "Website", value: 3 },
    { label: "Zalo", value: 2 },
    { label: "Dữ liệu bên thứ 3", value: 4 },
    { label: "Khách hàng giới thiệu", value: 5 },
    { label: "Giới thiệu", value: 6 },
    { label: "Chăm sóc khách hàng", value: 7 },
    { label: "Email", value: 8 },
    { label: "Chợt tốt", value: 9 },
  ];

  return (
    <div className={styles.row_input_text}>
      <InforText
        isHideEmpty={isHideEmpty}
        field="Khách hàng:"
        value={formData?.detailChance?.cus_id?.name || "Chưa cập nhật"}
      />
      <InforText field="Liên hệ:" value="Chưa cập nhật" />
      <InforText
        isHideEmpty={isHideEmpty}
        field="Tên cơ hội:"
        value={formData?.detailChance?.name || "Chưa cập nhật"}
      />
      <InforText
        isHideEmpty={isHideEmpty}
        field="Loại cơ hội:"
        value="Chưa cập nhật"
      />{" "}
      {/* No data */}
      <InforText
        isHideEmpty={isHideEmpty}
        field="Nhóm hàng hóa:"
        value={
          formData?.detailChance?.group_commodities?.gr_name || "Chưa cập nhật"
        }
      />
      <InforText
        isHideEmpty={isHideEmpty}
        field="Số tiền:"
        value={
          (formData?.detailChance?.total_money &&
            `${formData?.detailChance?.total_money} VND`) ||
          "Chưa cập nhật"
        }
      />
      <InforText
        isHideEmpty={isHideEmpty}
        field="Giai đoạn:"
        value={
          statusList?.[formData?.detailChance?.stages]?.label || "Chưa cập nhật"
        }
      />
      <InforText
        isHideEmpty={isHideEmpty}
        field="Tỉ lệ thành công:"
        value={formData?.detailChance?.success_rate || "Chưa cập nhật"}
      />
      <InforText
        isHideEmpty={isHideEmpty}
        field="Doanh số kỳ vọng:"
        value={formData?.detailChance?.expected_sales || "Chưa cập nhật"}
      />
      <InforText
        isHideEmpty={isHideEmpty}
        field="Ngày kỳ vọng/kết thúc:"
        value={
          timestampToCustomString(
            Number(formData?.detailChance?.expected_end_date) / 1000
          ) || "Chưa cập nhật"
        }
      />
      <InforText
        isHideEmpty={isHideEmpty}
        field="Chiến dịch:"
        value={
          formData?.detailChance?.campaign_id?.nameCampaign || "Chưa cập nhật"
        }
      />
      <InforText
        isHideEmpty={isHideEmpty}
        field="Nguồn gốc:"
        value={
          arrOriginCustomer?.[formData?.detailChance?.source]?.label ||
          "Chưa cập nhật"
        }
      />
      <InforText
        isHideEmpty={isHideEmpty}
        field="Nhân viên phụ trách:"
        value={formData?.detailChance?.emp_id?.userName || "Chưa cập nhật"}
      />
    </div>
  );
}
