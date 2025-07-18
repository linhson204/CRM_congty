import React, { useRef, useState } from "react";
import styles from "./facebook.module.css";
import { Custom, DropDown } from "@/public/img/marketing/facebook";


export interface DropDownListProps {
  title: string,
  showArray: any,
  onClickChange: any
}

const DropDownList: React.FC<DropDownListProps> = ({ title, showArray, onClickChange}) => {
  const childListRef = useRef(null);
  const iconRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleShow = () => {
    if (!isOpen) {
      childListRef.current.classList.add(`${styles.active_dropdown}`);
      iconRef.current.classList.add(`${styles.active_icon}`);
    } else {
      childListRef.current.classList.remove(`${styles.active_dropdown}`);
      iconRef.current.classList.remove(`${styles.active_icon}`);
    }
    setIsOpen(!isOpen);
  };
  return (
    <div className={styles.dropdown_list} ref={childListRef}>
      {/* show */}
      <div onClick={() => handleShow()} className={styles.dropdown_click}>
        <label className={styles.text_value}>{title}</label>
        <div ref={iconRef} className={styles.dropdown_icon}>
          <DropDown />
        </div>
      </div>
      {/* list acount */}
      <ul className={styles.showlist}>
        {showArray.map((text, index) => (
        <li className={styles.item}>Danh sách quét được 01</li>
        ))}
      </ul>
      {/* hidden */}
    </div>
  );
};

export default DropDownList;
