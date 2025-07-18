import Image from "next/image";
import styles from "@/components/crm/customer/customer.module.css";
import { useEffect } from "react";
export default function ApiSetting({ disabled, label, value, setValue }: any) {
  const handleEditValue = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.form_group}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: ".5rem",
        }}
      >
        <label className={`required`}>{label}</label>
        <div className={styles.question}>
          <Image
            width={16}
            height={16}
            alt="?"
            src={"/crm/question_mini.svg"}
          />
        </div>
      </div>
      <input
        type="text"
        onChange={handleEditValue}
        disabled={!disabled}
        className={styles.input_control}
        value={value}
        style={{ backgroundColor: !disabled ? "#e9ecef" : "white" }}
      />
    </div>
  );
}
