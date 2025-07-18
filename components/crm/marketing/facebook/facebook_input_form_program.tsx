import React, { useState } from "react";
import styles from "./facebook.module.css";
import { Delete, DropDownSearch } from "@/public/img/marketing/facebook";

export interface InputProps {
  page: string;
}

const FacebookInputProgram: React.FC<InputProps> = ({ page }) => {
    let changePage = 'tao-mau-kich-ban-ket-ban'
  const [valueFillter, setValueFillter] = useState(
    "Danh sách kịch bản theo tin nhắn"
  );
  const [numberSelected, setNumberSelected] = useState(0);

  return (
    <div className={styles.facebook__fillter}>
      <div
        className={`${styles.facebook__choose_fillter} ${
          page === "xem-truoc-kich-ban" ? styles.change_width_input : ""
        }`}
      >
        <p className={styles.facebook_input}>{valueFillter}</p>
        <div className={styles.facebook__input_icon}>
          <DropDownSearch />
        </div>
        <div className={styles.choose}>
          <div
            className={styles.choose_item}
            onClick={() => {
              setValueFillter("Danh sách kịch bản theo tin nhắn"),
                setNumberSelected(0);
            }}
          >
            <input
              checked={numberSelected == 0}
              className={styles.choose_input}
              type="radio"
            ></input>
            <p className={styles.choose_des}>
              Danh sách kịch bản theo tin nhắn
            </p>
          </div>
          <div
            className={styles.choose_item}
            onClick={() => {
              setValueFillter("Danh sách kịch bản theo tin nhắn"),
                setNumberSelected(1);
            }}
          >
            <input
              checked={numberSelected == 1}
              className={styles.choose_input}
              type="radio"
            ></input>
            <p className={styles.choose_des}>
              Danh sách kịch bản theo tin nhắn
            </p>
          </div>
          <div
            className={styles.choose_item}
            onClick={() => {
              setValueFillter("Danh sách kịch bản theo tin nhắn"),
                setNumberSelected(2);
            }}
          >
            <input
              checked={numberSelected == 2}
              className={styles.choose_input}
              type="radio"
            ></input>
            <p className={styles.choose_des}>
              Danh sách kịch bản theo tin nhắn
            </p>
          </div>
        </div>
      </div>
      {page === "danh-sach-tu-dong" || page === 'danh-sach-ket-ban' && (
        <div className={styles.box_delete}>
          <>
            <Delete className={undefined} />
            <span>Xóa</span>
          </>
        </div>
      )}
      { changePage !== "tao-mau-kich-ban-ket-ban" && 
        <div className={styles.btn_facebook_kich_ban}>
          <button className={styles.btn_input}>Chỉnh sửa</button>
          <button className={styles.btn_input}>Gửi tin nhắn</button>
        </div>
      }

      { page === "tao-mau-kich-ban-ket-ban" && 
        <div className={`${styles.btn_facebook_kich_ban} ${changePage === 'mau-tin-nhan-truyen-thong' ? styles.btn_full : '' }`}>
          <button className={`${styles.btn_input} ${changePage === 'mau-tin-nhan-truyen-thong' ? styles.btn_full : '' }`}>Gửi tin nhắn</button>
        </div>
      }
    </div>
  );
};

export default FacebookInputProgram;
