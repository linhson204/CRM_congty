import styles from "../chance.module.css";
import InforText from "./text_info";
export default function CCCDInforRow() {

  return (
    <div className={styles.row_input_text}>
      <InforText field="Số CMND/CCCD::" value="937843" />
      <InforText field="Nơi cấp:" value="Hn" />
      <InforText field="Ngày cấp:" value="12/12/2023" />
    </div>
  );
}
