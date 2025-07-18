import Link from "next/link";
import styles from "./detail_chance.module.css";
export default function TextInfoChance({ label, value }: any) {
  return (
    <div className={styles.col_lg_6}>
      <div className={styles.main__body}>
        <div className={styles.main__body__item__title}>{label}:</div>
        <div className={styles.main__body__item__value}>
          {/* <Link target="_blank" href="#"> */}
            {value}
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}
