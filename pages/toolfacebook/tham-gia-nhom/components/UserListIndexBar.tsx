import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import style from '../styles.module.css';
// import { set } from 'lodash';

interface UserListIndexBarProps {
    currentPage: number;
    totalPages: number;
    setItemsPerPage?: (itemsPerPage: number) => void;
    goToPrev: () => void;
    goToNext: () => void;
}

export default function UserListIndexBar({
    currentPage,
    totalPages,
    setItemsPerPage,
    goToPrev,
    goToNext
}: UserListIndexBarProps) {

    const defaultValue = 10;

    return (
    <div className={`${style.BlockRow} ${style.bottomBarList}`}>
        <div id="RecordCountBar" className={`${style.BlockRow} ${style.recordCountBar}`}>
            <p>Hiển thị</p>
            <select style={{marginLeft: '10px', marginRight: '10px'}}
                    defaultValue={defaultValue.toString()} // Giá trị mặc định
                    onChange={(e) => {
                        const selectedValue = Number(e.target.value);
                        if (setItemsPerPage) setItemsPerPage(selectedValue);
                        // Xử lý thay đổi số bản ghi trên một trang ở đây
                    }}
            >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
            </select>
            <p>bản ghi trên một trang</p>
        </div>
        <div id="PageIndexBar" className={`${style.BlockRow} ${style.indexBar}`}>
            <button onClick={goToPrev} disabled={currentPage === 1} style={{marginRight: '20px'}}>
            <FaArrowLeft className={style.ic}></FaArrowLeft>
            </button>
            <span>Trang {currentPage} / {totalPages}</span>
            <button onClick={goToNext} disabled={currentPage === totalPages} style={{marginLeft: '20px'}}>
            <FaArrowRight className={style.ic}></FaArrowRight>
            </button>
        </div>
    </div>
    )}