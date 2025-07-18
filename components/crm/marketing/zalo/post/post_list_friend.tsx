import React, { useState } from "react";
import styles from "./post.module.css";
import Image from "next/image";
import stylesGroup from "../group/group.module.css";
import { MailMarketing, DeleteMarketing, CustomMarketing } from '@/public/img/marketing'



const ModalListPost  = () => {
  return (
    <div className={styles.modal_post}>
      <div className={styles.modal_item}>
        <MailMarketing/>
        <p>Đăng lại</p>
      </div>
      <div className={styles.modal_item}>
        <DeleteMarketing/>
        <p>Chỉnh sửa</p>
      </div>
      <div className={styles.modal_item}>
        <CustomMarketing/>
        <p>Xóa</p>
      </div>
    </div>
  )
}



export interface PostListFriendProps {
  listAccountName: (e: any) => void
}



const PostListFriend: React.FC<PostListFriendProps> = ({ listAccountName }) => {
  const [ isChooseAcount, setIsChooseAcount ] = useState<boolean>(false);
  const arraryTest = [ {
    'name': 'Vũ Thị Thùy Dung',
    'phone' : '0123456789'
  }, {
    'name': 'Vũ Thị Thùy A',
    'phone' : '0123456789'
  }, {
    'name': 'Vũ Thị Thùy B',
    'phone' : '0123456789'
  }, {
    'name': 'Vũ Thị Thùy C',
    'phone' : '0123456789'
  }, {
    'name': 'Vũ Thị Thùy Dung',
    'phone' : '0123456789'
  }, {
    'name': 'Vũ Thị Thùy Dung',
    'phone' : '0123456789'
  }];
  const [listName, setListName] = useState([]);

  return (
    <div className={styles.check_to_post}>
      <div className={styles.suggest}>
        <p className={styles.suggest_title}>Tài khoản áp dụng</p>
      </div>
      <div
        style={{
          height: "0.96144rem",
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem"
        }}
      >
        <input onClick={() => setIsChooseAcount(false)} className={styles.radio} type="radio" checked={!isChooseAcount}></input>
        <span className={styles.title_radio}>Tất cả tài khoản Zalo của bạn</span>
      </div>
      <div
        style={{
          height: "0.96144rem",
          display: "flex",
          justifyContent: "center",
          marginBottom: "1.25rem"
        }}
      >
        <input  onClick={() => setIsChooseAcount(true)} className={styles.radio} type="radio" checked={isChooseAcount}></input>
        <span className={styles.title_radio}>Chọn tài khoản Zalo</span>
      </div>
      {/* arrary */}
      {
        isChooseAcount && 
      <div style={{ width: '100%'}}>
      {arraryTest.map((item, index) => (
        <div className={styles.apply_account}>
          {/* left */}
          <div className={styles.apply_acount_left}>
            <Image
              src="https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg"
              width={50}
              height={50}
              alt="image"
              style={{
                borderRadius: '50%',
                border: '1px solid  #3582CD'

              }}
            />
            <div className={styles.apply_account_infor}>
              <p className={styles.apply_acount_name}>{item.name}</p>
              <p className={styles.apply_acount_phone}>{item.phone}</p>
            </div>
          </div>
          {/* right */}
          <div>
            <div className={stylesGroup.checkbox}>
              <input type="checkbox" className={stylesGroup.custom_input} onClick={(e: any)  => {
                if(e.target.checked) {
                  setListName((e) => [...e, item])
                } else {
                  let copy =  [...listName];
                  let curent = copy.filter((e) => e.name !== item.name );
                  setListName(curent)
                  listAccountName(curent)
                }
              }} />
            </div>
          </div>
          <ModalListPost/>
        </div>
      ))}
      </div>
      }
    </div>
  );
};

export default PostListFriend;
