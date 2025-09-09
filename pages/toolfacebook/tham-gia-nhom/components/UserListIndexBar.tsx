import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import style from '../styles.module.css';
// import { set } from 'lodash';

interface UserListIndexBarProps {
    currentPage: number;
    totalPages: number;
    setItemsPerPage?: (itemsPerPage: number) => void;
    goToPrev: () => void;
    goToNext: () => void;
    goToPage: (page: number) => void;
}

export default function UserListIndexBar({
    currentPage,
    totalPages,
    setItemsPerPage,
    goToPrev,
    goToNext,
    goToPage,
}: UserListIndexBarProps) {

    const defaultValue = 10;

    // Function to generate page numbers to display
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            // If total pages is small, show all
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Complex pagination logic
            if (currentPage <= 3) {
                // Show first few pages
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                if (totalPages > 4) pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Show last few pages
                pages.push(1);
                if (totalPages > 4) pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // Show middle pages
                pages.push(1);
                if (currentPage > 3) pages.push('...');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                if (currentPage < totalPages - 2) pages.push('...');
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    const handlePageClick = (page: number | string) => {
        if (typeof page === 'number' && page !== currentPage && page >= 1 && page <= totalPages) {
            goToPage(page);
        }
    };

    const goToFirstPage = () => {
        if (currentPage !== 1) {
            goToPage(1);
        }
    };

    const goToLastPage = () => {
        if (currentPage !== totalPages) {
            goToPage(totalPages);
        }
    };

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
            <button 
                onClick={goToFirstPage} 
                disabled={currentPage === 1}
                style={{opacity: currentPage === 1 ? 0.5 : 1}}
            >
                <MdKeyboardDoubleArrowLeft size={25}/>
            </button>
            <button 
                onClick={goToPrev} 
                disabled={currentPage === 1} 
                style={{marginRight: '10px', marginLeft: '15px', opacity: currentPage === 1 ? 0.5 : 1}}
            >
                <MdKeyboardArrowLeft size={25} />
            </button>
            <div className={style.pageCountContainer}>
                {getPageNumbers().map((page, index) => (
                    <div 
                        key={index}
                        className={`${style.pageCount} ${
                            page === currentPage ? style.active : ''
                        } ${
                            typeof page === 'string' ? style.disabled : ''
                        }`}
                        onClick={() => handlePageClick(page)}
                        style={{
                            cursor: typeof page === 'string' ? 'default' : 'pointer'
                        }}
                    >
                        {page}
                    </div>
                ))}
            </div>
            <button 
                onClick={goToNext} 
                disabled={currentPage === totalPages} 
                style={{marginLeft: '10px', marginRight: '15px', opacity: currentPage === totalPages ? 0.5 : 1}}
            >
                <MdKeyboardArrowRight size={25}/>
            </button>
            <button 
                onClick={goToLastPage} 
                disabled={currentPage === totalPages}
                style={{opacity: currentPage === totalPages ? 0.5 : 1}}
            >
                <MdKeyboardDoubleArrowRight size={25}/>
            </button>
        </div>
    </div>
)}