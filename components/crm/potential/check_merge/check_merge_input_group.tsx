import styles from "./check_merge.module.css";
import styleParent from "../potential_steps/potential_main.module.css";
import { useEffect, useState } from "react";
import { Input, Select, Space } from "antd";

export default function CheckMergeInputGroup({
  type = {},
  label,
  value = [],
  name,
  placeholder = "",
  setOptionSelect,
  setValue,
}: any) {
  const dataSelect = [
    "Là", "Không là", "Chứa", "Không chứa"];
  const resultArray = dataSelect.map((item, index) => ({
    name: item,
    val: index
  }));

  const [editableValues, setEditableValues] = useState(value);
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    dataSelect.map((item) => ({ value: item, label: item }))
  );

  useEffect(() => {
    if (Array.isArray(dataSelect)) {
      const updatedOptions = [
        { value: "", label: "Chọn điều kiện" },
        ...dataSelect.map((item) => {
          return { value: item, label: item };
        }),
      ];

      setOptions(updatedOptions);
    }
  }, []);

  const handleChange = (e, index) => {
    const updatedValues = [...editableValues];
    updatedValues[index] = e.target.value;
    setEditableValues(updatedValues);
    setValue(updatedValues);
  };

  return (
    <div className={styles.main__body_item}>
      <div className={`${styles.row_content} ${styles.flex_align_center}`}>
        <div className={styles.row_item_left}>
          <label className={styles.form_label}>
            <span className={styles.span_or}>{type.name}</span>
            {label}
          </label>
        </div>
        <div className={styles.row_item_center}>
          <div className={styleParent.wrap_select}>
            <Select
              showSearch
              placeholder="Chọn điều kiện"
              onChange={(value) => {
                if (value) {
                  const selectedItem = resultArray.find(item => item.name === value);

                  setOptionSelect({ name: value, key: selectedItem?.val });
                } else {
                  setOptionSelect(undefined);
                }
              }}
              style={{ width: "100%" }}
              options={options}
              filterOption={(input, option) =>
                option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
          </div>
        </div>
        {value?.map((item, index) => {
          return (
            <div className={styles.row_item_right} key={index} >
              <Input
                value={editableValues[index]?.length >= 0 ? editableValues[index] : item}
                placeholder={placeholder}
                onChange={(e) => handleChange(e, index)}
                className={styles.form_control}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}