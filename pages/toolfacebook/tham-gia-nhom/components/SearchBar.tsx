import { FaMagnifyingGlass } from 'react-icons/fa6';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { IoMdRefresh } from 'react-icons/io';
import stylepo from '../[accountId]/dangbainhom/post.module.css';
import style from '../styles.module.css';

interface SearchBarProps {
    search: string;
    setSearch: (search: string) => void;
    resetFilter: () => void;
    setshowFilterPopup: (isOpen: boolean) => void;
    setJoinTemp: (joinTemp: string) => void;
    setGrStateTemp: (grStateTemp: string) => void;
    setCurrentPage: (page: number) => void;
}

export default function SearchBar({
    search,
    setSearch,
    resetFilter,
    setshowFilterPopup,
    setJoinTemp,
    setGrStateTemp,
    setCurrentPage,
}: SearchBarProps) {

    return (
        <div className={style.filterbarContainer}>
            <div className={style.namesearchContainer}>
                <FaMagnifyingGlass size={15} style={{color: 'rgb(0, 0, 0, 0.6)'}}/>
                <input
                    className={style.searchBar}
                    type="text" placeholder="Tên nhóm..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>
            <button 
                className={stylepo.backButton}
                onClick={() => resetFilter()}
            >
                <IoMdRefresh></IoMdRefresh>
            </button>
            <div className={`${style.filterBlock} ${style.BlockRow}`}
                onClick={() => {
                    setshowFilterPopup(true)
                    setJoinTemp('all');
                    setGrStateTemp('all');
                }}>
                <HiOutlineAdjustmentsHorizontal size={23}/>
            </div>
        </div>
    )
}