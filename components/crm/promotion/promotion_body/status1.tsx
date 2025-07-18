import React from "react";
import styles from "../promotion.module.css";
import Link from "next/link";
import Image from "next/image";
import styleHome from "@/components/crm/home/home.module.css";

const Status1 = () => {
  return (
    <>
      <div className={styles.main__control}>
        <div className={styles.main}>
          <p style={{ width: "fit-content", fontSize: "24px" }}>
            Thiết lập các chương trình khuyến mại để thu hút khách hàng của bạn
            ngay nhé!
          </p>
          <img src="/crm/rafiki.png" alt="hungha365.com" />

          <Link href="add">
            <button
              type="button"
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <Image height={14} width={14} alt="..." src="/crm/add.svg" />
              Thêm mới
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Status1;
