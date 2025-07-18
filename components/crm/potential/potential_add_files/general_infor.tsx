import { useEffect, useState } from "react";
import styles from "./add_file_potential.module.css";
import {
  SelectMultiple,
  SelectSingleAndOption,
} from "@/components/commodity/select";
import {
  getPotentialDepartment,
  getPotentialPosition,
  getPotentialResource,
  getPotentialSocial,
  getPotentialType,
  getVocative,
} from "@/utils/listOption";
import { MInputText, MInputTextAndArr } from "@/components/commodity/input";
import { axiosQLC } from "@/utils/api/api_qlc";
import { notifyError } from "@/utils/function";
import { ToastContainer } from "react-toastify";
export default function AddGeneralInfo({
  formData,
  setFormData,
  arrPrivatePhone,
  setArrPrivatePhone,
}: any) {
  const [fullname, setFullname] = useState("");
  const [listEmp, setListEmp] = useState([]);
  useEffect(() => {
    setFullname(
      `${formData?.stand_name ? `${formData?.stand_name} ` : ""}${
        formData?.name ? formData?.name : ""
      }`
    );
  }, [formData?.stand_name, formData?.name]);
  useEffect(() => {
    axiosQLC
      .post("/managerUser/listUser", { ep_status: "Active", pageSize: 2000 })
      .then((res) => convertDataEmp(res.data.data.data))
      .catch((err) => notifyError("Vui lòng thử lại sau!"));
  }, []);
  const convertDataEmp = (datas) => {
    setListEmp(
      datas.map((item: any) => ({
        value: item.ep_id,
        label: `${item.ep_id}. ${item.userName}`,
      }))
    );
  };

  return (
    <div>
      <p className={styles.main__body__type}>Thông tin chung</p>
      <div className={styles.add_organize}>
        <SelectSingleAndOption
          title="Xưng hô"
          formData={formData}
          setFormData={setFormData}
          value={formData?.vocative}
          data={getVocative}
          name="vocative"
          placeholder="Chọn"
        />
        <MInputText
          label="Họ và tên đệm"
          placeholder="Nhập họ và tên đệm"
          value={formData?.stand_name}
          setFormData={setFormData}
          name="stand_name"
        />
        <MInputText
          label="Tên"
          require
          value={formData?.name}
          name="name"
          placeholder="Nhập tên khách hàng"
          setFormData={setFormData}
        />
        <MInputText
          label="Họ và tên"
          disable
          value={fullname}
          placeholder="Họ và tên khách hàng"
        />
        <SelectSingleAndOption
          title="Chức danh"
          formData={formData}
          setFormData={setFormData}
          value={formData?.pos_id}
          data={getPotentialPosition}
          name="pos_id"
          placeholder="Chọn"
        />
        <SelectSingleAndOption
          title="Phòng ban"
          formData={formData}
          setFormData={setFormData}
          value={formData?.department}
          data={getPotentialDepartment}
          name="department"
          placeholder="Chọn"
        />
        <MInputText
          label="Điện thoại cơ quan"
          value={formData?.office_phone}
          name="office_phone"
          placeholder="Nhập số điện thoại cơ quan"
          setFormData={setFormData}
          type="number"
        />
        {arrPrivatePhone?.map((phone, index) => (
          <MInputTextAndArr
            value={phone}
            setArr={setArrPrivatePhone}
            arr={arrPrivatePhone}
            type="number"
            index={index}
            label={`Số điện thoại ${index > 0 ? "cá nhân khác" : "cá nhân"}`}
            placeholder={`Nhập số điện thoại ${
              index > 0 ? "cá nhân khác" : "cá nhân"
            }`}
            labelAction="số điện thoại"
          />
        ))}
        <MInputText
          label="Email cơ quan"
          placeholder="Nhập email cơ quan"
          value={formData?.office_email}
          name="office_email"
          setFormData={setFormData}
          type="email"
        />
        <MInputText
          label="Email cá nhân"
          placeholder="Nhập email cá nhân"
          value={formData?.private_email}
          name="private_email"
          setFormData={setFormData}
          type="email"
        />
        <SelectSingleAndOption
          title="Nguồn gốc"
          formData={formData}
          setFormData={setFormData}
          value={formData?.resource}
          data={getPotentialResource}
          name="resource"
          placeholder="Chọn"
        />
        <MInputText
          label="Mã số thuế"
          placeholder="Nhập mã số thuế"
          value={formData?.tax_code}
          name="tax_code"
          setFormData={setFormData}
        />
        <SelectSingleAndOption
          title="Loại tiềm năng"
          formData={formData}
          setFormData={setFormData}
          value={formData?.classify}
          data={getPotentialType}
          name="classify"
          placeholder="Chọn"
        />
        <SelectMultiple
          data={getPotentialSocial}
          name="arrSocial"
          setFormData={setFormData}
          label="Mạng xã hội"
          placeholder="Chọn mạng xã hội"
          value={formData?.arrSocial}
          formData={formData}
        />
        {formData?.arrSocial?.length > 0 &&
          formData.arrSocial.map((item, index) => (
            <MInputTextAndArr
              setFormData={setFormData}
              name={item}
              value={formData[item]}
              setArr={setArrPrivatePhone}
              arr={formData?.arrSocial}
              index={index}
              label={`Link ${item}`}
              placeholder={`Nhập link ${item}`}
              labelAction={`Link ${item}`}
              bonus={1}
            />
          ))}
        <SelectSingleAndOption
          title="Nhân viên phụ trách"
          value={formData?.emp_id}
          data={listEmp}
          formData={formData}
          setFormData={setFormData}
          name="emp_id"
          placeholder="Chọn"
        />
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}
