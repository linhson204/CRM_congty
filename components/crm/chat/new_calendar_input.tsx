import styles from "./chat.module.css";

export default function NewCalenderInput() {
  return (
    <div
    style={{display:"flex"}}
       className={`${styles.business_assistant_item} ${styles.business_assistant_item_gray} ${styles.business_assistant_calendar_care}`}
    >
      <div
        className={`${styles.business_assistant_item} ${styles.business_assistant_item_gray}`}
      >
        <label>Lịch hẹn từ ngày</label>
        <input
       style={{width:"110%",border:"1px solid black",}}
          type="datetime-local"
          className={styles.business_assistant_start_date}
        />
      </div>
      <div
        className={`${styles.business_assistant_item} ${styles.business_assistant_item_gray}`}
      >
        <label >Đến ngày</label>
        <input
         style={{width:"110%",border:"1px solid black",}}
          type="datetime-local"
          className={styles.business_assistant_start_date}
        />
      </div>
    </div>
  );
}
