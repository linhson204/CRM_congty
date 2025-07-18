import React from 'react';
import style from './group.module.css';


export interface numberProp {
    numberCurrentDetailForGroup: number
    listDetail: any
    slug: string
}

const CurrentGroup: React.FC<numberProp> = ({numberCurrentDetailForGroup, listDetail, slug}) => {
  return (
    <section>
        <ul className={style.list_current}>
            {
                listDetail.map((item, i) => (
                    <li className={`${style.list_current__li} ${i !== numberCurrentDetailForGroup ?  style.list_current__li_no_active : style.list_current__li_active}`}>{item.name}</li>
                ))
            }
        </ul>
        <div></div>
    </section>
  )
}

export default CurrentGroup;