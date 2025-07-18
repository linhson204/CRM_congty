import React, { useRef, useState } from "react";
import styles from "./facebook.module.css";
import FacebookInput from "./facebook_input_form";
import { DropDown, Plus, UnPlus } from "@/public/img/marketing/facebook";
import { FormTest } from "./form_test";

const FacebookAddBoxContentAutoScreen = () => {
  const [page, setPage] = useState("xem-truoc-kich-ban");
  const [isOpen, setIsOpen] = useState(false);
  const [oneIsActive, setOneIsActive] = useState(false);
  const [twoIsActive, setTwoIsActive] = useState(false);
  const [oneDetailIsActive, setOneDetailIsActive] = useState(false);
  const [valueFillter, setValueFillter] = useState(
    "Danh sách kịch bản theo tin nhắn"
  );
  const [ listObject, setListObject ] = useState([])
  return (
    <section id={styles.facebook__add_content} className={styles.facebook__nav}>
      <div className={styles.wrapper_nav}>
        {/* all */}
        <div className={styles.title_nav}>
          <p className={styles.title_nav_title}>Tất cả</p>
          <div className={styles.facebook_icon} onClick={() => { setListObject((e) => [...e, 1])}}>
            <Plus />
          </div>
        </div>
        {/* details */}

        {
            listObject.map((item, index) => (
        <div>
          <div className={`${styles.nav_1} ${styles.add_border_nav}`}>
            {/* click */}
            <div
              onClick={() => setOneIsActive(!oneIsActive)}
              className={styles.facebook__nav_scroll}
            >
              <p className={styles.facebook__nav_scroll_title}>
                Nút thao tác {index + 1}
              </p>
              <div
                className={`${styles.facebook__nav_scroll_icon} ${
                  oneIsActive ? `${styles.icon_ronate}` : ""
                }`}
              >
                <DropDown />
              </div>
              <div
                className={`${styles.facebook__nav_scroll_icon_unplus} ${
                  oneIsActive ? `${styles.hidden}` : ""
                }`}
              >
                <UnPlus />
              </div>
            </div>
            {/* children */}
            <ul
              className={`${styles.facebook__nav_scroll_list} ${
                oneIsActive ? `${styles.active}` : ""
              }`}
            >
              <FormTest />
              {[1,2].map((_, index) => (
                <div>
                  <div className={styles.nav_1}>
                    {/* click */}
                    <div
                      onClick={() => setOneDetailIsActive(!oneDetailIsActive)}
                      className={`${styles.facebook__nav_scroll}  ${styles.facebook__nav_scroll_child}`}
                    >
                      <p className={styles.facebook__nav_scroll_title}>Nút thao tác {index}</p>
                      <div
                        className={`${styles.facebook__nav_scroll_icon} ${
                          oneDetailIsActive ? `${styles.icon_ronate}` : ""
                        }`}
                      >
                        <DropDown />
                      </div>
                    </div>
                    {/* children */}
                    <ul
                      className={`${styles.facebook__nav_scroll_list} ${styles.facebook__nav_unpadding} ${
                        oneDetailIsActive ? `${styles.active}` : ""
                      }`}
                    >
                      {[1,1,1,11,11,11,11,11,1].map((_, index) => (
                        <p>children</p>
                      ))}
                    </ul>
                  </div>
                 
                </div>
              ))}
            </ul>
          </div>
        </div>
            ))
        }
      </div>
      <div>
        <button className={styles.save}>Lưu</button>
      </div>
    </section>
  );
};

export default FacebookAddBoxContentAutoScreen;
