import styles from "../../potential/potential_add_files/add_file_potential.module.css";

export default function InputProductReturnText({
  label,
  placeholder,
  require = false,
  setOpenMdal,
  type = "text",
}: any) {
  return (
    <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
      <label className={`${styles["form-label"]} ${require ? "required" : ""}`}>
        {label}
      </label>
      <input
        onClick={() => setOpenMdal(true)}
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
