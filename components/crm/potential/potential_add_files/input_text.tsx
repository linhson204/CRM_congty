import styles from "./add_file_potential.module.css";

export default function InputText({
  label,
  placeholder,
  require = false,
  bonus = "",
  type = "text",
  value = "",
  setFormData,
  keyValue = "",
  name = "",
  id = "",
}: any) {
  const handleChangeInput = (e: any) => {
    if (keyValue !== "") {
      setFormData((preData: any) => {
        return {
          ...preData,
          [keyValue]: e.target.value,
        };
      });
    }
  };
  return (
    <div className={`${styles.mb_3} ${styles["col-lg-6"]}`}>
      <label className={`${styles["form-label"]} ${require ? "required" : ""}`}>
        {label}
      </label>
      <input
        style={{
          marginLeft: "10px",

          height: "px",
          backgroundColor: bonus === "disabled" ? "#e9ecef" : "white",
        }}
        type={type}
        disabled={bonus === "disabled" ? true : false}
        className={`${styles["form-control"]}`}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChangeInput}
      />
    </div>
  );
}

