import React from "react";
import styles from "../zalo/group/group.module.css";
import stylesFaceBook from "./facebook.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import TableFacebookGroupListFriend from "../../table/table_facebook_list_friend";

export interface TableProps {
  numberChange: number
}


const GroupAddFriendAndAddGroup: React.FC<TableProps> = ({ numberChange }) => {
  const router = useRouter();

  return (
    <div className={styles.add__friend}>
      {/* right */}
      <div className={styles.right__friend}>
        <p className={styles.left__add_list_title}>Danh sách gửi</p>
        {/* serach and filter */}
        <div className={`${styles.filter}`}>
          <div className={`${styles.main__control_btn}`}>
            <div className={styles.main__control_search}>
              <form onSubmit={() => false}>
                <input
                  type="text"
                  className={styles.input__search}
                  name="search"
                  defaultValue=""
                  placeholder="Tìm kiếm tên nhóm"
                />
                <button className={styles.kinh_lup}>
                  <Image
                    width={14}
                    height={14}
                    className={styles.img__search}
                    src="/crm/search.svg"
                    alt="hungha365.com"
                  />
                </button>
              </form>
            </div>
          </div>
          <div className={`${styles.checkbox} hidden `} >
            <span>HỘI NGƯỜI LƯỜI VIỆT NAM</span>
            <input type="checkbox" className={styles.custom_input} />
          </div>
          <div className={`${styles.checkbox} change-bg ${numberChange !== 3 ? 'hidden-box' : ''}`}>
            <span className={`${stylesFaceBook.choose_text}`}>Chọn tất cả</span>
            <input type="checkbox" className={styles.custom_input} />
          </div>
        </div>
        <div className={`${stylesFaceBook.box_chaneg_input_campign}`}>
          <div
            className={`${stylesFaceBook.filter_campaign} change_input_campign hidden`}
          >
            <div className={`${styles.main__control_btn}`}>
              <div className={styles.main__control_search}>
                <form onSubmit={() => false}>
                  <input
                    type="text"
                    className={styles.input__search}
                    name="search"
                    defaultValue=""
                    placeholder="Tìm kiếm tài khoản"
                  />
                  <button className={styles.kinh_lup}>
                    <Image
                      width={14}
                      height={14}
                      className={styles.img__search}
                      src="/crm/search.svg"
                      alt="hungha365.com"
                    />
                  </button>
                </form>
              </div>
            </div>
            <div className={styles.checkbox}>
              <input type="checkbox" className={styles.custom_input} />
            </div>
          </div>
          <TableFacebookGroupListFriend />
        </div>
      </div>
    </div>
  );
};

export default GroupAddFriendAndAddGroup;
