import React from 'react';
import style from '../zalo/group/group.module.css';



export interface numberProp {
    numberCurrentDetailForGroup: number,
    onChangeNumberPage: (e: number) =>  void
}

const CurrentFacebookSlug: React.FC<numberProp> = ({numberCurrentDetailForGroup, onChangeNumberPage}) => {
  const listDetail = ["Quản lý tài khoản", "Chi tiết tài khoản", "Công cụ quét", "Quản lý chiến dịch", "Chi tiết kịch bản"];
  return (
    <section>
        <ul className={style.list_current}>
            {
                listDetail.map((item, i) => (
                    <li onClick={() =>  onChangeNumberPage(i)} className={`${style.list_current__li} ${i !== numberCurrentDetailForGroup ?  style.list_current__li_no_active : style.list_current__li_active}`}>{item}</li>
                ))
            }
        </ul>
        <div></div>
    </section>
  )
}

export default CurrentFacebookSlug;