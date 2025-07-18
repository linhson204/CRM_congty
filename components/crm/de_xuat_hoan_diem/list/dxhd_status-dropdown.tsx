import { useContext, useEffect, useRef, useState } from "react";
import styles from "./potential2.module.css";
import { useFormData } from "../../context/formDataContext";

export function SelectSingleTitleV2({
    title,
    data = null,
    name = "",
    placeholder = "Tất cả",
    onChange = null,
}: any) {
    const [isHover, setIsHover] = useState(false)
    const [hoverItem, setHoverItem] = useState(null)
    // const [inputValue, setInputValue] = useState('')
    // const [filteredData, setFilteredData] = useState(data)

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
        // setIsOpen(false);
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
                                {/* <input
                                    className={styles.select2_search__field}
                                    type="search"
                                    tabIndex={0}
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="none"
                                    spellCheck="false"
                                    role="textbox"
                                /> */}
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
                                        className={`${styles.select2_results__option} ${isHover ? styles.select2_results__option_highlighted : ''}`}
                                        onMouseEnter={() => setIsHover(true)}
                                        onMouseLeave={() => setIsHover(false)}
                                        style={{ paddingLeft: "18px", paddingBottom: '5px' }}
                                    >
                                        {placeholder}
                                    </li>
                                    {data?.map((item: { value: number; label: string }, i) => (
                                        <li
                                            style={{ paddingLeft: "18px", paddingBottom: '5px' }}
                                            key={i}
                                            className={`${styles.select2_results__option} ${hoverItem === i ? styles.select2_results__option_highlighted : ''}`}
                                            onClick={() => {
                                                // setInputValue('')
                                                handelChooceOption(item)
                                            }}
                                            onMouseEnter={() => setHoverItem(i)}
                                            onMouseLeave={() => setHoverItem(null)}
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