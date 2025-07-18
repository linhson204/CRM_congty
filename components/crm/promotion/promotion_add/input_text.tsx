import styles from "./add_promotion.module.css";

export default function InputText({
  label,
  placeholder,
  require = false,
  bonus = "",
  type = "text",
}: any) {
  return (
    <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
      <label className={`${styles["form-label"]}`}>{label}</label>
      <input
        type={type}
        className={`${styles["form-control"]}`}
        name="middle_name"
        id="middle_name"
        placeholder={placeholder}
      />
    </div>
  );
}
