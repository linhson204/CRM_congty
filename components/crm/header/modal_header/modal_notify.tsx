import style from "../header.module.css";

export default function NotifyModal() {
  return (
    <div className={style.notice_open} >
      <div className={style.select_notice}>
        <ul className={style.all_notice}>
          <li className={style.notice__item}>
            <a
            //   href="#notice_01"
              className={style.select__tab} 
            >
              Khách hàng
            </a>
          </li>
        </ul>
      </div>
      <div className={style.tab_content}>
        <div
          className={style.notice_box}
        ></div>
      </div>
      <div className={style.accept_all}>
        <button className={style.accept_button_all}>Xác nhận tất cả</button>
      </div>
    </div>
  );
}
