import React, { useEffect, useRef } from "react";
import styles from "./group.module.css";
import TableZaloGroupAdd from "@/components/crm/table/table_marketing_zalo_group_add";

const GroupZaloAdd = () => {
  const arrayDemo = [1, 1, 1, 11, 1, 1, 1, 1, 11, 11];
  const dotThreeRef = useRef(null);
  const parentScrollRef = useRef(null);

  useEffect(() => {
    if(parentScrollRef.current) {
        parentScrollRef.current.addEventListener('scroll', () => {
            dotThreeRef.current.classList.add(`${styles.scroll_display}`);
        });
    }
  }, [])

  return (
    <section>
      {/* title */}
      <div className={styles.tilte__add_group}>
        <span>Tham gia nhóm bằng link</span>
      </div>
      {/* conntents */}
      {/* left */}
      <div className={styles.content__add}>
        <div className={styles.left__add}>
          <span className={styles.left__add_title}>
            Thiết lập tự động tham gia nhóm
          </span>
          <div className={styles.left__add_input}>
            <p>Khoảng Delay mỗi lần tham gia (phút)*</p>
            <input placeholder="10 - 30" type="text" />
          </div>
          <p className={styles.left__add_note}>
            Lưu ý: Thời gian delay phải trên 10 phút, tham gia quá nhanh sẽ bị
            chặn!{" "}
          </p>
          {/* list link group */}
          <div>
            <span className={styles.left__list_title}>Danh sách link nhóm*</span>
            {/* list link */}
            <div className={styles.warrper_link}>
              <ul  ref={parentScrollRef}>
                {arrayDemo.map((item, index) =>
                  index !== 7 ? (
                    <li className={styles.item_link}> link thu {index}</li>
                  ) : (
                  arrayDemo.length > 6 &&  <div ref={dotThreeRef} className={styles.three_dot}>
                  <span>...</span>
                </div>
                  )
                )}
              </ul>
            </div>
            {/* button */}
            <div className={styles.btn}>
              <button className={styles.btn__not_bg}>
                    Hủy
              </button>
              <button className={styles.btn__bg}>
                    Lưu
              </button>
            </div>
          </div>
        </div>
        {/* right */}
        <div className={styles.right__add}>
          <span className={styles.left__add_title}>Danh sách hiện tại</span>
          <div>
            <TableZaloGroupAdd setSelected={function (value: boolean): void {
              throw new Error("Function not implemented.");
            }}
            setNumberSelected={undefined}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupZaloAdd;
