import styles from "../chance.module.css";
import InforText from "./text_info";
import {
  LIST_CITY,
  LIST_DISTRICT,
  renderCity,
  renderDistrict,
} from "@/constants/address-constant";
export default function AddressRowInforTextChance({ formData, isHideEmpty }) {
  return (
    <div className={styles.row_input_text}>
      <InforText isHideEmpty={isHideEmpty} field="Quốc gia:" value="Việt Nam" />
      <InforText
        isHideEmpty={isHideEmpty}
        field="Tỉnh/Thành phố:"
        value={
          renderCity(formData?.detailChance?.city_chance) || "Chưa cập nhật"
        }
      />
      <InforText
        isHideEmpty={isHideEmpty}
        field="Quận/Huyện:"
        value={
          renderDistrict(formData?.detailChance?.district_chance) ||
          "Chưa cập nhật"
        }
      />
      <InforText
        isHideEmpty={isHideEmpty}
        field="Phường/Xã:"
        value="Chưa cập nhật"
      />
      <InforText
        isHideEmpty={isHideEmpty}
        field="Số nhà, đường phố:"
        value={formData?.detailChance?.street_chance || "Chưa cập nhật"}
      />
      <InforText
        isHideEmpty={isHideEmpty}
        field="Mã vùng:"
        value={formData?.detailChance?.area_code_chance || "Chưa cập nhật"}
      />
      <InforText
        isHideEmpty={isHideEmpty}
        field="Địa chỉ đơn hàng:"
        value={formData?.detailChance?.address_chance || "Chưa cập nhật"}
      />
    </div>
  );
}
