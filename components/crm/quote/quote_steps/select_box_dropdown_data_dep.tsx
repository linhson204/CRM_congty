import {
    ReactElement,
    JSXElementConstructor,
    ReactNode,
    ReactPortal,
    // PromiseLikeOfReactNode,
    Key,
    useState,
    useEffect,
} from "react";
import styles from "@/components/crm/quote/quote.module.css";
import { toLowerCaseNonAccentVietnamese } from "@/utils/function";

export default function DepDropDownDataStep({
    data = [],
    value = " Chọn",
    setValue
}: any) {
    const [inputValue, setInputValue] = useState('')
    const filteredData = data.filter(item =>
        // item.toLowerCase().includes(inputValue.trim().toLowerCase())
        toLowerCaseNonAccentVietnamese(item.label).includes(toLowerCaseNonAccentVietnamese(inputValue))
    )
    const displayItems = inputValue === '' ? data : filteredData
    const [hoverItem, setHoverItem] = useState(null)

    return (
        <span
            className={`${styles.select2_container_open} ${styles.select2_container} ${styles.select2_container_default} `}
            style={{ position: "absolute", top: 35, left: 0, zIndex: 10 }}
        >
            <span
                className={`${styles.select2_dropdown} ${styles.select2_dropdown_below}`}
                dir="ltr"
                style={{
                    width: "100%",
                    display: "block",
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                }}
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
                        style={{ height: "34px" }}
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                    />
                </span>
                <span className={styles.select2_results}>
                    <ul
                        className={styles.select2_results__options}
                        role="tree"
                        aria-expanded="true"
                        aria-hidden="false"
                        style={{
                            borderBottomLeftRadius: '10px',
                            borderBottomRightRadius: '10px',
                            maxHeight: '150px',
                            overflow: 'auto',
                        }}
                    >
                        {/* <li
                            className={`${styles.select2_results__option} ${styles.select2_results__option_highlighted}`}
                        >
                            {value}
                        </li> */}
                        {displayItems?.map(
                            (
                                item:
                                    | string
                                    | number
                                    | boolean
                                    | ReactElement<
                                        any,
                                        string | JSXElementConstructor<any>
                                    >
                                    | Iterable<ReactNode>
                                    | ReactPortal
                                    // | PromiseLikeOfReactNode
                                    | null
                                    | undefined
                                    | any,
                                i: Key | null | undefined
                            ) => (
                                <li
                                    key={i}
                                    className={`${styles.select2_results__option} ${hoverItem === i ? styles.select2_results__option_highlighted : ''}`}
                                    style={{
                                        marginTop: "10px",
                                        padding: "5px 0",
                                        paddingLeft: "18px",
                                        borderRadius: '10px',
                                        fontSize: '16px',
                                    }}
                                    onClick={() => { setValue(item.value); setInputValue('') }}
                                    onMouseEnter={() => setHoverItem(i)}
                                    onMouseLeave={() => setHoverItem(null)}
                                >
                                    {item.label}
                                </li>
                            )
                        )}
                    </ul>
                </span>
            </span>
        </span>
    );
}
