import styles from "../customer.module.css";
import InforText from "./text_info";
export default function WriteBillRowInforText2({formData}:any) {
  return (
    <div className={styles.row_input_text}>
      <InforText field="Quốc gia:" value="Việt Nam" />
      <InforText field="Tỉnh/Thành phố:" value={formData?.ship_city?.name}/>
      <InforText field="Quận/Huyện:" value={formData?.giao_hang_huyen?.name?formData?.giao_hang_huyen?.name:"Chưa cập nhật"}/>
      <InforText field="Phường/Xã:" value={formData?.giao_hang_xa?formData?.giao_hang_xa:"Chưa cập nhật"}/>
      <InforText field="Số nhà, đường phố:" value={formData?.so_nha_duong_pho_hd?formData?.so_nha_duong_pho_hd:"Chưa cập nhật"}/>
      <InforText field="Mã vùng:" value={formData?.ma_vung_giao_hang?formData?.ma_vung_giao_hang:"Chưa cập nhật"}/>
      <InforText field="Địa chỉ đơn hàng:" value={formData?.ship_invoice_address?.info?formData?.ship_invoice_address?.info:"Chưa cập nhật"}/>
    </div>
  );
}
