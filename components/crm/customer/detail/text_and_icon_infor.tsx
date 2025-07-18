import styles from "../customer.module.css";
export default function TextAndIconInfo({ field, value, src = "" }: any) {
  return (
    <div className={styles.col_lg_input}>
      <div className={styles.main_profile_body_item}>
        <div className={styles.main__profile__body__item__title}>{field}</div>
        <div className={styles.main__profile__body__item__value}>
          {src!==""?<img alt="img" src={src} />:null}
          {value}
        </div>
      </div>
    </div>
  );
}
