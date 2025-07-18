import { useEffect, useState } from "react";
import styles from "../../potential/merge/merge.module.css";

export default function RowRadioInputRow({
  defaultCheckBox,
  setDefaultCheckBox,
  name,
  isSelectAll,
  isSelectAll2,
  title,
  value = ["a", "b"],
}: any) {
  const [valueRadioBox, setValueRadioBox] = useState(value[0]);
  const [defaultChecked, setDefaultChecked] = useState(false);

  useEffect(() => {
    if (isSelectAll) {
      setValueRadioBox(value[0]);
    } else {
      setValueRadioBox(value[1]);
    }
  }, [isSelectAll, isSelectAll2]);

  const handleChange = (selectedValue: string) => {
    setValueRadioBox(selectedValue);
    setDefaultChecked(true);
    // Uncheck the opposite table
    if (isSelectAll) {
      setDefaultCheckBox(true);
    } else {
      setDefaultCheckBox(false);
    }
  };
  return (
    <tr>
      <td>
      <p className={styles.main_body_type}>{title}</p>
      </td>
      <td>{valueRadioBox}</td>
      <td>
        <div className={styles.td_ct}>
          <input
            onChange={() => handleChange(value[0])}
            checked={
              (defaultCheckBox || defaultChecked) && valueRadioBox === value[0]
            }
            name={name}
            type="radio"
            value={value[0]}
            className={styles.radio}
          />
          <p>{value[0]}</p>
        </div>
      </td>
      <td>
        <div className={styles.td_ct}>
          <input
            onChange={() => handleChange(value[1])}
            checked={
              (defaultCheckBox || defaultChecked) && valueRadioBox === value[1]
            }
            name={name}
            type="radio"
            value={value[1]}
            className={styles.radio}
          />
          <p>{value[1]}</p>
        </div>
      </td>
    </tr>
  );
}
