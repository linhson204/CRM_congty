import React, { useRef, useState } from "react";
import { Plus, DropDown, DropDownSearch } from "@/public/img/marketing/facebook";
import styles from "./facebook.module.css";
import { Button, Modal, Select, Space } from "antd";
import FacebookInput from "./facebook_input_form";


export interface TitleNavProps {
  listTitleNav: any
}

const FacebookNav: React.FC<TitleNavProps> = ({ listTitleNav }) => {
  const [page, setPage] = useState('xem-truoc-kich-ban');
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [oneIsActive, setOneIsActive] = useState(false);
  const [twoIsActive, setTwoIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const optionRef = useRef(null);
  const childrenRef = useRef(null);
  const [valueFillter, setValueFillter] = useState(
    "Danh sách kịch bản theo tin nhắn"
  );
  const [numberSelected, setNumberSelected] = useState(0);

  document.addEventListener("click", function (e) {
    if (isOpen) {
      if (!optionRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
  });

  const check = () => {
    console.log("in");
    setIsOpen(!isOpen);
    setValue("a");
    console.log("isOpen", isOpen);
  };

  const showOptions = () => {
    setIsOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  return (
    <section id="facebook_nav" className={styles.facebook__nav}>
      <div style={{ display: 'flex', marginBottom: '1.25rem'}}>
        <div className={styles.custom_input_positon}>
        <p className={styles.detail_format_title}>Chi tiết kịch bản</p>
          <FacebookInput page={"xem-truoc-kich-ban"}/>
        </div>
      </div>

      <div className={styles.wrapper_nav}>
        {/* all */}
        <div className={styles.title_nav}>
          <p className={styles.title_nav_title}>Tất cả</p>
          <div className={styles.facebook_icon} onClick={() => setOpen(true)}>
            <Plus />
          </div>
          <Modal
            open={open}
            title={
              <div className={styles.bg_modal} onClick={() => {}}>
                <p>KỊCH BẢN TIN NHẮN</p>
              </div>
            }
            onOk={handleOk}
            onCancel={() => {
              setOpen(false);
            }}
            footer={
              <div className={styles.btn_modal}>
                {/* <Button
                    className={styles.btn_modal_action}
                    key="back"
                    onClick={() => {setOpen(false)}}
                  >
                    Hủy
                  </Button> */}
                <Button
                  className={styles.btn_modal_action}
                  key="submit"
                  type="primary"
                  loading={loading}
                  onClick={handleOk}
                >
                  Tạo mới
                </Button>
              </div>
            }
          >
            <div>
              <div className={styles.modal_row}>
                <p className={styles.modal_row_title}>Chọn loại kich bản</p>
                <div
                  ref={optionRef}
                  onClick={() => showOptions()}
                  className={styles.moddal__options}
                >
                  <input
                    className={`${styles.modal_row_input} ${styles.hidden}`}
                    type="checkbox"
                    id="filter-switch"
                  ></input>
                  <label
                    htmlFor="filter-switch"
                    className={styles.dropdown__options_filter}
                  >
                    Chọn loại kịch bản
                  </label>
                  <div className={styles.modal__option_icon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="8"
                      viewBox="0 0 14 8"
                      fill="none"
                    >
                      <path
                        d="M1.5 1.5L7 6.5L12.5 1.5"
                        stroke="#333333"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <ul
                    ref={childrenRef}
                    style={{
                      display: `${isOpen ? "block" : "none"}`
                    }}
                    className={styles.dropdown__filter}
                    role="listbox"
                    // tabIndex="-1"
                  >
                    <li>
                      <ul className={styles.dropdown__select}>
                        <li
                          className={styles.dropdown__select_option}
                          role="option"
                          onClick={(e) => check()}
                        >
                          Option 1
                        </li>
                        <li
                          className={styles.dropdown__select_option}
                          role="option"
                        >
                          Option 1
                        </li>
                        <li
                          className={styles.dropdown__select_option}
                          role="option"
                        >
                          Option 1
                        </li>
                        <li
                          className={styles.dropdown__select_option}
                          role="option"
                        >
                          Option 1
                        </li>
                        <li
                          className={styles.dropdown__select_option}
                          role="option"
                        >
                          Option 1
                        </li>
                        <li
                          className={styles.dropdown__select_option}
                          role="option"
                        >
                          Option 1
                        </li>
                        <li
                          className={styles.dropdown__select_option}
                          role="option"
                        >
                          Option 1
                        </li>
                        <li
                          className={styles.dropdown__select_option}
                          role="option"
                        >
                          Option 1
                        </li>
                        <li
                          className={styles.dropdown__select_option}
                          role="option"
                        >
                          Option 1
                        </li>
                        <li
                          className={styles.dropdown__select_option}
                          role="option"
                        >
                          Option 1
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={styles.modal_row}>
                <p className={styles.modal_row_title}>Tên mẫu tin nhắn</p>
                <input
                  className={styles.modal_row_input}
                  placeholder="Nhập tên mẫu tin nhắn"
                ></input>
              </div>
            </div>
          </Modal>
        </div>
        {/* details */}
        <div>
              <div className={styles.nav_1}>
                {/* click */}
                <div
                  onClick={() => setOneIsActive(!oneIsActive)}
                  className={styles.facebook__nav_scroll}
                >
                  <p className={styles.facebook__nav_scroll_title}>
                    {listTitleNav[0].parentTitle}
                  </p>
                  <div
                    className={`${styles.facebook__nav_scroll_icon} ${
                      oneIsActive ? `${styles.icon_ronate}` : ""
                    }`}
                  >
                    <DropDown />
                  </div>
                </div>
                {/* children */}
                <ul
                  className={`${styles.facebook__nav_scroll_list} ${
                    oneIsActive ? `${styles.active}` : ""
                  }`}
                >
                  {
                    listTitleNav[0].childrent.map((_, index) => (
                    <li className={styles.facebook__nav_scroll_item}>
                     { _.text}
                    </li>
                    ))
                  }
                </ul>
              </div>
          <div>
            {/* click */}
            <div
              onClick={() => setTwoIsActive(!twoIsActive)}
              className={styles.facebook__nav_scroll}
            >
              <p className={styles.facebook__nav_scroll_title}>
              {listTitleNav[1].parentTitle}
              </p>
              <div
                className={`${styles.facebook__nav_scroll_icon} ${
                  twoIsActive ? `${styles.icon_ronate}` : ""
                }`}
              >
                <DropDown />
              </div>
            </div>
            {/* children */}
            <ul
              className={`${styles.facebook__nav_scroll_list} ${
                twoIsActive ? `${styles.active}` : ""
              }`}
            >
             {
                    listTitleNav[1].childrent.map((_, index) => (
                    <li className={styles.facebook__nav_scroll_item}>
                     { _.text}
                    </li>
                    ))
                  }
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacebookNav;
