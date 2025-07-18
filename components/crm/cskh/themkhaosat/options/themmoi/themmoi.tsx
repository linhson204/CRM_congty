import React from "react";
import styles from "../../../csks.module.css";
import { Input } from "antd";
type Props = {};

const Themmoi_Options = (props: any) => {
  const { handleThemmoi, handleDleteThemmoi } = props;
  return (
    <fieldset className={styles.left_option_themkhaosat}>
      <div>
        <div style={{ display: "flex" }}>
          <Input
            type="text"
            placeholder={"Nhập tiêu đề"}
            className={styles.inputtitle2_option}
          />
          <img
            onClick={handleDleteThemmoi}
            style={{ paddingLeft: 20 }}
            src="/crm/delete.svg"
            alt=""
          />
        </div>
      </div>

      <div style={{ paddingTop: 20 }}>
        <Input
          type="text"
          placeholder={"Mô tả"}
          className={styles.inputtitle2_option}
        />
      </div>
    </fieldset>
  );
};
export default Themmoi_Options;
