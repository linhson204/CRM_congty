import styles from "./add_file_campaign.module.css";

export default function InputTextDotRed({
  label,
  placeholder,
  require = false,
  bonus = "",
  type = "text",
  name = "",
  formFields,
  handleChange
}: any) {
  return (
    <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
      <label className={`${styles["form-label"]} ${require ? "required" : ""}`}>
        {label}
        <span className={styles.red_dot}>*</span>
      </label>
      <input
        style={{ height: "40px" }}
        type={type}
        className={`${styles["form-control"]}`}
        name={name}
        placeholder={placeholder}
        value={formFields?.[name] || ''}
        onChange={handleChange}
      />
    </div>
  );
}
