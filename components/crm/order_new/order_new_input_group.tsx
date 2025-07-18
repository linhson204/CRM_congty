import { useRouter } from "next/router";
import styles from "./ordern.module.css";
//import OrderaSelectBox from "./ordera_selectt";
export default function OrderNewInputGroup({ fillStart, setFillStart, fillEnd, setFillEnd, searchText, setSearchText, siteText, setSiteText }: any) {

    const router = useRouter();


    const handleStartChange = (e: any) => {
        const selectedDate = new Date(e.target.value);
        const seconds = Math.floor(selectedDate.getTime() / 1000);
        console.log("start", seconds);
        setFillStart(seconds)
    };

    const handleEndChange = (e: any) => {
        const selectedDate = new Date(e.target.value);
        const seconds = Math.floor(selectedDate.getTime() / 1000);
        console.log("end", seconds);
        setFillEnd(seconds)
    };

    const handleChangeSearch = (e: any) => {
        console.log("search id", e.target.value)
        setSearchText(e.target.value)
    }

    const handleChangeSite = (e: any) => {
        console.log("site", e.target.value)
        setSiteText(e.target.value)
    }

    const handleFilter = () => {
        let param = ''
        if (fillStart) {
            param += `start=${fillStart}&`
        }
        if (fillEnd) {
            param += `end=${fillEnd}&`
        }
        if (searchText) {
            param += `search=${searchText}`
        }
        if (siteText) {
            param += `site=${siteText}`

        }
        param !== '' ? router.push(`?${param}`) : router.push('')
    }

    return (
        <div className={styles.main__control}>
            <div className={`${styles.main__control_select} flex_align_center`}>
                <div
                    className={`${styles.select_item} flex_align_center_item ${styles.select_item_time}`}
                >
                    <label htmlFor="" className="">
                        Ngày đặt hàng:
                    </label>
                    <div className={`${styles.input_item_time} flex_between `}>
                        <input type="date" name="" id="start_time" onChange={handleStartChange} />
                    </div>
                    <label htmlFor="" className="">
                        Đến ngày:
                    </label>
                    <div className={`${styles.input_item_time} flex_between`}>
                        <input type="date" name="" id="end_time" onChange={handleEndChange} />
                    </div>
                </div>

                <div className={styles.main__control_search}>
                    <input
                        type="text"
                        className={styles.input__search}
                        name="search"
                        id="search"
                        defaultValue=""
                        onChange={handleChangeSearch}
                        placeholder="Tìm kiếm theo mã đơn hàng"
                    />
                </div>

                <div className={styles.main__control_select}>
                    <select
                        id="site"
                        name="site"
                        className={styles.select_item}
                        aria-hidden="true"
                        defaultValue="Chọn site"
                        onChange={handleChangeSite}
                    >
                        <option value="" key="0">
                            Chọn site vệ tinh
                        </option>
                        <option value="tv365" key="1">
                            Timviec365
                        </option>
                        <option value="tuyendung3s.com" key="2">
                            Tuyendung3s
                        </option>
                        <option value="tv365.com.vn" key="3">
                            Vieclam88
                        </option>
                        <option value="joblike365.com" key="4">
                            Joblike365
                        </option>
                        <option value="tv365com" key="5">
                            Work247
                        </option>
                    </select>
                </div>

                <div className={`${styles.main__control_btn} flex_between `}>
                    <div className={`${styles.main__control_add} flex_end`}>
                        <button
                            type="button"
                            className={`${styles.dropbtn_add} flex_align_center`}
                            onClick={handleFilter}
                        >
                            Tìm kiếm
                        </button>
                    </div>
                </div>
            </div>

        </div >
    );
}
