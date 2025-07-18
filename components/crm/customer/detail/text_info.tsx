import styles from "../customer.module.css";
export default function InforText({ field, value }: any) {
  return (
    <div className={styles.col_lg_input}>
      <div className={styles.main_profile_body_item}>
        <div className={styles.main__profile__body__item__title}>{field}</div>
        <div className={styles.main__profile__body__item__value}>{value}</div>
      </div>
    </div>
  );
}
