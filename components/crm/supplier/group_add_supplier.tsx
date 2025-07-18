import React, { useState } from "react";
import styles from "./supplier.module.css";
import Link from "next/link";
import Image from "next/image";
import ModalSupplierGroup from "./modal/modal_group";

export default function SupplierInputSipplierGroup({ isSelectedRow }: any) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleClickSelectoption = () => {};
  return (
    <div className={styles.main__control}>
      <div className={`${styles.main__control_btn} flex_between`}>
        <div className={styles.main__control_search}>
          <form onSubmit={() => false}>
            <input
              type="text"
              className={styles.input__search}
              name="search"
              defaultValue=""
              placeholder="Tìm kiếm theo tên nhà cung cấp"
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
        <div className={`${styles.main__control_add} flex_end`}>
          <button
            type="button"
            className={`${styles.dropbtn_add} flex_align_center`}
            onClick={() => setIsOpenModal(true)}
          >
            <Image height={14} width={14} alt="..." src="/crm/add.svg" />
            Thêm mới
          </button>
        </div>
      </div>
      <ModalSupplierGroup
        isShowModalAdd={isOpenModal}
        setClose={setIsOpenModal}
      />
    </div>
  );
}
