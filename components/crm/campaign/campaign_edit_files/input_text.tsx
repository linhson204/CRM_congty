import styles from "./edit_file_campaign.module.css";

export default function InputText({
  label,
  placeholder,
  require = false,
  bonus = "",
  type = "text",
}: any) {
  return (
    <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
      <label className={`${styles["form-label"]} ${require ? "required" : ""}`}>
        {label}
      </label>
      <input
        style={{ height: "35px" }}
        type={type}
        className={`${styles["form-control"]}`}
        name="middle_name"
        id="middle_name"
        placeholder={placeholder}
      />
    </div>
  );
}
