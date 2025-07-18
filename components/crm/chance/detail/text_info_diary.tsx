import styles from "../chance.module.css";
export default function InforText({ field, value }: any) {
  return (
    <div className={styles.col_lg_input_diary}>
      <div className={styles.main_profile_body_item_diary}>
        <div className={styles.main__profile__body__item__title}>{field}</div>
        <div className={styles.main__profile__body__item__value_diary}>{value}</div>
      </div>
    </div>
  );
}
