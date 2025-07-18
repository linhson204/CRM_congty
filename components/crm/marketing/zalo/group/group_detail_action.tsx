import React from 'react';
import styles from './group.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/router";



export interface GetNumberProps {
  changeNumberPage(e: number) : any
}

const DetailAction: React.FC<GetNumberProps> = ({ changeNumberPage }) => {
  const router = useRouter();

  return (
    <section className={styles.detail_all_btn}>
        <div className={`${styles.detail_action} flex_end`}>
            <button
            onClick={ async () => { changeNumberPage(1), await  router.push('group/join-group') }}
              type="button"
              className={`${styles.detail_action_dropbtn} flex_align_center`}
            >
              <Image height={14} width={14} alt="..." src="/crm/add.svg" />
              Tham gia nhóm
            </button>
        </div>
        <div className={`${styles.detail_action} flex_end`}>
          <Link href="/marketing/sms/add_sms_form">
            <button
              type="button"
              className={`${styles.detail_action_dropbtn}  flex_align_center`}
            >
              <Image height={14} width={14} alt="..." src="/crm/add.svg" />
              <span className={styles.hidden_mobile}>Cập nhật lại danh sách</span>
              
            </button>
          </Link>
        </div>
        <div className={`${styles.detail_action} flex_end`}>
            <button
            onClick={ async () => { changeNumberPage(2), await  router.push('group/list-group')}}
              type="button"
              className={`${styles.detail_action_dropbtn} flex_align_center`}
            >
              <Image height={14} width={14} alt="..." src="/crm/add.svg" />
              <span className={styles.hidden_mobile}>Xuất danh sách</span>
              
            </button>
        </div>
    </section>
  )
}

export default DetailAction