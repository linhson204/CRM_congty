import { timestampToCustomString } from "../../ultis/convert_date";
import styles from "./add_file_campaign.module.css";

export default function InputText({
  label,
  placeholder,
  require = false,
  bonus = "",
  type = "text",
  name = "",
  formFields,
  handleChange,
}: any) {
  return (
    <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
      <label className={`${styles["form-label"]} ${require ? "required" : ""}`}>
        {label}
      </label>
      <input
        style={{ height: "40px" }}
        type={type}
        className={`${styles["form-control"]}`}
        name={name}
        placeholder={placeholder}
        value={
          type === "date" && typeof formFields?.[name] === "number"
            ? timestampToCustomString(formFields?.[name], "input")
            : formFields?.[name] || ""
        }
        onChange={handleChange}
      />
    </div>
  );
}
