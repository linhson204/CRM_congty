import { useState } from "react";
import styles from "./set_up_role.module.css";
import TableOptions from "./table_options";

export default function OptionRole({ checkboxState, setCheckboxState }) {
  const handleSelectAllCheckbox = (event) => {
    const { checked } = event.target;

    const selectAllValue = checked ? 1 : 0;
    const newCheckboxItems = {};

    for (const key in checkboxState.checkboxItems) {
      newCheckboxItems[key] = selectAllValue;
    }

    setCheckboxState((prevState) => ({
      ...prevState,
      selectAll: selectAllValue,
      checkboxItems: newCheckboxItems,
    }));
  };

  return (
    <div style={{ overflowX: "scroll" }}>
      <div className={styles.check_box}>
        <div className={styles.form_check}>
          <input
            name="all"
            className={styles.checkbox_all}
            type="checkbox"
            id="inlineCheckbox1"
            value="option1"
            onChange={(e) => handleSelectAllCheckbox(e)}
            checked={checkboxState.selectAll === 1}
          />
          <div className={styles.text_checkbox}>Chọn toàn quyền</div>
        </div>
      </div>
      <TableOptions
        checkboxState={checkboxState}
        setCheckboxState={setCheckboxState}
      />
    </div>
  );
}
