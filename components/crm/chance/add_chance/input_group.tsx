import React from "react";
import styles from "../../potential/potential2.module.css";
import Link from "next/link";
import PotentialSelectBox from "@/components/crm/potential/potential_selectt";
import { useRouter } from "next/router";
export default function ChaneInputGroup() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className={styles.main__control}>
      <div className={`${styles.main__control_select} flex_align_center`}>
        <PotentialSelectBox title="Giai đoạn:" value="Tất cả" />
        <PotentialSelectBox title="Người thực hiện:" value="Tất cả" />
      </div>

      <div className={`${styles.main__control_btn} flex_between`}>
        <div className={styles.main__control_search}>
          <form onSubmit={() => false}>
            <input
              style={{ height: "46px" }}
              type="text"
              className={styles.input__search}
              name="search"
              defaultValue=""
              placeholder="Tìm kiếm theo tên tiềm năng"
            />
            <button className={styles.kinh_lup}>
              <img
                className={styles.img__search}
                src="/crm/search.svg"
                alt="hungha365.com"
              />
            </button>
          </form>
        </div>
        <div className={`${styles.main__control_add} flex_end`}>
          <Link href={`customer/chance/add/${id}`}>
            <button
              type="button"
              className={`${styles.dropbtn_add} flex_align_center`}
            >
              <img src="/crm/add.svg" />
              Thêm mới
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
