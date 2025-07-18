import React from "react";
import styles from "./group.module.css";
import Image from "next/image";
import TableZaloGroupAddFriend from "@/components/crm/table/table_marketing_zalo_add_friend";
import { useRouter } from "next/router";
import TableZaloGroupListFriend from "@/components/crm/table/table_marketing_zalo_group_list_friend";


const GroupAddFriendAndAddGroup = () => {
  const router = useRouter();

  return (
    <section id="zalo__add_friend">
      <div className={styles.tilte__add_group}>
        <span>{router.query.slug == 'add-group' ?  'Xuất danh sách' : 'Tự động mời bạn bè'}</span>
      </div>
      <div className={styles.add__friend}>
        {/* left */}
        <div className={styles.left__friend}>
          <p className={styles.left__add_list_title}>
          Thiết lập tự động mời vào nhóm
          </p>
          <p className={styles.left__add_list_note}>
            Lưu ý: Mỗi tài khoản chỉ chạy đồng thời duy nhất 1 chiến dịch kết
            bạn thành viên trong nhóm.<br></br>
            Nếu tạo nhiều chiến dịch khác nhau trên cùng 1 tài khoản, các chiến
            dịch trước đó sẽ bị xoá!
          </p>
          <div>
            <p className={styles.left__add_des}>
              Khoảng Delay mỗi lần mời (phút)
              <span className={styles.left__add_star}>*</span>
            </p>
            <input placeholder="10 - 30" type="text" />
            <p className={styles.add__friend_note}>
              Lưu ý: Thời gian delay tối thiểu 1 phút!
            </p>
          </div>
          {router.query.slug == 'add-group' && <div>
            <p className={styles.left__add_des}>
              Lời mời kết bạn<span className={styles.left__add_star}>*</span>
            </p>
            <input
              placeholder="Ví dụ: Xin chào, kết bạn với mình nhé"
              type="text"
            />
          </div>}
          
          <div className={styles.btn}>
            <button className={styles.btn__not_bg}>Hủy</button>
            <button className={styles.btn__bg}>Lưu</button>
          </div>
        </div>
        {/* right */}
        <div className={styles.right__friend}>
          <p className={styles.left__add_list_title}>
            Danh sách thành viên nhóm
          </p>
          {/* serach and filter */}
          <div className={styles.filter}>
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
          {/* table list friend*/}
          {/* <TableZaloGroupAddFriend
            setSelected={function (value: boolean): void {
              throw new Error("Function not implemented.");
            }}
            setNumberSelected={undefined}
          /> */}
          <TableZaloGroupListFriend/>
          <div className={styles.add_friend_above_table}>
        <p>Delay: 10 phút</p>
        { router.query.slug == 'add-group'  &&  <>
          <p>Chiến dịch hiện tại: Chưa có danh sách</p>
        <p>Lời chào: </p></>}
       
      </div>
        </div>
      </div>
    </section>
  );
};

export default GroupAddFriendAndAddGroup;
