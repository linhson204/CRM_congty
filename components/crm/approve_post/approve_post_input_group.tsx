import { useRouter } from "next/router";
import styles from "./ordern.module.css";
//import OrderaSelectBox from "./ordera_selectt";
export default function ApprovePostInputGroup({ fillStart, setFillStart, searchText, setSearchText, statusText, setStatusText }: any) {

    const router = useRouter();


    const handleStartChange = (e: any) => {
        const selectedDate = new Date(e.target.value);
        const seconds = Math.floor(selectedDate.getTime() / 1000);
        console.log("start", seconds);
        setFillStart(seconds)
    };



    const handleChangeSearch = (e: any) => {
        console.log("search id", e.target.value)
        setSearchText(e.target.value)
    }

    const handleChangeSite = (e: any) => {
        console.log("site", e.target.value)
        setStatusText(e.target.value)
    }

    const handleFilter = () => {
        let param = ''
        if (fillStart) {
            param += `start=${fillStart}&`
        }

        if (searchText) {
            param += `search=${searchText}`
        }
        if (statusText) {
            param += `status=${statusText}`

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
                        Ngày:
                    </label>
                    <div className={`${styles.input_item_time} flex_between `}>
                        <input type="date" name="" id="start_time" onChange={handleStartChange} />
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
                        placeholder="Tìm kiếm theo nội dung bài viết"
                    />
                </div>

                <div className={styles.main__control_select}>
                    <select
                        id="status"
                        name="status"
                        className={styles.select_item}
                        aria-hidden="true"
                        defaultValue="Chọn status"
                        onChange={handleChangeSite}
                    >
                        <option value="" key="0">
                            Chọn trạng thái
                        </option>
                        <option value="rejected" key="1">
                            Đã từ chối
                        </option>
                        <option value="forcehidden" key="2">
                            Chứa nội dung nhạy cảm
                        </option>
                        <option value="reported" key="3">
                            Bị tố cáo
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
