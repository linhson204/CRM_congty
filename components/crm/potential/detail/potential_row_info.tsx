import { renderPotentialPosition } from "@/utils/listOption";
import styles from "./information.module.css";
import InforText from "./text_info";
export default function PotentialRowInforText({ formData = null }) {
  return (
    <div className={styles.row_input_text}>
      <InforText
        field="Chức danh:"
        value={renderPotentialPosition(formData?.potential_id?.pos_id)}
      />
      <InforText
        field="Điện thoại cơ quan:"
        value={formData?.potential_id?.office_phone}
      />
      <InforText
        field="Email cơ quan:"
        value={formData?.potential_id?.office_email}
      />
    </div>
  );
}
