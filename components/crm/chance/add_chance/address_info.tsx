import { SelectSingleAndOption } from "@/components/commodity/select";
import styles from "./add_file_potential.module.css";
import { useContext, useEffect, useState } from "react";
import {
  LIST_CITY,
  LIST_DISTRICT,
  renderCity,
  renderDistrict,
} from "@/constants/address-constant";
import axios from "axios";
import { notifyError } from "@/utils/function";
import { MInputTextAndOption, MTextArea } from "@/components/commodity/input";
import { useFormData } from "../../context/formDataContext";
import { SelectSingleV2 } from "../../input_select/select";
import { MInputTextV2 } from "../../input_select/input";
export default function AddAddressInfoV2({ title = "Thông tin địa chỉ" }: any) {
  const { formData, setFormData } = useContext(useFormData);
  const [listWard, setListWard] = useState([]);
  const [listDistrict, setListDistrict] = useState<any>();
  const [address, setAddress] = useState<string>("");

  //lấy quận huyện khi chọn tỉnh thành
  useEffect(() => {
    delete formData?.district_id;
    delete formData?.ward;
    setFormData(formData);
    setListDistrict(
      LIST_DISTRICT.filter((district) => district.parent == formData?.cit_id)
    );
  }, [formData?.cit_id]);

  // xóa xã phường khi chọn lại quận huyện
  useEffect(() => {
    delete formData?.ward;
    setFormData(formData);
  }, [formData?.district_id]);

  // lay phuong xa
  useEffect(() => {
    if (formData?.district_id) {
      axios
        .post("http://210.245.108.202:3004/api/raonhanh/topCache/ward", {
          id: formData?.district_id,
        })
        .then((res) => convertWard(res.data.data.data))
        .catch((err) => notifyError("Vui lòng thử lại"));
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
      `${formData?.address ? `${formData?.address}, ` : ""}${
        formData?.ward
          ? `${listWard.find((ward) => ward.value == formData?.ward)?.label}, `
          : ""
      }${
        formData?.district_id
          ? `${renderDistrict(formData?.district_id)}, `
          : ""
      }${formData?.cit_id ? `${renderCity(formData?.cit_id)}, ` : ""}${
        formData?.country ? formData?.country : ""
      }`
    );
  }, [
    formData?.address,
    formData?.ward,
    formData?.district_id,
    formData?.cit_id,
    formData?.country,
  ]);
  return (
    <div>
      <p className={styles.main__body__type}>{title}</p>
      <div className={styles.add_organize}>
        <SelectSingleV2
          label="Quốc gia"
          placeholder="Chọn quốc gia"
          data={[{ value: "Việt Nam", label: "Việt Nam" }]}
          name="country"
        />
        <SelectSingleV2
          label="Tỉnh thành"
          data={LIST_CITY}
          placeholder="Chọn tỉnh thành"
          name="cit_id"
        />
        <SelectSingleV2
          label="Quận huyện"
          data={listDistrict}
          name="district_id"
          placeholder="Chọn quận huyện"
        />
        <SelectSingleV2
          label="Phường xã"
          data={listWard}
          name="ward"
          placeholder="Chọn xã phường"
        />
        <MInputTextV2
          label="Số nhà, đường phố"
          placeholder="Nhập số nhà, đường phố"
          name="address"
        />
        <MInputTextV2
          label="Mã vùng"
          placeholder="Nhập mã vùng"
          name="arera_code"
          value={formData?.arera_code}
          setFormData={setFormData}
        />
        <MTextArea
          disable
          rows={2}
          label="Địa chỉ"
          placeholder="Chọn địa chỉ"
          value={address}
        />
      </div>
    </div>
  );
}
