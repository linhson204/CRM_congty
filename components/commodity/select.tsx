import { useEffect, useRef, useState } from "react";
import styles from "./potential2.module.css";
import styles1 from "./potential.module.css";
import stylesAdd from "./add_file_commodity.module.css";

import { Select } from "antd";
import { toLowerCaseNonAccentVietnamese } from "@/utils/function";
export default function SelectSingle({
  title = "",
  value = 0,
  data = null,
  setFormData = null,
  name = "",
  placeholder = "Tất cả",
  onChange = null,
}: any) {
  const [searchLabel, setSearchLabel] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [labelSelect, setLabelSelect] = useState<string>(
    value ? data[Number(value - 1)]?.label : placeholder
  );
  const handleClickSelectoption = (e: any) => {
    if (e.target.getAttribute("class") !== styles.select2_search__field) {
      setIsOpen(!isOpen);
    }
  };
  const handelChooceOption = async (item: { value: any; label: string }) => {
    onChange && onChange();
    setFormData((preData) => ({ ...preData, [name]: item.value }));
    setLabelSelect(item.label);
  };
  const handleScrollkOutside = (e: any) => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef?.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("scroll", handleScrollkOutside);

    return () => {
      document.removeEventListener("scroll", handleScrollkOutside);
    };
  }, []);

  return (
    <div>
      <div
        style={{ width: "100%" }}
        ref={dropdownRef}
        className={`${styles.select_item} flex_align_center_item`}
      >
        <div>
          <label htmlFor="" className="">
            {title}
          </label>
        </div>

        <select
          className={`${styles.select2} ${styles.select2_hidden_accessible}`}
          data-select2-id={1}
          tabIndex={-1}
          aria-hidden="true"
        >
          <option value="" data-select2-id={3}>
            {labelSelect}
          </option>
        </select>
        <span
          className={`select2 ${styles.select2_container}`}
          dir="ltr"
          data-select2-id={2}
          style={{ width: "100%", paddingTop: "5px" }}
          onClick={handleClickSelectoption}
        >
          <span className={`${styles.selection}`}>
            <span
              className={`${styles.select2_selection} select2_selection_single`}
              role="combobox"
              aria-haspopup="true"
              aria-expanded="false"
              tabIndex={0}
              aria-labelledby="select2-g0q1-container"
            >
              <span
                className={styles.select2_selection__rendered}
                id="select2-g0q1-container"
                role="textbox"
                aria-readonly="true"
                title="Chọn"
              >
                {labelSelect ? labelSelect : placeholder}
              </span>
              <span
                className={styles.select2_selection__arrow}
                role="presentation"
              >
                <b role="presentation" />
              </span>
            </span>
          </span>
        </span>
      </div>{" "}
      {isOpen && (
        <span
          className={`${styles.select2_container_open} ${styles.select2_container} ${styles.select2_container_default} `}
          // style={{ position: "absolute", top: 35, left: 0, zIndex: 10 }}
          style={{ width: "100%" }}
        >
          <span
            className={`${styles.select2_dropdown} ${styles.select2_dropdown_below}`}
            dir="ltr"
            style={{ width: "100%", display: "block" }}
          >
            <span
              className={`${styles.select2_search} ${styles.select2_search__dropdown}`}
            >
              <input
                className={styles.select2_search__field}
                type="search"
                tabIndex={0}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck="false"
                role="textbox"
                value={searchLabel}
                onChange={(e) => {
                  setSearchLabel(e.target.value);
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </span>
            <span className={styles.select2_results}>
              <ul
                className={styles.select2_results__options}
                role="tree"
                aria-expanded="true"
                aria-hidden="false"
              >
                <li
                  style={{
                    padding: "5px 0",
                    marginLeft: "18px",
                  }}
                  onClick={() =>
                    handelChooceOption({ value: "", label: placeholder })
                  }
                  className={`${styles.select2_results__option}`}
                >
                  {placeholder}
                </li>
                {searchLabel
                  ? data
                      ?.filter((itemFilter: any) =>
                        toLowerCaseNonAccentVietnamese(
                          itemFilter.label
                        ).includes(toLowerCaseNonAccentVietnamese(searchLabel))
                      )
                      .map(
                        (item: { value: number; label: string }, i: number) => (
                          <li
                            key={i}
                            className={`${styles1.select2_results__option}}`}
                            style={{
                              padding: "5px 0",
                              marginLeft: "18px",
                            }}
                            onClick={() => handelChooceOption(item)}
                          >
                            {item.label}
                          </li>
                        )
                      )
                  : data?.map((item: { value: number; label: string }, i) => (
                      <li
                        style={{
                          padding: "5px 0",
                          paddingLeft: "18px",
                        }}
                        key={i}
                        className={`${styles.select2_results__option} `}
                        onClick={() => handelChooceOption(item)}
                      >
                        {item.label}
                      </li>
                    ))}
                {/* {data?.map((item: { value: number; label: string }, i) => (
                    <li
                      style={{ paddingLeft: "18px" }}
                      key={i}
                      className={`${styles.select2_results__option} `}
                      onClick={() => handelChooceOption(item)}
                    >
                      {item.label}
                    </li>
                  ))} */}
              </ul>
            </span>
          </span>
        </span>
      )}
    </div>
  );
}
export const SelectMultiple = ({
  data,
  name,
  setFormData,
  value,
  maxSelect,
  label,
  placeholder,
}: any) => {
  const handleChange = (selected) => {
    if (maxSelect) {
      if (selected.length <= maxSelect) {
        setFormData((preData) => ({ ...preData, [name]: selected }));
      }
    } else {
      setFormData((preData) => ({ ...preData, [name]: selected }));
    }
  };

  return (
    <div>
      {label && (
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "20px" }}
        >
          {label}:
        </div>
      )}
      <div></div>
      <Select
        // className={styleCommodity}
        mode="multiple"
        size="large"
        style={{ width: "99.5%", margin: "10px" }}
        showSearch
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
        value={value}
        filterOption={(input: string, option: { value: any; label: string }) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={data}
      />
    </div>
  );
};

export const SelectSingleAndAdd = ({
  title = "",
  value = 0,
  data = [],
  formData,
  setFormData,
  name,
  placeholder = "",
  titleAdd,
  handleAdd,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [filterValue, setFilterValue] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [labelSelect, setLabelSelect] = useState<string>("Tất cả");
  useEffect(() => {
    setLabelSelect(value ? data[value - 1]?.label : "Tất cả");
  }, [value]);
  const handelChooceOption = (item: { value: number; label: string }) => {
    setFormData({ ...formData, [name]: item.value });
    setLabelSelect(item.label);
  };
  const handleClickSelectoption = (e: any) => {
    if (e.target.getAttribute("class") !== styles.select2_search__field) {
      setIsOpen(true);
    }
  };

  const handleScrollkOutside = (e: any) => {
    if (dropdownRef.current && !dropdownRef?.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef?.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("scroll", handleScrollkOutside);

    return () => {
      document.removeEventListener("scroll", handleScrollkOutside);
    };
  }, []);
  return (
    <div className={styles1.select_single_add}>
      <div className={styles1.box_select_add}>
        <label
          className={`${stylesAdd["form-label"]} ${require ? "required" : ""}`}
        >
          {title}
        </label>
        {titleAdd && <button onClick={handleAdd}>+ {titleAdd}</button>}
      </div>
      <div
        ref={dropdownRef}
        className={`${styles1.select_item_box_step} flex_align_center_item`}
      >
        <span
          className={`select2 ${styles1.select2_container_step}`}
          dir="ltr"
          data-select2-id={2}
          onClick={handleClickSelectoption}
        >
          <span className={`${styles1.selection}`}>
            <span
              className={`${styles1.select2_selection} select2_selection_single`}
              role="combobox"
              aria-haspopup="true"
              aria-expanded="false"
              tabIndex={0}
              aria-labelledby="select2-g0q1-container"
            >
              <span
                className={styles1.select2_selection__rendered}
                id="select2-g0q1-container"
                role="textbox"
                aria-readonly="true"
                // title="Chọn người dùng"
              >
                {labelSelect ? labelSelect : placeholder}
              </span>
              <span
                className={styles1.select2_selection__arrow}
                role="presentation"
              >
                <b role="presentation" />
              </span>
            </span>
          </span>
          {isOpen && (
            <span
              className={`${styles1.select2_container_open} ${styles1.select2_container} ${styles1.select2_container_default} `}
              style={{ position: "absolute", top: 35, left: 0, zIndex: 10 }}
            >
              <span
                className={`${styles1.select2_dropdown} ${styles1.select2_dropdown_below}`}
                dir="ltr"
                style={{ width: "100%", display: "block" }}
              >
                <span
                  className={`${styles1.select2_search} ${styles1.select2_search__dropdown}`}
                >
                  <input
                    className={styles1.select2_search__field}
                    onChange={(e) => setFilterValue(e.target.value)}
                    type="search"
                    tabIndex={0}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck="false"
                    role="textbox"
                    style={{ height: "34px" }}
                  />
                </span>
                <span className={styles1.select2_results}>
                  <ul
                    className={styles1.select2_results__options}
                    role="tree"
                    aria-expanded="true"
                    aria-hidden="false"
                  >
                    <li
                      //   onClick={() => selectData(placeholder)}
                      className={`${styles1.select2_results__option} ${styles1.select2_results__option_highlighted}`}
                    >
                      {/* Chọn tất cả */}
                      {placeholder}
                    </li>
                    {!filterValue &&
                      // data.length > 0 &&
                      data?.map(
                        (item: { value: number; label: string }, i: number) => (
                          <li
                            key={i}
                            className={`${styles1.select2_results__option}}`}
                            style={{
                              marginTop: "10px",
                              padding: "5px 0",
                              paddingLeft: "18px",
                            }}
                            onClick={() => handelChooceOption(item)}
                          >
                            {item.label}
                          </li>
                        )
                      )}
                    {filterValue &&
                      // data.length > 0 &&
                      data
                        ?.filter((item) =>
                          toLowerCaseNonAccentVietnamese(item.label)?.includes(
                            toLowerCaseNonAccentVietnamese(filterValue)
                          )
                        )
                        ?.map(
                          (
                            item: { value: number; label: string },
                            i: number
                          ) => (
                            <li
                              key={i}
                              className={`${styles1.select2_results__option}}`}
                              style={{
                                marginTop: "10px",
                                padding: "5px 0",
                                paddingLeft: "18px",
                              }}
                              onClick={() => handelChooceOption(item)}
                            >
                              {item.label}
                            </li>
                          )
                        )}
                  </ul>
                </span>
              </span>
            </span>
          )}
        </span>
      </div>
    </div>
  );
};
export const SelectSingleAndOption = ({
  title = "",
  value = 0,
  valueChecked = false,
  data = [],
  formData,
  setFormData,
  name,
  handleChange = null,
  placeholder = "",
  titleAdd = "",
  handleAdd = null,
  nameChecked = "",
  labelChecked = "",
  require = false,
  valueAll = "",
}) => {
  const [searchLabel, setSearchLabel] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [labelSelect, setLabelSelect] = useState<string>(placeholder);
  useEffect(() => {
    setLabelSelect(
      value ? data.find((item) => item.value == value)?.label : placeholder
    );
  }, [value]);
  const handelChooceOption = (item: { value: number; label: string }) => {
    handleChange && handleChange();
    setFormData({ ...formData, [name]: item.value });
    setLabelSelect(item.label);
  };
  const handleClickSelectoption = (e: any) => {
    if (e.target.getAttribute("class") !== styles.select2_search__field) {
      setIsOpen(!isOpen);
    }
  };

  const handleScrollkOutside = (e: any) => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef?.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("scroll", handleScrollkOutside);

    return () => {
      document.removeEventListener("scroll", handleScrollkOutside);
    };
  }, []);
  return (
    <div className={styles1.select_single_add}>
      <div className={styles1.box_select_add}>
        <label
          className={`${stylesAdd["form-label"]} ${require ? "required" : ""}`}
        >
          {title}
        </label>
        {titleAdd && <button onClick={handleAdd}>+ {titleAdd}</button>}
        {nameChecked && (
          <div>
            <input
              style={{ marginRight: "5px" }}
              type="checkbox"
              checked={valueChecked}
              onChange={(e) =>
                setFormData((preData: any) => {
                  return {
                    ...preData,
                    [nameChecked]: e.target.checked,
                  };
                })
              }
            />
            <label> {labelChecked}</label>
          </div>
        )}
      </div>
      <div
        ref={dropdownRef}
        className={`${styles1.select_item_box_step} flex_align_center_item`}
      >
        <span
          className={`select2 ${styles1.select2_container_step}`}
          dir="ltr"
          data-select2-id={2}
          onClick={handleClickSelectoption}
        >
          <span className={`${styles1.selection}`}>
            <span
              className={`${styles1.select2_selection} select2_selection_single`}
              role="combobox"
              aria-haspopup="true"
              aria-expanded="false"
              tabIndex={0}
              aria-labelledby="select2-g0q1-container"
            >
              <span
                className={styles1.select2_selection__rendered}
                id="select2-g0q1-container"
                role="textbox"
                aria-readonly="true"
                // title="Chọn người dùng"
              >
                {labelSelect ? labelSelect : placeholder}
              </span>
              <span
                className={styles1.select2_selection__arrow}
                role="presentation"
              >
                <b role="presentation" />
              </span>
            </span>
          </span>
          {isOpen && (
            <span
              className={`${styles1.select2_container_open} ${styles1.select2_container} ${styles1.select2_container_default} `}
              style={{ position: "absolute", top: 35, left: 0, zIndex: 10 }}
            >
              <span
                className={`${styles1.select2_dropdown} ${styles1.select2_dropdown_below}`}
                dir="ltr"
                style={{ width: "100%", display: "block" }}
              >
                <span
                  className={`${styles1.select2_search} ${styles1.select2_search__dropdown}`}
                >
                  <input
                    className={styles1.select2_search__field}
                    type="search"
                    tabIndex={0}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck="false"
                    value={searchLabel}
                    onChange={(e) => {
                      setSearchLabel(e.target.value);
                    }}
                    role="textbox"
                    style={{ height: "34px" }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </span>
                <span className={styles1.select2_results}>
                  <ul
                    className={styles1.select2_results__options}
                    role="tree"
                    aria-expanded="true"
                    aria-hidden="false"
                  >
                    {placeholder && (
                      <li
                        style={{
                          padding: "5px 0",
                          paddingLeft: "18px",
                          fontSize: "17px",
                        }}
                        onClick={() => {
                          setFormData({ ...formData, [name]: "" });
                          setLabelSelect(placeholder);
                        }}
                        className={styles1.select2_results__option}
                      >
                        {placeholder}
                      </li>
                    )}
                    {valueAll && (
                      <li
                        style={{
                          padding: "5px 0",
                          paddingLeft: "18px",
                        }}
                        onClick={() => {
                          setFormData({ ...formData, [name]: valueAll });
                          setLabelSelect("Chọn tất cả");
                        }}
                        //   onClick={() => selectData(placeholder)}
                        className={`${styles1.select2_results__option} `}
                      >
                        {/* Chọn tất cả */}
                        Chọn tất cả
                      </li>
                    )}
                    {searchLabel
                      ? data
                          ?.filter(
                            (itemFilter: any) =>
                              toLowerCaseNonAccentVietnamese(
                                itemFilter.label
                              ).includes(
                                toLowerCaseNonAccentVietnamese(searchLabel)
                              ) || itemFilter.phoneTK?.includes(searchLabel)
                          )
                          .map(
                            (
                              item: { value: number; label: string; phoneTK },
                              i: number
                            ) => (
                              <li
                                key={i}
                                className={styles1.select2_results__option}
                                style={{
                                  marginTop: "10px",
                                  padding: "5px 0",
                                  paddingLeft: "18px",
                                }}
                                onClick={() => handelChooceOption(item)}
                              >
                                {item.label}
                              </li>
                            )
                          )
                      : data?.map(
                          (
                            item: { value: number; label: string },
                            i: number
                          ) => (
                            <li
                              key={i}
                              className={`${styles1.select2_results__option}`}
                              style={{
                                marginTop: "10px",
                                padding: "5px 0",
                                paddingLeft: "18px",
                              }}
                              onClick={() => handelChooceOption(item)}
                            >
                              {item.label}
                            </li>
                          )
                        )}
                  </ul>
                </span>
              </span>
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export const InputAndSelect = ({
  title,
  require = false,
  placeholder = "",
  setFormData,
  inputValue = "",
  inputName,
  selectName,
  selectData = [],
  selectValue,
  type = "text",
}) => {
  const handleChange = (e: any) => {
    setFormData((preData: any) => {
      return {
        ...preData,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <div className={styles.input_select_container}>
      <label
        className={`${stylesAdd["form-label"]} ${require ? "required" : ""}`}
      >
        {title}
      </label>{" "}
      <br />
      <div className={styles.input_select_box}>
        <input
          onChange={(e) => handleChange(e)}
          type={type}
          placeholder={`${placeholder} ${
            selectData[Number(selectValue - 1)]
              ? selectData[Number(selectValue - 1)]?.label
              : ""
          }`}
          value={inputValue}
          name={inputName}
        />
        <select
          value={selectValue}
          name={selectName}
          onChange={(e) => handleChange(e)}
        >
          {selectData.length > 0 &&
            selectData.map((data, index) => (
              <option key={index} value={data?.value}>
                {data?.label}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};
