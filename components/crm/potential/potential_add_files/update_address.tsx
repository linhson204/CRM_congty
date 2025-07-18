import { SelectSingleAndOption } from "@/components/commodity/select";
import PotentialSelectBoxStep from "../potential_steps/select_box_step";
import styles from "./add_file_potential.module.css";
import InputText from "./input_text";
import { useEffect, useState } from "react";
import {
  LIST_CITY,
  LIST_DISTRICT,
  renderCity,
  renderDistrict,
} from "@/constants/address-constant";
import axios from "axios";
import { notifyError } from "@/utils/function";
import { MInputTextAndOption, MTextArea } from "@/components/commodity/input";
export default function UpdateAddressInfo({
  title = "Thông tin địa chỉ",
  formData,
  setFormData,
}: any) {
  const [listWard, setListWard] = useState([]);
  const [address, setAddress] = useState<string>("");
  const handleChangeCity = () => {
    delete formData.district_id;
    delete formData.ward;
    setFormData(formData);
  };
  const handleChangeDistrict = () => {
    delete formData.ward;
    setFormData(formData);
  };
  useEffect(() => {
    if (formData?.district_id) {
      axios
        .post("https://210.245.108.202:3004/api/raonhanh/topCache/ward", {
          id: formData.district_id,
        })
        .then((res) => convertWard(res.data.data.data))
        .catch((err) => {
          console.log("checkerrrrr-----", err), notifyError("Vui lòng thử lại");
        });
    }
  }, [formData?.district_id]);
  const convertWard = (datas) => {
    const convert = datas?.map((data) => ({
      value: data.name,
      label: `${data.prefix} ${data.name}`,
    }));
    setListWard(convert);
  };
  //Hiển thị địa chỉ
  useEffect(() => {
    setAddress(
      `${formData.address ? `${formData.address}, ` : ""}${
        formData.ward
          ? `${listWard.find((ward) => ward.value == formData.ward)?.label}, `
          : ""
      }${
        formData.district_id ? `${renderDistrict(formData.district_id)}, ` : ""
      }${formData.city_id ? `${renderCity(formData.city_id)}, ` : ""}${
        formData.country ? formData.country : ""
      }`
    );
  }, [
    formData.address,
    formData.ward,
    formData.district_id,
    formData.city_id,
    formData.country,
  ]);
  return (
    <div>
      <p className={styles.main__body__type}>{title}</p>
      <div className={styles.add_organize}>
        <SelectSingleAndOption
          title="Quốc gia"
          placeholder="Chọn quốc gia"
          data={[{ value: "Việt Nam", label: "Việt Nam" }]}
          setFormData={setFormData}
          formData={formData}
          value={formData.country}
          name="country"
        />
        <SelectSingleAndOption
          title="Tỉnh thành"
          handleChange={handleChangeCity}
          data={/* formData.country && */ LIST_CITY}
          placeholder="Chọn tỉnh thành"
          setFormData={setFormData}
          formData={formData}
          name="cit_id"
          value={formData.cit_id}
        />
        <SelectSingleAndOption
          title="Quận huyện"
          data={LIST_DISTRICT.filter(
            (district) => district.parent == formData.cit_id
          )}
          setFormData={setFormData}
          formData={formData}
          name="district_id"
          handleChange={handleChangeDistrict}
          placeholder="Chọn quận huyện"
          value={formData.district_id}
        />
        <SelectSingleAndOption
          title="Phường xã"
          data={listWard}
          setFormData={setFormData}
          formData={formData}
          name="ward"
          placeholder="Chọn xã phường"
          value={formData.ward}
        />
        <MInputTextAndOption
          label="Số nhà, đường phố"
          placeholder="Nhập số nhà, đường phố"
          name="address"
          value={formData.address}
          setFormData={setFormData}
        />
        <MInputTextAndOption
          label="Mã vùng"
          placeholder="Nhập mã vùng"
          name="area_code"
          value={formData.area_code}
          setFormData={setFormData}
        />
        <MTextArea
          disable
          rows={2}
          label="Địa chỉ"
          placeholder="Chọn địa chỉ"
          value={address}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}
