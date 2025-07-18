import style from "./information.module.css";

export default function InforText({ field, value, icon, link }: any) {
  return (
    <div className={style.col_lg_input}>
      <div className={style.main_profile_body_item}>
        <div className={style.main__profile__body__item__title}>{field}</div>
        {link ? (
          <div
            style={{ color: "#4C5BD4" }}
            className={`${style.main__profile__body__item__value}`}
          >
            {link}
          </div>
        ) : (
          <div
            className={`${style.main__profile__body__item__value} ${
              !value || value == "Không có dữ liệu" ? style["not-updated"] : ""
            }`}
          >
            {icon && <span className="icon">{icon}</span>}
            {!value || value == "Không có dữ liệu" ? "Chưa cập nhật" : value}
          </div>
        )}
      </div>
    </div>
  );
}
