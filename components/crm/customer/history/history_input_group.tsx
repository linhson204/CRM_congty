import React, { useEffect, useState } from "react";
import styles from "../../customer/detail/customer_detail.module.css";
import Link from "next/link";
import ShareActionModal from "@/components/crm/potential/potential_action_modal/potential_share_action_mdal";
export default function ShareBtnGroupDetails({ id }: any) {
  const [isOpenMdal, setIsOpenMdal] = useState(false);

  return (
    <>
      <div className={styles.main__control}>
        <div className={`${styles.main__control_btn} flex_between`}>
          <div className={styles.main__control_search}>
            <form onSubmit={() => false}>
              <input
                style={{ height: "46px" }}
                type="text"
                className={styles.input__search}
                name="search"
                defaultValue=""
                placeholder="Tìm kiếm theo đối tượng chia sẻ"
              />
              <button className={styles.kinh_lup}>
                <img
                  className={styles.img__search}
                  src="/crm/search.svg"
                  alt=""
                />
              </button>
            </form>
          </div>
          <div className={`${styles.main__control_add} flex_end`}>
            <button
              type="button"
              onClick={() => setIsOpenMdal(true)}
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <img src="/crm/add.svg" />
              Chia sẻ
            </button>
          </div>
        </div>
      </div>
      <ShareActionModal
        isModalCancel={isOpenMdal}
        setIsModalCancel={setIsOpenMdal} listNV={undefined}      />
    </>
  );
}
