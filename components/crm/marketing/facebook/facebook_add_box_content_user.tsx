import React, { useRef, useState } from "react";
import styles from "./facebook.module.css";
import { Plus } from "@/public/img/marketing/facebook";
import DropDownList from "./dropdown_list";

const FacebookAddBox = () => {
const arrayRender = []
  const chooseFileRef = useRef(null);
  const [ item, setItem ] = useState(arrayRender);
  return (
    <div>
        <div style={{
            marginBottom: '1.25rem'
        }}>
        <span className={styles.suggets_form}>Nút thao tác (Tối đa 4 nút)</span>
        </div>
      {
        item.map((_, index) => (
<div className={styles.form_box}>
        <svg
        onClick={() => {
            let copy = item.slice();
            copy.splice(index , 1);
            setItem(copy)
        }}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M15.6629 14.0473C15.8775 14.2619 15.9981 14.553 15.9981 14.8565C15.9981 15.16 15.8775 15.4511 15.6629 15.6658C15.4483 15.8804 15.1572 16.001 14.8537 16.001C14.5502 16.001 14.2591 15.8804 14.0444 15.6658L8 9.6194L1.95365 15.6639C1.73903 15.8785 1.44794 15.999 1.14442 15.999C0.840901 15.999 0.549813 15.8785 0.335193 15.6639C0.120573 15.4492 3.19809e-09 15.1581 0 14.8546C-3.19809e-09 14.5511 0.120573 14.26 0.335193 14.0454L6.38155 8.00095L0.337097 1.9546C0.122476 1.73998 0.0019041 1.44889 0.00190411 1.14537C0.00190411 0.841853 0.122476 0.550765 0.337097 0.336145C0.551717 0.121524 0.842805 0.000951875 1.14632 0.000951872C1.44984 0.000951869 1.74093 0.121524 1.95555 0.336145L8 6.3825L14.0464 0.335193C14.261 0.120572 14.5521 -5.05663e-09 14.8556 0C15.1591 5.05663e-09 15.4502 0.120572 15.6648 0.335193C15.8794 0.549813 16 0.8409 16 1.14442C16 1.44794 15.8794 1.73903 15.6648 1.95365L9.61845 8.00095L15.6629 14.0473Z"
            fill="#777777"
          />
        </svg>
        <div className={styles.form}>
          <span className={styles.form_text}>Tên nút</span>
          <br></br>
          <input
            className={styles.form_input}
            type="text"
            placeholder="Nhập tên nút"
          ></input>
        </div>
        <div className={styles.form}>
          <span className={styles.form_text}>Ảnh icon</span>
          <label
            onClick={() => chooseFileRef.current.click()}
            className={styles.content_input}
          >
            Upload
          <span className={styles.choose_file}>File</span>
          </label>
          <input
            ref={chooseFileRef}
            className={`${styles.content_input} ${styles.hidden_input}`}
            placeholder=""
            type="file"
          ></input>
        </div>
        <div className={styles.form}>
          <span className={styles.form_text}>Đường dẫn</span>
          <br></br>
          <input
            className={styles.form_input}
            type="text"
            placeholder="Nhập đường dẫn"
          ></input>
        </div>
      </div>
        ))
      }
      
      {/* btn add */}
      <div className={styles.btn_to_add} onClick={() => {if(item.length <= 3) {
        setItem((e) =>  [...e, item.length])
      }}}>
        <div className={styles.btn_plus}>
            <Plus/>
        </div>
        <span className={styles.btn_text}>Thêm nút thao tác</span>
      </div>
      <div>
        <button className={styles.save}>Lưu</button>
      </div>
    </div>
  );
};

export default FacebookAddBox;
