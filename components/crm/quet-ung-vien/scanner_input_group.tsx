import React from "react";
import styles from "./scanner.module.css";
import { FormType } from "./scanner";
import SearchBar from "./search_bar";
import SearchBarMulti from "./search_bar_multiple";
import { ConfigProvider, DatePicker } from "antd";
export default function ScanCandidateInputGroups({
  formData,
  setFormData,
  handleSearch,
  list,
}) {
  const handleChange = (value, key) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  const handleChangeJob = (value) => {
    handleChange(value, "job");
  };
  const handleChangeCity = (value) => {
    handleChange(value, "city");
  };
  const handleChangeStartTime = (date) => {
    const dateObj = new Date(date)
    dateObj.setHours(0, 0, 0, 0)
    handleChange(date ? dateObj.getTime() / 1000 : 0, 'startTime')
  }
  const handleChangeEndTime = (date) => {
    const dateObj = new Date(date)
    dateObj.setHours(23, 59, 59, 0)
    handleChange(date ? dateObj.getTime() / 1000 : 0, 'endTime')
  }

  return (
    <div className={styles.main__control}>
      <div className={styles.sub__control}>
        <SearchBar
          searchValue={formData.city}
          setSearchValue={(value) => handleChangeCity(value)}
          options={list?.cities}
          onChange={(value) => handleChangeCity(value)}
          placeholder={"Chọn tỉnh thành"}
        />
        <SearchBar
          searchValue={formData.job}
          setSearchValue={(value) => handleChangeJob(value)}
          options={list?.jobs}
          onChange={(value) => handleChangeJob(value)}
          placeholder={"Chọn ngành nghề"}
        />
      </div>
      <div className={styles.sub__control}>
        <DatePicker
          placeholder="Chọn ngày bắt đầu"
          style={{
            width: "50%"
          }}
          onChange={handleChangeStartTime}
        />
        <DatePicker
          placeholder="Chọn ngày kết thúc"
          style={{
            width: "50%"
          }}
          onChange={handleChangeEndTime}
        />
      </div>

      <button onClick={handleSearch}>Tìm kiếm</button>
    </div>
  );
}
