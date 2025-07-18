import React, { useState } from "react";
import { AutoComplete, Input } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

const removeDiacritics = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const SearchBar = ({
  searchValue,
  setSearchValue,
  options,
  onChange,
  placeholder,
}) => {
  const [filteredOptions, setFilteredOptions] = useState([]);

  const filterOptions = (inputValue) => {
    const normalizedInput = removeDiacritics(inputValue.toLowerCase());
    if (normalizedInput === "") {
      return options;
    } else {
      const filtered = options.filter((option) => {
        const normalizedLabel = removeDiacritics(option.label.toLowerCase());
        const normalizedValue = removeDiacritics(option.value.toLowerCase());
        return (
          normalizedLabel.includes(normalizedInput) ||
          normalizedValue.includes(normalizedInput)
        );
      });
      return filtered;
    }
  };

  const handleSearchInputChange = (value) => {
    setSearchValue(value);
    const filtered = filterOptions(value);
    setFilteredOptions(filtered);
    onChange(value);
  };

  const handleSelectChange = (value) => {
    setSearchValue(value);
    onChange(value);
  };

  return (
    <AutoComplete
      value={searchValue}
      options={
        filteredOptions.length ? filteredOptions : options
      }
      onChange={handleSelectChange}
      onSearch={handleSearchInputChange}
      style={{
        width: "100%",
      }}
      allowClear={{
        clearIcon: <CloseCircleFilled />
      }}
    >
      <Input
        placeholder={placeholder}
        style={{
          width: "100%",
          borderRadius: "10px",
          border: "1px solid #d9d9d9",
        }}
      />
    </AutoComplete>
  );
};

export default SearchBar;
