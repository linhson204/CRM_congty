"use client";
import React, { useState } from "react";
import styles from "./group.module.css";
import Link from "next/link";
import Image from "next/image";
import GroupModal from "./group_modal";



export interface GroupFormInputProps {
  isSelectedRow: boolean
}

export default function GroupFormInputGroup({ isSelectedRow }: GroupFormInputProps) {
  const handleClickSelectoption = () => {};

  const [ openModal, setOpenModal ] = useState(false);
  const handleChangeStateModal  = () => {
    setOpenModal(!openModal);
  }
  const arrayMap = [1, 2, 3, 4, 5, 6, 7, 8];
  const [listHistorySearch, setListHistorySearch] = useState<any>(arrayMap)

  //   example

  const handleFilterHistory  = (index: string) => {
    let currentList = listHistorySearch.filter((item) => item !== Number(index));
    setListHistorySearch(currentList)
  }
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
              placeholder="Tìm kiếm theo tên tài khoản"
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
              onClick={() => setOpenModal(!openModal)}
            >
              <p>
              Tạo nhãn <span className={styles.hidden_mobile}>phân loại</span>
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
              >
                <path
                  d="M5.8776 0.734962L6 0.726562C6.21749 0.726572 6.42761 0.805334 6.59152 0.948283C6.75542 1.09123 6.86202 1.2887 6.8916 1.50416L6.9 1.62656V5.82656H11.1C11.3175 5.82657 11.5276 5.90533 11.6915 6.04828C11.8554 6.19123 11.962 6.3887 11.9916 6.60416L12 6.72656C12 6.94405 11.9212 7.15417 11.7783 7.31808C11.6353 7.48199 11.4379 7.58858 11.2224 7.61816L11.1 7.62656H6.9V11.8266C6.89999 12.044 6.82123 12.2542 6.67828 12.4181C6.53533 12.582 6.33786 12.6886 6.1224 12.7182L6 12.7266C5.78252 12.7266 5.57239 12.6478 5.40848 12.5048C5.24458 12.3619 5.13798 12.1644 5.1084 11.949L5.1 11.8266V7.62656H0.9C0.682515 7.62655 0.47239 7.54779 0.308483 7.40484C0.144577 7.26189 0.0379779 7.06443 0.00839996 6.84896L0 6.72656C9.17148e-06 6.50908 0.0787712 6.29895 0.22172 6.13505C0.36467 5.97114 0.562136 5.86454 0.7776 5.83496L0.9 5.82656H5.1V1.62656C5.10001 1.40908 5.17877 1.19895 5.32172 1.03505C5.46467 0.871139 5.66214 0.76454 5.8776 0.734962L6 0.726562L5.8776 0.734962Z"
                  fill="#666666"
                />
              </svg>
            </button>
        </div>
      </div>
      {/* history search */}
      {isSelectedRow && 
      <div className={styles.list_history}>
        {listHistorySearch.map((item: string, index: number) => (
          <div className={styles.history_item} onClick={() => handleFilterHistory(item)}>
            <span>Nhãn dãn {item}</span>
            <div className={styles.box_svg}>
                <svg
                className={styles.history_svg}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 10 11"
                fill="none"
                >
                <path
                    d="M9 1.22656L1 9.22656M1 1.22656L9 9.22656"
                    stroke="#4C5BD4"
                    stroke-opacity="0.56"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                </svg>
            </div>
          </div>
        ))}
      </div>
      }
      <GroupModal onClick={() => setOpenModal(!openModal)} isOpen={openModal} />
    </div>
  );
}
