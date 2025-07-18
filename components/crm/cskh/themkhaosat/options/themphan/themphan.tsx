import React from "react";
import styles from "../../../csks.module.css";
import { Input } from "antd";
type Props = {};

const Themphan_Options = (props: any) => {
  const {handleThemPhan,handleDleteThemphan} = props
  return (
    <fieldset className={styles.left_home_themkhaosat}>
    <div>
      <Input
        type="text"
        placeholder={"Nhập tiêu đề"}
        className={styles.inputtitle}
      />
    </div>
    <div style={{ paddingTop: 20 }}>
      <Input
        type="text"
        placeholder={"Mô tả"}
        className={styles.inputtitle2}
      />
    </div>
  </fieldset>
  );
};
export default Themphan_Options;
