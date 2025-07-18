import { useContext, useEffect, useRef, useState } from "react";
import styles from "./potential2.module.css";
import styles1 from "./potential.module.css";
import stylesAdd from "./add_file_commodity.module.css";

import { Select } from "antd";
import { toLowerCaseNonAccentVietnamese } from "@/utils/function";
import { useFormData } from "../context/formDataContext";
export const SelectSingleV3Prop = ({
  label,
  data,
  name,
  formDataProp,
  setFormDataProp,
  require = false,
  handleChange = null,
  placeholder = "",
  titleAdd = "",
  handleAdd = null,
  nameChecked = "",
  labelChecked = "",
  valueChecked = false,

}) => {
  const [searchLabel, setSearchLabel] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [labelSelect, setLabelSelect] = useState<string>(placeholder);

  const liStyle = {
    marginTop: "10px",
    padding: "5px 0",
    paddingLeft: "18px",
  };
  useEffect(() => {
    setLabelSelect(
      formDataProp?.[name]
        ? data.find((item:any) => item.value == formDataProp?.[name])?.label
        : placeholder
    );
  }, [formDataProp?.[name]]);
  const handelChooceOption = (item: { value: number; label: string }) => {
    handleChange && handleChange();
    setFormDataProp({ ...formDataProp, [name]: item.value });
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

        {titleAdd && <button onClick={handleAdd}>+ {titleAdd}</button>}
        {nameChecked && (
          <div>
            <input
              style={{ marginRight: "5px" }}
              type="checkbox"
              checked={valueChecked}
              onChange={(e) =>
                setFormDataProp((preData: any) => {
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
                    onChange={(e) => {
                      setSearchLabel(e.target.value);
                    }}
                    value={searchLabel}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck="false"
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
                        onClick={() => {
                          setFormDataProp({ ...formDataProp, [name]: undefined });
                          setLabelSelect(placeholder);
                        }}
                        className={`${styles1.select2_results__option} ${styles1.select2_results__option_highlighted}`}
                      >
                        {/* Chọn tất cả */}
                        {placeholder}
                      </li>
                    )}
                    {searchLabel
                      ? data
                          ?.filter(
                            (itemFilter: any) =>
                              toLowerCaseNonAccentVietnamese(
                                removeVietnameseTones(itemFilter.label)
                              ).includes(
                                toLowerCaseNonAccentVietnamese(removeVietnameseTones(searchLabel))
                              ) || itemFilter.phoneTK?.includes(removeVietnameseTones(searchLabel))
                          )
                          .map(
                            (
                              item: { value: number; label: string },
                              i: number
                            ) => (
                              <li
                                key={i}
                                className={`${styles1.select3_results__option}}`}
                                style={liStyle}
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
                              className={`${styles1.select2_results__option}}`}
                              style={liStyle}
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

export function SelectSingleTitleV2({
  title,
  data = null,
  name = "",
  placeholder = "Tất cả",
  onChange = null,
}: any) {
  const [isOpen, setIsOpen] = useState(false);
  const { setFormData, formData } = useContext(useFormData);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [labelSelect, setLabelSelect] = useState<string>(
    formData?.[name] ? data[Number(formData?.[name] - 1)]?.label : placeholder
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
        {isOpen && (
          <span
            className={`${styles.select2_container_open} ${styles.select2_container} ${styles.select2_container_default} `}
            style={{ position: "absolute", top: 35, left: 0, zIndex: 10 }}
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
                    onClick={() =>
                      handelChooceOption({ value: "", label: placeholder })
                    }
                    className={`${styles.select2_results__option} ${styles.select2_results__option_highlighted}`}
                  >
                    {placeholder}
                  </li>
                  {data?.map((item: { value: number; label: string }, i) => (
                    <li
                      style={{ paddingLeft: "18px" }}
                      key={i}
                      className={`${styles.select2_results__option} `}
                      onClick={() => handelChooceOption(item)}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              </span>
            </span>
          </span>
        )}
      </span>
    </div>
  );
}
export const SelectMultiple = ({
  data,
  maxSelect,
  name,
  label,
  placeholder,
}: any) => {
  const { setFormData, formData } = useContext(useFormData);
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
        value={formData?.[name] && formData?.[name]}
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
        <label>{title}</label>
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

function removeVietnameseTones(str:any) {
  if (str && str.trim() && str.trim() != "") {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
    str = str.replace(/\u02C6|\u0306|\u031B/g, "");
    str = str.replace(/ + /g, " ");
    str = str.trim();
    str = str.replace(/!|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\:|{|}|\||\\/g, " ");
    return str;
  } else {
    return "";
  }
}
export const SelectSingleV2 = ({
  label,
  data,
  name,
  require = false,
  handleChange = null,
  placeholder = "",
  titleAdd = "",
  handleAdd = null,
  nameChecked = "",
  labelChecked = "",
  valueChecked = false,
}) => {

  const { formData, setFormData } = useContext(useFormData);
  const [searchLabel, setSearchLabel] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [labelSelect, setLabelSelect] = useState<string>(placeholder);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
      setIsHover(true);
   };

  const handleMouseLeave = () => {
      setIsHover(false);
   };

  const liStyle = {
    marginTop: "10px",
    padding: "5px 0",
    paddingLeft: "18px",
    // backgroundColor:isHover ? '#5897fb' : "white",
    // color:isHover ? 'white' : "black"
  };
  useEffect(() => {
    setLabelSelect(
      formData?.[name]
        ? data.find((item:any) => item.value == formData?.[name])?.label
        : placeholder
    );
  }, [formData?.[name]]);
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
          {label}
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
                    onChange={(e) => {
                      setSearchLabel(e.target.value);
                    }}
                    value={searchLabel}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck="false"
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
                        onClick={() => {
                          setFormData({ ...formData, [name]: undefined });
                          setLabelSelect(placeholder);
                        }}
                        className={`${styles1.select2_results__option} ${styles1.select2_results__option_highlighted}`}
                      >
                        {/* Chọn tất cả */}
                        {placeholder}
                      </li>
                    )}
                    {searchLabel
                      ? data
                          ?.filter(
                            (itemFilter: any) =>
                              toLowerCaseNonAccentVietnamese(
                                removeVietnameseTones(itemFilter.label)
                              ).includes(
                                toLowerCaseNonAccentVietnamese(removeVietnameseTones(searchLabel))
                              ) || itemFilter.phoneTK?.includes(removeVietnameseTones(searchLabel))
                          )
                          .map(
                            (
                              item: { value: number; label: string },
                              i: number
                            ) => (
                              <li
                                key={i}
                                className={`${styles1.select3_results__option}}`}
                                style={liStyle}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
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
                              className={`${styles1.select2_results__option}}`}
                              style={liStyle}
                              onClick={() => handelChooceOption(item)}
                              onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}
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
      <strong> {title} </strong> <br />
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
