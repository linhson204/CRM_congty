import React, { useState } from 'react';
import styles from "./group.module.css";

export interface HistoryGroupZaloProps {
    isHaveClose: boolean,
    list: any
}


const HistoryGroupZalo: React.FC<HistoryGroupZaloProps> = ({isHaveClose, list}) => {

//   const [listHistorySearch, setListHistorySearch] = useState<any>(arrayMap)
//     const handleFilterHistory  = (index: string) => {
//         let currentList = listHistorySearch.filter((item) => item !== Number(index));
//         setListHistorySearch(currentList)
//       }
  return (
    <section>
         <div className={styles.list_history__table}>
        {list.map((item: string, index: number) => (
          <div className={styles.history_item} 
        //   onClick={() => handleFilterHistory(item)}
          >
            <span>Nhãn dãn {item}</span>
            {isHaveClose && <div className={styles.box_svg}>
                <svg
                className={styles.history_svg}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 10 11"
                fill="none"
                >
                <path
                    d="M9 1.22656L1 9.22656M1 1.22656L9 9.22656"
                    stroke="#4C5BD4"
                    stroke-opacity="0.56"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                </svg>
            </div>}
            
          </div>
        ))}
      </div>
    </section>
  )
}

export default HistoryGroupZalo