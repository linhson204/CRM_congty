import React, { useState } from "react";
import styles from "./contract.module.css";
import Link from "next/link";
import Image from "next/image";

export default function ContractInputGroup({ setValSearch }: any) {
  const [valInput, setValInput] = useState("");
  return (
    <div className={styles.main__control}>
      <div className={`${styles.main__control_btn} flex_between`}>
        <div className={styles.main__control_search}>
          <form
            onSubmit={(el) => {
              el.preventDefault();
              setValSearch(valInput);
            }}
          >
            <input
              type="text"
              className={styles.input__search}
              name="search"
              defaultValue=""
              placeholder="Tìm kiếm theo tên hợp đồng"
              onChange={(el) => setValInput(el.target.value)}
              value={valInput}
            />
            <button
              type="submit"
              onSubmit={(el) => {
                el.preventDefault();
                setValSearch(valInput);
              }}
              className={styles.kinh_lup}
            >
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
        <div className={`${styles.main__control_add} flex_end`}>
          <Link href="/contract/add_contract">
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
    </div>
  );
}
