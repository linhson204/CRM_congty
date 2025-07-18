import React from "react";
import styles from "../../potential/potential.module.css";
import Link from "next/link";
import Image from "next/image";
export default function AddContractBtnDetails({ id }: any) {
  return (
    <div className={styles.main__control}>
      <div
        className={`${styles.main__control_btn}`}
        style={{ justifyContent: "flex-end", marginRight: "5px" }}
      >
        <div className={`${styles.main__control_add} flex_end`}>
          <Link href={`/customer/contract/create/${id}`}>
            <button
              type="button"
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <Image alt="+" width={13} height={13} src="/crm/add.svg" />
              Tạo hợp đồng
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
