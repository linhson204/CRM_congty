import React from "react";
import styles from "./check_merge.module.css";
import { Radio } from "antd";

export default function CheckMergeBody({ type, setType }: any) {
  return (
    <div className={styles.main__body_item}>
      <div className={styles.row + " " + styles.row_one}>
        <div className={styles["col-lg-4"]}>
          <Radio
            value={type?.value}
            checked={type?.name === "và"}
            onChange={() => setType({ name: "và", value: 1 })}
          >
            Thỏa mãn tất cả các điều kiện bên dưới
          </Radio>
        </div>
        <div className={styles["col-lg-4"]}>
          <Radio
            value={type?.value}
            checked={type?.name === "hoặc"}
            onChange={() => setType({ name: "hoặc", value: 2 })}
          >
            Thỏa mãn với bất kỳ điều kiện nào bên dưới
          </Radio>
        </div>
      </div>
    </div>
  );
}
