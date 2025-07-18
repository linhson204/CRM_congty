import { SelectSingleAndOption } from "@/components/commodity/select";
import styles from "./add_file_potential.module.css";
import { getPotentiaGender } from "@/utils/listOption";
import { MInputText } from "@/components/commodity/input";
import { convertTimestampToDate } from "@/utils/function";
export default function AddPersonalInfo({ formData, setFormData }: any) {
  return (
    <div>
      <p className={styles.main__body__type}>Thông tin cá nhân</p>

      <div className={styles.add_organize}>
        <SelectSingleAndOption
          title="Giới tính"
          data={getPotentiaGender}
          name={"gender"}
          placeholder="Chọn giới tính"
          value={formData?.gender}
          setFormData={setFormData}
          formData={formData}
        />
        {/* <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
          <label className={`${styles["form-label"]}`}>Giới tính</label>
          <PotentialSelectBoxStep
            placeholder="Chọn giới tính"
            value={formData?.gender}
            selectData={(value) => {
              setFormData((prev) => {
                return { ...prev, gender: value };
              });
            }}
            data={["Nam", "Nữ"]}
          />
        </div> */}
        <MInputText
          name="birthday"
          label="Ngày sinh"
          // value={convertTimestampToDate(formData.birthday)}
          // default={convertTimestampToDate(formData.birthday / 1000)
          //   ?.split("/")
          //   .reverse()
          //   .join("-")}
          placeholder="Nhập ho và tên"
          type="date"
          
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}
