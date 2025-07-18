import styles from "../customer.module.css";
import InforText from "./text_info";
export default function CCCDInforRow({formData}:any) {
  var seconds2 = formData?.cmnd_ccnd_time * 1000; 
  var date2 = new Date(seconds2 * 1000);  // Nhân cho 1000 để chuyển từ seconds thành milliseconds
  var day = date2.getDate();
  var month = date2.getMonth() + 1;  // Lưu ý rằng tháng trong JavaScript bắt đầu từ 0
  var year = date2.getFullYear();
  var ngaycapcccd = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year;
if(ngaycapcccd==="01/01/1970"){
  ngaycapcccd=null
}
  return (
    <div className={styles.row_input_text}>
      <InforText field="Số CMND/CCCD::" value={formData?.cmnd_ccnd_number?formData?.cmnd_ccnd_number:"Chưa cập nhật"}/>
      <InforText field="Nơi cấp:" value={formData?.cmnd_ccnd_address?formData?.cmnd_ccnd_address:"Chưa cập nhật"}/>
      <InforText field="Ngày cấp:" value={ngaycapcccd?ngaycapcccd:"Chưa cập nhật"}/>
    </div>
  );
}
