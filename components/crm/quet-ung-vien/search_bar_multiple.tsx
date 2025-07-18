import React, { useState } from "react";
import { AutoComplete, Input, Select } from "antd";

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
      return [];
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
    <Select
      mode="tags"
      value={searchValue}
      options={
        filteredOptions.length ? filteredOptions : [{ value: "", label: "" }]
      }
      onChange={handleSelectChange}
      onSearch={handleSearchInputChange}
      style={{
        width: "100%",
      }}
      tokenSeparators={[","]}
      maxTagCount={3}
    >
      <Input
        placeholder={placeholder}
        style={{
          width: "100%",
          borderRadius: "10px",
          border: "1px solid #d9d9d9",
        }}
      />
    </Select>
  );
};

export default SearchBar;
