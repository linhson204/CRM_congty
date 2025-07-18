import React, { useEffect, useRef } from 'react';
import styles from "./group.module.css";

const GroupZaloList = () => {

    const arrayDemo = [1, 1, 1, 11, 1, 1, 1, 1, 11, 11,1,1,1,1,1,11,1,1];
  const dotThreeRef = useRef(null);
  const parentScrollRef = useRef(null);
  const dotThreeRefRight = useRef(null);
  const parentScrollRefRight = useRef(null);
  

  useEffect(() => {
    if(parentScrollRef.current) {
        parentScrollRef.current.addEventListener('scroll', () => {
            dotThreeRef.current.classList.add(`${styles.scroll_display}`);
        });
        parentScrollRefRight.current.addEventListener('scroll', () => {
            dotThreeRefRight.current.classList.add(`${styles.scroll_display}`);
        });
    }
  }, [])
  return (
    <section className={styles.add__list}>
        <div className={styles.tilte__add_group}>
        <span>Xuất danh sách</span>
      </div>
      <div className={styles.content__add_list}>
        <div className={styles.left__add_list}>
          <p className={styles.left__add_list_title}>
          Xuất danh sách link tất cả các nhóm đã tham gia
          </p><br></br>
          
          <p className={styles.left__add_list_note}>
          Lưu ý: Chỉ các nhóm bật chức năng tham gia bằng Link mới xuất được link nhóm!
          </p>
         
          {/* list link group */}
          {/* left */}
          <div className={styles.add__list_contents}>
            {/* left */}
            <div className={styles.left_content}>
                <p className={styles.left__add_des}>
                Danh sách nhóm đầy đủ thông tin<span className={styles.left__add_star}>*</span>
                </p>
                <p className={styles.left__add_suggest}>
                Định dạng: Link nhóm/Tên nhóm/Số lượng thành viên
                </p>
                {/* list link group */}
          <div>
            {/* list link */}
            <div className={styles.warrper_link}>
              <ul  ref={parentScrollRef}>
                {arrayDemo.map((item, index) =>
                  index !== 8 ? (
                    <li className={styles.item_link}> link thu {index}</li>
                  ) : (
                  arrayDemo.length > 8 &&  <div ref={dotThreeRef} className={styles.three_dot}>
                  <span>...</span>
                </div>
                  )
                )}
              </ul>
            </div>
          </div>
            </div>
            {/* right */}
            <div className={styles.right__add_list}>
            <p className={styles.left__add_des}>
            Danh sách nhóm đầy đủ thông tin<span className={styles.left__add_star}>*</span>
            </p>
            <p className={styles.left__add_suggest}>
            Định dạng: Link nhóm/Tên nhóm/Số lượng thành viên
            </p>
              <div>
            {/* list link */}
            <div className={styles.warrper_link}>
              <ul  ref={parentScrollRefRight}>
                {arrayDemo.map((item, index) =>
                  index !== 8 ? (
                    <li className={styles.item_link}> link thu {index}</li>
                  ) : (
                  arrayDemo.length > 8 &&  <div ref={dotThreeRefRight} className={styles.three_dot}>
                  <span>...</span>
                </div>
                  )
                )}
              </ul>
            </div>
          </div>
            
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GroupZaloList