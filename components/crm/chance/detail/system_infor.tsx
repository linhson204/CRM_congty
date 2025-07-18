import { timestampToCustomString } from "../../ultis/convert_date";
import styles from "../chance.module.css";
import TextAndIconInfo from "./text_and_icon_infor";
import InforText from "./text_info";
export default function SystemInfoRowChance({ formData, isHideEmpty }) {
  return (
    <div className={styles.row_input_text}>
      <TextAndIconInfo
        isHideEmpty={isHideEmpty}
        field="Người tạo:"
        src="/crm/user_kh.png"
        value={
          formData?.detailChance?.user_id_create?.userName || "Chưa cập nhật"
        }
      />
      <InforText
        isHideEmpty={isHideEmpty}
        field="Ngày tạo:"
        value={
          timestampToCustomString(Number(formData?.detailChance?.created_at)) ||
          "Chưa cập nhật"
        }
      />
      <TextAndIconInfo
        field="Người sửa:"
        src="/crm/user_kh.png"
        value={
          formData?.detailChance?.user_id_edit?.userName || "Chưa cập nhật"
        }
      />
      <InforText
        isHideEmpty={isHideEmpty}
        field="Ngày sửa:"
        value={
          timestampToCustomString(formData?.detailChance?.update_at) ||
          "Chưa cập nhật"
        }
      />
      <TextAndIconInfo
        field="Dùng chung:"
        src="/crm/dungchung_kh.svg"
        // value={formData?.detailChance?.share_all}
      />
    </div>
  );
}
