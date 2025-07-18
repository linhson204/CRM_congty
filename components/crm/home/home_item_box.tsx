import style from "./home.module.css";
export default function HomeItemBox({
  boxTitle,
  boxDesPrimary,
  boxDesWarning,
  boxDesSucess,
}: any) {
  return (
    <div className={style.item_box} >
      <h2 className={style.box_title}>{boxTitle}</h2>
      <div className={style.box_des}>
        {boxDesPrimary && (
          <div className={`${style.box__des_item} ${style.primary}`}>
            <h3>
              <span>
                {boxDesPrimary.title}
              </span>
            </h3>
            <span className={style.box_des_num}>{boxDesPrimary.amount}</span>
          </div>
        )}
        {boxDesSucess && (
          <div className={`${style.box__des_item} ${style.success}`}>
            <h3><span>{boxDesSucess.title}</span></h3>
            <span className={style.box_des_num}>{boxDesSucess.amount}</span>
          </div>
        )}
        {boxDesWarning && (
          <div className={`${style.box__des_item} ${style.warning}`}>
            <h3><span>{boxDesWarning.title}</span></h3>
            <span className={style.box_des_num}>{boxDesWarning.amount}</span>
          </div>
        )}
      </div>
    </div>
  );
}
