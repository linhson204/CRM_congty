import styles from "../customer.module.css";
import InforText from "./text_info";
export default function GeneralRowInforText({formData}: any) {
  const ArrNguonKK: any = [
    { name: "Chưa cập nhật", id: 0 },
    { name: "Facebook", id: 1 },
    { name: "Website", id: 3 },
    { name: "Zalo", id: 2},
    { name: "Dữ liệu bên thứ 3", id: 4 },
    { name: "Khách hàng giới thiệu", id: 5 },
    { name: "Giới thiệu", id: 6 },
    { name: "Chăm sóc khach hàng", id: 7 },
    { name: "Email", id: 8 },
  ];
  let nameNguon = ArrNguonKK?.filter(item => item.id ===formData?.resoure?.info )
  return (
    <div className={styles.row_input_text}>
      <InforText field="Mã khách hàng:" value={formData?.cus_id} />
      <InforText field="Tên khách hàng:" value={formData?.name} />
      <InforText field="Tên viết tắt:" value={formData?.stand_name?.detail?formData?.stand_name?.detail:"Chưa cập nhật"} />
      <InforText field="Mã số thuế:" value={formData?.tax_code?formData?.tax_code:"Chưa cập nhật"} />
      <InforText field="Điện thoại:" value={formData?.phone_number?.info?formData?.phone_number?.info:"Chưa cập nhật"} />
      <InforText field="Email:" value={formData?.email?.info?formData?.email?.info:"Chưa cập nhật"} />
      <InforText field="Nguồn khách hàng:" value={nameNguon[0]?.name?nameNguon[0]?.name:"Chưa cập nhật"} />
      <InforText field="Phân loại khách hàng:" value={formData?.classify?.info?formData?.classify?.info:"Chưa cập nhật"} />
   <InforText field="Lĩnh vực:" value={formData?.business_type?.info?formData?.business_type?.info:"Chưa cập nhật"} /> 
      {/* <InforText field="Loại hình:" value={formData?.loai_hinh_khach_hang?formData?.loai_hinh_khach_hang:"Chưa cập nhật"} /> */}
      <InforText field="Loại hình:" value={"Chưa cập nhật"} />

      <InforText field="Ngành nghề:" value={formData?.business_type?.info?formData?.business_type?.info:"Chưa cập nhật"} />
      <InforText field="Nhóm khách hàng:" value={formData?.group_id?.detail?.gr_name?formData?.group_id?.detail?.gr_name:"Chưa cập nhật"} />
      <InforText field="Tình trạng khách hàng:" value={formData?.status?.detail?.stt_name?formData?.status?.detail?.stt_name:"Chưa cập nhật"} />
      <InforText field="Nhân viên phụ trách:" value={formData?.emp_id?.detail.userName?formData?.emp_id?.detail.userName:"Chưa cập nhật"} />
    </div>
  );
}
