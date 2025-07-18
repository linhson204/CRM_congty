import InforText from "../../detail/text_info";
import styles from "../../customer.module.css";
export default function GeneralRowInforTextContact() {
  return (
    <div className={styles.row_input_text}>
      <InforText field="Mã liên hệ:" value="937843" />
      <InforText field="Xưng hô:" value="123123" />
      <InforText field="Họ và đệm:" value="qưa" />
      <InforText field="Tên:" value="937843" />
      <InforText field="Họ và tên:" value="937843" />
      <InforText field="Chức danh:" value="937843" />
      <InforText field="Phòng ban:" value="Facebook" />
      <InforText field="Không gọi điện:" value="937843" />
      <InforText field="Không gửi mail:" value="937843" />
      <InforText field="Điện thoại cơ quan:" value="937843" />
      <InforText field="Điện thoại cá nhân:" value="0012636" />
      <InforText field="Email cơ quan:" value="937843" />
      <InforText field="Email cá nhân:" value="937843" />
      <InforText field="Mạng xã hội:" value="Facebook" />
      <InforText field="Nguồn gốc:" value="Facebook" />
      <InforText field="Zalo:" value="011725" />
      <InforText field="Facebook:" value="qgdfw71" />
    </div>
  );
}
