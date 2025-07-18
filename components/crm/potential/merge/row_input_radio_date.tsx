import { useEffect, useState } from "react";
import styles from "./merge.module.css";

export default function RowRadioInputDate({
  name,
  setSelectedData,
  selectedData,
  title,
  value = [],
}: any) {
  const [valueRadioBox, setValueRadioBox] = useState("");

  function generateDateCowStringFromTimestamp(unixTimestamp) {
    if (unixTimestamp) {
      const date = new Date(unixTimestamp * 1000); // Chuyển đổi Unix timestamp thành đối tượng Date
      const day = date.getDate().toString().padStart(2, "0"); // Lấy ngày và định dạng thành 2 chữ số
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Lấy tháng và định dạng thành 2 chữ số
      const year = date.getFullYear();
      const result = `${day}/${month}/${year}`;
      return result;
    }
    return "Chưa cập nhật";
  }

  const handleChange = (item: any, index: number) => {
    let newValues = selectedData?.[name];
    let newData: any = newValues?.map((item) => {
      return {
        ...item,
        status: false,
      };
    });

    newData?.splice(index, 1, {
      status: true,
      val: newData[index]?.val,
    });

    const test = { ...selectedData, [name]: newData };
    setValueRadioBox(test?.[name]?.filter((item) => item?.status)[0]?.val);

    setSelectedData((prev) => {
      return {
        ...prev,
        [name]: newData,
      };
    });
    setSelectedData(test);
  };
  return (
    <tr>
      <td>
        <p className={styles.column_title}>{title}</p>
      </td>
      <td>
        {generateDateCowStringFromTimestamp(
          selectedData?.[name]?.filter((item) => item?.status)[0]?.val
        ) ||
          generateDateCowStringFromTimestamp(valueRadioBox) ||
          "Chưa cập nhật"}
      </td>
      {value?.map((item, index) => {
        return (
          <td>
            <div className={styles.td_ct}>
              <input
                onChange={() => handleChange(item, index)}
                checked={selectedData?.[name]?.[index]?.status}
                name={name}
                type="radio"
                value={value[index]}
                className={styles.radio}
              />
              <p>{generateDateCowStringFromTimestamp(value[index])}</p>
            </div>
          </td>
        );
      })}
    </tr>
  );
}
