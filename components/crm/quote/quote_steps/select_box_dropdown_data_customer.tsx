import {
    ReactElement,
    JSXElementConstructor,
    ReactNode,
    ReactPortal,
    // PromiseLikeOfReactNode,
    Key,
    useEffect,
    useState,
    useContext,
} from "react";
import styles from "@/components/crm/quote/quote.module.css";
import { QuoteContext } from "../quoteContext";
import useLoading from "../../hooks/useLoading";
import { Spin } from "antd";

export default function CustomerDropDownDataStep({
    data = [],
    value = " Chọn",
    setValue = () => { },
    setKeyword = () => { },
    keyword = '',
}: any) {
    const { shouldFetchCus } = useContext(QuoteContext)
    // const { isLoading, startLoading, stopLoading } = useLoading();
    const [inputValue, setInputValue] = useState('')
    const [hoverItem, setHoverItem] = useState(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            setKeyword(inputValue.trim())
        }, 1000);

        return () => clearTimeout(timer)
    }, [inputValue])

    // useEffect(() => {
    //     if (shouldFetchCus) {
    //         startLoading();
    //     } else {
    //         stopLoading();
    //     }
    // }, [shouldFetchCus])

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
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setKeyword(inputValue)
                            }
                        }}
                        placeholder="Tìm theo tên, SĐT, email"
                    />
                </span>
                <span
                    className={styles.select2_results}
                    style={{
                        borderBottomLeftRadius: '10px',
                        borderBottomRightRadius: '10px',
                    }}
                >
                    <ul
                        className={styles.select2_results__options}
                        role="tree"
                        aria-expanded="true"
                        aria-hidden="false"
                        style={{
                            maxHeight: '200px',
                            overflow: 'auto',
                            borderRadius: '10px',
                        }}
                    >
                        {/* <li
                            className={`${styles.select2_results__option} ${styles.select2_results__option_highlighted}`}
                        >
                            {value}
                        </li> */}
                        {/* {isLoading ? (
                            <Spin
                                style={{
                                    margin: "auto",
                                    width: "100%",
                                    display: "block",
                                    padding: "5px",
                                    height: "100%",
                                }}
                            />
                        ) : null} */}
                        {data?.map(
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
                                    | undefined,
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
                                    }}
                                    onClick={() => { setValue(item); setInputValue('') }}
                                    onMouseEnter={() => setHoverItem(i)}
                                    onMouseLeave={() => setHoverItem(null)}
                                >
                                    {item}
                                </li>
                            )
                        )}
                    </ul>
                </span>
            </span>
        </span>
    );
}
